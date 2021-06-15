var stenen = [];
var position = 45;
var paddle;
var goingleft = true;
var goingToTop = true;
var BodemRaak = false;
var shotupY;
var shotupX
var bal;
var score3;
var score2;
var score1;
var Left;

var levens = 3;
var gameStart = false;
class Steen {
	Kleur;
	Breedte;
	Lengte;
	img = "";
	constructor(img) {
		this.img = img;
	}
}
function startGame(key) {
	if (key == 32) {
		gameStart = true;
	}
	if (gameStart) {
		
		document.getElementById("text").style.display = "none";
		maakImages()
		drawLevens3()
		PlayBackgroundMusic()
		//		document.getElementById('body').onload = function(){}
		document.getElementById('body').onkeydown = function() {
			maakBall(event.key)	
		};
	}
}
function startScreen() {
	if (!gameStart) {
	}
}
function maakSteen(positionX, positionY) {
	var steen = document.createElement("img");
	steen.className = "blok1"
	steen.src = "block.png";
	steen.style.width = 100 + "px";
	steen.style.height = 50 + "px";
	steen.style.position = "fixed";
	var Steen1 = new Steen(steen);
	steen.style.left = parseInt(positionX) + "%";
	steen.style.top = parseInt(positionY) + "%";
	document.getElementById("body").appendChild(steen);
	stenen.push(Steen1);
}
function maakImages() {
	maakPaddle();
	maakSteen(7, 5);
	maakSteen(17, 5);
	maakSteen(27, 5);
	maakSteen(37, 5);
	maakSteen(47, 5);
	maakSteen(57, 5);
	maakSteen(67, 5);
	maakSteen(77, 5);
	maakSteen(87, 5);
//	-------------------------
	maakSteen(7, 15);
	maakSteen(17, 15);
	maakSteen(27, 15);
	maakSteen(37, 15);
	maakSteen(47, 15);
	maakSteen(57, 15);
	maakSteen(67, 15);
	maakSteen(77, 15);
	maakSteen(87, 15);
	console.log("aantal stenen: " + stenen.length)
}
function maakImages1() {
	
	maakSteen(7, 5);
	maakSteen(17, 5);
	maakSteen(27, 5);
	maakSteen(37, 5);
	maakSteen(47, 5);
	maakSteen(57, 5);
	maakSteen(67, 5);
	maakSteen(77, 5);
	maakSteen(87, 5);
//	-------------------------
	maakSteen(7, 15);
	maakSteen(17, 15);
	maakSteen(27, 15);
	maakSteen(37, 15);
	maakSteen(47, 15);
	maakSteen(57, 15);
	maakSteen(67, 15);
	maakSteen(77, 15);
	maakSteen(87, 15);
	console.log("aantal stenen: " + stenen.length)
}
function maakBall(key) {
	if (key == 'Enter') {
		bal = document.createElement('img')
		bal.className = 'ball';
		bal.src = "ball.png"
		bal.style.width = 30 + "px";
		bal.style.height = 30 + "px";
		bal.style.position = "fixed";
		bal.style.left = parseInt(position + 4) + "%";
		bal.style.top = 72 + "%";
		document.getElementById("body").appendChild(bal);
	}
}
function beweegball() {
	var bal = document.getElementsByClassName('ball');
	for (var a = 0; a < bal.length; a++) {
		shotupY = parseInt(bal[a].style.top, 10);
		shotupX = parseInt(bal[a].style.left, 10);
		if (shotupY <= 0) {
			//			hoogte is 0/ raakt top
			//			console.log('hoogte is 0')
			goingToTop = false;
		}
		if (shotupX >= 100) {
			//			left is 100/ raakt rechts

			goingleft = true;
		}
		if (shotupX <= 0) {
			//			left is 0/ raakt links
			//			console.log('left is 0')
			goingleft = false
		}
		if (shotupY == 100) {
			BodemRaak = true;
			Score();
			Left = bal[a].style.left	
}
			
		if (goingleft) {
			bal[a].style.left = shotupX - 1 + "%";
		}
		if (!goingleft) {
			bal[a].style.left = shotupX + 1 + "%";
		}
		if (goingToTop) {
			bal[a].style.top = shotupY - 1 + "%";
		}
		if (!goingToTop) {
			bal[a].style.top = shotupY + 1 + "%";
		}
		var blokken = document.getElementsByClassName('blok1');
		for (var i = 0; i < blokken.length; i++) {
			var raken = collision(bal[a], blokken[i]);
			if (raken && goingToTop && goingleft) {
				bal[a].style.top = shotupY + 1 + "%";
				document.getElementById("body").removeChild(blokken[i])
				bal[a].style.left = shotupX + 1 + "%";
			}
			if (raken && goingToTop && !goingleft) {
				bal[a].style.top = shotupY + 1 + "%";
				document.getElementById("body").removeChild(blokken[i])
				bal[a].style.left = shotupX - 1 + "%";
			}
			if (raken && !goingToTop && !goingleft) {
				bal[a].style.top = shotupY - 1 + "%";
				document.getElementById("body").removeChild(blokken[i])
				bal[a].style.left = shotupX - 1 + "%";
			}
			if (raken && !goingToTop && goingleft) {
				bal[a].style.top = shotupY - 1 + "%";
				document.getElementById("body").removeChild(blokken[i])
				bal[a].style.left = shotupX + 1 + "%";
			}
		}
		var rakenpaddle = collisionpaddle(bal[a], paddle);
		if (rakenpaddle) {
			goingToTop = true
			HitPaddleSound()
			console.log('paddle geraakt')
		}
	}
}
function maakPaddle() {
	paddle = document.createElement("img");
	paddle.className = "player"
	paddle.src = "paddle.png";
	paddle.style.width = 150 + "px";
	paddle.style.height = 50 + "px";
	paddle.style.position = "fixed";
	paddle.style.left = parseInt(position) + "%";
	paddle.style.top = 75 + "%";
	document.getElementById("body").appendChild(paddle);
}
setInterval(stuiter, 20)
function stuiter() {
	if (BodemRaak) {
		
		var bal1 = document.getElementsByClassName('ball');
		for (var i = 0; i < bal1.length; i++) {
//
			document.getElementById('body').removeChild(bal1[i])
		}
		var balDead = document.createElement("img");
		balDead.className = "gif"
		balDead.src = "ball1.gif";
		balDead.style.width = 70 + "px";
		balDead.style.height = 70 + "px";
		balDead.style.position = "fixed";
		balDead.style.left = parseInt(Left) + "%";
		balDead.style.top = 91 + "%";
		document.getElementById("body").appendChild(balDead);
	}
}
window.onload = init();
function init() {
	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
}
function getCursorXY(e) {
	var x;
	x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var newX = x - 60;
	var xPercent = parseInt(newX / window.innerWidth * 100);
	paddle.style.left = xPercent + "%";
}
setInterval(beweegball, 15);
function collision(ball, blok) {
	var presiesie = 4;
	var imgtop = parseInt(ball.style.top, 10)
	var bloktop = parseInt(blok.style.top, 10)
	var imgleft = parseInt(ball.style.left, 10)
	var blokleft = parseInt(blok.style.left, 10)
	if (imgtop <= bloktop + presiesie && imgtop >= bloktop - presiesie) {
		if (imgleft <= blokleft + presiesie && imgleft >= blokleft - presiesie) {
			return true;
		}
	} else {
		return false;
	}
}
function collisionpaddle(ball, paddle) {
	var presiesie = 4;
	var imgtop = parseInt(ball.style.top, 10)
	var paddletop = parseInt(paddle.style.top, 10)
	var imgleft = parseInt(ball.style.left, 10)
	var paddleleft = parseInt(paddle.style.left, 10)
	if (imgtop <= paddletop + presiesie && imgtop >= paddletop - presiesie) {
		if (imgleft <= paddleleft + presiesie && imgleft >= paddleleft - presiesie) {
			return true;
		}
	} else {
		return false;
	}
}
function drawLevens3(){
		score3 = document.createElement("img");
		score3.className = "Leven3"
		score3.src = "Leven3.png";
		score3.style.width = 100 + "px";
		score3.style.height = 70 + "px";
		score3.style.position = "fixed";
		score3.style.left = 2 + "%";
		score3.style.top = 80 + "%";
		document.getElementById("body").appendChild(score3);
}
function drawLevens2(){
	document.getElementById('body').removeChild(score3);
		score2 = document.createElement("img");
		score2.className = "Leven2"
		score2.src = "Leven2.png";
		score2.style.width = 100 + "px";
		score2.style.height = 70 + "px";
		score2.style.position = "fixed";
		score2.style.left = 2 + "%";
		score2.style.top = 80 + "%";
		document.getElementById("body").appendChild(score2);
}
function drawLevens1(){
	document.getElementById('body').removeChild(score2);
	score1 = document.createElement("img");
		score1.className = "Leven1"
		score1.src = "Leven1.png";
		score1.style.width = 100 + "px";
		score1.style.height = 70 + "px";
		score1.style.position = "fixed";
		score1.style.left = 2 + "%";
		score1.style.top = 80 + "%";
		document.getElementById("body").appendChild(score1);
}
function Score() {
	levens = levens - 1;
	console.log(levens)
	if(levens == 2){
		console.log(levens)
		drawLevens2()
		maakImages1()
	}
	if(levens ==1){
	console.log(levens)
		drawLevens1()
		maakImages1()
	}
}
function PlayBackgroundMusic() {
	audio3 = new Audio("background.mp3");
	audio3.volume = 0.1;
	audio3.play();
}
function HitPaddleSound() {
	const audio = new Audio("hitPaddle.mp3");
	audio.volume = 0.8;
	audio.play();
}