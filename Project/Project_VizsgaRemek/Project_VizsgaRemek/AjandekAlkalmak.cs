using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
{
    class AjandekAlkalmak
    {
        private string filePath;
        public List<AjandekAlkalom> Lista { get; private set; } = new List<AjandekAlkalom>();

        public AjandekAlkalmak(string filePath)
        {
            this.filePath = filePath;
        }

        // Beolvasás fájlból
        public void Beolvas()
        {
            using (StreamReader sr = new StreamReader(filePath))
            {
                sr.ReadLine(); // fejléc átugrása
                while (!sr.EndOfStream)
                {
                    string[] mezok = sr.ReadLine().Split(';');
                    AjandekAlkalom a = new AjandekAlkalom(
                        int.Parse(mezok[0]),
                        int.Parse(mezok[1])
                    );
                    Lista.Add(a);
                }
            }
        }

        // SQL exportálás fájlba
        public void ExportSQL(string sqlFilePath)
        {
            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true)) // append = true, ha több INSERT-et akarsz egy fájlban
            {
                w.WriteLine("INSERT INTO Ajandek_Alkalom(ajandek_id, alkalom_id)");
                w.WriteLine("VALUES");

                for (int i = 0; i < Lista.Count - 1; i++)
                {
                    var a = Lista[i];
                    w.WriteLine("({0}, {1}),", a.AjandekId, a.AlkalomId);
                }

                var last = Lista[Lista.Count - 1];
                w.WriteLine("({0}, {1});", last.AjandekId, last.AlkalomId);
            }
        }

        // Belső osztály az egyes kapcsolatokhoz
        public class AjandekAlkalom
        {
            public int AjandekId { get; }
            public int AlkalomId { get; }

            public AjandekAlkalom(int ajandekId, int alkalomId)
            {
                AjandekId = ajandekId;
                AlkalomId = alkalomId;
            }
        }
    }
}

