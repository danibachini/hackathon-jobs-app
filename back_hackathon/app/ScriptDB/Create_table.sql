
BEGIN;

CREATE TABLE users (
    `id`                        TINYINT AUTO_INCREMENT PRIMARY KEY,
    `first_name`                TINYTEXT NOT NULL,
    `last_name`                 TINYTEXT NOT NULL,
    `email`                     VARCHAR(255) NOT NULL UNIQUE,
    `password`                  VARCHAR(60) NOT NULL UNIQUE,
    `profile`                   ENUM ('candidate', 'company', 'admin')
);

CREATE TABLE candidate (
    `id`                        TINYINT AUTO_INCREMENT PRIMARY KEY,
    `bio`                       TEXT,
    `link_github`               VARCHAR(255) UNIQUE, 
    `link_linkedin`             VARCHAR(255) UNIQUE, 
    `link_portfolio`            VARCHAR(255) UNIQUE, 
    `link_dailydev`             VARCHAR(255) UNIQUE, 
    `link_other`                VARCHAR(255) UNIQUE, 
    `tree_id`                   TINYINT,
    `user_id`                   TINYINT,
    FOREIGN KEY (tree_id)       REFERENCES trees(id),
    FOREIGN KEY (user_id)       REFERENCES users(id)
);

CREATE TABLE recruiter (
    `id`                        TINYINT AUTO_INCREMENT PRIMARY KEY,
    `name_entity`               TINYTEXT NOT NULL,
    `user_id`                   TINYINT,
    FOREIGN KEY (user_id)       REFERENCES users(id)
);

CREATE TABLE trees (
    `id`                        TINYINT AUTO_INCREMENT PRIMARY KEY,
    `task_position`             TINYINT, 
    `task_id`                   TINYINT,
    `user_id`                   TINYINT,
    FOREIGN KEY (task_id)       REFERENCES tasks(id),
    FOREIGN KEY (user_id)       REFERENCES users(id)
);

CREATE TABLE tasks (
    `id`                        TINYINT AUTO_INCREMENT PRIMARY KEY,
    `name`                      TEXT NOT NULL,
    `task_description`          TEXT NOT NULL,
    `level`                     TINYINT NOT NULL,
    `duration`                  TIME NOT NULL,
    `finished`                  BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (trees)         REFERENCES trees(id)
);

COMMIT;

DELIMITER //

CREATE PROCEDURE insert_user(
    IN new_user JSON
)
BEGIN
    DECLARE user_id INT;
    DECLARE user_profile_value VARCHAR(20);

    -- Insère les valeurs firstname, lastname, email et password du JSON d'entrée dans la table user.
    INSERT INTO user (
        first_name,
        last_name,
        email,
        password
    )
    VALUES (
        JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.first_name')),
        JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.last_name')),
        JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.email')),
        JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.password'))
    );

    -- Récupère la valeur du rôle depuis le JSON d'entrée
    SET user_profile_value = JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.role'));

    -- Récupère l'ID de l'utilisateur inséré
    SET user_id = LAST_INSERT_ID();

    IF user_profile_value IS NOT NULL THEN
        CASE user_profile_value
            WHEN 'admin' THEN
                -- Insérer des données spécifiques pour le rôle Admin dans la table company_admin
                INSERT INTO company_admin (user_id, is_admin)
                VALUES (user_id, true);

            WHEN 'candidate' THEN
                -- Insérer des données spécifiques pour le rôle Candidate dans la table candidate
                INSERT INTO candidate (
                    user_id,
                    bio,
                    link_github,
                    link_linkedin,
                    link_portfolio,
                    link_dailydev,
                    link_other,
                    tree_id
                )
                VALUES (
                    user_id,
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.bio')),
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.link_github')),
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.link_linkedin')),
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.link_portfolio')),
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.link_dailydev')),
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.link_other')),
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.tree_id'))
                );

            WHEN 'company' THEN
                -- Insérer des données spécifiques pour le rôle Company dans la table recruiter
                INSERT INTO recruiter (user_id, company)
                VALUES (
                    user_id,
                    JSON_UNQUOTE(JSON_EXTRACT(new_user, '$.company_specific_value'))
                );
        END CASE;
    END IF;
END //

DELIMITER ;