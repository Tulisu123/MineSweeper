'use strict'

//full expand V | hints V | 

const FLAG = '🚩'
const MINE = '💣'

var gLevel = {
    size: 4,
    mines: 2,
}

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3
}

var gBoard

function onInit() {
    gGame.isOn = true
    isHintOn = false
    gGame.lives = 3
    setRestartBtnState()
    gBoard = buildBoard()
    renderBoard(gBoard)
    addLives()
    setHints()
}

function buildBoard() {
    const size = gLevel.size
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isFlagged: false
            }
        }
    }
    putMinesOnBoard(board)
    setMinesCount(board)
    console.table(board) //DEBUG
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            const cellStr = cell.isMine ? MINE : cell.minesAroundCount
            //onContextMenu is for the rightClick
            strHTML += `<td onclick="onCellClicked(this,${i},${j})"
                        onContextMenu="onCellMarked(this,${i},${j})" 
             class="${className}">
             </td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function boardSize(size, mines) {
    gLevel.size = size
    gLevel.mines = mines
    onInit()
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return
    const cell = gBoard[i][j]
    if (cell.isShown) return

    cell.isFlagged = cell.isFlagged ? false : true //MODEL if its true > make false, if its false > make true

    if (cell.isFlagged) {
        elCell.innerHTML = FLAG //DOM
    } else {
        elCell.innerHTML = ''
    }
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gBoard[i][j].isFlagged || gBoard[i][j].isShown) return

    if (isHintOn) {
        var neighbors = getNeighbors(i,j)
        neighbors.forEach(cell => displayCell(cell.i, cell.j)) //displays the cells
       
         setTimeout(() => {
            isHintOn =false
            neighbors.forEach(cell => closeCell(cell.i,cell.j)) //closes the cells
            clickedHintButton.remove(); //finds the desired element to remove (clickedHintButton) and removes it from the DOM
         },1000)
    }

    if (gBoard[i][j].isMine) {
        removeLives()
        if (gGame.lives === 0) {
            gGame.isOn = false
            showAllMines()
            setRestartBtnState()
        }
        elCell.innerHTML = MINE

    } else { //if cell is not a mine and hint is false
        const mineCount = gBoard[i][j].minesAroundCount
        elCell.innerHTML = mineCount ? mineCount : '' //if mineCount has something put it inside the cell DOM, if not put nothing
        if (mineCount === 0) expand(i, j) //if its an empty cell expand
    }
    gBoard[i][j].isShown = true
    elCell.classList.add('clicked') //update DOM
}

function setRestartBtnState() {
    var elRestartBtn = document.querySelector('.restartBtn')
    if (gGame.isOn) {
        elRestartBtn.style.backgroundImage = 'url(images/smiling.png)'
    } else {
        elRestartBtn.style.backgroundImage = 'url(images/sad.png)'
    }
}