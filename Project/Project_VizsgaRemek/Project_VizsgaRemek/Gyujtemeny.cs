//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Project_VizsgaRemek
//{
//    class GyujtemenyLista  // Ezt átneveztem
//    {
//        private string filePath;
//        public List<Gyujtemeny> Lista { get; private set; } = new List<Gyujtemeny>();

//        public GyujtemenyLista(string filePath)
//        {
//            this.filePath = filePath;
//        }

//        public void Beolvas()
//        {
//            using (StreamReader sr = new StreamReader(filePath, Encoding.UTF8))
//            {
//                sr.ReadLine(); // fejléc átugrása

//                while (!sr.EndOfStream)
//                {
//                    string line = sr.ReadLine();

//                    // Ha a sor üres → átugorjuk
//                    if (string.IsNullOrWhiteSpace(line))
//                        continue;

//                    string[] mezok = line.Split(';');

//                    // Ha nem 5 mező van → átugorjuk
//                    if (mezok.Length < 5)
//                    {
//                        Console.WriteLine($"Hibás sor: {line}");
//                        continue;
//                    }

//                    // Felesleges szóközök eltávolítása
//                    for (int i = 0; i < mezok.Length; i++)
//                        mezok[i] = mezok[i].Trim();

//                    DateTime created = DateTime.ParseExact(
//                        mezok[3],
//                        "yyyy.MM.dd HH:mm",
//                        CultureInfo.InvariantCulture
//                    );

//                    DateTime updated = DateTime.ParseExact(
//                        mezok[4],
//                        "yyyy.MM.dd HH:mm",
//                        CultureInfo.InvariantCulture
//                    );

//                    Gyujtemeny g = new Gyujtemeny(
//                        int.Parse(mezok[0]),   // id
//                        int.Parse(mezok[1]),   // felhasznalo_id
//                        mezok[2],              // nev
//                        created,
//                        updated
//                    );

//                    Lista.Add(g);
//                }
//            }
//        }



//        public void ExportSQL(string sqlFilePath)
//        {
//            if (Lista.Count == 0)
//            {
//                Console.WriteLine("Nincs adat az exporthoz.");
//                return;
//            }

//            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
//            {
//                w.WriteLine("INSERT INTO Gyujtemeny(id, felhasznalo_id, nev, created_at, updated_at)");
//                w.WriteLine("VALUES");

//                for (int i = 0; i < Lista.Count - 1; i++)
//                {
//                    var g = Lista[i];
//                    w.WriteLine(
//                        $"({g.Id}, {g.FelhasznaloId}, '{g.Nev.Replace("'", "''")}', " +
//                        $"'{g.CreatedAt:yyyy-MM-dd HH:mm:ss}', '{g.UpdatedAt:yyyy-MM-dd HH:mm:ss}'),"
//                    );
//                }

//                // utolsó sor ; helyett zárójel + pontosvessző
//                var last = Lista[Lista.Count - 1];
//                w.WriteLine(
//                    $"({last.Id}, {last.FelhasznaloId}, '{last.Nev.Replace("'", "''")}', " +
//                    $"'{last.CreatedAt:yyyy-MM-dd HH:mm:ss}', '{last.UpdatedAt:yyyy-MM-dd HH:mm:ss}');"
//                );
//            }
//        }


//        public class Gyujtemeny
//        {
//            public int Id { get; }
//            public int FelhasznaloId { get; }
//            public string Nev { get; }
//            public DateTime CreatedAt { get; }
//            public DateTime UpdatedAt { get; }

//            public Gyujtemeny(int id, int felhasznaloId, string nev, DateTime createdAt, DateTime updatedAt)
//            {
//                Id = id;
//                FelhasznaloId = felhasznaloId;
//                Nev = nev;
//                CreatedAt = createdAt;
//                UpdatedAt = updatedAt;
//            }
//        }
//    }
//    }

