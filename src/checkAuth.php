<?php
session_start();

if (isset($_SESSION['connected']) && $_SESSION['connected'] === true) {
    echo 'true';
    exit();
} else {
    echo 'false';
    exit();
}
