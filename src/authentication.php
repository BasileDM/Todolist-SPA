<?php
session_start();
require_once __DIR__ . '/repositories/UserRepository.php';
require_once __DIR__ . '/classes/Database.php';

if (!empty(file_get_contents('php://input'))) {
    $request = json_decode(file_get_contents('php://input'));
    $sentMail = $request->email;
    $sentPass = $request->password;

    $userRepo = new UserRepository();
    $user = $userRepo->getUserByMail($sentMail);

    if(!$user) {
        header('Content-Type: x-www-form-urlencoded');
        echo json_encode('This mail is not in the database. Please register first.');
        die();
    }

    $storedPass = $user->PASSWORD;
    $passCheckResult = password_verify($sentPass, $storedPass);
    if ($passCheckResult) {
        $_SESSION['connected'] = true;
        $_SESSION['user'] = $user->FIRST_NAME;

        header('Content-Type: application/json');
        echo json_encode(true);
        die();

    } else {
        header('Content-Type: application/json');
        echo json_encode(false);
        die();
    }
} else {
    header('Content-Type: application/json');
    echo json_encode('No data');
}
