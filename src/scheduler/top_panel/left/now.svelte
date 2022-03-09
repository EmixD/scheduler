<script>
	import { onMount } from 'svelte';
	import {
		ddFromDateObj,
		ddGetMonthNameString,
		ddGetDayString,
		ddGetWeekDayString
	} from '../../../ddtt/ddate';
	import {
		ttFromDateObj,
		ttGetHoursString,
		ttGetMinutesString,
		ttGetSeconds
	} from '../../../ddtt/ttime';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let dateObj = new Date();

	$: ddate = ddFromDateObj(dateObj);
	$: ttime = ttFromDateObj(dateObj);

	onMount(() => {
		const interval = setInterval(() => {
			dateObj = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="yysbp yycc yynoselect ll1" on:click={() => dispatch('message', { command: 'selectToday' })}>
	<div class="yys-wbp-hbc yycc">
		<p class="yysbc ggshadowtext ll2">{ddGetWeekDayString(ddate)}</p>
	</div>

	<div class="yys-wbp-hbc yycc ">
		<p class="yysbc ggshadowtext ll3">{ttGetHoursString(ttime)}</p>
		<p class="yysbc ggshadowtext ll3" style="width: 0.5ch;">
			{ttGetSeconds(ttime) % 2 === 0 ? `:` : ` `}
		</p>
		<p class="yysbc ggshadowtext ll3">{ttGetMinutesString(ttime)}</p>
	</div>

	<div class="yys-wbp-hbc yycc">
		<p class="yysbc ggshadowtext ll4">
			{ddGetDayString(ddate) + ' ' + ddGetMonthNameString(ddate)}
		</p>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
	}
	.ll2 {
		font-size: 1.5rem;
	}
	.ll3 {
		font-size: 3rem;
		line-height: 3rem;
	}
	.ll4 {
		font-size: 1.5rem;
	}
</style>
