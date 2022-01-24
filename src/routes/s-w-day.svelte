<script>
    export let mday;
    export let selected;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    function select(){
        dispatch('message',{command:"selectDay",new:mday});
    }

</script>

<div class={"yysf yycc"+(selected?" border":"")} style="
width:4rem;
height:4rem;
background-color:darkgrey;
display:flex;
"
on:click={select}>
    <p class="yysbc yynoselect">{mday}</p>
</div>

<style>
    .border{
        border:solid;
    }
</style>