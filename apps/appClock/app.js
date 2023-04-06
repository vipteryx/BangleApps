

function getTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    ampm: ampm
  };
}

function drawTime(time) {
  //clear the screen
  g.clear();

  //draw the time
  g.setFont("Vector", 25);
  var timeString = time.hours + ":" + ("0" + time.minutes).substr(-2) + ":" + ("0" + time.seconds).substr(-2) + " " + time.ampm;
  var x = g.getWidth() / 2; // center x-coordinate
  var y = g.getHeight() / 2 - 10; // subtract half of font size
  g.drawString(timeString, x, y);
}

function updateScreen() {
  var time = getTime();
  drawTime(time);
}

// Set up the app
g.clear();
setInterval(updateScreen, 1000);