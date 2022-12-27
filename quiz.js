function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionsIndex = 0 ;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionsIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionsIndex++;
    
}

Quiz.prototype.isEnded = function () {
    return this.questionsIndex === this.questions.length ;
}

function Question(text,choices,answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;
}

function loadQuestions() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        var questionElement = document.getElementById("question");  
        questionElement.innerHTML = quiz.getQuestionByIndex().text;
        
        var choicesList = quiz.getQuestionByIndex().choices;
       // console.log("Choice: ", choicesList);

        for(var i= 0; i< choicesList.length ;i++){
            var elements = document.getElementById("choice" + i)
            //console.log("Choice: ", elements);

            elements.innerHTML = choicesList[i];
            handleOptionButton("option"+ i, choicesList[i]);
        }

        showProgress();
    }

}

function handleOptionButton(id, choice) {
        var btn = document.getElementById(id);
        btn.onclick = function (){
           quiz.checkOptionWithAnswer(choice);
           loadQuestions();
        }
}

function showProgress(){
    var currentq = quiz.questionsIndex + 1;
    var progressElement = document.getElementById("quiz-progress");
    progressElement.innerHTML = "Question " + currentq + " of " + quiz.questions.length;
}


function showScores() {
    var quizendHeader = document.getElementById("quiz-header");
    var quizendResultelement = document.getElementById("quiz-body");
    quizendHeader.innerHTML = `<h1> Results </h1>`;

 //   quizEndHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";

   // quizendResultelement.innerHTML = quizEndHTML;
   quizendResultelement.innerHTML = `<h2 id='score'> Your scores is: ${quiz.score} and mark percentage is: ${(quiz.score/questions.length*100)}%.  </h2>`;

}

var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

var quiz = new Quiz(questions);

loadQuestions();