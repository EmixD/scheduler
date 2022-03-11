<script>
	export let task;
	export let ongoing;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div
	class="yys-wbp-hbc ggshadow yycc ll1 {task.completed ? 'gg-c-task2' : 'gg-c-task1'}"
	on:click={(e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch('message', { command: 'selectTask', id: task.id });
		dispatch('message', { command: 'selectDay', ddate: task.ddate });
	}}
>
	<div class={'yysbc ll5 ggshadowtext yynoselect' + (ongoing ? ' llog' : '')}>
		<nobr class="yysbc">{task.text}</nobr>
	</div>
</div>

<style>
	.ll1 {
		padding: 5px 10px;
		overflow-x: hidden;
		/* border-radius: 20px; */
	}
	.ll5 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
	.llog {
		color: #700;
	}
</style>
