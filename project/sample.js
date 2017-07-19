const yelp = require('yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = '2MNP4TDWibHZKcxk0ZvY3A';
const clientSecret = '126lKU6xIhO2KDKux4PxBbaEosV4E27EcOetulwuTx7dEiL5MbA81BODRQgW62y1';

const searchRequest = {
  term:'bookshops',
  location: 'san francisco, ca'
};
var stores = [];
yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
  	for (var i = 0; i < response.jsonBody.businesses.length; i++) {
		stores.push(response.jsonBody.businesses[i]);
	}
    const prettyJson = JSON.stringify(stores);
    console.log(prettyJson);
  });
});
return stores;

