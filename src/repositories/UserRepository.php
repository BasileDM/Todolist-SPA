<?php

class UserRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function getUserByMail($email) {
        $sql = "SELECT * FROM todolist_users WHERE mail = :email";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':email' => $email]);
        $user = $statement->fetch(PDO::FETCH_OBJ);
        return $user;
    }
}
