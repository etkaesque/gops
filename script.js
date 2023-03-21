let diamondsSuit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let cardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


// Fisher–Yates shuffle

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function writeDiamonds(shuffledSuit) {

  shuffledSuit.slice().reverse().forEach(card => {

    let cardImage = document.createElement('img')
    cardImage.setAttribute("src", `cards/diamonds/diamond${card}.svg`)
    cardImage.setAttribute("id", `diamond${card}`)
    document.getElementById("diamonds").appendChild(cardImage);


  });

}

function writeCard(cards, suit) {

  cards.forEach(card => {



    let cardImage = document.createElement('img')
    cardImage.setAttribute("src", `cards/${suit}/${suit}${card}.svg`)
    cardImage.setAttribute("id", `${suit}${card}`)
    cardImage.setAttribute("value", `${card}`)
    document.getElementById(`${suit}`).appendChild(cardImage);


    addEvents(suit, card)


  })

}


function addEvents(suit, card) {

  let cardElement = document.querySelector(`#${suit}${card}`)
  cardElement.addEventListener("click", () => teleport(cardElement, suit))
  cardElement.addEventListener("click", () => sendNumber(suit, card))

}



function disableCardClicks(suit) {
  cardsArray.forEach(card => {
    let cardElement = document.querySelector(`#${suit}${card}`);
    if (cardElement) {
      cardElement.style.pointerEvents = 'none';
    }
  });
}

function enableCardClicks(suit) {
  cardsArray.forEach(card => {
    let cardElement = document.querySelector(`#${suit}${card}`);
    if (cardElement) {
      cardElement.style.pointerEvents = '';
    }
  });
}

function teleport(cardElement, suit) {
  if (suit === "clubs") {
    spadeBattle = cardElement;
    disableCardClicks('clubs');
  } else {
    clubsBattle = cardElement;
    disableCardClicks('spades');
  }

  cardElement.remove();
  document.querySelector(`.battle-${suit}`).appendChild(cardElement);
}


function clearBattle() {

  console.log('removes')
  spadeBattle.remove();
  clubsBattle.remove();

  console.log('enabling clicks')
  enableCardClicks('spades');
  enableCardClicks('clubs');
  console.log('click enabled')
}


function sendNumber(suit, card) {



  if (suit === "clubs") {
    clubNumber = card
  }
  else {
    spadeNumber = card
  }

  console.log(clubNumber)
  console.log(spadeNumber)


  endTurn(clubNumber, spadeNumber)


}



let shuffledSuit = shuffleArray(diamondsSuit)
writeDiamonds(shuffledSuit)
writeCard(cardsArray, "spades")
writeCard(cardsArray, "clubs")


let spadeNumber = 0
let clubNumber = 0


function resetEvent() {


  let button = document.querySelector("#turn")
  button.addEventListener('click', () => countScore())


}

resetEvent()


function resetButton() {
  let button = document.querySelector("#turn")
  button.setAttribute("disabled", "")

}


resetButton()

let spadeBattle
let clubsBattle


function endTurn(clubNumber, spadeNumber) {

  let button = document.querySelector("#turn")

  if (clubNumber && spadeNumber !== 0) {


    console.log("Enabling button")
    button.removeAttribute("disabled")


  } else {

    console.log(`Disabling button because spade is ${spadeNumber} or club ${clubNumber} is 0`)
    button.setAttribute("disabled", "")

  }


}


let turnIndex = 1;
let spadeScore = 0;
let clubScore = 0;


function countScore() {

  let diamond = shuffledSuit[turnIndex - 1]

  let status = document.querySelector(".status")
  let details = document.querySelector(".details")
  let turnElement = document.querySelector(".turn-number")


  if (spadeNumber === clubNumber) {

    console.log("Tie")
    status.textContent = "Tie"
  }

  else if (spadeNumber < clubNumber) {

    console.log("Club is winner")
    clubScore += diamond
    status.textContent = "Club player won this round"

  }

  else if (spadeNumber > clubNumber) {
    console.log("Spade is winner")
    spadeScore += diamond
    status.textContent = "Spade player won this round"

  }

  spadeNumber = 0
  clubNumber = 0
  resetButton()

  details.innerHTML = `SPADE'S PLAYER SCORE IS: ${spadeScore} <br> CLUB'S PLAYER SCORE IS: ${clubScore}`
  turnElement.textContent = `RESULTS OF TURN: ${turnIndex}`
  deleteDiamond(diamond)
  clearBattle()

  turnIndex += 1
}


function deleteDiamond(card) {

  cardElement = document.querySelector(`#diamond${card}`)
  cardElement.remove()

}

