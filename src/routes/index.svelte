<script>
    import Scheduler from "./scheduler.svelte";
</script>
<Scheduler/>

<style>
    /* 
    https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#where-should-i-put-my-global-styles
    KEY PRINCIPLES:
    1. Every div should have a yys* class,
    or yysc* class in its parent.
    2. Any text should be in p or h* tags.
    */

    /* CONFIG CLASSES */
    /* html, body = 100%screen */
    :global(html){
        height: 100vh;
        margin: 0;
        padding: 0; 
        font-size: 15px;
    }
    :global(body){
        height: 100vh;
        margin: 0;
        padding: 0;
    }
    :global(div){
        display: flow-root;
    }
    :global(p){
        margin: 0;
        line-height: 1rem;
    }
    :global(*){ 
        -moz-box-sizing: border-box; 
        -webkit-box-sizing: border-box; 
        box-sizing: border-box; 
    }

    /* LAYOUT CLASSES */

    :global(.yysf){  /* Size the element is fixed */
        overflow: auto;
        flex-grow: 0;
        flex-shrink: 0;
    }

    :global(.yysbc){ /* Size the element by content */
        width: fit-content;
        height: fit-content;
    }

    :global(.yysbp){ /* Size the element by parent */
        width: 100%;
        height: 100%;
    }

    :global(.yysg){ /* Allow grow. Only for flex. 
        The main direction size has to be specified explicitly*/
        overflow: auto;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: auto;
    }
    :global(.yycc){
        justify-items: center;
        align-items: center;
        justify-content: center;
    }
    :global(.yynoselect){
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style> 