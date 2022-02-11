<script>
    import STTask from "./s-t-task.svelte";
    export let tasks;
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    function forward(event){
        dispatch('message',event.detail);
    }
</script>

<div class="yysbp" style="
display: flex;
flex-direction: column;
gap:10px;
padding: 10px;
">
    {#each tasks as task}
        <STTask task={task} on:message={forward}/>
    {/each}
</div>