// ttime is a hhmmss numeric format. Prefix "t"
import {toTwoDigits} from './ddtt';

export function ttFromDateObj(dateObj){
    return dateObj.getHours()*10000+dateObj.getMinutes()*100+dateObj.getSeconds();
}

export function ttGetSeconds(ttime){
    return ttime%100;
}

export function ttGetMinutes(ttime){
    return Math.floor((ttime%10000)/100);
}

export function ttGetHours(ttime){
    return Math.floor(ttime/10000);
}

export function ttGetSecondsString(ttime){
    return toTwoDigits(ttGetSeconds(ttime));
}

export function ttGetMinutesString(ttime){
    return toTwoDigits(ttGetMinutes(ttime));
}

export function ttGetHoursString(ttime){
    return toTwoDigits(ttGetHours(ttime));
}

export function ttGetDurationString(ttime){
    let h=ttGetHours(ttime);
    let m=ttGetMinutes(ttime);
    if(h===0){
        return m+'m';
    }
    
    if(m===0){
        return h+'h';
    }

    return h+'h '+m+'m';
}

export function ttGetDurationStringLonger(ttime){
    let h=ttGetHours(ttime);
    let m=ttGetMinutes(ttime);
    if(h===0){
        return m+'m';
    }

    return h+'h '+toTwoDigits(m)+'m';
}

export function ttSlotToTtime(slot){
    let h= 11+Math.floor(slot/6);
    let m = 10*(slot%6);
    return h*10000+m*100;
}

export function ttGetTimeString(ttime){
    return ttGetHoursString(ttime) + ':' + ttGetMinutesString(ttime);
}