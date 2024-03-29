
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
          document.getElementById( "output" ).innerHTML = "Correct!";
          score++;
          console.log("The score is now " + score);
          var nextQuestion = i + 1;
          console.log("The index for next question is now " + nextQuestion);
          if (nextQuestion >= cardsData.length) {
            nextQuestion = 0; // Loop back to the first card
          }
          document.getElementById( "question" ).innerHTML = cardsData[nextQuestion].question;
        
        } 
        else {
          console.log("Try again");
          document.getElementById( "output" ).innerHTML = "Try again";
  
        }
  
      }
  
    }
  
    });


    
nextBtn.addEventListener("click", () => {
    currentActiveCard++;
    if (currentActiveCard >= cardsData.length) {
      currentActiveCard = 0; // Loop back to the first card
    }
    generate(currentActiveCard);
    updateCurrentText();
  });
  
  prevBtn.addEventListener("click", () => {
    currentActiveCard--;
    console.log("index is " + currentActiveCard);
  
    if (currentActiveCard < 0) {
      currentActiveCard = cardsData.length -1; // Loop back to the first card
    }
    console.log("index being generated is" + currentActiveCard);
    generate(currentActiveCard);
    updateCurrentText()
  });