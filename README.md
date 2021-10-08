# PhilippeJoubard_7_30032021
Seventh project of web development course at OpenClassrooms:  "Créez un réseau social d'entreprise"
Goal, as a fullstack developer working for GROUPOMANIA customer, is to develop both backend and frontend applications based on the 
specifications document submitted.

## !! IMPORTANT !!
- This repo includes backend and frontend applications 
https://github.com/MenAllen/PhilippeJoubard_7_30032021.git

- Following applcations need to be installed on your PC:
	NodeJS
	Express
	MySQL
	VueJS
	
- For backend application:
		edit .env file to fill in DB & TOKEN with relevant strings:
		launch "npm install" then "node server". Note on startup a console message will indicate whether the connexion to db succeeded or not
		Note Password must be at least 8 chars, with at least one capital letter (A-Z), one small letter (a-z) and one number (0-9)

- For frontend application:
		launch "npm install" then "npm run serve".

## General Description
PIIQUANTE is dedicated to hot sauces creation, whose recipes are kept secrete. To inrease buzz, the company
wants to create a web application where users can add their preferred own sauces, and like or dislike sauces added by others

## Tools & Software used
- Visual Studio Code with extensions Prettier & Live Server
- Git & Github
- Runtime NodeJS, Express
- MySQL, sequelize
- VueJS
- Languages: HTML, CSS, Javascript

## Additional functions
- jsonwebtoken to generate and decode token
- brcrypt used to hash password
- helmet to prevent security issues with HTML headers
- joi to validate inputs and prevent injection attacks in mongoDB

## Descrition
- The application is based on 3 main tables : User, Message, Comment
	- The User table includes name, email and password, isAdmin for each employee
	- The Message table includes the text and url of the picture submitted by an employee
	- The Comment table includes comments done on a specifi Message by Employees
- Any User is allowed to create an account, publish and comment message.
- Any User is allowed to delete his own account, thus deleting all published messages and comments
- Any User can list Users created
- Any User can get all the messages & comments or only messages & comments published by a specific employee
- Admin User is created with manual SQL request
- Admin User is allowed to delete any User, any message & comment
- Admin User is allowed to set / unset Admin Role to any User
 
