<?php
namespace wpl\wplPortal;

use wpl\database\Database;
use wpl\model\Client;
use wpl\model\ClientUser;
use wpl\model\AdminUser;
use wpl\model\Collateral;
use sdg\data\Result;
use wpl\dropbox\DropboxUploader;

/**
 * Description of AdminManager
 *
 * @author Scott David Garson
 */

class AdminManager {
  private $db;

  public function __construct() {
      $this->db = new Database();
      date_default_timezone_set('America/Toronto');
  }  

  /*
   * Create and Update Client
   */
  public function saveClient($name, $address, $city, $province, $postal_code, $email, $phone, $ext, $phone2, $wplEmail, $id = null) {
      $result = new Result();

      $newClient = $id == null;

      $client = new Client();
      $client->name = $this->escapeText($name);
      $client->address = $this->escapeText($address);
      $client->city = $this->escapeText($city);
      $client->province = $province;
      $client->postal_code = $postal_code;
      $client->email = $email;
      $client->phone = $phone;
      $client->ext = $ext;
      $client->phone2 = $phone2;
      $client->wplEmail = $wplEmail;
      $client->guid = $newClient ? $this->db->generateGUID() : $id;

      $result->data = array('id' => $client->guid);

      if ($newClient) {
        $client->active = '1';
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
  public function getClientList($startRecord, $pageSize, $active) {
      $result = new Result();

      $sql = "select count(*) from clients where active = '$active'";
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();        

      $select = array('guid', 'name', 'address', 'city', 'province', 'phone', 'phone2');

      $orderBy = array('name' => 'ASC');
      $where = array('active' => $active);
      $dataset = $this->db->select('clients', $select, $orderBy, $where, $startRecord, $pageSize);

      $result->success = true;
      $result->code = 200;
      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'client list';

      return $result;
  }

  /*
   * Search Clients
   */
  public function searchClients($searchString, $startRecord, $pageSize, $active) {
      $result = new Result();

      $searchQuery = " name LIKE :search OR address LIKE :search OR city LIKE :search AND active='$active'";

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
      $whereAnd = array('active'=>$active);
      $orderBy = array('name' => 'ASC');
      $dataset = $this->db->search('clients', $select, $orderBy, $where, $whereAnd, $startRecord, $pageSize);

      $result->success = true;
      $result->code = 200;
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

    $select = array('guid', 'name', 'address', 'city', 'province', 'postal_code', 'phone', 'ext', 'phone2', 'email', 'wplEmail', 'active');

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
  public function setClientActive($guid, $active) {
    $result = new Result();

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
  public function saveClientUser($firstName, $lastName, $email, $confirmEmail, $phone, $phone2, $companyID, $id = null) {
    $result = new Result();

    $isNew = $id == null;

    $user = new ClientUser();
    $user->first_name = $this->escapeText($firstName);
    $user->last_name = $this->escapeText($lastName);
    $user->email = $email;
    $user->confirmation_email = $confirmEmail;
    $user->phone = $phone;
    $user->phone2 = $phone2;
    $user->guid = $isNew ? $this->db->generateGUID() : $id;
    
    if ($isNew) {
      // check if the email address is already registered
      $select = array('email', 'temp_password', 'password_set');
      $where = array('email' => $email);
      $dataset = $this->db->select('clientUsers', $select, null, $where);
      
      if ($dataset) {
        $result->success = false;
        $result->code = 304;
        
        if ($dataset[0]['password_set'] == 0) {
          $user->temp_password = $dataset[0]['temp_password'];
          $user->password_set = 0;
          $result->message = "Email address $email is already used.  Resending email.";
        } else {
          $user->password_set = 1;
          $result->message = "Email address $email is already used.  Not resending email.";
        }
      
      } else {
        $clientKey = $this->db->getCompanyIDFromGUID($companyID);
        $user->client_id = $clientKey;
      
        $user->temp_password = $this->db->generateTempPassword();
        $user->password = md5($user->temp_password);
        
        
        $dbResult = $this->db->add('clientUsers', $user);
        if ($dbResult) {
          $result->success = true;
          $result->message = "Client added.";
          $result->code = 200;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "Error adding client.";
        }
      }
    } else {
      $where = array(
          'guid' => $id
      );
      $dbResult = $this->db->update('clientUsers', $user->getUpdateModel(), $where);
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
    
    // Email new user temporary password and link to change password
    if ($isNew && !$user->password_set) {
      switch ($_SERVER['HTTP_HOST']) {
        case 'localhost:81':
          $url = 'http://localhost:81/wonderland_cp/client/resetPassword.php';
          break;
        default:
          $url = $_SERVER['HTTP_HOST'] . '/client/resetPassword.php';
          //$url2 = 'http://localhost:81/wonderland_cp/client/resetPassword.php';
      }
      
      $url .= "?id=$user->guid"; 
      if ($url2) $url2 .= "?id=$user->guid";

      
      //$email = 'sdgarson@gmail';
      $to = $email;
      $subject = 'Reset your password for Wonderland Client Portal';
      $body = '<h2>Password Reset</h2>';
      $body .= "<p>Your password has been reset.  Your temporary password is <b>$user->temp_password</b> Please click on the link below to change your password.</p>";  
      $body .= "<p><a href=\"$url\">$url</a></p>";
      if ($url2) $body .= "<p>Local URL: <a href=\"$url2\">$url2</a></p>";
      $mailResult = $this->sendEmail($to, $subject, $body);
      //$result->data = $mailResult;
    }    
    
    return $result;
  }
  
  /*
   * List Client Users
   */
  public function getClientUserList($clientID, $active) {
      $result = new Result();
      
      $clientKey = $this->db->getCompanyIDFromGUID($clientID);

      $select = array('first_name', 'last_name', 'email', 'confirmation_email', 'phone', 'phone2', 'guid');

      $orderBy = array('last_name' => 'ASC', 'first_name' => 'ASC');
      $where = array('client_id' => $clientKey, 'active' => $active);
      $dataset = $this->db->select('clientUsers', $select, $orderBy, $where);

      $result->data = array();

      if ($dataset) {
        $result->success = true;
        $result->message = "Client User List";
        $result->code = 200;
        $result->data['list'] = $dataset;
      } else {
        $result->success = false;
        $result->code = 304;
        $result->data['list'] = array();
        $result->message = "No client users.";
      }

      return $result;
  }
  
  public function loadClientUserDetails($guid) {
    $result = new Result();
    $result->data = array();

    // get user detail
    $select = array('guid', 'first_name', 'last_name', 'email', 'confirmation_email', 'phone', 'phone2', 'active', 'password_set', 'client_id');
    $where = array(
        'guid' => $guid
    );
    $orderBy = null;
    $dataset = $this->db->select('clientUsers', $select, $orderBy, $where);
    
    $result->data['user'] = $dataset[0];

    // client info
    $select = array('guid', 'name', 'address', 'city', 'province', 'postal_code', 'phone', 'phone2', 'email', 'wplEmail', 'active');
    $where = array(
        'id' => $dataset[0]['client_id']
    );
    $orderBy = null;
    $dataset = $this->db->select('clients', $select, $orderBy, $where);
    $result->data['company'] = $dataset[0];

    $result->message = 'client user detail';

    return $result;      
  }
  
  /*
   * Deactivate Client
   */
  public function setClientUserActive($guid, $active) {
    $result = new Result();
    
    $insert = array('active' => $active == '1');
    $where = array('guid' => $guid);
    $dbResult = $this->db->update('clientUsers', $insert, $where);
    if ($dbResult) {
      $result->success = true;
      $result->message = $active ? "User reactivated." : "User deactivated.";
      $result->code = 200;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = $active ? "User reactivation failed." : "User deactivation failed.";
    }    
    
    return $result;
  }
  
  /*
   * Admin Users
   */
  public function saveAdminUser($username, $email, $id = null, $testMode) {
    $result = new Result();

    $isNew = $id == null;
    
    $user = new AdminUser();
    $user->username = $this->escapeText($username);
    $user->email = $email;
    $user->temp_password = $this->db->generateTempPassword();
    $user->password = md5($user->temp_password);
    $user->guid = $isNew ? $this->db->generateGUID() : $id;

    $result->data = $user;

    if (!$testMode) {
    
      if ($isNew) {
        
     // check if the email address is already registered
      $select = array('temp_password', 'password_set');
      $where = array('email' => $email);
      $dataset = $this->db->select('adminUsers', $select, null, $where);
      
      if ($dataset) {
        $result->success = false;
        $result->code = 304;
        if ($dataset[0]['password_set'] == 0) {
          $user->temp_password = $dataset[0]['temp_password'];
          $user->password_set = 0;
          $result->message = "Email address $email is already used.  Resending email.";
        } else {
          $user->password_set = 1;
          $result->message = "Email address $email is already used.  Not resending email.";
        }
      } else {
        $clientKey = $this->db->getCompanyIDFromGUID($companyID);
        $user->client_id = $clientKey;
      
        $user->temp_password = $this->db->generateTempPassword();
        $user->password = md5($user->temp_password);
        
        
        $dbResult = $this->db->add('clientUsers', $user);
        if ($dbResult) {
          $result->success = true;
          $result->message = "Client added.";
          $result->code = 200;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "Error adding client.";
        }
      }

      
        $dbResult = $this->db->add('adminUsers', $user);
        if ($dbResult) {
        $result->success = true;
        $result->message = "Admin user added.";
        $result->code = 200;
        } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error adding admin user.";
        }
      } else {
        $where = array(
          'guid' => $id
        );
        $dbResult = $this->db->update('adminUsers', $user->getUpdateModel(), $where);
        if ($dbResult) {
          $result->success = true;
          $result->message = "Admin user updated.";
          $result->code = 200;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "Error updating admin user.";
        }
      }
    } else {
      $result = new Result();
      $result->success = true;
      $result->code = 200;
      $result->message = 'sending test email (didn\'t add to database)';
    }
    
    // Email new user temporary password and link to change password
    if ($isNew && !$user->password_set) {
      switch ($_SERVER['HTTP_HOST']) {
        case 'localhost:81':
          $url = 'http://localhost:81/wonderland_cp/admin/resetPassword.php';
          break;
        default:
          $url = $_SERVER['HTTP_HOST'] . '/admin/resetPassword.php';
          //$url2 = 'http://localhost:81/wonderland_cp/admin/resetPassword.php';
      }
      
      $url .= "?id=$user->guid"; 
      if ($url2) $url2 .= "?id=$user->guid";

      
      //$email = 'sdgarson@gmail';
      $to = $email;
      $subject = 'Reset your password for Wonderland Admin';
      $body = '<h2>Password Reset</h2>';
      $body .= "<p>Your password has been reset.  Your temporary password is <b>$user->temp_password</b> Please click on the link below to change your password.</p>";  
      $body .= "<p><a href=\"$url\">$url</a></p>";
      if ($url2) $body .= "<p>Local URL: <a href=\"$url2\">$url2</a></p>";
      $mailResult = $this->sendEmail($to, $subject, $body);
      $result->data = $mailResult;
    }
    
    return $result;
  }  
  
  private function sendEmail($to, $subject, $email) {
    $result = new Result();
    $sendEmail = true;
    //$to = 'sdgarson@gmail.com'; // TODO: hard-code for testing
    
    switch ($_SERVER['HTTP_HOST']) {
      case 'localhost:81':
        $sendEmail = false;
        $url = 'localhost:81/wonderland_cp/';
        break;
      default:
        
        
    }

    if ($sendEmail) {
      $emailHeaders  = 'MIME-Version: 1.0' . "\r\n";
      $emailHeaders .= 'Content-type: text/html; charset=utf-8' . "\r\n";	
      $result->success = mail($to, $subject, $email, $emailHeaders);
    } else {
      $emailData = array(
          'to' => $to,
          'subject' => $subject,
          'email' => $email
      );
      
        $result->data = $emailData;
      }
    
    return $result;
	
  }
  
  public function resetAdminPassword($email) {
    $result = new Result();
    
    $select = array('guid', 'password_set', 'temp_password');

    $where = array(
        'email' => $email
    );
    
    $orderBy = null;
    $dataset = $this->db->select('adminUsers', $select, $orderBy, $where);
    $message = '';
    $emailMessage = '';
    
    $sendEmail = false;

          
    if (count($dataset) == 0) {
      $result->success = false;
      $result->code = 403;
      $result->message = "No user found with the email address \"$email\"";
      // $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
      $message = "No user found with the email address \"$email\".";
    } else {
      $guid = $dataset[0]['guid'];
      
      //var_dump($dataset[0]['password_set'] == 1);
      
      if ($dataset[0]['password_set'] == 1) {
        $temp_password = $this->db->generateTempPassword();
        $password = md5($temp_password);
        
        // set new password
        $where = array(
          'guid' => $guid
        );
        
        $update = array(
          'password' => $password,
          'temp_password' => $temp_password,
          'password_set' => '0'
        );
        
        $dbResult = $this->db->update('adminUsers', $update, $where);
          
        if ($dbResult) {
          $result->success = true;
          $result->message = "Resetting password for \"$email\".";
          $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
          $result->code = 200;
          $sendEmail = true;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "There was an error updating password for \"$email\".";
          $message = "There was an error updating password for \"$email\".";
          // $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
        }        
      
      } else {
        $result->success = true;
        $result->code = 200;
        $result->message = "Resending temp password for \"$email\".";
        $temp_password = $dataset[0]['temp_password'];
        $sendEmail = true;
      }
            
      if ($sendEmail) {   
        $url = '';
        // $url2 = '';
        switch ($_SERVER['HTTP_HOST']) {
          case 'localhost:81':
            $url = 'http://localhost:81/wonderland_cp/admin/resetPassword.php';
            break;
          default:
            $url = $_SERVER['HTTP_HOST'] . '/admin/resetPassword.php';
            //$url2 = 'http://localhost:81/wonderland_cp/admin/resetPassword.php';
        }        
        
        $url .= "?id=$guid"; 
        // if ($url2) $url2 .= "?id=$guid";        
        
        $to = $email;
        $subject = 'Reset your password for Wonderland Admin Portal';
        $body = '<h2>Password Reset</h2>';
        $body .= "<p>Your password has been reset.  Your temporary password is <b>$temp_password</b> Please click on the link below to change your password.</p>";  
        $body .= "<p><a href=\"$url\">$url</a></p>";
        // if ($url2) $body .= "<p>Local URL: <a href=\"$url2\">$url2</a></p>";
        $mailResult = $this->sendEmail($to, $subject, $body);
      }
    }    
    
    $result->data = array(
      'message' => $message,
      'mailResult' => $mailResult
    );
    
    return $result;
  } 
  
  public function resetAdminPassword_old($email) {
    $result = new Result();
    
    $select = array('guid');

    $where = array(
        'email' => $email
    );
    
    $orderBy = null;
    $dataset = $this->db->select('adminUsers', $select, $orderBy, $where);
    $message = '';
    if (count($dataset) == 0) {
      $result->success = false;
      $result->code = 403;
      $result->message = "No user found with the email address \"$email\"";
      // $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
      $message = "No user found with the email address \"$email\".";
    } else {
      $guid = $dataset[0]['guid'];
            
      $temp_password = $this->db->generateTempPassword();
      $password = md5($temp_password);
            
            
		  $where = array(
			  'guid' => $guid
		  );
      
      $update = array(
        'password' => $password,
        'temp_password' => $temp_password,
        'password_set' => '0'
      );
      
		  $dbResult = $this->db->update('adminUsers', $update, $where);
		  if ($dbResult) {
      
        $result->success = true;
        $result->message = "Resetting password for \"$email\".";
        $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
        $result->code = 200;
        
        $url = '';
        $url2 = '';
        switch ($_SERVER['HTTP_HOST']) {
          case 'localhost:81':
            $url = 'http://localhost:81/wonderland_cp/admin/resetPassword.php';
            break;
          default:
            $url = $_SERVER['HTTP_HOST'] . '/admin/resetPassword.php';
            $url2 = 'http://localhost:81/wonderland_cp/admin/resetPassword.php';
        }        
        
        $url .= "?id=$guid"; 
        if ($url2) $url2 .= "?id=$guid";        
        
        $to = $email;
        $subject = 'Reset your password for Wonderland Admin';
        $body = '<h2>Password Reset</h2>';
        $body .= "<p>Your password has been reset.  Your temporary password is <b>$temp_password</b> Please click on the link below to change your password.</p>";  
        $body .= "<p><a href=\"$url\">$url</a></p>";
        if ($url2) $body .= "<p>Local URL: <a href=\"$url2\">$url2</a></p>";
        $mailResult = $this->sendEmail($to, $subject, $body);

    
		  } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "There was an error updating password for \"$email\".";
        $message = "There was an error updating password for \"$email\".";
        // $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
		  }
      
    }    
    
    $result->data = array(
      'message' => $message,
      'mailResult' => $mailResult
    );
    
    return $result;
  }
  
  public function changeAdminPassword($guid, $oldPassword, $newPassword) {
    $result = new Result();

    $select = array('username');

    $where = array(
        'guid' => $guid,
        'password' => $oldPassword
    );
    
    $orderBy = null;
    $dataset = $this->db->select('adminUsers', $select, $orderBy, $where);
    if (count($dataset) == 0) {
      $result->success = false;
      $result->code = 403;
      $result->message = 'Permission Denied';
    } else {
      $userName = $dataset[0]['username'];
            
		  $where = array(
			  'guid' => $guid
		  );
      
      $update = array(
        'password' => $newPassword,
        'temp_password' => '',
        'password_set' => '1'
      );
      
		  $dbResult = $this->db->update('adminUsers', $update, $where);
		  if ($dbResult) {
      
        $result->success = true;
        $result->message = "Password changed.";
        $result->code = 200;
		  } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error updating password.";
		  }
      
    }
    
    //$result->data = $dataset[0];


    return $result;      
  }
  
  public function resetClientPassword($email) {
    $result = new Result();
    
    $select = array('guid', 'password_set', 'temp_password');

    $where = array(
        'email' => $email
    );
    
    $orderBy = null;
    $dataset = $this->db->select('clientUsers', $select, $orderBy, $where);
    $message = '';
    $emailMessage = '';
    
    $sendEmail = false;

          
    if (count($dataset) == 0) {
      $result->success = false;
      $result->code = 403;
      $result->message = "No user found with the email address \"$email\"";
      // $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
      $message = "No user found with the email address \"$email\".";
    } else {
      $guid = $dataset[0]['guid'];
      
      //var_dump($dataset[0]['password_set'] == 1);
      
      if ($dataset[0]['password_set'] == 1) {
        $temp_password = $this->db->generateTempPassword();
        $password = md5($temp_password);
        
        // set new password
        $where = array(
          'guid' => $guid
        );
        
        $update = array(
          'password' => $password,
          'temp_password' => $temp_password,
          'password_set' => '0'
        );
        
        $dbResult = $this->db->update('clientUsers', $update, $where);
          
        if ($dbResult) {
          $result->success = true;
          $result->message = "Resetting password for \"$email\".";
          $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
          $result->code = 200;
          $sendEmail = true;
        } else {
          $result->success = false;
          $result->code = 304;
          $result->message = "There was an error updating password for \"$email\".";
          $message = "There was an error updating password for \"$email\".";
          // $message = "Your password has been reset.  An email has been sent to \"$email\" with  your new password and instructions on how to change it.";
        }        
      
      } else {
        $result->success = true;
        $result->code = 200;
        $result->message = "Resending temp password for \"$email\".";
        $temp_password = $dataset[0]['temp_password'];
        $sendEmail = true;
      }
            
      if ($sendEmail) {   
        $url = '';
        // $url2 = '';
        switch ($_SERVER['HTTP_HOST']) {
          case 'localhost:81':
            $url = 'http://localhost:81/wonderland_cp/client/resetPassword.php';
            break;
          default:
            $url = $_SERVER['HTTP_HOST'] . '/client/resetPassword.php';
            // $url2 = 'http://localhost:81/wonderland_cp/client/resetPassword.php';
        }        
        
        $url .= "?id=$guid"; 
        // if ($url2) $url2 .= "?id=$guid";        
        
        $to = $email;
        $subject = 'Reset your password for Wonderland Client Portal';
        $body = '<h2>Password Reset</h2>';
        $body .= "<p>Your password has been reset.  Your temporary password is <b>$temp_password</b> Please click on the link below to change your password.</p>";  
        $body .= "<p><a href=\"$url\">$url</a></p>";
        // if ($url2) $body .= "<p>Local URL: <a href=\"$url2\">$url2</a></p>";
        $mailResult = $this->sendEmail($to, $subject, $body);

      }
            
            
      

      
    }    
    
    $result->data = array(
      'message' => $message,
      'mailResult' => $mailResult
    );
    
    return $result;
  }  
  
  public function changeClientPassword($guid, $oldPassword, $newPassword) {
    $result = new Result();

    $select = array('email');

    $where = array(
        'guid' => $guid,
        'password' => $oldPassword
    );
    
    $orderBy = null;
    $dataset = $this->db->select('clientUsers', $select, $orderBy, $where);
    /*
    var_dump($guid);
    var_dump($oldPassword);
    var_dump($dataset);
    */
    
    
    if (count($dataset) == 0) {
      $result->success = false;
      $result->code = 403;
      $result->message = 'Permission Denied';
    } else {
            
		  $where = array(
			  'guid' => $guid
		  );
      
      $update = array(
        'password' => $newPassword,
        'temp_password' => '',
        'password_set' => '1'
      );
      
		  $dbResult = $this->db->update('clientUsers', $update, $where);
		  if ($dbResult) {
      
        $result->success = true;
        $result->message = "Password changed.";
        $result->code = 200;
		  } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error updating password.";
		  }
      
    }
    
    //$result->data = $dataset[0];


    return $result;      
  }  
  
  public function emailTest($id) {
    $result = new Result();
    
    $url;
    //$server = $_SERVER;
    $sendEmail = true;
    
    $to = 'sdgarson@gmail.com';
    $subject = 'Test Email:' . $id;
    $email = 'This is a test email.';   
    
    $url;
    
    switch ($_SERVER['HTTP_HOST']) {
      case 'localhost:81':
        $sendEmail = false;
        $url = 'localhost:81/wonderland_cp/';
        break;
      default:
        
        
    }

    if ($sendEmail) {
      $result->message = mail($to, $subject, $email);
    } else {
        $emailData = array(
            'to' => $to,
            'subject' => $subject,
            'email' => $email
        );
        
        $result->data = $emailData;
    }
    
    return $result;
  }
  
  private function changeAdminPassword_old($id, $oldPassword, $password) {
    $result = new Result();
    
    $user = array(
     'password' => $this->escapeText($password),
     'password_set' => '1',
     'temp_password' => ''
    );
    
    $where = array(
     'guid' => $id,
     'password' => $oldPassword
    );
    
    $dbResult = $this->db->update('adminUsers', $user, $where);
    if ($dbResult) {
      $result->success = true;
      $result->message = "Admin password updated.";
      $result->code = 200;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = "Error updating admin password.";
    }    

    return $result;
  }
  
  public function getAdminUserList($active) {
    $result = new Result();

    $select = array('username', 'email', 'guid');

    $orderBy = array('email' => 'ASC');
    $where = array('active' => $active);
    $dataset = $this->db->select('adminUsers', $select, $orderBy, $where);

    $result->data = array();

    if ($dataset) {
      $result->success = true;
      $result->message = "Admin User List";
      $result->code = 200;
      $result->data['list'] = $dataset;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->data['list'] = array();
      $result->message = "No admin users.";
    }

    return $result;
  }  
  
  public function getAdminUserDetail($id) {
    $result = new Result();
    $result->data = array();

    // get user detail
    $select = array('guid', 'username', 'email');
    $where = array(
        'guid' => $id
    );
    $orderBy = null;
    $dataset = $this->db->select('adminUsers', $select, $orderBy, $where);

    $result->success = true;
    $result->code = 200;
    $result->data = $dataset[0];
    $result->message = 'admin user detail';

    return $result;     
    
  }
  
  /*
   * Deactivate
   */
  public function setAdminUserActive($guid, $active) {
    $result = new Result();
    
    $insert = array('active' => $active == '1');
    $where = array('guid' => $guid);
    
    $dbResult = $this->db->update('adminUsers', $insert, $where);
    if ($dbResult) {
      $result->success = true;
      $result->message = $active ? "Admin user reactivated." : "Admin user deactivated.";
      $result->code = 200;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = $active ? "Admin user reactivation failed." : "Admin user deactivation failed.";
    }    
    
    return $result;
  }  
  
  public function adminLogin($username, $password) {
    $result = new Result();
    $result->data = array();

    // get user detail
    $select = array('guid', 'super_user');
    $where = array(
        'username' => $this->escapeText($username),
        'password' => $this->escapeText($password)
    );
    $orderBy = null;
    $dataset = $this->db->select('adminUsers', $select, $orderBy, $where);

    if ($dataset) {
      $result->success = true;
      $result->code = 200;
      $result->data = $dataset[0];
      $result->message = 'login success';
    } else {
      $result->success = false;
      $result->code = 304;
      $result->data = null;
      $result->message = 'login failed';
    }
    

    return $result;    
  }
  
  /*
   * Client Login
   */
  public function clientLogin($email, $password) {
    $result = new Result();
    $result->data = array();

    // get user detail
    $select = array('guid', 'client_id');
    $where = array(
        'email' => $this->escapeText($email),
        'password' => $this->escapeText($password)
    );
    $orderBy = null;
    $dataset = $this->db->select('clientUsers', $select, $orderBy, $where);

    if ($dataset) {
      $userID = $dataset[0]['guid'];
      $select = array('guid');
      $where = array('id' => $dataset[0]['client_id']);
      
      $dataset = $this->db->select('clients', $select, null, $where);
      if ($dataset) {
        $result->success = true;
        $result->code = 200;
        
        $userData = array('user_id' => $userID, 'client_id' => $dataset[0]['guid']);
        
        $result->data = $userData;
        $result->message = 'login success';
      
      } else {
        $result->success = false;
        $result->code = 304;
        $result->data = null;
        $result->message = 'login failed (client error)';
      }
      
    } else {
      $result->success = false;
      $result->code = 304;
      $result->data = null;
      $result->message = 'login failed';
    }
    

    return $result;    
  }  
  
  
  /*
   * Collateral
   */
  public function saveCollateral($clientID, $name, $type, $description, $id = null) {
    $result = new Result();
    
    $isNew = $id == null;
    
    $collateral = new Collateral();
    $collateral->client_id = $this->db->getCompanyIDFromGUID($clientID);
    $collateral->name = $this->escapeText($name);
    $collateral->type = $type;
    $collateral->description = $this->escapeText($description);
    $collateral->guid = $isNew ? $this->db->generateGUID() : $id;


    $collateral->last_upload = date("Y-m-d H:i:s");

    $result->data = array('id' => $collateral->guid);

    if ($isNew) {
      $dbResult = $this->db->add('collateral', $collateral);
      if ($dbResult) {
        $result->success = true;
        $result->message = "Collateral added.";
        $result->code = 200;
      } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error adding collateral.";
      }
    } else {
      $where = array(
          'guid' => $id
      );
      $dbResult = $this->db->update('collateral', $collateral->getUpdateModel(), $where);
      if ($dbResult) {
        $result->success = true;
        $result->message = "Collateral updated.";
        $result->code = 200;
      } else {
        $result->success = false;
        $result->code = 304;
        $result->message = "Error updating collateral.";
      }
    }    
    
    return $result;
  }
    
