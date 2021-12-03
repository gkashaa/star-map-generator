class StarMath{
    
    // Parameters will be changed to lat, long, date, and time
    constructor(lat, long, LST){
    this.lat = lat;
    this.long = long;
    this.LST = LST;
    var e;
    var A;
    }

    // Function to convert date and time -> GMT
    // Function to convert GMT -> LST
   
   
    // Function to conver righ acension and declination to azimuth and elevation
    azimuthElevation(RA, decl){

        var H = this.LST - RA;
        var A = atan((-1)*(sin(H) * cos(decl)) / (cos(this.lat) * sin(decl) - sin(this.lat) * cos(decl) * cos(H)));
        var e = asin(sin(this.lat) * sin(decl) + cos(this.lat) * cos(decl) * cos(H));
        A = (A * 180)/ Math.PI;
        e = (e * 180)/ Math.PI;
        return [A, e];
        // returns elevation then azimuth in an array.
    }
}


// Function that display's each star's magnitude correctly 
function magnitde (mag) {
    
        var m = 6;
        var n = 3;
        var e;
        
        for (var i = 0; i < 33; i++) {
            
                if (parseInt(mag) === m)
                    
                    mag = mag - (2 * n);
            m--;
            n--;
        }
        return (mag);
}


// Functions to convert trig functions to degrees
function sin(x) {
    return (Math.sin(x * (Math.PI / 180)));
}

function cos(x) {
    return (Math.cos(x * (Math.PI / 180)));
}

function atan(x) {
    return (Math.atan(x) * (180 / Math.PI));
}

function asin(x) {
    return (Math.asin(x) * (180 / Math.PI));
}
