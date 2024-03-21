<?php
require_once __DIR__ . '/repositories/TaskRepository.php';

$request = json_decode(file_get_contents('php://input'), true);
$taskId = $request['id'];
$taskRepo = new TaskRepository();

$taskRepo->deleteTask($taskId);

