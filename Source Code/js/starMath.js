

class StarMath{



StarMath(RA, dec, LST){
this.RA = RA;
this.dec = dec;
var LST;
var e;
var A;
}

function azimuthElevation(){
    var H;
    var lat;
    var lon;
    var e;
    var A;

    H = LST - RA;
    A = Math.atan(-(Math.sin(H)Math.cos(dec))/(Math.cos(lat)Math.sin(dec) - Math.sin(lat)Math.cos(dec)Math.cos(H)));
    e = Math.asin(Math.sin(lat)Math.sin(dec) + Math.cos(lat)Math.cos(dec)Math.cos(H));

    this.e = e;
    this.A = A;
}

}