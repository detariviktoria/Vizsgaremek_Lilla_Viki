-- Adatok törlése és ID-k alaphelyzetbe állítása a konzisztencia érdekében
-- SET foreign_key_checks = 0;
-- TRUNCATE TABLE Ajandek_Stilus;
-- TRUNCATE TABLE Ajandek_Celcsoport;
-- TRUNCATE TABLE Ajandek_Alkalom;
-- TRUNCATE TABLE Gyujtemeny;
-- TRUNCATE TABLE Kuponok;
-- TRUNCATE TABLE Ajandek;
-- TRUNCATE TABLE Celcsoport;
-- TRUNCATE TABLE Alkalom;
-- TRUNCATE TABLE Stilusok;
-- TRUNCATE TABLE Felhasznalo;
-- SET foreign_key_checks = 1;

-- 1. Felhasznalo
INSERT INTO Felhasznalo (name, email, password) VALUES
('Viktória', 'viktoria@mail.com', '$2b$10$BW6Jj0c.ASoS8Qp8eElacO8QzAjYOjXvALwiDywKGr0QSz2fEzjbu'),
('Lilla', 'lilla@mail.com', '$2b$10$XbUO0wzRjF3cbNOm7XhXfuRFp3i2Bo0pCyJ1gZa02drEFOCrYjThy'),
('Gábor', 'gabor@mail.com', '$2b$10$2QBOcFUZxI3kzuiyH44sbeqeQwFJPUwWK4MaLFdBItAbCOnJitHGy'),
('Anna', 'anna@mail.com', '$2b$10$izK4Jk6H/AwOgGCNkwbnJeXIw/wAPF2xojJ5kKUJtHaCeTbb6lMpy'),
('Tamás', 'tamas@mail.com', '$2b$10$2xLAVpXYsRWpSiSOa/LJ0uZ.yWuBRCvL.yZ6NFplL1xaSAQbW6D7a'),
('Katalin', 'katalin@mail.com', '$2b$10$w7f7I5mK6MGxyQoo0BpJrOAfOzq1qSvKJm1Ly8H4aFkMnJZXkDr5G'),
('Miklós', 'miklos@mail.com', '$2b$10$HycyaGAn9JYyAZBf4DplrO6dT71/CYi55v89J8tjP7aNgOpSwdq.O'),
('Eszter', 'eszter@mail.com', '$2b$10$prM0fhuTrZCNgL9wTsl6euM8gGM3XBSwufY1rCxmZtpGSQuPyW4dC'),
('Zoltán', 'zoltan@mail.com', '$2b$10$TQFIBv.jxOY1b2RmM.huiOQdEj4gGqoyxg8L0qNsvmJVNDUfXznAK'),
('Judit', 'judit@mail.com', '$2b$10$LnOKXtTYfA5jXNKTZE6hhuQ/d3EnUXZhvB81zqDkGG3bOTVgED10S'),
('Péter', 'peter@mail.com', '$2b$10$8piVv6SQBkxLZa8d1Gmx3Oj.eTQAxfN6jSrGHFAFQBu5KA7/lpknm'),
('Dóra', 'dora@mail.com', '$2b$10$XbUO0wzRjF3cbNOm7XhXfuRFp3i2Bo0pCyJ1gZa02drEFOCrYjThy'),
('Balázs', 'balazs@mail.com', '$2b$10$prM0fhuTrZCNgL9wTsl6euM8gGM3XBSwufY1rCxmZtpGSQuPyW4dC'),
('Réka', 'reka@mail.com', '$2b$10$jhvmMu1yByirOGLOJv2sg.CZDw4LxXieiDQKnKzxRL.THy1D7SSmC'),
('András', 'andras@mail.com', '$2b$10$lOgEWrJvDGhkmOiAkKQnBuIYuk5gVN2FQ.IBJ7n0HgYQ8/J0KR3HC');

