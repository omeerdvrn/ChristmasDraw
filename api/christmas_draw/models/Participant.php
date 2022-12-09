<?php 

	class Participant{
		//db stuff
		private $conn;
		private $table = 'participants';


		//post properties
		public $id;
		public $name;
		public $pair;
		public $drawID;
		

		//constructor
		public function __construct($db){
			$this->conn = $db;
		}

		//Get func
		public function read(){
			//create query
			$query = 'SELECT
				d.id as drawID,
				p.id,
				p.name,
				p.pair,
				p.drawID
				FROM
					'.$this->table.' p
				LEFT JOIN 
					draws d ON p.drawID = d.id';

			//prepare statement
			$stmt = $this->conn->prepare($query);

			// execute
			$stmt->execute();

			return $stmt;
		} 

		//Get single post
		public function read_single(){
			//create query
			$query = 'SELECT
				d.id as drawID, 
				p.id,
				p.name,
				p.pair,
				p.drawID
				FROM
					'.$this->table.' p
				LEFT JOIN 
					draws d ON p.drawID = d.id
			WHERE p.name= ?
			LIMIT 0,1';

			
			//prepare the statement
			$stmt = $this->conn->prepare($query);
			//bind id 
			$stmt->bindParam(1, $this->name);

			//execute query
			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);

			//set properties
			$this->id = $row['id'];
			$this->pair = $row['pair'];
			$this->drawID = $row['drawID'];
		}

		//Get single post
		public function read_by_drawID(){
			//create query
			$query = 'SELECT
				d.id as drawID, 
				p.id,
				p.name,
				p.pair,
				p.drawID
				FROM
					'.$this->table.' p
				LEFT JOIN 
					draws d ON p.drawID = d.id
			WHERE p.drawID= ?';

			
			//prepare the statement
			$stmt = $this->conn->prepare($query);
			//bind id 
			$stmt->bindParam(1, $this->drawID);

			//execute query
			$stmt->execute();

			return $stmt;
		}


		//create post
		public function create(){
			$query = 'INSERT INTO ' . $this->table .'
			SET 
				name = :name,
				pair = :pair,
				drawID = :drawID';

			//prepare statement
			$stmt = $this->conn->prepare($query);

			//clean data
			$this->name = htmlspecialchars($this->name);
			$this->pair = htmlspecialchars($this->pair);
			$this->drawID = htmlspecialchars($this->drawID);


			//bind the data
			$stmt->bindParam(':name', $this->name);
			$stmt->bindParam(':pair', $this->pair);
			$stmt->bindParam(':drawID', $this->drawID);
			

			//execute query
			if ($stmt->execute()) {
				return true;
			}

			//print error if something goes wrong
			printf("Error: %s.\n", $stmt->error);
			return false;

		}

		
	}

 ?>






























