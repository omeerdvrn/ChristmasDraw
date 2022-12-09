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
	$participant->drawID = isset($_GET['drawID'])?$_GET['drawID']:die();

	//get post
	$result = $participant->read_by_drawID();

	//Get row count
	$num = $result->rowCount();

	//Check if any posts
	if ($num > 0) {
		// Post array
		$participants_arr = array();
		$participants_arr['data'] = array();

		while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
		 	extract($row);

		 	$participant_item = array(
		 		'id' => $id,
		 		'name' => $name,
		 		'pair' => html_entity_decode($pair),
		 		'drawID' => $drawID,
		 	);

		 	//push to "data"
		 	array_push($participants_arr['data'], $participant_item);

		 } 

		 //turn to json and output
		 echo json_encode($participants_arr);
	}
	else{
		//No posts
		echo json_encode(array('message' => 'No Participants Found'));
	}
?>