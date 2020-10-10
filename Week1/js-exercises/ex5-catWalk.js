'use strict';

/* ********** movement parameters ************************************************ */
const catSmoothness = 2; // pixels - distance the cat moves in one step
const catSpeed = 0.5; // 0 < speed <= catSmoothness - how fast the cat walkes
const catDanceLength = 1; // seconds - time that cat dances in the middle of the screen
/* ******************************************************************************* */

class CatImage {
  constructor(htmlElement) {
    this.image = htmlElement;
  }

  show() {
    this.image.style.display = 'block';
  }

  hide() {
    this.image.style.display = 'none';
  }

  rotate(direction) {
    // flip cat image horizontally while it hides behind screen left or right margins
    this.image.style.transform = `scaleX(${Math.sign(direction)})`;
  }

  get width() {
    return parseInt(this.image.clientWidth, 10);
  }

  set width(newValue) {
    this.image.style.width = newValue + 'px';
  }

  get left() {
    return parseInt(this.image.style.left, 10);
  }

  set left(newValue) {
    this.image.style.left = newValue + 'px';
  }

  get right() {
    return this.left + this.width;
  }
}
class Cat {
  constructor(walkingCatElement, dancingCatElement, smoothness, speed, danceLength) {
    this.stepLength = smoothness;
    this.speed = speed;
    this.danceLength = danceLength;
    // cat images
    this.walkingCat = new CatImage(walkingCatElement);
    this.dancingCat = new CatImage(dancingCatElement);
    // Position at the left screen border
    this.walkingCat.left = 0;
  }

  startWalk() {
    this.promenade = setInterval(this.walk.bind(this), Math.abs(this.stepLength / this.speed));
  }

  walk() {
    const screenCenter = (document.body.clientWidth - this.walkingCat.width) / 2;
    // minimum distance which is definitely visited by the cat only ONCE
    const minInterval = Math.abs(this.stepLength) / 2;
    if (
      // Rorate If cat walks out of the window's borders
      this.walkingCat.left + this.stepLength + this.walkingCat.width < 0 ||
      this.walkingCat.right + this.stepLength - this.walkingCat.width > document.body.clientWidth
    ) {
      this.rotate();
    }

    // Stop walking in the middle of the screen and start dancing
    if (
      this.walkingCat.left >= screenCenter - minInterval &&
      this.walkingCat.left <= screenCenter + minInterval
    ) {
      this.dance();
    }

    // Move cat right or left depending on the sign of the velocity
    this.walkingCat.left += this.stepLength;
  }

  rotate() {
    // Move cat in opposite direction
    this.stepLength = -this.stepLength;
    this.walkingCat.rotate(this.stepLength);
  }

  dance() {
    clearInterval(this.promenade); // stop walking
    this.dancingCat.width = this.walkingCat.width;
    this.dancingCat.left = this.walkingCat.left; // place dance image by coords of walk
    this.dancingCat.show(); // reveal hidden dancing cat
    this.walkingCat.hide(); // conceal walking cat
    setTimeout(this.restartWalk.bind(this), 1000 * this.danceLength); // dance some time
  }

  restartWalk() {
    this.dancingCat.hide(); // conceal dancing cat for a while
    this.walkingCat.show(); // show hidden walking cat
    this.startWalk(); // restart walking
  }
}

// Walking cat
const walkingCat = document.querySelector('img');
// Create dancing cat image
const dancingCat = document.createElement('img');
dancingCat.setAttribute('src', './img/dancing-cat.gif');
dancingCat.setAttribute('alt', 'Dancing Queen');
dancingCat.style.position = 'absolute';
dancingCat.style.display = 'none';
document.body.appendChild(dancingCat);
const cat = new Cat(walkingCat, dancingCat, catSmoothness, catSpeed, catDanceLength);
cat.startWalk();
