//1.不传参数：初始化整个页面2.传参数初始化某个input
function score(parm){
	var sobj ;
	if(parm){
		if (typeof (parm) == "string") {	
			//alert(document.getElementById(param));	
			//inputArray = Ext.query("#" + param);
			var arr = new Array();
		
			arr.push(document.getElementById(parm));	
			
			
			sobj = arr;
		} else {
			var arr = new Array();
			arr.push(parm);
			sobj = arr;
		}
	}else{
		sobj = $(".score")
	}
	
	
	//循环页面的所有class=score 的input
	for(var i=0 ;i<sobj.length;i++){
		var num = $(sobj[i]).attr("maxLength") ;
		var ul=document.createElement("ul");
		ul.setAttribute('class','jsstar');
		ul.style.listStyle="none";
		ul.style.margin= "0px";
		ul.style.padding= "0px";
		ul.style.width="auto";
		ul.style.height= "20px";
		ul.style.position= "relative" ;
		ul.setAttribute('class','jsstar');
		var str = "<img class='scoreimg' view=true src='"+MATECH_SYSTEM_WEB_ROOT+"img/star-off.png'>" ;
		
		if(!num || num == 0){
			num = 5;
		}
		
		for(var j=0;j<num;j++){
			var li = document.createElement("li");
			if(j==0){
				li.setAttribute('title','非常不满意');
			}else if(j==1){
				li.setAttribute('title','不满意');
			}else if(j==2){
				li.setAttribute('title','一般');
			}else if(j==3){
				li.setAttribute('title','满意');
			}else{
				li.setAttribute('title','非常满意');
			}
				
			li.setAttribute('onclick','pj(this,'+(j+1)+')');
			li.setAttribute('class','starli');
			li.onclick = function(){
				pj(this);
	        }
			li.setAttribute('class','starli');
			li.style.padding="0px";
			li.style.margin= "0px"; 
			li.style.cssFloat= "left";
			li.style.Float= "left"; 
			li.style.width="20px";
			li.style.height="20px";
			li.style.display="inline";
			li.innerHTML=str ;
			ul.appendChild(li);
		}
		
		$(sobj[i]).before(ul) ;
		
		var c = $(sobj[i]).attr("value") ;
	
		if(c>0){			
			$(this).parent().find(".starli").find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-off.png") ;
			if(c>$(sobj[i]).prev("ul").find(".starli").length){
				c=$(sobj[i]).prev("ul").find(".starli").length;
			}
				
			$($(sobj[i]).prev("ul").find(".starli")[c-1]).prevAll().find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
			$($(sobj[i]).prev("ul").find(".starli")[c-1]).find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
		}
		
	}
	//给星星添加鼠标放上去和移开事件
	$(".jsstar >.starli").hover(
        function(){
        	if($(this).parent().next(".score").attr("readonly")) return ;
			if($(this).parent().next("input[ext_validate='score']").attr("readonly")) return;
			$(this).parent().find(".starli").find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-off.png") ;
			$(this).prevAll().find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
			$(this).find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
		},function(){
			if($(this).parent().next(".score").attr("readonly"))return ;
			if($(this).parent().next("input[ext_validate='score']").attr("readonly")) return;
			var starli=$(this).parent().find(".starli") ;
			starli.find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-off.png") ;
			
			var c = $(this).parent().next(".score")[0].value ;
			if(c>0){
				if(c>$(starli).length){
					c=$(starli).length;
				}
				if($(starli).length!=0){
					$(starli[c-1]).prevAll().find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
					$(starli[c-1]).find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
				}
			}
	});
	
}
//点击方法
function pj(obj){
	if($(obj).parent().next(".score").attr("readonly"))return ;
	if($(obj).parent().next("input[ext_validate='score']").attr("readonly")) return;

	var i=$(obj).parent().find("li").index(obj)+1 ;
	$(obj).parent().next(".score")[0].value=i ;
	
	$(obj).parent().find("li").find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-off.png") ;
	$(obj).prevAll().find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
	$(obj).find(".scoreimg").attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-on.png") ;
	//可以通过重写方法进行对应评分操作
	
	if (funExists("scoreoper")) {
		scoreoper();
	}
}


//禁用传一个禁用input id
function scoreready(k){
	
	var sobj  ;
	var arr = new Array();
	try{
		if(fieldObj){
			for(var i=0;i<fieldObj.length;i++){
				if(fieldObj[i].isReadOnly=="是") {
					if($(document.getElementById(fieldObj[i].enname)).attr("class")=="score"){
						arr.push(document.getElementById(fieldObj[i].enname));
					}
				}
			}
			sobj = arr;
		}else{
			if(k){
				
				arr.push(document.getElementById(k));
				sobj = arr;
			}else{
				sobj = $(".score")
			}
		}
	}catch(e){
		sobj= $(".score") ;
	}
	for(var i=0 ;i<sobj.length;i++){
		var imgs = $(sobj[i]).prev("ul").find("img") ;
		for(var m=0;m<imgs.length;m++){
			if($(imgs[m]).attr("src").indexOf("star-off.png")>=0){
				$(imgs[m]).attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-off1.png") ;
			}
		}
		$(sobj[i]).attr("readonly","true");			
	}
}
//启用传启用的id
function onscoreready(k){
	var sobj  ;
	if(k){
		var arr = new Array();
		arr.push(document.getElementById(k));
		sobj = arr;
	}else{
		sobj = $(".score") ;
	}
	for(var i=0 ;i<sobj.length;i++){
		var imgs = $(sobj[i]).prev("ul").find("img") ;
		for(var m=0;m<imgs.length;m++){
			if($(imgs[m]).attr("src").indexOf("star-off1.png")>=0){
				$(imgs[m]).attr("src",MATECH_SYSTEM_WEB_ROOT+"img/star-off.png") ;
			}
		}
		
		
		$(sobj[i]).removeAttr("readonly");			
	}
}
