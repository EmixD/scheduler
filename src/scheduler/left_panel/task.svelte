<script>
	import Fa from 'svelte-fa';
	import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
	import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
	import { fade } from 'svelte/transition';
	export let task;
	import { createEventDispatcher } from 'svelte';
	import { ttGetHoursString, ttGetMinutesString, ttGetDurationString } from '../../ddtt/ttime';

	const dispatch = createEventDispatcher();
	function del() {
		dispatch('message', { command: 'removeTask', id: task.id });
	}
	function tick() {
		dispatch('message', { command: 'tickTask', id: task.id, tick: !task.tick });
	}
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
>
	<div class="yys-wbp-hbc ll2">
		<div class="yysbp ggshadowtext yynoselect ll3">
			{#if task.ttime !== 0}
				<nobr>
					{ttGetHoursString(task.ttime) + ':' + ttGetMinutesString(task.ttime)}
				</nobr>
			{/if}
			<nobr>
				({ttGetDurationString(task.tduration)})
			</nobr>
		</div>
		<div class="yysbp ggshadowtext yynoselect ll4">
			{#if showui}
				<div class="yysf yycc yynoselect ggshadowtext" on:click={tick} out:fade={{ duration: 200 }}>
					<Fa size="1x" icon={task.tick ? faXmark : faCheck} />
				</div>
				<div class="yysf yycc yynoselect ggshadowtext" on:click={del} out:fade={{ duration: 200 }}>
					<Fa size="1x" icon={faTrashCan} />
				</div>
			{/if}
		</div>
	</div>
	<div class="yysbp ll5 ggshadowtext yynoselect">
		<p class="yysbc">
			<nobr class="yysbc">{task.text}</nobr>
		</p>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
		padding: 10px;
		/* border-radius: 20px; */
	}
	.ll2 {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto;

	}
	.ll3 {
		display: flex;
		flex-direction: row;
		gap: 10px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		color: #007;
	}
	.ll4 {
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
	.ll5 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
</style>
