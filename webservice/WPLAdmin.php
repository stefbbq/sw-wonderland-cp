<?php
require_once 'autoload.inc.php';


ini_set('xdebug.var_display_max_depth', 5);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);

use wpl\wplPortal\AdminManager;
use sdg\data\Result;

$manager = new AdminManager();

$action = isset($_GET['action']) ? htmlspecialchars($_GET['action']) : false;

$result = new Result();


switch ($action) {
    case 'addClient':
        $result = $manager->saveClient(
                getValue('name'), 
                getValue('address'), 
                getValue('city'), 
                getValue('province'), 
                getValue('postal_code'), 
                getValue('email'), 
                getValue('phone'), 
                getValue('phone2'), 
                getValue('wplEmail')
                );
        break;
    case 'updateClient':
        $result = $manager->saveClient(
                getValue('name'), 
                getValue('address'), 
                getValue('city'), 
                getValue('province'), 
                getValue('postal_code'), 
                getValue('email'), 
                getValue('phone'), 
                getValue('phone2'), 
                getValue('wplEmail'),
                getValue('guid')
                );
        break;
    case 'deactivateClient':
      $result = $manager->deactivateClient(getValue('guid'));
      break;
    case 'reactivateClient':
      $result = $manager->reactivateClient(getValue('guid'));
      break;
    case 'clientList':
      $result = $manager->getClientList(getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'clientSearch':
      $result = $manager->searchClients(getValue('q'), getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'clientDetail':
      $result = $manager->getClientDetail(getValue('q'));
      break;
    case 'addClientUser':
      $result = $manager->saveClientUser(
              getValue('first_name'), 
              getValue('last_name'), 
              getValue('email'), 
              getValue('confirm_email'), 
              getValue('phone'), 
              getValue('phone2'),
              getValue('company_id')
              );
      break;
    case 'updateClientUser':
      $result = $manager->saveClientUser(
              getValue('first_name'), 
              getValue('last_name'), 
              getValue('email'), 
              getValue('confirmation_email'), 
              getValue('phone'), 
              getValue('phone2'),
              null,
              getValue('guid')
              );
      break;
    case 'clientUserList':
       $result = $manager->getClientUserList(
          getValue('id'),
          getValue('a')
        );
      break;
    case 'clientUserDetail':
      $result = $manager->loadClientUserDetails(
        getValue('id')
      );
      break;
    case 'deactivateClientUser':
      $result = $manager->deactivateClientUser(getValue('guid'));
      break;
    case 'reactivateClientUser':
      $result = $manager->reactivateClientUser(getValue('guid'));
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
