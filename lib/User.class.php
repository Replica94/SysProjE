<?php
/**
 * User class. Handles authentication etc.
 */

require_once(__DIR__ . "/dao/UserDAO.class.php");
require_once(__DIR__ . "/util.functions.php");
 
class User 
{
    private $loggedIn = false;
    private $username = null;
    
    /** 
     * Attempts to login with username and password.
     * 
     * @param $username Username
     * @param $password Password
     * @return True if login was successful, or false otherwise.
     */
    public function login($username, $password) 
    {
        $dao = new UserDAO();
        if ($dao->userExists($username)) {
            $pwhash = $dao->getPassword($username);
            if (pw_verify($password, $pwhash)) {
                $this->loggedIn = true;
                $this->username = $username;
                return true;
            }
        }
        return false;
    }
    
    /**
     * Attempts to login with an auth token.
     *
     * @return True if the login was successful, or false otherwise.
     */ 
    public function loginWithToken($token) 
    {
        $parts = explode(':', $token);
        $selector = $parts[0];
        $token = $parts[1];
        $dao = new UserDAO();
        $row = $dao->getAuthToken($selector);
        if ($row != false) {
            $username = $row["username"];
            $dbtoken = $row["token"];
            // TODO: hash comparison vulnerable to timing attacks
            if ($dbtoken == hash("sha256", base64_decode($token))) {
                $dao->removeToken($selector, $dbtoken);
                $this->username = $username;
                $this->loggedIn = true;
                return true;
            }
        }
        return false;
    }
    
    /**
     * Generates a new auth token for the user and inserts it into the database.
     *
     * @param $expiry Expiration time of the token as a UNIX timestamp
     * @return New auth token, or null if the operation failed.
     */
    public function generateToken($expiry) 
    {
        $selector = base64_encode(openssl_random_pseudo_bytes(9));
        $authenticator = openssl_random_pseudo_bytes(33);
        $dao = new UserDAO();
        if ($dao->addToken($this->username, $selector, hash('sha256', $authenticator), $expiry)) {
            return $selector . ':' . base64_encode($authenticator);
        }
        return null;
    }
    
    /**
     * Check if the user is logged in.
     * 
     * @return True if the user is logged in, or false otherwise.
     */
    public function loggedIn() 
    {
        return $this->loggedIn;
    }
    
    /**
     * Get the user's username.
     *
     * @return Username
     */
    public function getUsername() 
    {
        return $this->username;
    }
}
