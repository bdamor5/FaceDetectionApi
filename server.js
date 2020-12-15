const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',  //this is same as localhost
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});


const app = express();

const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

const database ={
	users:[
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
	],
	login: [
	{
		id:'987',
		hash:'',
		email:'john@gmail.com'
	}
	]
}//1.root route
app.get('/',(req , res) => {
	res.send(database.users);
})

 //2.signin with POST
app.post('/signin' , (req,res) =>{signin.handleSignin(req,res,db,bcrypt)})

//3.register with POST
app.post('/register' , (req,res) =>{register.handleRegister(req ,res ,db ,bcrypt)})

//4.accessing profile - GET
app.get('/profile/:id' , (req,res) => {profile.handleProfileGet(req,res,db)})

//5.user's image entries count
app.put('/image' , (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl' , (req,res) => {image.handleApiCall(req,res)})

app.listen(3001, ()=>{
	console.log('app is running on port 3001');
})

/* Endpoints or what to routes
//1.root route , responds with working

//2.signin route - POST = success/fail , not using GET as we dont want user info attached to the query strings

//3.register route - POST = new user

//4.on the home screen the ability to access the profile - GET = user

//5.Everytime a user adds an image url , he entries count will increase - PUT = user

*/