const db = require('../../config/db');

const ajandekok = [

  { nev: 'Vidám bögre', leiras: 'Vidám bögre leírása', ar: 1500, kategoria: 'tárgy', image_url: 'vidambogre.jpg', link_url: 'https://bogrevaros.hu/Vidam-napot-bogre' },

  { nev: 'Wellness hétvége', leiras: 'Wellness hétvége leírása', ar: 40000, kategoria: 'élmény', image_url: 'wellness.jpg', link_url: 'https://www.pihipakk.hu/csomag/wellness-es-romantika' },

  { nev: 'DIY kézműves készlet', leiras: 'DIY kézműves készlet leírása', ar: 6000, kategoria: 'tárgy', image_url: 'diy.jpg', link_url: 'https://hobbivilag.hu/products/diy-3d-kezforma-klon-keszlet' },

  { nev: 'Szakácskönyv', leiras: 'Szakácskönyv leírása', ar: 5000, kategoria: 'tárgy', image_url: 'szakacskonyv.jpg', link_url: 'https://szoky.hu/termek/konyv/' },

  { nev: 'Sétarepülés', leiras: 'Sétarepülés leírása', ar: 15000, kategoria: 'élmény', image_url: 'setarepules.jpg', link_url: 'https://elmenyrepulesek.hu/uzlet/setarepules/budapest-latvanyossagai-setarepules' },

  { nev: 'Puzzle játék', leiras: 'Puzzle játék leírása', ar: 5000, kategoria: 'tárgy', image_url: 'puzzle.jpg', link_url: 'https://www.puzzlekucko.hu/termek/anatolian-1000-darabos-1143-doggies-in-the-bedroom' },

  { nev: 'Romantikus vacsora', leiras: 'Romantikus vacsora leírása', ar: 15000, kategoria: 'élmény', image_url: 'romvacs.jpg', link_url: 'https://meglepkek.hu/romantika-es-lanykeres/romantikus-vacsora-es-hajozas-a-dunan' },

  { nev: 'Egyedi póló', leiras: 'Egyedi póló leírása', ar: 5000, kategoria: 'tárgy', image_url: 'egyedipolo.jpg', link_url: 'https://pamutlabor.hu/egyedi' },

  { nev: 'Csokoládé válogatás', leiras: 'Csokoládé válogatás leírása', ar: 5000, kategoria: 'tárgy', image_url: 'csokoladevalogatas.jpg', link_url: 'https://veghmeli.com/termek/kezzel-keszitett-bonbon-valogatas-egyedulalloan-szep-diszcsomagolasban/' },

  { nev: 'Színházjegy', leiras: 'Színházjegy leírása', ar: 12000, kategoria: 'élmény', image_url: 'szinhaz.jpg', link_url: 'https://www.jegy.hu/ajandekkartya' },

  { nev: 'Gokartozás', leiras: 'Gokartozás leírása', ar: 8000, kategoria: 'élmény', image_url: 'gokart.jpg', link_url: 'https://gokartvac.hu/idopont-foglalas-vaci-gokart-palya/' },

  { nev: 'Festőkészlet', leiras: 'Festőkészlet leírása', ar: 9278, kategoria: 'tárgy', image_url: 'festokeszlet.jpg', link_url: 'https://www.emag.hu/vincent-188-reszes-festokeszlet-4054673402117/pd/D16CZBMBM/' },

  { nev: 'Okosóra', leiras: 'Okosóra leírása', ar: 50000, kategoria: 'tárgy', image_url: 'okosora.jpg', link_url: 'https://okosora-aktivitasmero.arukereso.hu/' },

  { nev: 'Parfüm', leiras: 'Parfüm leírása', ar: 40000, kategoria: 'tárgy', image_url: 'parfum.jpg', link_url: 'https://www.notino.hu/parfumok/' },

  { nev: 'Társasjáték', leiras: 'Társasjáték leírása', ar: 5000, kategoria: 'tárgy', image_url: 'tarsas.jpg', link_url: 'https://tarsasjatekrendeles.hu/TOP_50' },

  { nev: 'Borkóstoló', leiras: 'Borkóstoló leírása', ar: 12000, kategoria: 'élmény', image_url: 'borkost.jpg', link_url: 'https://elmenyplaza.hu/elmeny-kategoriak/gasztronomiai-kalandok/borkostolok' },

  { nev: 'Szabadulószoba', leiras: 'Szabadulószoba leírása', ar: 10000, kategoria: 'élmény', image_url: 'szabadulo.jpg', link_url: 'https://booking.neverland.hu/hu/gift' },

  { nev: 'Állatkerti belépő', leiras: 'Állatkerti belépő leírása', ar: 6000, kategoria: 'élmény', image_url: 'allatkert.jpg', link_url: 'https://tickets.zoobudapest.com/hu/' },

  { nev: 'Főzőtanfolyam', leiras: 'Főzőtanfolyam leírása', ar: 6000, kategoria: 'élmény', image_url: 'fozotan.jpg', link_url: 'https://elmenyplaza.hu/elmeny-kategoriak/gasztronomiai-kalandok/fozotanfolyamok' },

  { nev: 'Masszázs utalvány', leiras: 'Masszázs utalvány leírása', ar: 10000, kategoria: 'élmény', image_url: 'masszazs.jpg', link_url: 'https://www.chmassage.hu/hu/ajandekutalvany' },

  { nev: 'Jegy koncertre', leiras: 'Jegy koncertre leírása', ar: 12000, kategoria: 'élmény', image_url: 'koncert.jpg', link_url: 'https://www.budapestpark.hu/' },

  { nev: 'Tánctanfolyam', leiras: 'Tánctanfolyam leírása', ar: 8000, kategoria: 'élmény', image_url: 'tanc.jpg', link_url: 'https://tancvalaszto.hu/kezdo-tanfolyamok.html' },

  { nev: 'Kertészeti szett', leiras: 'Kertészeti szett leírása', ar: 20000, kategoria: 'tárgy', image_url: 'kertesz.jpg', link_url: 'https://www.csepeligravir.hu/termek/kerteszeti-szett-gravirozas-nelkuli-termek/' },

  { nev: 'Hobbi készlet', leiras: 'Hobbi készlet leírása', ar: 12968, kategoria: 'tárgy', image_url: 'hobbi.jpg', link_url: 'https://www.kreativhobby.hu/ajandekotletek-2117' },

  { nev: 'Plüssfigura', leiras: 'Plüssfigura leírása', ar: 4000, kategoria: 'tárgy', image_url: 'pluss.png', link_url: 'https://www.plussfigurabolt.hu/termek' },

  { nev: 'Kerékpár kiegészítő', leiras: 'Kerékpár kiegészítő leírása', ar: 8415, kategoria: 'tárgy', image_url: 'bico.jpg', link_url: 'https://www.bicajbolt.hu/kiegeszitok' },

  { nev: 'Laptop táska', leiras: 'Laptop táska leírása', ar: 10995, kategoria: 'tárgy', image_url: 'ltaska.jpg', link_url: 'https://www.laptoptaska.hu/termek' },

  { nev: 'Napernyő', leiras: 'Napernyő leírása', ar: 4214, kategoria: 'tárgy', image_url: 'napernyo.jpg', link_url: 'https://www.napernyobolt.hu/termek' },

  { nev: 'Sportcipő', leiras: 'Sportcipő leírása', ar: 9880, kategoria: 'tárgy', image_url: 'sportcipo.jpg', link_url: 'https://www.sportcipobolt.hu/termek' },

  { nev: 'Hátizsák', leiras: 'Hátizsák leírása', ar: 12350, kategoria: 'tárgy', image_url: 'hatizsak.jpg', link_url: 'https://www.hatizsakbolt.hu/termek' },

  { nev: 'Laptop hűtőpad', leiras: 'Laptop hűtőpad leírása', ar: 9612, kategoria: 'tárgy', image_url: 'lhuto.jpg', link_url: 'https://www.laptophutopad.hu/termek' },

  { nev: 'LED lámpa', leiras: 'LED lámpa leírása', ar: 3426, kategoria: 'élmény', image_url: 'ledlampa.jpg', link_url: 'https://www.ledlampabolt.hu/termek' },

  { nev: 'Szépségcsomag', leiras: 'Szépségcsomag leírása', ar: 8991, kategoria: 'tárgy', image_url: 'szep.jpg', link_url: 'https://www.szepsegcsomag.hu/termek' },

  { nev: 'Fitness bérlet', leiras: 'Fitness bérlet leírása', ar: 11475, kategoria: 'élmény', image_url: 'fitness.jpg', link_url: 'https://www.fitnessberlet.hu/termek' },

  { nev: 'VR szemüveg', leiras: 'VR szemüveg leírása', ar: 15204, kategoria: 'tárgy', image_url: 'vr.jpg', link_url: 'https://www.vrszemuveg.hu/termek' },

  { nev: 'Hangszóró', leiras: 'Hangszóró leírása', ar: 4263, kategoria: 'tárgy', image_url: 'hangszoro.jpg', link_url: 'https://www.hangszorobolt.hu/termek' },

  { nev: 'Bluetooth fülhallgató', leiras: 'Bluetooth fülhallgató leírása', ar: 101883, kategoria: 'tárgy', image_url: 'ful.jpg', link_url: null },

  { nev: 'Ékszer szett', leiras: 'Ékszer szett leírása', ar: 14018, kategoria: 'tárgy', image_url: 'ekszer.jpg', link_url: null },

  { nev: 'Fotóalbum', leiras: 'Fotóalbum leírása', ar: 8759, kategoria: 'tárgy', image_url: 'album.jpg', link_url: null },

  { nev: 'Könyvcsomag', leiras: 'Könyvcsomag leírása', ar: 7363, kategoria: 'tárgy', image_url: 'konyvcsomag.jpg', link_url: null },

  { nev: 'Italválogatás', leiras: 'Italválogatás leírása', ar: 18626, kategoria: 'tárgy', image_url: 'ital.jpg', link_url: null },

  { nev: 'Vezetéstechnikai tréning', leiras: 'Vezetéstechnikai tréning leírása', ar: 80593, kategoria: 'élmény', image_url: 'trening.jpg', link_url: null },

  { nev: 'Nyári tábor belépő', leiras: 'Nyári tábor belépő leírása', ar: 20000, kategoria: 'élmény', image_url: 'tabor.jpg', link_url: null },

  { nev: 'Konyhai robotgép', leiras: 'Konyhai robotgép leírása', ar: 17563, kategoria: 'tárgy', image_url: 'robotgep.jpg', link_url: null },

  { nev: 'Bögre szett', leiras: 'Bögre szett leírása', ar: 3739, kategoria: 'tárgy', image_url: 'bogreszett.jpg', link_url: null },

  { nev: 'Hobbi magazin előfizetés', leiras: 'Hobbi magazin előfizetés leírása', ar: 4553, kategoria: 'tárgy', image_url: 'magazin.jpg', link_url: null },

  { nev: 'Kézműves csokoládé', leiras: 'Kézműves csokoládé leírása', ar: 4559, kategoria: 'tárgy', image_url: 'kezcsoki.jpg', link_url: null },

  { nev: 'Gyertyakészlet', leiras: 'Gyertyakészlet leírása', ar: 3539, kategoria: 'tárgy', image_url: 'gyertya.jpg', link_url: null },

  { nev: 'Retro játék konzol', leiras: 'Retro játék konzol leírása', ar: 32649, kategoria: 'tárgy', image_url: 'retrokonzol.jpg', link_url: null },

  { nev: 'Mini drón', leiras: 'Mini drón játék leírása', ar: 15999, kategoria: 'tárgy', image_url: 'minidron.jpg', link_url: 'https://dronebolt.hu/mini-dron' },

  { nev: 'Szappankészítő készlet', leiras: 'Szappankészítő készlet leírása', ar: 8345, kategoria: 'tárgy', image_url: 'szappan.jpg', link_url: 'https://hobbivilag.hu/szappankeszito' },

  { nev: 'Borkóstoló hétvége', leiras: 'Borkóstoló hétvége leírása', ar: 12210, kategoria: 'élmény', image_url: 'borkost.jpg', link_url: 'https://elmenyplaza.hu/borkostolo' },

  { nev: 'Okostermosztát', leiras: 'Okostermosztát leírása', ar: 20499, kategoria: 'tárgy', image_url: 'okostermosz.jpg', link_url: 'https://okosotthon.hu/okostermosztat' },

  { nev: 'Retro vinyl lemez', leiras: 'Retro vinyl lemez leírása', ar: 7530, kategoria: 'tárgy', image_url: 'vinyl.jpg', link_url: 'https://zenebolt.hu/vinyl' },

  { nev: 'Jóga bérlet', leiras: 'Jóga bérlet leírása', ar: 12345, kategoria: 'élmény', image_url: 'jogaberlet.jpg', link_url: 'https://fitnessextra.hu/joga-berlet' },

  { nev: 'Kézműves bögre', leiras: 'Kézműves bögre leírása', ar: 6789, kategoria: 'tárgy', image_url: 'kezmuvesbogre.jpg', link_url: 'https://keramia.hu/keszlet/bogre' },

  { nev: 'VR játék élmény', leiras: 'VR játék élmény leírása', ar: 31999, kategoria: 'élmény', image_url: 'vrelmeny.jpg', link_url: 'https://vrworld.hu/jatek' },

  { nev: 'Színező készlet', leiras: 'Színező készlet leírása', ar: 2540, kategoria: 'tárgy', image_url: 'szinezo.jpg', link_url: 'https://hobbivilag.hu/szinezokeszlet' },

  { nev: 'Főzőtanfolyam gasztronómia', leiras: 'Főzőtanfolyam leírása', ar: 21450, kategoria: 'élmény', image_url: 'fozotanfolyam.jpg', link_url: 'https://gasztrotanfolyam.hu/fozo' },

  { nev: 'Masszázs hétvége', leiras: 'Masszázs hétvége leírása', ar: 18999, kategoria: 'élmény', image_url: 'masszazshet.jpg', link_url: 'https://wellnessguru.hu/masszazs' },

  { nev: 'Okos kulcstartó', leiras: 'Okos kulcstartó leírása', ar: 5420, kategoria: 'tárgy', image_url: 'okoskulcs.jpg', link_url: 'https://okoseszkozok.hu/kulcstarto' },

  { nev: 'Beltéri növény szett', leiras: 'Beltéri növény szett leírása', ar: 11234, kategoria: 'tárgy', image_url: 'novenyszett.jpg', link_url: 'https://kertvarazs.hu/belteri-noveny' },

  { nev: 'Színház bérlet', leiras: 'Színház bérlet leírása', ar: 36500, kategoria: 'élmény', image_url: 'szinhazber.jpg', link_url: 'https://jegy.hu/szinhaz' },

  { nev: 'Borkóstoló vacsora', leiras: 'Borkóstoló vacsora leírása', ar: 10999, kategoria: 'élmény', image_url: 'borvacs.jpg', link_url: 'https://gasztroelmeny.hu/borkostolo' },

  { nev: 'Kézműves gyertya készlet', leiras: 'Kézműves gyertya készlet leírása', ar: 3299, kategoria: 'tárgy', image_url: 'gyertya.jpg', link_url: 'https://hobbivilag.hu/gyertyakeszlet' },

  { nev: 'Kerékpáros túra', leiras: 'Kerékpáros túra leírása', ar: 17450, kategoria: 'élmény', image_url: 'kerektura.jpg', link_url: 'https://elmenyut.hu/kerekparos' },

  { nev: 'VR kaland', leiras: 'VR kaland leírása', ar: 34999, kategoria: 'élmény', image_url: 'vr.jpg', link_url: 'https://vrkalandozas.hu' },

  { nev: 'Kézműves ékszer', leiras: 'Kézműves ékszer leírása', ar: 11999, kategoria: 'tárgy', image_url: 'ekszer.jpg', link_url: 'https://kezmuvesekszerek.hu' },

  { nev: 'Séta a városban', leiras: 'Séta a városban leírása', ar: 0, kategoria: 'élmény', image_url: 'seta.jpg', link_url: 'https://varoserteke.hu/seta' },

  { nev: 'Okos lámpa', leiras: 'Okos lámpa leírása', ar: 9450, kategoria: 'tárgy', image_url: 'okoslampa.jpg', link_url: 'https://okosotthon.hu/lampa' },

  { nev: 'Festőkészlet deluxe', leiras: 'Festőkészlet deluxe leírása', ar: 18999, kategoria: 'tárgy', image_url: 'festokeszlet.jpg', link_url: 'https://festokeszlet.hu/deluxe' },

  { nev: 'Kalandpark belépő', leiras: 'Kalandpark belépő leírása', ar: 22500, kategoria: 'élmény', image_url: 'kalandpark.jpg', link_url: 'https://kalandpark.hu/belépő' },

  { nev: 'Borkóstoló élmény', leiras: 'Borkóstoló élmény leírása', ar: 12500, kategoria: 'élmény', image_url: 'bor.jpg', link_url: 'https://elmenyplaza.hu/borkostolo' },

  { nev: 'Egyedi fotóalbum', leiras: 'Egyedi fotóalbum leírása', ar: 11450, kategoria: 'tárgy', image_url: 'album.jpg', link_url: 'https://fotoalbum.hu/egyedi' },

  { nev: 'Szabadulószoba élmény', leiras: 'Szabadulószoba élmény leírása', ar: 17250, kategoria: 'élmény', image_url: 'szabadulo.jpg', link_url: 'https://szabaduloszoba.hu' },

  { nev: 'Hőlégballon túra', leiras: 'Hőlégballon túra leírása', ar: 8999, kategoria: 'élmény', image_url: 'ballon.jpg', link_url: 'https://ballon.hu' },

  { nev: 'Okos termosz', leiras: 'Okos termosz leírása', ar: 4250, kategoria: 'tárgy', image_url: 'okostermosz.jpg', link_url: 'https://okosotthon.hu/termosz' },

  { nev: 'DIY dekoráció', leiras: 'DIY dekoráció leírása', ar: 7540, kategoria: 'tárgy', image_url: 'diy.jpg', link_url: 'https://hobbivilag.hu/dekoracio' },

  { nev: 'Fitness szett', leiras: 'Fitness szett leírása', ar: 18499, kategoria: 'tárgy', image_url: 'fitnessszett.jpg', link_url: 'https://fitnessbolt.hu/szett' },

  { nev: 'Mini színházi előadás', leiras: 'Mini színházi előadás leírása', ar: 10250, kategoria: 'élmény', image_url: 'szinhaz.jpg', link_url: 'https://szinhaz.hu/minieloadas' }

];

