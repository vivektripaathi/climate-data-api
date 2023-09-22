# Climate Data API

This is a proof-of-concept (POC) project for managing climate data. The project provides an API for saving, retrieving, and calculating climate-related information, including temperature, humidity, and chances of rain.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Author](#author)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- PostgreSQL database installed and running
- [Postman](https://www.postman.com/) or a similar tool for testing API endpoints

## Getting Started

1. **Clone the repository to your local machine:**
```bash
git clone https://github.com/vivek-tripathi-9005/climate-data-api
```

2. **Install project dependencies:**
```
cd climate-data-api
npm install
```
3.Add below environment variables to `.env` file in root of directory: 
```shell
DATABASE_NAME=__YOUR_DATABASE_NAME__ # ex - weather
USERNAME=__YOUR_DATABASE_USERNAME__ 
PASSWORD=__YOUR_DATABASE_PASSWORD__
HOST=__YOUR_DATABASE_HOST__ # ex - localhost
```

4. **Create the database manually using PostgreSQL commands:**
```shell
# Create the database (replace <database-name> with your desired name)
create database weather
# Table will be created automatically after running server and data can inserted inside the databse using `rotes`

5. **Start the server:**
```shell
npm run start
```


## Endpoints
The API provides the following endpoints:

1. **Save Climate Data**
- **Endpoint:** `/api/weather/`
- **HTTP Method:** POST
- **RequestBody:** JSON object with climate data
- **Example RequestBody:**
```json
{
    "climate": "cold",
    "area_code": 112,
    "temperature": 10,
    "humidity": 18,
    "chances_of_rain": 20
}
```
-  **Response:** JSON object indicating success or failure

2. **Fetching all saved record**
- - **Endpoint:** `/api/weather/`
- **HTTP Method:** POST
- **Response:** JSON array of climate data records with success of failure

3. **Fetch Records of a Particular Area**
- **Endpoint:** `/api/weather/{area_code}`
- **HTTP Method:** GET
- **Params:** area_code
- **Response:** JSON array of climate data records with success of failure

4. **Fetch Records of a Particular Climate of a Particular Area**
- **Endpoint:** `/api/weather/climate-change`
- **HTTP Method:** POST
- **RequestBody:** JSON object with from_climate, to_climate, area_code fields
- **Example RequestBody:**
```json
{
    "from_climate": "rainy",
    "to_climate": "cold",
    "area_code": 112
}
```
- **Response:** JSON object
- **Example Response:**
```json
{
    "climate_delta": "rainy -> cold",
    "temperature_delta": -30,
    "humidity_delta": -27,
    "rain_chances_delta": -20,
    "climate_change_index": -40.5
}
```

## Usage
To use the API, you can make HTTP requests to the provided endpoints using tools like Postman or integrate it into your frontend application. Ensure that you provide valid payloads and handle responses appropriately.

## Author
[Vivek Tripathi](https://github.com/vivek-tripathi-9005)