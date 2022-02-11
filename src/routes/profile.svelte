<script>
    export let user;
    let displayName=user.displayName;
    let photoURL=user.photoURL;
    let uid=user.uid;
</script>

<div class="yysbp">
    <div class="yys-wbp-hbc yycc">
        <img src={ photoURL } height="50" alt="user avatar" style="
        border-radius: 50%;
        ">
    </div>
    <!-- <p>Your userID is { uid }</p> -->
    <p>Hi { displayName }!</p>
</div>