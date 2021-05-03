### Overview
This app converts transactions of different currencies into EUR currency.

### Approach
* I have used `async` package to limit the parallel async requests to avoid choking the system.
* I have configured the app with [Exchange Rates API](https://manage.exchangeratesapi.io/) to make the currency conversions.
* I have covered the edge case where the conversion fails due to some error. The app will try 3 times to make the 
conversion and then it will log the error if it still fails.

### How to run
* Create a `.env` file at root directory and enter the credentials shared by me privately.
* Run `npm install`
* Run `npm run start`

### Note
* I have used the free version of [Exchange Rates API](https://manage.exchangeratesapi.io/) and there is a chance that it has already used the free API requests. 
Please try to generate a new `API_ACCESS_KEY` from [here](https://manage.exchangeratesapi.io/) if the previous one is not working. 
And then replace the key in `.env` file.