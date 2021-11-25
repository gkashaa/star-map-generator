/***********************************************************************************************************/
class Math
{
    var YYYY; //year input
    var MM; // month input
    var DD.dd; // day/hour/minutes converted to fractions of a day
    var DD; // day input
    var HH; // hour input
    var MM; // minute inout
    var SS; // second input

    var planet;
    var JD2k;

    var cy = JD2k / 36525;
    var RADS = Math.PI / 180.0;
    var DEGS = 180 / Math.PI;

    var M;
    var e;

    var year, month, day, hour, min, second;

    var lat, hemi, lon, dir, RA, dec;

    Math()
    {

    }


    // Calculation of exact Julian Day
    function julianDay(){
    //  YYYY = year (e.g. 2009)
    //  MM = month (January = 01)
    //  DD = day/hour/minutes converted to fractions of a day
        var y;
        var m;

        var A;
        var B;

        if(MM > 2){
            y = YYYY;
            m = MM + 12;
        }
        else{
            y = YYYY - 1;
            m = MM + 12;
        }
    // Since dates are between January 1, 1900 and January 1, 2100, no if statement is needed.
        /*if(YYYY > 1582){
            A = Math.trunc(y/100);                  // Fractions are dropped not rounded
            B = 2 - A + Math.trunc(A/4);
        }
        else if(YYYY = 1582){
        	if(MM > 10){
          	    if(DD > 15){
            	A = Math.trunc(y/100);
            	B = 2 - A + Math.trunc(A/4);
                }
            }
            else{
          	    B = 0;
            }
        }
        else{
            B = 0;
        }*/
        A = Math.trunc(y/100);
        B = 2 - A + Math.trunc(A/4);

        JD = Math.trunc(365.25 * y) + Math.trunc(30.6001 * (m + 1)) + DD + 1720994.5 + B;

        JD = Math.round((JD + Number.EPSILON) * 10) / 10
        return JD;
    }

    // Calculation of Julian Day from 2000
    function julianDay2000(){
        JD = ((367 * YYYY) - (Math.floor(7.0 * (YYYY + Math.floor((MM + 9.0)/12.0))/4.0)) + (Math.floor(275.0 * MM / 9.0)) + DD - 730531.5 + HH/24.0);
        return JD;
    }

    // Mod to Pi conversion
    function Mod2Pi(X){
    	var B, A, absFloor;
      B = X / (2 * Math.PI);
      if(B >= 0){
      	absFloor = Math.floor(B);
      }
      else{
      	absFloor = Math.ceil(B);
      }
      A = (2 * Math.PI) * (B - absFloor);
      if(A < 0){
      	A = (2 * Math.PI) + A;
      }
    	return A;
    }

