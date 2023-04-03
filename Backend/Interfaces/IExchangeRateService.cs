using System.Threading.Tasks;

namespace Paperless.Interfaces
{
  public interface IExchangeRateService
  {
    Task<CurrencyExchangeModel> GetCurrencyByMonthAsync(string to, string from, string start_date, string end_date);
  }
}
