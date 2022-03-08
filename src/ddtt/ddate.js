// ddate is a yyyymmdd numeric format.

import { toTwoDigits } from './ddtt';

export function ddToday() {
    let dateObj = new Date();
    return ddFromDateObj(dateObj);
}

export function ddGetWeekStart(ddate) {
    let dateObj = new Date(ddGetYear(ddate), ddGetMonth(ddate) - 1, ddGetDay(ddate));
    if(dateObj.getDay()===0){
        return ddValidateMath(ddate - 7 + 1); // Monday start
    }
    return ddValidateMath(ddate - dateObj.getDay() + 1); // Monday start
}

export function ddValidateMath(ddate) {
    // validates addition and subtraction in range of at least -10...+10 days and -10..+10 month and -10..10 years
    let y = ddGetYear(ddate);
    let m = ddGetMonth(ddate);
    let d = ddGetDay(ddate);
    if (d > 60) {
        d -= 100;
        m += 1;
    }
    if (m > 50) {
        m -= 100;
        y += 1;
    }
    let dateObj = new Date(y, m - 1, d);
    return ddFromDateObj(dateObj);
}

export function ddFromDateObj(dateObj) {
    return dateObj.getFullYear() * 10000 + (dateObj.getMonth() + 1) * 100 + dateObj.getDate();
}

export function ddGetDay(ddate) {
    return ddate % 100;
}

export function ddGetMonth(ddate) {
    return Math.floor((ddate % 10000) / 100);
}

export function ddGetYear(ddate) {
    return Math.floor(ddate / 10000);
}

export function ddGetDayString(ddate) {
    return toTwoDigits(ddGetDay(ddate));
}

export function ddGetMonthString(ddate) {
    return toTwoDigits(ddGetMonth(ddate));
}

export function ddGetYearString(ddate) {
    return ddGetYear(ddate) + ''; // it is implied that the year is always 4-digit
}

export function ddGetMonthNameString(ddate) {
    switch (ddGetMonth(ddate)) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}

export function ddGetMonthNameStringShort(ddate) {
    switch (ddGetMonth(ddate)) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
    }
}

export function ddGetWeekDayString(ddate) {
    let dateObj = new Date(ddGetYear(ddate), ddGetMonth(ddate) - 1, ddGetDay(ddate));

    switch (dateObj.getDay()) {
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
    }
}

export function ddGetWeekDayStringShort(ddate) {
    let dateObj = new Date(ddGetYear(ddate), ddGetMonth(ddate) - 1, ddGetDay(ddate));
    switch (dateObj.getDay()) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thi";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
}

export function ddGetFullRelativeDate(ddbasis, ddate) {
    let wday = ' (' + ddGetWeekDayString(ddate) + ')';
    if (ddate === ddbasis) {
        return 'Today';
    }
    if (ddate === ddValidateMath(ddbasis + 1)) {
        return 'Tomorrow' + wday;
    }
    if (ddate === ddValidateMath(ddbasis - 1)) {
        return 'Yesterday' + wday;
    }
    return ddGetMonthNameString(ddate) + ' ' + ddGetDayString(ddate) + wday;

}

export function ddGetFullRelativeDateShort(ddbasis, ddate) {
    if (ddate === ddbasis) {
        return 'Today';
    }
    if (ddate === ddValidateMath(ddbasis + 1)) {
        return 'Tomorrow';
    }
    if (ddate === ddValidateMath(ddbasis - 1)) {
        return 'Yesterday';
    }
    return ddGetMonthNameString(ddate) + ' ' + ddGetDayString(ddate);
}