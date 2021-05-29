
const updateButton1 = document.getElementById('resBtn1');
updateButton1.addEventListener('click', async ()=>{

    getData1();
    document.getElementById('result1').style.display = 'block';
    document.getElementById('result2').style.display = 'none';

});


const updateButton2 = document.getElementById('resBtn2');
updateButton2.addEventListener('click', async ()=>{

    getData2();
    document.getElementById('result1').style.display = 'none';
    document.getElementById('result2').style.display = 'block';

});

const getData1 = async ()=>{ 
    const data = await fetch('/data1',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
console.log(number);

let code = '<label for="">Total users</label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';

    document.getElementById('result1').innerHTML = code;
return number;
};

const getData2 = async ()=>{ 
    const data = await fetch('/data2',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
console.log(number);

let code =  '<label for="">Total activities</label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';

    document.getElementById('result2').innerHTML = code;
return number;
};
