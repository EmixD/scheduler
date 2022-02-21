<script>
    import { onMount } from 'svelte';

    let time = new Date();

    $: hours = time.getHours();
    $: minutes = time.getMinutes();
    $: seconds = time.getSeconds();
    $: weekDay = weekDayToString(time.getDay());
    $: monthDay = time.getDate();
    $: month = monthToString(time.getMonth());

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
    
    function toTwoDigits(num){
        return ("0" + num).slice(-2);
    }

    function monthToString(month) {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "Unknown";
        }
    }

    function weekDayToString(day) {
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


</script>

<div class="yysbp yycc" style="
display:flex;
flex-direction: column;
justify-content: space-evenly;
">
    <div class="yys-wbp-hbc yycc" style="
    display: flex;
    width: 100%;
    ">
        <p class="yysbc shadowtext" style="font-size: 1.5rem;">{weekDay}</p>
    </div>

    <div class="yys-wbp-hbc yycc yynoselect" style="
    display: flex;
    width: 100%;
    ">
        <p class="yysbc shadowtext" style="font-size: 3rem;">{toTwoDigits(hours) }</p>
        <p class="yysbc shadowtext" style="font-size: 3rem; width: 0.8rem">{seconds%2===0?`:`:` `}</p>
        <p class="yysbc shadowtext" style="font-size: 3rem;">{toTwoDigits(minutes)}</p>
    </div>

    <div class="yys-wbp-hbc yycc" style="
    display: flex;
    width: 100%;
    ">
        <p class="yysbc shadowtext" style="font-size: 1.5rem;">{toTwoDigits(monthDay) + " " + month}</p>
    </div>
</div>