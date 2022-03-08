<script>
	import Fa from 'svelte-fa';
	import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
	import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { ttGetHoursString, ttGetMinutesString, ttGetDurationString } from '../../ddtt/ttime';
	export let task;

	const dispatch = createEventDispatcher();
	let showui = false;
</script>

<div
	class="yys-wbp-hbc ggshadow ll1 {task.tick ? 'gg-c-task2' : 'gg-c-task1'}"
	on:mouseenter={() => {
		showui = true;
	}}
	on:mouseleave={() => {
		showui = false;
	}}
	on:click={(e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch('message', { command: 'selectTask', id: task.id });
	}}
>
	<div class="yysbp ll2 ggshadowtext yynoselect">
		<p class="yysbc">
			<nobr class="yysbc">{task.text}</nobr>
		</p>
	</div>
	<div class="yysbp ggshadowtext yynoselect ll3">
		{#if showui}
			<div
				class="yysf yycc yynoselect ggshadowtext"
				on:click={(e) => {
					e.preventDefault();
					e.stopPropagation();
					task.tick = !task.tick;
					task.onGoing=false;
					dispatch('message', { command: 'updateTask', task: task });
				}}
				out:fade|local={{ duration: 200 }}
			>
				<Fa size="1x" icon={task.tick ? faXmark : faCheck} />
			</div>
			<div
				class="yysf yycc yynoselect ggshadowtext"
				on:click={(e) => {
					e.preventDefault();
					e.stopPropagation();
					dispatch('message', { command: 'deleteTask', id: task.id });
				}}
				out:fade|local={{ duration: 200 }}
			>
				<Fa size="1x" icon={faTrashCan} />
			</div>
		{/if}
	</div>
</div>

<style>
	.ll1 {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto;
		padding: 5px 10px;
		gap:10px;
	}
	.ll2 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
	.ll3 {
		display: flex;
		flex-direction: row;
		justify-content: right;
		gap: 10px;
		padding-right: 5px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		color: #007;
	}
</style>
