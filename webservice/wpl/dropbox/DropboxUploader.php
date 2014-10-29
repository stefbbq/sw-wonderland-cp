<?php
namespace wpl\dropbox;
require_once "Dropbox/autoload.php";

use sdg\data\Result;
use wpl\database\Database;
use wpl\wplPortal\AdminManager;
use Dropbox as dbx;

/**
 * Description of DropboxUploader
 *
 * @author Scott David Garson
 */
class DropboxUploader {
  private $appInfo;
  private $dbxClient;
  private $db;
  public function __construct() {
    $this->db = new Database();
    
    $appInfo = dbx\AppInfo::loadFromJsonFile("pp-info.json");
//    $webAuth = new dbx\WebAuthNoRedirect($appInfo, "PHP-Example/1.0");
    //var_dump(PHP_INT_MAX);
//    $authorizeUrl = $webAuth->start();
//    $this->dump($authorizeUrl);
    
  //  $authCode = 'Rtf-mLdIcxsAAAAAAAAEgLyo4Ea1XGUbD2_vK06eYE8';
//    $authToken = $webAuth->finish($authCode);

    // TODO: Update this value with the token sent from the client.
    $accessToken = 'Rtf-mLdIcxsAAAAAAAAE7cKMa3CK5K3LV04HFw5s-fLJc8d62scOyCzD21mFUD7E';

    $this->dbxClient = new dbx\Client($accessToken, "PHP-Example/1.0");
    /*
    $accountInfo = $this->dbxClient->getAccountInfo();
    $this->dump($accountInfo);
    */
    
  } 
  
  public function getAuthURL() {
    $appInfo = dbx\AppInfo::loadFromJsonFile("pp-info.json");
    $webAuth = new dbx\WebAuthNoRedirect($appInfo, "PHP-Example/1.0");
    $authorizeUrl = $webAuth->start();
    $result = new Result();
    $result->success = true;
    $result->code = 200;
    $result->message = "Dropbox Auth URL";
    $result->data = $authorizeUrl;
    
    return $result;
    //$this->dump($authorizeUrl);
  }
  
  public function authorizeDropbox($authCode) {
    $result = new Result();
    $appInfo = dbx\AppInfo::loadFromJsonFile("pp-info.json");
    $webAuth = new dbx\WebAuthNoRedirect($appInfo, "PHP-Example/1.0");
    //$authorizeUrl = $webAuth->start();
    
    list($accessToken, $dropboxUserId) = $webAuth->finish($authCode);
    $result->success = true;
    $result->code = 200;
    $result->message = "Dropbox Auth Token";
    $result->data = $accessToken;
    
    return $result;
  }
  
  public function saveToDropbox() {
    $result = new Result();
    $result->message = 'save to dropbox';
    
    $file = $_FILES['file'];
    $f = fopen($file['tmp_name'], "rb");
    $result = $this->dbxClient->uploadFile("/{$file['name']}", dbx\WriteMode::add(), $f);
    fclose($f);
    $this->dump($result);
    


    /*
    $dest = 'collateral/' . $id . '/';
    if (!file_exists($dest)) {
      mkdir($dest);
    }
    $dest .= $file['name'];
    
    move_uploaded_file($file['tmp_name'], $dest);
    */
    
    return $result;
  }

  public function submitQuoteRequest() {
    $result = new Result();
    
    // Filter out 'Options' request -- causing blank entry
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      $result->success = false;
      $result->message = 'options';
      return $result;
    }
    
    $userID       = $this->getPostValue('userID');
    $clientName   = $this->getPostValue('clientName');
    $clientEmail  = $this->getPostValue('clientName');
    
    
    $confirmEmail;
    $repEmail = 'sdgarson@gmail.com'; // TODO: hard-code to default user
    
    if ($userID != null) {
      // get the user data from the database
      $table    = 'clientUsers';
      $select   = array('clients.name, clients.wplEmail, clientUsers.confirmation_email, clientUsers.email, clientUsers.first_name, clientUsers.last_name');
      $orderBy  = null;
      $where    = array('clientUsers.guid' => $userID);
      $start    = null;
      $pageSize = null;
      $dump     = false;
      $join     = 'inner join clients on (clientUsers.client_id = clients.id)';
      $dbResult = $this->db->select($table, $select, $orderBy, $where, $start, $pageSize, $join, $dump);
      
      $clientName   = $dbResult[0]['first_name'] . ' ' . $dbResult[0]['last_name'] . ' (' . $dbResult[0]['name'] . ')';
      $clientEmail  = $dbResult[0]['email'];
      $confirmEmail = $dbResult[0]['confirmation_email'];
      $repEmail     = $dbResult[0]['wplEmail'];
      
    
    } else if ($clientName == null || $clientEmail == null) {
      $result->success = false;
      $result->code = 304;
      $result->message = 'Missing required information';
      return $result;
    }
    
    
    
    
    $fields = array(
      'type',
      'size',
      'quantity',
      'pageCount',
      'finish',
      'weight',
      'recycled',
      'colours',
      'sides',
      'specialFX',
      'binding',
      'description'
      );
      
