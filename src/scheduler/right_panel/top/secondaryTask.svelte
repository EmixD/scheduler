<script>
	export let task;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div
	class="yys-wbp-hbc ggshadow ll1 {task.tick ? 'gg-c-task2' : 'gg-c-task1'}"
	on:click={(e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch('message', { command: 'selectTask', id: task.id });
		dispatch('message', { command: 'selectDay', ddate:task.ddate });
	}}
>
	<div class="yysbp ll5 ggshadowtext yynoselect">
		<nobr class="yysbc">{task.text}</nobr>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
		padding: 5px 10px;
		/* border-radius: 20px; */
	}
	.ll5 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
</style>
