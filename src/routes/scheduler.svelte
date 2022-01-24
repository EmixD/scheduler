<script>
    import SWeek from "./s-week.svelte";
</script>

<div class="yysf" style="
width:100%;
height:100%;
background-color:aqua;
display:flex;
flex-direction:column;
gap:2rem;
padding:2rem;
">

    <div class="yysbc" style="
    width:100%;
    background-color:red;
    display: grid;
    grid-template-columns:15rem 1fr 15rem;
    grid-template-rows: 10rem 2rem;
    grid-template-areas: 
    'now week calendar'
    'hours hours hours';
    ">
        <div class="" style="
        grid-area: now;
        background-color:darkcyan;
        "></div>
        <div class="yycc" style="
        grid-area: week;
        background-color:azure;
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
        background-color:goldenrod;
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
        background-color:goldenrod;
        "></div>
    </div>

</div>