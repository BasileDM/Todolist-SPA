## Todolist SPA App

### About the project
This is a Single Page Application (SPA) Todolist, that allows you to :
1. Create an account on a database, modify or delete it.
2. Get your own task list, Create/Read/Update/Delete (CRUD) tasks with their prioriy, title, description, due date and categories.

The main subjects of this project were AJAX, PDO, relational database conceptualization with Entity Relationship Diagrams (CDM, LDM) and manipulation with SQL queries.

### Config.ini

Edit the config.ini file at the root of the project with your database credentials.

```php
        // config.ini file content
        // Replace 'localhost' with your Database address
        define('DB_HOST', 'localhost');
        // Replace 'todolist' with your username
        define('DB_USER', 'todolist');
        // Replace 'todolist' with your password
        define('DB_PASS', 'todolist'); 
        // Be sure this is set to FALSE when first initializing the project
        define('DB_INITIALIZED', FALSE);
```
### Migration

The app loads the TodolistSQL.sql file when first initializing the database.
This file is located in the src/migrations folder.
Make sure to edit this code if you want to modify the database structure and content.

### Default admin user

The database is initialized with a default user for testing purposes :
1. Mail : admin@admin.admin
2. Password : admin

### Useful files

1. The LDM and CDM files are available at the root of the project.

### Versions

This app was made with :
1. PHP 8.3.2
2. MySQL 5.7 (Although it can work with PHP versions from 8.x)
3. Bootstrap 5.3