<script>
    import STTask from "./s-t-task.svelte";
    export let tasks;
</script>

<div class="yysbp" style="
display: flex;
flex-direction: column;
gap:10px;
padding: 10px;
">
    {#each tasks as task}
        <STTask task={task}/>
    {/each}
</div>