<script>
	import SWeek from './top_panel/mid/week.svelte';
	import SNow from './top_panel/left/now.svelte';
	import STasks from './left_panel/tasks.svelte';
	import SNew from './right_panel/bottom/new.svelte';
	import SOngoing from './right_panel/top/ongoing.svelte';
	import SProfile from './top_panel/right/profile.svelte';
	import { db } from './firebase';
	import { ddGetWeekStart, ddToday } from '../ddtt/ddate';
	export let user;

	let tasks = [];
	let selectedDateDay = ddToday();
	let selectedWeekFirstDateDay = ddGetWeekStart(selectedDateDay);
	let selectedTaskId = false;
	let ongoingTaskId=false;
	
	
	db.collection(user.uid).onSnapshot((data) => {
		tasks = data.docs.map((x) => x.data());
	});

	function handleMessage(event) {
		console.log(event.detail);
		if (event.detail.command === 'addTask') {
			db.collection(user.uid)
				.add(event.detail.task)
				.then((result) => {
					db.collection(user.uid).doc(result.id).update({ id: result.id });
				});
			return;
		}
		if (event.detail.command === 'deleteTask') {
			db.collection(user.uid).doc(event.detail.id).delete();
			return;
		}
		if (event.detail.command === 'updateTask') {
			db.collection(user.uid).doc(event.detail.task.id).update(event.detail.task);
			return;
		}
		if (event.detail.command === 'selectTask') {
			selectedTaskId=event.detail.id;
			return;
		}
		if (event.detail.command === 'setOngoingTask') {
			if(event.detail.ongoing){
				ongoingTaskId=event.detail.id;
			}else{
				ongoingTaskId=false;
			}
			return;
		}
		if (event.detail.command === 'selectDay') {
			selectedDateDay = event.detail.ddate;
			selectedWeekFirstDateDay = ddGetWeekStart(selectedDateDay);
			return;
		}
		if (event.detail.command === 'selectWeekStartDay') {
			selectedWeekFirstDateDay = event.detail.ddate;
			return;
		}
		if (event.detail.command === 'selectToday') {
			selectedDateDay = ddToday();
			selectedWeekFirstDateDay = ddGetWeekStart(selectedDateDay);
			return;
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
			<div class="yysbp ll4">
				<div class="yysbp gg-c-1">
					<SOngoing {tasks} {selectedTaskId} {ongoingTaskId} on:message={handleMessage} />
				</div>
				<div class="yysbp gg-c-1">
					<SNew ddate={selectedDateDay} on:message={handleMessage} />
				</div>
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
	.ll4 {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		gap: 10px;
	}
</style>
