//STORING FIXED FIELDS
var input = document.querySelector("#input");
var list = document.querySelector("#list");
// var submit = document.getElementsByTagName("input")[1];
var submit = document.querySelector(`#submit`);

// ===================================================================================================
//FUNCTION TO ADD AN LI ELEMENT TO THE LIST
function add(){
   //we will make a div and inside of it will be our li element
    var block = document.createElement("div");
    block.className="block";
	var li = document.createElement("li");
	li.className="listElement";
	li.appendChild(document.createTextNode(input.value));
	list.appendChild(block);
	block.appendChild(li);
	input.value="";
	return block;
}
//FUNCTION TO ADD A DELETE BUTTON TO THE LIST
function makeDelete(block){
	var Delete = document.createElement("i");
	// Delete.className="delete";
	Delete.className="fa fa-trash liButton";
	Delete.setAttribute("aria-hidden","true");
	// Delete.appendChild(document.createTextNode("Delete"));	
	block.appendChild(Delete);
	return Delete;
}

//FUNCTION TO ADD A CHECK BUTTON TO THE LIST
function makeDone(block){
	var Done = document.createElement("i");
	Done.className="fa fa-check liButton";
	Done.setAttribute("aria-hidden","true");
	// Done.appendChild(document.createTextNode("Check"));
	block.appendChild(Done);
	return Done;
}
// ====================================================================================================

//FUNCTION TO ADD THE EVENT LISTENERS TO THE DELETE AND THE CHECK BUTTON
function allocate_events(del,don){

del.addEventListener("click",function(dlt) {dlt.currentTarget.parentNode.remove()});
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
submit.addEventListener("click" , function(){          //for event listener, we have to first tell about the element for which this event listener is
                                                      
   if(input.value.length > 0){      //Give the alerts here
   if(input.value==0) {
   	alert("Enter a valid item!");
   	return;  
   }
   var block = add();
    don = makeDone(block);
	del = makeDelete(block);   
	allocate_events(del,don);           
	
  }
})

//ADDING EVENT LISTENERS TO THE KEYPRESS OF ENTER
input.addEventListener("keypress" , function(event){      //for the keypress, we have to also pass the event as a parameter which will store the information about the key pressed 

   if(input.value.length > 0 && event.which === 13){
    if(input.value==0) {
   	alert("Enter a valid item!");
   	return;  
   }
    var li = add();
    don = makeDone(li);
	del = makeDelete(li);              
	allocate_events(del,don);		
  }
})

// now just add the event listener to the two buttons by giving them the classes first and then completing the rest
//Note: for applying eventListener to all the members of a class you need to loop all the array elements of the class
//if you have a ES6 support go for the forEach method.

// Adding eventListener to the Delete and Done buttons
// var delete_list = document.getElementsByClassName("delete");
// var done_list = document.getElementsByClassName("done");



// function allocate_events(){

// var delete_list = document.getElementsByClassName("delete");
// var done_list = document.getElementsByClassName("done");


// for(var i = 0 ; i < delete_list.length ; i++)    // here both the list have the same length 
// {
// 	delete_list[i].addEventListener("click",function(del) {del.currentTarget.parentNode.remove()});
// 	done_list[i].addEventListener("click" ,function(don) {
	
// 	if(don.currentTarget.parentNode.style.textDecoration!="line-through")
// 		don.currentTarget.parentNode.style.textDecoration="line-through";
// 	else if(don.currentTarget.parentNode.style.textDecoration=="line-through")
// 		don.currentTarget.parentNode.style.textDecoration="none";

// 	});
// }

// }



//Completed!!!