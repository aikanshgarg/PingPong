var player1 = document.querySelector('#player1')

document.addEventListener('keydown', function(){
var p1 = player1.getBoundingClientRect();
    if (event.key == 's' && (p1.y + p1.height) < window.innerHeight){
    	player1.style.top = p1.y + 20 + 'px';
    }
    if (event.key == 'w' && p1.y > 0){
    	player1.style.top = p1.y - 20 + 'px';
    }
});

//-----------------------------------------------------------
var player2 = document.querySelector('#player2')

document.addEventListener('keydown', function(){
var p2 = player2.getBoundingClientRect();
    if (event.key == 'ArrowDown' && (p2.y + p2.height) < window.innerHeight){
    	player2.style.top = p2.y + 20 + 'px';
    }
    if (event.key == 'ArrowUp' && p2.y > 0){
    	player2.style.top = p2.y - 20 + 'px';
    }
});

//------------------GAME CODE STARTS-----------------------------------------

var ball =  document.querySelector('#ball')

	var movement;

	function startBall(){

		clearInterval(movement);

// to slide down the restart_div and stop the ball's movement, when either player scores 5 goals
		if (score1 === 5 || score2 === 5) {
			if (score2 === 5){
				$("#winner_div span").text("PLAYER-2");
			}
			if (score1 === 5){
				$("#winner_div span").text("PLAYER-1");
			}
			restart_div.slideDown();
			return clearInterval(movement);
		}	 

		let ballX = ball.getBoundingClientRect().x;
		let ballY = ball.getBoundingClientRect().y;

		let newX = Math.random() * window.innerWidth;
		let newY = Math.random() * window.innerHeight;

		let moveX = 1.3;
		let moveY = 1.3;

		if (newX < ballX ){
			moveX = -1*moveX;
		}

		if (newY < ballY){
			moveY = -1*moveY;
		}

		movement = setInterval(function(){
			ballX += moveX;
			ballY += moveY;
			ball.style.left = ballX + 'px';
			ball.style.top = ballY + 'px';

			           // for collision with upper and lower walls
        if ((ball.getBoundingClientRect().y < 0) || (ball.getBoundingClientRect().top > window.innerHeight-32)){
         	startBall();
         }
                       // for collison with left wall
		if (ballX < 0){
         	score2++;
         	score_2.text(score2);
         	startBall();
         }
                      // for collison with right wall
         if (ball.getBoundingClientRect().right > window.innerWidth) {
         	score1++;
         	score_1.text(score1);
         	startBall();
         }
                     // for ball's collison with paddles
         if (collision (ball1, player1a) || collision (ball1, player2a)){
         	startBall();
         }

		});
	}

	// to click on the restart button and refresh the page
		$(document).ready(function(){
			restart_btn.click(function(){
				window.location.reload();
			});
		});

// Players' score variables
var score1 = 0;
var score2 = 0;
var score_1 = $('#score_1');
var score_2 = $('#score_2');
var restart_div = $('#restart_div');
var restart_btn = $('#restart_btn');


//----------------------GAME CODE ENDS-----------------------------------------------

// Logic for collision between two objects
var ball1 = $('#ball');
var player1a = $('#player1');
var player2a = $('#player2');

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }