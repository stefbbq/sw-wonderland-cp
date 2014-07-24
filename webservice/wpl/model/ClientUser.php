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

  public $companyID, $firstName, $lastName, $email, $confirmEmail, $phone, $phone2, $guid;

  public function __construct() {

  }

  public function getUpdateModel() {
    return array(
      '$firstName' => $this->$firstName,
      '$lastName' => $this->$lastName,
      '$email' => $this->$email,
      '$confirmEmail' => $this->$confirmEmail,
      'phone' => $this->phone,
      'phone2' => $this->phone2
    );
  }  
}
