const box = document.getElementById('box')
const gamebox = document.querySelector('.gamebox')
box.setAttribute('draggable', 'false');
let arrastre = false;
let inicialx;
const money = document.getElementById('money');
const losebox = document.querySelector('.containerlosebox');
let score = 0;
let bestscore = 0;


//funcion arrastrar caja//
    box.addEventListener('mousedown', (e) => {
        arrastre = true;
        inicialx = e.clientX - box.offsetLeft;
        box.style.transition = 'none';
        
    });

    document.addEventListener('mousemove', (e) => {
        if (arrastre) {
            let nuevaPosicionX = e.clientX - inicialx;
            let gameboxwidth = gamebox.offsetWidth
            let boxwidth = box.offsetWidth

        if (nuevaPosicionX < 0) {
            nuevaPosicionX = 0;
        }

        else if (nuevaPosicionX + boxwidth > gameboxwidth) {
            nuevaPosicionX = gameboxwidth - boxwidth}

            box.style.left = `${nuevaPosicionX}px`;}

    });

    document.addEventListener('mouseup', (e) => {
        arrastre = false;
        box.style.transition = 'left 0.2s ease';
})


//declaraacion constantes numeros conteo//
    const onestart = document.getElementById('onestart')
    const twostart = document.getElementById('twostart')
    const threestart = document.getElementById('threestart')
    const starttext = document.getElementById('starttext')
    const buttonstart = document.querySelector('.buttonstart')

 //estableces display como none   
    onestart.style.display = 'none';
    twostart.style.display = 'none';
    threestart.style.display = 'none';
    starttext.style.display = 'none';


    let iniciogame = false;


// incio conteo
buttonstart.addEventListener('click', () => {
    if (iniciogame) return;

    iniciogame = true;
    buttonstart.disabled = true;
         
    startgame()

}) 

function startgame() {
    setTimeout (() => {
        threestart.style.display = 'block';

    }, 1000);

    setTimeout (() => {
        threestart.style.display = 'none';
        twostart.style.display = 'block';

    }, 2000);

    setTimeout (() => {
        twostart.style.display = 'none'
        onestart.style.display = 'block'

    }, 3000);

    setTimeout (() => {
        onestart.style.display = 'none'
        starttext.style.display = 'block'

    }, 4000);

    setTimeout(() => {
        starttext.style.display = 'none'       
    }, 5000);

    setTimeout (() => {
        animarcaida();


    }, 5100);

}

const retrybutton = document.querySelector('.retrybutton')

retrybutton.addEventListener('click', () => {
    losebox.style.display = 'none'
    generacionactiva = true;
    animacionactiva = true;

    let bestp = parseInt(document.querySelector('.bestnumber').textContent);
    let scorep = parseInt(document.querySelector('.scorenumber').textContent);

    if (bestp === 0) {
        document.querySelector('.scorenumber').innerText = score;
        document.querySelector('.bestnumber').innerText =  score;
        score = 0;
        document.querySelector('.scorenumber').innerText = 0;
    
      
    
    }
    
    else if (bestp > scorep) {
        document.querySelector('.scorenumber').innerText = 0;
        score = 0;
    
    
    
    }
    
    else if (bestp < scorep) {
        document.querySelector('.bestnumber').innerText =  score;
        document.querySelector('.scorenumber').innerText = 0;
        score = 0;
    
    
    
    }
    startgame();

    
})

 

    

const cancelbutton = document.querySelector('.cancelbutton') 

cancelbutton.addEventListener('click', () => {

    losebox.style.display = 'none'
    iniciogame = false;
    buttonstart.disabled = false;
    generacionactiva = true; 
    animacionactiva = true;

    let bestp = parseInt(document.querySelector('.bestnumber').textContent);
    let scorep = parseInt(document.querySelector('.scorenumber').textContent);

    if (bestp === 0) {
        document.querySelector('.scorenumber').innerText = score;
        document.querySelector('.bestnumber').innerText =  score;
        score = 0;
        document.querySelector('.scorenumber').innerText = 0;
    
      
    
    }
    
    else if (bestp > scorep) {
        document.querySelector('.scorenumber').innerText = 0;
        score = 0;
    
    
    
    }
    
    else if (bestp < scorep) {
        document.querySelector('.bestnumber').innerText =  score;
        document.querySelector('.scorenumber').innerText = 0;
        score = 0;
    
    
    
    }

})



function animarcaida() {
    let monedas = [];
    let animacionactiva = true;
    let generacionactiva = true;

    function generarmoneda() {
        if (!generacionactiva) return;
    
        const nuevamoneda = money.cloneNode(true);
        nuevamoneda.style.position = 'absolute';
        nuevamoneda.style.top = '4px';
    
        // Obtener el ancho de gamebox y el de la moneda
        const gameboxWidth = gamebox.offsetWidth;
        const monedaWidth = nuevamoneda.offsetWidth;
    
        // Asegurarse de que la moneda se genera dentro de los límites de gamebox
        let posicioninicialleft = Math.random() * (gameboxWidth - monedaWidth);
    
        // Corregir si la moneda está fuera del rango, asegurándose de que no pase de la derecha
        posicioninicialleft = Math.max(0, Math.min(posicioninicialleft, gameboxWidth - monedaWidth));
    
        nuevamoneda.style.left = `${posicioninicialleft}px`;
    
        // Asegurarse de que la moneda no se genera fuera de la vista
        if (posicioninicialleft + monedaWidth <= gameboxWidth) {
            gamebox.appendChild(nuevamoneda);
        } else {
            return;
        }
    
        let posicioninicial = 4;
        const posiciofinal = 990;
        const velocidad = 300;
        const tiempoinicio = Date.now();

        function caer() {

            if (!animacionactiva) return;


            let tiempotranscurrido = (Date.now() - tiempoinicio) / 1000;
            let nuevaposicion = posicioninicial + (velocidad * tiempotranscurrido);

            const boxrect = box.getBoundingClientRect();
            const monedarect = nuevamoneda.getBoundingClientRect();

            if (
                monedarect.top + monedarect.height >= boxrect.top &&
                monedarect.left < boxrect.right && 
                monedarect.right > boxrect.left 

            ) {

                nuevamoneda.remove();
                monedas = monedas.filter(item => item.moneda !== nuevamoneda);
                score += 1;

                document.querySelector('.scorenumber').innerText = score;
                return;



            }

            if (nuevaposicion < posiciofinal) {
                nuevamoneda.style.top = `${nuevaposicion}px`
                requestAnimationFrame(caer);
}


    else {

        nuevamoneda.style.top = `${posiciofinal}px`;
        
        animacionactiva = false;
        generacionactiva = false;

        monedas.forEach(item => {
            item.moneda.remove();
        });

        // Vaciar el array de monedas
        monedas = [];

        // Mostrar el cuadro de "Game Over"
        losebox.style.display = 'block';
        
    }

        }

        caer();

        monedas.push({
            moneda: nuevamoneda,
            tiempoinicio: tiempoinicio


        })


        
        
     }


     setInterval (() => {

        generarmoneda();

    }, 1300)


}