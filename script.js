
let button = document.getElementById("btn");
let input = document.getElementById("input");

button.addEventListener('click', ()=> {findAndRemove(input.value, makeRoot(arr))});

let arr = [{
    id: 0,
    name: 'Armenia',
    parentId: null
  }, {
    id: 1,
    name: 'Shirak',
    parentId: 0
  }, {
    id: 2,
    name: 'Lori',
    parentId: 0
  }, {
    id: 3,
    name: 'Tavush',
    parentId: 0
  }, {
    id: 4,
    name: 'Syuniq',
    parentId: 0
  }, {
    id: 5,
    name: 'Gyumri',
    parentId: 1
  }, {
    id: 6,
    name: 'Vanadzor',
    parentId: 2
  }, {
    id: 7,
    name: 'Ijevan',
    parentId: 3
  }, {
    id: 8,
    name: 'Goris',
    parentId: 4
  }, {
    id: 9,
    name: '58',
    parentId: 5
  }, {
    id: 10,
    name: 'Dimac',
    parentId: 6
  }, {
    id: 11,
    name: 'Rembaz',
    parentId: 7
  }, {
    id: 12,
    name: 'Getapnya',
    parentId: 8
  }];

//Marking function
function mark(text, search){
  let re = new RegExp(search, "gi")
  let start = text.search(re);
  let endIndex = start + search.length
  return text.slice(0,start) + `<span class="marked">${text.slice(start,endIndex)}</span>` + text.slice(endIndex)
}


//SEARCHING FUNCTION /////////////////
  function findAndRemove(text,data) {
    document.getElementById("container").innerHTML = "";

  //Recursion search/////////////////////////////
    let serachingReg = new RegExp(text, "gi")
    
    function rec(data){
      return data.map((el) => {
        if(el.name.includes(text)){

          return {...el, children:[], flag:true, name: mark(el.name,text)}
        } else if(!el.children.length && !el.name.includes(text)){
          return {...el, children:[], flag:false}
        }else {
          return {...el, children:rec(el.children), flag:rec(el.children).filter(t => t.flag).length?true:false}
        }
      })}



function genLi(content){
  let el =  document.createElement("li");
  el.id = content.name
  el.innerHTML = content.name;
  return el;
}

function genUl(id){
  let ul =  document.createElement("ul");
  ul.id = id
  return ul;
}


      function render1(data, id="container"){
        data.forEach(ch => {
          if(ch.flag){
            document.getElementById(id).appendChild(genLi(ch))
            document.getElementById(ch.name).appendChild(genUl(ch.id))
            if(ch.children.length){
              render1(ch.children, ch.id)
            }
          }
        });
    }

console.log(rec(data))
render1(rec(data))


 
}


/////Transform flat array into nested Obj
function makeRoot(items){
  const arm = (items,id = null)=>
items.filter(item => item.parentId === id)
.map(i => ({...i,children:arm(arr,i.id)}));
return arm(items);
}





function genUl(id){
  let ul =  document.createElement("ul");
  ul.classList.add("nested")
  ul.id = id
  return ul;
}
function genArrow(cont){
  let arrow = document.createElement("span");
  arrow.className = "caret";
  arrow.innerHTML = cont.name;
  return arrow;
}

function genLi(content){
    let el =  document.createElement("li");
    el.id = content.name
    el.innerHTML = `<span class='caret'>${content.name}</span>`;
    return el;
}


function render(data, id="container"){
    data.forEach(ch => {
    document.getElementById(id).appendChild(genLi(ch))
    document.getElementById(ch.name).appendChild(genUl(ch.id))
    if(ch.children.length){
      render(ch.children, ch.id)
    }
    });
}



render(makeRoot(arr));

let toggler = document.getElementsByClassName("caret");
for(let i = 0; i< toggler.length; i++){
  toggler[i].addEventListener('click', function (){
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
} 

