# Todolist SPA App

## Config.ini

Edit the config.ini file at the root of the project with your database credentials.

```php
<?php
        define('DB_HOST', 'localhost'); // Database path
        define('DB_NAME', 'todolist'); // Replace 'todolist' with your database name
        define('DB_USER', 'todolist'); // Replace 'todolist' with your username
        define('DB_PASS', 'todolist'); // Replace 'todolist' with your password
        define('DB_INITIALIZED', FALSE); // Be sure this is set to FALSE when first initializing the project
```
## Default admin user

The database is initialized with a default user for testing purposes :
1. Mail : admin@admin.admin
2. Password : admin

## Useful files

1. The LDM and CDM files are available at the root of the project.