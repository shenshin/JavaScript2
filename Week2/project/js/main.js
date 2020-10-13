// set default session length for the timer
const sessionLength = 1; // munutes - integer
// This is an MVC version of countdown timer.
// Is it a common practice to write MVC-style programs in JS,
// or this approach is escessive here?
//
// Class TimerModel is a 'model' part of the application.
// It is a data-source for it's delegate class TimerController
//        It includes timer logic. It has 6 public methods:
//     (methods and properties names describe their function)
// -increaseSession()
// -decreaseSession()
// -start()
// -stop()
// -pause()
// -reset()
//        And 4 public properties:
// -sessionIsOn (read only)
// -interval (read only)
// -delegate
// -sessionLength (read only)
//        TimerModel's delegate class should implement 2 methods:
// -showTime(date: Date)
// -showAlert()
class TimerModel {
  // private and read only properties:
  #sessionLength;
  #intervalLength;
  #time;
  #sessionIsOn;
  #interval;

  constructor(sessionLength = 1, intervalLength = 10) {
    this.#sessionLength = sessionLength; // in minutes
    this.#intervalLength = intervalLength; // in milliseconds
    this.#time = new Date(); // stores all time data
    this.#sessionIsOn = false; // true if timer is running or paused
    // setInterval function's identifier
    this.#interval = false;
    // reference to a delegate class
    this.delegate = false;

    this.reset();
  }

  // read-only properties

  get sessionLength() {
    return this.#sessionLength;
  }
  get sessionIsOn() {
    return this.#sessionIsOn;
  }
  get interval() {
    return this.#interval;
  }

  // private method

  #countDown() {
    if (this.#time.getMinutes() === 0 && this.#time.getSeconds() === 0) {
      this.stop();
      this.delegate.showAlert();
    } else {
      this.#time.setMilliseconds(
        this.#time.getMilliseconds() - this.#intervalLength,
      );
      this.delegate.showTime(this.#time);
    }
  }

  // public methods

  reset() {
    this.#time.setMinutes(this.sessionLength);
    this.#time.setSeconds(0);
    this.#time.setMilliseconds(0);
    this.#sessionIsOn = false;
    if (this.delegate) {
      this.delegate.showTime(this.#time);
    }
  }

  increaseSession() {
    if (!this.sessionIsOn) {
      this.#sessionLength++;
      this.reset();
    }
  }

  decreaseSession() {
    if (!this.sessionIsOn && this.sessionLength > 0) {
      this.#sessionLength--;
      this.reset();
    }
  }

  start() {
    if (!this.interval && this.sessionLength > 0) {
      this.#interval = setInterval(
        this.#countDown.bind(this),
        this.#intervalLength,
      );
      this.#sessionIsOn = true;
    }
  }

  stop() {
    if (this.interval || this.sessionIsOn) {
      clearInterval(this.interval);
      this.#interval = false;
      this.reset();
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.delegate.showTime(this.#time);
      this.#interval = false;
    }
  }
}

// Connects TimerModel with a user interface
class TimerController {
  constructor(sessionLength = 1) {
    // connect views and controller
    this.timeArea = document.querySelector('.time-area');
    this.arrowUp = document.querySelector('.arrow-up');
    this.arrowDown = document.querySelector('.arrow-down');
    this.sessionLengthIndicator = document.querySelector('.session-length');
    this.minutesIndicator = document.querySelector('.minutes');
    this.secondsDelimIndicator = document.querySelector('.seconds-delimiter');
    this.secondsIndicator = document.querySelector('.seconds');
    this.millisecondsIndicator = document.querySelector('.miliseconds');
    this.playButton = document.querySelector('.play');
    this.stopButton = document.querySelector('.stop');
    this.pauseButton = document.querySelector('.pause');
    this.alertScreen = document.querySelector('.alert');
    this.alertContent = document.querySelector('.alert-content');
    this.alertButton = document.querySelector('.alert-button');
    // set time area's border radius to depend on it's hight
    window.addEventListener('resize', this.setTimeAreaBorderRadius.bind(this));
    window.addEventListener('DOMContentLoaded', this.setTimeAreaBorderRadius.bind(this))
    
    // add event listeners to buttons
    this.arrowUp.addEventListener('click', this.pushArrowUp.bind(this));
    this.arrowDown.addEventListener('click', this.pushArrowDown.bind(this));
    this.playButton.addEventListener('click', this.pushPlay.bind(this));
    this.stopButton.addEventListener('click', this.pushStop.bind(this));
    this.pauseButton.addEventListener('click', this.pushPause.bind(this));
    this.alertButton.addEventListener('click', this.dismissAlert.bind(this));

    // connect the Model
    this.timer = new TimerModel(sessionLength);
    this.timer.delegate = this;
    this.timer.reset();
    this.updateViews();
  }

  // method for enabling/disabling UI elements in different program states
  updateViews() {
    this.sessionLengthIndicator.innerHTML = this.timer.sessionLength;

    [
      // Set all buttons enabled
      this.arrowUp,
      this.arrowDown,
      this.playButton,
      this.stopButton,
      this.pauseButton,
    ].forEach((node) => {
      node.classList.remove('disabled');
      node.classList.add('enabled');
    });

    function setDisabled(condition, ...nodes) {
      if (condition)
        for (const node of nodes) {
          node.classList.remove('enabled');
          node.classList.add('disabled');
        }
    }
    // Disable some of the buttons depending on the program state
    setDisabled(
      this.timer.sessionLength === 0,
      this.playButton,
      this.stopButton,
      this.pauseButton,
      this.arrowDown,
    );
    setDisabled(
      !this.timer.interval && !this.timer.sessionIsOn,
      this.stopButton,
      this.pauseButton,
    );
    setDisabled(!this.timer.interval, this.pauseButton);
    setDisabled(this.timer.sessionIsOn, this.arrowDown, this.arrowUp);
    setDisabled(this.timer.interval, this.playButton);
  }
  // called by the data source (TimerModel)
  showTime(time) {
    function showTwoDigits(number) {
      return ('0' + number).slice(-2);
    }

    function showMilliseconds(number) {
      const ms = number >= 100 ? `${number}` : `0${number}`;
      return ms.slice(0, 2);
    }
    this.minutesIndicator.innerHTML = showTwoDigits(time.getMinutes());
    this.secondsIndicator.innerHTML = showTwoDigits(time.getSeconds());
    this.millisecondsIndicator.innerHTML = showMilliseconds(
      time.getMilliseconds(),
    );
  }
  // called by the data source
  showAlert() {
    this.alertScreen.style.display = 'block';
  }

  // Buttons handlers

  pushArrowUp() {
    this.timer.increaseSession();
    this.updateViews();
  }

  pushArrowDown() {
    this.timer.decreaseSession();
    this.updateViews();
  }

  pushPlay() {
    this.timer.start();
    this.updateViews();
  }

  pushStop() {
    this.timer.stop();
    this.updateViews();
  }

  pushPause() {
    this.timer.pause();
    this.updateViews();
  }

  dismissAlert() {
    this.alertScreen.style.display = 'none';
    this.updateViews();
  }

  // Corners radius setter

  setTimeAreaBorderRadius() {
    const timeAreaHeight = this.timeArea.getBoundingClientRect().height / 4;
    this.timeArea.style.borderRadius = `${timeAreaHeight}px`;
    this.alertContent.style.borderRadius = `${timeAreaHeight}px`;
    this.alertButton.style.borderRadius = `${timeAreaHeight / 3.4}px`;
  }
}

const countDown = new TimerController(sessionLength);

