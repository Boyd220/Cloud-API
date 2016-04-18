<?php require_once('api/config.php'); ?>

<form style="text-align: center; margin-top: 10em" action="charge.php" method="post">
  <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
          data-key="<?php echo $stripe['publishable_key']; ?>"
          data-description="Premium account"
          data-amount="1000"
          data-locale="auto"
    	  data-image="https://38.media.tumblr.com/avatar_0ff21e4cd782_128.png"></script>
</form>

