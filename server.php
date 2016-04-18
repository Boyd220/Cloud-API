<?php
use Firebase\Firebase;

$fb = Firebase::initialize("https://crackling-torch-6492.firebaseio.com", "#-KCpai6zQiYMKeehReEk|239ccd43abf0d427bd1fd03698f4da78");

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => "https://crackling-torch-6492.firebaseio.com", 'token' => "#-KCpai6zQiYMKeehReEk|239ccd43abf0d427bd1fd03698f4da78" ], new GuzzleHttp\Client());

//retrieve a node
$nodeGetContent = $fb->get('/node/path');

//set the content of a node
$nodeSetContent = $fb->set('/node/path', array('data' => 'toset'));

//update the content of a node
$nodeUpdateContent = $fb->update('/node/path', array('data' => 'toupdate'));

//delete a node
$nodeDeleteContent = $fb->delete('/node/path');

//push a new item to a node
$nodePushContent = $fb->push('/node/path', array('name' => 'item on list'));
?>