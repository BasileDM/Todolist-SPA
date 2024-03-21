<?php
session_start();
require_once __DIR__ . '/repositories/TaskRepository.php';
require_once __DIR__ . '/repositories/CategoryRepository.php';
require_once __DIR__ . '/classes/Task.php';



$request = json_decode(file_get_contents('php://input'), true);

$taskId = $request['id'];
$taskRepo = new TaskRepository();
$oldTask = $taskRepo->getById($taskId);
$catRepo = new CategoryRepository();
$categories = $catRepo->getByTaskId($taskId);
$categoriesArray = [];
foreach ($categories as $category) {
    array_push($categoriesArray, $category['ID_CATEGORY']);
};

$taskName = $request['title'] ? $request['title'] : $oldTask->TITLE;
$taskDescription = $request['description'] ? $request['description'] : $oldTask->DESCRIPTION;
$taskDueDate = $request['dueDate'] ? $request['dueDate'] : $oldTask->DUE_DATE;
$userId = $_SESSION['id'];
$taskPriority = $request['priority'] ? $request['priority'] : $oldTask->ID_PRIORITY;
$taskCategories = $request['categories'] ? $request['categories'] : $categoriesArray;

$newTask = new Task($taskName, $taskDescription, $taskDueDate, $userId, $taskPriority, $taskCategories, $taskId);
// print_r($newTask);
// die();
$result = $taskRepo->updateTask($newTask);

print_r($result);