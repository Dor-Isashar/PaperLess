using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Paperless.Interfaces;
using System.Linq;

namespace Paperless
{
  public class GetCurrency
  {
    public readonly IExchangeRateService _exchangeRateService;
    public GetCurrency(
      IExchangeRateService exchangeRateService
      ) {
      _exchangeRateService = exchangeRateService;
        }
    [FunctionName("GetCurrency")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "currency/{yymm}")] HttpRequest req, string yymm) 
    {
      string year = $"20{yymm.Substring(0,2)}";
      string month = yymm.Substring(2,2);          
      var currencyData = await _exchangeRateService.GetCurrencyByMonthAsync("ils", "usd", $"{year}-{month}-01", $"{year}-{month}-31");
      var response = new
      {
        currencyData,
        min = currencyData.rates.Min(k => k.Value["USD"]),
        max = currencyData.rates.Max(k => k.Value["USD"])
      };
      req.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
      return new OkObjectResult(response);
    }
  }
}
