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

    public function updateUser($user) {
        $sql = "UPDATE todolist_users SET LAST_NAME = ?, FIRST_NAME = ?, PASSWORD = ?, MAIL = ? WHERE ID = ?";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([
            $user->getLastName(),
            $user->getFirstName(),
            $user->getPassword(),
            $user->getMail(),
            $user->getId()
        ]);
        return $user;
    }

    public function deleteUser($id) {
        // the $sql request has to first delete all the relation task categories then all the task and then the user
        $sql = "DELETE FROM todolist_task_categories WHERE USER_ID = ?; 
                DELETE FROM todolist_tasks WHERE USER_ID = ?; 
                DELETE FROM todolist_users WHERE ID = ?;";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([$_SESSION['id']]);
    }
}
