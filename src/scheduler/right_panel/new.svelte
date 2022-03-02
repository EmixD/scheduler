<script>
	import { createEventDispatcher } from 'svelte';
	import { toTwoDigits } from '../../ddtt/ddtt';
	import { v4 as uuidv4 } from 'uuid';
	import { ttFromDateObj } from '../../ddtt/ttime';
	export let ddate; // yyyymmdd - number: current selected day

	let taskText = '';
	const dispatch = createEventDispatcher();
	let startTimeh = 18;
	let startTimem = 0;
	let tDurationh = 0;
	let tDurationm = 10;
	let showStartClock = false;

	function submit() {
		dispatch('message', {
			command: 'addTask',
			new: {
				text: taskText,
				tick: false,
				ddate: ddate,
				ttime: showStartClock?(startTimeh * 10000 + startTimem * 100):0,
				tduration: tDurationh * 10000 + tDurationm * 100,
				originalId: uuidv4(),
				createdAt: ttFromDateObj(new Date())
			}
		});
		taskText = '';
	}

	function wheelStartTime(event) {
		event.preventDefault();
		startTimem += Math.sign(event.deltaY) * 10;
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
		tDurationm += Math.sign(event.deltaY) * 10;
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

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>Add New Task</p>
	</div>
	<div class="yys-wbp-hbc yycc ll3">
		<div class="yys-wbp-hbc yycc shadowtext ll4" style="">Starting time:</div>
		<div class="yys-wbp-hbc yycc shadowtext ll5">
			{#if showStartClock}
				<div class="yynoselect" on:wheel={wheelStartTime}>{toTwoDigits(startTimeh)}</div>
				<div class="yynoselect" on:wheel={wheelStartTime}>:</div>
				<div class="yynoselect" on:wheel={wheelStartTime}>{toTwoDigits(startTimem)}</div>
			{:else}
				<div class="yynoselect yysbc" style="font-size: 1.3rem;" on:click={()=>{showStartClock=true}}>
					ADD START TIME
				</div>
			{/if}
		</div>

		<div class="yys-wbp-hbc yycc shadowtext ll4">Duration:</div>
		<div class="yys-wbp-hbc yycc shadowtext ll5">
			<div class="yynoselect" on:wheel={wheelDuration}>{toTwoDigits(tDurationh)}</div>
			<div class="yynoselect" on:wheel={wheelDuration}>:</div>
			<div class="yynoselect" on:wheel={wheelDuration}>{toTwoDigits(tDurationm)}</div>
		</div>
	</div>
	<div class="yys-wbp-hbc yycc shadowtext ll6">
		<input
			class="shadow ll7"
			bind:value={taskText}
			maxlength="50"
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					submit();
				}
			}}
		/>
		<button class="shadow ll8" on:click={submit}>Submit</button>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
		gap: 10px;
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		gap: 10px;
	}
	.ll4 {
		font-size: 1.5rem;
	}
	.ll5 {
		display: flex;
		flex-direction: row;
		font-size: 2rem;
	}
	.ll6 {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}
	.ll7 {
		/* width: 250px; */
		width: 100%;
		height: 30px;
		font-size: 1.2rem;
	}
	.ll8 {
		width: 100px;
		height: 30px;
		font-size: 1.2rem;
	}
</style>
