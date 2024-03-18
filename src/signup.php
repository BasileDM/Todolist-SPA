<?php
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

if ($password !== $passwordConfirm) {
    echo 'Error: passwords do not match';
    exit();
}

$password = password_hash($password, PASSWORD_DEFAULT);

$response = json_encode(array('firstName' => $firstName, 'lastName' => $lastName, 'mail' => $mail, 'password' => $password));

echo $response;