-- 2. Stilusok
INSERT INTO Stilusok(id, nev)
VALUES
(1, 'Vicces'),
(2, 'Hasznos'),
(3, 'Luxus'),
(4, 'Kézműves'),
(5, 'Romantikus'),
(6, 'Technológias'),
(7, 'Egyedi'),
(8, 'Kreatív'),
(9, 'Praktikus'),
(10, 'Elegáns'),
(11, 'Extrém'),
(12, 'Sportos'),
(13, 'Képzőművészeti'),
(14, 'Gasztronómiai'),
(15, 'DIY'),
(16, 'Vintage'),
(17, 'Zenei'),
(18, 'Otthoni'),
(19, 'Utazós'),
(20, 'Trendkövető');

-- 3. Alkalom
INSERT INTO Alkalom(id, nev)
VALUES
(1, 'Születésnap'),
(2, 'Karácsony'),
(3, 'Valentin-nap'),
(4, 'Ballagás'),
(5, 'Esküvő'),
(6, 'Anyák napja'),
(7, 'Apák napja'),
(8, 'Húsvét'),
(9, 'Farsang'),
(10, 'Névnap'),
(11, 'Mikulás'),
(12, 'Halloween'),
(13, 'Évforduló'),
(14, 'Diplomaosztó'),
(15, 'Házasévesforduló'),
(16, 'Barátság napja'),
(17, 'Új év'),
(18, 'Nyugdíjazás'),
(19, 'Köszönetnyilvánítás'),
(20, 'Eljegyzés'),
(21, 'Szilveszter'),
(22, 'Jubileum'),
(23, 'Búcsúzkodó buli'),
(24, 'Házavató'),
(25, 'Gyermek születés');

-- 4. Celcsoport
INSERT INTO Celcsoport(id, nev)
VALUES
(1, 'gyerekek'),
(2, 'felnőttek'),
(3, 'idősek'),
(4, 'párok'),
(5, 'barátok'),
(6, 'szülők'),
(7, 'kollégák'),
(8, 'tanárok');

