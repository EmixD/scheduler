<script>
	import { createEventDispatcher } from 'svelte';
	import { toTwoDigits } from '../../ddtt/ddtt';
	import { v4 as uuidv4 } from 'uuid';
	import {
		ttFromDateObj,
		ttGetHours,
		ttGetMinutes,
		ttGetDurationStringLonger
	} from '../../ddtt/ttime';
	export let ddate; // yyyymmdd - number: current selected day

	let taskText = '';
	const dispatch = createEventDispatcher();
	let startTimeh = ttGetHours(ttFromDateObj(new Date()));
	let startTimem = 10 * Math.ceil(ttGetMinutes(ttFromDateObj(new Date())) / 10);
	let tDurationh = 0;
	let tDurationm = 10;
	let showStartClock = false;

	function submit() {
		if(taskText.length===0){
			return;
		}
		dispatch('message', {
			command: 'addTask',
			new: {
				text: taskText,
				tick: false,
				ddate: ddate,
				ttime: showStartClock ? startTimeh * 10000 + startTimem * 100 : 0,
				tduration: tDurationh * 10000 + tDurationm * 100,
				originalId: uuidv4(),
				createdAt: ttFromDateObj(new Date())
			}
		});
		taskText = '';
	}

	function wheelStartTimeh(event) {
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

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>Add New Task</p>
	</div>
	<div class="yys-wbp-hbc ll25">
		<div class="yys-wbp-hbc yycc ggshadow gg-c-task1 ll26">
			<div class="yys-wbp-hbc yycc ll3">
				<div
					class="yysbc yycc ggshadowtext ll5"
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

				<div class="yysbc yycc ggshadowtext ll5">
					<div class="yynoselect" on:wheel={wheelDuration}>
						{ttGetDurationStringLonger(tDurationh * 10000 + tDurationm * 100)}
					</div>
				</div>
			</div>
			<div class="yys-wbp-hbc yycc ggshadowtext ll6">
				<input
					class="ggshadow ll7"
					bind:value={taskText}
					maxlength="50"
					on:keypress={(e) => {
						if (e.key === 'Enter') {
							submit();
						}
					}}
				/>
				<button class="ggshadow ll8" on:click={submit}>Submit</button>
			</div>
		</div>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
	}
	.ll2 {
		background-color: #0d1c9d;
		color: white;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
	}
	.ll25 {
		padding: 10px;
	}
	.ll26{
		padding: 10px;
		gap:10px;
		display: flex;
		flex-direction: column;
	}
	.ll3 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		gap: 10px;
		justify-items: center;
	}
	.ll5 {
		display: flex;
		flex-direction: row;
		font-size: 2rem;
		/* background-color: rgba(0, 0, 0, 0.1); */
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
