<?php
require_once __DIR__ . '/repositories/UserRepository.php';
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

if (strlen($password) < 7) {
    echo 'Error: 2';
    exit();
}

if ($password !== $passwordConfirm) {
    echo 'Error: 3';
    exit();
}

if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    echo 'Error: 4';
    exit();
}

$userRepository = new UserRepository();
try {
    $userRepository->createUser($lastName, $firstName, $mail, $password);
    echo 'success';
} catch (Exception $e) {
    echo $e->getMessage();
}