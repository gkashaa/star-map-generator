// Colton Cappa, Gloria Kashaa, Jared Nicoll, Leonie Nutz
class LunarMath{
    constructor(date){
    this.date = date;
    }

    julianDay(){
        var RAD = Math.PI / 180.0;
        var k = Math.trunc((this.date - 1900.0) * 12.3685);
        var i = 0;
        var JD = [0,0,0,0];
        while(i<4){
            var T = k / 1236.85;
            var temp = 2415020.75933 + (29.53058868 * k) + (0.0001178 * Math.pow(T, 2)) - (0.000000155 * Math.pow(T, 3)) + (0.00033 * Math.sin(((166.56*RAD) + ((132.87*RAD)*T) - ((0.009173*RAD)*Math.pow(T, 2)))));
            JD[i] = temp;
            i = i + 1;
            k = k + 0.25;
        }
        return JD;
    }

    julianToCalendar(JD){
        var JD = JD + 0.5;
        var A, alpha;
        var m, y, dd;

        var Z = Math.trunc(JD);
        var F = JD - Z // Decimal fraction left after converting JD to an int
        if(Z < 229161){
            A = Z;
        }
        else{
            alpha = Math.trunc((Z - 1867216.25) / 36524.25);
            A = Z + 1 + alpha - (Math.trunc(alpha / 4));
        }

        var B = A + 1524;
        var C = Math.trunc((B - 122.1) / 365.25);
        var D = Math.trunc(365.25 * C);
        var E = Math.trunc((B - D) / 30.6001);

        dd = B - D - Math.trunc(30.6001*E) + F;

        if(E < 13.5){
            m = E - 1;
        }
        else{
            m = E - 13;
        }

        if(m > 2.5){
            y = C - 4716;
        }
        else{
            y = C - 4715;
        }
        var temp = (y + (m/13) + (dd/365))
        return temp;
    }
// Outputs equitorial latitude and longtitude of moon
    lunarLocation(phase){
        var RAD = Math.PI / 180;
        var JD = this.julianDay()[phase];
        var T = (JD - 2415020.0) / 36525;
        var Lp = 70.434164 + (481267.8831*T);
        var M = 358.475833 + (35999.0498*T);
        var Mp = 296.104608 + (477198.8491*T);
        var D = 350.737486 + (445267.1142*T);
        var F = 11.250889 + (483202.0251*T);

        var E = 1 - (0.002495*T) - (0.00000752*Math.pow(T,2));

        var lon = Lp + (6.288750 * Math.sin(Mp*RAD)) + (1.274018 * Math.sin((2*D-Mp)*RAD)) + (0.658309 * Math.sin(2*D*RAD)) + (0.213616 * Math.sin(2*Mp*RAD)) - (0.185596 * Math.sin(M*RAD)*E) - (0.114336 * Math.sin(2*F*RAD)) + (0.058793*Math.sin(((2*D)-(2*Mp))*RAD)) + (0.057212 * Math.sin((2*D)-M-Mp)*E) + (0.053320*Math.sin((2*D + Mp)*RAD)) + (0.045874*Math.sin((2*D-M)*RAD)*E);
        var lat = (5.128189 * Math.sin(F*RAD)) + (0.280606*Math.sin((Mp+F)*RAD)) + (0.277693*Math.sin((Mp-F)*RAD)) + (0.173238*Math.sin((2*D-F)*RAD)) + (0.055413*Math.sin((2*D+F-Mp)*RAD)) + (0.046272*Math.sin((2*D-F-Mp)*RAD)) + (0.032573*Math.sin((2*D+F)*RAD)) + (0.017198*Math.sin((2*Mp+F)*RAD)) + (0.009267*Math.sin((2*D+Mp-F)*RAD)) + (0.008823*Math.sin((2*Mp-F)*RAD));
        //return lon;
        return [lon, lat];
    }
    //Outputs phase of moon for image
    moonPhase(){
        var date = this.date;
        var JD = this.julianDay();
        //var new = moon.julianToCalendar(moon.julianDay()[0]);
        var first = moon.julianToCalendar(moon.julianDay()[1]);
        var full = moon.julianToCalendar(moon.julianDay()[2]);
        var last = moon.julianToCalendar(moon.julianDay()[3]);
        if(date < first){
            return 0;
        }
        else if(date < full){
            return 1;
        }
        else if(date < last){
            return 2;
        }
        else{
            return 3;
        }
            
    }
}

//EXAMPLE CALL FOR PROJECTION JS SCRIPT
/*
var moon = new LunarMath(2000);
var phase = moon.moonPhase(); 
var location = moon.lunarLocation(phase);
*/
