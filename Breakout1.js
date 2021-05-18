var stenen = [];
var position = 45;
var paddle;
var goingleft = true;
var goingToTop = true;
var BodemRaak = false;
var bal;
class Steen {
	Kleur;
	Breedte;
	Lengte;
	img = "";
	constructor(img) {
		this.img = img;
	}
}
function maakSteen(positionX, positionY) {
	var steen = document.createElement("img");
	steen.className = "blok1"
	steen.src = "steenNormal.png";
	steen.style.width = 70 + "px";
	steen.style.height = 70 + "px";
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
		var shotupY = parseInt(bal[a].style.top, 10);
		var shotupX = parseInt(bal[a].style.left, 10);

//		if (shotupY >= 100) {
//			//			hoogte is 100/ raakt bodem
//			//			console.log('hoogte is 100')
//			goingToTop = true;
//		}
		if (shotupY <= 0) {
			//			hoogte is 0/ raakt top
			//			console.log('hoogte is 0')
			goingToTop = false;
		}
		if (shotupX >= 100) {
			//			left is 100/ raakt rechts
			console.log('left is 100')
			goingleft = true;
		}
		if (shotupX <= 0) {
			//			left is 0/ raakt links
			//			console.log('left is 0')
			goingleft = false
		}
		if(shotupY >= 100){
			BodemRaak = true;
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
		if(BodemRaak){
			bal[a].style.left = shotupX + 0 + "%";
			bal[a].style.top = shotupY - 1 + "%";
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
		if (rakenpaddle && goingToTop) {
			bal[a].style.top = shotupY + 1 + "%";

		}
		if (rakenpaddle && !goingToTop) {
			bal[a].style.top = shotupY - 1 + "%";

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
//function beweegPaddle(key) {
//	if (position < 90 && key == 'ArrowRight') {
//		paddle.style.left = position + 2 + "%";
//		position += 2;
//	}
//	if (position > 0 && key == 'ArrowLeft') {
//		paddle.style.left = position - 2 + "%";
//		position -= 2;
//	}
//}
//function movePaddle(e) {
//	var x = e.screenX;
//	paddle.style.left = x + "px";
//	
//}
//function movePaddle(e) {
//	var x = e.clientX;
//	var newposX = x - 60;
//	paddle.style.left = newposX + "px"
//	console.log(x)
//}
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
	paddle.style.left = newX + "px";
	console.log(x)
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
	console.log('geraakt')

	var imgtop = parseInt(ball.style.top, 10)
	var paddletop = parseInt(paddle.style.top, 10)
	paddletop = (paddletop * 10000) / 100
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