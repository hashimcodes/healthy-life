const clintsbtn = document.getElementById('clintNum');
clintsbtn.addEventListener('click', async ()=>{
    clintNum();
    display('block','none','none','none','none','none');

});
const activitybtn = document.getElementById('activityNum');
activitybtn.addEventListener('click', async ()=>{
    activityNum();
    display('none','block','none','none','none','none');
});
const overWeightbtn = document.getElementById('overWeight');
overWeightbtn.addEventListener('click', async ()=>{
    overWeight();
    display('none','none','block','none','none','none');
});
const underWeightbtn = document.getElementById('underWeight');
underWeightbtn.addEventListener('click', async ()=>{
    underWeight();
    display('none','none','none','block','none','none');
});
const normalWeightbtn = document.getElementById('normalWeight');
normalWeightbtn.addEventListener('click', async ()=>{
    normalWeight();
    display('none','none','none','none','block','none');
});
const obesiteWeightbtn = document.getElementById('obesiteWeight');
obesiteWeightbtn.addEventListener('click', async ()=>{
    obesiteWeight();
    display('none','none','none','none','none','block');
});
const display=(clinet,activity,over,under,normal,obesite)=>{
    document.getElementById('clintNumDiv').style.display=`${clinet}`;
    document.getElementById('activityNumDiv').style.display=`${activity}`;
    document.getElementById('overWeightDiv').style.display=`${over}`;
    document.getElementById('underWeightDiv').style.display=`${under}`;
    document.getElementById('normalWeightDiv').style.display=`${normal}`;
    document.getElementById('obesiteWeightDiv').style.display=`${obesite}`;
}


// total clints number
const clintNum = async ()=>{ 
    const data = await fetch('/clintNum',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
let code = '<label for="">Total clients </label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';
    document.getElementById('clintNumDiv').innerHTML = code;
return number;
};


//total activity number
const activityNum = async ()=>{ 
    const data = await fetch('/activityNum',{
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
    document.getElementById('activityNumDiv').innerHTML = code;
return number;
};


// total number of over weight
const overWeight = async ()=>{ 
    const data = await fetch('/overWeight',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
let code = '<label for="">Total number of over weight</label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';
    document.getElementById('overWeightDiv').innerHTML = code;
return number;
};


const underWeight = async ()=>{ 
    const data = await fetch('/underWeight',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
let code = '<label for="">Total number of under weight</label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';
    document.getElementById('underWeightDiv').innerHTML = code;
return number;
};


const normalWeight = async ()=>{ 
    const data = await fetch('/normalWeight',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
let code = '<label for="">Total number of normal weight</label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';
    document.getElementById('normalWeightDiv').innerHTML = code;
return number;
};


const obesiteWeight = async ()=>{ 
    const data = await fetch('/obesiteWeight',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
let code = '<label for="">Total number of obesity weight</label>' +
                '<br><br>' +
                `<p>${number.data}</p>` +
                '<br><br><br>';
    document.getElementById('obesiteWeightDiv').innerHTML = code;
return number;
};