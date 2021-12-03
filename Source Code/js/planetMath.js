class PlanetMath{

    constructor(planet, YYYY, MM, DD, HH, mm, SS){
        this.planet = planet;
        this.YYYY = YYYY;
        this.MM = MM;
        this.DD = DD;
        this.HH = HH;
        this.mm = mm;
        this.SS = SS;
        //  YYYY = year (e.g. 2009)
        //  MM = month (January = 01)
        //  DD = day/hour/minutes converted to fractions of a day

        var date;
        var JD2k;
        var JD;

        var L;
        var a;
        var e;
        var i;
        var w;
        var Omega;

    }

    julianDay(){
        var y;
        var m;

        var A;
        var B;
        var JD;

        if(this.MM > 2){
            y = this.YYYY;
            m = this.MM + 12;
        }
        else{
            y = this.YYYY - 1;
            m = this.MM + 12;
        }
        A = Math.trunc(y/100);
        B = 2 - A + Math.trunc(A/4);

        JD = Math.trunc(365.25 * y) + Math.trunc(30.6001 * (m + 1)) + this.DD + 1720994.5 + B;

        JD = Math.round((JD + Number.EPSILON) * 10) / 10;
        this.JD = JD;
    }

    julianDay2000(){
        var JD2k = ((367 * this.YYYY) - (Math.floor(7.0 * (this.YYYY + Math.floor((this.MM + 9.0)/12.0))/4.0)) + (Math.floor(275.0 * this.MM / 9.0)) + this.DD - 730531.5 + this.HH/24.0);
        this.cy = JD2k / 36525;
        this.JD2k = JD2k;
    }
    getJD(){
        return this.JD;
    }
    getJD2k(){
        return this.JD2k;
    }
    getCY(){
        return this.cy;
    }


    majorOrbits(){

        var RADS = Math.PI / 180.0;
        var DEGS = 180 / Math.PI;
        var cy = this.cy;


    // Step 1:  Calculate the elements of the planetary orbit of the planet
        switch(this.planet){
        case 1: // Mercury
            this.L = mod2Pi((252.25084 + 538101628.29 * cy / 3600) * RADS);
            this.a = 0.38709893 + 0.00000066 * cy;
            this.e = 0.20563069 + 0.00002527 * cy;
            this.i = ( 7.00487  -  23.51 * cy / 3600) * RADS;
            this.w = (77.45645  + 573.57 * cy / 3600) * RADS;
            this.Omega = (48.33167 - 446.30 * cy / 3600) * RADS;
            break;

        case 2: // Venus
            this.L = mod2Pi((181.97973 + 210664136.06 * cy / 3600) * RADS);
            this.a = 0.72333199 + 0.00000092 * cy;
            this.e = 0.00677323 - 0.00004938 * cy;
            this.i = ( 3.39471 - 2.86 * cy / 3600) * RADS;
            this.w = (131.53298 - 108.80 * cy / 3600) * RADS;
            this.Omega = ( 76.68069 - 996.89 * cy / 3600) * RADS;
            break;

        case 3: // Earth/Sun
            this.L = mod2Pi((100.46435 + 129597740.63 * cy / 3600) * RADS);
            this.a = 1.00000011 - 0.00000005 * cy;
            this.e = 0.01671022 - 0.00003804 * cy;
            this.i = ( 0.00005 - 46.94 * cy / 3600) * RADS;
            this.w = (102.94719 +  1198.28 * cy / 3600) * RADS;
            this.Omega = (-11.26064 - 18228.25 * cy / 3600) * RADS;
            break;

        case 4: // Mars
            this.L = mod2Pi((355.45332 + 68905103.78 * cy / 3600) * RADS);
            this.a = 1.52366231 - 0.00007221 * cy;
            this.e = 0.09341233 + 0.00011902 * cy;
            this.i = (1.85061 - 25.47 * cy / 3600) * RADS;
            this.w = (336.04084 + 1560.78 * cy / 3600) * RADS;
            this.Omega = ( 49.57854 - 1020.19 * cy / 3600) * RADS;
            break;

        case 5: // Jupiter
            this.L = mod2Pi((34.40438 + 10925078.35 * cy / 3600) * RADS);
            this.a = 5.20336301 + 0.00060737 * cy;
            this.e = 0.04839266 - 0.00012880 * cy;
            this.i = ( 1.30530 -  4.15 * cy / 3600) * RADS;
            this.w = ( 14.75385 +  839.93 * cy / 3600) * RADS;
            this.Omega = (100.55615 + 1217.17 * cy / 3600) * RADS;
            break;

        case 6: // Saturn
            this.L = mod2Pi((49.94432 + 4401052.95 * cy / 3600) * RADS);
            this.a = 9.53707032 - 0.00301530 * cy;
            this.e = 0.05415060 - 0.00036762 * cy;
            this.i = ( 2.48446 +  6.11 * cy / 3600) * RADS;
            this.w = ( 92.43194 - 1948.89 * cy / 3600) * RADS;
            this.Omega = (113.71504 - 1591.05 * cy / 3600) * RADS;
            break;

        case 7: // Uranus
            this.L = mod2Pi((313.23218 + 1542547.79 * cy / 3600) * RADS);
            this.a = 19.19126393 + 0.00152025 * cy;
            this.e = 0.04716771 - 0.00019150 * cy;
            this.i = ( 0.76986  -  2.09 * cy / 3600) * RADS;
            this.w = (170.96424  + 1312.56 * cy / 3600) * RADS;
            this.Omega = ( 74.22988  - 1681.40 * cy / 3600) * RADS;
            break;

        case 8: // Neptune
            this.L = mod2Pi((304.88003 + 786449.21 * cy / 3600) * RADS);
            this.a = 30.06896348 - 0.00125196 * cy;
            this.e = 0.00858587 + 0.00002510 * cy;
            this.i = ( 1.76917  -  3.64 * cy / 3600) * RADS;
            this.w = ( 44.97135  - 844.43 * cy / 3600) * RADS;
            this.Omega = (131.72169 - 151.25 * cy / 3600) * RADS;
            break;

        case 9: // Pluto
            this.L = mod2Pi((238.92881 + 522747.90 * cy / 3600) * RADS);
            this.a = 39.48168677 - 0.00076912 * cy;
            this.e = 0.24880766 + 0.00006465 * cy;
            this.i = ( 17.14175  +  11.07 * cy / 3600) * RADS;
            this.w = (224.06676  - 132.25 * cy / 3600) * RADS;
            this.Omega = (110.30347  -  37.33 * cy / 3600) * RADS;
            break;

        }

    // Step 2: Calculate the elements of the planetary orbit of the Earth

        var LE = mod2Pi((100.46435 + 129597740.63 * cy / 3600) * RADS);
        var aE = 1.00000011 - 0.00000005 * cy;
        var eE = 0.01671022 - 0.00003804 * cy;
        var iE = ( 0.00005 - 46.94 * cy / 3600) * RADS;
        var wE = (102.94719 +  1198.28 * cy / 3600) * RADS;
        var OmegaE = (-11.26064 - 18228.25 * cy / 3600) * RADS;

    // Step 3: Calculate the position of the Earth in its orbit

        var mE = mod2Pi(LE - wE);
        var vE = trueAnomaly(mE, eE);
        var rE = aE * (1 - Math.pow(eE, 2)) / (1 + eE * Math.cos(vE));

    // Step 4: Calculate the heliocentric rectangular coordinates of Earth

        var xE = rE * Math.cos(vE + wE);
        var yE = rE * Math.sin(vE + wE);
        var zE = 0.0;

    // Step 5: Calculate the position of the planet in its’ orbit

        var mP = mod2Pi(this.L - this.w);
        var vP = trueAnomaly(mP, this.e);
        var rP = this.a * (1 - Math.pow(this.e,2)) / (1 + this.e * Math.cos(vP));

    // Step 6: Calculate the heliocentric rectangular coordinates of the planet
        var xh, yh, zh;
        if(this.planet == 3){
            xh = 0;
            yh = 0;
            zh = 0;
        }
        else{
            xh = rP * (Math.cos(this.Omega) * Math.cos(vP + this.w - this.Omega) - Math.sin(this.Omega) * Math.sin(vP + this.w - this.Omega) * Math.cos(this.i));
            yh = rP * (Math.sin(this.Omega) * Math.cos(vP + this.w - this.Omega) - Math.cos(this.Omega) * Math.sin(vP + this.w - this.Omega) * Math.cos(this.i));
            zh = rP * (Math.sin(vP + this.w - this.Omega) * Math.sin(this.i));
        }

    // Step 7: Convert to geocentric rectangular coordinates
        var xg = xh - xE;
        var yg = yh - yE;
        var zg = zh - zE;

    // Step 8: Rotate around X axis from ecliptic to equatorial coordinates
        var Ecl = 23.439281 * RADS; //(value for J2000.0 frame)
        var xeq = xg;
        var yeq = yg * Math.cos(Ecl) - zg * Math.sin(Ecl);
        var zeq = yg * Math.sin(Ecl) + zg * Math.cos(Ecl);

    // Step 9: Calculate alpha (right ascension) and delta (declination) from the rectangular equatorial coordinates
        var rightAscension = mod2Pi(Math.atan2(yeq, xeq)) * DEGS;
        var Declination = Math.atan(zeq / Math.sqrt(Math.pow(xeq,2) + Math.pow(yeq,2))) * DEGS;
        var Dist = Math.sqrt(Math.pow(xeq,2) + Math.pow(yeq,2) + Math.pow(zeq,2)); //(Distance in AUs)

        return [rightAscension, Declination, Dist];
    }
    getP(){
        return this.planet;
    }

}
function mod2Pi(X){
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
function trueAnomaly(M, e1){
  var E;
  var E1;
  var V;
  E = M + (e1 * Math.sin(M)) * (1.0 + (e1 * Math.cos(M)));
  do {
    E1 = E;
    E = E1 - ((E1 - e1 * Math.sin(E1) - M) / (1 - e1 * Math.cos(E1)));
  } while (Math.abs(E - E1) > (Math.pow(1, -12)));
  V = 2 * Math.atan(Math.sqrt((1 + e1) / (1 - e1)) * Math.tan(0.5 * E));
  if (V < 0) {
    V = V + (2 * Math.PI);
  }
  return V;
}


// Example call of planet math

/*
var mercury = new PlanetMath(1, 2000, 4, 4, 6, 8, 10);
mercury.julianDay();
mercury.julianDay2000();
console.log("Mercury");
console.log(mercury.majorOrbits());
delete mercury;
*/