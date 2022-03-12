<script>
	import { createEventDispatcher } from 'svelte';
	import { toTwoDigits } from '../../../ddtt/ddtt';
	import { v4 as uuidv4 } from 'uuid';
	import { ttGetHours, ttGetMinutes, ttGetDurationStringLonger, ttNow } from '../../../ddtt/ttime';
	export let ddate;

	let taskText = '';
	const dispatch = createEventDispatcher();
	let startTimeh = ttGetHours(ttNow());
	let startTimem = 10 * Math.ceil(ttGetMinutes(ttNow()) / 10);
	let tDurationh = 0;
	let tDurationm = 20;
	let showStartClock = false;

	function onKeyInput(e) {
		if (e.key === 'Enter') {
			submit();
		}
	}

	function submit() {
		if (taskText.length === 0) {
			return;
		}
		dispatch('message', {
			command: 'addTask',
			task: {
				text: taskText,
				completed: false,
				ddate: ddate,
				ttime: showStartClock ? startTimeh * 10000 + startTimem * 100 : 0,
				tdur: tDurationh * 10000 + tDurationm * 100,
				id0: uuidv4(),
				id: '',
				createdAt: ttNow()
			}
		});
		taskText = '';
	}

	function wheelStartTimeh(event) {
		if (!showStartClock) {
			return;
		}
		event.preventDefault();
		startTimeh -= Math.sign(event.deltaY);
		if (startTimeh < 11) {
			startTimeh = 11;
		}
		if (startTimeh > 22) {
			startTimeh = 22;
		}
	}

	function wheelStartTimem(event) {
		if (!showStartClock) {
			return;
		}
		event.preventDefault();
		startTimem -= Math.sign(event.deltaY) * 10;
		if (startTimem < 0) {
			startTimem = 0;
		}
		if (startTimem > 50) {
			startTimem = 50;
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
		}
		if (tDurationh === 0 && tDurationm < 10) {
			tDurationm = 10;
		}
	}
</script>

<div class="yys-wbp-hbc llcont">
	<div class="yys-wbp-hbc yycc yynoselect lltitle">
		<p>Add New Task</p>
	</div>
	<div class="yys-wbp-hbc yycc llinnercont">
		<input class="ggshadow llinput" bind:value={taskText} maxlength="50" on:keypress={onKeyInput} />
		<div class="yys-wbp-hbc yycc ll5">
			<div
				class="yysbc yycc ggshadowtext ll6"
				on:click={() => {
					showStartClock = !showStartClock;
				}}
			>
				<div class="yynoselect" on:wheel={wheelStartTimeh}>
					{showStartClock ? toTwoDigits(startTimeh) : '--'}
				</div>
				<div class="yynoselect" on:wheel={wheelStartTimeh}>:</div>
				<div class="yynoselect" on:wheel={wheelStartTimem}>
					{showStartClock ? toTwoDigits(startTimem) : '--'}
				</div>
			</div>
			<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow" on:click={submit}>Submit</div>
			<div class="yynoselect ll6" on:wheel={wheelDuration}>
				{ttGetDurationStringLonger(tDurationh * 10000 + tDurationm * 100)}
			</div>
		</div>
	</div>
</div>

<style>
	.llcont {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
	}
	.lltitle {
		background-color: #0d1c9d;
		color: white;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
	}
	.llinnercont {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		padding: 10px;
		padding-top: 15px;
		gap: 10px;
	}
	.llinput {
		background-color: #e0e2f7;
		border: solid;
		border-color: #aaf;
		border-width: 1px;
		padding: 3px;
		font-size: 18px;
	}
	.llinput:focus {
		outline: none;
	}
	.ll5 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		justify-items: center;
		align-items: end;
	}
	.ll6 {
		font-size: 1.8rem;
	}
	.llbtn {
		height: 40px;
		width: 100px;
		color: #228;
		font-size: 1.2rem;
		font-weight: bold;
	}
</style>
