using System;
using System.Text.Json;
using System.Threading.Tasks;
using Paperless.Interfaces;
using RestSharp;

namespace Paperless.Services
{
  public class ExchangeRateService: IExchangeRateService
  {
    public async Task<CurrencyExchangeModel> GetCurrencyByMonthAsync(string to, string from,string startDate, string endDate)
    {          
      string url = Environment.GetEnvironmentVariable("ExchangeRateUrl");
      var apiKey = Environment.GetEnvironmentVariable("ExchangeRateApiKey");
      var client = new RestClient(url);
      RestRequest request = new RestRequest($"timeseries?start_date={startDate}&end_date={endDate}&base={to}&symbols={from}", Method.Get);     
      request.AddHeader("apikey", apiKey);
      RestResponse response = await client.ExecuteAsync(request);
      var convertedResponse = JsonSerializer.Deserialize<CurrencyExchangeModel>(response.Content);
      return convertedResponse;
    }
  }
}