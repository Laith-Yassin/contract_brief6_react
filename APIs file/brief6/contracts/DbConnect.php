<?php
    class DbConnect {
        private $server = 'localhost';
        private $dbname = 'contract_breif'; //contract_breif
        private $user = 'root';
        private $pass = '';
 
        public function connect() {
            try {
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo 'hello';
                return $conn;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
        }
         
    }
?>