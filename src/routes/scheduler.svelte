<script>
    import SWeek from "./s-week.svelte";
    import SNow from "./s-now.svelte";
</script>

<div class="yysf" style="
width:100%;
height:100%;
background-color:lightsteelblue;
display:flex;
flex-direction:column;
gap:2rem;
padding:2rem;
">

    <div class="yysbc" style="
    width:100%;
    background-color:lightslategray;
    display: grid;
    grid-template-columns:15rem 1fr 15rem;
    grid-template-rows: 10rem 4rem;
    grid-template-areas: 
    'now week calendar'
    'hours hours hours';
    ">
        <div class="yycc" style="
        grid-area: now;
        ">
            <SNow/>
        </div>
        <div class="yycc" style="
        grid-area: week;
        display:flex;
        ">
            <SWeek/>
        </div>
        <div class="" style="
        grid-area: calendar;
        background-color:darkblue;
        "></div>
        <div class="" style="
        grid-area: hours;
        background-color:olive;
        "></div>
    </div>

    <div class="yysg" style="
    width:100%;
    background-color:red;
    display: grid;
    grid-template-columns:1fr;
    grid-template-rows: 10rem 1fr;
    grid-template-areas: 
    'new'
    'tasks';
    ">
        <div class="" style="
        grid-area: new;
        background-color:darkblue;
        "></div>
        <div class="" style="
        grid-area: tasks;
        background-color:darkmagenta;
        "></div>
    </div>

</div>