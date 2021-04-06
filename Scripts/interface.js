const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"
const BACK_ICON = "back_icon"

let hudTimer = document.getElementById("timePassed")
let hudMoves = document.getElementById("numberActions")

let finalTime = document.getElementsByClassName("endTimer")[0]
let finalMoves = document.getElementsByClassName("endMoves")[0]
let gameOverScreen = document.getElementById("gameOver")


let madeAMove = false

let moves
let timer

let seconds
let minutes
let hours

StartGame()

function StartGame(){

    hudTimer.innerHTML = "00:00:00"
    hudMoves.innerHTML = "0"
    madeAMove = false    
    seconds = 0
    minutes = 0
    hours = 0
    moves = 0

    InitializaCards(game.CreateCardsFromHeroes())

}

function CountTime(){
    
    seconds = parseInt(seconds)
    minutes = parseInt(minutes)
    hours = parseInt(hours)

    seconds++

    if(seconds >= 60){
        seconds = 0
        minutes += 1
    }

    if(minutes >= 60){
        minutes = 0
        hours += 1
    }

    if(seconds < 10){
        seconds = "0" + seconds
    }

    if(minutes < 10){
        minutes = "0" + minutes
    }

    if(hours < 10){
        hours = "0" + hours
    }

    hudTimer.innerHTML = hours + ":" + minutes + ":" + seconds

}

function InitializaCards(cards){

    let gameBoard = document.getElementById("board")

    gameBoard.innerHTML = ""

    game.cards.forEach(card =>{

        let cardElement = document.createElement("div")
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        CreateCardContent(card, cardElement)

        cardElement.addEventListener("click", FlipCard)
        gameBoard.appendChild(cardElement)

    })

}

function CreateCardContent(card, cardElement){

    CreateCardFace(FRONT, card, cardElement)
    CreateCardFace(BACK, card, cardElement)

}

function CreateCardFace(face, card, element){

    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)
    
    if(face === FRONT){
        let iconElement = document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src = "../Assets/Images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    }else{
        let backFace = document.createElement("img")
        backFace.classList.add(BACK_ICON)
        backFace.src = "../Assets/Images/BackCard.jpg"
        cardElementFace.appendChild(backFace)
    }

    element.appendChild(cardElementFace)

}

function FlipCard(){

    if(!madeAMove){
        timer = setInterval(CountTime, 1000);
        madeAMove = true
    }

    if(game.SetCard(this.id)){

        this.classList.add("flip")

        if(game.secondCard){

            UpdadeMoveUI()

            if (game.CheckMatch()){
                game.ClearCards()

                if(game.CheckGameOVer()){
                    setTimeout(()=>{
                        clearInterval(timer)
                        finalTime.innerHTML = "Yor total time was: " + hudTimer.innerHTML
                        finalMoves.innerHTML = "You needed " + moves + " moves to win";
                        gameOverScreen.style.display = "flex"
                    },200)
                }

            }else{

                setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id)
                let secondCardView = document.getElementById(game.secondCard.id)

                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
                game.UnflipCards()
                }, 500)
            }
        }
    }
}

function UpdadeMoveUI(){
    moves++
    hudMoves.innerHTML = moves
}

function Restart(){

    FlipAllCards()

    setTimeout(()=>{
        game.ClearCards()
        StartGame()
        gameOverScreen.style.display = "none"
    }, 600)
}

function FlipAllCards(){

    game.cards.forEach(card=>{

        let currentCard = document.getElementById(card.id)
        currentCard.classList.remove("flip")

    })

}
