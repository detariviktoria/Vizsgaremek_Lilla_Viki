using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using Microsoft.Win32;
using VizsgaAdminWpf.ViewModels;

namespace VizsgaAdminWpf
{
    public partial class AdminWindow : Window
    {
        public UserViewModel UserVM { get; } = new UserViewModel();
        public GiftsViewModel GiftsVM { get; } = new GiftsViewModel();

        public AdminWindow()
        {
            InitializeComponent();
            DataContext = this;
        }

        private async void btnLogin_Click(object sender, RoutedEventArgs e)
        {
            if (await UserVM.LoginAsync(txtLoginPass.Password))
            {
                lblLoginStatus.Text = $"Bejelentkezve: {UserVM.LoginUsername}";
                lblLoginStatus.Foreground = Brushes.Green;
                await GiftsVM.LoadGiftsAsync();
            }
        }

        private async void btnLogout_Click(object sender, RoutedEventArgs e)
        {
            if (MessageBox.Show("Biztosan ki szeretnél lépni?", "Kijelentkezés", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                await UserVM.Api.Logout();
                UserVM.IsLoggedIn = false;
                UserVM.LoginUsername = "";
                txtLoginPass.Password = "";
                lblLoginStatus.Text = "Nincs bejelentkezve";
                lblLoginStatus.Foreground = Brushes.Red;
                GiftsVM.Gifts = new();
                UserVM.Users = new();
            }
        }

        private async void tabMain_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (ReferenceEquals(sender, tabMain) && tabMain.SelectedIndex == 1 && UserVM.Users.Count == 0)
                await UserVM.LoadUsersAsync();
        }

        private void listBoxGifts_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (GiftsVM.SelectedGift?.ImageUrl != null)
            {
                LoadImage(GiftsVM.SelectedGift.ImageUrl);
            }
            else imageGift.Source = null;
        }

        private void LoadImage(string filename)
        {
            try
            {
                var bitmap = new BitmapImage();
                bitmap.BeginInit();
                bitmap.UriSource = new Uri($"http://localhost:3000/images/{filename}?t={DateTime.Now.Ticks}");
                bitmap.CreateOptions = BitmapCreateOptions.IgnoreImageCache;
                bitmap.CacheOption = BitmapCacheOption.OnLoad;
                bitmap.EndInit();
                imageGift.Source = bitmap;
            }
            catch { imageGift.Source = null; }
        }

        private async void btnUploadImage_Click(object sender, RoutedEventArgs e)
        {
            var openFile = new OpenFileDialog { Filter = "Images|*.jpg;*.jpeg;*.png;*.webp" };
            if (openFile.ShowDialog() == true)
            {
                try
                {
                    var bytes = System.IO.File.ReadAllBytes(openFile.FileName);
                    var localBitmap = new BitmapImage();
                    localBitmap.BeginInit();
                    localBitmap.StreamSource = new System.IO.MemoryStream(bytes);
                    localBitmap.CacheOption = BitmapCacheOption.OnLoad;
                    localBitmap.EndInit();
                    imageGift.Source = localBitmap;
                }
                catch { }

                var filename = await GiftsVM.Api.UploadImage(openFile.FileName);
                if (filename != null)
                {
                    GiftsVM.CurrentGift.ImageUrl = filename;
                    LoadImage(filename);
                }
                else
                {
                    MessageBox.Show("Nem sikerült feltölteni a képet a szerverre!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private async void btnAdd_Click(object sender, RoutedEventArgs e) => await GiftsVM.SaveGiftAsync();
        private async void btnEdit_Click(object sender, RoutedEventArgs e) => await GiftsVM.SaveGiftAsync();

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            if (MessageBox.Show("Biztosan törlöd?", "Megerősítés", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
                await GiftsVM.DeleteGiftAsync();
        }

        private async void btnRefresh_Click(object sender, RoutedEventArgs e) => await GiftsVM.LoadGiftsAsync();
        private async void btnUserRefresh_Click(object sender, RoutedEventArgs e) => await UserVM.LoadUsersAsync();

        private async void btnUserUpdate_Click(object sender, RoutedEventArgs e)
        {
            if (await UserVM.UpdateUserAsync(txtUserPassword.Password))
            {
                txtUserPassword.Password = "";
                await UserVM.LoadUsersAsync();
            }
        }

        private void AdminWindow_Loaded(object sender, RoutedEventArgs e) { }
    }
}
