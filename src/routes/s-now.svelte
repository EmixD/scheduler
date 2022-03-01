<script>
    import { onMount } from 'svelte';
    import {ddFromDateObj,ddGetMonthNameString,ddGetDayString,ddGetWeekDayString} from '../ddate';
    import {ttFromDateObj,ttGetHoursString,ttGetMinutesString,ttGetSeconds} from '../ttime';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let dateObj = new Date();

    $: ddate = ddFromDateObj(dateObj);
    $: ttime = ttFromDateObj(dateObj);

    onMount(() => {
        const interval = setInterval(() => {
            dateObj = new Date();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

</script>

<div class="yysbp yycc" style="
display:flex;
flex-direction: column;
">
    <div class="yys-wbp-hbc yycc" style="
    display: flex;
    width: 100%;
    ">
        <p class="yysbc shadowtext" style="font-size: 1.5rem;">{ddGetWeekDayString(ddate)}</p>
    </div>

    <div class="yys-wbp-hbc yycc yynoselect" style="
    display: flex;
    width: 100%;
    "
    on:click={()=>dispatch('message',{command:"setCurrentDay"})}
    >
        <p class="yysbc shadowtext" style="font-size: 3rem; line-height: 3rem;">{ttGetHoursString(ttime)}</p>
        <p class="yysbc shadowtext" style="font-size: 3rem; width: 0.8rem; line-height: 3rem;">
            {ttGetSeconds(ttime)%2===0?`:`:` `}
        </p>
        <p class="yysbc shadowtext" style="font-size: 3rem; line-height: 3rem;">{ttGetMinutesString(ttime)}</p>
    </div>

    <div class="yys-wbp-hbc yycc" style="
    display: flex;
    width: 100%;
    ">
        <p class="yysbc shadowtext" style="font-size: 1.5rem;">
            {ddGetDayString(ddate) + " " + ddGetMonthNameString(ddate)}
        </p>
    </div>
</div>