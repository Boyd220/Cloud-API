<?php
  require_once('api/config.php');
try{
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
}
catch (Exception $e) {
    $error = $e->getMessage();
  }
  echo '<h1>Successfully bought premium</h1>';
?>