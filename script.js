const cards = document.querySelectorAll(".card");

let cardOne,cardTwo;
let matchCount = 0;
let disabledeck = false;
function flipCard(e){
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disabledeck){
        clickedCard.classList.add("flip");
        console.log(clickedCard)
        if(!cardOne) return cardOne = clickedCard;
        cardTwo = clickedCard;
        disabledeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;

        if(cardMatching(cardOneImg,cardTwoImg))
            cardOne = cardTwo = ""
        if(matchCount == 8){
            alert("You Win")
            setTimeout(() => {
                return shuffleCard();
            },1000);
        }
    }
}

function cardMatching(img1,img2){
    if(img1 === img2){
        ++matchCount;
        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        disabledeck = false;
        return true;
    }


    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },500)

    setTimeout(() => {
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = ""
        cardTwo = ""
        disabledeck = false;
        return false;
    },1200);
}

function shuffleCard(){
    matchCount = 0;
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card,index) =>{
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click",flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click",flipCard);
});