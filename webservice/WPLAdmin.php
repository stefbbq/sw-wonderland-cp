<?php
header('Access-Control-Allow-Origin: *');

require_once 'autoload.inc.php';


ini_set('xdebug.var_display_max_depth', 5);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);

use wpl\wplPortal\AdminManager;
use wpl\dropbox\DropboxUploader;
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
                getValue('ext'), 
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
                getValue('ext'), 
                getValue('phone2'), 
                getValue('wplEmail'),
                getValue('guid')
                );
        break;
    case 'deactivateClient':
      $result = $manager->setClientActive(getValue('guid'), '0');
      break;
    case 'reactivateClient':
      $result = $manager->setClientActive(getValue('guid'), '1');
      break;
    case 'clientList':
      $result = $manager->getClientList(getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'clientListAll':
      $result = $manager->getClientList(null, null, '1');
      break;
    case 'clientSearch':
      $result = $manager->searchClients(getValue('q'), getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'clientDetail':
      $result = $manager->getClientDetail(getValue('q'));
      break;
    
    /*
     * Client Users
     */
    
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
      $result = $manager->setClientUserActive(getValue('guid'), '0');
      break;
    case 'reactivateClientUser':
      $result = $manager->setClientUserActive(getValue('guid'), '1');
      break;
    
    /*
     * Admin Users
     */
    case 'addAdminUser':
	  $testValue = getValue('test');
	  $testMode = ($testValue == '1' || $testValue == 'true');
	
      $result = $manager->saveAdminUser(
              getValue('username'), 
              getValue('email'),
			  null,
			  $testMode
              );
      break;
     case 'updateAdminUser':
      $result = $manager->saveAdminUser(
              getValue('username'), 
              getValue('email'), 
              getValue('password'),
              getValue('guid')
              );
      break;
    case 'changeAdminPassword':
      $result = $manager->changeAdminPassword(
              getValue('id'),
              getValue('old_password'),
              getValue('password')
              );
      break;
    case 'adminUserList':
      $result = $manager->getAdminUserList(
              getValue('a')
              );
      break;
    case 'adminUserDetail':
      $result = $manager->getAdminUserDetail(
              getValue('id')
              );
      break;
    case 'deactivateAdminUser':
      $result = $manager->setAdminUserActive(getValue('guid'), '0');
      break;
    case 'reactivateAdminUser':
      $result = $manager->setAdminUserActive(getValue('guid'), '1');
      break;
    case 'adminLogin':
      $result = $manager->adminLogin(getValue('username'), getValue('password'));
      break;
      
    /*
     * Collateral
     */
    case 'addCollateral':
      $result = $manager->saveCollateral(
              getValue('client_id'),
              getValue('name'),
              getValue('type'),
              getValue('description')
              );
      break;
    case 'updateCollateral':
      $result = $manager->saveCollateral(
              getValue('client_id'),
              getValue('name'),
              getValue('type'),
              getValue('description'),
              getValue('id')
              );
      break;
    case 'collateralList':
      $result = $manager->getCollateralList(getValue('clientID'), getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'collateralSearch':
      $result = $manager->searchCollateral(getValue('clientID'), getValue('q'), getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'collateralListFull':
      $result = $manager->getCollateralListFull(getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'collateralSearchFull':
      $result = $manager->searchCollateralFull(getValue('q'), getValue('s'), getValue('c'), getValue('a'));
      break;
    case 'collateralDetail':
      $result = $manager->loadCollateralDetails(getValue('id'));
      break;
    case 'deactivateCollateral':
      $result = $manager->setCollateralActive(getValue('guid'), '0');
      break;
    case 'reactivateCollateral':
      $result = $manager->setCollateralActive(getValue('guid'), '1');
      break;
    
    case 'uploadThumb':
      $result = $manager->upload('thumb');
      break;
    case 'uploadFile':
      $result = $manager->upload('file');
      break;
    case 'saveToDropbox':
      $dropbox = new DropboxUploader();
      $result = $dropbox->saveToDropbox();
      break;
    case 'quoteRequest':
      $dropbox = new DropboxUploader();
      $result = $dropbox->submitQuoteRequest();
      break;
    case 'getDBURL':
      $dropbox = new DropboxUploader();
      $result = $dropbox->getAuthURL();
      break;
    case 'typeList':
      $result = $manager->getProductTypes();
      break;
    case 'ddContent':
      $result = $manager->getDropdownContent();
      break;
    case 'requestQuote':
      $dropbox = new DropboxUploader();
      $result = $dropbox->submitQuoteRequest();
      break;
    case 'emailTest':
      $result = $manager->emailTest(getValue('id'));
      break;	  
    case 'resetAdminPassword':
      $result = $manager->resetAdminPassword(getValue('email'));
      break;
    case 'changeAdminPassword':
      $result = $manager->changeAdminPassword(getValue('guid'), getValue('p0'), getValue('p1'));
      break;	  
    case 'resetClientPassword':
      $result = $manager->resetClientPassword(getValue('email'));
      break;	  
    case 'changeClientPassword':
      $result = $manager->changeClientPassword(getValue('guid'), getValue('p0'), getValue('p1'));
      break;	 
    case 'clientLogin':
      $result = $manager->clientLogin(getValue('email'), getValue('password'));
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
