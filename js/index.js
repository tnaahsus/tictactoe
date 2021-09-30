const x = 'x'
const o = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restart = document.getElementById('restart');
const text = document.querySelector('[text]')
const board = document.getElementById('board');
let row = document.getElementById('Row');

let oTurn //turn check




// calling main function
startGame();


// restart button
restart.addEventListener('click', startGame);

// main function
function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x)
        cell.classList.remove(o)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHover()
    message.classList.remove('show')
}

// for x & 0 
function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? o : x
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        checkstatus(currentClass)
    }
    else if (checkDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHover()
    }
}

// to check score
let statusNumberx = 0;
let statusNumbero = 0;
function checkstatus(currentStatus,drawStatus) {
    if (currentStatus == x ) {
        console.log('x is winner')
        let row0 = document.getElementById('0');
        let string0 = `${statusNumberx + 1}`;
        // console.log(parameterElement);
        row0.innerHTML = string0;
        statusNumberx++;
    }
    else if (currentStatus == o ) {
        console.log('o is winner')
        let row2 = document.getElementById('2');
        let string2 = `${statusNumbero + 1}`;
        // console.log(parameterElement);
        row2.innerHTML = string2;
        statusNumbero++;
    }
}
// to check draw
function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(o)
    })
}

// to check win
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

// to check if the game has ended
function endGame(draw) {
    if (draw) {
        text.innerText = `Draw!!`
    }
    else {
        text.innerText = `${oTurn ? "O's" : "X's"} is the Winner!!!`
    }
    message.classList.add('show')
}

// to add x & 0 at correct place
function placeMark(cell, currentClass) {
    // console.log('clicked')
    cell.classList.add(currentClass)
}

// to swap turns between x & o
function swapTurn() {
    oTurn = !oTurn
}

// for hovering feature
function setBoardHover() {
    board.classList.remove(x)
    board.classList.remove(o)
    if (oTurn) {
        board.classList.add(o)
    }
    else {
        board.classList.add(x)
    }
}