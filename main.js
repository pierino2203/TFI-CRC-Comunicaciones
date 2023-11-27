(()=>{
       /* ejemplo 2 */
        const form2 = document.getElementById('form2')
        
        form2.addEventListener('submit',    e => {
            e.preventDefault();
            const mensajeInput = form2.querySelector('#mensaje')
            const mensaje = mensajeInput.value;
            //Se recibe el msj                
            const polinomioResultadoDiv = document.querySelector('#polinomioResultado');
            const polinomioResultado = polinomioResultadoDiv.textContent;
            //M(x)
            console.log('El mensaje a transmitir es:',mensaje)
            console.log('Paso 1: Obtengo M(x)')
            const mensajeApol = binarioAPolinomioDescendente(mensaje)
            console.log('M(x)=',mensajeApol)
            //paso 2 G(x)
            console.log('Paso 2: polinomio Generador')
            console.log('Polinomio Generador:', polinomioResultado);
            const polGenAbin= dePolinomiaAbin(polinomioResultado)
            console.log('Polinomio generadors en Binario:',polGenAbin);
            //Paso 3 obtengo X^r
            console.log('Paso 3 mayor grado del pol generador ')
            const grado = obtenerTerminoMayor(polinomioResultado)
            console.log('Mayor termino del polinomio generador',grado)
            //4 obtengo P(x)= (X^r)x(M(x))
            console.log("Paso 4 obtengo P(x)")
            const producto = multiplicarMonomioPorPolinomio(grado,mensajeApol)
            console.log('producto P(x)=',producto)
            // paso ese producto a binario
            const productoBin = dePolinomiaAbin(producto)
            console.log('Producto P(x) en binario',productoBin)
            //Paso 5: hacemos la divison P(x)/G(x)
            const divi = divisonBinariaSinAcarreo(productoBin,polGenAbin)
            console.log('El Resto de la division es:',divi)
            //Paso 6: obtengo T(x)= P(x)+resto, este es el polinocio a transmitir
            console.log('Paso 6 hago la suma de P(x)+R(x)')
            const re1 = sumaBinariaSinAcarreo(productoBin,divi)
            console.log('Este es el polinomio a transmitir T(x)',re1)
            //Paso 7 :hago la divionsion entre T(x)/G(x)
            const t = sumaBinariaSinAcarreo(re1,'1')
            const resfinal= divisonBinariaSinAcarreo(re1,polGenAbin)
            const divisionPrueba= divisonBinariaSinAcarreo(t,polGenAbin)
            console.log(resfinal)
            let bandera =0;
            for(let i=0;i<resfinal.length;i++){
                if(resfinal[i]=='1'){
                    bandera=1;
                }
            }
            if(bandera==1){
                console.log('El mensaje se transimitio con error')
            }else{
                console.log('El mensaje se transmitio sin error')
            }
            mostrarResultados(mensaje,mensajeApol,polinomioResultado,polGenAbin,grado,producto,productoBin,divi,re1,resfinal,bandera,t,divisionPrueba)
        })
        function mostrarResultados(mensaje,mensajeApol,polinomioResultado,polGenAbin,grado,producto,productoBin,divi,re1,resfinal,bandera,t,divisionPrueba){
            const template = document.getElementById('tablaRow')
            const tabla = document.getElementById('tablita')
            tabla.innerHTML=''
            const templateRow = template.content;
            const fragmento = document.createDocumentFragment()
            let tr = templateRow.cloneNode(true)
            let paso1 = tr.querySelector('.paso')
            paso1.textContent = `1`
            let instruccion1 = tr.querySelector('.instruccion')
            instruccion1.innerHTML = `El mensaje a transmitir en Binario es <strong class='text-danger'>${mensaje}</strong><br>
            Calculamos M(x) ==> es el mensaje convertido a Polinomio:<br>
            <strong class='text-danger'>M(x)=${mensajeApol}</strong><br>
            <strong class='text-danger'>M(x)=${mensaje}</strong>`
            tabla.appendChild(tr)
            let tr2 = templateRow.cloneNode(true)
            let paso2 = tr2.querySelector('.paso')
            paso2.textContent = '2'
            let instruccion2 = tr2.querySelector('.instruccion')
            instruccion2.innerHTML = `El polinomio Generador ingresado: <br>
            <strong class='text-danger'>G(x)=${polinomioResultado}</strong> <br>
            Su conversion a binario es <strong class='text-danger'>G(x)=${polGenAbin}</strong>  `
            tabla.appendChild(tr2);
            let tr3 = templateRow.cloneNode(true)
            let paso3 = tr3.querySelector('.paso')
            paso3.textContent = '3'
            let instruccion3 = tr3.querySelector('.instruccion')
            instruccion3.innerHTML = `Definimos el <strong class='text-danger'>polinomio auxiliar X^r</strong><br>
            <strong class='text-danger'>X^r = ${grado}</strong> <br>
            Es el termino de mayor grado de <strong class='text-danger'>G(x)</strong> `
            tabla.appendChild(tr3);
            let tr4 = templateRow.cloneNode(true)
            let paso4 = tr4.querySelector('.paso')
            paso4.textContent = '4'
            let instruccion4 = tr4.querySelector('.instruccion')
            instruccion4.innerHTML =`Se forma un nuevo polinomio de la forma <strong class='text-danger'>P(x)=(X^r)x(M(x))</strong><br>
            <strong class='text-danger'>P(x)=(${grado}) x (${mensajeApol})</strong><br>
            <strong class='text-danger'>P(x)=${producto}</strong><br>
            <strong class='text-danger'>P(x)</strong> en binario es ==><strong class='text-danger'>${productoBin}</strong>`           
            tabla.appendChild(tr4);
            let tr5 = templateRow.cloneNode(true)
            let paso5 = tr5.querySelector('.paso')
            paso5.textContent = '5'
            let instruccion5 = tr5.querySelector('.instruccion')
            instruccion5.innerHTML = `Se divide el polinomio <strong class='text-danger'>P(x)</strong> obtenido en el paso anterior por el <strong class='text-danger'>G(x)</strong>,<br>
            <strong class='text-danger'>P(x)=${productoBin}</strong><br>
           <strong class='text-danger'>G(x)=${polGenAbin}</strong> <br>
            Obetenemos el resto de P(x)/G(x) que es = R(x) <br>
            <strong class='text-danger'>R(x)=${divi}</strong><br>`
            tabla.appendChild(tr5);
            let tr6 = templateRow.cloneNode(true)
            let paso6 = tr6.querySelector('.paso')
            paso6.textContent = '6'
            let instruccion6 = tr6.querySelector('.instruccion')
            instruccion6.innerHTML = `Finalmente se  procede a obtener el polinomio <strong class='text-danger'>T(x)=P(x)+R(x)</strong><br>
            <strong class='text-danger'>T(x)=${re1}</strong> ===> <strong class='text-danger'>ESTE ES EL POLINOMIO A TRANSMITIR</strong>`
            tabla.appendChild(tr6);
            let tr7 = templateRow.cloneNode(true)
            let paso7 = tr7.querySelector('.paso')
            paso7.textContent = '7'
            let instruccion7 = tr7.querySelector('.instruccion')
            instruccion7.innerHTML = `Se transmite <strong class='text-danger'>T(x)</strong> y de recibe <strong class='text-danger'>T'(x)=T(x)+E(x)</strong><br>
            donde <strong class='text-danger'>E(x)</strong> seria el error provocado por el canal<<br>
            Finalmente en el receptor se realiza <strong class='text-danger'>T'(x)/G(x) y se obrendra R(x)<br></strong>
            Si <strong class='text-danger'>R(x)=0 ==> NO HAY ERROR</strong><br>
            SI <strong class='text-danger'>R(x)!=0 ==> NO  ERROR</strong>
            `
            
            tabla.appendChild(tr7);
            let tr8 = templateRow.cloneNode(true)
            let paso8 = tr8.querySelector('.paso')
            paso8.textContent = 'FINAL'
            let instruccion8 = tr8.querySelector('.instruccion')
     
                instruccion8.innerHTML = `Suponemos que <strong class='text-danger'>T'(x)=${t}: <br> 
                <strong class='text-danger'>T'(x)/G(x)</strong> y obtenemos el resto <strong class='text-danger'>R(x)=${divisionPrueba}</strong><br>
                Como <strong class='text-danger'>R(x)!=0 ==> Se transmitio con ERROR</strong> `

            tabla.appendChild(tr8);
            
            // <strong class='text-danger'></strong>
            
        }
        function dePolinomiaAbin(polinomio) {
            const coeficientes = [];
            let bin = ''
            obtenerCoeficientesDesdePolinomio(polinomio, coeficientes);
            let it = coeficientes[0] + 1
            while (it > 0) {
                if (coeficientes.includes(it - 1)) {
                    bin = bin.concat('1')
                }
                else {
                    bin = bin.concat('0')
                }
                it = it - 1
            }
            return bin;
        }
        function obtenerCoeficientesDesdePolinomio(polinomio,coeficientes) {
            // Dividir el polinomio en términos
            const terminos = polinomio.split(' + ');
        
            // Inicializar un array para almacenar los coeficientes
            
        
            // Iterar sobre cada término
            for (let i = 0; i < terminos.length; i++) {
                const termino = terminos[i];
        
                // Utilizar una expresión regular para encontrar el coeficiente numérico
                const matches = termino.match(/(-?\d+)/);
        
                // Si se encuentra un coeficiente, agregarlo al array
                if (matches && matches.length > 0) {
                    coeficientes.push(parseInt(matches[0]));
                } else {
                    // Si no se encuentra un coeficiente, agregar 1 al array
                    coeficientes.push(1);
                }
            }
        }
        function binarioAPolinomioDescendente(cadenaBinaria) {
            let polinomio = '';
        
            for (let i = cadenaBinaria.length - 1; i >= 0; i--) {
                if (cadenaBinaria[i] === '1') {
                    const exponente = cadenaBinaria.length - 1 - i;
                    if (polinomio !== '') {
                        polinomio = `x^${exponente} + ` + polinomio;
                    } else {
                        polinomio = `x^${exponente}`;
                    }
                }
            }
        
            return polinomio || '0'; // Si no hay términos, devuelve '0'
        }
        function obtenerTerminoMayor(polinomio) {
            // Dividir el polinomio en términos
            const términos = polinomio.split('+').map(term => term.trim());
        
            // Encontrar el término de mayor grado del polinomio
            let términoMayor = null;
            for (let i = 0; i < términos.length; i++) {
                const match = términos[i].match(/x\^(\d+)/);
                if (match) {
                    const exponente = parseInt(match[1], 10);
                    if (!términoMayor || exponente > términoMayor.exponente) {
                        términoMayor = { exponente, término: términos[i] };
                    }
                } else if (términos[i] === 'x') {
                    const exponente = 1;
                    if (!términoMayor || exponente > términoMayor.exponente) {
                        términoMayor = { exponente, término: términos[i] };
                    }
                } else if (términos[i] === '1') {
                    const exponente = 0;
                    if (!términoMayor || exponente > términoMayor.exponente) {
                        términoMayor = { exponente, término: términos[i] };
                    }
                }
            }
        
            return términoMayor ? términoMayor.término : '0';
        }
        function multiplicarMonomioPorPolinomio(monomio, polinomio) {
            // Dividir el polinomio en términos
            const terminos = polinomio.split(' + ');
        
            // Inicializar el resultado
            let resultado = '';
        
            // Multiplicar el monomio por cada término del polinomio
            for (let i = 0; i < terminos.length; i++) {
                const termino = terminos[i];
        
                // Multiplicar los términos
                const producto = multiplicarTerminos(monomio, termino);
        
                // Agregar el término al resultado
                if (producto !== '' && producto !== '1') {
                    if (resultado !== '') {
                        resultado += ' + ';
                    }
                    resultado += producto;
                }
            }
        
            // Simplificar términos semejantes y ordenar en orden descendente
            resultado = simplificarTerminos(resultado).split(' + ').sort((a, b) => {
                const expA = obtenerExponente(a);
                const expB = obtenerExponente(b);
                return expB - expA;
            }).join(' + ');
        
            return resultado || '0'; // Si no hay términos, devuelve '0'
        }
        
        function obtenerExponente(termino) {
            const partes = termino.split('x^');
            return partes.length === 1 ? 0 : parseInt(partes[1]);
        }
        

        
        function multiplicarTerminos(termino1, termino2) {
            // Extraer coeficiente y exponente del primer término
            const partes1 = termino1.split('x^');
            const coeficiente1 = partes1.length === 1 ? 1 : parseInt(partes1[0]) || 1;
            const exponente1 = parseInt(partes1[1]);
        
            // Extraer coeficiente y exponente del segundo término
            const partes2 = termino2.split('x^');
            const coeficiente2 = partes2.length === 1 ? 1 : parseInt(partes2[0]) || 1;
            const exponente2 = parseInt(partes2[1]);
        
            // Realizar la multiplicación de coeficientes y sumar exponentes
            const coeficienteProducto = coeficiente1 * coeficiente2;
            const exponenteSuma = exponente1 + exponente2;
        
            // Construir el nuevo término
            const nuevoTermino = `${coeficienteProducto !== 1 ? coeficienteProducto : ''}x^${exponenteSuma}`;
        
            return nuevoTermino;
        }
        function simplificarTerminos(polinomio) {
            // Dividir el polinomio en términos
            const terminos = polinomio.split(' + ');
        
            // Inicializar un objeto para almacenar la suma de coeficientes para cada exponente
            const exponentesSuma = {};
        
            // Iterar sobre cada término
            for (let i = 0; i < terminos.length; i++) {
                const termino = terminos[i];
        
                // Extraer coeficiente y exponente
                const partes = termino.split('x^');
                const coeficiente = partes.length === 1 ? 1 : parseInt(partes[0]) || 1;
                const exponente = parseInt(partes[1]);
        
                // Sumar el coeficiente al exponente correspondiente
                exponentesSuma[exponente] = (exponentesSuma[exponente] || 0) + coeficiente;
            }
        
            // Construir el nuevo polinomio a partir de los exponentes y coeficientes sumados
            const nuevoPolinomio = Object.keys(exponentesSuma)
                .map(exponente => {
                    const coeficiente = exponentesSuma[exponente];
                    return `${coeficiente !== 1 ? coeficiente : ''}x^${exponente}`;
                })
                .join(' + ');
        
            return nuevoPolinomio;
        }
        function divisonBinariaSinAcarreo(dividendo,divisor) {

            while(dividendo[0]==='0'){
                dividendo=dividendo.slice(1)
            }
            const tamanioDivisor = divisor.length
            const numeroAdiv = dividendo.slice(0, tamanioDivisor)
            const numeroIt = dividendo.slice(tamanioDivisor)
            let resultado = sumaBinariaSinAcarreo(numeroAdiv,divisor)
            for(let i=0;i<numeroIt.length;i++){
                if(resultado[0]==='0'){
                    resultado = resultado.slice(1)
                    resultado = resultado + numeroIt[i]
                    if(resultado[0]==='1'){
                        resultado=sumaBinariaSinAcarreo(resultado,divisor)
                    }   
                }else{
                    resultado=sumaBinariaSinAcarreo(resultado,divisor)
                    
                }
            }
            return resultado
            }
       
        function sumaBinariaSinAcarreo(a, b) {
            // Convierte los números binarios a arrays de dígitos
            let arrayA = a.split('').map(Number);
            let arrayB = b.split('').map(Number);
        
            // Asegúrate de que ambos arrays tengan la misma longitud
            while (arrayA.length < arrayB.length) {
                arrayA.unshift(0);
            }
            while (arrayB.length < arrayA.length) {
                arrayB.unshift(0);
            }
        
            // Realiza la suma binaria sin acarreo
            let resultado = arrayA.map((bitA, index) => bitA ^ arrayB[index]);
        
            // Convierte el array de resultado a una cadena y devuelve
            return resultado.join('');
        }
})()