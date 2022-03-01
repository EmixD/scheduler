<script>
	import SWeek from './top_panel/mid/week.svelte';
	import SNow from './top_panel/left/now.svelte';
	import STasks from './left_panel/tasks.svelte';
	import SNew from './right_panel/new.svelte';
	import SProfile from './top_panel/right/profile.svelte';
	import { db } from './firebase';
	import { ddGetWeekStart, ddToday } from '../ddtt/ddate';
	export let user;

	let tasks = [];
	db.collection(user.uid).onSnapshot((data) => {
		tasks = data.docs.map((x) => x.data());
		tasks.sort((a, b) => a.ttime>b.ttime);
	});

	let selectedDateDay = ddToday();
	let selectedWeekFirstDateDay = ddGetWeekStart(selectedDateDay);

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
		}
	}
</script>

<div class="yysbp yycc">
	<div
		class="yysf colorscheduler2"
		style="
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows: auto 1fr;
    width: 800px;
    height: 600px;
    gap: 8px;
    padding:0;
    "
	>
		<div
			class="yys-wbp-hbc"
			style="
        display: grid;
        grid-template-columns:220px 1fr 220px;
        grid-template-rows: 136px;
        grid-template-areas: 
        'now week calendar';
        gap: 8px;
        "
		>
			<div
				class="yycc colorscheduler1"
				style="
            grid-area: now;
            "
			>
				<SNow on:message={handleMessage}/>
			</div>
			<div
				class="yycc colorscheduler1"
				style="
            grid-area: week;
            display:flex;
            "
			>
				<SWeek {selectedWeekFirstDateDay} {selectedDateDay} on:message={handleMessage} />
			</div>
			<div
				class="yycc colorscheduler1"
				style="
            grid-area: calendar;
            display:flex;
            "
			>
				<SProfile {user} />
			</div>
		</div>

		<!-- <div
			class="yys-wbp-hbc yycc colorscheduler1"
			style="
        display:grid;
        padding:5px;    
        "
		>
			<SNew dateDay={selectedDateDay} on:message={handleMessage} />
		</div> -->

		<div
			class="yysbp"
			style="
        width:100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        "
		>
			<div class="yysbp colorscheduler1">
				<STasks {tasks} {selectedDateDay} on:message={handleMessage} />
			</div>
			<div class="yysbp colorscheduler1" >
				<SNew ddate={selectedDateDay} on:message={handleMessage} />
			</div>
		</div>
	</div>
</div>
