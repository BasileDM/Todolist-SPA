<?php
session_start();
require_once __DIR__ . './repositories/UserRepository.php';

$userId = $_SESSION['id'];
$userRepository = new UserRepository();
$userRepository->deleteUser($userId);