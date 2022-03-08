<script>
	export let task;
	import { ttGetDurationString, ttSlotToTtime, ttGetTimeString } from '../../../ddtt/ttime';
	import { ddGetFullRelativeDateShort, ddToday } from '../../../ddtt/ddate';
	import { ttimeToNslots } from '../../logic/logic';
</script>

<div class="yysbp ggshadow ll1 {task.tick ? 'gg-c-task2' : 'gg-c-task1'}">
	<div class="yysbp ggshadowtext yynoselect ll3">
		<nobr class="yysbp">
			{#if task.ttime !== 0}
				<nobr>
					{ttGetTimeString(task.ttime)}
					&ndash;
					{ttGetTimeString(task.ttime + task.tduration)}, ({ttGetDurationString(task.tduration)})
				</nobr>
			{:else}
				<nobr>
					{ttGetTimeString(ttSlotToTtime(task.slot))}
					&ndash;
					{ttGetTimeString(ttSlotToTtime(task.slot + ttimeToNslots(task.tduration)))}
				</nobr>
				<nobr>
					({ttGetDurationString(task.tduration)})
				</nobr>
			{/if}
		</nobr>
		<nobr>
			{ddGetFullRelativeDateShort(ddToday(), task.ddate)}
		</nobr>
	</div>

	<div class="yysbp yycc ll5 ggshadowtext yynoselect">
		<p class="yysbc">
			<nobr class="yysbc">{task.text}</nobr>
		</p>
	</div>
	{#if task.onGoing}
		<div>(ongoing)</div>
	{/if}
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
		padding: 10px;
		gap: 10px;
		/* border-radius: 20px; */
	}

	.ll3 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		color: #007;
	}
	.ll5 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		overflow-x: hidden;
	}
</style>
