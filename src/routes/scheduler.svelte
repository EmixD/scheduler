<script>
    import SWeek from "./s-week.svelte";
    import SNow from "./s-now.svelte";
    import STasks from "./s-tasks.svelte";
    import SNew from "./s-new.svelte";
    import Profile from "./profile.svelte";
    import { db } from './firebase';
    export let user;

    let tasks=[];
    db.collection(user.uid).onSnapshot(data =>{
        tasks=data.docs.map(x=>x.data());
    });

    function handleMessage(event){
        if(event.detail.command==="addTask"){
            db.collection(user.uid).add(event.detail.new);
        }
    }
</script>

<div class="yysbp" style="
background-color:lightsteelblue;
display:flex;
flex-direction:column;
gap:2rem;
padding:2rem;
">
    <div class="yys-wbp-hbc" style="
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
        background-color:cadetblue;
        ">
            <Profile user={user}/>
        </div>
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
        ">
            <SNew on:message={handleMessage}/>
        </div>
        <div class="" style="
        grid-area: tasks;
        background-color:darkmagenta;
        ">
            <STasks tasks={tasks}/>
        </div>
    </div>

</div>