-- 5. Ajandek
INSERT INTO Ajandek(id, nev, leiras, ar, kategoria, image_url, link_url)
VALUES
(1, 'Vidám bögre', 'Vidám bögre leírása', 89940, 'tárgy', 'vidambogre.jpg', 'https://bogrevaros.hu/Vidam-napot-bogre'),
(2, 'Wellness hétvége', 'Wellness hétvége leírása', 103321, 'élmény', 'wellness.jpg', 'https://www.pihipakk.hu/csomag/wellness-es-romantika'),
(3, 'DIY kézműves készlet', 'DIY kézműves készlet leírása', 49433, 'élmény', 'diy.jpg', 'https://hobbivilag.hu/products/diy-3d-kezforma-klon-keszlet'),
(4, 'Szakácskönyv', 'Szakácskönyv leírása', 18038, 'tárgy', 'szakacskonyv.jpg', 'https://szoky.hu/termek/konyv/'),
(5, 'Sétarepülés', 'Sétarepülés leírása', 2187, 'élmény', NULL, 'https://elmenyrepulesek.hu/uzlet/setarepules/budapest-latvanyossagai-setarepules'),
(6, 'Puzzle játék', 'Puzzle játék leírása', 6459, 'tárgy', 'puzzle.jpg', 'https://www.puzzlekucko.hu/termek/anatolian-1000-darabos-1143-doggies-in-the-bedroom'),
(7, 'Romantikus vacsora', 'Romantikus vacsora leírása', 7247, 'élmény', 'romvacs.jpg', 'https://meglepkek.hu/romantika-es-lanykeres/romantikus-vacsora-es-hajozas-a-dunan'),
(8, 'Egyedi póló', 'Egyedi póló leírása', 11271, 'tárgy', 'egyedipolo.jpg', 'https://pamutlabor.hu/egyedi'),
(9, 'Csokoládé válogatás', 'Csokoládé válogatás leírása', 52819, 'tárgy', 'csokoladevalogatas.jpg', 'https://veghmeli.com/termek/kezzel-keszitett-bonbon-valogatas-egyedulalloan-szep-diszcsomagolasban/'),
(10, 'Színházjegy', 'Színházjegy leírása', 102627, 'élmény', 'szinhaz.jpg', 'https://www.jegy.hu/ajandekkartya'),
(11, 'Gokartozás', 'Gokartozás leírása', 75867, 'élmény', 'gokart.jpg', 'https://gokartvac.hu/idopont-foglalas-vaci-gokart-palya/'),
(12, 'Festőkészlet', 'Festőkészlet leírása', 9278, 'tárgy', 'festokeszlet.jpg', 'https://www.emag.hu/vincent-188-reszes-festokeszlet-4054673402117/pd/D16CZBMBM/'),
(13, 'Okosóra', 'Okosóra leírása', 6474, 'tárgy', 'okosora.jpg', 'https://okosora-aktivitasmero.arukereso.hu/'),
(14, 'Parfüm', 'Parfüm leírása', 16387, 'tárgy', 'parfum.jpg', 'https://www.notino.hu/parfumok/'),
(15, 'Társasjáték', 'Társasjáték leírása', 39802, 'tárgy', 'tarsas.jpg', 'https://tarsasjatekrendeles.hu/TOP_50'),
(16, 'Borkóstoló', 'Borkóstoló leírása', 63357, 'élmény', 'bor.jpg', 'https://elmenyplaza.hu/elmeny-kategoriak/gasztronomiai-kalandok/borkostolok'),
(17, 'Szabadulószoba', 'Szabadulószoba leírása', 14323, 'élmény', 'szabadulo.jpg', 'https://booking.neverland.hu/hu/gift'),
(18, 'Állatkerti belépő', 'Állatkerti belépő leírása', 13523, 'élmény', 'allatkert.jpg', 'https://tickets.zoobudapest.com/hu/'),
(19, 'Főzőtanfolyam', 'Főzőtanfolyam leírása', 90698, 'élmény', 'fozotan.jpg', 'https://elmenyplaza.hu/elmeny-kategoriak/gasztronomiai-kalandok/fozotanfolyamok'),
(20, 'Masszázs utalvány', 'Masszázs utalvány leírása', 3843, 'élmény', 'masszazs.jpg', 'https://www.chmassage.hu/hu/ajandekutalvany'),
(21, 'Jegy koncertre', 'Jegy koncertre leírása', 59592, 'élmény', 'koncert.jpg', 'https://www.budapestpark.hu/'),
(22, 'Tánctanfolyam', 'Tánctanfolyam leírása', 62529, 'élmény', 'tanc.jpg', 'https://tancvalaszto.hu/kezdo-tanfolyamok.html'),
(23, 'Kertészeti szett', 'Kertészeti szett leírása', 58481, 'tárgy', 'kertesz.jpg', 'https://www.csepeligravir.hu/termek/kerteszeti-szett-gravirozas-nelkuli-termek/'),
(24, 'Hobbi készlet', 'Hobbi készlet leírása', 12968, 'tárgy', 'hobbi.jpg', 'https://www.kreativhobby.hu/ajandekotletek-2117'),
(25, 'Plüssfigura', 'Plüssfigura leírása', 10089, 'tárgy', NULL, 'https://www.plussfigurabolt.hu/termek'),
(26, 'Kerékpár kiegészítő', 'Kerékpár kiegészítő leírása', 8415, 'tárgy', 'bico.jpg', 'https://www.bicajbolt.hu/kiegeszitok'),
(27, 'Laptop táska', 'Laptop táska leírása', 10995, 'tárgy', 'ltaska.jpg', 'https://www.laptoptaska.hu/termek'),
(28, 'Napernyő', 'Napernyő leírása', 42141, 'tárgy', 'napernyo.jpg', 'https://www.napernyobolt.hu/termek'),
(29, 'Sportcipő', 'Sportcipő leírása', 9880, 'tárgy', 'sportcipo.jpg', 'https://www.sportcipobolt.hu/termek'),
(30, 'Hátizsák', 'Hátizsák leírása', 12350, 'tárgy', 'hatizsak.jpg', 'https://www.hatizsakbolt.hu/termek'),
(31, 'Laptop hűtőpad', 'Laptop hűtőpad leírása', 9612, 'tárgy', 'lhuto.jpg', 'https://www.laptophutopad.hu/termek'),
(32, 'LED lámpa', 'LED lámpa leírása', 23426, 'tárgy', 'ledlampa.jpg', 'https://www.ledlampabolt.hu/termek'),
(33, 'Szépségcsomag', 'Szépségcsomag leírása', 6991, 'tárgy', 'szep.jpg', 'https://www.szepsegcsomag.hu/termek'),
(34, 'Fitness bérlet', 'Fitness bérlet leírása', 18475, 'élmény', 'fitness.jpg', 'https://www.fitnessberlet.hu/termek'),
(35, 'VR szemüveg', 'VR szemüveg leírása', 15204, 'tárgy', 'vr.jpg', 'https://www.vrszemuveg.hu/termek'),
(36, 'Hangszóró', 'Hangszóró leírása', 34263, 'tárgy', 'hangszoro.jpg', 'https://www.hangszorobolt.hu/termek'),
(37, 'Bluetooth fülhallgató', 'Bluetooth fülhallgató leírása', 101883, 'tárgy', 'ful.jpg', NULL),
(38, 'Ékszer szett', 'Ékszer szett leírása', 14018, 'tárgy', 'ekszer.jpg', NULL),
(39, 'Fotóalbum', 'Fotóalbum leírása', 8759, 'tárgy', 'album.jpg', NULL),
(40, 'Könyvcsomag', 'Könyvcsomag leírása', 74363, 'tárgy', 'konyvcsomag.jpg', NULL),
(41, 'Italválogatás', 'Italválogatás leírása', 18626, 'tárgy', 'ital.jpg', NULL),
(42, 'Vezetéstechnikai tréning', 'Vezetéstechnikai tréning leírása', 90593, 'élmény', 'trening.jpg', NULL),
(43, 'Nyári tábor belépő', 'Nyári tábor belépő leírása', 107347, 'élmény', 'tabor.jpg', NULL),
(44, 'Konyhai robotgép', 'Konyhai robotgép leírása', 17563, 'tárgy', 'robotgep.jpg', NULL),
(45, 'Bögre szett', 'Bögre szett leírása', 33739, 'tárgy', 'bogreszett.jpg', NULL),
(46, 'Hobbi magazin előfizetés', 'Hobbi magazin előfizetés leírása', 48553, 'tárgy', 'magazin.jpg', NULL),
(47, 'Kézműves csokoládé', 'Kézműves csokoládé leírása', 2559, 'tárgy', 'kezcsoki.jpg', NULL),
(48, 'Gyertyakészlet', 'Gyertyakészlet leírása', 3539, 'tárgy', 'gyertya.jpg', NULL),
(49, 'Retro játék konzol', 'Retro játék konzol leírása', 32649, 'tárgy', 'retrokonzol.jpg', NULL),
(50, 'Mini drón', 'Mini drón játék leírása', 15999, 'tárgy', 'minidron.jpg', 'https://dronebolt.hu/mini-dron'),
(51, 'Szappankészítő készlet', 'Szappankészítő készlet leírása', 8345, 'tárgy', 'szappan.jpg', 'https://hobbivilag.hu/szappankeszito'),
(52, 'Borkóstoló hétvége', 'Borkóstoló hétvége leírása', 45210, 'élmény', 'borkost.jpg', 'https://elmenyplaza.hu/borkostolo'),
(53, 'Okostermosztát', 'Okostermosztát leírása', 20499, 'tárgy', 'okostermosz.jpg', 'https://okosotthon.hu/okostermosztat'),
(54, 'Retro vinyl lemez', 'Retro vinyl lemez leírása', 7530, 'tárgy', 'vinyl.jpg', 'https://zenebolt.hu/vinyl'),
(55, 'Jóga bérlet', 'Jóga bérlet leírása', 12345, 'élmény', 'jogberlet.jpg', 'https://fitnessextra.hu/joga-berlet'),
(56, 'Kézműves bögre', 'Kézműves bögre leírása', 6789, 'tárgy', 'kezmuvesbogre.jpg', 'https://keramia.hu/keszlet/bogre'),
(57, 'VR játék élmény', 'VR játék élmény leírása', 31999, 'élmény', 'vrelmeny.jpg', 'https://vrworld.hu/jatek'),
(58, 'Színező készlet', 'Színező készlet leírása', 2540, 'tárgy', 'szinezo.jpg', 'https://hobbivilag.hu/szinezokeszlet'),
(59, 'Főzőtanfolyam gasztronómia', 'Főzőtanfolyam leírása', 21450, 'élmény', 'fozotanfolyam.jpg', 'https://gasztrotanfolyam.hu/fozo'),
(60, 'Masszázs hétvége', 'Masszázs hétvége leírása', 18999, 'élmény', 'masszazshet.jpg', 'https://wellnessguru.hu/masszazs'),
(61, 'Okos kulcstartó', 'Okos kulcstartó leírása', 5420, 'tárgy', 'okoskulcs.jpg', 'https://okoseszkozok.hu/kulcstarto'),
(62, 'Beltéri növény szett', 'Beltéri növény szett leírása', 11234, 'tárgy', 'novenyszett.jpg', 'https://kertvarazs.hu/belteri-noveny'),
(63, 'Színház bérlet', 'Színház bérlet leírása', 36500, 'élmény', 'szinhazber.jpg', 'https://jegy.hu/szinhaz'),
(64, 'Borkóstoló vacsora', 'Borkóstoló vacsora leírása', 40999, 'élmény', 'borvacs.jpg', 'https://gasztroelmeny.hu/borkostolo'),
(65, 'Kézműves gyertya készlet', 'Kézműves gyertya készlet leírása', 3299, 'tárgy', 'gyertya.jpg', 'https://hobbivilag.hu/gyertyakeszlet'),
(66, 'Kerékpáros túra', 'Kerékpáros túra leírása', 17450, 'élmény', 'kerektura.jpg', 'https://elmenyut.hu/kerekparos'),
(67, 'VR kaland', 'VR kaland leírása', 34999, 'élmény', 'vr.jpg', 'https://vrkalandozas.hu'),
(68, 'Kézműves ékszer', 'Kézműves ékszer leírása', 11999, 'tárgy', 'ekszer.jpg', 'https://kezmuvesekszerek.hu'),
(69, 'Séta a városban', 'Séta a városban leírása', 10200, 'élmény', 'seta.jpg', 'https://varoserteke.hu/seta'),
(70, 'Okos lámpa', 'Okos lámpa leírása', 9450, 'tárgy', 'okoslampa.jpg', 'https://okosotthon.hu/lampa'),
(71, 'Festőkészlet deluxe', 'Festőkészlet deluxe leírása', 18999, 'tárgy', 'delfesto.jpg', 'https://festokeszlet.hu/deluxe'),
(72, 'Kalandpark belépő', 'Kalandpark belépő leírása', 22500, 'élmény', 'kalandpark.jpg', 'https://kalandpark.hu/belépő'),
(73, 'Borkóstoló élmény', 'Borkóstoló élmény leírása', 38500, 'élmény', NULL, 'https://elmenyplaza.hu/borkostolo'),
(74, 'Egyedi fotóalbum', 'Egyedi fotóalbum leírása', 11450, 'tárgy', NULL, 'https://fotoalbum.hu/egyedi'),
(75, 'Szabadulószoba élmény', 'Szabadulószoba élmény leírása', 17250, 'élmény', NULL, 'https://szabaduloszoba.hu'),
(76, 'Hőlégballon túra', 'Hőlégballon túra leírása', 84999, 'élmény', 'ballon.jpg', 'https://ballon.hu'),
(77, 'Okos termosz', 'Okos termosz leírása', 4250, 'tárgy', NULL, 'https://okosotthon.hu/termosz'),
(78, 'DIY dekoráció', 'DIY dekoráció leírása', 7540, 'tárgy', NULL, 'https://hobbivilag.hu/dekoracio'),
(79, 'Fitness szett', 'Fitness szett leírása', 18499, 'élmény', 'fitnessszett.jpg', 'https://fitnessbolt.hu/szett'),
(80, 'Mini színházi előadás', 'Mini színházi előadás leírása', 10250, 'élmény', NULL, 'https://szinhaz.hu/minieloadas');

