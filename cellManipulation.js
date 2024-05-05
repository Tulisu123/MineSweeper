'use strict'

function expand(cellI, cellJ) {
    const cell = gBoard[cellI][cellJ]
    displayCell(cellI, cellJ)
    if (cell.minesAroundCount === 0) { //checks if a cell is empty and has no mines around it (in this case we should expand)
        const neighbors = getNeighbors(cellI, cellJ)
        neighbors.forEach(cell => expand(cell.i, cell.j)) //for each neighbor of the clicked cell expand checks if it needs to be expands too. if so - he will expand it
    }
}

function getNeighbors(cellI, cellJ) {
    var neighbors = []
    for (let i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gLevel.size) continue
            if (i === cellI && j === cellJ) continue
            
            if (gBoard[i][j].isMine && !isHintOn) continue
            if (gBoard[i][j].isFlagged) continue
            if (gBoard[i][j].isShown) continue

            neighbors.push({ i, j })
        }
    }
    return neighbors
}

function displayCell(i, j) {
    gBoard[i][j].isShown = true

    const mineCount = gBoard[i][j].minesAroundCount
    const elCell = document.querySelector(`.cell-${i}-${j}`) //UPDATE DOM
    elCell.classList.add('clicked')

    if (gBoard[i][j].isMine) { //if the cell is mine, display mines
        elCell.innerHTML = MINE;
    } else {
        const mineCount =  gBoard[i][j].minesAroundCount;
        elCell.innerHTML = mineCount ? mineCount : ''; //if mineCOunt is true assign mineCount to the cell(the neighbor count) or nothing
    }
}

function closeCell(i,j){
    gBoard[i][j].isShown = false
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.classList.remove('clicked')
    elCell.innerHTML = ''
}