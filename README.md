# React JS HR Management System - HR Core

HR Management system app to manage your company employees.

This project is being created with React JS and Firebase database.
Includes Firebase authentification and Cloud Functions.

![alt text](<https://github.com/kkarwowski/Gifs/blob/master/Dashboard%20(Custom).jpg> "Dashbpard")

## Live demo

Live demo on [Netlify](https://hrcore-app.web.app)

## Status

Core aplication is working, but it is still work in progress as I learn React.

## Current Features

- [x] Update Associate profile picture, crop, resize to 200px square and upload to Firestore
- [x] Set document category when uploading a new document
- [x] Download, delete a document
- [x] Set document category when uploading a new document
- [x] Changes tab showing changes done to Title or Salary of associates
- [x] Demo mode login button, restricts Demo user to affect State with Delete or Update functions. Demo user can't change data in Firebase or Firestore.
- [x] Add, Delete Associates
- [x] Graphs with realtime data from database.
- [x] Bulk import Associates from CSV with provided master CSV file
- [x] Cloud Function running every 2 months to get current number of Employed Associates and write it to Database => display on graph.
- [x] Authentication with Firebase
- [x] Add Tasks, approve and reject task
- [x] Task to change salary or title will change actual data on target associate, also changes will be recorded in Changes tab
- [x] Give Thanks, add comments, likes, edit your own comments and delete them

## To Do

- [ ] Terminate Associate with a click of a button
- [ ] Edit my own profile, hide data regullar user shoudn't be able to see ( my notes, my documents etc...)
- [ ] View, request holidays

## Screenshots

![alt text](<https://github.com/kkarwowski/Gifs/blob/master/Assocaites%20(Custom).jpg> "Associates")
![alt text](<https://github.com/kkarwowski/Gifs/blob/master/Associate%20profile%20(Custom).jpg> "Associate")
![alt text](<https://github.com/kkarwowski/Gifs/blob/master/Thanks%20(Custom).jpg> "Thanks")
![alt text](<https://github.com/kkarwowski/Gifs/blob/master/Task%20(Custom).jpg> "Tasks")