-- 6. Kuponok
INSERT INTO Kuponok(coupon_id, user_id, coupon_code, status, discount, expiry_date)
VALUES
(1, 1, 'KU123', 'Nincs felhasználva', 1000, '2025-12-31'),
(2, 2, 'KU456', 'Felhasználva', 1500, '2025-11-30'),
(3, 1, 'KU789', 'Nincs felhasználva', 2000, '2026-01-15');

-- 7. Gyujtemeny
INSERT INTO Gyujtemeny (id, felhasznalo_id, nev, created_at, 
updated_at)
VALUES
(1, 1, 'Apának', '2025-09-02 08:10:00', '2025-09-02 09:00:00'),
(2, 2, 'Szülinapra', '2025-09-02 08:20:00', '2025-09-02 09:00:00'),
(3, 1, 'Magamnak', '2025-09-02 09:10:00', '2025-09-02 10:50:00'),
(4, 3, 'Anyának', '2025-09-03 10:00:00', '2025-09-03 10:30:00'),
(5, 2, 'Barátoknak', '2025-09-03 11:15:00', '2025-09-03 11:45:00'),
(6, 1, 'Karácsonyra', '2025-09-04 09:00:00', '2025-09-04 09:30:00'),
(7, 3, 'Valentin-napra', '2025-09-04 10:20:00', '2025-09-04 10:50:00'),
(8, 2, 'Ballagásra', '2025-09-05 08:50:00', '2025-09-05 09:20:00'),
(9, 1, 'Esküvőre', '2025-09-05 09:10:00', '2025-09-05 09:40:00'),
(10, 3, 'Páromnak', '2025-09-06 10:00:00', '2025-09-06 10:30:00'),
(11, 2, 'Gyerekeknek', '2025-09-06 11:10:00', '2025-09-06 11:40:00'),
(12, 1, 'Felnőtteknek', '2025-09-07 08:30:00', '2025-09-07 09:00:00'),
(13, 3, 'Időseknek', '2025-09-07 09:50:00', '2025-09-07 10:20:00'),
(14, 2, 'Vicces ajándékok', '2025-09-08 08:40:00', '2025-09-08 09:10:00'),
(15, 1, 'Hasznos ajándékok', '2025-09-08 09:15:00', '2025-09-08 09:45:00'),
(16, 3, 'Luxus ajándékok', '2025-09-09 10:00:00', '2025-09-09 10:30:00'),
(17, 2, 'Kézműves ajándékok', '2025-09-09 11:05:00', '2025-09-09 11:35:00'),
(18, 1, 'Romantikus ajándékok', '2025-09-10 08:20:00', '2025-09-10 08:50:00'),
(19, 3, 'Technológiai ajándékok', '2025-09-10 09:40:00', '2025-09-10 10:10:00'),
(20, 2, 'Egyedi ajándékok', '2025-09-11 08:55:00', '2025-09-11 09:25:00');

