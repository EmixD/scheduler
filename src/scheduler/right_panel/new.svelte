<script>
	import { createEventDispatcher } from 'svelte';
	import { toTwoDigits } from '../../ddtt/ddtt';
	export let ddate; // yyyymmdd - number: current selected day

	let taskText = '';
	const dispatch = createEventDispatcher();
	let startTimeh = 18;
	let startTimem = 0;
	let tDurationh = 0;
	let tDurationm = 30;

	function submit() {
		dispatch('message', {
			command: 'addTask',
			new: {
				text: taskText,
				tick: false,
				ddate: ddate,
				ttime: startTimeh * 10000 + startTimem * 100,
				tduration: tDurationh * 10000 + tDurationm * 100
			}
		});
		taskText = '';
	}

	function wheelStartTime(event) {
		event.preventDefault();
		startTimem -= Math.sign(event.deltaY) * 10;
		if (startTimem >= 60) {
			startTimem -= 60;
			startTimeh += 1;
			if (startTimeh > 22) {
				startTimeh = 22;
				startTimem = 50;
			}
		}
		if (startTimem < 0) {
			startTimem += 60;
			startTimeh -= 1;
			if (startTimeh < 11) {
				startTimeh = 11;
				startTimem = 0;
			}
		}
	}

	function wheelDuration(event) {
		event.preventDefault();
		tDurationm -= Math.sign(event.deltaY) * 10;
		if (tDurationm >= 60) {
			tDurationm -= 60;
			tDurationh += 1;
			if (tDurationh > 9) {
				tDurationh = 9;
				tDurationm = 50;
			}
		}
		if (tDurationm < 0) {
			tDurationm += 60;
			tDurationh -= 1;
			if (tDurationh < 0) {
				tDurationh = 0;
				tDurationm = 0;
			}
		}
	}
</script>

<div
	class="yysbp"
	style="
display: flex;
flex-direction: column;
gap:10px;
"
>
	<div
		class="yys-wbp-hbc yycc yynoselect title"
		style="
    background-color: #0D1C9D;
    color: white;
    "
	>
		<p>Add New Task</p>
	</div>
	<div
		class="yys-wbp-hbc yycc"
		style="
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap:10px;
    "
	>
		<div class="yys-wbp-hbc yycc shadowtext" style="font-size: 1.5rem;">Starting time:</div>
		<div
			class="yys-wbp-hbc yycc shadowtext"
			style="
        display: flex;
        flex-direction: row;
        font-size: 2rem;
        "
		>
			<div class="yynoselect" on:wheel={wheelStartTime}>{toTwoDigits(startTimeh)}</div>
			<div class="yynoselect" on:wheel={wheelStartTime}>:</div>
			<div class="yynoselect" on:wheel={wheelStartTime}>{toTwoDigits(startTimem)}</div>
		</div>

		<div class="yys-wbp-hbc yycc shadowtext" style="font-size: 1.5rem;">Duration:</div>
		<div
			class="yys-wbp-hbc yycc shadowtext"
			style="
        display: flex;
        flex-direction: row;
        font-size: 2rem;
        "
		>
			<div class="yynoselect" on:wheel={wheelDuration}>{toTwoDigits(tDurationh)}</div>
			<div class="yynoselect" on:wheel={wheelDuration}>:</div>
			<div class="yynoselect" on:wheel={wheelDuration}>{toTwoDigits(tDurationm)}</div>
		</div>
	</div>
	<div class="yys-wbp-hbc yycc shadowtext" style="display: flex; flex-direction: column; gap:10px;">
		<input class="shadow" style="width: 250px; height: 30px; font-size: 1.2rem;"
			bind:value={taskText}
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					submit();
				}
			}}
		/>
		<button class="shadow" style="width: 100px; height: 30px; font-size: 1.2rem;" on:click={submit}>Submit</button>
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
