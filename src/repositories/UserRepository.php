<?php

class UserRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function createUser($firstName, $lastName, $mail, $password) {
        $sql = "INSERT INTO todolist_users (firstName, lastName, mail, password) VALUES (:firstName, :lastName, :mail, :password)";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([
            ':firstName' => $firstName,
            ':lastName' => $lastName,
            ':mail' => $mail,
            ':password' => password_hash($password, PASSWORD_DEFAULT)
        ]);
    }

    public function getUserByMail($email) {
        $sql = "SELECT * FROM todolist_users WHERE mail = :email";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':email' => $email]);
        $user = $statement->fetch(PDO::FETCH_OBJ);
        return $user;
    }
}