  /*
   * List Collateral
   */
  public function getCollateralList($clientID, $startRecord, $pageSize, $active) {
      $result = new Result();
      
      $clientID = $this->db->getCompanyIDFromGUID($clientID);
      
      $sql = "select count(*) from collateral where active = '$active' and client_id = $clientID";
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();        

      $select = array('guid', 'name', 'type', 'description', 'last_upload', 'thumb_path');

      $orderBy = array('name' => 'ASC');
      $where = array('active' => $active, 'client_id' => $clientID);
      $dataset = $this->db->select('collateral', $select, $orderBy, $where, $startRecord, $pageSize);

      $baseURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $baseURL = substr($baseURL, 0, strrpos($baseURL, '/') + 1);

      foreach ($dataset as $index => $item) {
        $dataset[$index]['thumb_path'] = $baseURL . $item['thumb_path'];
        $dataset[$index]['name'] = str_replace('\\', '', $item['name']);
        $dataset[$index]['description'] = str_replace('\\', '', $item['description']);
      }
      
      $result->success = true;
      $result->code = 200;
      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'collateral list';

      return $result;
  }  
 
 /*
   * List Collateral
   */
  public function searchCollateral($clientID, $searchString, $startRecord, $pageSize, $active) {
      $result = new Result();
      
      $clientID = $this->db->getCompanyIDFromGUID($clientID);
      
      $searchQuery = " (name LIKE :search OR description LIKE :search OR asset_path LIKE :search) AND active='$active' AND client_id='$clientID'";
      $sql = 'SELECT COUNT(*) FROM collateral WHERE' . $searchQuery;
      
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->bindValue(':search', '%'.$searchString.'%');
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();
      
      $select = array('guid', 'name', 'type', 'description', 'last_upload', 'thumb_path');
      $where = array(
          'name'=>$searchString,
          'description'=>$searchString,
          'asset_path'=>$searchString
      );
      $whereAnd = array('active'=>$active, 'client_id'=>$clientID);
      $orderBy = array('name' => 'ASC');
      $dataset = $this->db->search('collateral', $select, $orderBy, $where, $whereAnd, $startRecord, $pageSize);

      $baseURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $baseURL = substr($baseURL, 0, strrpos($baseURL, '/') + 1);

      foreach ($dataset as $index => $item) {
        $dataset[$index]['thumb_path'] = $baseURL . $item['thumb_path'];
        $dataset[$index]['name'] = str_replace('\\', '', $item['name']);
        $dataset[$index]['description'] = str_replace('\\', '', $item['description']);
      }
      
      $result->success = true;
      $result->code = 200;
      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'collateral list';

      return $result;
  } 

