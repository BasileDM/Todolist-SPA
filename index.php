<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets//css/style.css">
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <title>TodoList</title>
</head>

<body>
    <?php
    include './components/header.html';
    include './components/toast.html';
    ?>
    <main class="w-100"></main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="/assets/js/task-list.js" type="module"></script>
    <script src="/assets/js/display.js" type="module"></script>
    <script src="/assets/js/auth.js" type="module"></script>
    <script src="/assets/js/signup-form.js" type="module"></script>
    <script src="/assets/js/app.js" type="module"></script>
</body>

<?php 
require_once 'src/init.php';
?>

</html>