'use strict';

/**
 
 ** Exercise 3: The logo hijack **
 
 No homepage is safe from the logo bandit!Everytime he sees a Google 
 Logo he replaces it with a logo from HackYourfuture instead: 
 https: //www.hackyourfuture.dk/static/logo-dark.svg.

 In this exercise you 're expected to write a JavaScript function 
 that can be executed in the console of the 
 [Google website](https://www.google.com).

 1. Find out how to select the element that contains the Google logo, 
 and store it in a variable.
 2. Modify the source and sourceset of the logo so that it 's replaced 
 by the HackYourFuture logo instead.

 */

// This a logo image on Google website

/* <img alt="Google" height="92" id="hplogo"
src="/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
srcset="/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png 
1x, /images/branding/googlelogo/2x/googlelogo_color_272x92dp.png 2x"
style="padding-top:109px" width="272"> */

function hijackGoogleLogo() {
  // your code goes in here
  const googleLogoImage = document.getElementById('hplogo');
  const googleLogoParent = googleLogoImage.parentElement;
  const hyfLogoImage = document.createElement('img');
  hyfLogoImage.setAttribute('src', 'https://www.hackyourfuture.dk/static/logo-dark.svg');
  hyfLogoImage.setAttribute('alt', 'Hack Your Google!');
  hyfLogoImage.id = 'hplogo';
  hyfLogoImage.style.width = '272px';
  hyfLogoImage.style.paddingTop = '50px';

  googleLogoParent.replaceChild(hyfLogoImage, googleLogoImage);
}
hijackGoogleLogo();
