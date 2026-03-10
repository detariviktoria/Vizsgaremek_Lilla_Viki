using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Windows;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf
{
    public class AjandekokViewModel : INotifyPropertyChanged
    {
        private readonly ApiService apiService = new ApiService();

        public event PropertyChangedEventHandler? PropertyChanged;

        public ObservableCollection<Ajandek> Ajandekok { get; set; } = new();

        public async Task BetoltesAsync()
        {
            try 
            {
                Ajandekok.Clear();
                var lista = await apiService.LekerdezAjandekokAsync();
                if (lista.Count == 0)
                {
                    // Ez lehet üres lista vagy hiba is, az ApiService try-catch miatt
                    // Egy valódi appban az ApiService dobna kivételt hiba esetén
                }
                foreach (var ajandek in lista)
                    Ajandekok.Add(ajandek);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az adatok betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        public async Task<bool> MentesAsync(Ajandek ajandek)
        {
            try 
            {
                var success = await apiService.HozzaadAjandekAsync(ajandek);
                if (!success)
                {
                    MessageBox.Show("Nem sikerült menteni az ajándékot. Ellenőrizze a szerver kapcsolatot!", "Mentési hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
                return success;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Váratlan hiba a mentés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
        }

        public async Task<bool> TorlesAsync(int id)
        {
            try 
            {
                var success = await apiService.TorolAjandekAsync(id);
                if (!success)
                {
                    MessageBox.Show("Nem sikerült törölni az ajándékot.", "Törlési hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
                return success;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Váratlan hiba a törlés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
        }

        public async Task<bool> ModositasAsync(int id, Ajandek ajandek)
        {
            try 
            {
                var success = await apiService.ModositAjandekAsync(id, ajandek);
                if (!success)
                {
                    MessageBox.Show("Nem sikerült módosítani az ajándékot.", "Módosítási hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
                return success;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Váratlan hiba a módosítás során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
        }
    }
}
