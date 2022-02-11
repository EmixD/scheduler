<script>
    import STTask from "./s-t-task.svelte";
    export let tasks;
</script>

<div class="yysbp">
    {#each tasks as task}
        <STTask task={task}/>
    {/each}
</div>