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
	
- Two SQL files are made avaibale:
	DatabaseInit.sql to create the empty database
	SetAdmin.sql to set a specific userId with Admin role, after the userId has been created by the app (default is userId 1, can be changed)	
 	
- For backend application:
	edit .env file to fill in DB & TOKEN with relevant strings:
		DB_USER = database user
		DB_PASS = user password
		DB_NAME = database name
		TOKEN = A strig to be "SECRET_TOKEN"

	launch "npm install" then "node server". Note on startup a console message will indicate whether the connexion to db succeeded or not

- For frontend application:
	launch "npm install" then "npm run serve".
	Note Password must be at least 8 chars, with at least one capital letter (A-Z), one small letter (a-z) and one number (0-9)

## General Description
	GROUPOMANIA is requesting a social network for enterprise in order for employees to exchange text & photos.
	They have specified the needs and want to test a MVT
	
## Tools & Software used
	Visual Studio Code with extensions Prettier & Live Server
	Git & Github
	Runtime NodeJS, Express
	MySQL, sequelize
	VueJS
	Languages: HTML, CSS, Javascript

## Additional functions
	jsonwebtoken to generate and decode token
	brcrypt used to hash password
	helmet to prevent security issues with HTML headers
	joi to validate inputs and prevent injection attacks in mongoDB

## Descrition
	The application is based on 3 main tables : User, Message, Comment
		The User table includes name, email and password, isAdmin for each employee
		The Message table includes the text and url of the picture submitted by an employee
		The Comment table includes comments done on a specific message by Employees
	Any User is allowed to create an account, publish and comment message.
	Any User is allowed to delete his own account, thus deleting all published messages and comments
	Any User can get all the messages & comments published by employees
	Any User can delete his own messages or comments (using grey icon in the message bloc)
	Admin User is declared admin with manual SQL request
	Admin User is allowed to delete any message & comment (using grey icon in the message bloc)
 
