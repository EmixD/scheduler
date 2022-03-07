<script>
	import { ttFromDateObj } from '../../../ddtt/ttime';
	import { ddToday } from '../../../ddtt/ddate';
	import { order, getSelected,getSuggestedTask, getOngoing } from '../../logic/logic';
	import SOTask from './ongoingtask.svelte';
	import SOTaskC from './ongoingtaskshort.svelte';
	import { createEventDispatcher } from 'svelte';
	export let tasks;
	const dispatch = createEventDispatcher();

	$: orderedTasks = order(tasks.filter((task) => !task.tick && task.ddate === ddToday()));
	$: ongoingTask = getSelected(orderedTasks)||getOngoing(orderedTasks)||getSuggestedTask(orderedTasks, ttFromDateObj(new Date()));
</script>

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>Suggested Task</p>
	</div>
	<div class="yysbp ll3">
		<div class="yysbp">
			{#if ongoingTask}
				<SOTask task={ongoingTask} on:message />
			{/if}
		</div>
		<div class="yys-wbp-hbc ll4">
			<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" on:click={
dispatch('message', { command: 'SetOnGoing', id: ongoingTask.id, onGoing: !ongoingTask.onGoing })

			}>Tggl og</div>
			<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" on:click={()=>dispatch('message', { command: 'tickTask', id: ongoingTask.id, tick: !ongoingTask.tick })}>Done</div>
			<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" on:click={()=>dispatch('message', { command: 'removeTask', id: ongoingTask.id })}>Delete</div>
		</div>
		<div class="yys-wbp-hbc">
			{#if tasks[0]}
				<SOTaskC task={orderedTasks[0]} on:message />
			{/if}
		</div>
	</div>
</div>

<style>
	.ll1 {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
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
		gap: 10px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto auto;
	}
	.ll4 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		justify-items: center;
		padding-left: 10px;
		padding-right: 10px;
	}
	.llbtn {
		height: 40px;
		width: 80px;
		color: #228;
		font-size: 1.2rem;
		font-weight: bold;
	}
</style>