const felhasznalok = [

  { user_id: 1, name: 'Viktória', email: 'viktoria@mail.com', password: 'pass123' },

  { user_id: 2, name: 'Lilla', email: 'lilla@mail.com', password: 'pass456' },

  { user_id: 3, name: 'Gábor', email: 'gabor@mail.com', password: 'pass789' },

  { user_id: 4, name: 'Anna', email: 'anna@mail.com', password: 'pass321' },

  { user_id: 5, name: 'Tamás', email: 'tamas@mail.com', password: 'pass654' },

  { user_id: 6, name: 'Katalin', email: 'katalin@mail.com', password: 'pass987' },

  { user_id: 7, name: 'Miklós', email: 'miklos@mail.com', password: 'pass741' },

  { user_id: 8, name: 'Eszter', email: 'eszter@mail.com', password: 'pass852' },

  { user_id: 9, name: 'Zoltán', email: 'zoltan@mail.com', password: 'pass963' },

  { user_id: 10, name: 'Judit', email: 'judit@mail.com', password: 'pass159' },

  { user_id: 11, name: 'Péter', email: 'peter@mail.com', password: 'pass753' },

  { user_id: 12, name: 'Dóra', email: 'dora@mail.com', password: 'pass456' },

  { user_id: 13, name: 'Balázs', email: 'balazs@mail.com', password: 'pass852' },

  { user_id: 14, name: 'Réka', email: 'reka@mail.com', password: 'pass369' },

  { user_id: 15, name: 'András', email: 'andras@mail.com', password: 'pass147' }

];

