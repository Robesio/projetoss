<?php

	require("../process/process.tbalimentos.php");

	include("configs.php");

	$tp = new TbalimentosProcess();

	switch($_SERVER['REQUEST_METHOD']) {
		case "GET":
			$tp->doGet($_GET);
			break;

		case "POST":
			$tp->doPost($_POST);
			break;

		case "PUT":
			$tp->doPut($_PUT);
			break;

		case "DELETE":
			$tp->doDelete($_DELETE);
			break;
	}