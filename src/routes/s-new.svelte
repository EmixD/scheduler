<script>
    let taskText="";
    let startTime="00:00";
    let startTimeh=11;
    let startTimem=0;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function submit(){
        dispatch('message',{command:"addTask",new:{text:taskText, tick:false, timestring:getTimeString()}});
        taskText='';
    }
    function mwheelh(event){
        event.preventDefault();
        startTimeh -= Math.sign(event.deltaY);
        if(startTimeh>23){
            startTimeh=23;
        }
        if(startTimeh<11){
            startTimeh=11;
        }
    }
    function mwheelm(event){
        event.preventDefault();
        startTimem -= Math.sign(event.deltaY)*10;
        if(startTimem>=60){
            startTimem-=60;
            mwheelh({deltaY:-1, preventDefault:(()=>{;})});
        }
        if(startTimem<0){
            startTimem+=60;
            mwheelh({deltaY:1, preventDefault:(()=>{;})})
        }
    }
    function toTwoDigits(num){
        return ("0" + num).slice(-2);
    }
    function getTimeString(){
        return ""+toTwoDigits(startTimeh)+":"+toTwoDigits(startTimem);
    }
</script>

<div class="yysbp" style="
display: flex;
flex-direction: row;
gap:10px;
">
    <div class="yysc yycc shadowtext" style="
    display: flex;
    flex-direction: row;
    font-size: 20px;
    gap:0px;
    ">
        <div class="yynoselect" on:wheel={mwheelh}>{toTwoDigits(startTimeh)}:</div>
        <div class="yynoselect" on:wheel={mwheelm}>{toTwoDigits(startTimem)}</div>
    </div>
    <input bind:value={taskText} on:keypress={(e)=>{if(e.key === "Enter"){submit();}}}>
    <button on:click={submit}>Submit</button>
</div>
