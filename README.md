## Installaltion

1. Clone the repository
2. Create ```.env``` and add the following keys:
```
IMAGES_SERVICE_URL=''
IMAGES_SERVICE_API_KEY=''
CACHE_EXPERATION_TIME_IN_MINUTES='1'
```
3. ```npm install```
4. ```npm start```

## Usage

Access http://localhost:3000/search/{searchTerm}, e.g. http://localhost:3000/search/canon

> The server won't start unless a redis connection is established and data is retrieved from the servcice