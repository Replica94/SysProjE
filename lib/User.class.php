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
    private $guest = false;
    
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

    /**
     * Set the user's guest state.
     *
     * @param $state Set to true if the user is a guest, or to false otherwise.
     */
    public function setGuest($state) 
    {
        $this->guest = $state;
        if ($state) {
            $this->username = "guest";
            $this->loggedIn = true;
        }
    }
    
    /** 
     * Save a score.
     *
     * @param $score Score to save
     * @param $difficulty Difficulty as an integer (EASY=1, MEDIUM=2, ...)
     */
    public function saveScore($score, $difficulty=1)
    {
        if ($this->loggedIn && !$this->guest) {
            $dao = new UserDAO();
            $dao->saveScore($this->username, $score, $difficulty);
        }
    }

    /**
     * Gets the user's highscore for the given difficulty, or all difficulties
     * if no difficulty given.
     *
     * @param $difficulty Difficulty to get highscore for, or null for all difficulties.
     * @return Highscore for the given difficulty, or an array with difficulty as 
     *         the key and score as value for multiple difficulties. Returns 0 for
     *         guests and those not logged in.
     */
    public function getHighScore($difficulty=null) {
        if ($this->loggedIn && !$this->guest) {
            $dao = new UserDAO();
            $res = $dao->getUserHighScore($this->username, $difficulty);
            if ($res === null) {
                return 0;
            }
            if (is_array($res)) {
                $ret = array();
                foreach ($res as $key => $value) {
                    $ret[$value["difficulty"]] = $value["highscore"];
                }
                return $ret;
            }
            else {
                return $res;
            }
        }
        return array();
    }
    
    /**
     * Check whether the user is a guest or not.
     *
     * @return True if the user is a guest, or false otherwise.
     */
    public function isGuest() 
    {
        return $this->guest;
    }
    
    /**
     * Gets best scores and scores for a given difficulty.
     *
     * @param $difficulty Difficulty (default=1)
     * @param $num Number of highest scores to get
     * @return Array with highscores (each row is of format: $user => $score), ordered from highest to lowest
     */
    public static function getHallOfFame($difficulty=1, $num=10)
    {
        $dao = new UserDAO();
        $rv = array();
        foreach ($dao->getHallOfFame($difficulty, $num) as $key => $value) {
            $rv[] = array("highscore" => $value["highscore"], "username" => $value["username"]);
        }
        return $rv;
    }
}
