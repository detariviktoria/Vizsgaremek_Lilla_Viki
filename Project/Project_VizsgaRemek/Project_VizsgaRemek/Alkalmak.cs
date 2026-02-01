using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
    {
        class Alkalmak
        {
            private string filePath;
            public List<Alkalom> Lista { get; private set; } = new List<Alkalom>();

            public Alkalmak(string filePath)
            {
                this.filePath = filePath;
            }

            public void Beolvas()
            {
                using (StreamReader sr = new StreamReader(filePath))
                {
                    sr.ReadLine(); // fejléc
                    while (!sr.EndOfStream)
                    {
                        string[] mezok = sr.ReadLine().Split(';');
                        Alkalom a = new Alkalom(
                            int.Parse(mezok[0]),
                            mezok[1]
                        );
                        Lista.Add(a);
                    }
                }
            }

            public void ExportSQL(string sqlFilePath)
            {
                using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
                {
                    w.WriteLine("INSERT INTO Alkalom(id, nev)");
                    w.WriteLine("VALUES");

                    for (int i = 0; i < Lista.Count - 1; i++)
                    {
                        var a = Lista[i];
                        w.WriteLine($"({a.Id}, '{a.Nev.Replace("'", "''")}'),");
                    }

                var last = Lista[Lista.Count - 1];
                w.WriteLine($"({last.Id}, '{last.Nev.Replace("'", "''")}');");
            }
            }

            public class Alkalom
            {
                public int Id { get; }
                public string Nev { get; }

                public Alkalom(int id, string nev)
                {
                    Id = id;
                    Nev = nev;
                }
            }
        }
        }

