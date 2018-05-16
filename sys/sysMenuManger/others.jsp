<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>其他工单 </title>
	
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.9.1.js"></script>
<style type="text/css">
	

	* {
		margin: 0;
		padding: 0;
		font-family: '微软雅黑', 'Arial', 'Verdana', 'sans-serif';
	}

	body {
		background-color: white;
	}



	/* 大表格  <ul> 包含許多 <li> */

	ul {
		list-style: none;
		width: 600px;
		height: auto;
		margin: 0 auto;
		background-color: white;
	}


	/* 每一個格，是一個 <li> */

	.cell{
		width: 100px;
		height: 100px;
		
		float: left;
		margin : 5px;
		padding: 3px;

		vertical-align: bottom;
		
		border-width : 0px;
		border-color : orange;
		border-style : solid;
		
		border-radius: 16px;
		-moz-border-radius: 16px;
		-khtml-border-radius: 16px;
		-webkit-border-radius: 16px;
		
	}

	.cell-first {
		background-color: rgb(255, 255, 255);
		color : rgb(0,0,0);
		font-size : 14px;
		font-weight: bold;
	}

	.cell-item {
		background-color: rgb(72, 144, 196);
		color: white;
		font-size : 11px;
		font-weight : bold;
		cursor : pointer;
	}
	
	.cell-padding {
		background-color: rgb(255, 255, 255);
	}

	/* 图片方格，一個正方形的 <div> */

	.square {
		border : none;
		width: 92%;
		height: 45%;
		text-align: center;
		vertical-align: middle;
	}

	.img {
		width: 100%;
		height: 100%;
	}


/* 按鈕下方小長條，是一個 <span> */
	.msg {
		width: 92%;
		height: 35%;
		display: block;
		
		text-align: center;
		vertical-align: middle;
	}


	/* 按鈕 */
	a {
		float: left;
		text-align: center;
		width: 100%;
		height: 18px;
		display: block;
		color: white;
	
	}
	a:hover {
		box-shadow: 0px 0px 10px #fff;

	}
	</style>
	
</head>
<body>
 	<div class="container" style="width: 95%;overflow-x:hidden; ">
		<ul id="ul-cells">
			
		</ul>
 	</div>


<script type="text/javascript">

var Model = {
	raw : ${menu}	
};


</script>

<script type="text/javascript">
	


var View = new Function();

View.render = function(){
	var ul = document.getElementById('ul-cells');
	var html = '';
	var n = 0, item;
	var classname, msg, img;
	var onmouseover, onmouseout, onclick;
	for(var i = 0; i < Model.raw.items.length + 1; i++){
		classname = 'cell ';
		if (i == 0) {
			classname += 'cell-first';
			msg = Model.raw.name;
			onmouseover = onmouseout = onclick = img = '';
		} else if (n < Model.raw.items.length){
			item = Model.raw.items[n];
			classname += 'cell-item';
			msg = item.name;
			onmouseover = "View.cell.onmouseover(this)";
			onmouseout = "View.cell.onmouseout(this)";
			onclick = "View.cell.onclick(" + n + ")";
			
			img = "<img src='${pageContext.request.contextPath}/img/menu/plain/white-" + Math.round(Math.random() * 6 + 1) + ".png' />";
			n++;
		} else {
			classname += 'cell-padding';
			onmouseover = onmouseout = onclick = img = msg = '';
		}
		 html += 
			"<li class='" + classname + "' onclick='" + onclick + "'>" +
				"<br/><div class='square'>" +
					img +
				"</div>" +
				"<div class='msg'" + " onmouseover='" + onmouseover + "' onmouseout='" + onmouseout + "'>" +
					msg +
				"</div>" +
			"</li>";
	}		
	ul.innerHTML = html;
}

View.cell = {
	onmouseover : function(src){
		src.style.backgroundColor = 'orange';
		src.parentElement.style.backgroundColor = 'orange';
		src.parentElement.children[0].style.backgroundColor = 'orange';
	},
	onmouseout : function(src){
		src.style.backgroundColor = 'rgb(72, 144, 196)';
		src.parentElement.style.backgroundColor = 'rgb(72, 144, 196)';
		src.parentElement.children[0].style.backgroundColor = 'rgb(72, 144, 196)';
	},
	onclick : function(itemIndex){
		var item = Model.raw.items[itemIndex];
		var tab = parent.parent.tab.add({    
			'title' : item.name,  
			 closable : true,      
			 html:'<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="' + item.url + '"></iframe>'   
		});    
		parent.parent.tab.setActiveTab(tab);
	}
};


</script>

<script type="text/javascript">
View.render();
</script>
</body>
</html>