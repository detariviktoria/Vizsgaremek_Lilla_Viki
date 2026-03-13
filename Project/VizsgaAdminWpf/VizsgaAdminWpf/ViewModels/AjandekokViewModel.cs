using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.Services;

namespace VizsgaAdminWpf.ViewModels
{
    public class AjandekokViewModel : INotifyPropertyChanged
    {
        private readonly ApiService apiService = new ApiService();
        public event PropertyChangedEventHandler? PropertyChanged;
        public ObservableCollection<AjandekDTO> Ajandekok { get; set; } = new();

        public async Task LoadGiftsAsync()
        {
            try
            {
                Ajandekok.Clear();
                var adatok = await apiService.GetAjandekokAsync();
                foreach (var ajandek in adatok)
                {
                    Ajandekok.Add(ajandek);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándékok betöltésekor: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> AddGiftAsync(AjandekDTO ajandek)
        {
            try
            {
                bool siker = await apiService.CreateAjandekAsync(ajandek);
                return siker;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándék feltöltésekor: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteGiftAsync(int id)
        {
            try
            {
                bool siker = await apiService.DeleteAjandekAsync(id);
                return siker;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándék törlésekor: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> UpdateGiftAsync(int id, AjandekDTO ajandek)
        {
            try
            {
                bool siker = await apiService.UpdateAjandekAsync(id, ajandek);
                return siker;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándék módosításakor: {ex.Message}");
                throw;
            }
        }
    }
}