    $tables = array(
      'collateralTypes',
      null,
      null,
      null,
      'dd_paperFinish',
      'dd_paperWeight',
      'dd_recycledOpts',
      'dd_inkColours',
      null,
      'dd_specialEffects',
      'dd_binding',
      null
    );
    
    $data = array();
    $data['clientName'] = $clientName;
    $data['clientEmail'] = $clientEmail;
    
    foreach ($fields as $fieldName) {
      $value = $this->getPostValue($fieldName);
      if ($value != null) {
        $data[$fieldName] = $value;
      }
    }
    
    $fileName;
    if (count($_FILES) > 0) {
      $fileName = $_FILES['file']['name'];
      $data['file'] = $fileName;
    }
    
    $dbResult = $this->db->add('quoteRequests', $data); // TODO: disable add for test
    if ($dbResult) {
      //$lastID = $this->db->getLastInsertID('id');

      $result->success = true;
      $result->message = "Quote request added.";
      $result->code = 200;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = "Error adding quote request.";
      return $result;
    }
    
    // do dropbox save
    if (count($_FILES) > 0) {
      $file = $_FILES['file'];
      $f = fopen($file['tmp_name'], "rb");
      $email = $clientEmail;
      
      $this->dbxClient->createFolder("/$email");
      $dbxResult = $this->dbxClient->uploadFile("/$email/{$file['name']}", dbx\WriteMode::add(), $f);

      
      fclose($f);
      
      //$this->dump($dbxResult);
    }
    
    
    // Get friendly names for quote
    $textData = array();
    
    if (!is_null($confirmEmail)) $textData['confirm email'] = $confirmEmail;
    
    for ($i=0; $i<count($fields); $i++) {
      $field = $fields[$i];
      $table = $tables[$i];
      if (is_null($table)) {
        $textData[$field] = $data[$field];
      } else {
        $select = array('name');
        $where = array('id' => $data[$field]);
        $dbResult = $this->db->select($table, $select, null, $where);
        
        $textData[$field] = $dbResult[0]['name'];
      }
      
    }
    
    if (!is_null($fileName)) {
      $textData['file'] = $fileName;
    }
    
    
    // Send Email
    $to = $repEmail;
    $subject = "Quote Request Submitted from $clientName";
    
    $css_th = "text-align:left;";
    $css_tr1 = "";    
    $css_tr2 = "background-color:#CCCCCC";    
    
    $body = '<h2>Quote Request Submitted</h2>';
    $body .= '<p>A quote request has been submitted.</p>';
    if (!is_null($fileName)) {
      $body .= '<p>A file has been uploaded to your dropbox account.</p>';
    }

    $body.= "<table style=\"border:2px solid black; width:100%;\">";
    
    $body.= "<tr style=\"$css_tr1\"><th style=\"width:33%; $css_th\">Client Name: </th><td>{$clientName}</td></tr>";
    $body.= "<tr style=\"$css_tr2\"><th style=\"$css_th\">Submitter: </th><td><a href=\"mailto:{$clientEmail}\">{$clientEmail}</a></td></tr>";
    
    $i = 0;
    foreach($textData as $key => $value) {
      $style = ($i++ % 2 == 0) ? $css_tr1 : $css_tr2;
      $body.= "<tr style=\"$style\"><th style=\"$css_th\">$key: </th><td>$value</td></tr>";
      
    }
    
    $adminManager = new AdminManager();
    $adminManager->sendEmail($to, $subject, $body);
    
    
    return $result;
  }
  
  private function getPostValue($name) {
  if (isset($_POST[$name])) {
    return htmlspecialchars($_POST[$name]);
  } else {
    return null;
  }
}
  
  private function dump($obj) {
    echo('<pre>');
    var_dump($obj);
    //echo('</pre>');
  }
     
}
