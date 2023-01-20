<?php 

	//Headers
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,
			Access-Control-Allow-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/Participant.php';

	//Instantiate DB and connect
	$database = new Database();
	$db = $database->connect();

	//Instantiate participant object
	$participant = new Participant($db);

	//get the raw posted data
	$data = json_decode(file_get_contents("php://input"));
	if($data === null){
		return;
	}

	$participant->name = $data->name;
	$participant->pair = $data->pair;
	$participant->drawID = $data->drawID;

	//Create participant
	if($participant->create()) {
		echo json_encode(
			array('message' => 'Post Created')
			);
	} else {
		echo json_encode(
			array('message' => 'Post Not Created')
			);
	}

 ?>