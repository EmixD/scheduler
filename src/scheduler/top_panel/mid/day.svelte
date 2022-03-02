<script>
	export let ddate;
	export let selected;
	import { createEventDispatcher } from 'svelte';
	import {
		ddGetMonthNameStringShort,
		ddGetDayString,
		ddGetWeekDayStringShort
	} from '../../../ddtt/ddate';

	const dispatch = createEventDispatcher();
	function select() {
		dispatch('message', { command: 'selectDay', ddate: ddate });
	}
</script>

<div
	class={'yysbc yycc gg-c-day1 ll1' + (selected ? ' ggshadowborder' : ' ggshadow')}
	on:click={select}
>
	<p class="yysbc yynoselect ll2">{ddGetWeekDayStringShort(ddate)}</p>
	<p class="yysbc yynoselect ll3">{ddGetDayString(ddate)}</p>
	<p class="yysbc yynoselect ll2">{ddGetMonthNameStringShort(ddate)}</p>
</div>

<style>
	.ll1 {
		width: 42px;
		height: 57px;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.ll2 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
	}
	.ll3 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
	}
</style>
