<?php
session_start();
require_once __DIR__ . '/repositories/UserRepository.php';

$userId = $_SESSION['id'];
$userRepository = new UserRepository();
if ($userRepository->deleteUser($userId) == "success") {
    session_destroy();
    echo 'success';
} else {
    echo 'error';
}