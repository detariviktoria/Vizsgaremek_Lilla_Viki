using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
{
    class Celcsoportok
    {
        private string filePath;
        public List<Celcsoport> Lista { get; private set; } = new List<Celcsoport>();

        public Celcsoportok(string filePath)
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
                    string[] mezok = sr.ReadLine().Split(';');
                    Celcsoport c = new Celcsoport(
                        int.Parse(mezok[0]),
                        mezok[1]
                    );
                    Lista.Add(c);
                }
            }
        }

        public void ExportSQL(string sqlFilePath)
        {
            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
            {
                w.WriteLine("INSERT INTO Celcsoport(id, nev)");
                w.WriteLine("VALUES");

                for (int i = 0; i < Lista.Count - 1; i++)
                {
                    var c = Lista[i];
                    w.WriteLine($"({c.Id}, '{c.Nev.Replace("'", "''")}'),");
                }

                var last = Lista[Lista.Count - 1];
                w.WriteLine($"({last.Id}, '{last.Nev.Replace("'", "''")}');");
            }
        }

        public class Celcsoport
        {
            public int Id { get; }
            public string Nev { get; }

            public Celcsoport(int id, string nev)
            {
                Id = id;
                Nev = nev;
            }
        }
    }
}
