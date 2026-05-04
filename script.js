/*
 * GigaPet - script.js
 * Carlos Moreno
 *
 * jQuery Methods used (unique, not in starter code):
 *  1. .css()       - Dynamically changes inline CSS styles on an element at runtime.
 *                    Used here to change the pet image border color based on happiness level.
 *                    Docs: https://api.jquery.com/css/
 *
 *  2. .delay()     - Adds a timer delay to a jQuery queue before executing the next queued function.
 *                    Used here to auto-hide the speech bubble after a short pause.
 *                    Docs: https://api.jquery.com/delay/
 *
 *    Chrome DevTools Examples 
 *  This file demonstrates the following DevTools features:
 *
 *  MESSAGE LOGGING
 *    - console.info()   - logInfo()         called on every pet state update
 *    - console.warn()   - logWarning()       called when energy or happiness is critical
 *    - console.error()  - logError()         called when a stat hits its floor/cap
 *    - console.table()  - logged on page load for the pets roster (see egg.js)
 *    - console.group()  - wraps each button-click update cycle
 *    - console.log(%c)  - styled banner logged when a pet hatches
 *
 *  BROWSER-LOGGED MESSAGES  (triggered via DevTools Demo Panel - see devtools.js)
 *    - 404 Network Error  - fetch a broken image URL
 *    - TypeError          - call a method on null
 *    - Violation          - 350 ms synchronous busy-wait
 *
 *  FILTER MESSAGES  (instructions printed to console on load - see devtools.js)
 *    - Filter by log level, text, regex, source, user messages
 *
 *  SOURCES / BREAKPOINTS / VARIABLE INSPECTION
 *    - Line-of-code breakpoint target: clickedTreatButton() line ~70
 *    - debugger statement in checkAndUpdatePetInfoInHtml() for Sources UI demo
 *    - Scope pane: pet_info visible as global; chosenPet visible as local in hatchEgg()
 *    - Watch expressions documented in comments below
 *    - The Console: evaluate pet_info live while paused
 *
 *  REPRODUCE A BUG / APPLY A FIX
 *    - Bug: buttons were double-bound in egg.js AND script.js (now fixed - see egg.js)
 *    - Fix: removed duplicate .click() bindings from egg.js ready handler
 */

var pet_info = {
  name: "Rex",
  weight: 20,
  happiness: 50,
  energy: 80
};

// Custom styled banner - console.log with %c formatting
console.log(
  '%c🐾 GigaPet Loaded',
  'background:#0d0f14; color:#00e5ff; font-size:13px;' +
  'font-weight:bold; padding:4px 12px; border-radius:4px;'
);

function logInfo(action) {
  console.info('[GigaPet] Action:', action, '| State:', JSON.parse(JSON.stringify(pet_info)));
}

function logWarning() {
  if (pet_info.energy <= 20) {
    console.warn('[GigaPet] Energy critically low!', pet_info.energy);
  }
  if (pet_info.happiness <= 15) {
    console.warn('[GigaPet] Happiness critically low!', pet_info.happiness);
  }
}

function logError(stat, value, limit) {
  console.error('[GigaPet] Stat "' + stat + '" hit boundary. Value:', value, '| Limit:', limit);
}

$(function () {
  checkAndUpdatePetInfoInHtml();

  // Button bindings - duplicate set was removed from egg.js (bug fix)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.rest-button').click(clickedRestButton);
});

function clickedTreatButton() {
  pet_info.happiness += 10;   // Set line-of-code breakpoint here
  pet_info.weight    += 2;
  showSpeechBubble("Yum! That was delicious! &#x1F36A;");
  checkAndUpdatePetInfoInHtml('Treat');
}

function clickedPlayButton() {
  pet_info.happiness += 8;
  pet_info.weight    -= 1;
  pet_info.energy    -= 10;
  showSpeechBubble("Woohoo! Let's play all day! &#x1F3BE;");
  checkAndUpdatePetInfoInHtml('Play');
}

function clickedExerciseButton() {
  pet_info.happiness -= 5;
  pet_info.weight    -= 3;
  pet_info.energy    -= 15;
  showSpeechBubble("I'm tired... but I feel stronger! &#x1F4AA;");
  checkAndUpdatePetInfoInHtml('Exercise');
}

function clickedRestButton() {
  pet_info.energy    += 30;
  pet_info.happiness -= 3;
  showSpeechBubble("Zzz... that nap was great! &#x1F634;");
  checkAndUpdatePetInfoInHtml('Rest');
}

function checkAndUpdatePetInfoInHtml(action) {
  // Uncomment the next line for a programmatic breakpoint
  // debugger;

  console.group('Pet Update - ' + (action || 'Init'));
  console.info('[GigaPet] Before:', JSON.parse(JSON.stringify(pet_info)));

  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
  updatePetImageStyle();

  logInfo(action || 'init');
  logWarning();

  console.groupEnd();
}

function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0)      { logError('weight', pet_info.weight, 0);        pet_info.weight = 0; }
  if (pet_info.happiness < 0)   { logError('happiness', pet_info.happiness, 0);   pet_info.happiness = 0; }
  if (pet_info.happiness > 100) { logError('happiness', pet_info.happiness, 100); pet_info.happiness = 100; }
  if (pet_info.energy < 0)      { logError('energy', pet_info.energy, 0);         pet_info.energy = 0; }
  if (pet_info.energy > 100)    { logError('energy', pet_info.energy, 100);       pet_info.energy = 100; }
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}

// jQuery .css() - live update pet image glow color based on happiness
function updatePetImageStyle() {
  var h = pet_info.happiness;
  var glowColor = (h >= 70) ? '#00ff88' : (h >= 35) ? '#ffd700' : '#ff4444';
  $('.pet-image').css('box-shadow', '0 0 18px 6px ' + glowColor);
  $('.pet-image').css('border-color', glowColor);
}

// jQuery .delay() - auto-fade speech bubble after 2.5 seconds
function showSpeechBubble(message) {
  $('#bubble-text').html(message);
  $('#speech-bubble').stop(true, true).show().delay(2500).fadeOut(600);
}
