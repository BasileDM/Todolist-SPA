<?php
session_start();
require_once __DIR__ . '/repositories/TaskRepository.php';

$userId = $_SESSION['id'];
$taskRepo = new TaskRepository();
echo json_encode($taskRepo->getTasksByUser($userId));