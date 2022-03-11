var playing = false;
var score;
var timeremaining;
var correctAnswer;

//If we click on start\reset
 document.getElementById("startreset").onclick = function(){
	//If we are playing
	if(playing == true)
	{
		location.reload(); //reload the page
	}
	else //If we are not playing
	{
		//change mode to playing
		playing = true;
		score = 0; // set score to 0
	document.getElementById("scorevalue").innerHTML = score;
		
		//show countdown box
		show("timeremaining")
		timeremaining = 60;
	document.getElementById("timeremainingvalue").innerHTML = timeremaining;	

		//Hide game over box
		hide("gameOver");

		//change button to reset
	document.getElementById("startreset").innerHTML = "Reset";		
		
		//start countdown
		startcountdown();

		//generate new Q&A
		generateQA();

	}
 }

 //clicking on an answer box
 for(i=1;i<5;i++)
 {

	document.getElementById("box"+i).onclick = function() {
	//check if we are playing
		if (playing==true) {
			if (this.innerHTML == correctAnswer) {
			//correct answer

			//increase score by 1 
				score++;
				document.getElementById("scorevalue").innerHTML = score;

			//hide wrong box and show the correct box
				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");
				}, 1000);
				//Generate new Q&A
				generateQA();
			}
			else{
				//wrong answer
				hide("correct");
				show("wrong");
				setInterval(function(){
					hide("correct");
				}, 1000);	
			}

		}
	}
 }

 	//Functions

//Start Contdown
function startcountdown()
 {
 	action = setInterval(function() {
 		timeremaining -= 1;
	document.getElementById("timeremainingvalue").innerHTML = timeremaining;
 	if (timeremaining == 0) {

 		//Game over
 		stopcountdown();
 		show("gameOver");
 		document.getElementById("gameOver").innerHTML = "<p>Game Over</p><p>Your score is "+ score +".</p>"
 		
 		hide("timeremaining");
 		hide("correct");
 		hide("wrong");
 		playing = "false";
 		document.getElementById("startreset").innerHTML = "Start Game";
 		}
 	}, 1000);
 }

 //Stops Countdown
 function stopcountdown()
 {
 	clearInterval(action);	
 }

 //Hide an Elements
 function hide(Id)
 {
 	document.getElementById(Id).style.display = "none";
 }

//Show an elements
 function show(Id)
 {
 	document.getElementById(Id).style.display = "block";
 }

 //Generate Question and Answers
 function generateQA()
 {
 	var x = 1 + Math.round(9*Math.random());
 	var y = 1 + Math.round(9*Math.random());
 	correctAnswer = x*y;
 	document.getElementById("question").innerHTML = x+"*"+y;
 	var correctPosition = 1 + Math.round(3*Math.random());
 	document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

 	var answers = [correctAnswer];
 	//fill other boxes with wrong answers
 	for (var i = 1; i < 5; i++) {
 		if (i !== correctPosition) {
 			var wrongAnswer;
 			do{
 				wrongAnswer = (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
 			}while(answers.indexOf(wrongAnswer)>-1)

 			document.getElementById("box"+i).innerHTML = wrongAnswer;
 			answers.push(wrongAnswer);
 		}
 	}	
 }