  /*
   * List Collateral
   */
  public function getCollateralListFull($startRecord, $pageSize, $active) {
      $result = new Result();
      
      $sql = "select count(*) from collateral where active = '$active'";
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();        

      $select = array('collateral.guid', 'clients.guid AS client_id', 'clients.name as client_name', 'collateral.name', 'type', 'description', 'last_upload', 'thumb_path');

      $orderBy = array('clients.name' => 'ASC', 'collateral.name' => 'ASC');
      $where = array('collateral.active' => $active);
      $join = 'inner join clients on clients.id = collateral.client_id';
      
      $dataset = $this->db->select('collateral', $select, $orderBy, $where, $startRecord, $pageSize, $join);

      $baseURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $baseURL = substr($baseURL, 0, strrpos($baseURL, '/') + 1);

      foreach ($dataset as $index => $item) {
        $dataset[$index]['thumb_path'] = $baseURL . $item['thumb_path'];
        $dataset[$index]['name'] = str_replace('\\', '', $item['name']);
        $dataset[$index]['description'] = str_replace('\\', '', $item['description']);
      }
      
      $result->success = true;
      $result->code = 200;
      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'full collateral list';

      return $result;
  }  
 
 /*
   * Search Collateral - Full
   */
  public function searchCollateralFull($searchString, $startRecord, $pageSize, $active) {
      $result = new Result();
      
      $searchQuery = " (name LIKE :search OR description LIKE :search OR asset_path LIKE :search) AND active='$active'";
      $sql = 'SELECT COUNT(*) FROM collateral WHERE' . $searchQuery;
      
      $dbResult = $this->db->db->prepare($sql);
      $dbResult->bindValue(':search', '%'.$searchString.'%');
      $dbResult->execute();
      $recordCount = $dbResult->fetchColumn();
      
      $select = array('collateral.guid', 'clients.guid AS client_id', 'clients.name as client_name', 'collateral.name', 'type', 'description', 'last_upload', 'thumb_path');
      $join = 'inner join clients on clients.id = collateral.client_id';

      $where = array(
          'collateral.name'=>$searchString,
          'description'=>$searchString,
          'asset_path'=>$searchString
      );
      $whereAnd = array('collateral.active'=>$active);
      $orderBy = array('clients.name' => 'ASC', 'collateral.name' => 'ASC');
      $dataset = $this->db->search('collateral', $select, $orderBy, $where, $whereAnd, $startRecord, $pageSize, $join);

      $baseURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $baseURL = substr($baseURL, 0, strrpos($baseURL, '/') + 1);

      foreach ($dataset as $index => $item) {
        $dataset[$index]['thumb_path'] = $baseURL . $item['thumb_path'];
        $dataset[$index]['name'] = str_replace('\\', '', $item['name']);
        $dataset[$index]['description'] = str_replace('\\', '', $item['description']);
      }
      
      $result->success = true;
      $result->code = 200;
      $result->data = array();
      $result->data['list'] = $dataset;
      $result->data['count'] = $recordCount;

      $result->message = 'full collateral list';

      return $result;
  }   
  
