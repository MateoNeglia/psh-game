-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `psh_game_db` DEFAULT CHARACTER SET utf8mb4 ;
USE `psh_game_db` ;

CREATE TABLE IF NOT EXISTS `psh_game_db`.`player_statistics` (
    stat_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(255),
    nickname VARCHAR(255),
    profile_image VARCHAR(255),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score INT
);
