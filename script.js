const cardsContainer = document.getElementById("cards-container");
const cardsAnswers = document.getElementById("cards-answers");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

const checkBtn = document.getElementById("test");
var score = 0;

//current
let currentActiveAnswer = 0;
let currentActiveCard = 0;


const cardsEl = [];
const answersEl = [];

//data
const cardsData = getCardsData();
const answersData = getCardsData();



//to create the cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
  
}
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  const answer = document.createElement("div");
  answer.classList.add("answer");

  if (index === 0) {
    card.classList.add("active");
    answer.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
        </div>
      </div>
  `;



  answer.innerHTML = `
    <div class="inner-card">
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
      </div>
  `;

 

  cardsEl.push(card);
  answersEl.push(answer);

  cardsContainer.appendChild(card);
  cardsAnswers.appendChild(answer);

  updateCurrentText();
}

//number out of number to show card amount
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();



//next
nextBtn.addEventListener("click", () => {
  answersEl[currentActiveAnswer].className = "answer left";

  currentActiveAnswer = currentActiveAnswer + 1;

  if (currentActiveAnswer > answersEl.length - 1) {
    currentActiveAnswer = 0;
  }

  answersEl[currentActiveAnswer].className = "answer active";


});



//before
prevBtn.addEventListener("click", () => {
  answersEl[currentActiveAnswer].className = "answer right";

  currentActiveAnswer = currentActiveAnswer - 1;

  if (currentActiveAnswer < 0) {
    currentActiveAnswer = answersEl.length-1;
  }

  answersEl[currentActiveAnswer].className = "answer active";

  
});


checkBtn.addEventListener("click", () => {
  console.log("you clicked the check button")
 

  const activeQuestion = cardsEl[currentActiveCard].querySelector('.inner-card-front p');
  console.log(activeQuestion.textContent);

  const activeAnswer = answersEl[currentActiveAnswer].querySelector('.inner-card-back p');
  console.log(activeAnswer.textContent);


  //check if answer in bottom box matches answer in array connected to the top box

  
  for( var i = 0; i < answersEl.length; i++){
   

    if(activeQuestion === cardsEl[i].querySelector('.inner-card-front p'))
    {
      if (activeAnswer === answersEl[i].querySelector('.inner-card-back p')) {
        console.log("Correct answer!");
        document.getElementById( "output" ).innerHTML = "Correct!";
        score++;
        console.log("The score is now " + score);


        cardsEl[currentActiveCard].className = "answer left";


        currentActiveCard = currentActiveCard + 1;
        console.log("The index for next question is now " + currentActiveCard);
        if (currentActiveCard >= cardsData.length) {
          currentActiveCard = 0; // Loop back to the first card
        }

        cardsEl[currentActiveCard].className = "answer active";
        updateCurrentText();

      }
      else {
          console.log("Try again");
          document.getElementById( "output" ).innerHTML = "Try again";
      }

    }

  }

  });

 

showBtn.addEventListener("click", () => addContainer.classList.add("show"));

hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

//new card
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

//clear 
clearBtn.addEventListener("click", () => {
  localStorage.clear();

  cardsContainer.innerHTML = "";
  cardsAnswers.innerHTML = "";
  window.location.reload();
});