<script>
	import STTask from './task.svelte';
	import STTaskS from './taskshort.svelte';
	import { flip } from 'svelte/animate';
	import { ddGetFullRelativeDate, ddToday } from '../../ddtt/ddate';
	import { order } from '../logic/logic';
	export let tasks;
	export let selectedDateDay;

	function orderAndIndex() {
		let selectedDayTasks = tasks.filter((task) => task.ddate === selectedDateDay);
		let ordered = order(selectedDayTasks);
		// TODO: dispatch tasksInfo as a whole
		let orderedZip = [];
		for (let t of ordered.tasks) {
			orderedZip = [...orderedZip, { task: t, slot: ordered.tasksInfo[t.id].slot }];
		}
		return orderedZip;
	}
</script>

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>{ddGetFullRelativeDate(ddToday(), selectedDateDay)}</p>
	</div>
	<div class="yysbp ll3">
		{#each orderAndIndex() as taskZip (taskZip.slot)}
			<div animate:flip={{ duration: 200 }} class="yys-wbp-hbc">
				{#if taskZip.task.completed}
					<STTaskS task={taskZip.task} on:message />
				{:else}
					<STTask task={taskZip.task} on:message />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.ll1 {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-template-columns: auto;
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
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
	}
</style>
