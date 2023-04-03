using System.Collections.Generic;
using Newtonsoft.Json;

namespace Paperless.Interfaces
{
  public class CurrencyExchangeModel
  {
    [JsonProperty(PropertyName = "GRAPH")]
    public Dictionary<string, Dictionary<string,decimal>> rates { get; set; }
  }
}
