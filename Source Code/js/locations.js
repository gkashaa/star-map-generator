// Colton Cappa, Gloria Kashaa, Jared Nicoll, Leonie Nutz
// script for real time form validation and pre-set location select and save functionality
let locations;

// real time form validation
$('input').focusout(function (e) {
  const val = $(this).val();
  if (val.trim() == '') {
    $(this).css('border', '1px solid red');
  } else {
    $(this).css('border', '1px solid transparent')
  }
});

// save data for pre-set location
$(document).ready(function () {
  initialize();

  $('select[name="dropdown"]').change(function (e) { 
    const selectedOption = $(this).val();
    const loc = locations.find(loc => loc.name == selectedOption);
    fillForm(loc);
  });

  $('input.butt_out').click(function (e) { 
    e.preventDefault();
    const loc = {latitude: {}, longitude: {}};
    loc.name = document.querySelector('input#locationName').value.trim();
    loc.latitude.degrees = document.querySelector('input#latitudeDegs').value.trim();
    loc.latitude.minutes = document.querySelector('input#latitudeMins').value.trim();
    loc.latitude.seconds = document.querySelector('input#latitudeSecs').value.trim();
    if (document.querySelector('input#cardinalDirectionN').checked) {
      loc.latitude.cardinalDirection = 'N';
    } else {
      loc.latitude.cardinalDirection = 'S';
    }
    loc.longitude.degrees = document.querySelector('input#longitudeDegs').value.trim();
    loc.longitude.minutes = document.querySelector('input#longitudeMins').value.trim();
    loc.longitude.seconds = document.querySelector('input#longitudeSecs').value.trim();
    if (document.querySelector('input#cardinalDirectionE').checked) {
      loc.longitude.cardinalDirection = 'E';
    } else {
      loc.longitude.cardinalDirection = 'W';
    }
    if (loc.name != '' && loc.longitude.degrees != '' && loc.latitude.minutes != '' && loc.latitude.seconds != '' && loc.longitude.degrees != '' && loc.longitude.minutes != '' && loc.longitude.seconds != '') {
      saveLocation(loc);
      document.querySelector('input#locationName').value = '';
    }
  });
});

// save pre-set location created by user
const saveLocation = (loc) => {
  locations.push(loc);
  localStorage.setItem('locations', JSON.stringify(locations));
  $(`<option value="${loc.name}">${loc.name}</option>`).appendTo('select[name="dropdown"]');
}

// once pre-set location is selected, autofill the latitude and longitude data in the form
const fillForm = (loc) => {
  document.querySelector('input#latitudeDegs').value = loc.latitude.degrees;
  document.querySelector('input#latitudeMins').value = loc.latitude.minutes;
  document.querySelector('input#latitudeSecs').value = loc.latitude.seconds;
  if (loc.latitude.cardinalDirection == 'N') {
    document.querySelector('input#cardinalDirectionN').checked = true;
  } else {
    document.querySelector('input#cardinalDirectionS').checked = true;
  }
  document.querySelector('input#longitudeDegs').value = loc.longitude.degrees;
  document.querySelector('input#longitudeMins').value = loc.longitude.minutes;
  document.querySelector('input#longitudeSecs').value = loc.longitude.seconds;
  if (loc.longitude.cardinalDirection == 'E') {
    document.querySelector('input#cardinalDirectionE').checked = true;
  } else {
    document.querySelector('input#cardinalDirectionW').checked = true;
  }
}

const initialize = () => {
  locations = getLocations();
  if (!locations) {
    console.log('No locations found.');
    addDefaultLocations();
  }
  fillLocationsDropDown();
}

// fill dropdown menu with pre-set locations
const fillLocationsDropDown = () => {
  for (let i = 0; i < locations.length; i++) {
    const loc = locations[i];
    $(`<option value="${loc.name}">${loc.name}</option>`).appendTo('select[name="dropdown"]');
  }
}

const getLocations = () => {
  const parsedLocations = localStorage.getItem('locations');
  return JSON.parse(parsedLocations);
}

// add the 'example' default locations into dropdown menu
const addDefaultLocations = () => {
  const defaultLocations = [
    {
      name: 'Huntsville',
      latitude: {
        degrees: 34,
        minutes: 43,
        seconds: 48.7704,
        cardinalDirection: 'N',
      },
      longitude: {
        degrees: 86,
        minutes: 35,
        seconds: 8.8836,
        cardinalDirection: 'W',
      },
    },
    {
      name: 'New York City',
      latitude: {
        degrees: 40,
        minutes: 43,
        seconds: 0.264,
        cardinalDirection: 'N',
      },
      longitude: {
        degrees: 47,
        minutes: 0,
        seconds: 6.5232,
        cardinalDirection: 'W',
      },
    },
    {
      name: 'Paris',
      latitude: {
        degrees: 48,
        minutes: 51,
        seconds: 24.9624,
        cardinalDirection: 'N',
      },
      longitude: {
        degrees: 2,
        minutes: 21,
        seconds: 6.894,
        cardinalDirection: 'E',
      },
    },
    {
      name: 'London',
      latitude: {
        degrees: 51,
        minutes: 30,
        seconds: 27.8568,
        cardinalDirection: 'N',
      },
      longitude: {
        degrees: 0,
        minutes: 7,
        seconds: 35.5251,
        cardinalDirection: 'W',
      },
    },
  ];
  localStorage.setItem('locations', JSON.stringify(defaultLocations));
  locations = defaultLocations;
}
