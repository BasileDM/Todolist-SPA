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

}