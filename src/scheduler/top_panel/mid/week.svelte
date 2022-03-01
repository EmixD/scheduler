<script>
	import SWDay from './day.svelte';
	import { createEventDispatcher } from 'svelte';
	import { ddValidateMath } from '../../../ddtt/ddate';
	import Fa from 'svelte-fa';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
	import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
	export let selectedWeekFirstDateDay;
	export let selectedDateDay;

	const dispatch = createEventDispatcher();
	function handleMessage(event) {
		if (event.detail.command === 'selectDay') {
			dispatch('message', event.detail);
		}
	}
</script>

<div
	class="yysbp yycc"
	style="
display: flex;
flex-direction: column;
"
>
	<div
		class="yys-wbp-hbc yycc"
		style="
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    "
	>
		{#each Array(7) as _, i}
			<SWDay
				ddate={ddValidateMath(selectedWeekFirstDateDay + i)}
				selected={selectedDateDay === ddValidateMath(i + selectedWeekFirstDateDay)}
				on:message={handleMessage}
			/>
		{/each}
	</div>
	<div
		class="yys-wbp-hbc yycc"
		style="
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    "
	>
		<div
			class="yysf yynoselect yycc colorbutton btnshape shadow"
			on:click={() =>
				dispatch('message', {
					command: 'selectWeekStartDay',
					ddate: ddValidateMath(selectedWeekFirstDateDay - 7)
				})}
		>
			<Fa color="#228" size="1.5x" icon={faArrowLeft} />
		</div>
		<div class="yysf yynoselect yycc colorbutton btnshape shadow">
			<Fa color="#228" size="1.5x" icon={faCalendarDays} />
		</div>
		<div
			class="yysf yynoselect yycc colorbutton btnshape shadow"
			on:click={() =>
				dispatch('message', {
					command: 'selectWeekStartDay',
					ddate: ddValidateMath(selectedWeekFirstDateDay + 7)
				})}
		>
			<Fa color="#228" size="1.5x" icon={faArrowRight} />
		</div>
	</div>
</div>

<style>
	.btnshape {
		height: 34px;
		width: 87px;
		border-radius: 47px;
	}
</style>
