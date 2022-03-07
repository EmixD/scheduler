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
	function setSelected() {
		dispatch('message', {command: 'SetSelected', id: task.id, selected: true})
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
	 on:click={setSelected}
>
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
	.ll5 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
</style>
