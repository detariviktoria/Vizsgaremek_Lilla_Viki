using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_VizsgaRemek
{
    class Kuponok
    {
        private string filePath;
        public List<Kupon> Lista { get; private set; } = new List<Kupon>();

        public Kuponok(string filePath)
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
                    if (mezok.Length < 6) continue;

                    int couponId = int.Parse(mezok[0]);
                    int userId = int.Parse(mezok[1]);
                    string couponCode = mezok[2];
                    string status = mezok[3];
                    int discount = int.Parse(mezok[4]);
                    DateTime expiryDate = DateTime.ParseExact(mezok[5], "yyyy-MM-dd", CultureInfo.InvariantCulture);

                    Kupon k = new Kupon(couponId, userId, couponCode, status, discount, expiryDate);
                    Lista.Add(k);
                }
            }
        }

        public void ExportSQL(string sqlFilePath)
        {
            using (StreamWriter w = new StreamWriter(sqlFilePath, append: true))
            {
                w.WriteLine("INSERT INTO Kuponok(coupon_id, user_id, coupon_code, status, discount, expiry_date)");
                w.WriteLine("VALUES");

                for (int i = 0; i < Lista.Count - 1; i++)
                {
                    var k = Lista[i];
                    w.WriteLine($"({k.CouponId}, {k.UserId}, '{k.CouponCode.Replace("'", "''")}', '{k.Status.Replace("'", "''")}', {k.Discount}, '{k.ExpiryDate:yyyy-MM-dd}'),");
                }

                var last = Lista[Lista.Count - 1];
                w.WriteLine($"({last.CouponId}, {last.UserId}, '{last.CouponCode.Replace("'", "''")}', '{last.Status.Replace("'", "''")}', {last.Discount}, '{last.ExpiryDate:yyyy-MM-dd}');");
            }
        }

        public class Kupon
        {
            public int CouponId { get; }
            public int UserId { get; }
            public string CouponCode { get; }
            public string Status { get; }
            public int Discount { get; }
            public DateTime ExpiryDate { get; }

            public Kupon(int couponId, int userId, string couponCode, string status, int discount, DateTime expiryDate)
            {
                CouponId = couponId;
                UserId = userId;
                CouponCode = couponCode;
                Status = status;
                Discount = discount;
                ExpiryDate = expiryDate;
            }
        }
    }
}
