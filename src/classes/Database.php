<?php

final class Database {
    private $config;
    private $connection;

    public function __construct() {
        $this->config = __DIR__ . '/../../config.php';
        require_once $this->config;
        $this->connect();
    }

    public function getConfig() {
        return $this->config;
    }

    private function connect() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
            $this->connection = new \PDO($dsn, DB_USER, DB_PASS);
        } catch (\PDOException $error) {
            echo '<script type="text/javascript">displayToast("Database error", "Couldn\'t connect to the database.", "error");</script>';
            die();
        }
    }

    public function getConnection() {
        return $this->connection;
    }

    public function doesUsersTableExist() {
        $sql = "SHOW TABLES LIKE 'todolist_users';";
        $return = $this->connection->query($sql)->fetchAll(\PDO::FETCH_OBJ);
        if ($return && $return[0] == "todolist_users") {
            return true;
        } else {
            return false;
        }
    }

    public function initializeDb() {
        if ($this->doesUsersTableExist()) {
            return "Database seems to be already initialized.";
            die();
        }

        try {
            $sql = file_get_contents(__DIR__ . '/../migrations/TodolistSQL.sql');
            $this->connection->query($sql);

            if ($this->updateConfig()) {
                return "Database initialization successful.";
                die();
            } else {
                return "Database initialization failed.";
                die();
            }

        } catch (\PDOException $error) {
            return "Can't initialize database: " . $error->getMessage();
            die();
        }
    }

    public function updateConfig() {
        $configStream = fopen($this->config, 'w');
        $content = "<?php
        define('DB_HOST', '" . DB_HOST . "');
        define('DB_NAME', '" . DB_NAME . "');
        define('DB_USER', '" . DB_USER . "');
        define('DB_PASS', '" . DB_PASS . "');
        define('DB_INITIALIZED', TRUE);";

        if (fwrite($configStream, $content)) {
            fclose($configStream);
            return true;
        } else {
            return false;
        }
    }
}
