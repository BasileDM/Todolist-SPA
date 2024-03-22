<?php
session_start();
require_once __DIR__ . '/repositories/TaskRepository.php';
require_once __DIR__ . '/repositories/CategoryRepository.php';
require_once __DIR__ . '/repositories/PriorityRepository.php';
require_once __DIR__ . '/classes/Task.php';

$request = json_decode(file_get_contents('php://input'), true);

if(!empty($request['title'])) {
    if(strlen($request['title']) < 3 || strlen($request['title']) > 50) {
        echo "Title must be between 3 and 50 characters";
        exit();
    }
}

if(!empty($request['description'])) {
    if(strlen($request['description']) < 3 || strlen($request['description']) > 255) {
        echo "Description must be between 3 and 255 characters";
        exit();
    }
}

$taskId = $request['id'];
$taskRepo = new TaskRepository();
$oldTask = $taskRepo->getById($taskId);
$catRepo = new CategoryRepository();
$categories = $catRepo->getByTaskId($taskId);
$categoriesArray = [];
foreach ($categories as $category) {
    array_push($categoriesArray, $category['ID_CATEGORY']);
};
$priorityRepo = new PriorityRepository();
$newPriority = $priorityRepo->getPriorityByName($request['priority']);

// Check if a field was edited and if not set to old value
$taskName = $request['title'] ? $request['title'] : $oldTask->TITLE;
$taskDescription = $request['description'] ? $request['description'] : $oldTask->DESCRIPTION;
$taskDueDate = $request['dueDate'] ? $request['dueDate'] : $oldTask->DUE_DATE;
$userId = $_SESSION['id'];
$taskPriority = $request['priority'] ? $newPriority->ID : $oldTask->ID_PRIORITY;
$taskCategories = $request['categories'] ? $request['categories'] : $categoriesArray;

$newTask = new Task($taskName, $taskDescription, $taskDueDate, $userId, $taskPriority, $taskCategories, $taskId);

$result = $taskRepo->updateTask($newTask);

echo 'success';