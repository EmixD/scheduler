<script>
    import { v4 as uuidv4 } from 'uuid';
    let taskText="";
    
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function submit(){
        dispatch('message',{command:"addTask",new:{text:taskText, id:uuidv4()}});
    }
</script>

<div class="yysbp">
    <input bind:value={taskText}>
    <button on:click={submit}>Submit</button>

</div>