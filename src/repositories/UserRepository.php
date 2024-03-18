<?php

class UserRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function createUser($lastName, $firstName, $mail, $password) {
        $sql = "INSERT INTO todolist_users (LAST_NAME, FIRST_NAME, MAIL, PASSWORD) VALUES (:lastName, :firstName, :mail, :password)";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([
            ':lastName' => $lastName,
            ':firstName' => $firstName,
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
