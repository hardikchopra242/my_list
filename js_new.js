//STORING FIXED FIELDS
let input = document.querySelector("#input");
let list = document.querySelector("#list");
let submit = document.querySelector(`#submit`);

// ===================================================================================================
//FUNCTION TO ADD AN LI ELEMENT TO THE LIST
const add = (inputValue) => {
   //we will make a div and inside of it will be our li element
    let block = document.createElement("div");
    block.className="block";
	let li = document.createElement("li");
	li.className="listElement";
	li.appendChild(document.createTextNode(inputValue));
	list.appendChild(block);
	block.appendChild(li);

	checkList();

	//Before we empty the input field, we will store the input in the local storage
	saveToLocalStorage(input.value);

	input.value="";
	return block;
}
//FUNCTION TO ADD A DELETE BUTTON TO THE LIST
const makeDelete = (block) => {	
	let Delete = document.createElement("i");
	// Delete.className="delete";
	Delete.className="fa fa-trash liButton";
	Delete.setAttribute("aria-hidden","true");
	// Delete.appendChild(document.createTextNode("Delete"));	
	block.appendChild(Delete);
	return Delete;
}

//FUNCTION TO ADD A CHECK BUTTON TO THE LIST
const makeDone = (block) => {
	let Done = document.createElement("i");
	Done.className="fa fa-check liButton";
	Done.setAttribute("aria-hidden","true");
	// Done.appendChild(document.createTextNode("Check"));
	block.appendChild(Done);
	return Done;
}
// ====================================================================================================

//FUNCTION TO ADD THE EVENT LISTENERS TO THE DELETE AND THE CHECK BUTTON
const allocate_events = (del, don) => {
del.addEventListener("click",function(dlt){
    let value = dlt.target.parentElement.children[0].innerText;
	dlt.currentTarget.parentNode.remove()
    deleteLocalTodos(value);

    checkList();

});

don.addEventListener("click" ,function(dne) {
	
	if(dne.currentTarget.parentNode.querySelector("li").style.textDecoration!="line-through"){
		dne.currentTarget.parentNode.querySelector("li").style.textDecoration="line-through";
		dne.currentTarget.parentNode.classList.add("checked");
	}
	else if(dne.currentTarget.parentNode.querySelector("li").style.textDecoration=="line-through"){
		dne.currentTarget.parentNode.querySelector("li").style.textDecoration="none";
		dne.currentTarget.parentNode.classList.remove("checked");
	}

	});
}


// ====================================================================================================}

//ADDING EVENT LISTENERS TO THE SUBMIT BUTTON
submit.addEventListener("click" , () => {          //for event listener, we have to first tell about the element for which this event listener is
                                                      
   if(input.value.length > 0){      //Give the alerts here
   if(input.value.trim().length === 0) {
   	alert("Enter a valid item!");
   	return;  
   }
   let inp = input.value;
   let block = add(input.value);
    don = makeDone(block);
	del = makeDelete(block);   
	allocate_events(del,don);           
	
  }
})

//ADDING EVENT LISTENERS TO THE KEYPRESS OF ENTER
input.addEventListener("keypress" , (event) => {      //for the keypress, we have to also pass the event as a parameter which will store the information about the key pressed 

   if(input.value.length > 0 && event.which === 13){
    if(input.value.trim().length === 0) {
   	alert("Enter a valid item!");
   	return;  
   }

    let inp = input.value;
    let li = add(input.value);
    don = makeDone(li);
	del = makeDelete(li);              
	allocate_events(del,don);		
  }
})


//Function to check if list is empty
const checkList = () => {
	let heading = document.querySelector(`.wrapper h3`);

    if(list.childElementCount === 0){
    	heading.classList.add("hide");
    	heading.classList.remove("show");
    }
    else{
    	heading.classList.add("show");
    	heading.classList.remove("hide");
    }
}

//Adding Elements to Local Storage
const saveToLocalStorage = (todo) => {
	let todos; //Array of all todo

	if(todo.length === 0)
	return;

	//Check if the todo array already exists in the local storage
	if(localStorage.getItem("todos") === null){
		todos =[];
	} else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

//To get Todos from Local Storage
const getLocalTodos = () => {
	let todos;

	//Check if the todo array already exists in the local storage
	if(localStorage.getItem("todos") === null){
		todos =[];
	} else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach( (todo) => {
		let li = add(todo);
    	don = makeDone(li);
		del = makeDelete(li);              
		allocate_events(del,don);
	})
}

//To Delete Element from Local Storage
const deleteLocalTodos = (todo) => {
	let todos;

	//Check if the todo array already exists in the local storage
	if(localStorage.getItem("todos") === null){
		todos =[];
	} else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
    // todo.children[0].innerText
	const todoElement = todo ;
	todos.splice(todos.indexOf(todoElement), 1);
	localStorage.setItem("todos", JSON.stringify(todos));

}  

//Event Listener for Window Load
document.addEventListener(`DOMContentLoaded`, getLocalTodos);

