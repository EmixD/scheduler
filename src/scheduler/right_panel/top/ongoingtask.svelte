<script>
	import Fa from 'svelte-fa';
	import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
	import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
	import { fade } from 'svelte/transition';
	export let task;
	import { createEventDispatcher } from 'svelte';
	import { ttGetHoursString, ttGetMinutesString, ttGetDurationString } from '../../../ddtt/ttime';

	const dispatch = createEventDispatcher();
	function del() {
		dispatch('message', { command: 'removeTask', id: task.id });
	}
	function tick() {
		dispatch('message', { command: 'tickTask', id: task.id, tick: !task.tick });
	}
</script>

<div class="yysbp ggshadow ll1 {task.tick ? 'gg-c-task2' : 'gg-c-task1'}">
	<div class="yysbp ggshadowtext yynoselect ll3">
		{#if task.ttime !== 0}
			<nobr>
				{ttGetHoursString(task.ttime) + ':' + ttGetMinutesString(task.ttime)}
			</nobr>
		{/if}
		<nobr>
			{ttGetDurationString(task.tduration)}
		</nobr>
	</div>

	<div class="yysbp yycc ll5 ggshadowtext yynoselect">
		<p class="yysbc">
			<nobr class="yysbc">{task.text}</nobr>
		</p>
	</div>

	<div class="yysbp ggshadowtext yynoselect ll4">
		<div class="yysf yycc yynoselect ggshadowtext" on:click={tick} out:fade={{ duration: 200 }}>
			<Fa size="1x" icon={task.tick ? faXmark : faCheck} />
		</div>
		<div class="yysf yycc yynoselect ggshadowtext" on:click={tick} out:fade={{ duration: 200 }}>
			<Fa size="1x" icon={task.tick ? faXmark : faCheck} />
		</div>
		<div class="yysf yycc yynoselect ggshadowtext" on:click={tick} out:fade={{ duration: 200 }}>
			<Fa size="1x" icon={task.tick ? faXmark : faCheck} />
		</div>
		<div class="yysf yycc yynoselect ggshadowtext" on:click={del} out:fade={{ duration: 200 }}>
			<Fa size="1x" icon={faTrashCan} />
		</div>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
		padding: 10px;
		gap: 10px;
		/* border-radius: 20px; */
	}

	.ll3 {
		display: flex;
		flex-direction: row;
		gap: 10px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		color: #007;
	}
	.ll4 {
		display: flex;
		flex-direction: row;
		gap: 10px;
		padding-right: 5px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		color: #007;
		justify-content: space-evenly;
	}
	.ll5 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
</style>
