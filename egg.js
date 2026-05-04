//  Pet Roster 
var pets = [
  { name: "Charmander", file: "images/charmander.gif" },
  { name: "Squirtle",   file: "images/squirtle.gif"   },
  { name: "Bulbasaur",  file: "images/bulbasaur.gif"  },
  { name: "Eevee",      file: "images/eevee.gif"      },
  { name: "Pikachu",    file: "images/pikachu.gif"    }
];

var eggStyles = ["🥚", "🥚", "🥚", "🥚", "🥚"];

function buildEggScreen() {
  // Shuffle the pets array
  var shuffled = pets.slice().sort(function() { return Math.random() - 0.5; });

  shuffled.forEach(function(pet, index) {
    var $egg = $('<div class="egg-choice"></div>');
    $egg.html('<div class="egg-icon">🥚</div><p>???</p>');

    // Store which pet this egg hides using .data()
    // .data(key, value) attaches arbitrary data to a DOM element without
    // polluting the HTML — cleaner than data attributes for JS-only values.
    // Docs: https://api.jquery.com/data/
    $egg.data('pet', pet);

    $egg.click(function() {
      hatchEgg($(this));
    });

    $('#egg-container').append($egg);
  });
}

//  Hatch Animation 
function hatchEgg($egg) {
  // Disable all eggs while hatching bug fix 
  $('.egg-choice').css('pointer-events', 'none');
  $egg.addClass('selected-egg');

  // Shake animation then reveal
  $egg.addClass('shaking');

  setTimeout(function() {
    $egg.removeClass('shaking');
    $egg.find('.egg-icon').text('💥');

    setTimeout(function() {
      // Retrieve the hidden pet data stored with .data()
      var chosenPet = $egg.data('pet');

      // Update pet name and image
      pet_info.name = chosenPet.name;
      $('.pet-image').attr('src', chosenPet.file);

      // Transition to game screen
      $('#egg-screen').fadeOut(400, function() {
        $('#game-screen').fadeIn(500);
        checkAndUpdatePetInfoInHtml();
      });
    }, 600);
  }, 1000);
}

// Call buildEggScreen on load instead of going straight to game
$(function() {
  buildEggScreen(); // show egg screen first

  // Button bindings (unchanged)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.rest-button').click(clickedRestButton);
});
