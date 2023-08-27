import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove,update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-5df24-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const endorsementsInDB = ref(dataBase,"endorsementsInDBList")


const text = document.getElementById("textarea")
const fromm = document.getElementById("from")
const to = document.getElementById("to")

const publishButton = document.getElementById("publish")
const endorsements_list = document.getElementById("endorsements-list")

publishButton.addEventListener('click',function(){
       if(text.value && fromm.value && to.value){
        const textVal = text.value
        const textFrom = fromm.value
        const textTo = to.value
        const likesVal = 0
        
        
        push(endorsementsInDB,
            {
            text: textVal,
            from: textFrom,
            to: textTo,
            likes:likesVal
            }
        )
        clearText()  
        }
        else {
            endorsements_list.innerHTML = "Add an item"
        }
})

    
onValue(endorsementsInDB,function(snapshot){
    
    if(snapshot.exists()){
        
        let list = Object.entries(snapshot.val())
        
        clearList()
        
        for(let i=0;i<list.length;i++){
            const currentItem = list[i]   
            appendList(currentItem)
        } 
}
})


function clearList(){
    endorsements_list.innerHTML=""
}

function clearText(){
    text.value = ''
    fromm.value =''
    to.value =''    
}


function appendList(item){
    let id = item[0]
    let val = item[1]
    
    
    const li = document.createElement('li')
     
    var div = document.createElement("div");
    
    const element1 = document.createElement("p");
    element1.textContent = "To "+ val.to;
    div.appendChild(element1);
    
    
    const element2 = document.createElement("span");    
    element2.textContent = val.text;
    div.appendChild(element2);

    const div2 = document.createElement("div");
    div2.classList.add("likesOfDiv");
    const element3 = document.createElement("p");
    const element4 = document.createElement("span");
    element4.textContent = `${val.likes} ❤️`;3
    element4.setAttribute("id", `${item[0]}`);
    element4.classList.add("likes");
    element4.addEventListener("click", () => {
      const likesEl = document.querySelectorAll(".likes");
      likesEl.forEach((like) => {
        if (like.getAttribute("id") === element4.getAttribute("id")) {
          const endorsementRefToUpdate = ref(
            dataBase,
            `endorsementsInDBList/${element4.getAttribute("id")}`
          );
          update(endorsementRefToUpdate, { likes: val.likes + 1 })
        }
      });
    });
    element3.textContent = "From "+ val.from;       
    div2.appendChild(element3)
    div2.appendChild(element4)
    
    
         
    div.appendChild(div2);



    li.appendChild(div);
    
    
    // li.addEventListener('click',function(){
    //     let excatLocationInDb = ref(dataBase,`endorsementsInDBList/${id}`)
    //     remove(excatLocationInDb)
    // })
    
    
    endorsements_list.append(li)
}



    