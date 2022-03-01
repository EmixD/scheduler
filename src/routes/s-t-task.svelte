<script>
	import Fa from 'svelte-fa';
	import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
	import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
	import { fade } from 'svelte/transition';
	export let task;
	import { createEventDispatcher } from 'svelte';
	import { ttGetHoursString, ttGetMinutesString, ttGetDurationString } from '../ttime';

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
	class="yys-wbp-hbc shadow  {task.tick ? 'colortasktick' : 'colortaskfuture'}"
	style="
display: flex;
flex-direction: column;
gap: 0px;
padding: 10px;
border-radius: 20px;
"
	on:mouseenter={() => {
		showui = true;
	}}
	on:mouseleave={() => {
		showui = false;
	}}
>
	<div
		class="yys-wbp-hbc"
		style="
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    "
	>
		<div
			class="yysbp time shadowtext yynoselect"
			style="
        display: flex;
        flex-direction: row;
        gap:10px;
        "
		>
			<p style="width: max-content;">
				{ttGetHoursString(task.ttime) + ':' + ttGetMinutesString(task.ttime)}
			</p>
			<p style="width: max-content;">({ttGetDurationString(task.tduration)})</p>
		</div>
		<div
			class="yysbp time shadowtext yynoselect"
			style="
        display: flex;
        flex-direction: row;
        justify-content: right;
        gap:10px;
        padding-right: 5px;
        overflow: hidden;
        "
		>
			{#if showui}
				<div class="yysf yycc yynoselect shadowtext" on:click={tick} out:fade>
					<Fa size="1x" icon={task.tick ? faXmark : faCheck} />
				</div>
				<div class="yysf yycc yynoselect shadowtext" on:click={del} out:fade>
					<Fa size="1x" icon={faTrashCan} />
				</div>
			{/if}
		</div>
	</div>
	<div class="yysbp title shadowtext yynoselect" style="overflow-x: hidden;">
		<p class="yysbp" style="display: flow-root;">
			<nobr class="yysbp">{task.text}</nobr>
		</p>
	</div>
</div>

<style>
	.time {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
	}
	.title {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
	}
</style>
