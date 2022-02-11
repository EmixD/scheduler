<script>
    export let mday;
    export let selected;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    function select(){
        dispatch('message',{command:"selectDay",new:mday});
    }

</script>

<div class={"yysf yycc colorgreen"+(selected?" shadowborder":" shadow")} style="
width: 42px;
height:57px;
border-radius: 16px;
display:flex;
"
on:click={select}>
    <p class="yysbc yynoselect">{mday}</p>
</div>
