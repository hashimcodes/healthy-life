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
    
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(signupPass);
    console.log(gender);

    regDataToServer(firstName, lastName, email, signupPass, gender);
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
        num: 5,
    })
})};


