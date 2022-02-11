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
<div class="yysbp yycc">
    <div class="yysf colorscheduler2" style="
    display:flex;
    flex-direction:column;
    width: 800px;
    height: 600px;
    gap: 8px;
    padding:0;
    ">
        <div class="yys-wbp-hbc" style="
        display: grid;
        grid-template-columns:220px 1fr 220px;
        grid-template-rows: 136px;
        grid-template-areas: 
        'now week calendar';
        gap: 8px;
        ">
            <div class="yycc colorscheduler1" style="
            grid-area: now;
            ">
                <SNow/>
            </div>
            <div class="yycc colorscheduler1" style="
            grid-area: week;
            display:flex;
            ">
                <SWeek/>
            </div>
            <div class="yycc colorscheduler1" style="
            grid-area: calendar;
            display:flex;
            ">
                <Profile user={user}/>
            </div>
        </div>

        <div class="yys-wbp-hbc yycc colorscheduler1" style="
        display:grid;
        padding:5px;    
        ">
            <SNew on:message={handleMessage}/>
        </div>

        <div class="yysg" style="
        width:100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        ">
            <div class="yysg colorscheduler1">
                <STasks tasks={tasks}/>
            </div>
            <div class="yysg colorscheduler1">
            </div>
        </div>
    </div>
</div>