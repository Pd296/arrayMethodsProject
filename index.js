const main=document.getElementById('main');
const addUser=document.getElementById('btn1');
const doubleMoney=document.getElementById('btn2');
const onlyMillioners=document.getElementById('btn3');
const sortByRichesst=document.getElementById('btn4');
const totalWeatlh=document.getElementById('btn5');


let data=[];
async function fetchRandomUser(){

   const res = await fetch('https://randomuser.me/api/');
   const dataFromApi= await res.json();
   
   const user=dataFromApi.results[0];
   
   const newUser={
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * Math.pow(10,6))
       };
   // console.log(newUser);
   
    addUserToData(newUser);   

}
function addUserToData(newUser){
    data.push(newUser);
    updateDOM();
}   

function updateDOM(providedData = data){
    main.innerHTML=' <h2> <strong>Person</strong>   Wealth</h2>';
    providedData.forEach( person => {
     const element= document.createElement('div');
     element.className += 'person';
     element.innerHTML= `<strong> ${person.name} </strong>  ${formatMoney(person.money)}`;
     main.appendChild(element);
    });
}

function updateDOMforReduce(output){
    main.innerHTML='<h2><strong>TotalWealth</strong></h2>';
    const element= document.createElement('div');
    element.className += 'reduce';
    element.innerHTML=`<h3>${formatMoney(output)}</h3>`;
    main.appendChild(element);
    

}
function formatMoney(money){
    return '$'+money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

function doubleMoneyForPeople(){
  data= data.map( item => {
     return { ...item, money : item.money *2};
   })
  // console.log(data);
   updateDOM();
}


function showOnlyMillionaires(){
    const millionairesData =data.filter( item => item.money > 1000000);
    updateDOM(millionairesData);
}

function sort(){

    //sorts in descending order
    const sortedArray = data.sort( (a,b) => b.money - a.money);
    updateDOM(sortedArray);
}

function findTotalWealth(){

    const output=data.reduce((acc,curr) =>{
        acc+=curr.money;
        return acc;
    },0);
      
    updateDOMforReduce(output);

}

//Event Listeners

addUser.addEventListener('click',fetchRandomUser);
doubleMoney.addEventListener('click',doubleMoneyForPeople);
onlyMillioners.addEventListener('click',showOnlyMillionaires);
sortByRichesst.addEventListener('click',sort);
totalWeatlh.addEventListener('click',findTotalWealth);