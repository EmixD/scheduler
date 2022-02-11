<script>
import SWDay from "./s-w-day.svelte";
let selectedDay=3;
function handleMessage(event){
    if(event.detail.command==="selectDay"){
        selectedDay=event.detail.new;
    }
}
</script>


<div class="yysbp yycc" style="
display: flex;
flex-direction: column;
">
    <div class="yys-wbp-hbc yycc" style="
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    ">
    {#each Array(7) as _, i}
        <SWDay mday={i+1} selected={i+1===selectedDay} on:message={handleMessage}/>
    {/each}
    </div>
    <div class="yys-wbp-hbc yycc" style="
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    ">
        <div class="yysf yycc colorbutton btnshape shadow">
        <p>&lt;</p>
        </div>
        <div class="yysf yycc colorbutton btnshape shadow">
        <p>.</p>
        </div>
        <div class="yysf yycc colorbutton btnshape shadow">
        <p>&gt;</p>
        </div>
    </div>
</div>

<style>
    .btnshape{
        height: 34px;
        width: 87px;
        border-radius: 47px;
    }
</style>