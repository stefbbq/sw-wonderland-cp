<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace wpl\model;

/**
 * Description of ClientUser
 *
 * @author Scott David Garson
 */
class Collateral {

  public $client_id, $name, $type, $description, $thumb_path, $asset_path, $last_upload, $guid;

  public function __construct() {

  }

  public function getUpdateModel() {
    return array(
      'name' => $this->name,
      'type' => $this->type,
      'description' => $this->description,
      'client_id' => $this->client_id
    );
  }  
}
