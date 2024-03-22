<?php
session_start();
require_once __DIR__ . '/repositories/UserRepository.php';
require_once __DIR__ . '/classes/User.php';

$request = json_decode(file_get_contents('php://input'), true);

$userMail = $_SESSION['user'];
$userRepo = new UserRepository();
$oldInfo = $userRepo->getUserByMail($userMail);

if ($request['newPass'] != $request['confirmPass']) {
    echo 'Passwords do not match';
    die();
}

if ($request['currentPass'] != null && !password_verify($request['currentPass'], $oldInfo->PASSWORD)) {
    echo 'Wrong password';
    die();
}

// Check if a field was edited and if not set to old value
$newFirstName = $request['firstName'] ? $request['firstName'] : $oldInfo->FIRST_NAME;
$newLastName = $request['lastName'] ? $request['lastName'] : $oldInfo->LAST_NAME;
$newPassword = $request['newPass'] ? password_hash($request['newPass'], PASSWORD_DEFAULT) : $oldInfo->PASSWORD;
$newMail = $request['email'] ? $request['email'] : $oldInfo->MAIL;

$newUser = new User($newLastName, $newFirstName, $newMail, $newPassword, $_SESSION['id']);
$result = $userRepo->updateUser($newUser);
echo 'success';
