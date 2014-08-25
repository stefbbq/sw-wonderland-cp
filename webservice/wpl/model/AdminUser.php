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
class AdminUser {

  public $username, $email, $password, $guid;

  public function __construct() {

  }

  public function getUpdateModel() {
    return array(
      'username' => $this->$username,
      'email' => $this->email,
      'password' => $this->password,
    );
  }  
}
