<script>
var ref = new Firebase("https://crackling-torch-6492.firebaseio.com/");

$('#id').on('click', function(){
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    alert("Aangemeld met " authData.provider, authData.uid);	
  }
});
});
</script>
<h2>Welkom op de feest app</h2>
<button id="id">Login fb</button>
<div class="jumbotron">
<div class="col-md-4">

        <p> Maak een account aan en zoek feestjes. Of maak feestjes als je een organisator bent! </p>
</div>
</div>
