let diamondsSuit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let spadesSuit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let clubsSuit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

// Fisher–Yates shuffle

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// player inputs his card
function playerInput(player, hand) {

  console.log(`Player ${player}'s turn.`)
  let cardStr = prompt(`Player ${player}'s turn, Play a card: `)
  let cardInt = parseInt(cardStr)

  if (hand.includes(cardInt)) {
    return cardInt
  } else {
    alert('No such card in the hand')
    playerInput(player, hand)
  }


}

// deletes card in a hand and returns new hand
function deleteCard(hand, card) {

  let cardIndex = hand.indexOf(card)
  hand.splice(cardIndex, 1)
  return hand

}

function play(diamondsSuit, spadesSuit, clubsSuit) {

  let shuffledSuit = shuffleArray(diamondsSuit)
  console.log(` Diamond cards are ${shuffledSuit}`);

  // inicial turn and hands

  let turn = 1;
  let player1Hand = spadesSuit;
  let player2Hand = clubsSuit;

  // initial score
  let player1Score = 0;
  let player2Score = 0;

  shuffledSuit.forEach(diamondCard => {

    // print turn and diamond card

    console.log(`Turn: ${turn}. Diamond card is ${diamondCard}`)

    // player 1 

    console.log(`Cards left in player one's hand ${player1Hand}`) // display hand
    let player1Card = playerInput("one", player1Hand) // play a card
    player1Hand = deleteCard(player1Hand, player1Card) // returns an array with deleted card from the hand

    // player 2 

    console.log(`Cards left in player two's hand ${player2Hand}`) // display hand
    let player2Card = playerInput("two", player2Hand) // play a card
    player2Hand = deleteCard(player2Hand, player2Card) // returns an array with deleted card from the hand

    // print who played what card to players

    console.log(`Player one card: ${player1Card}. Player two card: ${player2Card}`);
    


    // count score for players if cards are the same then do not count the score

    if (player1Card > player2Card) {

      player1Score = player1Score + diamondCard

    } else if (player1Card < player2Card) {

      player2Score = player2Score + diamondCard

    } else (
      console.log("Cards are equal, nobody gets points")
    )

    let score = `Player one score: ${player1Score}, player two score ${player2Score}`

    console.log(score)


    // next turn 

    turn++

    // delete diamond card form screen


  });

  if (player1Score > player2Score) {

    console.log("Player 1 won")
  } else if (player1Score < player2Score) {
    console.log("Player 2 won")
  } else {
    console.log("It's a tie")
  }


}

play(diamondsSuit, spadesSuit, clubsSuit)

