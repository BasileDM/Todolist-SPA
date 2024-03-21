<?php

require_once __DIR__ . '/../classes/Database.php';

class CategoryRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function getAll() {
        $sql = "SELECT * FROM todolist_categories";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute();
        $categories = $statement->fetchAll(\PDO::FETCH_OBJ);
        return $categories;
    }

    public function getById($id) {
        $sql = "SELECT * FROM todolist_categories WHERE id = :id";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':id' => $id]);
        $category = $statement->fetch(\PDO::FETCH_OBJ);
        return $category;
    }

    public function getByTaskId($taskId) {
        $sql = "SELECT * FROM todolist_relation_tasks_categories WHERE ID_TASK = :taskId";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':taskId' => $taskId]);
        $categories = $statement->fetchAll(\PDO::FETCH_ASSOC);
        return $categories;
    }

}