const ajandekAlkalomok = [
// 1. Vidám bögre
{ ajandek_id: 1, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 1, alkalom_id: 2 }, // Karácsony
{ ajandek_id: 1, alkalom_id: 10 }, // Névnap
// 2. Wellness hétvége
{ ajandek_id: 2, alkalom_id: 3 }, // Valentin-nap
{ ajandek_id: 2, alkalom_id: 13 }, // Évforduló
{ ajandek_id: 2, alkalom_id: 15 }, // Házassági évforduló
// 3. DIY kézműves készlet
{ ajandek_id: 3, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 3, alkalom_id: 6 }, // Anyák napja
// 4. Szakácskönyv
{ ajandek_id: 4, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 4, alkalom_id: 2 }, // Karácsony
// 5. Sétarepülés
{ ajandek_id: 5, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 5, alkalom_id: 13 }, // Évforduló
// 6. Puzzle játék
{ ajandek_id: 6, alkalom_id: 2 }, // Karácsony
{ ajandek_id: 6, alkalom_id: 11 }, // Mikulás
// 7. Romantikus vacsora
{ ajandek_id: 7, alkalom_id: 3 }, // Valentin-nap
{ ajandek_id: 7, alkalom_id: 13 }, // Évforduló
// 8. Egyedi póló
{ ajandek_id: 8, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 8, alkalom_id: 10 }, // Névnap
// 9. Csokoládé válogatás
{ ajandek_id: 9, alkalom_id: 2 }, // Karácsony
{ ajandek_id: 9, alkalom_id: 3 }, // Valentin-nap
// 10. Színházjegy
{ ajandek_id: 10, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 10, alkalom_id: 13 }, // Évforduló
// 11. Gokartozás
{ ajandek_id: 11, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 11, alkalom_id: 16 }, // Barátság napja
// 12. Festőkészlet
{ ajandek_id: 12, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 12, alkalom_id: 6 }, // Anyák napja
// 13. Okosóra
{ ajandek_id: 13, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 13, alkalom_id: 2 }, // Karácsony
// 14. Parfüm
{ ajandek_id: 14, alkalom_id: 3 }, // Valentin-nap
{ ajandek_id: 14, alkalom_id: 10 }, // Névnap
// 15. Társasjáték
{ ajandek_id: 15, alkalom_id: 2 }, // Karácsony
{ ajandek_id: 15, alkalom_id: 16 }, // Barátság napja
// 16. Borkóstoló
{ ajandek_id: 16, alkalom_id: 13 }, // Évforduló
{ ajandek_id: 16, alkalom_id: 22 }, // Jubileum
// 17. Szabadulószoba
{ ajandek_id: 17, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 17, alkalom_id: 23 }, // Búcsúzkodó buli
// 18. Állatkerti belépő
{ ajandek_id: 18, alkalom_id: 8 }, // Húsvét
{ ajandek_id: 18, alkalom_id: 25 }, // Gyermek születés
// 19. Főzőtanfolyam
{ ajandek_id: 19, alkalom_id: 13 }, // Évforduló
{ ajandek_id: 19, alkalom_id: 15 }, // Házassági évforduló
// 20. Masszázs utalvány
{ ajandek_id: 20, alkalom_id: 6 }, // Anyák napja
{ ajandek_id: 20, alkalom_id: 19 }, // Köszönetnyilvánítás
// 21. Jegy koncertre
{ ajandek_id: 21, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 21, alkalom_id: 16 }, // Barátság napja
// 22. Tánctanfolyam
{ ajandek_id: 22, alkalom_id: 3 }, // Valentin-nap
{ ajandek_id: 22, alkalom_id: 13 }, // Évforduló
// 23. Kertészeti szett
{ ajandek_id: 23, alkalom_id: 8 }, // Húsvét
{ ajandek_id: 23, alkalom_id: 6 }, // Anyák napja
// 24. Hobbi készlet
{ ajandek_id: 24, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 24, alkalom_id: 2 }, // Karácsony
// 25. Plüssfigura
{ ajandek_id: 25, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 25, alkalom_id: 8 }, // Húsvét
// 26. Kerékpár kiegészítő
{ ajandek_id: 26, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 26, alkalom_id: 17 }, // Új év
// 27. Laptop táska
{ ajandek_id: 27, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 27, alkalom_id: 14 }, // Diplomaosztó
// 28. Napernyő
{ ajandek_id: 28, alkalom_id: 2 }, // Karácsony
{ ajandek_id: 28, alkalom_id: 8 }, // Húsvét
// 29. Sportcipő
{ ajandek_id: 29, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 29, alkalom_id: 17 }, // Új év
// 30. Hátizsák
{ ajandek_id: 30, alkalom_id: 1 }, // Születésnap
{ ajandek_id: 30, alkalom_id: 2 }, // Karácsony
{ ajandek_id: 31, alkalom_id: 1 }, { ajandek_id: 31, alkalom_id: 2 },
{ ajandek_id: 32, alkalom_id: 3 }, { ajandek_id: 32, alkalom_id: 13 },
{ ajandek_id: 33, alkalom_id: 8 }, { ajandek_id: 33, alkalom_id: 6 },
{ ajandek_id: 34, alkalom_id: 1 }, { ajandek_id: 34, alkalom_id: 2 },
{ ajandek_id: 35, alkalom_id: 1 }, { ajandek_id: 35, alkalom_id: 8 },
{ ajandek_id: 36, alkalom_id: 1 }, { ajandek_id: 36, alkalom_id: 17 },
{ ajandek_id: 37, alkalom_id: 1 }, { ajandek_id: 37, alkalom_id: 14 },
{ ajandek_id: 38, alkalom_id: 2 }, { ajandek_id: 38, alkalom_id: 8 },
{ ajandek_id: 39, alkalom_id: 1 }, { ajandek_id: 39, alkalom_id: 17 },
{ ajandek_id: 40, alkalom_id: 1 }, { ajandek_id: 40, alkalom_id: 2 },
{ ajandek_id: 41, alkalom_id: 1 }, { ajandek_id: 41, alkalom_id: 2 },
{ ajandek_id: 42, alkalom_id: 3 }, { ajandek_id: 42, alkalom_id: 13 },
{ ajandek_id: 43, alkalom_id: 8 }, { ajandek_id: 43, alkalom_id: 6 },
{ ajandek_id: 44, alkalom_id: 1 }, { ajandek_id: 44, alkalom_id: 2 },
{ ajandek_id: 45, alkalom_id: 1 }, { ajandek_id: 45, alkalom_id: 8 },
{ ajandek_id: 46, alkalom_id: 1 }, { ajandek_id: 46, alkalom_id: 17 },
{ ajandek_id: 47, alkalom_id: 1 }, { ajandek_id: 47, alkalom_id: 14 },
{ ajandek_id: 48, alkalom_id: 2 }, { ajandek_id: 48, alkalom_id: 8 },
{ ajandek_id: 49, alkalom_id: 1 }, { ajandek_id: 49, alkalom_id: 17 },
{ ajandek_id: 50, alkalom_id: 1 }, { ajandek_id: 50, alkalom_id: 2 }
];



