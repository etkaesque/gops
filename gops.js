let diamondsSuit = [1,2,3,4,5,6,7,8,9,10,11,12,13]
let spadeSuit = [1,2,3,4,5,6,7,8,9,10,11,12,13]
// let heartsSuit = [1,2,3,4,5,6,7,8,9,10,11,12,13]
let clubsSuit = [1,2,3,4,5,6,7,8,9,10,11,12,13]

let turn = 1; 

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
let shuffledSuit = shuffleArray(diamondsSuit)

