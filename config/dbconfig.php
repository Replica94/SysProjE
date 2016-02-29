<?php
// Application database
$appdb['host'] = getenv('DATABASE_HOST');
$appdb['port'] = getenv('DATABASE_PORT');
$appdb['username'] = getenv('DATABASE_USERNAME');
$appdb['password'] = getenv('DATABASE_PASSWORD');
$appdb['database'] = getenv('DATABASE_DATABASE');

// Medical database
$drugdb['host'] = getenv('DRUGDB_HOST');
$drugdb['port'] = getenv('DRUGDB_PORT');
$drugdb['username'] = getenv('DRUGDB_USERNAME');
$drugdb['password'] = getenv('DRUGDB_PASSWORD');
$drugdb['database'] = getenv('DRUGDB_DATABASE');
