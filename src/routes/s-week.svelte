<script>
import SWDay from "./s-w-day.svelte";
let selectedDay=3;
function handleMessage(event){
    if(event.detail.command==="selectDay"){
        selectedDay=event.detail.new;
    }
}
</script>

<div class="yysbc yycc" style="
display: grid;
grid-template-columns:repeat(7,1fr);
grid-template-rows: 1fr 1fr;
gap:0.5rem;
padding:0.5rem;
">
{#each Array(14) as _, i}
    <SWDay mday={i+1} selected={i+1===selectedDay} on:message={handleMessage}/>
{/each}
</div>