<?php
session_start();
require_once __DIR__ . '/repositories/UserRepository.php';
require_once __DIR__ . '/classes/Database.php';


$request = json_decode(file_get_contents('php://input'));

if (!empty($request->email) && !empty($request->password)) {
    $sentMail = $request->email;
    $sentPass = $request->password;

    try {
        $userRepo = new UserRepository();
        $user = $userRepo->getUserByMail($sentMail);
    } catch (\Exception $error) {
        header('Content-Type: application/json');
        echo json_encode($error->getMessage());
        die();
    }



    if(!$user) {
        header('Content-Type: x-www-form-urlencoded');
        echo json_encode('This mail is not in the database. Please register first.');
        die();
    }

    $storedPass = $user->PASSWORD;
    $passCheckResult = password_verify($sentPass, $storedPass);
    if ($passCheckResult) {
        $_SESSION['connected'] = true;
        $_SESSION['user'] = $user->MAIL;
        $_SESSION['id'] = $user->ID;

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
    echo json_encode("empty");
    die();
}