// --- Alkalmak (példa, töltsd ki a saját adataiddal) ---
const alkalmak = [
  { id: 1, nev: 'Születésnap' },
  { id: 2, nev: 'Karácsony' },
  { id: 3, nev: 'Valentin-nap' },
  { id: 4, nev: 'Anyák napja' },
  { id: 5, nev: 'Apák napja' },
  { id: 6, nev: 'Anyák napja' },
  { id: 7, nev: 'Gyermeknap' },
  { id: 8, nev: 'Húsvét' },
  { id: 9, nev: 'Ballagás' },
  { id: 10, nev: 'Névnap' },
  { id: 11, nev: 'Mikulás' },
  { id: 12, nev: 'Karrier' },
  { id: 13, nev: 'Évforduló' },
  { id: 14, nev: 'Diplomaosztó' },
  { id: 15, nev: 'Házassági évforduló' },
  { id: 16, nev: 'Barátság napja' },
  { id: 17, nev: 'Új év' },
  { id: 18, nev: 'Anyák napja' },
  { id: 19, nev: 'Köszönetnyilvánítás' },
  { id: 20, nev: 'Karácsony' },
  { id: 21, nev: 'Gyermeknap' },
  { id: 22, nev: 'Jubileum' },
  { id: 23, nev: 'Búcsúzkodó buli' },
  { id: 24, nev: 'Ballagás' },
  { id: 25, nev: 'Gyermek születés' }
];

