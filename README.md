# Radiologist Reporting System

## Overview
The Radiologist Reporting System is a web application built with Django for the backend and React (and Redux) for the frontend. It allows radiologists to submit reports and manage them efficiently.

## Prerequisites
Make sure you have the following installed:

- Docker
- Python 3.x
- Node.js
- npm or Yarn

```
git clone https://github.com/Silas281/radiology.git

cd radiology
```

## 
## Backend Setup ()
1. Install Python dependencies (Open Docker desktop before proceeding with the next setup steps):

```

docker-compose build

docker-compose up

```
###  Wait for about a minute for the database to be fully setup. You will see this output below: 
![alt text](./rrs_frontend/public/running.png)

## Frontend Setup
1. Navigate to the rrs_frontend directory (in a separate terminal):
```
cd rrs_frontend
```

2. Install npm dependencies:
```
npm install

# add --legacy-peer-deps flag if there is dependancy conflicts
npm install --legacy-peer-deps
```
3. Start frontend app:
```
npm run dev
```

4. Using the Application:

Use the navigation to add new reports and manage existing ones.


App Snippets

## Reports List Page
![Report List](./rrs_frontend/public/reportsList1.png)



## Report Details
![Report Details](./rrs_frontend/public/detail2.png)



## No Report page
![Empty Reports](./rrs_frontend/public/image.png)

## Add new report page
![Add Report Page](./rrs_frontend/public/add-new.png)


## Edit Report
![Update Report](./rrs_frontend/public/update.png)



