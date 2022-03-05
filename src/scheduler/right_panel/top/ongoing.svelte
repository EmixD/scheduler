<script>
	import { ttFromDateObj } from '../../../ddtt/ttime';
	import { ddToday } from '../../../ddtt/ddate';
	import { order, getSuggestedTask } from '../../logic/logic';
	import SOTask from './ongoingtask.svelte';
	export let tasks;

	$: orderedTasks = order(tasks.filter(
		(task) => 
		!task.tick&&(task.ddate === ddToday())
		));
	$: suggestedTask = getSuggestedTask(orderedTasks, ttFromDateObj(new Date()));
</script>

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>Suggested Task</p>
	</div>
	<div class="yysbp ll3">
		{#if suggestedTask}
			<SOTask task={suggestedTask} on:message/>
		{/if}
	</div>
	<div class="yys-wbp-hbc ll4">
		<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" >+</div>
		<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" >+</div>
		<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" >+</div>
		<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" >+</div>
	</div>
</div>

<style>
	.ll1 {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		padding-bottom: 10px;
	}
	.ll2 {
		background-color: #0d1c9d;
		color: white;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
	}
	.ll3 {
		padding: 10px;
	}
	.ll4{
		display: grid;
		grid-template-columns: repeat(4,1fr);
		grid-template-rows: auto;
		justify-items: center;
	}
	.llbtn {
		height: 40px;
		width: 80px;
		color: #228;
		font-size: 1.2rem;
		font-weight: bold;
	} 
</style>
