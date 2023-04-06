//get the current time

function getTime() {
	
	var date = new Date();
	return{
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds()
	};	
}

//draw the time and progress bar

function drawTime(time) {
	//clear the screen
	g.clear();
	
	//draw the time
	g.setFont("Vector",25);
	var timeString = time.hours + ":" + ("0" + time.minutes).substr(-2) + ":" 
		+ ("0" + time.seconds).substr(-2), 30, 30);
	var x = g.centerX(timeString); // calculate center x-coordinate
	var y = (g.getHeight() / 2) - 10; // subtract half of font size
	g.drawString(timeString, x, y);
}

function drawTime(time) {
  //clear the screen
  g.clear();
	
//update the time and draw the screen
function updateScreen(){
	var time= getTime();
	drawTime(time);
}

// Set up the app
g.clear();
setInterval(updateScreen, 1000);