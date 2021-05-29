const logButton = document.getElementById('log');
logButton.addEventListener('click', async ()=>{

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log(username);
    console.log(password);

    logDataToServer(username, password);
});

const logDataToServer = async (username, password)=>{ 
    await fetch('/',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        username,
        password,
        num: 2,
    })
})};