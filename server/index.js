const express = require('express'); // To easy create RESTFul API endpoint
const mysql = require('mysql');     // To connect with MySQL
const crypto = require('crypto');   // To encrypt password

const nodejs_port = 3000;
const mysql_port = 3306;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'test',
    user: 'imtest',
    password: '',
    port: mysql_port
});

connection.connect(function(error){
  if (error) throw error
  console.log("Connected to database");
});

//Random string added to password to increase security
var generateSalt = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
  .toString('hex') // Convert to hex format
  .slice(0,length); // Return required number of characters
};

var sha512 = function(password, salt){
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return {
    salt:salt,
    passwordHash:value
  }
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true,})); //Use to parse the URL encoded body

app.post("/insert_user", function(request, response){
  const firstName = request.body.first_name;
  const lastName = request.body.last_name;
  const email = request.body.email;
  const password = sha512(request.body.password, generateSalt(16));

  console.log('Datos recibidos: ', request.body);

  const sql = 'INSERT INTO user(email, password, first_name, last_name, salt) VALUES(?,?,?,?,?)';

  connection.query(sql, [email, password.passwordHash, firstName, lastName, password.salt], (error, results)=>{
    if (error) response.status(500).send(error.message);
    else response.status(201).send('Ok');
  });

});

app.post("/log_in", (request, response) =>{
  const {email, password} = request.body

  const sql = 'SELECT password, salt FROM user WHERE email=?';

  connection.query(sql, [email], (error, results) =>{
    if (error) {
      response.status(500).json({error: error.code});
      return;
    }

    if (!results || results.length == 0){
      response.status(404).send("Usuario no registrado");
      return;
    }

    if (sha512(password, results[0].salt).passwordHash == results[0].password){
      response.status(200).send("Haz iniciado sesión");
    } else{
      response.status(401).send("Contraseña incorrecta");
    }

  });
});

app.listen(nodejs_port, () => {
  console.log(`Server listening on http://localhost:${nodejs_port}`);
});