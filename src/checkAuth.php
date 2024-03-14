<?php

session_start();

if (isset($_SESSION['connected']) && $_SESSION['connected'] === true) {
    echo 'true';
} else {
    echo 'false';
}
