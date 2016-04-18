<?php
/**
 * Session singleton that is used to make sure that session_start() is
 * only called once.
 */
 
class Session 
{ 
    /**
     * Clear a session variable, or all session variables if no $key is
     * given
     *
     * @param mixed $key The variable to unset
     * @return bool True on success, and false on failure.
     */ 
    public function clear($key) 
    {
        if (isset($key)) {
            unset($_SESSION[$key]);
            return true;
        } else {
            return session_unset();
        }
    }
    
    /**
     * Destroy all session data and close the session by calling
     * session_destroy()
     *
     * @return bool True on success, and false on failure.
     */
    public function destroy() 
    {
        static::$instance = null;
        return session_destroy();
    }
    
    /**
     * Get session data (alias to $_SESSION[$key])
     *
     * @param mixed $key Key of the data to be retrieved
     * @return mixed Session data
     */
    public function get($key) 
    {
        if (isset($_SESSION[$key])) {
            return $_SESSION[$key];
        }
        return null;
    }
    
    /**
     * Set session data (alias to $_SESSION[$key] = $value)
     *
     * @param string $key Key of the data to be set
     * @param mixed $value Value to set to
     * @return mixed The new data
     */
    public function set($key, $value) 
    {
        $_SESSION[$key] = $value;
        return $_SESSION[$key];
    }
    
    /** Constructor */
    protected function __construct() 
    {
        if (static::$instance === null) {
            session_start();
        }
    }

    protected function __clone() 
    {
    }
    
    /**
     * Starts a session if no session exists yet. Otherwise does nothing.
     *
     * @return Session object (Singleton)
     */
    public static function start() 
    {
        if (static::$instance === null) {
            static::$instance = new static();
        }
        return static::$instance;
    }
    
    private static $instance = null;
 }
 