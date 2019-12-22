# India Innovation Series - Microsoft - Bengaluru
## Fsociety - Team 12.

### File Organisation
+ flaskapifolder - Has the necessary APIs for the application
+ codesnippets - Smaller snippets of code used in the APIs.
+ processed_data - Contains initial datasets used and the processing files

### Running instructions
```sh
virtualenv -p python3 .src
source .src/bin/activate
pip install -r requirements.txt
python3 locationBased.py
python3 crimeAnalytics.py
```

### About app 
+ Other necessary details found in IncubateIndHackathonTechnical.pdf
+ It summarizes the complete technical architecture used, services provided by the application.
+ We have used Flask microframework for building the APIs. 
+ MapMyIndia APIs like Nearby, Geoencoding, Reverse Geoencoding, and Navigation APIs are used.
