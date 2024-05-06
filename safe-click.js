function safeClick(){
    if(gGame.safeCellsTries <= 0) return
    gGame.safeCellsTries -= 1
    setSafeCellBtnTreis() //UPDATE DOM FOR NUMBER OF TRIES

    var randomSafeCell = getRandomSafeCell()
    if(!randomSafeCell) return

    const elCell = document.querySelector(`.cell-${randomSafeCell.i}-${randomSafeCell.j}`)
    elCell.classList.add('safe-cell-clicked')
    setTimeout(()=>{
        elCell.classList.remove('safe-cell-clicked')
    },500)
}

function getRandomSafeCell(){
    if(!gGame.isOn) return
    var safeCells = []
    
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            if(cell.isMine || cell.isShown || cell.isFlagged) continue //skip the iteration for mines
            safeCells.push({i , j})   
        }
    }
    var randomIdx = getRandomInt(0,safeCells.length)
    console.log('safe cell is:', safeCells[randomIdx])
    return safeCells[randomIdx]
}

function setSafeCellBtnTreis(){
    const elCell = document.querySelector(`.safe-click-btn`)
    elCell.innerHTML = 'Safe Click! ' + gGame.safeCellsTries
}