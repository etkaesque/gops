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

let shuffledSuit = shuffleArray(diamondsSuit)

console.log(shuffledSuit)


function writeDiamonds(shuffledSuit) {

    shuffledSuit.slice().reverse().forEach(card => {

        let cardImage = document.createElement('img')
        cardImage.setAttribute("src",`cards/diamonds/diamond${card}.svg`)
        cardImage.setAttribute("id",`card${card}`)
        document.getElementById("playground").appendChild(cardImage);
        
        
        
    });


}

writeDiamonds(shuffledSuit)