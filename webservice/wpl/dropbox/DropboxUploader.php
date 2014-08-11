<?php
namespace wpl\dropbox;

use sdg\data\Result;
use wpl\database\Database;
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
    $accessToken = 'Rtf-mLdIcxsAAAAAAAAEgad9u-POsKpy3A8eUAxzzNzXLb3U5JpSOyTLIWDmw3V8';

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
    
    if ($this->getPostValue('clientName') == null || $this->getPostValue('clientEmail') == null) {
      $result->success = false;
      $result->code = 304;
      $result->message = 'Missing required information';
      return $result;
    }
    
    $fields = array(
        'clientName',
        'clientEmail',
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
    
    $data = array();
    foreach ($fields as $fieldName) {
      $value = $this->getPostValue($fieldName);
      if ($value != null) {
        $data[$fieldName] = $value;
      }
    }
    
    if (count($_FILES) > 0) {
      $data['file'] = $_FILES['file']['name'];
    }
    
    $dbResult = $this->db->add('quoteRequests', $data);
    if ($dbResult) {
      //$lastID = $this->db->getLastInsertID('id');

      $result->success = true;
      $result->message = "Quote request added ($lastID)";
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
      $email = $this->getPostValue('clientEmail');
      $this->dbxClient->createFolder("/$email");
      $dbxResult = $this->dbxClient->uploadFile("/$email/{$file['name']}", dbx\WriteMode::add(), $f);
      fclose($f);
      
      $this->dump($dbxResult);
    }
    
    
    /*
    var_dump($_FILES);
    var_dump(count($_FILES));
    var_dump($_FILES['file']);
    */
    
    //var_dump($data);

    /*
    echo('post');
    var_dump($_POST);
    */
    //echo('files');
    //var_dump($_FILES);
    
    
    
    
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
