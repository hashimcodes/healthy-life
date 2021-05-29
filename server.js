// Setup empty JS object to act as endpoint for all routes
const port = 7000;
const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require('express');
const mySql = require('mysql');
// Start up an instance of app
const app = express();

/* Middleware*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static('public'));


//database connection
const dB = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'healthy_life',
    port:'3306',
  });
  
dB.connect((err)=>{
    if(err) throw err;
    else{
    console.log('mysql connected...');
    }
});

//registeration
app.post('/reg',(req, res)=>{

    //console.log(__dirname);

    let first_name = req.body.firstName;
    let last_name = req.body.lastName;
    let email = req.body.email;
    let password = req.body.signupPass;
    let gender = req.body.gender;

    console.log(first_name);
    console.log(last_name);
    console.log(email);
    console.log(password);
    console.log(gender);


    let query = dB.query('INSERT INTO client_profile (first_name, last_name, email, password, gender) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, email, password, gender], (err, result)=>{
        if(err) {
            res.redirect("/");
            throw err;
        } else {
            res.redirect("/login");
            console.log('record added...');
        }
    });
});

//login verification
app.post('/', (req, res) => {
    
    let email = req.body.username;
    let password = req.body.password;

    console.log(email);
    console.log(password);

    let query = dB.query('select * from client_profile where email = ? and password = ?', [email, password], (err, result, fields) => {
        if (result.length > 0) {
            res.redirect("/index");
            console.log('mawgood');
        } else {
            console.log('m4 mawgood');
            res.redirect("/login");
        }
        res.end();//res.send(result.length);
    });
});

/*
app.post('/',(req, res)=>{
    if (req.body.num == 5) {
        let first_name = req.body.firstName;
        let last_name = req.body.lastName;
        let email = req.body.email;
        let password = req.body.signupPass;
        let gender = req.body.gender;
    
        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(password);
        console.log(gender);
    
    
        let query = dB.query('INSERT INTO client_profile (first_name, last_name, email, password, gender) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, email, password, gender], (err, result)=>{
            if(err) {
                res.redirect("/");
                throw err;
            } else {
                res.redirect("/login");
                console.log('record added...');
            }
        });
    } else if (req.body.num == 2){
        let email = req.body.username;
        let password = req.body.password;

        console.log(email);
        console.log(password);

        let query = dB.query('select * from client_profile where email = ? and password = ?', [email, password], (err, result, fields) => {
            if (result.length > 0) {
                res.redirect("/index");
                console.log('mawgood');
            } else {
                console.log('m4 mawgood');
                res.redirect("/login");
            }
            res.end();//res.send(result.length);
    });
    }
});
*/
app.get('/data', (req, res) => {

    let query1 = dB.query('select * from client_profile', (err, result, fields) => {
        //const data2 = result.length;
        res.send({'Number= ':result.length});
        console.log(result.length);
    });
/*
    let query2 = dB.query('select * from client_activity', (err, result, fields) => {
        res.send({'activity':result.length});
        console.log(result.length);
    });
*/
});

//navigation handling

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/adminstration.html');
});


app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/sign-up.html', (req, res) => {
    res.sendFile(__dirname + '/sign-up.html');
})

app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

app.get('/about-us.html', (req, res) => {
    res.sendFile(__dirname + '/about-us.html');
})

app.get('/under-work.html', (req, res) => {
    res.sendFile(__dirname + '/under-work.html');
})



app.listen(port,()=>{
    console.log(`the server is running on port number: ${port}`);
});