  public function loadCollateralDetails($guid) {
    $result = new Result();
    $result->data = array();

    // get user detail
    $select = array('guid', 'name', 'type', 'description', 'last_upload', 'client_id', 'active', 'thumb_path', 'asset_path');
    $where = array(
        'guid' => $guid
    );
    $orderBy = null;
    $dataset = $this->db->select('collateral', $select, $orderBy, $where);
    if ($dataset) {
      $result->success = true;
      $result->code = 200;
      $result->data = $dataset[0];
      
      $baseURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $baseURL = substr($baseURL, 0, strrpos($baseURL, '/') + 1);
      
      $result->data['thumb_path'] = $baseURL . $result->data['thumb_path'];
      $result->data['asset_path'] = $baseURL . $result->data['asset_path'];
      $result->data['name'] = str_replace('\\', '', $result->data['name']);
      $result->data['description'] = str_replace('\\', '', $result->data['description']);
      
      
      $result->data['client_id'] = $this->db->getCompanyGUIDFromID($result->data['client_id']);
      
      $result->message = 'client user detail';
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = 'client user detail failed';
    }
    return $result;      
  }
  
  /*
   * Deactivate
   */
  public function setCollateralActive($guid, $active) {
    $result = new Result();
    
    $insert = array('active' => $active == '1');
    $where = array('guid' => $guid);
    
    $dbResult = $this->db->update('collateral', $insert, $where);
    if ($dbResult) {
      $result->success = true;
      $result->message = $active ? "Collateral reactivated." : "Collateral deactivated.";
      $result->code = 200;
    } else {
      $result->success = false;
      $result->code = 304;
      $result->message = $active ? "Collateral reactivation failed." : "Collateral deactivation failed.";
    }
    
    return $result;
  }  
  
  
  public function upload($type) {
    $result = new Result();
    $result->message = "upload";
    
    if (!isset($_POST['id'])) {
      $result->message = 'no collateral ID set.';
      return $result;
    }
    $id = $this->db->getCollateralIDFromGUID(htmlspecialchars($_POST['id']));
    
    $file = $_FILES['file'];
    $dest = 'collateral/' . $id . '/';
    if (!file_exists($dest)) {
      mkdir($dest);
    }
    $dest .= $file['name'];
    
    move_uploaded_file($file['tmp_name'], $dest);
    $result->success = true;
    $result->code = 200;
    //$result->data = $_FILES;

    // update asset urls
    $field = $type == 'thumb' ? 'thumb_path' : 'asset_path';
    
    $where = array(
        'id' => $id
    );
    
    $items = array($field => $dest, 'last_upload' => date("Y-m-d H:i:s"));
    
    $dbResult = $this->db->update('collateral', $items, $where);
    $result->data = array(
        'dest' => $dest
    );
    
    return $result;
  }

