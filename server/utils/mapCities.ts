import type { PageI, ListI } from "~~/types";
import { City } from "~~/objects";

export function mapNotionApiResponseToBot(response: NotionApiResponse[] | NotionApiResultsResponse): City[] {
  if ('results' in response) {
    response = response.results;
  } 
  
  const cities: City[] = [];
  response.forEach((notionResponse) => {
      const {
        properties: {
          ID:               { unique_id },
          City:             { title },
          Country:          { country_rich_text },
          Population:       { number },
          Capital:          { capital_rich_text },
          'Admin Name':     { admin_rich_text },
          LAT:              { lat_number },
          LONG:             { long_number },
          'Shopping Malls': { relation }
        },
      } = notionResponse;
      
      const id = unique_id?.number || '';      
      const cityName = title?.[0]?.plain_text || '';
      const country = country_rich_text?.[0]?.plain_text || '';
      const population = number?.[0]?.number || '';
      const capital = capital_rich_text?.[0]?.plain_text || '';
      const adminName = admin_rich_text?.[0]?.plain_text || '';
      const lat = lat_number?.[0]?.number || '';
      const long =  long_number?.[0]?.number || '';
      const shoppingMalls =  [relation?.[0]?.id || ''];

      const city: City = {
        id,
        cityName,
        country,
        population,
        capital,
        adminName,
        lat,
        long,
        shoppingMalls
      };
      cities.push(city);
  });
  return cities;
}
