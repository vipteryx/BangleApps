(function () {
  // 0: off, 1: buzz, 2: beep, 3: both
  var FILE = '5er.json';

  var readSettings = () => {
    var settings =
      require('Storage').readJSON(FILE, 1) ||
      {
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

  // Now the settings are all set.

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
      if ((m !== lastMinute && m % 5 === 0)) chime();
      lastHour = h;
      lastMinute = m;
      // check again in 5 minutes
      var mLeft = 5 - (m % 5),
        sLeft = mLeft * 60 - s,
        msLeft = sLeft * 1000 - ms;
      setTimeout(check, msLeft);
    } else if (settings.freq === 2) {
      if (
        (m !== lastMinute && m === 0) ||
        (m !== lastMinute && m % 15 === 0)
      )
        chime();
      lastHour = h;
      lastMinute = m;
      // check again in 15 minutes
      var mLeft = 15 - (m % 15),
        sLeft = mLeft * 60 - s,
        msLeft = sLeft * 1000 - ms;
      setTimeout(check, msLeft);
    } else if (settings.freq === 3) {
      if (m !== lastMinute) chime();
      lastHour = h;
      lastMinute = m;
      // check again in 1 minute
      var mLeft = 1 - (m % 1),
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