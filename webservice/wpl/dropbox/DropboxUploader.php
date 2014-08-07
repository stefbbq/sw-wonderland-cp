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
  public function __construct() {
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
   
  private function dump($obj) {
    echo('<pre>');
    var_dump($obj);
    //echo('</pre>');
  }
     
}
