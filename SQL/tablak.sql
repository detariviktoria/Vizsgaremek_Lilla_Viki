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
    felhaszanlo_id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    jelszo VARCHAR(100) NOT NULL
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
    stilus_id INT,
    image_url VARCHAR(255),
    link_url VARCHAR(255),
    FOREIGN KEY (stilus_id) REFERENCES Stilusok(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
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
-- 7. Ajandek_Celcsoport
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
-- 8. Kuponok
-- -------------------------------
CREATE TABLE Kuponok (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    felhaszanlo_id INT NOT NULL,
    coupon_code VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    discount INT NOT NULL,
    expiry_date DATE,
    FOREIGN KEY (felhaszanlo_id) REFERENCES Felhasznalo(felhaszanlo_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- -------------------------------
-- 10. Felhasznalo_AjandekElozmeny
-- -------------------------------
CREATE TABLE Felhasznalo_AjandekElozmeny (
    felhaszanlo_id INT,
    ajandek_id INT,
    keresesi_ido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (felhaszanlo_id, ajandek_id, keresesi_ido),
    FOREIGN KEY (felhaszanlo_id) REFERENCES Felhasznalo(felhaszanlo_id),
    FOREIGN KEY (ajandek_id) REFERENCES Ajandek(id)
);

-- -------------------------------
-- 11. Felhasznalo_KedvencAjandek
-- -------------------------------
CREATE TABLE Felhasznalo_KedvencAjandek (
    felhaszanlo_id INT,
    ajandek_id INT,
    mentve TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (felhaszanlo_id, ajandek_id),
    FOREIGN KEY (felhaszanlo_id) REFERENCES Felhasznalo(felhaszanlo_id),
    FOREIGN KEY (ajandek_id) REFERENCES Ajandek(id)
);

