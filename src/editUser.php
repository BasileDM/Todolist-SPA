<?php
session_start();
require_once __DIR__ . '/repositories/UserRepository.php';
require_once __DIR__ . '/classes/User.php';

$request = json_decode(file_get_contents('php://input'), true);

$userMail = $_SESSION['user'];
$userRepo = new UserRepository();
$oldInfo = $userRepo->getUserByMail($userMail);

if (!empty($request['firstName'])) {
    if(strlen($request['firstName']) > 50 || strlen($request['firstName']) < 3) {
        echo 'First name must be between 3 and 50 characters';
        die();   
    }
}

if (!empty($request['lastName'])) {
    if(strlen($request['lastName']) > 50 || strlen($request['lastName']) < 3) {
        echo 'Last name must be between 3 and 50 characters';
        die();   
    }
}

if(!empty($request['email'])) {
    if (!filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email format';
        die();
    }
}


if ($request['newPass'] != $request['confirmPass']) {
    echo 'Passwords do not match';
    die();
}

if ($request['currentPass'] != null && !password_verify($request['currentPass'], $oldInfo->PASSWORD)) {
    echo 'Wrong password';
    die();
}

// Check if a field was edited and if not set to old value
$newFirstName = $request['firstName'] ? htmlspecialchars($request['firstName']) : $oldInfo->FIRST_NAME;
$newLastName = $request['lastName'] ? htmlspecialchars($request['lastName']) : $oldInfo->LAST_NAME;
$newPassword = $request['newPass'] ? password_hash($request['newPass'], PASSWORD_DEFAULT) : $oldInfo->PASSWORD;
$newMail = $request['email'] ? $request['email'] : $oldInfo->MAIL;

$newUser = new User($newLastName, $newFirstName, $newMail, $newPassword, $_SESSION['id']);
$result = $userRepo->updateUser($newUser);
echo 'success';