-- 8. Ajandek_Alkalom
INSERT INTO Ajandek_Alkalom(ajandek_id, alkalom_id)
VALUES
(1, 1), (2, 1), (3, 1), (4, 1),
(5, 2), (6, 2), (7, 2), (8, 2),
(9, 3), (10, 3), (11, 3), (12, 3),
(13, 4), (14, 4), (15, 4), (16, 4),
(17, 5), (18, 5), (19, 5), (20, 5),
(21, 6), (22, 6), (23, 6), (24, 6),
(25, 7), (26, 7), (27, 7), (28, 7),
(29, 8), (30, 8), (31, 8), (32, 8),
(33, 9), (34, 9), (35, 9), (36, 9),
(37, 10), (38, 10), (39, 10), (40, 10),
(41, 11), (42, 11), (43, 11), (44, 11),
(45, 12), (46, 12), (47, 12), (48, 12),
(49, 13), (50, 13), (51, 13), (52, 13),
(53, 14), (54, 14), (55, 14), (56, 14),
(57, 15), (58, 15), (59, 15), (60, 15),
(61, 16), (62, 16), (63, 16), (64, 16),
(65, 17), (66, 17), (67, 17), (68, 17),
(69, 18), (70, 18), (71, 18), (72, 18),
(73, 19), (74, 19), (75, 19), (76, 19),
(77, 20), (78, 20), (79, 20), (80, 20),
(1, 21), (5, 21), (9, 21), (13, 21),
(2, 22), (6, 22), (10, 22), (14, 22),
(3, 23), (7, 23), (11, 23), (15, 23),
(4, 24), (8, 24), (12, 24), (16, 24),
(17, 25), (21, 25), (25, 25), (29, 25);

