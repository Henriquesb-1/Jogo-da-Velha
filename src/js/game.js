import { hideElement, showElement } from "./visualEfeccts"

const choiceButton = document.querySelectorAll("[escolha]")
const rebootGameButton = document.querySelector("[rebootGame]")

const choiceDiv = document.querySelector(".escolha")
const casas = document.querySelectorAll("[play]")
const casasArray = Array.from(casas)
const gameBoard = document.querySelector(".board")
const rebootGameDiv = document.querySelector(".button-reboot")

const vezDisplay = document.querySelector(".vezDisplay")
const statusGameInformation = document.querySelector("[vezAtual]")
const winnerInformation = document.createElement("h1")
let currentTurn = document.querySelector(".vezAtual")


let player1 = ""
let player2 = ""
let nextPlayer = ""
let currentPlayer = ""

function setGameRules(element) {
    player1 = element.textContent
    player2 = player1 === "X" ? "O" : "X"

    nextPlayer = element.textContent
    currentTurn.innerHTML = element.textContent

    hideElement(choiceDiv, 1, 85, () => bringGameElements())
}
choiceButton.forEach((element) => element.addEventListener('click', () => setGameRules(element)))

function bringGameElements() {
    showElement(vezDisplay, 0, "block")
    showElement(gameBoard, 0, "grid")
    showElement(statusGameInformation, 0, "block")
}

function play(element) {
    element.innerHTML = nextPlayer
    currentPlayer = element.textContent

    element.setAttribute("disabled", true)
    checkGameStatus()
    getProximoJogador()
}
casas.forEach(element => element.addEventListener("click", () => play(element)))

function getProximoJogador() {
    gameBoard.onclick = () => {
        nextPlayer = currentPlayer === player1 ? player2 : player1
        currentTurn.innerHTML = nextPlayer
    }
}

function checkGameStatus() {
    const checkXWin = casasArray.map(e => e.textContent === "X")
    const checar_O_Win = casasArray.map(e => e.textContent === "O")
    const checkDraw = casasArray.map(e => e.textContent != "")

    function returnVictory(hasBeenFill) {
        return (
            hasBeenFill[0] && hasBeenFill[1] && hasBeenFill[2] ||
            hasBeenFill[3] && hasBeenFill[4] && hasBeenFill[5] ||
            hasBeenFill[6] && hasBeenFill[7] && hasBeenFill[8] ||
            hasBeenFill[0] && hasBeenFill[3] && hasBeenFill[6] ||
            hasBeenFill[1] && hasBeenFill[4] && hasBeenFill[7] ||
            hasBeenFill[2] && hasBeenFill[5] && hasBeenFill[8] ||
            hasBeenFill[0] && hasBeenFill[4] && hasBeenFill[8] ||
            hasBeenFill[2] && hasBeenFill[4] && hasBeenFill[6]
        )
    }

    const returnDraw = (array) => array.reduce((element, compare) => element && compare)

    const WinXCondition = returnVictory(checkXWin)
    const Win_O_Condition = returnVictory(checar_O_Win)
    const drawCondition = returnDraw(checkDraw)

    if (WinXCondition) {
        endGame("Vitória de X")
    } else if (Win_O_Condition) {
        endGame("Vitória de O")
    } else if (drawCondition && !WinXCondition && !Win_O_Condition) {
        endGame("Empate")
    }
}

function endGame(textoStatus) {
    const informFinalGameStatus = () => vezDisplay.appendChild(winnerInformation).innerHTML = `Fim de jogo. <br> ${textoStatus}.`

    casas.forEach(element => element.setAttribute("disabled", true))
    hideElement(statusGameInformation, 1, 40, () => informFinalGameStatus())

    showElement(rebootGameDiv, 0, "block", 20)
}

function rebootGame() {
    vezDisplay.removeChild(winnerInformation)

    hideElement(gameBoard, 1, 5, () => {})
    hideElement(vezDisplay, 1, 5, () => {})

    showElement(choiceDiv, 0, "block")

    casas.forEach(element => {
        element.innerHTML = ""
        element.removeAttribute("disabled")
    })

    hideElement(rebootGameDiv, 1, 35, () => {})
}
rebootGameButton.addEventListener("click", () => rebootGame())
