<?php
require_once __DIR__ . '/repositories/UserRepository.php';
require_once __DIR__ . '/classes/User.php';
require_once __DIR__ . '/classes/Database.php';

$request = json_decode(file_get_contents('php://input'));

$lastName = htmlspecialchars($request->lastName);
$firstName = htmlspecialchars($request->firstName);
$mail = $request->mail;
$password = $request->password;
$passwordConfirm = $request->passwordConfirm;

if (empty($lastName) || empty($mail) || empty($password) || empty($passwordConfirm)) {
    echo 'Error: 1';
    exit();
}

if (strlen($lastName) < 3 || strlen($lastName) > 50) {
    echo 'Error: 2';
    exit();
}

if (!empty($firstName) && strlen($firstName) < 3 || strlen($firstName) > 50) {
    echo 'Error: 3';
    exit();
}

if (strlen($mail) < 3 || strlen($mail) > 80) {
    echo 'Error: 4';
    exit();
}

if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    echo 'Error: 5';
    exit();
}

if (strlen($password) < 7 || strlen($password) > 99) {
    echo 'Error: 6';
    exit();
}

if ($password !== $passwordConfirm) {
    echo 'Error: 7';
    exit();
}

$userRepository = new UserRepository();
if ($userRepository->getUserByMail($mail)) {
    echo 'Error: 8';
    exit();
}

$newUser = new User($lastName, $firstName, $mail, $password);
try {
    $userRepository->create($newUser);
    echo 'success';
} catch (Exception $e) {
    echo $e->getMessage();
    exit();
}