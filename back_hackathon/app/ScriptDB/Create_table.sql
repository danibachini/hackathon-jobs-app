BEGIN;

CREATE TABLE users (
    id                  SERIAL PRIMARY KEY,
    first_name          TEXT NOT NULL,
    last_name           TEXT NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(60) NOT NULL,
    profile             ENUM ('candidate', 'company', 'admin')
);

CREATE TABLE candidate (
    id                  SERIAL PRIMARY KEY,
    bio                 TEXT,
    link_github         VARCHAR(255) UNIQUE, 
    link_linkedin       VARCHAR(255) UNIQUE, 
    link_portfolio      VARCHAR(255) UNIQUE, 
    link_dailydev       VARCHAR(255) UNIQUE, 
    link_other          VARCHAR(255) UNIQUE, 
    tree_id             INT,
    user_id             INT,
    FOREIGN KEY (tree_id) REFERENCES trees(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recruiter (
    id                  SERIAL PRIMARY KEY,
    name_entity         TEXT NOT NULL,
    user_id             INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE trees (
    id                  SERIAL PRIMARY KEY,
    task_position       INT, 
    task_id             INT,
    user_id             INT,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
    id                  SERIAL PRIMARY KEY,
    name                TEXT NOT NULL,
    task_description    TEXT NOT NULL,
    level               INT NOT NULL,
    duration            INTERVAL NOT NULL,
    finished            BOOLEAN DEFAULT FALSE,
    tree_id             INT REFERENCES trees(id)
);

COMMIT;

CREATE OR REPLACE FUNCTION insert_user(
    new_user JSON
) RETURNS VOID AS $$
DECLARE 
    user_id             INT;
    user_profile_value  VARCHAR(20);
BEGIN
    -- Insert values from the JSON input into the users table.
    INSERT INTO users (
        first_name,
        last_name,
        email,
        password
    )
    VALUES (
        (new_user->>'first_name')::TEXT,
        (new_user->>'last_name')::TEXT,
        (new_user->>'email')::VARCHAR(255),
        (new_user->>'password')::VARCHAR(60)
    )
    RETURNING id INTO user_id;

    -- Retrieve the profile value from the JSON input.
    user_profile_value := (new_user->>'profile')::VARCHAR(20);

    -- Insert data based on the user's profile.
    CASE user_profile_value
        WHEN 'admin' THEN
            -- Insert specific data for Admin role into the recruiter table.
            INSERT INTO recruiter (user_id, name_entity)
            VALUES (user_id, '');

        WHEN 'candidate' THEN
            -- Insert specific data for Candidate role into the candidate table.
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
                (new_user->>'bio')::TEXT,
                (new_user->>'link_github')::VARCHAR(255),
                (new_user->>'link_linkedin')::VARCHAR(255),
                (new_user->>'link_portfolio')::VARCHAR(255),
                (new_user->>'link_dailydev')::VARCHAR(255),
                (new_user->>'link_other')::VARCHAR(255),
                (new_user->>'tree_id')::INT
            );

        WHEN 'company' THEN
            -- Insert specific data for Company role into the recruiter table.
            INSERT INTO recruiter (user_id, name_entity)
            VALUES (
                user_id,
                (new_user->>'company_specific_value')::TEXT
            );
    END CASE;
END;
$$ LANGUAGE plpgsql;
