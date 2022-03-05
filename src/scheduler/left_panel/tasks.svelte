<script>
	import STTask from './task.svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { ddGetFullRelativeDate, ddToday } from '../../ddtt/ddate';
	import {order} from '../logic/logic';
	export let tasks;
	export let selectedDateDay;
	const dispatch = createEventDispatcher();
</script>

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<div />
		<p>{ddGetFullRelativeDate(ddToday(), selectedDateDay)}</p>
		<div
			class="yysbp ll25"
			on:click={() => dispatch('message', { command: 'changeRightPanelState', state: 'newTask' })}
		>
			<div class="yysbc yycc ll26">+</div>
		</div>
	</div>
	<div class="yysbp ll3">
		{#each order(tasks.filter((task) => task.ddate === selectedDateDay)) as task (task.slot)}
			<div
				animate:flip={{ duration: 200 }}
				in:fade={{ duration: 200 }}
				out:fade={{ duration: 200 }}
				class="yys-wbp-hbc"
			>
				<!-- {#if task.ddate === selectedDateDay} -->
				<STTask {task} on:message/>
				<!-- {/if} -->
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
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 1fr auto 1fr;
	}
	.ll25 {
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	.ll26 {
		background-color: rgba(255, 255, 255, 0.2);
		width: 2rem;
	}
	.ll3 {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
	}
</style>
