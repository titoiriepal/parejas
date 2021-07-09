var tables = {
    "table8": ['red',
        'blue',
        'yellow',
        'brown',
        'orange',
        'pink',
        'black',
        'green'
    ],
    "table4": ['red',
        'blue',
        'yellow',
        'brown'
    ],
    "table12": ['red',
        'blue',
        'yellow',
        'brown',
        'orange',
        'pink',
        'black',
        'green',
        'violet',
        'marine',
        'purple',
        'dark'
    ]
}

var first = null
var second = null
var finds = 0
var sessionVictorys = 0
var localVictorys = 0
var classes = [];
var needFinds = null
var totalCards = null

let createArray = () => {
    var types = classes;
    classes.forEach(color => types.push(color));
    return types;
}

let arrayOfCards = () => {
    return Array.from(document.getElementsByClassName('card'));
}

let inicializateBoard = () => {
    console.log(classes);
    board = document.getElementsByClassName('board');
    console.log(board.className);
    board.className = ".board.flex";
    console.log(board.className);


    needFinds = classes.length;
    totalCards = classes.length * 2

    for (let i = 0; i < totalCards; i++) {
        card = document.createElement("div")
        card.classList.add('card')
        board[0].append(card)
    }

    var misCartas = arrayOfCards();
    initData();
    randomize(misCartas);
    reacciona();
    console.time("t1");
}

let randomize = (misCartas) => {
    types = createArray()
    for (var cont = 0; cont < misCartas.length; cont++) {
        let randomNum = Math.floor(Math.random() * types.length)
        misCartas[cont].classList.add(types[randomNum])
        types.splice(randomNum, 1)
    }
}

let checkcards = (first, second) => {
    if (first.className != second.className) {
        setTimeout(function() {
            first.classList.toggle('reveal');
            second.classList.toggle('reveal');
            activateClick(first);
            activateClick(second);
        }, 1200);
    } else {
        first.onclick = null
        second.onclick = null
        finds++;
        if (finds == needFinds) {
            victory();
        }
    }
}

let victory = () => {
    cabecera = document.getElementsByTagName("h1");
    cabecera[0].classList.toggle('cabecera');
    cabecera[0].classList.toggle('victory');
    cabecera[0].innerHTML = "HAS GANADO LA PARTIDA";
    console.timeEnd("t1");
    setTimeout(function() {
        location.reload();
    }, 5000);
    sessionVictorys++;
    localVictorys++;
    printVictorys();
    sessionStorage.setItem("sessionVictorys", sessionVictorys);
    localStorage.setItem("localVictorys", localVictorys);
}

let reacciona = () => {
    var misCartas = arrayOfCards();
    misCartas.forEach(carta => {
        activateClick(carta);
    })
}

let activateClick = (carta) => {
    carta.onclick = function() {
        this.classList.toggle('reveal');
        this.onclick = function() {}
        if (first == null) {
            first = this;
        } else {
            second = this;
            checkcards(first, second);
            first = null;
            second = null;
        }
    }
}

let initData = () => {
    if (localStorage.getItem("localVictorys"))
        localVictorys = localStorage.getItem("localVictorys")

    if (sessionStorage.getItem("sessionVictorys"))
        sessionVictorys = sessionStorage.getItem("sessionVictorys")

    printVictorys();
}

let printVictorys = () => {
    victorys = document.getElementsByTagName("span");
    victorys[0].innerHTML = localVictorys;
    victorys[1].innerHTML = sessionVictorys;
}

let inicializateButton = () => {
    botonera = Array.from(document.getElementsByClassName('choiceButton'));
    botonera.forEach(boton => {
        boton.onclick = function() {
            classes = tables[boton.value];
            padre = boton.parentNode;
            botonera.forEach(boton => {
                padre.removeChild(boton);
            })
            padre.removeChild(document.getElementsByTagName("span")[0]);
            inicializateBoard();

        }
    })
}

window.onload = inicializateButton();
var types = createArray();