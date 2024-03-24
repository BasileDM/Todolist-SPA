<?php
if(!isset($_SESSION['connected'])) {
    $_SESSION['connected'] = false;
    $_SESSION['user'] = null;
}

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
    if($db->initializeDb() == "Database initialization successful.") {
        echo '<script type="module">import { displayToast } from "./assets/js/display.js";displayToast("Database initialized", "A new database has been created.", "success");</script>';
        die();

    } elseif ($db->initializeDb() == "Database seems to be already initialized.") {
        echo '<script type="module">import { displayToast } from "./assets/js/display.js";displayToast("Database detected", "The database seems to be already initialized.", "success");</script>';
        die();
        
    } else {
        echo '<script type="module">import { displayToast } from "./assets/js/display.js";displayToast("Database initialization failed", "A new database could not be created.", "error");</script>';
        die();
    }
}