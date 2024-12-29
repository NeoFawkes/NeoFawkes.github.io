<?php
class Connection {
	private $connection;
	private $hostname = "localhost";
	private $user = "imtest";
	private $password = "";
	private $database = "instagram";

	public function __construct() {
		$this->connection = new mysqli($this->hostname, $this->user, $this->password, $this->database);
		if($this->connection->connect_error) die("Connection error: " . $this->connection->connect_error);
	}

	public function closeConnection() {
		$this->connection->close();
	}

	public function getConnection() {
		return $this->connection;
	}

	public function getUser() {
		return $this->user;
	}

	public function getDatabase() {
		return $this->database;
	}
}
?>
