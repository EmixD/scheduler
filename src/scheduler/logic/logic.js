// input = unordered array of all tasks for today
// output = ordered filtered array of tasks

import { ttGetHours, ttGetMinutes } from '../../ddtt/ttime';

export function order(tasks) {
    console.log('order, input=', tasks);
    console.time('order');

    let maxslot = ttimeToSlot(225000);
    let slots = Array(maxslot + 1).fill(true); // is free?

    let completedTasks = tasks.filter(t => t.completed);
    let completedTasksInfo = {};
    completedTasks.sort((a, b) => a.createdAt > b.createdAt);
    for (let i in completedTasks) {
        completedTasksInfo[completedTasks[i].id] = { slot: i - completedTasks.length - 1 };
    }

    let notCompletedTasksOrdered = [];
    let notCompletedTasksOrderedInfo = {};
    let notCompletedTasks = tasks.filter(t => !t.completed);
    let tasksKnown = notCompletedTasks.filter(t => t.ttime !== 0); // ttime = 0 for undefined
    let tasksUnKnown = notCompletedTasks.filter(t => t.ttime === 0);
    tasksUnKnown.sort(
        (a, b) => a.tduration === b.tduration ? a.createdAt < b.createdAt : a.tduration < b.tduration
    ); // undefined start time. Sorted by duration, desc. !Remember that sort sorts in-place!

    for (let t of tasksKnown) {
        let tslot = ttimeToSlot(t.ttime);
        notCompletedTasksOrdered = [...notCompletedTasksOrdered, t];
        notCompletedTasksOrderedInfo[t.id] = { slot: tslot };
        for (let s = tslot; s < tslot + ttimeToNslots(t.tduration); s++) {
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
        let nslots = ttimeToNslots(t.tduration);
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
                notCompletedTasksOrdered = [...notCompletedTasksOrdered, t];
                notCompletedTasksOrderedInfo[t.id] = { slot: ss };
                for (let s = ss; s <= start; s++) {
                    slots[s] = false;
                }
                break;
            }
        }
    }
    notCompletedTasksOrdered.sort((a, b) => notCompletedTasksOrderedInfo[a.id].slot > notCompletedTasksOrderedInfo[b.id].slot);//!Remember that sort sorts in-place!
    let result = {
        tasks: [...completedTasks, ...notCompletedTasksOrdered],
        tasksInfo: { ...completedTasksInfo, ...notCompletedTasksOrderedInfo }
    }
    console.timeEnd('order');
    return result;
}

export function getSuggestedTask(tasks, tasksInfo, ttime) {
    let slot = ttimeToSlot(ttime);
    for (let t of tasks) {
        if (tasksInfo[t.id].slot <= slot) {
            return t
        }
        if (t.ttime === 0) {
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
export function ttimeToNslots(ttime) {
    // 10min=1slot
    let h = ttGetHours(ttime);
    let m = ttGetMinutes(ttime);
    return h * 6 + Math.floor(m / 10);
}