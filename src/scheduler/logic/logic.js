// input = unordered array of all tasks for today
// output = ordered filtered array of tasks

import { ttGetHours, ttGetMinutes } from '../../ddtt/ttime';

export function order(tasks) {
    let maxslot = ttimeToSlot(225000);
    let slots = Array(maxslot + 1).fill(true); // is free?
    let result = [];
    let tasksKnown = tasks.filter(t => t.ttime > 0); // ttime = 0 for undefined
    let tasksUnKnown = tasks.filter(t => t.ttime === 0).sort(
        (a, b) => a.tduration===b.tduration?a.createdAt<b.createdAt:a.tduration < b.tduration
    ); // undefined start time. Sorted by duration, desc. !Remember that sort sorts in-place!

    for (let t of tasksKnown) {
        t.slot = ttimeToSlot(t.ttime);
        result = [...result, t];
        for (let s = t.slot; s < t.slot + ttimeToNslots(t.tduration); s++) {
            if (s > maxslot) {
                console.log("Error: out of slots!");
                // raise warning etc
                continue;
            }
            if (!slots[s]) {
                console.log("Error: overlap!");
                // overlap
            }

            slots[s] = false;
        }
    }

    for (let t of tasksUnKnown) {
        let nslots=ttimeToNslots(t.tduration);
        let streak = false;
        let start;
        for (let ss = maxslot; ss >= 0; ss--) {
            if (!slots[ss]) {
                streak = false;
                continue;
            }
            if (!streak) {
                streak = true;
                start = ss;
            }
            if (start - ss + 1 === nslots) {
                t.slot = ss;
                result = [...result, t];
                for (let s = ss; s <= start; s++) {
                    slots[s] = false;
                }
                break;
            }
        }
    }
    result.sort((a, b) => a.slot > b.slot);//!Remember that sort sorts in-place!
    return result;
}

export function getSuggestedTask(tasks,ttime){
    let slot=ttimeToSlot(ttime);
    for(let t of tasks){
        if(t.slot<=slot){
            return t
        }
        if(t.ttime===0){
            return t
        }
    }
    return false;
}

function ttimeToSlot(ttime) {
    // min time: 11h 0m. Slot0=(11:00 .. 11:10)
    let h = ttGetHours(ttime);
    let m = ttGetMinutes(ttime);
    return (h - 11) * 6 + Math.floor(m / 10);
}
function ttimeToNslots(ttime) {
    // 10min=1slot
    let h = ttGetHours(ttime);
    let m = ttGetMinutes(ttime);
    return h * 6 + Math.floor(m / 10);
}