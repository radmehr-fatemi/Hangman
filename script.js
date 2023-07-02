const secretPhrases = ["ali" ,"you" ,"yeah" ,"laptop"]
let randomItem = ""
let clicked = []
let result = "";
let mistakes = 0 ;

function selectRandomItem() {
   randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)]
   console.log(randomItem)
   document.getElementById("letters").addEventListener("click" ,buttonHandler)
   window.addEventListener("keydown" ,keyHandler)
}

function updateHangmanPicture() {
   const picture = document.getElementById("image").querySelector("img");
   picture.src = `assets/hangman${mistakes}.png`
}

function checkIfLose() {
   if (mistakes === 6) {
      document.getElementById("gameover").querySelector("p").style.display = "block";
      document.getElementById("clue").innerHTML = `<p>the random world is ${randomItem}</p>`
      const letters = document.querySelector("#letters").children;
      for (let item of letters) {
         if (item.className !== "used") {
            item.className = "used"
         }
      }
   }
   if (mistakes >= 6){
      document.querySelector("#image").querySelector("img").src = `./assets/hangman6.png`;
   }
}

function checkIfWin(){
   if (randomItem === result) {
      document.getElementById("gameover").querySelector("p").style.display = "block";
      document.getElementById("image").querySelector("img").src ="assets/winner.png"; 
   }
}

function setUnderScore(){
   let splitWorld = randomItem.split("")
   let mappedWorld = splitWorld.map(letter => clicked.indexOf(letter) >= 0 ?letter :"_")
   result = mappedWorld.join(""); 
   console.log(result)
   document.getElementById("clue").innerHTML = `<p>${result}</p>`
   
}

function letterHandler(letter) {
   letter = letter.toLowerCase()
   clicked.indexOf(letter) === -1 ?clicked.push(letter) :null;
   document.getElementById(letter.toUpperCase()).className = "used";

   if (randomItem.indexOf(letter) >= 0) {
      setUnderScore()
      checkIfWin()

   } else if (randomItem.indexOf(letter) === -1) {
      mistakes++
      checkIfLose()
      updateHangmanPicture()

   }
   
}
function buttonHandler(event) {
   letterHandler(event.target.id)
} 


function keyHandler(event) {
   letterHandler(event.key)
}

selectRandomItem()
setUnderScore()