using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Project_VizsgaRemek
{
    class Felhasznalok
    {
        private string filePath;
        public List<Felhasznalo> Felhaszhnalok { get; private set; } = new List<Felhasznalo>();

        public Felhasznalok(string filePath)
        {
            this.filePath = filePath;
        }

        // Felhasználók beolvasása
        public void Beolvas()
        {
            using (StreamReader sr = new StreamReader(filePath))
            {
                string header = sr.ReadLine(); // fejléc átugrása
                while (!sr.EndOfStream)
                {
                    string[] mezok = sr.ReadLine().Split(';');
                    Felhasznalo u = new Felhasznalo(
                        int.Parse(mezok[0]),
                        mezok[1],
                        mezok[2],
                        mezok[3]
                    );
                    Felhaszhnalok.Add(u);
                }
            }
        }

        // SQL exportálás fájlba
        public void ExportSQL(string sqlFilePath)
        {
            using (StreamWriter w = new StreamWriter(sqlFilePath))
            {
                w.WriteLine("INSERT INTO Felhasznalo(user_id, name, email, password)");
                w.WriteLine("VALUES");

                for (int i = 0; i < Felhaszhnalok.Count - 1; i++)
                {
                    var u = Felhaszhnalok[i];
                    w.WriteLine("({0},'{1}','{2}','{3}'),", u.UserId, u.Name, u.Email, u.Password);
                }

                // Utolsó elem ponttal lezárva
                var last = Felhaszhnalok[Felhaszhnalok.Count - 1];
                w.WriteLine("({0},'{1}','{2}','{3}');", last.UserId, last.Name, last.Email, last.Password);
            }
        }

        // Felhasználó osztály a UserData belsejében
        public class Felhasznalo
        {
            public int UserId { get; }
            public string Name { get; }
            public string Email { get; }
            public string Password { get; }

            public Felhasznalo(int userId, string name, string email, string password)
            {
                UserId = userId;
                Name = name;
                Email = email;
                Password = password;
            }
        }
    }
}
