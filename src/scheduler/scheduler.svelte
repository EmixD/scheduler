<script>
	import SWeek from './top_panel/mid/week.svelte';
	import SNow from './top_panel/left/now.svelte';
	import STasks from './left_panel/tasks.svelte';
	import SNew from './right_panel/new.svelte';
	import SNone from './right_panel/none.svelte';
	import SProfile from './top_panel/right/profile.svelte';
	import { db } from './firebase';
	import { ddGetWeekStart, ddToday } from '../ddtt/ddate';
	export let user;

	let tasks = [];
	db.collection(user.uid).onSnapshot((data) => {
		tasks = data.docs.map((x) => x.data());
		// tasks.sort((a, b) => a.ttime > b.ttime); !Remember that sort sorts in-place!
	});

	let selectedDateDay = ddToday();
	let selectedWeekFirstDateDay = ddGetWeekStart(selectedDateDay);
	let rightPanelState = 'none';

	function handleMessage(event) {
		// console.log(event.detail);
		if (event.detail.command === 'addTask') {
			db.collection(user.uid)
				.add(event.detail.new)
				.then((result) => {
					db.collection(user.uid).doc(result.id).update({ id: result.id });
				});
		}
		if (event.detail.command === 'removeTask') {
			db.collection(user.uid).doc(event.detail.id).delete();
		}
		if (event.detail.command === 'tickTask') {
			db.collection(user.uid).doc(event.detail.id).update({ tick: event.detail.tick });
		}
		if (event.detail.command === 'selectDay') {
			selectedDateDay = event.detail.ddate;
		}
		if (event.detail.command === 'selectWeekStartDay') {
			selectedWeekFirstDateDay = event.detail.ddate;
		}
		if (event.detail.command === 'setCurrentDay') {
			selectedDateDay = ddToday();
			selectedWeekFirstDateDay = ddGetWeekStart(selectedDateDay);
			rightPanelState = 'none';
		}
		if (event.detail.command === 'changeRightPanelState') {
			rightPanelState = event.detail.state;
		}
	}
</script>

<div class="yysbp yycc">
	<div class="yysbc gg-c-2 ll1">
		<div class="yys-wbp-hbc ll2">
			<div class="yysbp yycc gg-c-1">
				<SNow on:message={handleMessage} />
			</div>
			<div class="yysbp yycc gg-c-1">
				<SWeek {selectedWeekFirstDateDay} {selectedDateDay} on:message={handleMessage} />
			</div>
			<div class="yysbp yycc gg-c-1">
				<SProfile {user} />
			</div>
		</div>
		<div class="yysbp ll3">
			<div class="yysbp gg-c-1">
				<STasks {tasks} {selectedDateDay} on:message={handleMessage} />
			</div>
			<div class="yysbp gg-c-1">
				{#if rightPanelState === 'none'}
					<SNone />
				{/if}
				{#if rightPanelState === 'newTask'}
					<SNew ddate={selectedDateDay} on:message={handleMessage} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.ll1 {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		width: 800px;
		height: 600px;
		gap: 8px;
	}
	.ll2 {
		display: grid;
		grid-template-columns: 220px 1fr 220px;
		grid-template-rows: 136px;
		gap: 8px;
	}
	.ll3 {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}
</style>
