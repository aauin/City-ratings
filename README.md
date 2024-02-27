# LocalVibes - City Ratings App

## Overview

Welcome to LocalVibes, your go-to Cities ratings app for US Cities with populations over 100,000! With approximately 331 US cities falling into this category, LocalVibes is a database-driven website designed to provide current ratings for these cities. The platform facilitates the proper management, tracking, and collection of city ratings and reviews, helping users find the best city that suits their vibes.

## Homepage

<img width="1189" alt="Screen Shot 2023-06-11 at 5 26 51 PM" src="https://github.com/aauin/City-ratings/assets/21292668/713fd2db-19b8-4e95-8872-a8c97a02e8cf">


**Note: More screenshots below**

### Key Entities

LocalVibes encompasses various entities to offer a comprehensive city rating experience:

- **Cities:** US cities with populations over 100,000.
- **Users:** Individuals interacting with the platform.
- **Ratings:** Numerical evaluations based on criteria like cost of living, crime rate, housing, employment, schools, culture/amenities, and user ratings.
- **Reviews:** Detailed feedback and opinions posted by users, similar to platforms like IMDb or Rotten Tomatoes.
- **Categories:** Criteria used for city ratings.

## Features

1. **City Ratings by Categories:** Users can explore city ratings based on specific criteria, such as cost of living, crime rate, housing, employment, schools, culture/amenities, and user ratings.

2. **User Reviews:** Each city page includes user-generated reviews, allowing individuals to share their experiences and opinions about the cities they've lived in.

3. **User Interactivity:** LocalVibes enables users to leave reviews and ratings for cities they are or have been residents of. Users can also view general ratings and reviews for other cities within the database.

4. **User Registration:** With over 250,000 registered users, the platform fosters an engaged community where, on average, each registered user contributes at least one review.

## Normalized Database Outline

### 1. Cities

- **city_id:** INT, PK, auto_increment, unique, NOT NULL
- **city:** VARCHAR(45), NOT NULL
- **region:** VARCHAR(45), NOT NULL
- **state:** VARCHAR(45), NOT NULL
- **population:** INT, NOT NULL
- **timezone:** VARCHAR(45), NOT NULL

#### Relationships:

- **1:M Cities to Reviews:** One city can have many reviews
- **1:M Cities to Ratings:** One city can have many ratings
- **M:M Cities to Users:** One city can have many users (past/current residents) and one user can be a past/current resident of many cities
- **1:M Cities to Users_Cities:** One city can have many residencies, defining the M:M relationship of Cities with Users

### 2. Users

- **user_id:** INT, PK, auto_increment, unique, NOT NULL
- **username:** VARCHAR(45), unique, NOT NULL
- **user_fname:** VARCHAR(45), NOT NULL
- **user_lname:** VARCHAR(45), NOT NULL
- **email:** VARCHAR(145), NOT NULL
- **gender:** VARCHAR(45), NOT NULL
- **race_ethnicity:** VARCHAR(145), NOT NULL

#### Relationships:

- **1:M Users to Reviews:** One user can leave zero, one, or many reviews
- **1:M Users to Ratings:** One user can contribute to many ratings
- **M:M Users to Cities:** One user can be a past/present resident of many cities, and one city can have many users (residents)
- **1:M Users to Users_Cities:** One user can have many residencies, defining the M:M relationship of Users with Cities

### 3. Users_Cities

- **user_city_id:** INT, PK, auto_increment, unique, NOT NULL
- **user_id:** INT, FK, NOT NULL
- **city_id:** INT, FK, NOT NULL
- **start_year:** YEAR, NOT NULL
- **end_year:** YEAR
- **current_resident:** BOOLEAN, NOT NULL

#### Relationships:

- **M:1 Users_Cities to Users:** Many residencies correspond to one user
- **M:1 Users_Cities to Cities:** Many residencies correspond to one city

### 4. Reviews

- **review_id:** INT, PK, auto_increment, unique, NOT NULL
- **city_id:** INT, FK, NOT NULL
- **user_id:** INT, FK
- **date:** DATE, NOT NULL
- **review:** VARCHAR(1000), NOT NULL

#### Relationships:

- **M:1 Reviews to Cities:** Many reviews can be written for one city
- **M:1 Reviews to Users:** Many reviews can be written by one user

### 6. Ratings

- **rating_id:** INT, PK, auto_increment, unique, NOT NULL
- **city_id:** INT, FK, NOT NULL
- **category_id:** INT, FK, NOT NULL
- **user_id:** INT, FK, NOT NULL
- **score:** TINYINT(5), NOT NULL, CHECK (score >= 1 AND score <= 5)

#### Relationships:

- **1:M Ratings to Categories:** One rating has many categories
- **M:1 Ratings to Cities:** Many ratings can be submitted for one city
- **M:1 Ratings to Users:** Many ratings can be submitted by one user

### 7. Categories

- **category_id:** INT, PK, auto_increment, unique, NOT NULL
- **category_name:** VARCHAR(145), NOT NULL
- **category_description:** VARCHAR(500), NOT NULL

#### Relationships:

- **M:1 Categories to Ratings:** Many categories belong to one rating

