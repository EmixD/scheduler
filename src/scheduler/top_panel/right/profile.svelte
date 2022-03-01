<script>
    export let user;
    let displayName=user.displayName;
    let photoURL=user.photoURL;
    let uid=user.uid;
</script>

<div class="yysbp yycc" style="
display: flex;
flex-direction: column;
justify-content: space-evenly;
">
    <div class="yysbc yycc shadow">
        <img src={ photoURL } height="60" alt="user avatar">
    </div>
    <!-- <p>Your userID is { uid }</p> -->
    <div class="yysbc yycc shadowtext">
        <p>{displayName}</p>
    </div>
</div>