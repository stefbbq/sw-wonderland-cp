<?php

namespace wpl\wplPortal;

use wpl\database\Database;
use wpl\model\Client;
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
    public function saveClient($name, $address, $city, $province, $postal_code, $email, $phone1, $phone2, $wplEmail, $id = null) {
        $result = new Result();
        
        $newClient = $id == null;
        
        $client = new Client();
        $client->guid = $newClient ? $this->db->generateGUID() : $id;
        $client->name = $name;
        $client->address = $address;
        $client->city = $city;
        $client->province = $province;
        $client->postal_code = $postal_code;
        $client->email = $email;
        $client->phone = $phone1;
        $client->phone2 = $phone2;
        $client->wplEmail = $wplEmail;
        
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
            // TODO: update client record
        }
        
        return $result;
    }

    /*
     * List Clients
     */
    public function getClientList($startRecord, $pageSize) {
        $result = new Result();
        $select = array('guid', 'name', 'address', 'city', 'province', 'phone', 'phone2');
        
        $dataset = $this->db->select('clients', $select, null, $startRecord, $pageSize);
        
        $result->data = $dataset;
        $result->message = 'client list';

        return $result;
    }
    
    public function getClientRecordCount() {
      $result = new Result();
      $result->success = true;
      $result->code = 200;
      
      $sql = 'select count(*) from clients';
      $result2 = $this->db->db->prepare($sql);
      $result2->execute();
      $recordCount = $result2->fetchColumn();
      
      $result->data = array(
          'total' => $recordCount,
      );
      
      return $result;
    }
    
    
    
    
}
