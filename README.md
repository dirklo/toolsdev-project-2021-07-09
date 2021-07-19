# TOOLS DEV HIRING PROJECT FOR RICK MOORE

## Built with Ruby 2.6.4
## Built with Rails 5.2.5
## Deployed at https://tools-dev-rick-moore.herokuapp.com/

### Final project is located on the feature-branch    
# How to install

* Uses PostgreSQL database in test/development/production.  You will need to configure  
`config/database.yml`  
to your local database credentials.

* Uses .env to store an API Key for https://www.worldweatheronline.com/developer/.  
You'll need your own account and key to install this project.

* The database depends on previous data to store record highs and lows.

* You can set a start date for this historical data with  
`TemperatureEntry.fetch_entries_in_date_range(start_date, end_date)`

* dates should be in YYYY-MM-DD formats.

* This will only fetch up to a month of entries, so after the first seed, you can call  
`TemperatureEntry.fill_needed_data`  
to fill one month of data at a time until the data is current.

* After this seeding, Use a scheduler to call  
`UpdateStaleEntriesJob.perform_now`  
once per hour to keep data current.