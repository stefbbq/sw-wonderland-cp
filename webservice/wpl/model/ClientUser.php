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
class ClientUser {

  public $client_id, $first_name, $last_name, $email, $confirmation_email, $phone, $phone2, $guid;

  public function __construct() {

  }

  public function getUpdateModel() {
    return array(
      'first_name' => $this->first_name,
      'last_name' => $this->last_name,
      'email' => $this->email,
      'confirmation_email' => $this->confirmation_email,
      'phone' => $this->phone,
      'phone2' => $this->phone2
    );
  }  
}
