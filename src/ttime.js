// ttime is a hhmmss numeric format.
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