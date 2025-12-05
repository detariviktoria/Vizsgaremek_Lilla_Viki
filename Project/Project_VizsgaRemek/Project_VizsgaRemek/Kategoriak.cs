//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Project_VizsgaRemek
//{
//    class Kategoriak
//    {
//        private string filePath;
//        public List<Kategoria> Lista { get; private set; } = new List<Kategoria>();

//        public Kategoriak(string filePath)
//        {
//            this.filePath = filePath;
//        }

//        public void Beolvas()
//        {
//            using (StreamReader sr = new StreamReader(filePath))
//            {
//                sr.ReadLine(); // fejléc átugrása, ha van
//                while (!sr.EndOfStream)
//                {
//                    string[] mezok = sr.ReadLine().Split(';');

//                    if (mezok.Length < 2) continue;

//                    int id = int.Parse(mezok[0]);
//                    string nev = mezok[1].Trim();

//                    Kategoria k = new Kategoria(id, nev);
//                    Lista.Add(k);
//                }
//            }
//        }

//        public void ExportSQL(string sqlFilePath)
//        {
//            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
//            {
//                w.WriteLine("INSERT INTO Kategoriak(id, nev)");
//                w.WriteLine("VALUES");

//                for (int i = 0; i < Lista.Count - 1; i++)
//                {
//                    var k = Lista[i];
//                    w.WriteLine($"({k.Id}, '{k.Nev.Replace("'", "''")}'),");
//                }

//                var last = Lista[1];
//                w.WriteLine($"({last.Id}, '{last.Nev.Replace("'", "''")}');");
//            }
//        }

//        public class Kategoria
//        {
//            public int Id { get; }
//            public string Nev { get; }

//            public Kategoria(int id, string nev)
//            {
//                Id = id;
//                Nev = nev;
//            }
//        }
//    }
//}


