<script>
	export let user;
	let displayName = user.displayName;
	let photoURL = user.photoURL;
</script>

<div class="yysbp yycc ll1">
	<div class="yysbc yycc shadow">
		<img src={photoURL} height="60" alt="user avatar" />
	</div>
	<div class="yysbc yycc shadowtext">
		<p>{displayName}</p>
	</div>
</div>

<style>
	.ll1 {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
</style>
