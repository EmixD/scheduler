<script>
	import STTask from './task.svelte';
	export let tasks;
	export let selectedDateDay;
	import { createEventDispatcher } from 'svelte';
	import { ddGetFullRelativeDate, ddToday } from '../../ddtt/ddate';
	const dispatch = createEventDispatcher();
	function forward(event) {
		dispatch('message', event.detail);
	}
</script>

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>{ddGetFullRelativeDate(ddToday(), selectedDateDay)}</p>
	</div>
	<div class="yysbp ll3">
		{#each tasks as task}
			{#if task.ddate === selectedDateDay}
				<STTask {task} on:message={forward} />
			{/if}
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
		overflow-x: hidden;
		padding: 10px;
	}
</style>
