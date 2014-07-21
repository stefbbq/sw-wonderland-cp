<?php
require_once 'autoload.inc.php';

use wpl\wplPortal\AdminManager;
use sdg\data\Result;

$manager = new AdminManager();

$action = isset($_GET['action']) ? htmlspecialchars($_GET['action']) : false;

$result = new Result();


switch ($action) {
    case 'add':
        $result = $manager->saveClient(
                getValue('name'), 
                getValue('address'), 
                getValue('city'), 
                getValue('province'), 
                getValue('postalCode'), 
                getValue('email'), 
                getValue('phone1'), 
                getValue('phone2'), 
                getValue('repEmail')
                );
        break;
    case 'update':
        $result = $manager->saveClient(
                getValue('name'), 
                getValue('address'), 
                getValue('city'), 
                getValue('province'), 
                getValue('postalCode'), 
                getValue('email'), 
                getValue('phone1'), 
                getValue('phone2'), 
                getValue('repEmail'),
                getValue('id')
                );
        break;
    case 'clientList':
        $result = $manager->getClientList(getValue('s'), getValue('c'));
        break;
    case 'clientCount':
        $result = $manager->getClientRecordCount();
        break;
      
    default : 
        $result->success = false;
        $result->message = 'no action';
        break;
}

function getValue($name) {
  if (isset($_GET[$name])) {
    return htmlspecialchars($_GET[$name]);
  } else {
    return null;
  }
}

/*
 * Return JSON
 */
if (isSet($_GET['callback'])) {
    $callback = htmlspecialchars($_GET['callback']);
    header('Content-Type: application/json');
    echo ($callback . '(' . json_encode($result) . ');');
} else {
    var_dump($result);
}
