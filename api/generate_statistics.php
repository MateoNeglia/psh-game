<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('America/Argentina/Buenos_Aires');

require_once('connection.php');

$sql = "CREATE SCHEMA IF NOT EXISTS `psh_game_db` DEFAULT CHARACTER SET utf8mb4";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating database: " . $conn->error;
}

$sql = "CREATE TABLE IF NOT EXISTS `player_statistics` (
    stat_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(255),
    nickname VARCHAR(255),
    profile_image VARCHAR(255),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score INT
)";
if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}

function generateRandomStatistics($conn) {
    $numUsers = mt_rand(0, 10);
    $lastUser = null;
    $timestamp = null;

    for ($i = 0; $i < $numUsers; $i++) {
        $url = 'https://randomuser.me/api';
        $data = file_get_contents($url);
        $userData = json_decode($data, true);

        $user = $userData['results'][0];
        $player_id = $user['login']['uuid'];
        $nickname = $user['login']['username'];
        $profileImage = $user['picture']['large'];
        $score = mt_rand(1, 100);

        $sql = "INSERT INTO player_statistics (player_id, nickname, profile_image, score) VALUES ('$player_id', '$nickname', '$profileImage', $score)";

        if ($conn->query($sql) === TRUE) {
            $lastUser = $user;
            $timestamp = date('Y-m-d H:i:s');
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    $response = array(
        'lastUser' => $lastUser,
        'timestamp' => $timestamp
    );

    return json_encode($response);
}

echo generateRandomStatistics($conn);
?>
