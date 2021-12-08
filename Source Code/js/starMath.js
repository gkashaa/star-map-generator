// Colton Cappa, Gloria Kashaa, Jared Nicoll, Leonie Nutz
class StarMath{

    // Parameters will be changed to lat, long, date, and time
    constructor(lat, long, YYYY, MM, DD, HH, mm){
    this.lat = lat;
    this.long = long;
    this.YYYY = YYYY; // year
    this.MM = MM; // month
    this.DD = DD; // date
    this.HH = HH; // hour
    this.mm = mm; // minute
    var e;
    var A;
    }

    // Function to convert date and time -> GMT
    // Function to convert GMT -> LST
    meanSiderealTime(){
            var year = this.YYYY;
            var month = this.MM;
            var day = this.DD;
            var hour = this.HH;
            var min = this.mm;
            var lon = this.long;
            var sec = 0;

            if(month <= 2){
                year = year - 1;
                month = month + 12;
            }
            var a = Math.floor(year / 100.0);
            var b = 2 - a + Math.floor(a / 4);
            var c = Math.floor(365.25 * year);
            var d = Math.floor(30.6001 * (month + 1));
            // Get days since J2000.0
            var jd = b + c + d - 730550.5 + day + (hour + min/60 + sec/3600) / 24;
            // Get Julian centuries since J2000.0
            var jt = jd / 36525.0;
            // Calculate initial Mean Sidereal Time(mst)
            var mst = 280.46061837 + (360.98564736629 * jd) + (0.000387933 * Math.pow(jt, 2)) - (Math.pow(jt, 3) / 38710000) + lon;

            // Clip mst to range 0.0 to 360.0
            if(mst > 0.0){
              while(mst > 360.0) mst = mst - 360.0;
            }
            else{
              while(mst < 0.0) mst = mst + 360.0;
            }
            return mst;
        }


    // Function to conver righ acension and declination to azimuth and elevation
    azimuthElevation(RA, decl){
        var LST = this.meanSiderealTime();
        var H = LST - RA;
        var A = Math.atan((-1)*(Math.sin(H) * Math.cos(decl)) / (Math.cos(this.lat) * Math.sin(decl)) - (Math.sin(this.lat) * Math.cos(decl) * Math.cos(H)));
        var e = Math.asin((Math.sin(this.lat) * Math.sin(decl)) + (Math.cos(this.lat) * Math.cos(decl) * Math.cos(H)));
        A = (A * 180) / Math.PI;
        e = (e * 180) / Math.PI;
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

/*
var star = new StarMath(10, 10, 2000, 4, 4, 6, 8, 10);
console.log(star.azimuthElevation(10, 10));
console.log(magnitude(2));
*/
