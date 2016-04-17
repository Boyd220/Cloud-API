<?php
require_once('vendor/autoload.php');

$stripe = array(
  "secret_key"      => "sk_test_AmnYHSXMinS5LHpJZL9rjzwP",
  "publishable_key" => "pk_test_rKB3GeWQMvNmnuUzPXKRoqtd"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>