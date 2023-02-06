<?php

	/*header("Content-type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	//header("Access-Control-Allow-Headers: X-Requested-With");
	header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");*/

	header("Content-type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept');



	$_PUT = array();
	if (!strcasecmp($_SERVER['REQUEST_METHOD'], 'PUT')) {
		parse_str(file_get_contents('php://input'), $_PUT);
	}

	$_DELETE = array();
	if (!strcasecmp($_SERVER['REQUEST_METHOD'], 'DELETE')) {
		parse_str(file_get_contents('php://input'), $_DELETE);
	}