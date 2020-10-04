'use strict'

/* ********** movement parameters *************************************************/
let catVelocity = 2 // pixels - positive values move image right and negative - left
const speed = 0.5 // 0 < speed <= catVelocity 
const catDanceLength = 1 // seconds
/* ********************************************************************************/

// Walking cat image
const walkingCat = document.querySelector('img')

// Dancing cat image
const dancingCat = document.createElement('img')
dancingCat.setAttribute('src', './img/dancing-cat.gif')
dancingCat.setAttribute('alt', 'Dancing Queen')
dancingCat.style.position = 'absolute'
dancingCat.style.display = 'none'
document.body.appendChild(dancingCat)

// Position at the left screen border
walkingCat.style.left = `0px`

// Start walking
let promenade = setInterval(catWalk, Math.abs(catVelocity / speed))

function catWalk() {
  const catPosition = walkingCat.getBoundingClientRect() // get cat current position
  const screenCenter = (document.body.clientWidth - catPosition.width) / 2
  // minimum distance which is definitely visited by the cat only ONCE
  const minInterval = Math.abs(catVelocity) / 2

  if (
    // If cat walks out of the window's borders
    catPosition.left + catVelocity + catPosition.width < 0 ||
    catPosition.right + catVelocity - catPosition.width > document.body.clientWidth
  ) {
    // Move cat in opposite direction
    catVelocity = -catVelocity
    // flip cat image horizontally while it hides behind screen left or right margins
    walkingCat.style.transform = `scaleX(${Math.sign(catVelocity)})`
  }

  // Stop walking in the middle of the screen and start dancing
  if (catPosition.left >= screenCenter - minInterval && catPosition.left <= screenCenter + minInterval) {
    clearInterval(promenade) // stop walking
    dancingCat.style.width = catPosition.width + 'px'
    dancingCat.style.left = catPosition.left + 'px' // place dance image by coords of walk
    dancingCat.style.display = 'block' // reveal hidden dancing cat
    walkingCat.style.display = 'none' // hide walking cat
    setTimeout(() => {
      dancingCat.style.display = 'none' // hide dancing cat for a while
      walkingCat.style.display = 'block' // show hidden walking cat
      promenade = setInterval(catWalk, Math.abs(catVelocity / speed)) // restart walking
    }, 1000 * catDanceLength) // dance some time
  }
  // Move cat right or left depending on the sign of the velocity
  walkingCat.style.left = catPosition.left + catVelocity + 'px'
}
