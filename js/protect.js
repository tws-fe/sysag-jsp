 

var   isSaved   =   true; 
var input;
function protect(thisforms){
	
document.body.onbeforeunload=function ff(){return f()}
document.body.onclick=function getinfo(){return save()}

 input   =   document.getElementsByName(thisforms)[0].getElementsByTagName("INPUT"); 

for(var   i=0;i <input.length;   i++){ 
input[i].attachEvent("onchange",func); 
} 
}

function   func(){ 

        isSaved   =   false 
} 


function save(){

	if(window.event.srcElement.type == "submit"||window.event.srcElement.value=="�޸�����"){
		isSaved = true;
	}
		
}

function   f() 
{ 

if(!isSaved) 
{ 
return  "���������Ϣ��û���棬�뿪��ʹ��Ϣ��ʧ��"; 
} 
} 

function   func(){ 
     isSaved   =   false 
   
}



