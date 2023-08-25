let eventsTemplate;
let addOne;
let history = [];

const TONES = {
  'box-1': "C4",
  'box-2': "D4",
  'box-3': "E4",
  'box-4': "F4",
  'box-5': "G4",
  'box-6': "A4",
  'box-7': "B4",
  'box-8': "C5",
  'box-9': "D5",
  'box-10': "E5",
}

$(function() {
  registerTemplates();

  $('#box-container').on('click', 'div', function(event) {
    let box = event.target.id;
    registerClick(box);
    playNote(box);
    updateTracker();
  });

  $('#reset-btn').on('click', function(event) {
    history = [];
    updateTracker();
  });

  $('#play-btn').on('click', function(event) {
    history.forEach(({name}, idx) => {
      setTimeout(() => {
        playNote(name);
        selectTrackerItem(idx + 1);
      }, idx * 400);
    });
  });
});

function registerTemplates() {
  eventsTemplate = Handlebars.compile($('#events-template').html());
  addOne = Handlebars.registerHelper('addOne', function(index) {
    return index + 1;
  });
}

function selectTrackerItem(itemNumber) {
  $('.selected').removeClass();
  $(`#tracker div[data-item-no="${itemNumber}"]`).addClass('selected');
}

function updateTracker() {
    let $eventsList = $('#events-list');
    $eventsList.html('');
    $eventsList.append(eventsTemplate(history));
}

function registerClick(box) {
  let boxObj = {
    name: box,
    color: getBoxColor(box),
    tone: TONES[box],
  };

  history.push(boxObj);
}

function getBoxColor(box) {
  return $('#' + box).attr('class').split(' ')[0];
}

function playNote(box) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(TONES[box], "32n");
}
