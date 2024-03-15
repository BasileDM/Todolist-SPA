<?php

session_start();
$_SESSION['connected'] = false;
session_destroy();

echo 'Session Status : ' . $_SESSION['connected'];
exit();