using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
{
    class AjandekCelcsoportok
    {
        private string filePath;
        public List<AjandekCelcsoport> Lista { get; private set; } = new List<AjandekCelcsoport>();

        public AjandekCelcsoportok(string filePath)
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
                    AjandekCelcsoport a = new AjandekCelcsoport(
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
            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
            {
                w.WriteLine("INSERT INTO Ajandek_Celcsoport(ajandek_id, celcsoport_id)");
                w.WriteLine("VALUES");

                for (int i = 0; i < Lista.Count - 1; i++)
                {
                    var a = Lista[i];
                    w.WriteLine("({0}, {1}),", a.AjandekId, a.CelcsoportId);
                }

                var last = Lista[Lista.Count - 1];
                w.WriteLine("({0}, {1});", last.AjandekId, last.CelcsoportId);
            }
        }

        // Belső osztály az egyes kapcsolatokhoz
        public class AjandekCelcsoport
        {
            public int AjandekId { get; }
            public int CelcsoportId { get; }

            public AjandekCelcsoport(int ajandekId, int celcsoportId)
            {
                AjandekId = ajandekId;
                CelcsoportId = celcsoportId;
            }
        }
    }
}
