<?php

final class User {
    private $lastName;
    private $firstName;
    private $mail;
    private $password;

    public function __construct($lastName, $firstName, $mail, $password) {
        $this->lastName = $lastName;
        $this->firstName = $firstName;
        $this->mail = $mail;
        $this->password = $password;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }

    public function getMail() {
        return $this->mail;
    }

    public function setMail($mail) {
        $this->mail = $mail;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

}