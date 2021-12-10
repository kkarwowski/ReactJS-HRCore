# React JS HR Management System - HR Core

This project is being created with React JS and Firebase database. 
Includes Firebase authentification and Cloud Functions.


## Live demo

Live demo on Netlify [link](https://hrcore-app.web.app)

## Status

Core aplication is working, but it is still work in progress as I learn React.
## Current Features
- [x] Update Associate profile picture, crop, resize to 200px square and upload to Firestore 
- [x] Set document category when uploading a new document 
- [x] Demo mode login button, restricts Demo user to affect State with Delete or Update functions. Demo user can't change data in Firebase or Firestore.
- [x] Add, Delete Associate
- [x] Graphs with realtime data from database.
- [x] Bulk import Associates from CSV
- [x] Cloud Function running every 2 months to get current number of Employed Associates and write it to Database => display on graph.
- [x] Authenticate with Firebase

## To Do

- [ ] Bulk import Associates from CSV
- [ ] Terminate Associate with a click of a button
- [ ] Tasks
- [ ] Edit my own profile, hide data regullar user shoudn't be able to see ( my notes, my documents etc...)
