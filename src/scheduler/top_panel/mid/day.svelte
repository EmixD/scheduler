<script>
    export let ddate;
    export let selected;
	import { createEventDispatcher } from 'svelte';
    import { ddGetMonthNameStringShort, ddGetDayString , ddGetWeekDayStringShort } from '../../../ddtt/ddate'
    

	const dispatch = createEventDispatcher();
    function select(){
        dispatch('message',{command:"selectDay",ddate:ddate});
    }

</script>

<div class={"yysf yycc colorgreen"+(selected?" shadowborder":" shadow")} style="
width: 42px;
height:57px;
border-radius: 16px;
display:flex;
flex-direction: column;
overflow: hidden;
padding: 0;
"
on:click={select}>
    <p class="yysbc yynoselect rob12" style="margin: 0;">{ddGetWeekDayStringShort(ddate)}</p>    
    <p class="yysbc yynoselect rob14" style="margin: 0;">{ddGetDayString(ddate)}</p>
    <p class="yysbc yynoselect rob12" style="margin: 0;">{ddGetMonthNameStringShort(ddate)}</p>
</div>

<style>
    .rob12{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
    }
    .rob14{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
    }
</style>