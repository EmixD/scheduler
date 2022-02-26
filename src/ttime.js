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