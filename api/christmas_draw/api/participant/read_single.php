<?php 

	//Headers
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../../config/Database.php';
	include_once '../../models/Participant.php';

	//Instantiate DB and connect
	$database = new Database();
	$db = $database->connect();

	//Instantiate blog post object
	$participant = new Participant($db);

	//get id from url
	$participant->name = isset($_GET['name'])?$_GET['name']:die();

	//get post
	$participant->read_single();

	//create array
	$participant_arr = array(
		'id'=> $participant->id,
		'name'=> $participant->name,
		'pair'=> $participant->pair,
		'drawID'=>$participant->drawID
	);

	//Make JSON
	print_r(json_encode($participant_arr));
?>