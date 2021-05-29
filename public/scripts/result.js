function result(){
    let x = parseInt(document.getElementById("heightID").value, 10);
    let y = parseInt(document.getElementById("weightID").value, 10);

    console.log(x);
    console.log(y);

    let weight = y;
    let height = (x / 100)*(x / 100);
    let bmi = (weight/height).toFixed(1);
    
    bmiToServer(bmi);

    let resString = '';
    let pic = '';
    let tips = '';

    if (bmi <= 18.5) {
        resString = 'Underweight';
        pic = 'resources/pics/pic2.jpg';
        tips = '<li>Keep a Food Diary</li>'+
        '<li>Add it Up</li>'+
        '<li>Focus on Quality, Not Quantity</li>'+
        '<li>Eat More Frequently</li>'+
        '<li>Snack Smart</li>'+
        '<li>Drink it Down</li>'+
        '<li>Eat Before Bed</li>'+
        '<li>Set Attainable Goals</li>'+
        '<li>Get Support</li>'+
        '<li>Dress Well</li>';
    } 

    else if(bmi > 18.5 && bmi <= 24.9){
        resString = 'Normal weight';
        pic = 'resources/pics/pic3.jpg';
        tips = '<li>Build more lean muscle</li>'+
        '<li>Fight off hunger with more filling foods</li>'+
        '<li>Avoid temptation</li>'+
        '<li>Count calories</li>'+
        '<li>Plan your meals in advance</li>'+
        '<li>Minutes to your exercise plan</li>'+
        '<li>Measure your portions</li>'+
        '<li>Weigh yourself daily</li>'+
        '<li>Include dairy in your diet</li>'+
        '<li>Eat breakfast</li>';
    } 

    else if (bmi > 24.9 && bmi <= 29.9){
        resString = 'Overweight';
        pic = 'resources/pics/pic4.jpg';
        tips = '<li>Eat plenty of soluble fiber.</li>'+
        '<li>Follow a High-Protein Diet</li>'+
        '<li>Squeeze in More Sleep</li>'+
        '<li>Add Vinegar to Your Diet</li>'+
        '<li>Eat More Healthy Fats</li>'+
        '<li>Drink Healthier Beverages</li>'+
        '<li>Fill up on Fiber</li>'+
        '<li>Cut Down on Refined Carbs</li>'+
        '<li>Increase Your Cardio</li>'+
        '<li>Add Probiotics to Your Diet</li>';
    } 

    else if (bmi >= 30){
        resString = 'Obesity';
        pic = 'resources/pics/pic1.png';
        tips = '<li>Eat plenty of soluble fiber.</li>'+
        '<li>Follow a High-Protein Diet</li>'+
        '<li>Squeeze in More Sleep</li>'+
        '<li>Add Vinegar to Your Diet</li>'+
        '<li>Eat More Healthy Fats</li>'+
        '<li>Drink Healthier Beverages</li>'+
        '<li>Fill up on Fiber</li>'+
        '<li>Cut Down on Refined Carbs</li>'+
        '<li>Increase Your Cardio</li>'+
        '<li>Add Probiotics to Your Diet</li>';
    }

    /*Underweight = <18.5
    Normal weight = 18.5–24.9
    Overweight = 25–29.9
    Obesity = BMI of 30 or greater
    */


    let codeBlock = '<div class="backGround">' +
                    '</div>'+
                        '<div class="grid-container"> '+
                        '<div class="grid-item1">'+
                                `<h5>Your BMI is ${bmi} - ${resString}`+
                                '<h5>Here is 10 tips for you:</h5>'+

                                '<ol>'+
                                    `${tips}`+
                                '</ol>'+
                            '</div>'+

                            `<img class="grid-item2" src="${pic}" alt="Food">`+
                        '</div>'; 

    if ((x < 220 && x > 40) && (y > 30 && y < 250)) {
            document.getElementById("fitPic").style.display = 'none';
            document.getElementById("warr-msg").style.display = 'none'
            document.getElementById("res").innerHTML = codeBlock;
    }
    else {
        document.getElementById("warr-msg").style.display = 'block';
    }
}
 
const bmiToServer = async (bmi)=>{ 
    await fetch('/result',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        bmi,
    })
})};