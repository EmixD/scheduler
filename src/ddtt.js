// ddtt contains helper functions for ddate and ttime

export function toTwoDigits(num){
    return ("0" + num).slice(-2);
}

export function weekDayToString(day) {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thirsday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Unknown";
    }
}