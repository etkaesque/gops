// game set-up

const diamonds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const cardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const spades = "spades";
const clubs = "clubs";

let shuffledSuit = shuffleArray(diamonds);
writeDiamonds(shuffledSuit);
writeCards(cardsArray, spades);
writeCards(cardsArray, clubs);

let spadeNumber = 0;
let clubNumber = 0;

resetEvent();
resetButton();

let spadeBattle;
let clubsBattle;
let turnIndex = 1;
let spadeScore = 0;
let clubScore = 0;


// shuffle diamond suit

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// create cards in html

function writeDiamonds(shuffledSuit) {

  shuffledSuit.slice().reverse().forEach(card => {

    let cardImage = document.createElement('img')
    cardImage.setAttribute("src", `cards/diamonds/diamond${card}.svg`)
    cardImage.setAttribute("id", `diamond${card}`)
    document.getElementById("diamonds").appendChild(cardImage);


  });

}

function writeCards(cards, suit) {
  cards.forEach(card => {
    let cardImage = createCardImage(suit, card);
    document.getElementById(`${suit}`).appendChild(cardImage);
    addCardEvents(suit, card);
  });
}

// add atrributes

function createCardImage(suit, card) {
  let cardImage = document.createElement('img');
  cardImage.setAttribute("src", `cards/${suit}/${suit}${card}.svg`);
  cardImage.setAttribute("id", `${suit}${card}`);
  cardImage.setAttribute("value", `${card}`);
  return cardImage;
}

// add events to card

function addCardEvents(suit, card) {
  let cardElement = document.querySelector(`#${suit}${card}`);
  cardElement.addEventListener("click", () => teleport(cardElement, suit));
  cardElement.addEventListener("click", () => sendNumber(suit, card));
}


// manage clickability of cards 

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

// move card to "battle area"

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

// remove cards in "battle area"

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


function resetEvent() {


  let button = document.querySelector("#turn")
  button.addEventListener('click', () => countScore())


}


function resetButton() {
  let button = document.querySelector("#turn")
  button.setAttribute("disabled", "")

}


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