    // Calculating the true anomaly from the mean anomaly
    function trueAnomaly() {
      var E;
      var E1;
      var V;
      E = M + (e * Math.sin(M)) * (1.0 + (e * Math.cos(M)));
      do {
        E1 = E;
        E = E1 - ((E1 - e * Math.sin(E1) - M) / (1 - e * Math.cos(E1)));
      } while (Math.abs(E - E1) > (Math.pow(1, -12)));
      V = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(0.5 * E));
      if (V < 0) {
        V = V + (2 * Math.PI);
      }
      return V;
    } // FUNCTION NOT DONE

    // Calculating Right Ascension and Declination of a Planet
    function majorOrbits(){

        var L, a, e, i, w, Omega;

    // Step 1:  Calculate the elements of the planetary orbit of the planet
        switch(planet){
        case 1: // Mercury
            L = Mod2Pi ((252.25084 + 538101628.29 * cy / 3600) * RADS);
            a = 0.38709893 + 0.00000066 * cy;
            e = 0.20563069 + 0.00002527 * cy;
            i = ( 7.00487  -  23.51 * cy / 3600) * RADS;
            w = (77.45645  + 573.57 * cy / 3600) * RADS;
            Omega = (48.33167 - 446.30 * cy / 3600) * RADS;
            break;

        case 2: // Venus
            L = Mod2Pi ((181.97973 + 210664136.06 * cy / 3600) * RADS);
            a = 0.72333199 + 0.00000092 * cy;
            e = 0.00677323 - 0.00004938 * cy;
            i = ( 3.39471 - 2.86 * cy / 3600) * RADS;
            w = (131.53298 - 108.80 * cy / 3600) * RADS;
            Omega = ( 76.68069 - 996.89 * cy / 3600) * RADS;
            break;

        case 3: // Earth/Sun
            L = Mod2Pi ((100.46435 + 129597740.63 * cy / 3600) * RADS);
            a = 1.00000011 - 0.00000005 * cy;
            e = 0.01671022 - 0.00003804 * cy;
            i = ( 0.00005 - 46.94 * cy / 3600) * RADS;
            w = (102.94719 +  1198.28 * cy / 3600) * RADS;
            Omega = (-11.26064 - 18228.25 * cy / 3600) * RADS;
            break;

        case 4 : // Mars
            L = Mod2Pi ((355.45332 + 68905103.78 * cy / 3600) * RADS);
            a = 1.52366231 - 0.00007221 * cy;
            e = 0.09341233 + 0.00011902 * cy;
            i = (1.85061 - 25.47 * cy / 3600) * RADS;
            w = (336.04084 + 1560.78 * cy / 3600) * RADS;
            Omega = ( 49.57854 - 1020.19 * cy / 3600) * RADS;
            break;

        case 5: // Jupiter
            L = Mod2Pi ((34.40438 + 10925078.35 * cy / 3600) * RADS);
            a = 5.20336301 + 0.00060737 * cy;
            e = 0.04839266 - 0.00012880 * cy;
            i = ( 1.30530 -  4.15 * cy / 3600) * RADS;
            w = ( 14.75385 +  839.93 * cy / 3600) * RADS;
            Omega = (100.55615 + 1217.17 * cy / 3600) * RADS;
            break;

        case 6: // Saturn
            L = Mod2Pi ((49.94432 + 4401052.95 * cy / 3600) * RADS);
            a = 9.53707032 - 0.00301530 * cy;
            e = 0.05415060 - 0.00036762 * cy;
            i = ( 2.48446 +  6.11 * cy / 3600) * RADS;
            w = ( 92.43194 - 1948.89 * cy / 3600) * RADS;
            Omega = (113.71504 - 1591.05 * cy / 3600) * RADS;
            break;

        case 7: // Uranus
            L = Mod2Pi ((313.23218 + 1542547.79 * cy / 3600) * RADS);
            a = 19.19126393 + 0.00152025 * cy;
            e = 0.04716771 - 0.00019150 * cy;
            i = ( 0.76986  -  2.09 * cy / 3600) * RADS;
            w = (170.96424  + 1312.56 * cy / 3600) * RADS;
            Omega = ( 74.22988  - 1681.40 * cy / 3600) * RADS;
            break;

        case 8: // Neptune
            L = Mod2Pi ((304.88003 + 786449.21 * cy / 3600) * RADS);
            a = 30.06896348 - 0.00125196 * cy;
            e = 0.00858587 + 0.00002510 * cy;
            i = ( 1.76917  -  3.64 * cy / 3600) * RADS;
            w = ( 44.97135  - 844.43 * cy / 3600) * RADS;
            Omega = (131.72169 - 151.25 * cy / 3600) * RADS;
            break;

        case 9: // Pluto
            L = Mod2Pi ((238.92881 + 522747.90 * cy / 3600) * RADS);
            a = 39.48168677 - 0.00076912 * cy;
            e = 0.24880766 + 0.00006465 * cy;
            i = ( 17.14175  +  11.07 * cy / 3600) * RADS;
            w = (224.06676  - 132.25 * cy / 3600) * RADS;
            Omega = (110.30347  -  37.33 * cy / 3600) * RADS;
            break;

        }

    // Step 2: Calculate the elements of the planetary orbit of the Earth

        LE = Mod2Pi ((100.46435 + 129597740.63 * cy / 3600) * RADS);
        aE = 1.00000011 - 0.00000005 * cy;
        eE = 0.01671022 - 0.00003804 * cy;
        iE = ( 0.00005 - 46.94 * cy / 3600) * RADS;
        wE = (102.94719 +  1198.28 * cy / 3600) * RADS;
        OmegaE = (-11.26064 - 18228.25 * cy / 3600) * RADS;

    // Step 3: Calculate the position of the Earth in its orbit

        var mE = Mod2Pi(LE - wE);
        var vE = trueAnomaly(mE, eE);
        var rE = aE * (1 - Math.pow(eE, 2)) / (1 + eE * Math.cos(vE));

    // Step 4: Calculate the heliocentric rectangular coordinates of Earth

        var xE = rE * Math.cos(vE + wE);
        var yE = rE * Math.sin(vE + wE);
        var zE = 0.0;

    // Step 5: Calculate the position of the planet in its’ orbit

        var mP = Mod2Pi(L - w);
        var vP = trueAnomaly(mP, e);
        var rP = a * (1 - Math.pow(e,2)) / (1 + e * Math.cos(vP));

    // Step 6: Calculate the heliocentric rectangular coordinates of the planet
        var xh, yh, zh;
        if(planet = 3){
            xh = 0;
            yh = 0;
            zh = 0;
        }
        else{
            xh = rP * (Math.cos(Omega) * Math.cos(vP + w - Omega) - Math.sin(Omega) * Math.sin(vP + w - Omega) * Math.cos(i));
            yh = rP * (Math.sin(Omega) * Math.cos(vP + w - Omega) - Math.cos(Omega) * Math.sin(vP + w - Omega) * Math.cos(i));
            zh = rP * (Math.sin(vP + w - Omega) * Math.sin(i));
        }

    // Step 7: Convert to geocentric rectangular coordinates
        var xg = xh - xE;
        var yg = yh - yE;
        var zg = zh - zE;

    // Step 8: Rotate around X axis from ecliptic to equatorial coordinates
        var Ecl = 23.439281 * RADS; //(value for J2000.0 frame)
        var xeq = xg;
        var yeq = yg * Math.cos(Ecl) – zg * Math.sin(Ecl);
        var zeq = yg * Math.sin(Ecl) + zg * Math.cos(Ecl);

    // Step 9: Calculate alpha (right ascension) and delta (declination) from the rectangular equatorial coordinates
        var rightAscension = Mod2Pi(Math.atan2(yeq, xeq)) * DEGS;
        var Declination = Math.atan(zeq / Math.sqrt(Math.pow(xeq,2) + Math.pow(yeq,2))) * DEGS;
        var Dist = Math.sqrt(Math.pow(xeq,2) + Math.pow(yeq,2) + Math.pow(zeq,2)); //(Distance in AUs)

        return [rightAscension, Declination, Dist];
    }
    //var Orbits = majorOrbits(p, JD2k);
    //var RA = Orbits[0];
    //var Dec = Orbits[1];
    //var Dist = Orbits[2];

    // Converting Right Ascension in degrees to Hours:Minutes:Seconds
    function convertRA(){
        var Hours = int(RA / 15.0);
        var Minutes = int(((RA / 15.0) – Hours)  * 60.0);
        var Seconds = ((((RA / 15.0) – Hours)  * 60.0) – Minutes) * 60.0;
        return [Hours, Minutes, Seconds];
    }
    //var RA = convertRA(num);

    // Converting Declination in degrees to Degrees:Minutes:Seconds
    function convertDec(){
        var Degrees = int(dec);
        var Minutes = int((dec – Degrees)  * 60.0);
        var Seconds = (((dec – Degrees)  * 60.0) – Minutes) * 60.0;
        return [Degrees, Minutes, Seconds];
    }
    //var declination = convertDec(Dec);

    // Calculating the Mean Sidereal Time
    function meanSiderealTime(){
        if(month <= 2)
        {
            year = year - 1;
            month = month + 12;
        }
        a = floor(year / 100.0);
        b = 2 – a + floor(a / 4);
        c = floor(365.25 * year);
        d = floor(30.6001 * (month + 1));
        // Get days since J2000.0
        var jd = b + c + d – 730550.5 + day + (hour + min/60 + sec/3600) / 24;
        // Get Julian centuries since J2000.0
        var jt = jd / 36525.0;
        // Calculate initial Mean Sidereal Time (mst)
        var mst = 280.46061837 + (360.98564736629 * jd) +
        (0.000387933 * jt2) - (jt3 / 38710000) + lon
        // Clip mst to range 0.0 to 360.0
        if(mst > 0.0){
            while(mst > 360.0){
                mst -= 360.0;
            }
        }
        else{
            while(mst < 0.0){
                mst += 360.0;
            }
        }
        return mst;
        // Result is Mean Sidereal Time for the location given by Lat, Lon
    }

    // Calculating Altitude and Azimuth of a Planet given RA and Dec

    // hemisphere(hemi) 0 = South, 1 = North
    // direction(dir) 0 = West, 1 = East
    function altitudeAzimuth(){
        if(hemi == 0)
        {
            lat = lat * -1.0;
        }
        if(dir == 0)
        {
            lon = lon * -1.0;
        }

        var hourAngle = meanSiderealTime() – RA;
        if(hourAngle < 0)
        {
            hourAngle += 360;
        }
        // Convert degrees to radians
        var decRad = Dec * RADS;
        var latRad = Lat * RADS;
        var hrRad = hourAngle * RADS;
        // Calculate altitude in radians
        var sin_alt = (Math.sin(decRad) * Math.sin(latRad)) + (Math.cos(decRad) * Math.cos(latRad) * Math.cos(hrRad));
        var alt = Math.asin(sin_alt);
        // Calculate azimuth in radians (you will need to handle this inside of a try...catch
        //  in case the latitude is at the poles or altitude if 90 degrees
        try
            cos_az = (Math.sin(decRad) – Math.sin(alt) * Math.sin(latRad)) / (Math.cos(alt) * Math.cos(latRad));
            az = Math.acos(cos_az);
        catch
            az = 0;
        // Convert altitude and azimuth to degrees
        alt *= DEG;
        az *= DEG;
        if(Math.sin(hrRad) > 0.0){
            az = 360.0 – az;
        }
        return az;
    }

    // Calculating Lunar Phases . . .
}

/*
end
*/
