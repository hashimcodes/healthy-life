
const updateButton = document.getElementById('resBtn');
updateButton.addEventListener('click', async ()=>{

    getData();

});

const getData = async ()=>{ 
    const data = await fetch('/data',{
    method : 'GET',
    credentials:'same-origin',
})
const number = await data.json();
console.log(number);

let code = '<label for="">Total users</label>' +
                '<br><br>' +
                `<p>${JSON.stringify(number)}</p>` +
                '<br><br><br>' +
                '<label for="">Total activities</label>' +
                '<br><br>' +
                `<p>${JSON.stringify(number)}</p>` +
                '<br><br><br>';
    document.getElementById('result').innerHTML = code;
return number;
};

