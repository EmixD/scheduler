<script>
	import SWDay from './day.svelte';
	import { createEventDispatcher } from 'svelte';
	import { ddValidateMath } from '../../../ddtt/ddate';
	import Fa from 'svelte-fa';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
	import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
	// import { flip } from 'svelte/animate';
	import { fade , fly} from 'svelte/transition';
	export let selectedWeekFirstDateDay;
	export let selectedDateDay;

	$: days = [...Array(7).keys()].map((i) => ddValidateMath(selectedWeekFirstDateDay + i));

	const dispatch = createEventDispatcher();
	function handleMessage(event) {
		if (event.detail.command === 'selectDay') {
			dispatch('message', event.detail);
		}
	}
</script>

<div class="yysbp yycc ll1">
	<div class="yys-wbp-hbc yycc ll2">
		{#each days as day (day)}
			<div
				class="yysbc"
			>
				<SWDay ddate={day} selected={selectedDateDay === day} on:message={handleMessage} />
			</div>
		{/each}
	</div>
	<div class="yys-wbp-hbc yycc ll2">
		<div
			class="yysbc yynoselect yycc gg-c-button llbtn ggshadow"
			on:click={() =>
				dispatch('message', {
					command: 'selectWeekStartDay',
					ddate: ddValidateMath(selectedWeekFirstDateDay - 7)
				})}
		>
			<Fa color="#228" size="1.5x" icon={faArrowLeft} />
		</div>
		<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow">
			<Fa color="#228" size="1.5x" icon={faCalendarDays} />
		</div>
		<div
			class="yysbc yynoselect yycc gg-c-button llbtn ggshadow"
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
	.ll1 {
		display: flex;
		flex-direction: column;
	}
	.ll2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px;
	}
	.llbtn {
		height: 34px;
		width: 87px;
		/* border-radius: 47px; */
	}
</style>
