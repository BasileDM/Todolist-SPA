<?php
session_start();
require_once __DIR__ . '/repositories/UserRepository.php';
$userrepo = new UserRepository();
echo json_encode($userrepo->getUserByMail($_SESSION['user']));