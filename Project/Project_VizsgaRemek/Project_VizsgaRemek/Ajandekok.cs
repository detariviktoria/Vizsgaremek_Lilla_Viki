using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
{
    class Ajandekok
    {
        private string filePath;
        public List<Ajandek> Lista { get; private set; } = new List<Ajandek>();

        public Ajandekok(string filePath)
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

                    Ajandek a = new Ajandek(
                        int.Parse(mezok[0]),        // id
                        mezok[1],                   // nev
                        mezok[2],                   // leiras
                        int.Parse(mezok[3]),        // ar
                        mezok[4],                   // tipus
                        int.Parse(mezok[5]),        // stilus_id
                        string.IsNullOrWhiteSpace(mezok[6]) ? null : mezok[6], // image_url
                        string.IsNullOrWhiteSpace(mezok[7]) ? null : mezok[7]  // link_url
                    );

                    Lista.Add(a);
                }
            }
        }

        public void ExportSQL(string sqlFilePath)
        {
            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
            {
                w.WriteLine("INSERT INTO Ajandek(id, nev, leiras, ar, tipus, stilus_id, image_url, link_url)");
                w.WriteLine("VALUES");

                for (int i = 0; i < Lista.Count - 1; i++)
                {
                    w.WriteLine(FormatAjandekSQL(Lista[i]) + ",");
                }

                w.WriteLine(FormatAjandekSQL(Lista[Lista.Count - 1]) + ";");
            }
        }

        private string FormatAjandekSQL(Ajandek a)
        {
            string imageUrl = a.ImageUrl == null ? "NULL" : $"'{a.ImageUrl.Replace("'", "''")}'";
            string linkUrl = a.LinkUrl == null ? "NULL" : $"'{a.LinkUrl.Replace("'", "''")}'";

            return $"({a.Id}, '{a.Nev.Replace("'", "''")}', '{a.Leiras.Replace("'", "''")}', {a.Ar}, '{a.Tipus}', {a.StilusId}, {imageUrl}, {linkUrl})";
        }

        public class Ajandek
        {
            public int Id { get; }
            public string Nev { get; }
            public string Leiras { get; }
            public int Ar { get; }
            public string Tipus { get; }
            public int StilusId { get; }
            public string ImageUrl { get; }
            public string LinkUrl { get; }

            public Ajandek(int id, string nev, string leiras, int ar, string tipus, int stilusId, string imageUrl, string linkUrl)
            {
                Id = id;
                Nev = nev;
                Leiras = leiras;
                Ar = ar;
                Tipus = tipus;
                StilusId = stilusId;
                ImageUrl = imageUrl;
                LinkUrl = linkUrl;
            }
        }

    }
}
