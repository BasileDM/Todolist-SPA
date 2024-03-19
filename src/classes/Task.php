<?php

final class Task{
    private $title;
    private $description;
    private $due_date;
    private $id_user;
    private $id_priority;
    private $categories;

    public function __construct($title, $description, $due_date, $id_user, $id_priority, $categories) {
        $this->title = $title;
        $this->description = $description;
        $this->due_date = $due_date;
        $this->id_user = $id_user;
        $this->id_priority = $id_priority;
        $this->categories = $categories;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getDueDate() {
        return $this->due_date;
    }

    public function getIdUser() {
        return $this->id_user;
    }

    public function getIdPriority() {
        return $this->id_priority;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setDueDate($due_date) {
        $this->due_date = $due_date;
    }

    public function setIdUser($id_user) {
        $this->id_user = $id_user;
    }

    public function setIdPriority($id_priority) {
        $this->id_priority = $id_priority;
    }

    public function getCategories() {
        return $this->categories;
    }

    public function setCategories($categories) {
        $this->categories = $categories;
    }
}
