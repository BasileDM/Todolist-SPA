<?php

class PriorityRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function getPriorities() {
        $sql = "SELECT * FROM todolist_priorities";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute();
        $priorities = $statement->fetchAll(PDO::FETCH_OBJ);
        return $priorities;
    }

    public function getPriorityById($id) {
        $sql = "SELECT * FROM todolist_priorities WHERE id = :id";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':id' => $id]);
        $priority = $statement->fetch(PDO::FETCH_OBJ);
        return $priority;
    }

    public function getPriorityByName($name) {
        $sql = "SELECT * FROM todolist_priorities WHERE name = :name";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':name' => $name]);
        $priority = $statement->fetch(PDO::FETCH_OBJ);
        return $priority;
    }
}