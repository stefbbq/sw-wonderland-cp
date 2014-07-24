<?php

namespace wpl\wplPortal;

use wpl\database\Database;
use wpl\model\Client;
use wpl\model\ClientUser;
use sdg\data\Result;
/**
 * Description of AdminManager
 *
 * @author Scott David Garson
 */

class AdminManager {
  private $db;

  public function __construct() {
      $this->db = new Database();
  }  

  /*
   * Create and Update Client
   */
  public function saveClient($name, $address, $city, $province, $postal_code, $email, $phone, $phone2, $wplEmail, $id = null) {
      $result = new Result();

      $newClient = $id == null;

      $client = new Client();
      $client->name = $name;
      $client->address = $address;
      $client->city = $city;
      $client->province = $province;
      $client->postal_code = $postal_code;
      $client->email = $email;
      $client->phone = $phone;
      $client->phone2 = $phone2;
      $client->wplEmail = $wplEmail;
      $client->guid = $newClient ? $this->db->generateGUID() : $id;

      $result->data = $client;

      if ($newClient) {
        $dbResult = $this->db->add('clients', $client);
        if ($dbResult) {
          $result->success = true;
          $result->message = "Client added.";
          $result->code = 200;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "Error adding client.";
        }
      } else {
        $where = array(
            'guid' => $id
        );
        $dbResult = $this->db->update('clients', $client->getUpdateModel(), $where);
        if ($dbResult) {
          $result->success = true;
          $result->message = "Client updated.";
          $result->code = 200;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "Error updating client.";
        }
      }

      return $result;
  }

  /*
   * List Clients
   */
  public function getClientList($startRecord, $pageSize) {
      $result = new Result();

      $sql = 'select count(*) from clients';
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();        

      $select = array('guid', 'name', 'address', 'city', 'province', 'phone', 'phone2');

      $orderBy = array('name' => 'ASC');
      $where = array('active' => true);
      $dataset = $this->db->select('clients', $select, $orderBy, $where, $startRecord, $pageSize);

      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'client list';

      return $result;
  }

  /*
   * Search Clients
   */
  public function searchClients($searchString, $startRecord, $pageSize) {
      $result = new Result();

      $searchQuery = ' name LIKE :search OR address LIKE :search OR city LIKE :search';

      $sql = 'SELECT COUNT(*) FROM clients WHERE' . $searchQuery;
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->bindValue(':search', '%'.$searchString.'%');
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();        

      $select = array('guid', 'name', 'address', 'city', 'province', 'phone', 'phone2');
      $where = array(
          'name'=>$searchString,
          'address'=>$searchString,
          'city'=>$searchString
      );
      $whereAnd = array('active'=>true);
      $orderBy = array('name' => 'ASC');
      $dataset = $this->db->search('clients', $select, $orderBy, $where, $whereAnd, $startRecord, $pageSize);

      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'client search results';

      return $result;
  }

  /*
   * Client Detail
   */
  public function getClientDetail($guid) {
     $result = new Result();

      $select = array('guid', 'name', 'address', 'city', 'province', 'postal_code', 'phone', 'phone2', 'email', 'wplEmail', 'active');

      $where = array(
          'guid' => $guid
      );
      $orderBy = null;
      $dataset = $this->db->select('clients', $select, $orderBy, $where);

      $result->data = $dataset[0];

      $result->message = 'client detail';

      return $result;      
  }

  /*
   * Deactivate Client
   */
  public function deactivateClient($guid) {
    return $this->setClientActive($guid, '0');
  }
  
  public function reactivateClient($guid) {
    return $this->setClientActive($guid, '1');
  }
  
  private function setClientActive($guid, $active) {
    $insert = array('active' => $active == '1');
    $where = array('guid' => $guid);
    
    $dbResult = $this->db->update('clients', $insert, $where);
    if ($dbResult) {
      $result->success = true;
      $result->message = $active ? "Client reactivated." : "Client deactivated.";
      $result->code = 200;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = $active ? "Client reactivation failed." : "Client deactivation failed.";
    }    
    
    return $result;
  }
  
  /*
   * Client User
   */
  public function saveClientUser($firstName, $lastName, $email, $comfirmEmail, $phone, $phone2, $companyID, $id = null) {
    $result = new Result();

    $newUser = $id == null;

    $user = new ClientUser();
    $user->companyID = $companyID;
    $user->firstName = $firstName;
    $user->lastName = $lastName;
    $user->email = $email;
    $user->confirmEmail = $confirmEmail;
    $user->phone = $phone;
    $user->phone2 = $phone2;
    $user->guid = $newUser ? $this->db->generateGUID() : $id;

    $result->data = $user;

    if ($newUser) {
      $dbResult = $this->db->add('clients', $user);
      if ($dbResult) {
        $result->success = true;
        $result->message = "Client added.";
        $result->code = 200;
      } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error adding client.";
      }
    } else {
      $where = array(
          'guid' => $id
      );
      $dbResult = $this->db->update('clients', $user->getUpdateModel(), $where);
      if ($dbResult) {
        $result->success = true;
        $result->message = "Client updated.";
        $result->code = 200;
      } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error updating client.";
      }
    }

    return $result;
  }

}
