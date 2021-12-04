class LunarMath{
    constructor(date){
    this.date = date;
    }

    julianDay(){
        var RAD = Math.PI / 180.0;
        var k = Math.trunc((this.date - 1900.0) * 12.3685);

        var T = k / 1236.85;

        var JD = 2415020.75933 + (29.53058868 * k) + (0.0001178 * Math.pow(T, 2)) - (0.000000155 * Math.pow(T, 3)) + (0.00033 * Math.sin(((166.56*RAD) + ((132.87*RAD)*T) - ((0.009173*RAD)*Math.pow(T, 2)))));
        return JD;
    }

    julianToCalendar(){
        var JD = this.julianDay() + 0.5;
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
        return [y, m, dd];
    }
// FUNCTION STILL A WORK IN PROGRESS
    lunarLocation(){
        var JD = this.julianDay();
        var T = (JD - 2415020.0) / 36525;

        var Lp = 70.434164 + (481267.8831*T);
        var M = 358.475833 + (35999.0498*T);
        var Mp = 296.104608 + (477198.8491*T);
        var D = 350.737486 + (445267.1142*T);
        var F = 11.250889 + (483202.0251*T);

        var E = 1 - (0.002495*T) - (0.00000752*Math.pow(T,2));

        //var lon = Lp + (6.288750 * math.sin(Mp*RAD)) + (1.274018 * math.sin((2*D - Mp)*RAD)) + (0.658309 * math.sin(2*D)) + (0.213616 * math.sin(2Mp)) - (0.185596 * math.sin(M) * E) - (0.114336 * math.sin(2*F)) + (0.058793 * math.sin((2*D) - (2*Mp))) + (0.057212 * math.sin((2*D) - M - Mp) * E) + (0.053320 * math.sin(2*D + Mp)) + (0.045874 * math.sin(2*D - M) * E);
        var lat;
        return E;
        //return [lon, lat];
    }
}