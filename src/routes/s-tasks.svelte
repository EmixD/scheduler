<script>
	import STTask from './s-t-task.svelte';
	export let tasks;
	export let selectedDateDay;
	import { createEventDispatcher } from 'svelte';
	import { ddGetFullRelativeDate, ddToday } from '../ddate';
	const dispatch = createEventDispatcher();
	function forward(event) {
		dispatch('message', event.detail);
	}
</script>

<div
	class="yysbp"
	style="
display: grid;
grid-template-rows: auto 1fr;
grid-template-columns: auto;
"
>
	<div
		class="yys-wbp-hbc yycc yynoselect title"
		style="
    background-color: #0D1C9D;
    color: white;
    "
	>
		<p>{ddGetFullRelativeDate(ddToday(), selectedDateDay)}</p>
	</div>
	<div
		class="yysbp"
		style="
    display: flex;
    flex-direction: column;
    gap:10px;
    overflow-x: hidden;
    padding: 10px;
    "
	>
		{#each tasks as task}
			{#if task.ddate === selectedDateDay}
				<STTask {task} on:message={forward} />
			{/if}
		{/each}
	</div>
</div>

<style>
	.title {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
	}
</style>
