# City Data from `back4app`

To get a list of all the cities in `South Africa`, I am using [back4app](https://www.back4app.com)

APP API KEY: `Z2BH1TZ0LaQKAAivyWxsutSrxo4hEn39PqJIdlzB`
REST API KEY: `9BV0ZQFsh5kjZx1jQSNSkGJnZg3aQbCijnC8c9F7`

[Already fetched list of cities](sacities.md)

## For Browser

Add the following code to your Javascript on Browser app:

```html
<html>
  <head></head>
  <body>
    <script type="text/javascript">
      (async () => {
        const response = await fetch(
          'https://parseapi.back4app.com/classes/South Africa_City?count=1&limit=10&order=muni',
          {
            headers: {
              'X-Parse-Application-Id': 'Z2BH1TZ0LaQKAAivyWxsutSrxo4hEn39PqJIdlzB', // This is your app's application id
              'X-Parse-REST-API-Key': '9BV0ZQFsh5kjZx1jQSNSkGJnZg3aQbCijnC8c9F7', // This is your app's REST API key
            }
          }
        );
        const data = await response.json(); // Here you have the data that you need
        console.log(JSON.stringify(data, null, 2));
      })();
    </script>
  </body>
</html>
```

After loading your app, you should see the following output in your web browser console:`

```json
{
  "results": [
    {
      "objectId": "4qIIcdXdB3",
      "location": {
        "__type": "GeoPoint",
        "latitude": -24.72459,
        "longitude": 31.19939
      },
      "cityId": 949026,
      "name": "Thulamahashi",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "09",
      "population": 11655,
      "createdAt": "2019-12-14T19:23:49.130Z",
      "updatedAt": "2019-12-14T19:23:49.130Z"
    },
    {
      "objectId": "E32qKFCyVu",
      "location": {
        "__type": "GeoPoint",
        "latitude": -24.96627,
        "longitude": 29.29068
      },
      "cityId": 978944,
      "name": "Marble Hall",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA3",
      "adminCode": "07",
      "population": 0,
      "createdAt": "2019-12-14T19:23:58.008Z",
      "updatedAt": "2019-12-14T19:23:58.008Z"
    },
    {
      "objectId": "mtxlRgMtV0",
      "location": {
        "__type": "GeoPoint",
        "latitude": -30.34357,
        "longitude": 28.81161
      },
      "cityId": 978327,
      "name": "Matatiele",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA3",
      "adminCode": "02",
      "population": 0,
      "createdAt": "2019-12-14T19:23:58.008Z",
      "updatedAt": "2019-12-14T19:23:58.008Z"
    },
    {
      "objectId": "bLVMpr7KlJ",
      "location": {
        "__type": "GeoPoint",
        "latitude": -27.92246,
        "longitude": 24.83051
      },
      "cityId": 994023,
      "name": "Jan Kempdorp",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "10",
      "population": 13485,
      "createdAt": "2019-12-14T19:24:02.475Z",
      "updatedAt": "2019-12-14T19:24:02.475Z"
    },
    {
      "objectId": "904CMHKyUG",
      "location": {
        "__type": "GeoPoint",
        "latitude": -25.16843,
        "longitude": 29.39412
      },
      "cityId": 999964,
      "name": "Groblersdal",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA2",
      "adminCode": "07",
      "population": 0,
      "createdAt": "2019-12-14T19:24:04.698Z",
      "updatedAt": "2019-12-14T19:24:04.698Z"
    },
    {
      "objectId": "HHWkCV5Tfm",
      "location": {
        "__type": "GeoPoint",
        "latitude": -26.48862,
        "longitude": 27.49387
      },
      "cityId": 1004109,
      "name": "Fochville",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "10",
      "population": 62416,
      "createdAt": "2019-12-14T19:24:06.603Z",
      "updatedAt": "2019-12-14T19:24:06.603Z"
    },
    {
      "objectId": "TFALQaxXnt",
      "location": {
        "__type": "GeoPoint",
        "latitude": -25.61692,
        "longitude": 27.99471
      },
      "cityId": 1002851,
      "name": "Ga-Rankuwa",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "10",
      "population": 68767,
      "createdAt": "2019-12-14T19:24:06.603Z",
      "updatedAt": "2019-12-14T19:24:06.603Z"
    },
    {
      "objectId": "hG7aC2JppE",
      "location": {
        "__type": "GeoPoint",
        "latitude": -24.67554,
        "longitude": 30.32877
      },
      "cityId": 1014650,
      "name": "Burgersfort",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA3",
      "adminCode": "07",
      "population": 0,
      "createdAt": "2019-12-14T19:24:11.351Z",
      "updatedAt": "2019-12-14T19:24:11.351Z"
    },
    {
      "objectId": "nqxXQ6Lrm2",
      "location": {
        "__type": "GeoPoint",
        "latitude": -33.01529,
        "longitude": 27.91162
      },
      "cityId": 1006984,
      "name": "East London",
      "country": "South Africa",
      "countryCode": "ZA",
      "muni": "BUF",
      "featureCode": "PPLA2",
      "adminCode": "05",
      "population": 478676,
      "createdAt": "2019-12-14T19:24:09.125Z",
      "updatedAt": "2019-12-14T19:24:09.125Z"
    },
    {
      "objectId": "CrIDzx1OYt",
      "location": {
        "__type": "GeoPoint",
        "latitude": -32.84721,
        "longitude": 27.44218
      },
      "cityId": 1019330,
      "name": "Bhisho",
      "country": "South Africa",
      "countryCode": "ZA",
      "muni": "BUF",
      "featureCode": "PPLA",
      "adminCode": "05",
      "population": 137287,
      "createdAt": "2019-12-14T19:24:13.291Z",
      "updatedAt": "2019-12-14T19:24:13.291Z"
    }
  ],
  "count": 335
}
```

## Using Node.js

Install the Node Fetch library from npm:

```sh
npm install node-fetch
```

Add the following code to your `Node.js` app:

```js
const fetch = require('node-fetch');

(async () => {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/South Africa_City?count=1&limit=10&order=muni,name',
    {
      headers: {
        'X-Parse-Application-Id': 'Z2BH1TZ0LaQKAAivyWxsutSrxo4hEn39PqJIdlzB', // This is your app's application id
        'X-Parse-REST-API-Key': '9BV0ZQFsh5kjZx1jQSNSkGJnZg3aQbCijnC8c9F7', // This is your app's REST API key
      }
    }
  );
  const data = await response.json(); // Here you have the data that you need
  console.log(JSON.stringify(data, null, 2));
})();
```

After running the app, you should see the following output in your app logs:


```json
{
  "results": [
    {
      "objectId": "hG7aC2JppE",
      "location": {
        "__type": "GeoPoint",
        "latitude": -24.67554,
        "longitude": 30.32877
      },
      "cityId": 1014650,
      "name": "Burgersfort",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA3",
      "adminCode": "07",
      "population": 0,
      "createdAt": "2019-12-14T19:24:11.351Z",
      "updatedAt": "2019-12-14T19:24:11.351Z"
    },
    {
      "objectId": "HHWkCV5Tfm",
      "location": {
        "__type": "GeoPoint",
        "latitude": -26.48862,
        "longitude": 27.49387
      },
      "cityId": 1004109,
      "name": "Fochville",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "10",
      "population": 62416,
      "createdAt": "2019-12-14T19:24:06.603Z",
      "updatedAt": "2019-12-14T19:24:06.603Z"
    },
    {
      "objectId": "TFALQaxXnt",
      "location": {
        "__type": "GeoPoint",
        "latitude": -25.61692,
        "longitude": 27.99471
      },
      "cityId": 1002851,
      "name": "Ga-Rankuwa",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "10",
      "population": 68767,
      "createdAt": "2019-12-14T19:24:06.603Z",
      "updatedAt": "2019-12-14T19:24:06.603Z"
    },
    {
      "objectId": "904CMHKyUG",
      "location": {
        "__type": "GeoPoint",
        "latitude": -25.16843,
        "longitude": 29.39412
      },
      "cityId": 999964,
      "name": "Groblersdal",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA2",
      "adminCode": "07",
      "population": 0,
      "createdAt": "2019-12-14T19:24:04.698Z",
      "updatedAt": "2019-12-14T19:24:04.698Z"
    },
    {
      "objectId": "bLVMpr7KlJ",
      "location": {
        "__type": "GeoPoint",
        "latitude": -27.92246,
        "longitude": 24.83051
      },
      "cityId": 994023,
      "name": "Jan Kempdorp",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "10",
      "population": 13485,
      "createdAt": "2019-12-14T19:24:02.475Z",
      "updatedAt": "2019-12-14T19:24:02.475Z"
    },
    {
      "objectId": "E32qKFCyVu",
      "location": {
        "__type": "GeoPoint",
        "latitude": -24.96627,
        "longitude": 29.29068
      },
      "cityId": 978944,
      "name": "Marble Hall",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA3",
      "adminCode": "07",
      "population": 0,
      "createdAt": "2019-12-14T19:23:58.008Z",
      "updatedAt": "2019-12-14T19:23:58.008Z"
    },
    {
      "objectId": "mtxlRgMtV0",
      "location": {
        "__type": "GeoPoint",
        "latitude": -30.34357,
        "longitude": 28.81161
      },
      "cityId": 978327,
      "name": "Matatiele",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPLA3",
      "adminCode": "02",
      "population": 0,
      "createdAt": "2019-12-14T19:23:58.008Z",
      "updatedAt": "2019-12-14T19:23:58.008Z"
    },
    {
      "objectId": "4qIIcdXdB3",
      "location": {
        "__type": "GeoPoint",
        "latitude": -24.72459,
        "longitude": 31.19939
      },
      "cityId": 949026,
      "name": "Thulamahashi",
      "country": "South Africa",
      "countryCode": "ZA",
      "featureCode": "PPL",
      "adminCode": "09",
      "population": 11655,
      "createdAt": "2019-12-14T19:23:49.130Z",
      "updatedAt": "2019-12-14T19:23:49.130Z"
    },
    {
      "objectId": "CrIDzx1OYt",
      "location": {
        "__type": "GeoPoint",
        "latitude": -32.84721,
        "longitude": 27.44218
      },
      "cityId": 1019330,
      "name": "Bhisho",
      "country": "South Africa",
      "countryCode": "ZA",
      "muni": "BUF",
      "featureCode": "PPLA",
      "adminCode": "05",
      "population": 137287,
      "createdAt": "2019-12-14T19:24:13.291Z",
      "updatedAt": "2019-12-14T19:24:13.291Z"
    },
    {
      "objectId": "nqxXQ6Lrm2",
      "location": {
        "__type": "GeoPoint",
        "latitude": -33.01529,
        "longitude": 27.91162
      },
      "cityId": 1006984,
      "name": "East London",
      "country": "South Africa",
      "countryCode": "ZA",
      "muni": "BUF",
      "featureCode": "PPLA2",
      "adminCode": "05",
      "population": 478676,
      "createdAt": "2019-12-14T19:24:09.125Z",
      "updatedAt": "2019-12-14T19:24:09.125Z"
    }
  ],
  "count": 335
}
```