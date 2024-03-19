<?php

require_once __DIR__ . '/repositories/CategoryRepository.php';

$categoryRepo = new CategoryRepository;

echo json_encode($categoryRepo->getAll());
