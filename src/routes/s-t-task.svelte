<script>
    // import { library } from '@fortawesome/fontawesome-svg-core';
    import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon} from 'fontawesome-svelte';

    // library.add(faSmileWink);


    export let task;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    function del(){
        dispatch('message',{command:"removeTask",id:task.id});
    }
</script>

<div class="yys-wbp-hbc yycc shadow colortaskfuture task" style="
display: flex;
flex-direction: row;
justify-content: space-between;
gap: 10px;
padding-right: 15px;
">
    <div class="yysbc yycc time shadowtext">
        <p style="width: max-content; padding: 5px;">
            {task.timestring?task.timestring:"00:00"}
        </p>
    </div>
    <div class="yysg title">
        <p class="yysbс" style="padding: 5px;">
            {task.text}
        </p>
    </div>
    <div class="yysf yycc yynoselect shadowtext" on:click={del}>
        <FontAwesomeIcon size="l" icon={faTrashCan} />
    </div>
</div>

<style>
    .time{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
    }
    .title{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
    }
    .task{
        height: 37px;
        border-radius: 20px;
        padding: 10px;
    }
</style>