<script>
    import Fa from 'svelte-fa'
    import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
    import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
    import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
    import { fade } from 'svelte/transition';
    export let task;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    function del(){
        dispatch('message',{command:"removeTask",id:task.id});
    }
    function tick(){
        dispatch('message',{command:"tickTask",id:task.id, tick:!task.tick});
    }
    let showui=false;
</script>

<div class="yys-wbp-hbc yycc shadow  {task.tick?'colortasktick':'colortaskfuture'} task" style="
display: grid;
grid-template-columns: auto 1fr auto auto;
grid-template-rows: auto;
gap: 10px;
padding-right: 15px;
overflow-y: visible;
"
on:mouseenter={()=>{showui=true}}
on:mouseleave={()=>{showui=false}}
>
    <div class="yysbc yycc time shadowtext yynoselect">
        <p style="width: max-content;">
            {task.timestring?task.timestring:"00:00"}
        </p>
    </div>
    <div class="yysbc title shadowtext yynoselect" style="overflow-x: hidden;">
        <p class="yysbc">
            <nobr class="yysbc">{task.text}</nobr>
        </p>
    </div>
    {#if showui}
        <div class="yysf yycc yynoselect shadowtext" 
        on:click={tick} out:fade>
            <Fa size="1x" icon={task.tick?faXmark:faCheck}/>
        </div>
        <div class="yysf yycc yynoselect shadowtext" 
        on:click={del} out:fade>
            <Fa size="1x" icon={faTrashCan}/>
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