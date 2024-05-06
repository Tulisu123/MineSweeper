'use strict'

function putMinesOnBoard(board) {
    var count = gLevel.mines
    while (count > 0) {
        const row = getRandomInt(0, gLevel.size)
        const col = getRandomInt(0, gLevel.size)

        if (board[row][col].isMine) continue

        board[row][col].isMine = true
        count--
    }
}

function setMinesCount(board) {
    for (let i = 0; i < gLevel.size; i++) {
        for (let j = 0; j < gLevel.size; j++) {
            var countNeighbors = minesAroundCell(board, i, j)
            board[i][j].minesAroundCount = countNeighbors
        }
    }
}

function minesAroundCell(board, cellI, cellJ) {
    var neighborsCount = 0
    for (let i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gLevel.size) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].isMine) {
                neighborsCount++
            }
        }
    }
    return neighborsCount
}

function showAllMines(){
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if(gBoard[i][j].isMine){
                displayCell(i,j)
            }
        }
    }
}