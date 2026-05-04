/*
 * GigaPet - script.js
 * Carlos Moreno
 *
 * jQuery Methods used (unique, not in starter code):
 *  1. .css()       — Dynamically changes inline CSS styles on an element at runtime.
 *                    Used here to change the pet image border color based on happiness level.
 *                    Docs: https://api.jquery.com/css/
 *
 *  2. .delay()     — Adds a timer delay to a jQuery queue before executing the next queued function.
 *                    Used here to auto-hide the speech bubble after a short pause.
 *                    Docs: https://api.jquery.com/delay/
 */

$(function () {
  // Initialize page with current pet info on load
  checkAndUpdatePetInfoInHtml();

  // Button click event bindings
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.rest-button').click(clickedRestButton);
});

// Pet Info Object 
// pet_info stores the current state of the pet with name, weight, happiness, energy
var pet_info = {
  name: "Rex",
  weight: 20,
  happiness: 50,
  energy: 80
};

// Button Handlers 

function clickedTreatButton() {
  // Treat: increases happiness (+10) and weight (+2)
  pet_info.happiness += 10;
  pet_info.weight += 2;
  showSpeechBubble("Yum! That was delicious! &#x1F36A;");
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  // Play: increases happiness (+8) and decreases weight (-1), costs energy (-10)
  pet_info.happiness += 8;
  pet_info.weight -= 1;
  pet_info.energy -= 10;
  showSpeechBubble("Woohoo! Let's play all day! &#x1F3BE;");
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Exercise: decreases happiness (-5) and decreases weight (-3), costs energy (-15)
  pet_info.happiness -= 5;
  pet_info.weight -= 3;
  pet_info.energy -= 15;
  showSpeechBubble("I'm tired... but I feel stronger! &#x1F4AA;");
  checkAndUpdatePetInfoInHtml();
}

// NEW ACTION: Rest
// Rest: restores energy (+30) but decreases happiness slightly (-3)
// Gives the pet a chance to recover energy consumed by play/exercise
function clickedRestButton() {
  pet_info.energy += 30;
  pet_info.happiness -= 3;
  showSpeechBubble("Zzz... that nap was great! &#x1F634;");
  checkAndUpdatePetInfoInHtml();
}

// Core Update Logic 

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
  updatePetImageStyle(); // jQuery .css() — change border color based on happiness
}

function checkWeightAndHappinessBeforeUpdating() {
  // Bug fix: prevent weight from going below 0
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  // Bug fix: prevent happiness from going below 0
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }

  // Cap happiness at 100
  if (pet_info.happiness > 100) {
    pet_info.happiness = 100;
  }

  // Bug fix: prevent energy from going below 0
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }

  // Cap energy at 100
  if (pet_info.energy > 100) {
    pet_info.energy = 100;
  }
}

// Updates the HTML spans with current pet_info values
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}

// ─── jQuery Method 1: .css() ──────────────────────────────────────────────────
/*
 * .css(propertyName, value) sets an inline CSS property on a matched element.
 * Here is is used to dynamically change the pet image's border/glow color
 * based on the pet's happiness level giving a live visual mood indicator.
 * Green glow = happy, yellow = neutral, red = unhappy.
 * Docs: https://api.jquery.com/css/
 */
function updatePetImageStyle() {
  var h = pet_info.happiness;
  var glowColor;

  if (h >= 70) {
    glowColor = '#00ff88'; // happy — green glow
  } else if (h >= 35) {
    glowColor = '#ffd700'; // neutral — yellow glow
  } else {
    glowColor = '#ff4444'; // sad — red glow
  }

  // .css() changes the box-shadow style live based on happiness
  $('.pet-image').css('box-shadow', '0 0 18px 6px ' + glowColor);
  $('.pet-image').css('border-color', glowColor);
}

// ─── jQuery Method 2: .delay() ───────────────────────────────────────────────
/*
 * .delay(duration) inserts a delay into the jQuery effects queue.
 * Here, after showing the speech bubble with .show(), we queue a .delay(2500)
 * followed by .fadeOut() so the bubble disappears automatically after 2.5 seconds
 * without needing a manual setTimeout call.
 * Docs: https://api.jquery.com/delay/
 */
function showSpeechBubble(message) {
  var $bubble = $('#speech-bubble');
  var $text = $('#bubble-text');

  // Set the pet's comment text
  $text.html(message);

  // Show the bubble, wait 2.5 seconds using .delay(), then fade it out
  $bubble.stop(true, true).show().delay(2500).fadeOut(600);
}