-- 9. Ajandek_Celcsoport
INSERT INTO Ajandek_Celcsoport(ajandek_id, celcsoport_id)
VALUES
(1, 2), (1, 5), (2, 4), (2, 5), (3, 1), (3, 2), (4, 2), (4, 6),
(5, 2), (5, 4), (6, 1), (6, 2), (7, 4), (7, 5), (8, 2), (8, 5),
(9, 2), (9, 4), (10, 2), (10, 5), (11, 5), (12, 6), (13, 2), (14, 2),
(15, 1), (15, 5), (16, 2), (16, 4), (16, 5), (17, 2), (17, 4), (17, 5),
(18, 1), (18, 3), (19, 2), (19, 6), (20, 2), (20, 3), (20, 4), (20, 6),
(21, 2), (21, 4), (21, 5), (22, 2), (22, 4), (23, 3), (23, 6), (23, 8),
(24, 6), (25, 1), (26, 6), (27, 7), (28, 6), (29, 5), (30, 2), (31, 7),
(32, 3), (32, 6), (32, 7), (33, 6), (33, 8), (34, 8), (35, 1), (36, 5),
(37, 2), (38, 2), (39, 3), (39, 4), (40, 3), (40, 6), (40, 8), (41, 3), (41, 5), (41, 6), (41, 7),
(42, 2), (43, 8), (44, 6), (45, 3), (45, 4), (45, 7), (45, 8), (46, 8), (47, 6), (48, 3), (48, 6), (48, 8),
(49, 5), (50, 1), (51, 6), (52, 3), (52, 4), (52, 5), (53, 6), (54, 4), (55, 5), (56, 6), (56, 8),
(57, 1), (58, 1), (59, 6), (60, 4), (60, 6), (61, 7), (62, 6), (62, 8), (63, 3), (63, 6), (64, 4),
(65, 6), (66, 5), (67, 2), (68, 4), (69, 3), (70, 6), (71, 2), (72, 1), (72, 5), (73, 5), (74, 6), (74, 8),
(75, 5), (76, 4), (77, 6), (77, 7), (78, 4), (79, 8), (80, 2);

