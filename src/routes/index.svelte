<script>
    import '../yy.css';
    import '../global.css';
    import Scheduler from "../scheduler/scheduler.svelte";

    import { auth, googleProvider } from '../scheduler/firebase';
    import { authState } from 'rxfire/auth/dist/index.cjs.js';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

{#if user}
    <Scheduler user={user} />
{:else}
<div class="yysbp yycc">
    <button on:click={login} style="font-size: 2rem; padding: 1rem;">
		Sign in with Google
	</button>
</div>
{/if}
