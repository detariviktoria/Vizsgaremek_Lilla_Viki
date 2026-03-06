'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Törlés az elején az ütközések elkerülése végett
    await queryInterface.bulkDelete('Ajandek_Stilus', null, {});
    await queryInterface.bulkDelete('Ajandek_Celcsoport', null, {});
    await queryInterface.bulkDelete('Ajandek_Alkalom', null, {});
    await queryInterface.bulkDelete('Ajandek', null, {});
    await queryInterface.bulkDelete('Felhasznalo', null, {});

    const ajandekok = [
      { id: 1, nev: 'Vidám bögre', leiras: 'Vidám bögre leírása', ar: 1500, kategoria: 'tárgy', image_url: 'vidambogre.jpg', link_url: 'https://bogrevaros.hu/Vidam-napot-bogre' },
      { id: 2, nev: 'Wellness hétvége', leiras: 'Wellness hétvége leírása', ar: 40000, kategoria: 'élmény', image_url: 'wellness.jpg', link_url: 'https://www.pihipakk.hu/csomag/wellness-es-romantika' },
      { id: 3, nev: 'DIY kézműves készlet', leiras: 'DIY kézműves készlet leírása', ar: 6000, kategoria: 'tárgy', image_url: 'diy.jpg', link_url: 'https://hobbivilag.hu/products/diy-3d-kezforma-klon-keszlet' },
      { id: 4, nev: 'Szakácskönyv', leiras: 'Szakácskönyv leírása', ar: 5000, kategoria: 'tárgy', image_url: 'szakacskonyv.jpg', link_url: 'https://szoky.hu/termek/konyv/' },
      { id: 5, nev: 'Sétarepülés', leiras: 'Sétarepülés leírása', ar: 15000, kategoria: 'élmény', image_url: 'setarepules.jpg', link_url: 'https://elmenyrepulesek.hu/uzlet/setarepules/budapest-latvanyossagai-setarepules' },
      { id: 6, nev: 'Puzzle játék', leiras: 'Puzzle játék leírása', ar: 5000, kategoria: 'tárgy', image_url: 'puzzle.jpg', link_url: 'https://www.puzzlekucko.hu/termek/anatolian-1000-darabos-1143-doggies-in-the-bedroom' },
      { id: 7, nev: 'Romantikus vacsora', leiras: 'Romantikus vacsora leírása', ar: 15000, kategoria: 'élmény', image_url: 'romvacs.jpg', link_url: 'https://meglepkek.hu/romantika-es-lanykeres/romantikus-vacsora-es-hajozas-a-dunan' },
      { id: 8, nev: 'Egyedi póló', leiras: 'Egyedi póló leírása', ar: 5000, kategoria: 'tárgy', image_url: 'egyedipolo.jpg', link_url: 'https://pamutlabor.hu/egyedi' },
      { id: 9, nev: 'Csokoládé válogatás', leiras: 'Csokoládé válogatás leírása', ar: 5000, kategoria: 'tárgy', image_url: 'csokoladevalogatas.jpg', link_url: 'https://veghmeli.com/termek/kezzel-keszitett-bonbon-valogatas-egyedulalloan-szep-diszcsomagolasban/' },
      { id: 10, nev: 'Színházjegy', leiras: 'Színházjegy leírása', ar: 12000, kategoria: 'élmény', image_url: 'szinhaz.jpg', link_url: 'https://www.jegy.hu/ajandekkartya' },
      { id: 11, nev: 'Gokartozás', leiras: 'Gokartozás leírása', ar: 8000, kategoria: 'élmény', image_url: 'gokart.jpg', link_url: 'https://gokartvac.hu/idopont-foglalas-vaci-gokart-palya/' },
      { id: 12, nev: 'Festőkészlet', leiras: 'Festőkészlet leírása', ar: 9278, kategoria: 'tárgy', image_url: 'festokeszlet.jpg', link_url: 'https://www.emag.hu/vincent-188-reszes-festokeszlet-4054673402117/pd/D16CZBMBM/' },
      { id: 13, nev: 'Okosóra', leiras: 'Okosóra leírása', ar: 50000, kategoria: 'tárgy', image_url: 'okosora.jpg', link_url: 'https://okosora-aktivitasmero.arukereso.hu/' },
      { id: 14, nev: 'Parfüm', leiras: 'Parfüm leírása', ar: 40000, kategoria: 'tárgy', image_url: 'parfum.jpg', link_url: 'https://www.notino.hu/parfumok/' },
      { id: 15, nev: 'Társasjáték', leiras: 'Társasjáték leírása', ar: 5000, kategoria: 'tárgy', image_url: 'tarsas.jpg', link_url: 'https://tarsasjatekrendeles.hu/TOP_50' },
      { id: 16, nev: 'Borkóstoló', leiras: 'Borkóstoló leírása', ar: 12000, kategoria: 'élmény', image_url: 'borkost.jpg', link_url: 'https://elmenyplaza.hu/elmeny-kategoriak/gasztronomiai-kalandok/borkostolok' },
      { id: 17, nev: 'Szabadulószoba', leiras: 'Szabadulószoba leírása', ar: 10000, kategoria: 'élmény', image_url: 'szabadulo.jpg', link_url: 'https://booking.neverland.hu/hu/gift' },
      { id: 18, nev: 'Állatkerti belépő', leiras: 'Állatkerti belépő leírása', ar: 6000, kategoria: 'élmény', image_url: 'allatkert.jpg', link_url: 'https://tickets.zoobudapest.com/hu/' },
      { id: 19, nev: 'Főzőtanfolyam', leiras: 'Főzőtanfolyam leírása', ar: 6000, kategoria: 'élmény', image_url: 'fozotan.jpg', link_url: 'https://elmenyplaza.hu/elmeny-kategoriak/gasztronomiai-kalandok/fozotanfolyamok' },
      { id: 20, nev: 'Masszázs utalvány', leiras: 'Masszázs utalvány leírása', ar: 10000, kategoria: 'élmény', image_url: 'masszazs.jpg', link_url: 'https://www.chmassage.hu/hu/ajandekutalvany' },
      { id: 21, nev: 'Jegy koncertre', leiras: 'Jegy koncertre leírása', ar: 12000, kategoria: 'élmény', image_url: 'koncert.jpg', link_url: 'https://www.budapestpark.hu/' },
      { id: 22, nev: 'Tánctanfolyam', leiras: 'Tánctanfolyam leírása', ar: 8000, kategoria: 'élmény', image_url: 'tanc.jpg', link_url: 'https://tancvalaszto.hu/kezdo-tanfolyamok.html' },
      { id: 23, nev: 'Kertészeti szett', leiras: 'Kertészeti szett leírása', ar: 20000, kategoria: 'tárgy', image_url: 'kertesz.jpg', link_url: 'https://www.csepeligravir.hu/termek/kerteszeti-szett-gravirozas-nelkuli-termek/' },
      { id: 24, nev: 'Hobbi készlet', leiras: 'Hobbi készlet leírása', ar: 12968, kategoria: 'tárgy', image_url: 'hobbi.jpg', link_url: 'https://www.kreativhobby.hu/ajandekotletek-2117' },
      { id: 25, nev: 'Plüssfigura', leiras: 'Plüssfigura leírása', ar: 4000, kategoria: 'tárgy', image_url: 'pluss.png', link_url: 'https://www.plussfigurabolt.hu/termek' },
      { id: 26, nev: 'Kerékpár kiegészítő', leiras: 'Kerékpár kiegészítő leírása', ar: 8415, kategoria: 'tárgy', image_url: 'bico.jpg', link_url: 'https://www.bicajbolt.hu/kiegeszitok' },
      { id: 27, nev: 'Laptop táska', leiras: 'Laptop táska leírása', ar: 10995, kategoria: 'tárgy', image_url: 'ltaska.jpg', link_url: 'https://www.laptoptaska.hu/termek' },
      { id: 28, nev: 'Napernyő', leiras: 'Napernyő leírása', ar: 4214, kategoria: 'tárgy', image_url: 'napernyo.jpg', link_url: 'https://www.napernyobolt.hu/termek' },
      { id: 29, nev: 'Sportcipő', leiras: 'Sportcipő leírása', ar: 9880, kategoria: 'tárgy', image_url: 'sportcipo.jpg', link_url: 'https://www.sportcipobolt.hu/termek' },
      { id: 30, nev: 'Hátizsák', leiras: 'Hátizsák leírása', ar: 12350, kategoria: 'tárgy', image_url: 'hatizsak.jpg', link_url: 'https://www.hatizsakbolt.hu/termek' },
      { id: 31, nev: 'Laptop hűtőpad', leiras: 'Laptop hűtőpad leírása', ar: 9612, kategoria: 'tárgy', image_url: 'lhuto.jpg', link_url: 'https://www.laptophutopad.hu/termek' },
      { id: 32, nev: 'LED lámpa', leiras: 'LED lámpa leírása', ar: 3426, kategoria: 'élmény', image_url: 'ledlampa.jpg', link_url: 'https://www.ledlampabolt.hu/termek' },
      { id: 33, nev: 'Szépségcsomag', leiras: 'Szépségcsomag leírása', ar: 8991, kategoria: 'tárgy', image_url: 'szep.jpg', link_url: 'https://www.szepsegcsomag.hu/termek' },
      { id: 34, nev: 'Fitness bérlet', leiras: 'Fitness bérlet leírása', ar: 11475, kategoria: 'élmény', image_url: 'fitness.jpg', link_url: 'https://www.fitnessberlet.hu/termek' },
      { id: 35, nev: 'VR szemüveg', leiras: 'VR szemüveg leírása', ar: 15204, kategoria: 'tárgy', image_url: 'vr.jpg', link_url: 'https://www.vrszemuveg.hu/termek' },
      { id: 36, nev: 'Hangszóró', leiras: 'Hangszóró leírása', ar: 4263, kategoria: 'tárgy', image_url: 'hangszoro.jpg', link_url: 'https://www.hangszorobolt.hu/termek' },
      { id: 37, nev: 'Bluetooth fülhallgató', leiras: 'Bluetooth fülhallgató leírása', ar: 101883, kategoria: 'tárgy', image_url: 'ful.jpg', link_url: 'https://example.com/ful' },
      { id: 38, nev: 'Ékszer szett', leiras: 'Ékszer szett leírása', ar: 14018, kategoria: 'tárgy', image_url: 'ekszer.jpg', link_url: 'https://example.com/ekszer' },
      { id: 39, nev: 'Fotóalbum', leiras: 'Fotóalbum leírása', ar: 8759, kategoria: 'tárgy', image_url: 'album.jpg', link_url: 'https://example.com/album' },
      { id: 40, nev: 'Könyvcsomag', leiras: 'Könyvcsomag leírása', ar: 7363, kategoria: 'tárgy', image_url: 'konyvcsomag.jpg', link_url: 'https://example.com/konyv' },
      { id: 41, nev: 'Italválogatás', leiras: 'Italválogatás leírása', ar: 18626, kategoria: 'tárgy', image_url: 'ital.jpg', link_url: 'https://example.com/ital' },
      { id: 42, nev: 'Vezetéstechnikai tréning', leiras: 'Vezetéstechnikai tréning leírása', ar: 80593, kategoria: 'élmény', image_url: 'trening.jpg', link_url: 'https://example.com/trening' },
      { id: 43, nev: 'Nyári tábor belépő', leiras: 'Nyári tábor belépő leírása', ar: 20000, kategoria: 'élmény', image_url: 'tabor.jpg', link_url: 'https://example.com/tabor' },
      { id: 44, nev: 'Konyhai robotgép', leiras: 'Konyhai robotgép leírása', ar: 17563, kategoria: 'tárgy', image_url: 'robotgep.jpg', link_url: 'https://example.com/robotgep' },
      { id: 45, nev: 'Bögre szett', leiras: 'Bögre szett leírása', ar: 3739, kategoria: 'tárgy', image_url: 'bogreszett.jpg', link_url: 'https://example.com/bogreszett' },
      { id: 46, nev: 'Hobbi magazin előfizetés', leiras: 'Hobbi magazin előfizetés leírása', ar: 4553, kategoria: 'tárgy', image_url: 'magazin.jpg', link_url: 'https://example.com/magazin' },
      { id: 47, nev: 'Kézműves csokoládé', leiras: 'Kézműves csokoládé leírása', ar: 4559, kategoria: 'tárgy', image_url: 'kezcsoki.jpg', link_url: 'https://example.com/kezcsoki' },
      { id: 48, nev: 'Gyertyakészlet', leiras: 'Gyertyakészlet leírása', ar: 3539, kategoria: 'tárgy', image_url: 'gyertya.jpg', link_url: 'https://example.com/gyertya' },
      { id: 49, nev: 'Retro játék konzol', leiras: 'Retro játék konzol leírása', ar: 32649, kategoria: 'tárgy', image_url: 'retrokonzol.jpg', link_url: 'https://example.com/retro' },
      { id: 50, nev: 'Mini drón', leiras: 'Mini drón játék leírása', ar: 15999, kategoria: 'tárgy', image_url: 'minidron.jpg', link_url: 'https://dronebolt.hu/mini-dron' }
    ];

    const felhasznalok = [
      { name: 'Viktória', email: 'viktoria@mail.com', password: 'pass123' },
      { name: 'Lilla', email: 'lilla@mail.com', password: 'pass456' },
      { name: 'Gábor', email: 'gabor@mail.com', password: 'pass789' },
      { name: 'Anna', email: 'anna@mail.com', password: 'pass321' },
      { name: 'Tamás', email: 'tamas@mail.com', password: 'pass654' },
      { name: 'Katalin', email: 'katalin@mail.com', password: 'pass987' },
      { name: 'Miklós', email: 'miklos@mail.com', password: 'pass741' },
      { name: 'Eszter', email: 'eszter@mail.com', password: 'pass852' },
      { name: 'Zoltán', email: 'zoltan@mail.com', password: 'pass963' },
      { name: 'Judit', email: 'judit@mail.com', password: 'pass159' },
      { name: 'Péter', email: 'peter@mail.com', password: 'pass753' },
      { name: 'Dóra', email: 'dora_uj_2@mail.com', password: 'pass456' },
      { name: 'Balázs', email: 'balazs@mail.com', password: 'pass852' },
      { name: 'Réka', email: 'reka@mail.com', password: 'pass369' },
      { name: 'András', email: 'andras@mail.com', password: 'pass147' }
    ];

    const ajandekAlkalomok = [
      { ajandek_id: 1, alkalom_id: 1 }, { ajandek_id: 1, alkalom_id: 2 }, { ajandek_id: 1, alkalom_id: 10 },
      { ajandek_id: 2, alkalom_id: 3 }, { ajandek_id: 2, alkalom_id: 13 }, { ajandek_id: 2, alkalom_id: 15 },
      { ajandek_id: 3, alkalom_id: 1 },
      { ajandek_id: 4, alkalom_id: 1 }, { ajandek_id: 4, alkalom_id: 2 },
      { ajandek_id: 5, alkalom_id: 1 }, { ajandek_id: 5, alkalom_id: 13 },
      { ajandek_id: 6, alkalom_id: 2 }, { ajandek_id: 6, alkalom_id: 11 },
      { ajandek_id: 7, alkalom_id: 3 }, { ajandek_id: 7, alkalom_id: 13 },
      { ajandek_id: 8, alkalom_id: 1 }, { ajandek_id: 8, alkalom_id: 10 },
      { ajandek_id: 9, alkalom_id: 2 }, { ajandek_id: 9, alkalom_id: 3 },
      { ajandek_id: 10, alkalom_id: 1 }, { ajandek_id: 10, alkalom_id: 13 },
      { ajandek_id: 11, alkalom_id: 1 }, { ajandek_id: 11, alkalom_id: 16 },
      { ajandek_id: 12, alkalom_id: 1 },
      { ajandek_id: 13, alkalom_id: 1 }, { ajandek_id: 13, alkalom_id: 2 },
      { ajandek_id: 14, alkalom_id: 3 }, { ajandek_id: 14, alkalom_id: 10 },
      { ajandek_id: 15, alkalom_id: 2 }, { ajandek_id: 15, alkalom_id: 16 },
      { ajandek_id: 16, alkalom_id: 13 }, { ajandek_id: 16, alkalom_id: 22 },
      { ajandek_id: 17, alkalom_id: 1 }, { ajandek_id: 17, alkalom_id: 23 },
      { ajandek_id: 18, alkalom_id: 8 }, { ajandek_id: 18, alkalom_id: 25 },
      { ajandek_id: 19, alkalom_id: 13 }, { ajandek_id: 19, alkalom_id: 15 },
      { ajandek_id: 20, alkalom_id: 19 },
      { ajandek_id: 21, alkalom_id: 1 }, { ajandek_id: 21, alkalom_id: 16 },
      { ajandek_id: 22, alkalom_id: 3 }, { ajandek_id: 22, alkalom_id: 13 },
      { ajandek_id: 23, alkalom_id: 8 },
      { ajandek_id: 24, alkalom_id: 1 }, { ajandek_id: 24, alkalom_id: 2 },
      { ajandek_id: 25, alkalom_id: 1 }, { ajandek_id: 25, alkalom_id: 8 },
      { ajandek_id: 26, alkalom_id: 1 }, { ajandek_id: 26, alkalom_id: 17 },
      { ajandek_id: 27, alkalom_id: 1 }, { ajandek_id: 27, alkalom_id: 14 },
      { ajandek_id: 28, alkalom_id: 2 }, { ajandek_id: 28, alkalom_id: 8 },
      { ajandek_id: 29, alkalom_id: 1 }, { ajandek_id: 29, alkalom_id: 17 },
      { ajandek_id: 30, alkalom_id: 1 }, { ajandek_id: 30, alkalom_id: 2 },
      { ajandek_id: 31, alkalom_id: 1 }, { ajandek_id: 31, alkalom_id: 2 },
      { ajandek_id: 32, alkalom_id: 3 }, { ajandek_id: 32, alkalom_id: 13 },
      { ajandek_id: 33, alkalom_id: 8 },
      { ajandek_id: 34, alkalom_id: 1 }, { ajandek_id: 34, alkalom_id: 2 },
      { ajandek_id: 35, alkalom_id: 1 }, { ajandek_id: 35, alkalom_id: 8 },
      { ajandek_id: 36, alkalom_id: 1 }, { ajandek_id: 36, alkalom_id: 17 },
      { ajandek_id: 37, alkalom_id: 1 }, { ajandek_id: 37, alkalom_id: 14 },
      { ajandek_id: 38, alkalom_id: 2 }, { ajandek_id: 38, alkalom_id: 8 },
      { ajandek_id: 39, alkalom_id: 1 }, { ajandek_id: 39, alkalom_id: 17 },
      { ajandek_id: 40, alkalom_id: 1 }, { ajandek_id: 40, alkalom_id: 2 },
      { ajandek_id: 41, alkalom_id: 1 }, { ajandek_id: 41, alkalom_id: 2 },
      { ajandek_id: 42, alkalom_id: 3 }, { ajandek_id: 42, alkalom_id: 13 },
      { ajandek_id: 43, alkalom_id: 8 },
      { ajandek_id: 44, alkalom_id: 1 }, { ajandek_id: 44, alkalom_id: 2 },
      { ajandek_id: 45, alkalom_id: 1 }, { ajandek_id: 45, alkalom_id: 8 },
      { ajandek_id: 46, alkalom_id: 1 }, { ajandek_id: 46, alkalom_id: 17 },
      { ajandek_id: 47, alkalom_id: 1 }, { ajandek_id: 47, alkalom_id: 14 },
      { ajandek_id: 48, alkalom_id: 2 }, { ajandek_id: 48, alkalom_id: 8 },
      { ajandek_id: 49, alkalom_id: 1 }, { ajandek_id: 49, alkalom_id: 17 },
      { ajandek_id: 50, alkalom_id: 1 }, { ajandek_id: 50, alkalom_id: 2 }
    ];

    const ajandekCelcsoportok = [
      { ajandek_id: 1, celcsoport_id: 2 }, { ajandek_id: 1, celcsoport_id: 5 },
      { ajandek_id: 2, celcsoport_id: 4 },
      { ajandek_id: 3, celcsoport_id: 1 }, { ajandek_id: 3, celcsoport_id: 2 },
      { ajandek_id: 4, celcsoport_id: 2 }, { ajandek_id: 4, celcsoport_id: 6 },
      { ajandek_id: 5, celcsoport_id: 2 }, { ajandek_id: 5, celcsoport_id: 4 },
      { ajandek_id: 6, celcsoport_id: 1 }, { ajandek_id: 6, celcsoport_id: 3 },
      { ajandek_id: 7, celcsoport_id: 4 },
      { ajandek_id: 8, celcsoport_id: 2 }, { ajandek_id: 8, celcsoport_id: 5 },
      { ajandek_id: 9, celcsoport_id: 2 }, { ajandek_id: 9, celcsoport_id: 5 },
      { ajandek_id: 10, celcsoport_id: 2 }, { ajandek_id: 10, celcsoport_id: 4 },
      { ajandek_id: 11, celcsoport_id: 2 }, { ajandek_id: 11, celcsoport_id: 5 },
      { ajandek_id: 12, celcsoport_id: 1 }, { ajandek_id: 12, celcsoport_id: 2 },
      { ajandek_id: 13, celcsoport_id: 2 }, { ajandek_id: 13, celcsoport_id: 7 },
      { ajandek_id: 14, celcsoport_id: 2 }, { ajandek_id: 14, celcsoport_id: 4 },
      { ajandek_id: 15, celcsoport_id: 5 }, { ajandek_id: 15, celcsoport_id: 6 },
      { ajandek_id: 16, celcsoport_id: 4 },
      { ajandek_id: 17, celcsoport_id: 5 }, { ajandek_id: 17, celcsoport_id: 7 },
      { ajandek_id: 18, celcsoport_id: 1 }, { ajandek_id: 18, celcsoport_id: 6 },
      { ajandek_id: 19, celcsoport_id: 4 }, { ajandek_id: 19, celcsoport_id: 2 },
      { ajandek_id: 20, celcsoport_id: 6 }, { ajandek_id: 20, celcsoport_id: 2 },
      { ajandek_id: 21, celcsoport_id: 2 }, { ajandek_id: 21, celcsoport_id: 5 },
      { ajandek_id: 22, celcsoport_id: 4 }, { ajandek_id: 22, celcsoport_id: 2 },
      { ajandek_id: 23, celcsoport_id: 6 }, { ajandek_id: 23, celcsoport_id: 2 },
      { ajandek_id: 24, celcsoport_id: 1 }, { ajandek_id: 24, celcsoport_id: 2 },
      { ajandek_id: 25, celcsoport_id: 1 }, { ajandek_id: 25, celcsoport_id: 5 },
      { ajandek_id: 26, celcsoport_id: 2 }, { ajandek_id: 26, celcsoport_id: 5 },
      { ajandek_id: 27, celcsoport_id: 2 }, { ajandek_id: 27, celcsoport_id: 7 },
      { ajandek_id: 28, celcsoport_id: 2 }, { ajandek_id: 28, celcsoport_id: 6 },
      { ajandek_id: 29, celcsoport_id: 2 }, { ajandek_id: 29, celcsoport_id: 5 },
      { ajandek_id: 30, celcsoport_id: 2 }, { ajandek_id: 30, celcsoport_id: 1 },
      { ajandek_id: 31, celcsoport_id: 2 }, { ajandek_id: 31, celcsoport_id: 5 },
      { ajandek_id: 32, celcsoport_id: 4 }, { ajandek_id: 32, celcsoport_id: 2 },
      { ajandek_id: 33, celcsoport_id: 6 }, { ajandek_id: 33, celcsoport_id: 2 },
      { ajandek_id: 34, celcsoport_id: 1 }, { ajandek_id: 34, celcsoport_id: 2 },
      { ajandek_id: 35, celcsoport_id: 1 }, { ajandek_id: 35, celcsoport_id: 5 },
      { ajandek_id: 36, celcsoport_id: 2 }, { ajandek_id: 36, celcsoport_id: 5 },
      { ajandek_id: 37, celcsoport_id: 2 }, { ajandek_id: 37, celcsoport_id: 7 },
      { ajandek_id: 38, celcsoport_id: 2 }, { ajandek_id: 38, celcsoport_id: 6 },
      { ajandek_id: 39, celcsoport_id: 2 }, { ajandek_id: 39, celcsoport_id: 5 },
      { ajandek_id: 40, celcsoport_id: 2 }, { ajandek_id: 40, celcsoport_id: 1 },
      { ajandek_id: 41, celcsoport_id: 2 }, { ajandek_id: 41, celcsoport_id: 5 },
      { ajandek_id: 42, celcsoport_id: 4 }, { ajandek_id: 42, celcsoport_id: 2 },
      { ajandek_id: 43, celcsoport_id: 6 }, { ajandek_id: 43, celcsoport_id: 2 },
      { ajandek_id: 44, celcsoport_id: 1 }, { ajandek_id: 44, celcsoport_id: 2 },
      { ajandek_id: 45, celcsoport_id: 1 }, { ajandek_id: 45, celcsoport_id: 5 },
      { ajandek_id: 46, celcsoport_id: 2 }, { ajandek_id: 46, celcsoport_id: 5 },
      { ajandek_id: 47, celcsoport_id: 2 }, { ajandek_id: 47, celcsoport_id: 7 },
      { ajandek_id: 48, celcsoport_id: 2 }, { ajandek_id: 48, celcsoport_id: 6 },
      { ajandek_id: 49, celcsoport_id: 2 }, { ajandek_id: 49, celcsoport_id: 5 },
      { ajandek_id: 50, celcsoport_id: 2 }, { ajandek_id: 50, celcsoport_id: 1 }
    ];

    const ajandekStilusok = [
      { ajandek_id: 1, stilus_id: 1 }, { ajandek_id: 10, stilus_id: 1 }, { ajandek_id: 44, stilus_id: 1 },
      { ajandek_id: 6, stilus_id: 2 }, { ajandek_id: 15, stilus_id: 2 }, { ajandek_id: 40, stilus_id: 2 },
      { ajandek_id: 13, stilus_id: 3 }, { ajandek_id: 14, stilus_id: 3 }, { ajandek_id: 21, stilus_id: 3 },
      { ajandek_id: 3, stilus_id: 4 }, { ajandek_id: 24, stilus_id: 4 }, { ajandek_id: 47, stilus_id: 4 },
      { ajandek_id: 7, stilus_id: 5 }, { ajandek_id: 14, stilus_id: 5 }, { ajandek_id: 16, stilus_id: 5 },
      { ajandek_id: 13, stilus_id: 6 }, { ajandek_id: 32, stilus_id: 6 }, { ajandek_id: 41, stilus_id: 6 },
      { ajandek_id: 8, stilus_id: 7 }, { ajandek_id: 47, stilus_id: 7 }, { ajandek_id: 50, stilus_id: 7 },
      { ajandek_id: 3, stilus_id: 8 }, { ajandek_id: 12, stilus_id: 8 }, { ajandek_id: 24, stilus_id: 8 },
      { ajandek_id: 6, stilus_id: 9 }, { ajandek_id: 28, stilus_id: 9 }, { ajandek_id: 40, stilus_id: 9 },
      { ajandek_id: 14, stilus_id: 10 }, { ajandek_id: 21, stilus_id: 10 }, { ajandek_id: 50, stilus_id: 10 },
      { ajandek_id: 5, stilus_id: 11 }, { ajandek_id: 11, stilus_id: 11 }, { ajandek_id: 46, stilus_id: 11 },
      { ajandek_id: 29, stilus_id: 12 }, { ajandek_id: 36, stilus_id: 12 }, { ajandek_id: 46, stilus_id: 12 },
      { ajandek_id: 12, stilus_id: 13 }, { ajandek_id: 44, stilus_id: 13 }, { ajandek_id: 47, stilus_id: 13 },
      { ajandek_id: 4, stilus_id: 14 }, { ajandek_id: 19, stilus_id: 14 }, { ajandek_id: 45, stilus_id: 14 },
      { ajandek_id: 3, stilus_id: 15 }, { ajandek_id: 24, stilus_id: 15 }, { ajandek_id: 48, stilus_id: 15 },
      { ajandek_id: 10, stilus_id: 16 }, { ajandek_id: 49, stilus_id: 16 }, { ajandek_id: 45, stilus_id: 16 },
      { ajandek_id: 21, stilus_id: 17 }, { ajandek_id: 41, stilus_id: 17 }, { ajandek_id: 49, stilus_id: 17 },
      { ajandek_id: 1, stilus_id: 18 }, { ajandek_id: 44, stilus_id: 18 }, { ajandek_id: 23, stilus_id: 18 },
      { ajandek_id: 5, stilus_id: 19 }, { ajandek_id: 30, stilus_id: 19 }, { ajandek_id: 27, stilus_id: 19 },
      { ajandek_id: 13, stilus_id: 20 }, { ajandek_id: 32, stilus_id: 20 }, { ajandek_id: 41, stilus_id: 20 }
    ];

    // Hash passwords
    for (let u of felhasznalok) {
      u.password = await bcrypt.hash(u.password, 10);
    }

    // Insert data
    await queryInterface.bulkInsert('Felhasznalo', felhasznalok, {});
    await queryInterface.bulkInsert('Ajandek', ajandekok, {});

    await queryInterface.bulkInsert('Ajandek_Alkalom', ajandekAlkalomok, {});
    await queryInterface.bulkInsert('Ajandek_Celcsoport', ajandekCelcsoportok, {});
    await queryInterface.bulkInsert('Ajandek_Stilus', ajandekStilusok, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ajandek_Stilus', null, {});
    await queryInterface.bulkDelete('Ajandek_Celcsoport', null, {});
    await queryInterface.bulkDelete('Ajandek_Alkalom', null, {});
    await queryInterface.bulkDelete('Ajandek', null, {});
    await queryInterface.bulkDelete('Felhasznalo', null, {});
  }
};
