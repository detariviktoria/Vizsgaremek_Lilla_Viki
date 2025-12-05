using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //---------Felhasznalok
            var users = new Felhasznalok("Adatok/felhasznalo.txt");
            users.Beolvas();
            users.ExportSQL("../../../../../SQL/DML.sql");

            //------------Ajandek_alkalmak
            var aa = new AjandekAlkalmak("Adatok/ajandek_alkalom.txt");
            aa.Beolvas();
            aa.ExportSQL("../../../../../SQL/DML.sql");

            //----------Ajandek_celcsoport
            var ac = new AjandekCelcsoportok("Adatok/ajandek_celcsoport.txt");
            ac.Beolvas();
            ac.ExportSQL("../../../../../SQL/DML.sql");

            //---------------Ajandekok
            var ajandekok = new Ajandekok("Adatok/ajandekok.txt");
            ajandekok.Beolvas();
            ajandekok.ExportSQL("../../../../../SQL/DML.sql");

            //----------Alkalmak
            var alkalmak = new Alkalmak("Adatok/alkalmak.txt");
            alkalmak.Beolvas();
            alkalmak.ExportSQL("../../../../../SQL/DML.sql");

            //---------Celcsoportok
            var celcsoportok = new Celcsoportok("Adatok/celcsoportok.txt");
            celcsoportok.Beolvas();
            celcsoportok.ExportSQL("../../../../../SQL/DML.sql");


            // -------GYujtemenyek
            //var gyujt = new GyujtemenyLista("Adatok/gyujtemeny.txt");
            //gyujt.Beolvas();
            //gyujt.ExportSQL("../../../../../SQL/DML.sql");

            //------------Kategoriak
            //var kat = new Kategoriak("Adatok/kategoriak.txt");
            //kat.Beolvas();
            //kat.ExportSQL("../../../../../SQL/DML.sql");

            //--------Kuponok
            var kup = new Kuponok("Adatok/kuponok.txt");
            kup.Beolvas();
            kup.ExportSQL("../../../../../SQL/DML.sql");

            //---------Stilusok
            var stil = new Stilusok("Adatok/stilusok.txt");
            stil.Beolvas();
            stil.ExportSQL("../../../../../SQL/DML.sql");


            Console.WriteLine("SQL fájl elkészült.");
        }
    }
}
