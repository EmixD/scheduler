<script>
    import SWDay from "./s-w-day.svelte";
    export let selectedWeekFirstDateDay;
    export let selectedDateDay;

    function handleMessage(event){
        if(event.detail.command==="selectDay"){
            //TODO: dispatch
            // selectedDay=event.detail.new;
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
            <SWDay ddate={selectedWeekFirstDateDay+i} 
            selected={i===selectedDateDay-selectedWeekFirstDateDay} 
            on:message={handleMessage}/>
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