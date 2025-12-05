-- ===============================
-- ADATBÁZIS: project_vizsgaremek
-- ===============================

CREATE DATABASE IF NOT EXISTS vizsgaremek
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;
USE vizsgaremek;

-- -------------------------------
-- 1. Felhasznalo
-- -------------------------------
CREATE TABLE Felhasznalo (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(5000) NOT NULL,
    is_admin BOOL NOT NULL DEFAULT FALSE
);

-- -------------------------------
-- 2. Stilusok
-- -------------------------------
CREATE TABLE Stilusok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL
);

-- -------------------------------
-- 3. Alkalom
-- -------------------------------
CREATE TABLE Alkalom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL
);

-- -------------------------------
-- 4. Celcsoport
-- -------------------------------
CREATE TABLE Celcsoport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL
);

-- -------------------------------
-- 5. Ajandek
-- -------------------------------
CREATE TABLE Ajandek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    leiras TEXT,
    ar INT NOT NULL,
    kategoria ENUM('tárgy', 'élmény') NOT NULL,
    image_url VARCHAR(255),
    link_url VARCHAR(255)
);

-- -------------------------------
-- 6. Ajandek_Alkalom
-- -------------------------------
CREATE TABLE Ajandek_Alkalom (
    ajandek_id INT NOT NULL,
    alkalom_id INT NOT NULL,
    PRIMARY KEY (ajandek_id, alkalom_id),
    FOREIGN KEY (ajandek_id) REFERENCES Ajandek(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (alkalom_id) REFERENCES Alkalom(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -------------------------------
-- 7. Ajandek_Stilus
-- -------------------------------
CREATE TABLE Ajandek_Stilus (
    ajandek_id INT NOT NULL,
    stilus_id INT NOT NULL,
    PRIMARY KEY (ajandek_id, stilus_id),
    FOREIGN KEY (ajandek_id) REFERENCES Ajandek(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (stilus_id) REFERENCES Stilusok(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -------------------------------
-- 8. Ajandek_Celcsoport
-- -------------------------------
CREATE TABLE Ajandek_Celcsoport (
    ajandek_id INT NOT NULL,
    celcsoport_id INT NOT NULL,
    PRIMARY KEY (ajandek_id, celcsoport_id),
    FOREIGN KEY (ajandek_id) REFERENCES Ajandek(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (celcsoport_id) REFERENCES Celcsoport(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -------------------------------
-- 8. Kategoriak
-- -------------------------------
-- CREATE TABLE Kategoriak (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     nev VARCHAR(100) NOT NULL
-- );


-- -------------------------------
-- 9. Kuponok
-- -------------------------------
CREATE TABLE Kuponok (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    coupon_code VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    discount INT NOT NULL,  -- nincs CHECK, így 0-tól tetszőleges összegig
    expiry_date DATE,
    FOREIGN KEY (user_id) REFERENCES Felhasznalo(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -------------------------------
-- 10. Gyujtmemeny
-- -------------------------------

CREATE TABLE Gyujtemeny (
    id INT AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_id INT NOT NULL,
    nev VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalo(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


/*
ON DELETE CASCADE

Ha egy rekordot kitörölsz a fő táblából (Celcsoport),
akkor automatikusan törli a hozzá kapcsolódó rekordokat is a gyerek táblában 
(Ajandek_Celcsoport).

ON UPDATE CASCADE
Ha egy rekord id-jét megváltoztatod a fő táblában (Celcsoport.id),
akkor a kapcsolódó rekordokban is frissíti az idegen kulcs értéket 
(Ajandek_Celcsoport.celcsoport_id).
*/