// --- Celcsoportok (példa, töltsd ki a saját adataiddal) ---
const celcsoportok = [
  { id: 1, nev: 'Gyerekek' },
  { id: 2, nev: 'Felnőttek' },
  { id: 3, nev: 'Idősek' },
  { id: 4, nev: 'Párok' },
  { id: 5, nev: 'Barátok' },
  { id: 6, nev: 'Szülők' },
  { id: 7, nev: 'Kollégák' }
];

const ajandekCelcsoportok = [
// 1. Vidám bögre
{ ajandek_id: 1, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 1, celcsoport_id: 5 }, // barátok
// 2. Wellness hétvége
{ ajandek_id: 2, celcsoport_id: 4 }, // párok
// 3. DIY kézműves készlet
{ ajandek_id: 3, celcsoport_id: 1 }, // gyerekek
{ ajandek_id: 3, celcsoport_id: 2 }, // felnőttek
// 4. Szakácskönyv
{ ajandek_id: 4, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 4, celcsoport_id: 6 }, // szülők
// 5. Sétarepülés
{ ajandek_id: 5, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 5, celcsoport_id: 4 }, // párok
// 6. Puzzle játék
{ ajandek_id: 6, celcsoport_id: 1 }, // gyerekek
{ ajandek_id: 6, celcsoport_id: 3 }, // idősek
// 7. Romantikus vacsora
{ ajandek_id: 7, celcsoport_id: 4 }, // párok
// 8. Egyedi póló
{ ajandek_id: 8, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 8, celcsoport_id: 5 }, // barátok
// 9. Csokoládé válogatás
{ ajandek_id: 9, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 9, celcsoport_id: 5 }, // barátok
// 10. Színházjegy
{ ajandek_id: 10, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 10, celcsoport_id: 4 },// párok
// 11. Gokartozás
{ ajandek_id: 11, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 11, celcsoport_id: 5 }, // barátok
// 12. Festőkészlet
{ ajandek_id: 12, celcsoport_id: 1 }, // gyerekek
{ ajandek_id: 12, celcsoport_id: 2 }, // felnőttek
// 13. Okosóra
{ ajandek_id: 13, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 13, celcsoport_id: 7 }, // kollégák
// 14. Parfüm
{ ajandek_id: 14, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 14, celcsoport_id: 4 }, // párok
// 15. Társasjáték
{ ajandek_id: 15, celcsoport_id: 5 }, // barátok
{ ajandek_id: 15, celcsoport_id: 6 }, // szülők
// 16. Borkóstoló
{ ajandek_id: 16, celcsoport_id: 4 }, // párok
// 17. Szabadulószoba
{ ajandek_id: 17, celcsoport_id: 5 }, // barátok
{ ajandek_id: 17, celcsoport_id: 7 }, // kollégák
// 18. Állatkerti belépő
{ ajandek_id: 18, celcsoport_id: 1 }, // gyerekek
{ ajandek_id: 18, celcsoport_id: 6 }, // szülők
// 19. Főzőtanfolyam
{ ajandek_id: 19, celcsoport_id: 4 }, // párok
{ ajandek_id: 19, celcsoport_id: 2 }, // felnőttek
// 20. Masszázs utalvány
{ ajandek_id: 20, celcsoport_id: 6 }, // szülők
{ ajandek_id: 20, celcsoport_id: 2 },// felnőttek
// 21. Jegy koncertre
{ ajandek_id: 21, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 21, celcsoport_id: 5 }, // barátok
// 22. Tánctanfolyam
{ ajandek_id: 22, celcsoport_id: 4 }, // párok
{ ajandek_id: 22, celcsoport_id: 2 }, // felnőttek
// 23. Kertészeti szett
{ ajandek_id: 23, celcsoport_id: 6 }, // szülők
{ ajandek_id: 23, celcsoport_id: 2 }, // felnőttek
// 24. Hobbi készlet
{ ajandek_id: 24, celcsoport_id: 1 }, // gyerekek
{ ajandek_id: 24, celcsoport_id: 2 }, // felnőttek
// 25. Plüssfigura
{ ajandek_id: 25, celcsoport_id: 1 }, // gyerekek
{ ajandek_id: 25, celcsoport_id: 5 }, // barátok
// 26. Kerékpár kiegészítő
{ ajandek_id: 26, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 26, celcsoport_id: 5 }, // barátok
// 27. Laptop táska
{ ajandek_id: 27, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 27, celcsoport_id: 7 }, // kollégák
// 28. Napernyő
{ ajandek_id: 28, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 28, celcsoport_id: 6 }, // szülők
// 29. Sportcipő
{ ajandek_id: 29, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 29, celcsoport_id: 5 }, // barátok
// 30. Hátizsák
{ ajandek_id: 30, celcsoport_id: 2 }, // felnőttek
{ ajandek_id: 30, celcsoport_id: 1 }, // gyerekek
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

// --- Ajándék <-> Stílus pivot táblás kezelés ---
// Minden stílushoz legalább 3 ajándék, kézzel, jól olvashatóan csoportosítva
const ajandekStilusok = [
  // 1. Vicces
  { ajandek_id: 1, stilus_id: 1 }, // Vidám bögre
  { ajandek_id: 10, stilus_id: 1 }, // Színházjegy
  { ajandek_id: 44, stilus_id: 1 }, // Gyertyakészlet

  // 2. Hasznos
  { ajandek_id: 6, stilus_id: 2 }, // Puzzle játék
  { ajandek_id: 15, stilus_id: 2 }, // Társasjáték
  { ajandek_id: 40, stilus_id: 2 }, // Italválogatás

  // 3. Luxus
  { ajandek_id: 13, stilus_id: 3 }, // Okosóra
  { ajandek_id: 14, stilus_id: 3 }, // Parfüm
  { ajandek_id: 21, stilus_id: 3 }, // Jegy koncertre

  // 4. Kézműves
  { ajandek_id: 3, stilus_id: 4 }, // DIY kézműves készlet
  { ajandek_id: 24, stilus_id: 4 }, // Hobbi készlet
  { ajandek_id: 47, stilus_id: 4 }, // Kézműves ékszer

  // 5. Romantikus
  { ajandek_id: 7, stilus_id: 5 }, // Romantikus vacsora
  { ajandek_id: 14, stilus_id: 5 }, // Parfüm
  { ajandek_id: 16, stilus_id: 5 }, // Borkóstoló

  // 6. Technológias
  { ajandek_id: 13, stilus_id: 6 }, // Okosóra
  { ajandek_id: 32, stilus_id: 6 }, // LED lámpa
  { ajandek_id: 41, stilus_id: 6 }, // Hangszóró

  // 7. Egyedi
  { ajandek_id: 8, stilus_id: 7 }, // Egyedi póló
  { ajandek_id: 47, stilus_id: 7 }, // Kézműves ékszer
  { ajandek_id: 50, stilus_id: 7 }, // Egyedi fotóalbum

  // 8. Kreatív
  { ajandek_id: 3, stilus_id: 8 }, // DIY kézműves készlet
  { ajandek_id: 12, stilus_id: 8 }, // Festőkészlet
  { ajandek_id: 24, stilus_id: 8 }, // Hobbi készlet

  // 9. Praktikus
  { ajandek_id: 6, stilus_id: 9 }, // Puzzle játék
  { ajandek_id: 28, stilus_id: 9 }, // Napernyő
  { ajandek_id: 40, stilus_id: 9 }, // Italválogatás

  // 10. Elegáns
  { ajandek_id: 14, stilus_id: 10 }, // Parfüm
  { ajandek_id: 21, stilus_id: 10 }, // Jegy koncertre
  { ajandek_id: 50, stilus_id: 10 }, // Egyedi fotóalbum

  // 11. Extrém
  { ajandek_id: 5, stilus_id: 11 }, // Sétarepülés
  { ajandek_id: 11, stilus_id: 11 }, // Gokartozás
  { ajandek_id: 46, stilus_id: 11 }, // Fitness szett

  // 12. Sportos
  { ajandek_id: 29, stilus_id: 12 }, // Sportcipő
  { ajandek_id: 36, stilus_id: 12 }, // Fitness bérlet
  { ajandek_id: 46, stilus_id: 12 }, // Fitness szett

  // 13. Képzőművészeti
  { ajandek_id: 12, stilus_id: 13 }, // Festőkészlet
  { ajandek_id: 44, stilus_id: 13 }, // Gyertyakészlet
  { ajandek_id: 47, stilus_id: 13 }, // Kézműves ékszer

  // 14. Gasztronómiai
  { ajandek_id: 4, stilus_id: 14 }, // Szakácskönyv
  { ajandek_id: 19, stilus_id: 14 }, // Főzőtanfolyam
  { ajandek_id: 45, stilus_id: 14 }, // Kézműves csokoládé

  // 15. DIY
  { ajandek_id: 3, stilus_id: 15 }, // DIY kézműves készlet
  { ajandek_id: 24, stilus_id: 15 }, // Hobbi készlet
  { ajandek_id: 48, stilus_id: 15 }, // DIY dekoráció

  // 16. Vintage
  { ajandek_id: 10, stilus_id: 16 }, // Színházjegy
  { ajandek_id: 49, stilus_id: 16 }, // Retro vinyl lemez
  { ajandek_id: 45, stilus_id: 16 }, // Kézműves csokoládé

  // 17. Zenei
  { ajandek_id: 21, stilus_id: 17 }, // Jegy koncertre
  { ajandek_id: 41, stilus_id: 17 }, // Hangszóró
  { ajandek_id: 49, stilus_id: 17 }, // Retro vinyl lemez

  // 18. Otthoni
  { ajandek_id: 1, stilus_id: 18 }, // Vidám bögre
  { ajandek_id: 44, stilus_id: 18 }, // Gyertyakészlet
  { ajandek_id: 23, stilus_id: 18 }, // Kertészeti szett

  // 19. Utazós
  { ajandek_id: 5, stilus_id: 19 }, // Sétarepülés
  { ajandek_id: 30, stilus_id: 19 }, // Hátizsák
  { ajandek_id: 27, stilus_id: 19 }, // Laptop táska

  // 20. Trendkövető
  { ajandek_id: 13, stilus_id: 20 }, // Okosóra
  { ajandek_id: 32, stilus_id: 20 }, // LED lámpa
  { ajandek_id: 41, stilus_id: 20 }  // Hangszóró
];

// --- Ensure every alkalom, celcsoport has at least 3 gifts (pivot tábla verzió) ---
function ensureMinimumAssociations() {
  // Helper to get unique IDs
  const unique = arr => [...new Set(arr)];

  // --- Alkalom ---
  alkalmak.forEach(alkalom => {
    let used = ajandekAlkalomok.filter(a => a.alkalom_id === alkalom.id).map(a => a.ajandek_id);
    let available = ajandekok.map((_, i) => i + 1).filter(id => !used.includes(id));
    let count = used.length;
    let idx = 0;
    while (count < 3) {
      const ajandek_id = available[idx % available.length];
      ajandekAlkalomok.push({ ajandek_id, alkalom_id: alkalom.id });
      count++;
      idx++;
      if (available.length === 0) break;
    }
  });

  // --- Celcsoport ---
  celcsoportok.forEach(celcsoport => {
    let used = ajandekCelcsoportok.filter(a => a.celcsoport_id === celcsoport.id).map(a => a.ajandek_id);
    let available = ajandekok.map((_, i) => i + 1).filter(id => !used.includes(id));
    let count = used.length;
    let idx = 0;
    while (count < 3) {
      const ajandek_id = available[idx % available.length];
      ajandekCelcsoportok.push({ ajandek_id, celcsoport_id: celcsoport.id });
      count++;
      idx++;
      if (available.length === 0) break;
    }
  });

  // --- Minden ajándékhoz legalább 1 stílus legyen hozzárendelve ---
  // (NEM kell, mert kézzel töltjük az ajandekStilusok tömböt)
}

ensureMinimumAssociations();

// --- Töröld az ajándékok stilus_id mezőjét, mert már pivot táblát használunk ---
ajandekok.forEach(a => { delete a.stilus_id });



const stilusok = [
  { id: 1, nev: 'Vicces' },
  { id: 2, nev: 'Hasznos' },
  { id: 3, nev: 'Luxus' },
  { id: 4, nev: 'Kézműves' },
  { id: 5, nev: 'Romantikus' },
  { id: 6, nev: 'Technológias' },
  { id: 7, nev: 'Egyedi' },
  { id: 8, nev: 'Kreatív' },
  { id: 9, nev: 'Praktikus' },
  { id: 10, nev: 'Elegáns' },
  { id: 11, nev: 'Extrém' },
  { id: 12, nev: 'Sportos' },
  { id: 13, nev: 'Képzőművészeti' },
  { id: 14, nev: 'Gasztronómiai' },
  { id: 15, nev: 'DIY' },
  { id: 16, nev: 'Vintage' },
  { id: 17, nev: 'Zenei' },
  { id: 18, nev: 'Otthoni' },
  { id: 19, nev: 'Utazós' },
  { id: 20, nev: 'Trendkövető' }
];

const seedAll = async () => {

  try {

    console.log('Adatbázishoz próbálok csatlakozni...');

    // force: true -> Eldobja a táblákat és újra létrehozza őket (törli a régi adatokat)

    await db.sequelize.sync({ force: true });

    console.log('Adatbázis szinkronizálása sikeres! (Táblák újragenerálva)');


    await db.Stilus.bulkCreate(stilusok);



    await db.Alkalom.bulkCreate(alkalmak);



    await db.Celcsoport.bulkCreate(celcsoportok);



    // Fontos: individualHooks: true, hogy lefusson a jelszó hashelés!

    await db.Felhasznalo.bulkCreate(felhasznalok, { individualHooks: true });

    await db.Ajandek.bulkCreate(ajandekok);




    // ---- PIVOT: Ajándék <-> Alkalom ----
    for (const row of ajandekAlkalomok) {
    await db.sequelize.query(
      `INSERT INTO Ajandek_Alkalom (createdAt, updatedAt, ajandek_id, alkalom_id)
      VALUES (:createdAt, :updatedAt, :ajandek_id, :alkalom_id)`,
      {
        replacements: {
          createdAt: new Date(),
          updatedAt: new Date(),
          ajandek_id: row.ajandek_id,
          alkalom_id: row.alkalom_id
        },
        type: db.sequelize.QueryTypes.INSERT
      }
    );
    }

    // ---- PIVOT: Ajándék <-> Célcsoport ----
    for (const row of ajandekCelcsoportok) {
    await db.sequelize.query(
      `INSERT INTO Ajandek_Celcsoport (createdAt, updatedAt, ajandek_id, celcsoport_id)
      VALUES (:createdAt, :updatedAt, :ajandek_id, :celcsoport_id)`,
      {
        replacements: {
          createdAt: new Date(),
          updatedAt: new Date(),
          ajandek_id: row.ajandek_id,
          celcsoport_id: row.celcsoport_id
        },
        type: db.sequelize.QueryTypes.INSERT
      }
    );
    }

    // ---- PIVOT: Ajándék <-> Stílus ----
    for (const row of ajandekStilusok) {
      await db.sequelize.query(
        `INSERT INTO Ajandek_Stilus (createdAt, updatedAt, ajandek_id, stilus_id)
        VALUES (:createdAt, :updatedAt, :ajandek_id, :stilus_id)`,
        {
          replacements: {
            createdAt: new Date(),
            updatedAt: new Date(),
            ajandek_id: row.ajandek_id,
            stilus_id: row.stilus_id
          }
        }
      );
    }

    console.log('Adatok sikeresen beszúrva az adatbázisba!');

  } catch (error) {

    console.error('Hiba történt az adatok beszúrása során:', error);

  }

};

// --- Teszteld le, hogy minden rendben van-e az adatbázissal ---
const testDb = async () => {

  try {

    console.log('Tesztlekérdezés az adatbázison...');

    const [results, metadata] = await db.sequelize.query(`SELECT * FROM Ajandek LIMIT 10`);

    console.log('Tesztlekérdezés eredménye:', JSON.stringify(results, null, 2));

  } catch (error) {

    console.error('Hiba történt a tesztlekérdezés során:', error);

  }

};

// seedAll();
seedAll();
