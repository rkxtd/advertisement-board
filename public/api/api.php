<?php
require __DIR__ . '/../../server/utils/db.php';
require __DIR__ . '/../../server/utils/RestServer/RestServer.php';
require __DIR__ . '/../../server/controllers/UsersController.php';
require __DIR__ . '/../../server/controllers/CategoriesController.php';
require __DIR__ . '/../../server/controllers/AdvertisementsController.php';
require __DIR__ . '/../../server/controllers/AttachmentsController.php';
require __DIR__ . '/../../server/config.php';

Db::getInstance('mysql', CONFIG_MYSQL_HOST, CONFIG_MYSQL_DB, CONFIG_MYSQL_USER, CONFIG_MYSQL_PASS);

$server = new \RestServer\RestServer();
$server->addClass('UsersController', '/users');
$server->addClass('CategoriesController', '/categories');
$server->addClass('AttachmentsController', '/attachments');
$server->addClass('AdvertisementsController', '/advertisements');
$server->handle();
