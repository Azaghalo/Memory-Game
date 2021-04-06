
let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    cards: null,

    heroes : [ 
        "Geralt",
        "Ciri",
        "Triss",
        "Yennefer",
        "Avallach",
        "Dandelion",
        "Emhyr",
        "Eredin",
        "Vesemir",
        "Zoltan"
    ],


    SetCard: function(id){

        let card = this.cards.filter(card=>card.id==id)[0]

        if (card == this.firstCard || this.lockMode || card.flipped){
            return false
        }

        if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    CheckMatch: function(){

        if(!this.firstCard || !this.secondCard){
            return false
        }
        return (this.firstCard.icon === this.secondCard.icon)

    },

    ClearCards: function(){

        this.firstCard = null
        this.secondCard = null
        this.lockMode = false

    },

    UnflipCards: function(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.ClearCards()
    },

    CheckGameOVer: function(){

        return this.cards.filter(card=>!card.flipped).length == 0

    },

    CreateCardsFromHeroes: function (){
    
        this.cards = [];
    
        this.heroes.forEach(hero => {
    
            this.cards.push(this.CreatePairFromHeroes(hero))
    
        })
    
        this.cards = this.cards.flatMap(pair => pair)

        this.ShuffleCards()

        return this.cards

    },
    
    CreatePairFromHeroes: function (hero){
        
        return [
            {id: this.CreateIdWithHero(hero), icon: hero, flipped: false},
            {id: this.CreateIdWithHero(hero), icon: hero, flipped: false}
        ]

    },
    
    CreateIdWithHero: function (hero){
    
        return hero + parseInt(Math.random() * 1000)
    
    },

    ShuffleCards: function (cards){
    
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while(currentIndex != 0){
    
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    
        }
    }

}