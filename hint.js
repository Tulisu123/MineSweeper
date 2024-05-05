'use strict'

var clickedHintButton
var isHintOn = false

function setHints(){
    var hintContainer = document.querySelector('.hint-container')
    var strHtml = ` <button class="hint" onclick="hintClicked(this)"></button>
                    <button class="hint" onclick="hintClicked(this)"></button>
                    <button class="hint" onclick="hintClicked(this)"></button>`
    hintContainer.innerHTML = strHtml
}

function hintClicked(elHint) {
    if (isHintOn || !gGame.isOn) return
    isHintOn = true
    elHint.classList.add('hint-clicked')
    clickedHintButton = elHint
}

