const signupBotton = document.getElementById('signup');
signupBotton.addEventListener('click', async ()=>{

    const firstName = document.getElementById('Fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('Email').value;
    const signupPass = document.getElementById('PassID').value;

    const radioButtons = document.querySelectorAll('input[name="gender"]');
    let selectedValue;
    for (const checkedButton of radioButtons) {
        if (checkedButton.checked) {
            selectedValue = checkedButton.value;
            break;
        }
    }
    const gender = selectedValue;
    
    await idToServer(email);
    const data =await getcheck();
    if(data.flag == 1){
       alert("The Account is already exist please login !!");
    }
    else if (data.flag == 0)
    {
        if(firstName != '' && lastName != ''&& gender != '' && signupPass != '' && email != ''){
            regDataToServer(firstName, lastName, email, signupPass, gender);
            alert("Registered Successfully !!");
        } else{
            alert("Please fill data correctly!!");
        }
    }
});

const regDataToServer = async (firstName, lastName, email, signupPass, gender)=>{ 
    await fetch('/reg',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        firstName,
        lastName,
        email,
        signupPass,
        gender,
    })
})};

const idToServer = async (email)=>{ 
    await fetch('/idcheck',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        email,
    })
})};


number = {};
const getcheck = async ()=>{ 
    const data = await fetch('/check',{
    method : 'GET',
    credentials:'same-origin',
})
number = await data.json();
return number;
};
