//  Pet Roster 
var pets = [
  { name: "Charmander", file: "images/charmander.gif" },
  { name: "Squirtle",   file: "images/squirtle.gif"   },
  { name: "Bulbasaur",  file: "images/bulbasaur.gif"  },
  { name: "Eevee",      file: "images/eevee.gif"      },
  { name: "Pikachu",    file: "images/pikachu.gif"    }
];

// console.table — display pets roster as a sortable table in DevTools
console.table(pets);

var eggStyles = ["🥚", "🥚", "🥚", "🥚", "🥚"];

function buildEggScreen() {
  var shuffled = pets.slice().sort(function() { return Math.random() - 0.5; });

  shuffled.forEach(function(pet, index) {
    var $egg = $('<div class="egg-choice"></div>');
    $egg.html('<div class="egg-icon">🥚</div><p>???</p>');
    $egg.data('pet', pet);
    $egg.click(function() { hatchEgg($(this)); });
    $('#egg-container').append($egg);
  });
}

function hatchEgg($egg) {
  $('.egg-choice').css('pointer-events', 'none');
  $egg.addClass('selected-egg');
  $egg.addClass('shaking');

  setTimeout(function() {
    $egg.removeClass('shaking');
    $egg.find('.egg-icon').text('💥');

    setTimeout(function() {
      var chosenPet = $egg.data('pet');   // local var visible in Scope pane
      pet_info.name = chosenPet.name;
      $('.pet-image').attr('src', chosenPet.file);

      // Custom styled hatch banner — console.log with %c
      console.log(
        '%c🥚 Hatched! ' + chosenPet.name + ' joined your team!',
        'background:#1a1f2e; color:#ff4da6; font-size:13px;' +
        'font-weight:bold; padding:4px 12px; border-radius:20px;' +
        'border:1px solid #ff4da6;'
      );

      $('#egg-screen').fadeOut(400, function() {
        $('#game-screen').fadeIn(500);
        checkAndUpdatePetInfoInHtml();
      });
    }, 600);
  }, 1000);
}

/*
 * BUG FIX: This ready handler used to also bind the four action buttons,
 * causing every click to fire its handler twice (jQuery appends listeners).
 * Bindings are now defined only in script.js. To reproduce the bug, uncomment
 * the four lines below — clicks will fire double and the console will show
 * two "Pet Update" groups per click.
 */
$(function() {
  buildEggScreen();

  // $('.treat-button').click(clickedTreatButton);     // removed (duplicate)
  // $('.play-button').click(clickedPlayButton);       // removed (duplicate)
  // $('.exercise-button').click(clickedExerciseButton); // removed (duplicate)
  // $('.rest-button').click(clickedRestButton);       // removed (duplicate)
});