## Entity-Relationship Diagram

<img width="793" alt="Screen Shot 2024-02-27 at 4 35 40 PM" src="https://github.com/aauin/City-ratings/assets/21292668/0bca2708-b0c2-4c6f-9f99-f2291a7602e0">


## Schema

<img width="531" alt="Schema" src="https://github.com/aauin/City-ratings/assets/21292668/30fc5bbf-1893-45e6-8aa3-d8c5bb08c15d">


## Screenshots With Sample Data

<img width="1188" alt="Screen Shot 2023-06-11 at 5 27 16 PM" src="https://github.com/aauin/City-ratings/assets/21292668/a1b6203e-e75d-475c-b379-114c21c6a0ac">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 28 20 PM" src="https://github.com/aauin/City-ratings/assets/21292668/1f528cc7-ce7d-457a-af71-b71442a2ff2c">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 29 22 PM" src="https://github.com/aauin/City-ratings/assets/21292668/ff0fcd84-05b0-4110-97ad-a9a5a4ed9bcf">

<img width="1186" alt="Screen Shot 2023-06-11 at 5 29 52 PM" src="https://github.com/aauin/City-ratings/assets/21292668/7843988f-6a81-4a5c-9a43-f9716752a4a0">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 30 32 PM" src="https://github.com/aauin/City-ratings/assets/21292668/66ffcaaf-8f4b-45ea-bb2e-d20f1514622d">

<img width="1187" alt="Screen Shot 2023-06-11 at 5 30 53 PM" src="https://github.com/aauin/City-ratings/assets/21292668/1c965b4f-0c3d-420d-8a99-7d0e3b229a0f">

<img width="1190" alt="Screen Shot 2023-06-11 at 5 35 14 PM" src="https://github.com/aauin/City-ratings/assets/21292668/59127063-efdb-4522-93c5-1e1f149721ad">

<img width="1190" alt="Screen Shot 2023-06-11 at 5 35 37 PM" src="https://github.com/aauin/City-ratings/assets/21292668/1f6eef22-ebb9-4a05-be66-2553db6b333b">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 36 05 PM" src="https://github.com/aauin/City-ratings/assets/21292668/9b933abb-7894-47e5-9baf-d902f91610ae">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 36 52 PM" src="https://github.com/aauin/City-ratings/assets/21292668/38e77a58-fdd6-404f-a7fb-7e208796815b">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 37 27 PM" src="https://github.com/aauin/City-ratings/assets/21292668/2b34dd32-185a-49bf-8044-083829d14f29">

<img width="1190" alt="Screen Shot 2023-06-11 at 5 37 50 PM" src="https://github.com/aauin/City-ratings/assets/21292668/156dfe83-2f7b-4db6-aba6-189b695d22b0">

<img width="1177" alt="Screen Shot 2023-06-11 at 5 38 11 PM" src="https://github.com/aauin/City-ratings/assets/21292668/4a785360-d460-4087-a3b0-f48d743e5b90">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 39 06 PM" src="https://github.com/aauin/City-ratings/assets/21292668/93e04a95-d7cb-4ddb-a080-7e685a56c428">

<img width="1187" alt="Screen Shot 2023-06-11 at 5 39 57 PM" src="https://github.com/aauin/City-ratings/assets/21292668/adb0d6d6-3141-4cd6-b733-128f911e4e6b">

<img width="1179" alt="Screen Shot 2023-06-11 at 5 40 21 PM" src="https://github.com/aauin/City-ratings/assets/21292668/0bb429a3-bee5-428d-989e-76153c30e817">

<img width="1188" alt="Screen Shot 2023-06-11 at 5 40 45 PM" src="https://github.com/aauin/City-ratings/assets/21292668/f6009133-d877-47a4-b047-d209a6b0f7a8">

<img width="1188" alt="Screen Shot 2023-06-11 at 5 42 01 PM" src="https://github.com/aauin/City-ratings/assets/21292668/40dcf930-e000-47e3-944d-57b523193926">

<img width="1191" alt="Screen Shot 2023-06-11 at 5 42 22 PM" src="https://github.com/aauin/City-ratings/assets/21292668/edd8d27e-aa14-4b12-bdfe-8f23dd4d602d">

<img width="1187" alt="Screen Shot 2023-06-11 at 5 42 43 PM" src="https://github.com/aauin/City-ratings/assets/21292668/9ce94e06-c961-4800-b494-b82c3731c0c4">

<img width="1189" alt="Screen Shot 2023-06-11 at 5 43 05 PM" src="https://github.com/aauin/City-ratings/assets/21292668/4ec461bb-f10a-4864-abe2-c87362e9bf7d">






## Usage Instructions

Feel free to explore the LocalVibes app and discover city ratings based on your preferences. Whether you're planning a move or simply curious about different cities, LocalVibes offers a user-friendly interface to help you make informed decisions.

## Feedback and Contributions

We welcome feedback and contributions from our users. If you have suggestions for new features or improvements, please don't hesitate to reach out. Let's collectively make LocalVibes the ultimate destination for city ratings and reviews!

Happy Vibing!
