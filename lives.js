'use strict'

function addLives() {
    var strHtml = ''
    var elHeartContainer = document.querySelector('.heart-container')
    for (let i = 0; i < 3; i++) {
        strHtml += '<img class="heart" src="images/heart.png" alt="heartImage">'
    }
    elHeartContainer.innerHTML = strHtml
}

function removeLives() {
    gGame.lives -= 1 //update MODEL
    console.log('lives left', gGame.lives)

    var strHtml = '' //update DOM
    var elHeartContainer = document.querySelector('.heart-container')
    for (let i = 0; i < gGame.lives; i++) {
        strHtml += '<img class="heart" src="images/heart.png" alt="heartImage">'
    }
    elHeartContainer.innerHTML = strHtml
}