-- 10. Ajandek_Stilus
INSERT INTO Ajandek_Stilus(ajandek_id, stilus_id)
VALUES
(1, 6), (2, 6), (3, 8), (4, 6), (5, 8), (6, 2), (7, 4), (8, 3), (9, 4), (10, 1),
(11, 6), (12, 7), (13, 7), (14, 3), (15, 2), (16, 6), (17, 2), (18, 6), (19, 3), (20, 1),
(21, 3), (22, 1), (23, 4), (24, 4), (25, 8), (26, 6), (27, 4), (28, 6), (29, 5), (30, 3),
(31, 8), (32, 1), (33, 3), (34, 8), (35, 7), (36, 5), (37, 1), (38, 2), (39, 5), (40, 1),
(41, 2), (42, 1), (43, 8), (44, 2), (45, 3), (46, 8), (47, 6), (48, 1), (49, 5), (50, 7),
(51, 4), (52, 6), (53, 6), (54, 5), (55, 2), (56, 4), (57, 7), (58, 8), (59, 3), (60, 1),
(61, 7), (62, 4), (63, 1), (64, 6), (65, 4), (66, 5), (67, 7), (68, 4), (69, 2), (70, 6),
(71, 7), (72, 5), (73, 6), (74, 3), (75, 2), (76, 7), (77, 6), (78, 4), (79, 8), (80, 1),
(2, 9), (13, 9), (27, 9), (30, 9),
(2, 10), (14, 10), (33, 10), (38, 10),
(5, 11), (11, 11), (42, 11), (76, 11),
(11, 12), (29, 12), (34, 12), (66, 12),
(12, 13), (58, 13), (71, 13), (74, 13),
(4, 14), (9, 14), (16, 14), (19, 14),
(3, 15), (24, 15), (51, 15), (78, 15),
(49, 16), (54, 16), (56, 16), (74, 16),
(21, 17), (36, 17), (37, 17), (54, 17),
(1, 18), (25, 18), (32, 18), (48, 18),
(2, 19), (30, 19), (66, 19), (76, 19),
(13, 20), (35, 20), (50, 20), (61, 20);
