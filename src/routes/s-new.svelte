<script>
    let taskText="";
    let startTime="00:00";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function submit(){
        dispatch('message',{command:"addTask",new:{text:taskText, timestring:startTime}});
        taskText='';
    }
</script>

<div class="yysbp">
    <input bind:value={startTime} type=time>
    <input bind:value={taskText}>
    <button on:click={submit}>Submit</button>
</div>
