
var score = 0;


const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const checkBtn = document.getElementById("check-match");


const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");


function generate(index){

  document.getElementById( "question" ).innerHTML = cardsData[index].question;
  document.getElementById( "answer" ).innerHTML = cardsData[index].answer;
}


// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards


// Store card data
//const cardsData = getCardsData();
const cardsEl = [];
const cardsData = [
  {
  question: "What must a variable begin with?",
   answer: "A letter, $ or _",
  },
  {
   question: "What is a variable?",
   answer: "Container for a piece of data",
  },
  {
   question: "Example of Case Sensitive Variable",
   answer: "thisIsAVariable",
  },
  ];

nextBtn.addEventListener("click", () => {
  currentActiveCard++;
  if (currentActiveCard >= cardsData.length) {
    currentActiveCard = 0; // Loop back to the first card
  }
  generate(currentActiveCard);
});

checkBtn.addEventListener("click", () => {
  console.log("you clicked the check button")
  const userAnswer = document.getElementById("answerInput").value;
  const activeQuestion = document.getElementById("question").value;

  //check if answer in bottom box matches answer in array connected to the top box

  for( var i = 0; i < cardsData.length; i++){

    if(activeQuestion === cardsData[i].question)
    {
      if (userAnswer === cardsData[i].answer) {
        console.log("Correct answer!");
        score++;
        console.log("The score is now " + score);
      
      } 

    }
    
  }

  });





// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
      </div>
  `;



  // Add to DOM cards
  cardsEl.push(card);

 

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();



// Previous button
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();

  window.location.reload();
});
