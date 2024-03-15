<?php
session_start();

function loadClasses($filename) {
    if(file_exists(__DIR__ . "/classes/" . $filename . ".php")) {
        require __DIR__ . "/classes/" . $filename . ".php";
    } elseif (file_exists(__DIR__ . "/repositories/" . $filename . ".php")) {
        require __DIR__ . "/repositories/" . $filename . ".php";
    }
}

spl_autoload_register('loadClasses');

require_once __DIR__ . "/../config.php";
if (DB_INITIALIZED == FALSE) {
    $db = new Database();
    echo $db->initializeDb();
}