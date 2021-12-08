// Colton Cappa, Gloria Kashaa, Jared Nicoll, Leonie Nutz
function getUserInput() {
    
    // Latitude in DMS format
    var latDeg = parseFloat(document.getElementById('latitudeDegs').value);
    var latMin = parseFloat(document.getElementById('latitudeMins').value);
    var latSec = parseFloat(document.getElementById('latitudeSecs').value);
    
    // Longitude in DMS format
    var longDeg = parseFloat(document.getElementById('longitudeDegs').value);
    var longMin = parseFloat(document.getElementById('longitudeMins').value);
    var longSec = parseFloat(document.getElementById('longitudeSecs').value);

    // Date (MM-DD-YYYY)
    var date = document.getElementById('date').value;
    var YYYY = date.slice(0, 4);
    var MM = date.slice(5, 7);
    var DD = date.slice(8, 10);
    
    // Time (12 hour format)
    var time = document.getElementById('time').value;
    var HH = time.slice(0, 2);
    var mm = time.slice(3, 5);
    var AP = time.slice(6, 8);
    
    // Convert time to 24 hour format
    if (AP === "PM") {
        HH = HH + 12;
    }

    // Directions for latitude and longitude
    var latDir, longDir;
    
    var N = document.getElementById('cardinalDirectionN').checked;
    var S = document.getElementById('cardinalDirectionS').checked;
    var E = document.getElementById('cardinalDirectionE').checked;
    var W = document.getElementById('cardinalDirectionW').checked;
    
    
    // Set direction for latitude (North = 1 and South = -1)
    if (N === true)
        latDir = 1;
    else
        latDir = -1;
    
    // Set direction for longitude (East = 1 and West = -1)
    if (E === true)
        longDir = 1;
    else
        longDir = -1;

 
    // Convert latitude and longitude from DMS format to decimal format
    var lat = DMStoD(latDeg, latMin, latSec, latDir);
    var long = DMStoD(longDeg, longMin, longSec, longDir);
    
    // Store inputs into local storage
    localStorage.setItem("Latitude", lat);
    localStorage.setItem("Longitude", long);
    
    localStorage.setItem("Year", YYYY);
    localStorage.setItem("Month", MM);
    localStorage.setItem("Day", DD);
  
    localStorage.setItem("Hour", HH);
    localStorage.setItem("Min", mm);

    return;
    
}
 
 
// Converts DMS format to decimal format
function DMStoD(d, m, s, dir){
          var dd = d + (m / 60) + (s / 3600);
          dd = dd * dir;
          
          return (dd);
          
    }


