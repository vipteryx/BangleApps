(function () {
  // 0: off, 1: buzz, 2: beep, 3: both
  var FILE = "5er.json";

  var readSettings = () => {
    var settings = require("Storage").readJSON(FILE, 1) || {
      type: 1,
      freq: 0,
      repeat: 1,
      sleep: true,
      start: 6,
      end: 22,
    };
    return settings;
  };

  var settings = readSettings();

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function chime() {
    for (var i = 0; i < settings.repeat; i++) {
      if (settings.type === 1) {
        Bangle.buzz(100);
      } else if (settings.type === 2) {
        Bangle.beep();
      } else {
        return;
      }
      sleep(150);
    }
  }

  let lastHour = new Date().getHours();
  let lastMinute = new Date().getMinutes(); // don't chime when (re)loaded at a whole hour
  function check() {
    const now = new Date(),
      h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds(),
      ms = now.getMilliseconds();
    if (
      (settings.sleep && h > settings.end) ||
      (settings.sleep && h >= settings.end && m !== 0) ||
      (settings.sleep && h < settings.start)
    ) {
      var mLeft = 60 - m,
        sLeft = mLeft * 60 - s,
        msLeft = sLeft * 1000 - ms;
      setTimeout(check, msLeft);
      return;
    }
    if (settings.freq === 1) {
      if ((m !== lastMinute && m === 0) || (m !== lastMinute && m === 30))
        chime();
      lastHour = h;
      lastMinute = m;
      // check again in 30 minutes
      switch (true) {
        case m / 30 >= 1:
          var mLeft = 30 - (m - 30),
            sLeft = mLeft * 60 - s,
            msLeft = sLeft * 1000 - ms;
          break;
        case m / 30 < 1:
          var mLeft = 30 - m,
            sLeft = mLeft * 60 - s,
            msLeft = sLeft * 1000 - ms;
          break;
      }
      setTimeout(check, msLeft);
    } else if (settings.freq === 2) {
      if (
        (m !== lastMinute && m === 0) ||
        (m !== lastMinute && m === 15) ||
        (m !== lastMinute && m === 30) ||
        (m !== lastMinute && m === 45)
      )
        chime();
      lastHour = h;
      lastMinute = m;
      // check again in 15 minutes
      switch (true) {
        case m / 15 >= 3:
          var mLeft = 15 - (m - 45),
            sLeft = mLeft * 60 - s,
            msLeft = sLeft * 1000 - ms;
          break;
        case m / 15 >= 2:
          var mLeft = 15 - (m - 30),
            sLeft = mLeft * 60 - s,
            msLeft = sLeft * 1000 - ms;
          break;
        case m / 15 >= 1:
          var mLeft = 15 - (m - 15),
            sLeft = mLeft * 60 - s,
            msLeft = sLeft * 1000 - ms;
          break;
        case m / 15 < 1:
          var mLeft = 15 - m,
            sLeft = mLeft * 60 - s,
            msLeft = sLeft * 1000 - ms;
          break;
      }
      setTimeout(check, msLeft);
  // ...
  } else if (settings.freq === 3) {
    if (
      (m !== lastMinute && m === 0) ||
      (m !== lastMinute && m === 5) ||
      (m !== lastMinute && m === 10) ||
      (m !== lastMinute && m === 15) ||
      (m !== lastMinute && m === 20) ||
      (m !== lastMinute && m === 25) ||
      (m !== lastMinute && m === 30) ||
      (m !== lastMinute && m === 35) ||
      (m !== lastMinute && m === 40) ||
      (m !== lastMinute && m === 45) ||
      (m !== lastMinute && m === 50) ||
      (m !== lastMinute && m === 55)
    )
      chime();
    lastHour = h;
    lastMinute = m;
    // check again in 5 minutes
    switch (true) {
      case m / 5 >= 11:
        var mLeft = 5 - (m - 55),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 10:
        var mLeft = 5 - (m - 50),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 9:
        var mLeft = 5 - (m - 45),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 8:
        var mLeft = 5 - (m - 40),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 7:
        var mLeft = 5 - (m - 35),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 6:
        var mLeft = 5 - (m - 30),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 5:
        var mLeft = 5 - (m - 25),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 4:
        var mLeft = 5 - (m - 20),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
      case m / 5 >= 3:
        var mLeft = 5 - (m - 15),
          sLeft = mLeft * 60 - s,
          msLeft = sLeft * 1000 - ms;
        break;
	  case m / 5 >= 2:
	    var mLeft = 5 - (m - 10),
	      sLeft = mLeft * 60 - s,
	      msLeft = sLeft * 1000 - ms;
	    break;
	  case m / 5 >= 1:
	    var mLeft = 5 - (m - 5),
	      sLeft = mLeft * 60 - s,
	      msLeft = sLeft * 1000 - ms;
	    break;
	case m / 5 < 1:
	  var mLeft = 5 - m,
	    sLeft = mLeft * 60 - s,
	    msLeft = sLeft * 1000 - ms;
	  break;
     setTimeout(check, msLeft);
    } else if (settings.freq === 4) {
      if (m !== lastMinute) chime();
      lastHour = h;
      lastMinute = m;
      // check again in 1 minute

      var mLeft = 1,
        sLeft = mLeft * 60 - s,
        msLeft = sLeft * 1000 - ms;
      setTimeout(check, msLeft);
    } else {
      if (h !== lastHour && m === 0) chime();
      lastHour = h;
      // check again in 60 minutes
      var mLeft = 60 - m,
        sLeft = mLeft * 60 - s,
        msLeft = sLeft * 1000 - ms;
      setTimeout(check, msLeft);
    }
  }

  check();
})();
