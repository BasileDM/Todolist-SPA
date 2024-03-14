<?php

if (!empty(file_get_contents('php://input'))) {
    $request = json_decode(file_get_contents('php://input'));
    $email = $request->email;
    $password = $request->password;

    header('Content-Type: application/json');
    echo json_encode($email);
}
