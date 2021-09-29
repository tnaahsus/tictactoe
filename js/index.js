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
let oTurn


startGame();

restart.addEventListener('click', startGame);

function startGame() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(x)
        cell.classList.remove(o)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHover()
    message.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? o : x
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (checkDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHover()
    }
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(o)
    })
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        text.innerText = `Draw!!`
    }
    else {
        text.innerText = `${oTurn ? "O's" : "X's"} is the Winner!!!`
    }
    message.classList.add('show')
}

function placeMark(cell, currentClass) {
    // console.log('clicked')
    cell.classList.add(currentClass)
}

function swapTurn() {
    oTurn = !oTurn
}


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