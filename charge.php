<?php
  require_once('/api/config.php');
  const DEFAULT_URL = 'https://crackling-torch-6492.firebaseio.com/';
const DEFAULT_TOKEN = '8lX9W8YflYrS7k2ou3UFw5ZtotDRbX143cNffzFT';
const DEFAULT_PATH = '/premium';

try{
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  $token  = $_POST['stripeToken'];
  $email = "boydfranken@msn.com";

  $customer = \Stripe\Customer::create(array(
      'email' => $email,
      'source'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => 1000,
      'currency' => 'eur'
  ));
$dateTime = new DateTime();
  $firebase->set(DEFAULT_PATH . '/' . $dateTime->format('c'), $charge);
}

catch(Exception $e){
$error  = $e->getMessage();
echo "$error";
}

  echo '<h1>Successfully bought premium account</h1>';
?>