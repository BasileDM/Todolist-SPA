<?php
require_once __DIR__ . '/../classes/Database.php';

class UserRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function create($newUser) {
        $sql = "INSERT INTO todolist_users (LAST_NAME, FIRST_NAME, MAIL, PASSWORD) VALUES (?, ?, ?, ?)";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([
            $newUser->getLastName(),
            $newUser->getFirstName(),
            $newUser->getMail(),
            password_hash($newUser->getPassword(), PASSWORD_DEFAULT)
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