  /*
   * Fake Dropdown Content
   */
  public function getDropdownContent() {
    $result=  new Result();
    $select = array('id', 'name');
    $orderBy = array('name' => 'ASC');
    $dataset = $this->db->select('fakeDropdownContent', $select, $orderBy);
    
    if ($dataset) {
      $result->success = true;
      $result->code = 200;
      $result->data = $dataset;
      $result->message = 'fake dropdown content';
    } else {
      $result->code = 304;
      $result->message = 'error obtaining fake dropdown content';
    }


    return $result;    
    
  }
 
  /*
   * Collateral Types
   */
  public function getProductTypes() {
    $result=  new Result();
    $select = array('id', 'name');
    $orderBy = array('name' => 'ASC');
    $dataset = $this->db->select('collateralTypes', $select, $orderBy);
    
    if ($dataset) {
      $result->success = true;
      $result->code = 200;
      $result->data = $dataset;
      $result->message = 'product type list';
    } else {
      $result->code = 304;
      $result->message = 'error obtaining product type list';
    }


    return $result;    
    
  }
  
  
  
  /*
   * Util
   */
  private function escapeText($text) {
    //mysql_real_escape_string($unescaped_string)    
    //$result = str_replace("'", "\'", $text);
    $result = addslashes ($text);
    return $result;
  }
  
  private function getPostValue($name) {
    if (isset($_POST[$name])) {
      return htmlspecialchars($_POST[$name]);
    } else {
      return null;
    }
  }
  
}
