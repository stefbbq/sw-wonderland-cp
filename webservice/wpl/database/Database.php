<?php
/**
 * Created by PhpStorm.
 * User: Scott
 * Date: 17/12/13
 * Time: 8:27 PM
 */

namespace wpl\database;

use PDO;

class Database {

    public $db;

    public function __construct() {
      //var_dump($_SERVER['HTTP_HOST']);
      
      $dbServer = '';
      $database = '';
      $username = '';
      $password = '';
      
      switch ($_SERVER['HTTP_HOST']) {
        case 'wonderland-cp.stagebot.net':
          $dbServer = 'external-db.s192129.gridserver.com';
          $database = 'db192129_wonderland_cp';
          $username = 'db192129';
          $password = 'St3@myr0b0t5';         
          break;
        case 'localhost:81':
          $dbServer = '192.186.249.99';
          $database = 'wonderlandee';
          $username = 'wonder_db';
          $password = 'W)ND#R_db';
      }
      
      /*
        $dbServer = 'external-db.s192129.gridserver.com';
        $database = 'db192129_wonderland_cp';
        $username = 'db192129';
        $password = 'St3@myr0b0t5';
      */
        
        $this->db = new PDO("mysql:host={$dbServer};dbname={$database}", $username, $password);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function close() {
        $this->db = null;
    }

    public function select($table, $select, $orderBy=NULL, $where=NULL, $start=NULL, $pageSize=NULL){
        $cols = $conditions = '';
        $return = array();
        $i=0;
        foreach($select as $col => $data){
            if($i==0){
                $cols .= $data;
            }else{
                $cols .= ','.$data;
            }
            $i++;
        }
        $i=0;
        $queryString = '';
        if($where){
            foreach($where as $col => $data){
              if ($i++ > 0) {
                $conditions .= " AND ";
              }
              
              if (is_bool($data) || is_int($data)) {
                $conditions .= $col."=".$data."";
              } else {
                $conditions .= $col."='".$data."'";
              }

            }
            $queryString = "SELECT ".$cols." FROM ".$table." WHERE ".$conditions;
            //$query = $this->db->prepare("SELECT ".$cols." FROM ".$table." WHERE ".$conditions);
        }else{
          $queryString = "SELECT ".$cols." FROM ".$table;
          //$query = $this->db->prepare("SELECT ".$cols." FROM ".$table);
        }
        
        $i=0;
        if (!is_null($orderBy)) {
          $queryString .= ' ORDER BY ';
          foreach ($orderBy as $col => $data) {
            if ($i++ == 0) {
              $queryString .= $col . ' ' . $data;
            } else {
              $queryString .= ', ' . $col . ' ' . $data;
            }
          }
        }
        
        if (!is_null($start)) {
          $queryString .= ' LIMIT ' . $start . ',' . $pageSize;
        }
        
        //var_dump($queryString);
        
        $query = $this->db->prepare($queryString);
        
        try {
            $query->execute();
            for($i=0; $row = $query->fetch(); $i++){
                $return[$i] = array();
                foreach($row as $key => $rowItem){
                  if (!is_int($key)) {
                    $return[$i][$key] = $rowItem;
                  }
                }
            }
            //var_dump($return);
        }catch (\PDOException $e) {
            echo $e->getMessage();
        }
        $query->closeCursor();

        //var_dump($query);

        return $return;
    }

    public function search($table, $select, $orderBy=NULL, $where=NULL, $whereAnd=NULL, $start=NULL, $pageSize=NULL){
        $cols = $conditions = '';
        $return = array();
        $i=0;
        foreach($select as $col => $data){
            if($i==0){
                $cols .= $data;
            }else{
                $cols .= ','.$data;
            }
            $i++;
        }
        $i=0;
        $queryString = '';
        if($where){
            foreach($where as $col => $data){
                if($i==0){
                    $conditions .= $col." LIKE '%".$data."%'";
                }else{
                    $conditions .= " OR ".$col." LIKE '%".$data."%'";
                }
                $i++;
            }
            
            /*
             * Won't work properly where there is no $where defined.
             * Should be ok, as we can assume there always will be.
             */
            if ($whereAnd) {
              foreach($whereAnd as $col => $data){
                  $conditions .= " AND ".$col." = '".$data."'";
              }
            }
            
            $queryString = "SELECT ".$cols." FROM ".$table." WHERE ".$conditions;
            //var_dump($queryString);
            //$query = $this->db->prepare("SELECT ".$cols." FROM ".$table." WHERE ".$conditions);
            
        }else{
          $queryString = "SELECT ".$cols." FROM ".$table;
          //$query = $this->db->prepare("SELECT ".$cols." FROM ".$table);
        }
        
        $i=0;
        if (!is_null($orderBy)) {
          $queryString .= ' ORDER BY ';
          foreach ($orderBy as $col => $data) {
            if ($i++ == 0) {
              $queryString .= $col . ' ' . $data;
            } else {
              $queryString .= ', ' . $col . ' ' . $data;
            }
          }
        }        
        
        if (!is_null($start)) {
          $queryString .= ' LIMIT ' . $start . ',' . $pageSize;
        }
        
        $query = $this->db->prepare($queryString);
        
        try {
            $query->execute();
            for($i=0; $row = $query->fetch(); $i++){
                $return[$i] = array();
                foreach($row as $key => $rowItem){
                  $return[$i][$key] = $rowItem;
                }
            }
        }catch (\PDOException $e) {
            echo $e->getMessage();
        }
        $query->closeCursor();

        //var_dump($query);

        return $return;
    }    
    
    public function add($table, $fieldNames){
        $cols = $values = '';
        $i=0;
        foreach($fieldNames as $col => $data){
          if($i++>0){
            $cols .= ",";
            $values .= ",";
          }

          $cols .= $col;

          if (is_bool($data) || is_int($data)) {
            $values .= $data;
          } else {
            $values .= "'$data'";
          }

        }
        try {
            $query = $this->db->prepare("INSERT INTO ".$table." (".$cols.") VALUES (".$values.")");
            $result = $query->execute();
            $query->closeCursor();
            return $query->rowCount();
        }catch (\PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public function update($table, $insert, $where){
        $condition = '';
        $cols = '';
        $i=0;
        
        
        foreach($insert as $col => $data){
            if($i++>0){
              $cols .= ", ";
            }

            if (is_bool($data) || is_int($data)) {
              if (is_bool($data)) $data = $data ? 'true' : 'false';
              $cols .= $col."=".$data."";
            } else {
              $cols .= $col."='".$data."'";
            }
        }
        $c=0;
        foreach($where as $col => $value){
          if ($c++ > 0) {
            $condition .= " AND ";
          }
          
          if (is_bool($value) || is_int($value)) {
            $condition .= $col."=".$value."";
          } else {
            $condition .= $col."='".$value."'";
          }

        }
        $sql = "UPDATE ".$table." SET ".$cols." WHERE ".$condition;
        //var_dump($sql);
        try {
            $query = $this->db->prepare($sql);
            $result = $query->execute();
            $query->closeCursor();
            return $query->rowCount();
        }catch (\PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public function delete($tablename, $where){
        $condition = '';
        $i=0;
        foreach($where as $col => $data){
            if($i==0){
                $condition = $col.'='.$data;
            }else{
                $condition = " AND ".$col.'='.$data;
            }
        }
        $query = "DELETE FROM `".$tablename."` WHERE ".$condition;
        $result = $this->db->query($query);
        return $result->rowCount();
    }


    /*
      * GUID
      */
    public function generateGUID() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

            // 16 bits for "time_mid"
            mt_rand( 0, 0xffff ),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,

            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }


    /****************************************************************************************************
     * Get Member ID from Token
     ****************************************************************************************************/
    public function getMemberIDFromToken($memberToken) {
        $conditions = array();
        $conditions['token'] = $memberToken;

        $dbResult = $this->select("members", array('id'), $conditions);
        $result = -1;
        if (count($dbResult) > 0) {
            $result = $dbResult[0]['id'];
        }
        return $result;
    }

} 