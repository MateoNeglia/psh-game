<?php

header("Access-Control-Allow-Origin: *");
require_once('connection.php');

$query = "SELECT * FROM player_statistics";

$res = mysqli_query($conn, $query);

$output = [];
while($row = mysqli_fetch_assoc($res)) {
    $output[] = $row;
}

echo json_encode($output);
?>
