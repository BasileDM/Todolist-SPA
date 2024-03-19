<?php

class TaskRepository {
    private $dbConnection;

    public function __construct() {
        $database = new Database;
        $this->dbConnection = $database->getConnection();
    }

    public function create($newTask) {
        $sql = "INSERT INTO todolist_tasks (TITLE, DESCRIPTION, DUE_DATE, ID_USER, ID_PRIORITY) VALUES (?, ?, ?, ?, ?)";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([
            $newTask->getTitle(),
            $newTask->getDescription(),
            $newTask->getDueDate(),
            $newTask->getIdUser(),
            $newTask->getIdPriority()
        ]);
        $sqlRelations = "INSERT INTO todolist_relation_tasks_categories (ID, ID_TASK) VALUES (?, ?)";
        $statement = $this->dbConnection->prepare($sqlRelations);
        foreach ($newTask->getCategories() as $category) {
            $statement->execute([
                $this->dbConnection->lastInsertId(),
                $category
            ]);
        }
    }

    // Get all tasks by ID_USER
    public function getTasksByUser($id_user) {
        $sql = "SELECT * FROM todolist_tasks WHERE ID_USER = :id_user";
        $statement = $this->dbConnection->prepare($sql);
        $statement->execute([':id_user' => $id_user]);
        $tasks = $statement->fetchAll(\PDO::FETCH_OBJ);
        return $tasks;
    }
}