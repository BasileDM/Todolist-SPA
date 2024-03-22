<?php
session_start();
require_once __DIR__ . '/classes/Task.php';
require_once __DIR__ . '/repositories/TaskRepository.php';

require_once __DIR__ . '/repositories/PriorityRepository.php';
require_once __DIR__ . '/repositories/CategoryRepository.php';

require_once __DIR__ . '/classes/Database.php';

$request = json_decode(file_get_contents('php://input'));

$priority = $request->priority;
$prioRepo = new PriorityRepository();
$priority = $prioRepo->getPriorityByName($priority);

if (empty($request->title) || strlen($request->title) < 3 || strlen($request->title) > 50) {
    echo "Title length should be between 3 and 50 characters";
    die();
}

if (strlen($request->description) < 3 || strlen($request->description) > 255) {
    echo "Description length should be between 3 and 255 characters";
    die();
}

if(empty($request->dueDate)) {
    echo "A date is required";
    die();
}

if(empty($request->priority)) {
    echo "Please select a priority";
    die();
}

$title = htmlspecialchars($request->title);
$description = htmlspecialchars($request->description);
$dueDate = $request->dueDate;
$id_user = $_SESSION['id'];
$id_priority = $priority->ID;
$categories = $request->categories;

$task = new Task($title, $description, $dueDate, $id_user, $id_priority, $categories);

try {
    $taskRepo = new TaskRepository();
    $taskRepo->create($task);
    echo 'success';
} catch (\Exception $e) {
    echo $e->getMessage();
    die();
}
?>