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

// $categories = $request->categories;
// $catRepo = new CategoryRepository();
// foreach ($categories as $category) {
//     $category = $catRepo->getById($category);
//     $id_category = $category->ID;
// }

$title = htmlspecialchars($request->title);
$description = htmlspecialchars($request->description);
$dueDate = $request->dueDate;
$id_user = $_SESSION['id'];
$id_priority = $priority->ID;

$task = new Task($title, $description, $dueDate, $id_user, $id_priority);

try {
    $taskRepo = new TaskRepository();
    $taskRepo->create($task);
} catch (\Exception $e) {
    echo $e->getMessage();
}
?>