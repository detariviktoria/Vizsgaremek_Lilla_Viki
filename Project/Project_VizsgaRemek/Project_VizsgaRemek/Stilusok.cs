using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


 

namespace Project_VizsgaRemek
    {
        class Stilusok
        {
            private string filePath;
            public List<Stilus> Lista { get; private set; } = new List<Stilus>();

            public Stilusok(string filePath)
            {
                this.filePath = filePath;
            }

            public void Beolvas()
            {
                using (StreamReader sr = new StreamReader(filePath))
                {
                    sr.ReadLine(); // fejléc átugrása
                    while (!sr.EndOfStream)
                    {
                        string line = sr.ReadLine();
                        if (string.IsNullOrWhiteSpace(line)) continue;

                        string[] mezok = line.Split(';');
                        if (mezok.Length < 2) continue;

                        int id = int.Parse(mezok[0]);
                        string nev = mezok[1];

                        Stilus s = new Stilus(id, nev);
                        Lista.Add(s);
                    }
                }
            }

            public void ExportSQL(string sqlFilePath)
            {
                using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
                {
                    w.WriteLine("INSERT INTO Stilusok(id, nev)");
                    w.WriteLine("VALUES");

                    for (int i = 0; i < Lista.Count - 1; i++)
                    {
                        var s = Lista[i];
                        w.WriteLine($"({s.Id}, '{s.Nev.Replace("'", "''")}'),");
                    }

                var last = Lista[Lista.Count - 1];
                w.WriteLine($"({last.Id}, '{last.Nev.Replace("'", "''")}');");
            }
            }

            public class Stilus
            {
                public int Id { get; }
                public string Nev { get; }

                public Stilus(int id, string nev)
                {
                    Id = id;
                    Nev = nev;
                }
            }
        }
    
}
