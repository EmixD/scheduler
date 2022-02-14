<script>
    import Fa from 'svelte-fa'
    import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
    import { fade, fly } from 'svelte/transition';
    export let task;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    function del(){
        dispatch('message',{command:"removeTask",id:task.id});
    }
    let showui=false;
</script>

<div class="yys-wbp-hbc yycc shadow colortaskfuture task" style="
display: grid;
grid-template-columns: auto 1fr auto;
grid-template-rows: auto;
gap: 10px;
padding-right: 15px;
"
on:mouseenter={()=>{showui=true}}
on:mouseleave={()=>{showui=false}}
>
    <div class="yysbc yycc time shadowtext yynoselect">
        <p style="width: max-content; padding: 5px;">
            {task.timestring?task.timestring:"00:00"}
        </p>
    </div>
    <div class="yysp title shadowtext yynoselect" style="overflow-x: hidden;">
        <p class="yysbс" style="padding: 5px;">
            <nobr>{task.text}</nobr>
        </p>
    </div>
    {#if showui}
        <div class="yysf yycc yynoselect shadowtext" 
        on:click={del} out:fade>
            <Fa size="1.5x" icon={faTrashCan}/>
        </div>
    {/if}
</div>

<style>
    .time{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
    }
    .title{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
    }
    .task{
        height: 37px;
        border-radius: 20px;
        padding: 10px;
    }
</style>