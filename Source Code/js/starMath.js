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
        var A = Math.atan((-1)*(Math.sin(H) * Math.cos(decl)) / (Math.cos(this.lat) * Math.sin(decl)) - (Math.sin(this.lat) * Math.cos(decl) * Math.cos(H)));
        var e = Math.asin((Math.sin(this.lat) * Math.sin(decl)) + (Math.cos(this.lat) * Math.cos(decl) * Math.cos(H)));
        A = (A * 180) / Math.PI;
        e = (e * 180) / Math.PI;

        console.log([A, e]);
        return [A, e];
        // returns elevation then azimuth in an array.
    }
}


// Function that display's each star's magnitude correctly 
function magnitude (mag) {
    
        var m = 6;
        var n = 3;
        var e;
        
        // Range between the largest magnitude (-26) and the smallest magnitude (6)
        for (var i = 0; i < 33; i++) {
            
                if (parseInt(mag) === m)
                    
                    mag = mag - (2 * n);
            m--;
            n--;
        }
        return (mag);
}
