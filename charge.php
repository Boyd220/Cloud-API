<?php
  require_once('api/config.php');

  $token  = $_POST['stripeToken'];

  $customer = \Stripe\Customer::create(array(
      'email' => 'boydfranken@.msn.com',
      'card'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => 1000,
      'currency' => 'usd'
  ));

  echo '<h1>Successfully bought premium</h1>';
  echo "<button href="#Map">Return to website</button>";
?>