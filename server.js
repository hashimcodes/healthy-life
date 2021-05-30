// Setup empty JS object to act as endpoint for all routes
const port = 7000;
//const bodyParser = require('body-parser');
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

activity = {
    log: '',
    email: '',};
//login verification
app.post('/', (req, res) => {
    
    let email = req.body.username;
    let password = req.body.password;

    console.log(email);
    console.log(password);

    let query = dB.query('select * from client_profile where email = ? and password = ?', [email, password], (err, result, fields) => {
        if (result.length > 0) {
            console.log('mawgood');
            if (email === 'admin@admin.com' && password ==='admin') {
                res.redirect("/admin");
                activity.log = 1;
                activity.email = email;
            } else {
                res.redirect("/index");
                activity.log = 1;
                activity.email = email;
            }
        } else {
            console.log('m4 mawgood');
            res.redirect("/login");
        }
        res.end();
    });
});

app.get('/clintNum', (req, res) => {
    let query1 = dB.query('select * from client_profile', (err, result, fields) => {
        let sender1 = {};
        sender1.data = result.length;
        res.send(sender1);
        console.log(result.length);
    });
});
app.get('/activityNum', (req, res) => {
    let query2 = dB.query('select * from client_activity', (err, result, fields) => {
        let sender2 = {};
        sender2.data = result.length;
        res.send(sender2);
        console.log(result.length);
    });
});

app.get('/overWeight', (req, res) => {
    let query2 = dB.query('select * from client_activity where BMI_result between 25 and  29.9', (err, result, fields) => {
        let sender2 = {};
        sender2.data = result.length;
        res.send(sender2);
        console.log(result.length);
    });
});

app.get('/underWeight', (req, res) => {
    let query2 = dB.query('select * from client_activity where BMI_result between 0 and 18.5', (err, result, fields) => {
        let sender2 = {};
        sender2.data = result.length;
        res.send(sender2);
        console.log(result.length);
    });
});
app.get('/normalWeight', (req, res) => {
    let query2 = dB.query('select * from client_activity where BMI_result between 18.5 and 24.9', (err, result, fields) => {
        let sender2 = {};
        sender2.data = result.length;
        res.send(sender2);
        console.log(result.length);
    });
});

app.get('/obesiteWeight', (req, res) => {
    let query2 = dB.query('select * from client_activity where BMI_result  > 30 ', (err, result, fields) => {
        let sender2 = {};
        sender2.data = result.length;
        res.send(sender2);
        console.log(result.length);
    });
});


app.post('/result',(req, res)=>{

    let email = activity.email;
    let bmi = req.body.bmi;

    console.log(email);
    console.log(bmi);
    if (activity.log === 1) {
        let query1 = dB.query('select client_profile.client_id from client_profile where client_profile.email = ?',[email], (err, result) => {
            if(err) {
                //res.redirect("/");
                throw err;
            } else {
                console.log('email founded...');
                cliendId = {};
                cliendId = result[0].client_id;
                console.log(cliendId);
                let query2 = dB.query('INSERT INTO `healthy_life`.`client_activity` (`client_id`, `BMI_result`, `calculation_date`, `calculation_time`) VALUES ( ?, ?, current_date(), current_time());', [cliendId, bmi], (err, result)=>{
                    if(err) {
                        //res.redirect("/");
                        throw err;
                    } else {
                        console.log('record added...');
                    }
                });
            }
        });
    } 
});


//navigation handling
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/admin', (req, res) => {
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

app.get('/contact-us.html', (req, res) => {
    res.sendFile(__dirname + '/contact-us.html');
})



app.listen(port,()=>{
    console.log(`the server is running on port number: ${port}`);
});

