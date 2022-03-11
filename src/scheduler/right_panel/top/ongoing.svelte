<script>
	import Fa from 'svelte-fa';
	import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
	import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
	import { faReply } from '@fortawesome/free-solid-svg-icons/faReply';
	import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
	import { ddToday, ddValidateMath } from '../../../ddtt/ddate';
	import { order, getSuggestedTask } from '../../logic/logic';
	import SOTask from './primaryTask.svelte';
	import SOTaskC from './secondaryTask.svelte';
	import { createEventDispatcher } from 'svelte';

	export let tasks;
	export let selectedTaskId;
	export let ongoingTaskId;
	const dispatch = createEventDispatcher();

	$: selectedTask = selectedTaskId ? tasks.find((t) => t.id === selectedTaskId) : false;
	$: ongoingTask = ongoingTaskId ? tasks.find((t) => t.id === ongoingTaskId) : false;
	$: todayTasks = tasks.filter((task) => task.ddate === ddToday());

	function getPrimaryTask(selectedTask, ongoingTask, todayTasks) {
		if (selectedTask) {
			return selectedTask;
		}
		if (ongoingTask) {
			return ongoingTask;
		}
		let notCompletedTasks = todayTasks.filter((task) => !task.completed);
		if (notCompletedTasks.length === 0) {
			return false;
		}
		let ordered = order(notCompletedTasks);
		return getSuggestedTask(ordered.tasks, ordered.tasksInfo);
	}

	function getSecondaryTask(ongoingTask, todayTasks, primaryTask) {
		if (!primaryTask) {
			return false;
		}
		if (ongoingTask && ongoingTask.id !== primaryTask.id) {
			return ongoingTask;
		}
		let notCompletedTasks = todayTasks.filter(
			(task) => !task.completed && task.id !== primaryTask.id
		);
		if (notCompletedTasks.length === 0) {
			return false;
		}
		let ordered = order(notCompletedTasks);
		return getSuggestedTask(ordered.tasks, ordered.tasksInfo);
	}

	$: primaryTask = getPrimaryTask(selectedTask, ongoingTask, todayTasks);
	$: secondaryTask = getSecondaryTask(ongoingTask, todayTasks, primaryTask);
</script>

<div class="yysbp ll1">
	<div class="yys-wbp-hbc yycc yynoselect ll2">
		<p>Suggested Task</p>
	</div>
	<div class="yysbp ll3">
		<div class="yysbp">
			{#if primaryTask}
				<SOTask task={primaryTask} ongoing={primaryTask.id === ongoingTaskId} on:message />
			{:else}
				<div style="height: 103px;" />
			{/if}
		</div>
		<div class="yys-wbp-hbc ll4">
			{#if primaryTask.ddate === ddToday() && !primaryTask.completed}
				<div
					class="yysbc yynoselect yycc gg-c-button llbtn ggshadow"
					on:click={() =>
						dispatch('message', {
							command: 'setOngoingTask',
							id: primaryTask.id,
							ongoing: primaryTask.id !== ongoingTaskId
						})}
				>
					<Fa size="1x" icon={faClock} />
				</div>
				<div
					class="yysbc yynoselect yycc gg-c-button llbtn ggshadow"
					on:click={() => {
						let t = primaryTask;
						dispatch('message', {
							command: 'setOngoingTask',
							id: primaryTask.id,
							ongoing: false
						});

						t.ddate = ddValidateMath(t.ddate + 1);

						dispatch('message', {
							command: 'updateTask',
							task: t
						});
						dispatch('message', { command: 'selectDay', ddate: t.ddate });
					}}
				>
					<Fa size="1x" icon={faReply} />
				</div>
			{:else}
				<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow">
					<Fa size="1x" icon={faClock} />
				</div>
				<div class="yysbc yynoselect yycc gg-c-button llbtn ggshadow">
					<Fa size="1x" icon={faReply} />
				</div>
			{/if}
			<div
				class="yysbc yynoselect yycc gg-c-button llbtn ggshadow"
				on:click={() => {
					let t = primaryTask;
					t.completed = !t.completed;
					dispatch('message', {
						command: 'setOngoingTask',
						id: primaryTask.id,
						ongoing: false
					});
					dispatch('message', { command: 'updateTask', task: t });
				}}
			>
				<Fa size="1x" icon={primaryTask.completed ? faXmark : faCheck} />
			</div>
			<div
				class="yysbc yynoselect yycc gg-c-button llbtn ggshadow"
				on:click={() => dispatch('message', { command: 'deleteTask', id: primaryTask.id })}
			>
				<Fa size="1x" icon={faTrashCan} />
			</div>
		</div>
		<div class="yys-wbp-hbc">
			{#if secondaryTask}
				<SOTaskC task={secondaryTask} ongoing={secondaryTask.id === ongoingTaskId} on:message />
			{:else}
				<div style="height: 36px;" />
			{/if}
		</div>
	</div>
</div>

<style>
	.ll1 {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
	}
	.ll2 {
		background-color: #0d1c9d;
		color: white;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
	}
	.ll3 {
		padding: 10px;
		gap: 10px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto auto;
	}
	.ll4 {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto auto;
		justify-items: center;
		padding-left: 10px;
		padding-right: 10px;
		gap: 10px;
	}
	.llbtn {
		height: 40px;
		width: 120px;
		color: #228;
		font-size: 1.2rem;
		font-weight: bold;
	}
</style>
