﻿
var tableIds ="" ;
var selectedRow = "";
 
 function showTD(obj) {
//	var tempValue = obj+"Span" ;
//	document.getElementById("displayTemp").value = tempValue ;
	var divId = document.getElementById(obj);
	divId.style.visibility="visible";
	obj.bgColor='#E4E8EF';
 }

 function hideTD(obj) {
	var divId = document.getElementById(obj);
	divId.style.visibility='hidden' ;
	obj.bgColor='#B9C4D5';
}

function addArrayElement(array,name) {
	var flag = 1;
	for(var i=0; i<array.length; i++) {
		if(array[i]==name) {
			flag = 0;
		}
	}
	if(flag) {
		array.push(name);
	}
}
	/**
	 * �趨��ѡ����
	 * @param 
	 */
function rowSelectStyle(tableId) {

	if(event.srcElement.type=="checkbox") {
		return;
	}
	
	var selectedRow = eval("selectedRow_"+tableId);
	
	var trObj = getTR() ;
	if(selectedRow!="") {
		document.getElementById(tableId).rows[selectedRow].style.backgroundColor = "";
	}
	
	eval("selectedRow_"+tableId+"=trObj.rowIndex");
	trObj.style.background = "#b9c4d5";
	//selectedRow = trObj.rowIndex ;
	/*return ;
	alert(selectedRow) ;
	if(selectedRow!="") {
		if(selectedRow%2!=0) {
			document.getElementById(tableId).rows[selectedRow].className = "oddLine";
		} else {
			document.getElementById(tableId).rows[selectedRow].className = "evenLine";
		}
	}
	
	selectedRow = event.srcElement.parentElement.parentElement.rowIndex;
	var selectedElement = document.getElementById(tableId).rows[selectedRow];
	selectedElement.className = "selectedLine";
	selectedElement.onmouseover = function() {
		event.cancelBubble = true;
	};
	selectedElement.onmouseout = function() {
		event.cancelBubble = true;
	};
//	alert(0)
*/}

	/**
	 * �����и��ӹ��ܲ˵�
	 * @param 
	 */
function createMenu(tableId,field,obj,numberCol,tableHead,isOrderBy,fixColNum,isFixedCol)
{
 var isEqual = false ;
  if(tableIds == "") {
  	tableIds += tableId ;
  }else {
  	var tableIdArr = tableIds.split(",") ;
  	for(var i=0;i<tableIdArr.length;i++) {
  		if(tableIdArr[i] == tableId )  isEqual=true ;
  			
  	}
  	if(!isEqual) {
  		tableIds += ","+tableId ;
  	}
  }
  
  var txtHTML = "" ;
  if(isOrderBy != "")  {
  txtHTML += "<div  class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\"    onMouseOut=\"this.style.background='#B0C4DE'\" onclick=\"addOrderby_CH_"+tableId+"('"+field+"','ASC');hideMenu('"+tableId+"');\">��׷������</div>";
  txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\"    onMouseOut=\"this.style.background='#B0C4DE'\" onclick=\"addOrderby_CH_"+tableId+"('"+field+"','DESC');hideMenu('"+tableId+"');\">��׷�ӽ���</div>";
  txtHTML +="<div class=\"coolMenuDivider\"></div>";
  }
  if(isFixedCol != "isFixedColumn") {
	  if(tableHead != "") {
	  	txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"mouseMoveDiv('"+field+"','"+tableId+"','"+tableHead+"');this.style.background='#E4E8EF'\" onMouseOut=\"hideCellsMenu('"+tableId+"');this.style.background='#B0C4DE'\" onclick=\"mouseMoveDiv('"+field+"','"+tableId+"','"+tableHead+"');\" >&nbsp;&nbsp;������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�� </div>";
	  }else {
	  	txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"mouseMoveDiv('"+field+"','"+tableId+"','');this.style.background='#E4E8EF'\" onMouseOut=\"hideCellsMenu('"+tableId+"');this.style.background='#B0C4DE'\" onclick=\"mouseMoveDiv('"+field+"','"+tableId+"','');\" >&nbsp;&nbsp;������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�� </div>";
	  }
	  txtHTML += "<div class=\"coolMenuDivider\"></div>";
  }
/*  if(isFixedCol == "isFixedColumn") {
  	
  	if(tableHead != "") { txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\" onMouseOut=\"this.style.background='#B0C4DE'\" onClick=\"fixedDynamicCol('"+tableId+"',"+fixColNum+",'"+tableHead+"');hideMenu('"+tableId+"');\">&nbsp;&nbsp;����</div>";}
  	else {
 		 txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\" onMouseOut=\"this.style.background='#B0C4DE'\" onClick=\"fixCol_" +tableId+ "('" +fixColNum+ "');hideMenu('"+tableId+"');\">&nbsp;&nbsp;����</div>";
  	}
  }*/
  

  if(numberCol == "numberCol") {
  	txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\" onMouseOut=\"this.style.background='#B0C4DE'\" onClick=\"createNumDiv('"+tableId+"PromptDiv','������','"+tableId+"','"+field+"');createShieldDiv()\" onMouseOver=\"\">&nbsp;&nbsp;������</div>";
  }
  else {
  txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\" onMouseOut=\"this.style.background='#B0C4DE'\" onClick=\"createPromptDiv('"+tableId+"PromptDiv','�ؼ��ֹ���','"+tableId+"','"+field+"');createShieldDiv()\" onMouseOver=\"\">&nbsp;&nbsp;�ؼ��ֹ���</div>";
  }
 	txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF'\" onMouseOut=\"this.style.background='#B0C4DE'\" onClick=\"cancelFilter('"+tableId+"');hideMenu('"+tableId+"');\" onMouseOver=\"\">&nbsp;&nbsp;ȡ�����</div>";  
  	try {
  	 obj.className = "coolMenu";
     obj.innerHTML = txtHTML;
  	}catch(e){}
}


	/**
	 * �������ͷ�����в˵�
	 * @param 
	 */
function createDynamicCellsMenu(tableId,field,tableHead) {
	
	
	if( tableHead != "") {
	 //���½����ӱ�ͷ�ַ�
	 //K�����ӱ�ͷ�ĸ���
	 var tableArr = tableHead.split(",");
     var k = new Array(tableArr.length) ;
     var tableLength = dynamicHeadGetLevel(tableHead) ;
	
     for(var i=0;i<tableArr.length;i++) {
     	
		if(tableArr[i].indexOf("{") >-1) {
			var tempStr = tableArr[i].substring(0,tableArr[i].indexOf("{")) ;
			tableArr[i] = tableArr[i].substring(0,tableArr[i].indexOf("{"))+"("+tableArr[i].substring(tableArr[i].indexOf("{")+1,tableArr[i].length)+")";
			for(var j=i+1;j<tableArr.length;j++){
				
				if(tableArr[j].indexOf("}") >-1) {
					tableArr[j] =tempStr+"("+tableArr[j].substring(0,tableArr[j].indexOf("}"))+")";
					break ;
				}else
				tableArr[j] = tempStr+"("+tableArr[j]+")";
			}
			i = j ;
		}
	}
	
/*==========================================================================================*/	 	
	 	var hiddenStr = document.getElementById("hideColumnsStr_"+tableId).value;
	 	var cellsMenu = document.getElementById(tableId+"_cellsMenu") ;
	 	var colName = document.getElementById("colName_"+tableId).value;
	 	cellsMenu.className= "coolMenu" ;
		cellsMenu.style.visibility = "hidden";
	 	
	 	var textHTML = "";
		var isDisable = "" ;
		var state = "" ;
		var hiddenArr = null ;
		var colNameArr = null ;
		
		if(hiddenStr != "") {
			 hiddenArr = hiddenStr.split(",");
		}
		if(colName != "") {
			 colNameArr = colName.split("`");
		}
	 	
		
	 	
	 	for(var i=0;i<tableArr.length;i++) {
	 		
	 		
	 		if(colNameArr[i] == field) {
				isDisable = "disabled=\"true\"" ;
			}else {
				isDisable = "" ;
			}
		if(hiddenStr == "") {
			state = "checked" ;
		}else {
			if(hiddenArr[i] == "hidden") {
				state = "" ;
				/*var colObj = document.getElementById(tableId+"_col"+i) ;
	 			colObj.style.display = "none" ;*/
				hidecol(tableId,(i+1),tableLength,tableArr.length);
			}else {
				state = "checked" ;
			/*	var colObj = document.getElementById(tableId+"_col"+j) ;
	 			colObj.style.display = "" ;*/
				showcol(tableId,(i+1),tableLength,tableArr.length);
			}
		}	
		
		textHTML += "<div nowrap=\"nowrap\" style=\"height:auto\"><input style=\"\" "+isDisable+" class=\"\" type=\"checkbox\" "+state+" id=\""+tableId+"_lab"+i+"\" onclick=\"hideDynamicColumns("+(i+1)+",this.checked,'"+tableId+"',"+tableArr.length+","+tableLength+");\"><label class=\"coolMenuItem\" for=\""+tableId+"_lab"+i+"\" style='padding-top: 1px;color:black;height:auto' onMouseOver=\"this.style.background='#E4E8EF';\" onMouseOut=\"this.style.background='#B0C4DE';\">"+tableArr[i]+"</label><div>";
		}
     	cellsMenu.innerHTML = textHTML;	
	 	}
	 	 }
	 
	 
/*	function hideDynamicColumns(col,nums,tableId,k) {
		 var hiddenStr = "" ;
		for(var i=0;i<nums;i++) {
			if(document.getElementById(tableId+"_lab"+i).checked) {
				hiddenStr += "''"+","; 
			}
			else hiddenStr += "hidden"+"," ;
		}
		hiddenStr = hiddenStr.substring(0,hiddenStr.length-1) ;
	
	document.getElementById("hideColumnsStr_"+tableId).value = hiddenStr ;
	for(var i=col;i<col+k;i++) {
		var colObj = document.getElementById(tableId+"_col"+i) ;
	if( colObj.style.display == "") 
	 colObj.style.display = "none" ;
	else colObj.style.display = "" ;
	}
	}*/
	 	 
	
	 /**
	 * ��ö��ͷ�Ĳ��,����һ������
	 * @param 
	 */ 
	function dynamicHeadGetLevel(str) {
		// һ�����ٲ�
		var iLevel = 1, iTempLevel = 1;
		// (�ͣ���λ�á�iNext����һ��iLeft��λ��
		var iLeft = -1, iRight = -1, iNext = -1;

		/**
		 * ��������
		 */
		while ((iLeft = str.indexOf("{", iRight + 1)) != -1) {
			iRight = str.indexOf("}", iLeft + 1);
			iNext = str.indexOf("{", iLeft);// ������+��
			iTempLevel++;
			while ((iNext = str.indexOf("{", iNext + 1)) != -1
					&& iNext < iRight) {
				iRight = str.indexOf("}", iRight + 1);
				iTempLevel++;
			}
			if (iTempLevel > iLevel) {
				iLevel = iTempLevel;
			}
			iTempLevel = 1;
		}
		return iLevel;
	}
	 	 
	
	/**
	 * ���ض��ͷ�е���
	 * @param 
	 */
    function hideDynamicColumns(colnum,isChecked,tableId,iColLength,iTableLength) {
    	
    	var hiddenStr = "" ;
		for(var i=0;i<iColLength;i++) {
			if(document.getElementById(tableId+"_lab"+i).checked) {
				hiddenStr += "''"+","; 
			}
			else hiddenStr += "hidden"+"," ;
		}
		hiddenStr = hiddenStr.substring(0,hiddenStr.length-1) ;
	
		document.getElementById("hideColumnsStr_"+tableId).value = hiddenStr ;
		
    		if(isChecked) {
    			showcol(tableId,colnum,iTableLength,iColLength) ;
    		}else {
    			hidecol(tableId,colnum,iTableLength,iColLength)
    		}
		}
	


	/**
	 * ���������в˵�
	 * @param 
	 */
function createCellsMenu(tableId,field)
{
	
	var cellsMenu = document.getElementById(tableId+"_cellsMenu") ;
	/* ����������ʽ */
	
	cellsMenu.className= "coolMenu" ;
	cellsMenu.style.visibility = "hidden";
	var hiddenStr = document.getElementById("hideColumnsStr_"+tableId).value;
	var hideColName = document.getElementById("hideColName_"+tableId).value;
	var colName = document.getElementById("colName_"+tableId).value;
	
	var hiddenArr = null ;
	var hideColNameArr = null ;
	var colNameArr = null ;
	var textHTML = "";
	var isDisable = "" ;
	var state = "" ;
	if(hiddenStr != "") {
		 hiddenArr = hiddenStr.split(",");
	}
	 if(hideColName != "") {
		 hideColNameArr = hideColName.split("`");
	}
	 if(colName != "") {
		 colNameArr = colName.split("`");
	}
	for(var i=0;i<hideColNameArr.length;i++){
		
		if(colNameArr[i] == field) {
			isDisable = "disabled=\"true\"" ;
		}else {
			isDisable = "" ;
		}
		if(hiddenStr == "") {
			state = "checked" ;
		}else {
			if(hiddenArr[i] == "hidden") {
				state = "" ;
				document.getElementById(tableId+"_col"+(i+1)).style.display="none";
			
			}else {
				
				state = "checked" ;
				document.getElementById(tableId+"_col"+(i+1)).style.display="";
			}
		}

		if(hideColNameArr[i] == "") {
			textHTML += "<div><input style=\"display:none\" "+isDisable+" class=\"\" type=\"checkbox\" "+state+" id=\""+tableId+"_lab"+i+"\" onclick=\"hideColumns('"+tableId+"_col"+(i+1)+"',"+hideColNameArr.length+",'"+tableId+"');\"><label class=\"coolMenuItem\" for=\""+tableId+"_lab"+i+"\" style='display:none;padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF';\" onMouseOut=\"this.style.background='#B0C4DE';\">"+hideColNameArr[i]+"</label><div>";
		
		}else {
			textHTML += "<div nowrap=\"nowrap\"><input style=\"\" "+isDisable+" class=\"\" type=\"checkbox\" "+state+" id=\""+tableId+"_lab"+i+"\" onclick=\"hideColumns('"+tableId+"_col"+(i+1)+"',"+hideColNameArr.length+",'"+tableId+"');\"><label class=\"coolMenuItem\" for=\""+tableId+"_lab"+i+"\" style='padding-top: 1px;color:black' onMouseOver=\"this.style.background='#E4E8EF';\" onMouseOut=\"this.style.background='#B0C4DE';\">"+hideColNameArr[i]+"</label><div>";
		}
	}
	
     cellsMenu.innerHTML = textHTML;	
}
	

	/**
	 * �в˵�����¼�
	 * @param 
	 */
function columnImgClick(tableId,field,numberCol,tableHead,isOrderBy,fixColNum,isFixedCol)
{
		
 var obj = document.getElementById(tableId+"_objHeadMenu") ;
 createMenu(tableId,field,obj,numberCol,tableHead,isOrderBy,fixColNum,isFixedCol) ;
 var ev = window.event;
 var el = ev.srcElement;
 
  showMenu(ev.clientX, ev.clientY,obj);
  ev.cancelBubble = true;
  ev.returnValue = false;
  var ep = el.parentElement;
  columnRC = ep.cellIndex;

}

	/**
	 * ������
	 * @param 
	 */
function hideColumns(col,nums,tableId) {
	
	
	var hiddenStr = "" ;
	for(var i=0;i<nums;i++) {
		if(document.getElementById(tableId+"_lab"+i).checked) {
			hiddenStr += "''"+","; 
		}
		else hiddenStr += "hidden"+"," ;
	}
	hiddenStr = hiddenStr.substring(0,hiddenStr.length-1) ;
	
	document.getElementById("hideColumnsStr_"+tableId).value = hiddenStr ;
	
	var colObj = document.getElementById(col) ;
	if( colObj.style.display == "") 
	 colObj.style.display = "none" ;
	else colObj.style.display = "" ;
}


	/**
	 * �����ز˵������¼�
	 * @param 
	 */
function mouseMoveDiv(field,tableId,tableHead)
{
	
  if(tableHead != "") {
  	createDynamicCellsMenu(tableId,field,tableHead) ;
  }else {
  	createCellsMenu(tableId,field);
  }
  
	
  var ev = window.event;
  var el = ev.srcElement;
  showHiddenMenu(el.parentElement.offsetLeft+el.offsetWidth,el.offsetTop+el.parentElement.offsetTop,tableId);
  ev.cancelBubble = true;
  ev.returnValue = false;
  var ep = el.parentElement;
  columnRC = ep.cellIndex;
}

	/**
	 * ��ʾ�и��ӹ��ܲ˵�
	 * @param 
	 */
function showHiddenMenu(x, y,tableId)
{
	
	var cellsMenu = document.getElementById(tableId+"_cellsMenu") ;

	cellsMenu.style.left = x;
    cellsMenu.style.top = y ;
    cellsMenu.style.zIndex = 50;
 
 cellsMenu.style.filter = "blendTrans(duration=0.50) progid:DXImageTransform.Microsoft.Shadow(color=#323232, direction=135, strength=3)";
 
 if (cellsMenu.filters.blendTrans.status != 2)
 {
  cellsMenu.filters.blendTrans.apply();
  cellsMenu.style.visibility = "visible";
  cellsMenu.filters.blendTrans.play();
 }
}


function MouseOverColor(obj) {
	old_bg=obj.bgColor;  
  if(old_bg==selectColor) 
  obj.bgColor=selectColor;  
  else 
  obj.bgColor="#E4E8EF";  
}


function hideMenus()
{
//	var hideDivId = document.getElementById("displayTemp").value;
//	document.getElementById(hideDivId).style.display = "none" ;
	
	var tableId = tableIds.split(",") ;
	
	
	for(var i=0;i<tableId.length;i++) {
		
		var objHeadMenu = document.getElementById(tableId[i]+"_objHeadMenu") ;
		
		try {
		hideCellsMenu(tableId[i]);
		
		 objHeadMenu.style.filter = "blendTrans(duration=0.50) progid:DXImageTransform.Microsoft.Shadow(color=#323232, direction=135, strength=3)";
 		if (objHeadMenu.filters.blendTrans.status != 2)
 		{
  			objHeadMenu.filters.blendTrans.apply();
  			objHeadMenu.style.visibility = "hidden";
  			objHeadMenu.filters.blendTrans.play();
 		}		
	}catch(e){}
	}
	
}


function hideMenu(tableId)
{

		var objHeadMenu = document.getElementById(tableId+"_objHeadMenu") ;
		try {
		hideCellsMenu(tableId);
		}catch(e){}
	
		 objHeadMenu.style.filter = "blendTrans(duration=0.50) progid:DXImageTransform.Microsoft.Shadow(color=#323232, direction=135, strength=3)";
 		if (objHeadMenu.filters.blendTrans.status != 2)
 		{
  			objHeadMenu.filters.blendTrans.apply();
  			objHeadMenu.style.visibility = "hidden";
  			objHeadMenu.filters.blendTrans.play();
 		}		
}

function hideCellsMenu(tableId)
{
/* cellsMenu.style.filter = "blendTrans(duration=0.50) progid:DXImageTransform.Microsoft.Shadow(color=#323232, direction=135, strength=3)";
 if (cellsMenu.filters.blendTrans.status != 2)
 {
  cellsMenu.filters.blendTrans.apply();*/
	var cellsMenu = document.getElementById(tableId+"_cellsMenu") ;
    cellsMenu.style.visibility = "hidden";
/*  cellsMenu.filters.blendTrans.play();
 }*/
}

function showMenu(x, y,obj)
{
	try {
		hideCellsMenu() ;
	}catch(e){}
    var intRightEdge = window.document.body.clientWidth - x;
    var intBottomEdge = window.document.body.clientHeight - y;
    var intScrollLeft = window.document.body.scrollLeft + x;
    var intScrollTop = window.document.body.scrollTop + y;

    if (intRightEdge < obj.offsetWidth)
        obj.style.left = intScrollLeft - obj.offsetWidth;
    else
        obj.style.left = intScrollLeft;

    if (intBottomEdge < obj.offsetHeight)
        obj.style.top = intScrollTop - obj.offsetHeight;
    else
        obj.style.top = intScrollTop;

    obj.style.zIndex = 50;
 
 obj.style.filter = "blendTrans(duration=0.50) progid:DXImageTransform.Microsoft.Shadow(color=#323232, direction=135, strength=3)";
 
 if (obj.filters.blendTrans.status != 2)
 {
  obj.filters.blendTrans.apply();
  obj.style.visibility = "visible";
  obj.filters.blendTrans.play();
 }
}


//������ͷ���ӹ��ܲ˵�
/*function columnImgClick(tableId,field)
{
	 var ev = window.event;
	var el = ev.srcElement;
	var colHeadMenu = document.createElement("div");
	colHeadMenu.id = "colHeadMenu" ;

	try {
		hideCellsMenu() ;
	}catch(e){}
	
	var intRightEdge = window.document.body.clientWidth - ev.clientX;
    var intBottomEdge = window.document.body.clientHeight - ev.clientY;
    var intScrollLeft = window.document.body.scrollLeft + ev.clientX;
    var intScrollTop = window.document.body.scrollTop +  ev.clientY;

    if (intRightEdge < colHeadMenu.offsetWidth)
        colHeadMenu.style.left = intScrollLeft - colHeadMenu.offsetWidth;
    else
        colHeadMenu.style.left = intScrollLeft;

    if (intBottomEdge < colHeadMenu.offsetHeight)
        colHeadMenu.style.top = intScrollTop - colHeadMenu.offsetHeight;
    else
        colHeadMenu.style.top = intScrollTop;

	colHeadMenu.style.position = "absolute";
	colHeadMenu.style.width = "90px";
	colHeadMenu.style.height = "13px";
	colHeadMenu.style.visibility = "hidden" ;
	colHeadMenu.className = "coolMenu";
	colHeadMenu.style.zIndex = 50;
	
  var txtHTML = "<div  class=\"coolMenuItem\" style='padding-top: 1px;' onMouseOver=\"this.style.background='#E4E8EF'\"    onMouseOut=\"this.style.background='#B0C4DE'\" onclick=\"addOrderby_CH_"+tableId+"('"+field+"','ASC');\">��׷������</div>";
  txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;' onMouseOver=\"this.style.background='#E4E8EF'\"    onMouseOut=\"this.style.background='#B0C4DE'\" onclick=\"addOrderby_CH_"+tableId+"('"+field+"','DESC');\">��׷�ӽ���</div>";
  txtHTML +="<div class=\"coolMenuDivider\"></div>";
  txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;' onMouseOver=\"mouseMoveDiv('"+field+"');this.style.background='#E4E8EF'\" onMouseOut=\"hideCellsMenu();this.style.background='#B0C4DE'\" onclick=\"mouseMoveDiv('"+field+"');\" >&nbsp;&nbsp;������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�� </div>";
  txtHTML += "<div class=\"coolMenuDivider\"></div>";
  txtHTML += "<div class=\"coolMenuItem\" style='padding-top: 1px;' onMouseOver=\"this.style.background='#E4E8EF'\" onMouseOut=\"this.style.background='#B0C4DE'\" onClick=\"createPromptDiv('"+tableId+"PromptDiv','�ؼ���','"+tableId+"','"+field+"');createShieldDiv()\" onMouseOver=\"\">&nbsp;&nbsp;�ؼ���</div>";

     colHeadMenu.innerHTML = txtHTML;
	  document.body.appendChild(colHeadMenu);
	 colHeadMenu.style.filter = "blendTrans(duration=0.50) progid:DXImageTransform.Microsoft.Shadow(color=#323232, direction=135, strength=3)";
 if (colHeadMenu.filters.blendTrans.status != 2)
 {
  colHeadMenu.filters.blendTrans.apply();
  colHeadMenu.style.visibility = "visible";
  colHeadMenu.filters.blendTrans.play();
}
  ev.cancelBubble = true;
  ev.returnValue = false;
  var ep = el.parentElement;
  columnRC = ep.cellIndex;
}*/


// ������ʾ���ڲ�
function createPromptDiv(id, desc,tableId,field) {
	
	try {
	hideMenu(tableId) ;
	hideCellsMenu(tableId);
	}catch(e){}
	//��ȡDIV����ʾ���
	var ev = window.event;
 	var el = ev.srcElement;
	
	var promptDiv = document.createElement("div");
	promptDiv.id = id;
	/* ����������ʽ */
	promptDiv.style.position = "absolute";
	promptDiv.style.left = el.parentElement.offsetLeft ;
	promptDiv.style.top = el.parentElement.offsetTop ;
	promptDiv.style.width = "150px";
	promptDiv.style.height = "80px";
	promptDiv.style.border = "1px solid #006600";
	promptDiv.style.background = "#B0C4DE";

	/* ������������ */
	promptDiv.innerHTML = "<div style='width:100px;height:10px;background:#B0C4DE;font-family: ����;font-size:12px;margin:5px 10px 5px 10px;'>"
			+ desc + "</div>";
	promptDiv.innerHTML += "<div align='center' style='width:150px;height:30px;background:#B0C4DE'><input type='text' id=\""+tableId+"_promptInput\" onkeydown=\"if(event.keyCode==13) keyWordFilter('"+tableId+"_promptInput','"+id+"','"+field+"','"+tableId+"');\" name='promptInput' style='width:94%;height:20px'></div>";
	promptDiv.innerHTML += "<div align='center' style='width:100px;height:10px;background:#B0C4DE'><input type='button' class=\"flyBT\" value='ȷ��' onclick=\"keyWordFilter('"+tableId+"_promptInput','"+id+"','"+field+"','"+tableId+"');\">&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' class=\"flyBT\" value='ȡ��' onclick='removeShieldDiv(\""+id+"\");'></div>";
	promptDiv.style.zIndex = 3;
	
	document.body.appendChild(promptDiv);
	document.getElementById(tableId+"_promptInput").focus();
}


// ������ʾ���ڲ�
function createNumDiv(id, desc,tableId,field) {
	
	try {
	hideMenu(tableId) ;
	hideCellsMenu(tableId);
	}catch(e){}
	//��ȡDIV����ʾ���
	var ev = window.event;
 	var el = ev.srcElement;
	
	var numDiv = document.createElement("div");
	numDiv.id = id;
	/* ����������ʽ */
	numDiv.style.position = "absolute";
	numDiv.style.left = el.parentElement.offsetLeft ;
	numDiv.style.top = el.parentElement.offsetTop ;
	numDiv.style.width = "200px";
	numDiv.style.height = "80px";
	numDiv.style.border = "1px solid #006600";
	numDiv.style.background = "#B0C4DE";
	
	

	/* ������������ */
	numDiv.innerHTML = "<div style='width:100px;height:10px;background:#B0C4DE;font-family: ����;font-size:12px;margin:5px 10px 5px 10px;'>"
			+ desc + "</div>";
	numDiv.innerHTML += "<div align='center' style='width:200px;height:30px;background:#B0C4DE'>" +
			"<input type='text' id=\""+tableId+"_numberInput1\" onkeydown=\"if(event.keyCode==13) numberFilter('"+tableId+"_numberInput1','"+id+"','"+field+"','"+tableId+"');\" name='_numberInput1' style='width:45%;height:20px'>--" +
			"<input type='text' id=\""+tableId+"_numberInput2\" onkeydown=\"if(event.keyCode==13) numberFilter('"+tableId+"_numberInput1','"+id+"','"+field+"','"+tableId+"');\" name='_numberInput2' style='width:45%;height:20px'>" +
			"</div>";
	numDiv.innerHTML += "<div align='center' style='width:100px;height:10px;background:#B0C4DE'><input type='button' class=\"flyBT\" value='ȷ��' onclick=\"numberFilter('"+tableId+"_numberInput1','"+id+"','"+field+"','"+tableId+"');\">&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' class=\"flyBT\" value='ȡ��' onclick='removeShieldDiv(\""+id+"\");'></div>";
	numDiv.style.zIndex = 3;
	
	
	document.body.appendChild(numDiv);
	document.getElementById(tableId+"_numberInput1").focus();
}



	/*	out.println("function onColumnsConfirm(keyWordInput,id,field) {");
		out.println("		var keyWord = document.getElementById(keyWordInput).value ;");
		out.println("		keyWord = field+\"@\"+keyWord");
				
		out.println("changeGrid_CH_"+pp.getTableID()+"_1('sqlWhereColumns',keyWord);");
				
	 	out.println("removeShieldDiv(id);");
				
		out.println("}");*/	


function keyWordFilter(keyWordInput,id,field,tableId) {
	
	var keyWord = document.getElementById(keyWordInput).value ;
	keyWord = field+"`"+keyWord ;
	eval("changeGrid_CH_"+tableId+"('sqlWhereColumns',keyWord);");
	removeShieldDiv(id);
	
}

function cancelFilter(tableId) {
	
  eval("changeGrid_CH_"+tableId+"('cancelFilter','');");
	
}

function numberFilter(keyWordInput,id,field,tableId) {
	var num1 = document.getElementById(tableId+"_numberInput1").value ;
	var num2 = document.getElementById(tableId+"_numberInput2").value ;
	
	if(num1 == "" || num2 == "") {
		alert("����Ϊ��!!");
		return ;
	}
	
	
	var patten = /^(-?\d+)(\.\d+)?$/; 
	if(!patten.exec(num1) || !patten.exec(num2)) {
		alert("���ֻ��Ϊ����!") ;
		return ;
	}

	keyWord = field+"`"+num1+"`"+num2 ;
	eval("changeGrid_CH_"+tableId+"('sqlWhereNumColumns',keyWord);");
	removeShieldDiv(id);
	
}



//�����qβ�
function createShieldDiv(){
var shieldDiv = document.createElement("div");
shieldDiv.id = "shieldDivId";

/*����������ʽ*/
shieldDiv.style.position = "absolute";
shieldDiv.style.left = "0px";
shieldDiv.style.top = "0px";
shieldDiv.style.width = document.body.offsetWidth>window.screen.width?document.body.offsetWidth:window.screen.width;
shieldDiv.style.height = Math.max(document.body.offsetHeight, window.screen.height);
//alert(document.body.clientHeight);
//alert(document.body.offsetHeight);
//alert(document.body.scrollHeight);

shieldDiv.style.background = "#EAEAEA";
shieldDiv.style.filter = "Alpha(opacity=\"50\")";
shieldDiv.style.zIndex = 2;


//����һ��iframe��,���ڵ�סҳ���Ͽ��ܳ��ֵ�SELECT��
/*var shielFrame = document.createElement("iframe") ;
shielFrame.style.position = "absolute";
shielFrame.style.left = "0px";
shielFrame.style.top = "0px";
shielFrame.style.width = document.body.offsetWidth>window.screen.width?document.body.offsetWidth:window.screen.width;
shielFrame.style.height = document.body.offsetHeight>window.screen.height?document.body.offsetHeight:window.screen.height;
shielFrame.style.background = "#EAEAEA";
shielFrame.style.scrolling="no" ;
shielFrame.style.filter = "Alpha(opacity=\"50\")";
shielFrame.style.zIndex = -1;
shielFrame.frameborder = "0" ;

����������ʽ
document.body.appendChild(shielFrame);*/
document.body.appendChild(shieldDiv);
return shieldDiv;
}

function removeShieldDiv(id) {
	var shieldDiv = document.getElementById("shieldDivId") ;
	shieldDiv.parentNode.removeChild(shieldDiv); //shieldDiv.removeNode(true) ;
	var promptDiv = document.getElementById(id);
	promptDiv.parentNode.removeChild(promptDiv); // promptDiv.removeNode(true) ;
}


function fixCol(col,tableId) { 
   var fixedColObj = document.getElementById("fixColNum_"+tableId);
   if(col == -1){
      var fixedColNum = fixedColObj.value ;                                
     	   if(fixedColNum > 0)       {                               
     		 col = Number(fixedColNum);    }                                 
     		 else{ return ;               }                                 
      }                                                                    
	var rows = document.getElementById(tableId).rows; 
	for(var i=0; i < rows.length; i++) { 									
		//����������,�ͽ��й̶� 												
		if(rows[i].dataRow) {												
			var cells = rows[i].cells;										
			for(var j=0; j < cells.length; j++) {							
				//����ǵ�ǰ�����ǰ����� 										
				if(j <= col) { 												
					//����Ϊ�̶��� 											
					cells[j].className = "fixedCol"; 						
				} else { 													
					cells[j].className = ""; 								
				} //end else~if												
			} //end for 													
		} //end if 															
	} //end for 															
	fixedColObj.value = col ;     						                
} //end function 


function fixedDynamicCol(tableid,col,tableHead) { 
	
	col = Number(col);
	
	var fixedColObj = document.getElementById("fixColNum_"+tableid) ;
//	alert(fixedColObj.value);

	if(col == -1) {
		
		var fixedColNum = fixedColObj.value ;
		if(fixedColNum > 0) {
			col = Number(fixedColNum) ;
		}else {
			return ;
		}

	}
	
	
	var k = getFixedArr(tableHead);
	
	col = k[col-1] ;
	

	
    var otable = document.getElementById(tableid);

	var rows = otable.rows ;
	var iTableLength = otable.rows.length ;
	var tableArr = tableHead.split(",");
	var iColLength = tableArr.length ;
	var a = showrelation(tableid,iTableLength,iColLength) ;
	for(var i=0;i<a.length;i++) {

		var cells = rows[i].cells ;
		
		for(var j=0;j<a[i].length;j++) {
			if(j<col) {
				a[i][j].cell.className = "fixedCol" ;
			}else {
				a[i][j].cell.className = "" ;
			}
		}
	}
	
	fixedColObj.value = col ;

}

/*
 * 
 * ���TABLEHEAD�������������
 */

function getFixedArr(tableHead) {
	
	if( tableHead != "") {

	 //���½����ӱ�ͷ�ַ�
	 //K�����ӱ�ͷ�ĸ���
	 var tableArr = tableHead.split(",");
     var fixedArr = new Array(tableArr.length) ;
	
     for(var i=0;i<tableArr.length;i++) {
		if(tableArr[i].indexOf("{") >-1) {
			for(var j=i+1;j<tableArr.length;j++){
				if(tableArr[j].indexOf("}") >-1) {
					fixedArr[i] = (j+1);
					fixedArr[j] = (j+1);
					break ;
				}
			}
			for(var k=i+1;k<j;k++) {
				fixedArr[k] = j+1 ;
			}
			i = j ;
		}else {
			fixedArr[i] = i+1 ;
		}
	}
	
	return fixedArr ;
}
}

function hidecol(tableid,colnum,iTableLength,iColLength){
	

	var oTable = document.getElementById(tableid) ;
	var colObject=document.getElementById(tableid+"_col"+colnum);
	if (colObject==null){	
		return;
	}
	if (colObject.style.display == "none"){
		return;
	}
	
	var trObj=null,cell=null;
	var a=showrelation(tableid,iTableLength,iColLength);
	var colstart=-1;

	colstart= a[iTableLength-1][Number(colnum)-1].colstart;

	for (i=iTableLength-2; i >= 0; i--) {
		
		cell=a[i][Number(colnum)-1].cell;
		if (i>0 && a[i-1][Number(colnum)-1].cell == cell){
			cell=null;
		}else{
			//alert("colstart="+colstart+"|a[i][Number(colnum)-1].colstart="+a[i][Number(colnum)-1].colstart);
			if ( colstart != a[i][Number(colnum)-1].colstart){
				//������ζ��colspanҪ��1
				var p=getColSpan(cell);
				if ( p>1){
					setColSpan(cell,p-1);
				}
				cell=null;
			}
		}
	
		if (cell){
			trObj=oTable.rows(i);

			if ( getColSpan(cell)>1){
				//�Ƚ��鷳��Ҫ���䵥Ԫ���ȥ
				var mycolSpan=getColSpan(cell);
				if (mycolSpan>1){
					getRealColSpan(cell);
					cell.colSpan =1;
					setColSpan(cell,1);
	
					var objTd=null;
					objTd=trObj.insertCell(cell.cellIndex+1);
					objTd.setAttribute("isInsert",true);
			
					objTd.colSpan=mycolSpan-1;
					setColSpan(objTd,mycolSpan-1);

					objTd.rowSpan=cell.rowSpan;
					objTd.innerHTML=cell.innerHTML;
					objTd.align = "center" ;

					//��Ϊ��������п����Ѿ��������ˣ����Ա��벹һЩ��
					for(j=Number(colnum)+1;j<iColLength;j++){
						if (document.getElementById(tableid+"_col"+j).style.display=="none"){
							objTd=trObj.insertCell(cell.cellIndex+1);
							objTd.setAttribute("isInsert",true);
						}else{
							break;
						}
					}

				}
			}
			
		}
	}

	//���ذ�
	colObject.style.display = "none" ;

}

function getRealColSpan(cell){
	var p=1;
	if (cell){
		if (cell.RealColSpan){
			p=cell.RealColSpan;
		}else{
			p=cell.colSpan;
			setRealColSpan(cell);
		}
	}
	return p;
}
function setRealColSpan(cell){
	if (cell)
		cell.RealColSpan=cell.colSpan;
	
}

function getColSpan(cell){
	var p=1;
	if (cell){
		if (cell.myColSpan){
			p=cell.myColSpan;
		}else{
			p=cell.colSpan;
			setColSpan(cell);
		}
	}
	return p;
}

function setColSpan(cell,p){
	if (cell)
		cell.myColSpan=p;
	
}

//��ʾָ������
function showcol(tableid,colnum,iTableLength,iColLength){
	
	var oTable = document.getElementById(tableid) ;
	
	var colObject=document.getElementById(tableid+"_col"+colnum);
	if (colObject==null){	
		return;
	}
	if (colObject.style.display == ""){
		return;
	}
		
	var trObj=null,cell=null;

	var a=showrelation(tableid,iTableLength,iColLength);

	var colstart=-1;
	colstart= a[iTableLength-1][Number(colnum)-1].colstart;

	for (i=iTableLength-2; i >= 0; i--) {
		
		cell=a[i][Number(colnum)-1].cell;
		if (i>0 && a[i-1][Number(colnum)-1].cell == cell){
			cell=null;
		}else{
			//alert('������ͷ���ϼ�,ʲô��������');
			//������ͷ���ϼ�,ʲô��������
			//alert("i="+i+"|colstart="+colstart+"|a[i][Number(colnum)-1].colstart="+a[i][Number(colnum)-1].colstart);
			if ( colstart != a[i][Number(colnum)-1].colstart){
				//alert("������ͷ���ϼ�:i="+i);
				//��ʾ��ζ��colspanҪ��1
				var p=getColSpan(cell);
				if (p==1){
					setColSpan(cell,p+1);
				}
				cell=null;
			}
		}
		
		if (cell){
			trObj=oTable.rows(i);
			var isInsert = cell.getAttribute("isInsert");
			
			//alert("����ͷ���ϼ���i="+i+"|isInsert="+isInsert);

			if(isInsert) {

				//alert('�����ǲ������ͷ���ϼ�');
				//�����ǲ����
				//
				//���������ʾ��(��ֹ��ԭװ),�������ʾ��,���Լ��ɵ�,��ʾ���Ǹ����+1;
				//������û����ʾ,���ұ���,�ҵ�����ʾ��,���ұ߸ɵ�,�Լ�+�ұߵ�colspn;
				//������Ҷ�û��,ֱ����ʾ;
				var bLeftFound=false,leftcell=null,bRightFound=false,rightcell=null;
				for (var j=Number(colnum)-1;j>=colstart;j--){
					if(document.getElementById(tableid+"_col"+j).style.display=="") {
						//����ʾ��
						bLeftFound=true;
						leftcell=a[i][j-1].cell;
						break;
					}
				}
				if (bLeftFound){
					//���������ʾ��(��ֹ��ԭװ),�������ʾ��,���Լ��ɵ�,��ʾ���Ǹ����+1;
					leftcell.colSpan=getColSpan(leftcell)+1;
					setColSpan(leftcell,leftcell.colSpan);
					trObj.deleteCell(cell.cellIndex);
				}else{
					//������û����ʾ,���ұ���,�ҵ�����ʾ��,���ұ߸ɵ�,�Լ�+�ұߵ�colspn;
					for (var j=Number(colnum)+1;j<=iColLength;j++){
						/*
						alert("j="+j+"|a[i][j-1].cell.innerHTML="+a[i][j-1].cell.innerHTML
							+"|a[i][j-1].cell.isInsert="+a[i][j-1].cell.isInsert);
						*/
						if (!a[i][j-1].cell.isInsert){
							//������Լ���ľ��˳�
							break;
						}
						if(document.getElementById(tableid+"_col"+j).style.display=="" ) {
							//����ʾ��
							bRightFound=true;
							rightcell=a[i][j-1].cell;

							//alert(rightcell.innerHTML);
							break;
						}
					}
					if (bRightFound){
						//alert("���ұ߸ɵ�,�Լ�+�ұߵ�colspn;");
						//���ұ߸ɵ�,�Լ�+�ұߵ�colspn;
						cell.colSpan=getColSpan(cell)+getColSpan(rightcell);
						setColSpan(cell,cell.colSpan);
						trObj.deleteCell(rightcell.cellIndex);
					}
				}
			}else {
				//ԭװ
				//

				//alert('��ԭװ');

				var iMyInsertColCount=0,precell=null,iColSpan=0;
				precell=cell;
				for (var j=Number(colnum);j<iColLength;j++){
				//	alert("j="+j+"|a[i][j].cell="+a[i][j].cell.innerHTML+"|.isInsert"+a[i][j].cell.isInsert);
					if (!a[i][j].cell.isInsert) {
						break;
					}else{
						if (precell != a[i][j].cell){
							iMyInsertColCount++;
							precell=a[i][j].cell;
						}
						//alert("iColSpan="+iColSpan);
						iColSpan++;
					}
				}
				//alert("iMyInsertColCount="+iMyInsertColCount+"|iColSpan="+iColSpan);
				
				for (var j=0;j<iMyInsertColCount;j++){
					//alert("ɾ��"+trObj.cells[cell.cellIndex+1].innerHTML);
					trObj.deleteCell(cell.cellIndex+1) ;
				}
				if (cell.colSpan==1){
					cell.colSpan=1+iColSpan;
					setColSpan(cell,1+iColSpan);
				}

			}
		}
		colObject.style.display= "" ;
	}
}


//�����cell�����array
function showrelation(tableid,iTableLength,iColLength){
	var a = new Array(iTableLength),b=new Array(iTableLength);
	for(var i=0;i<iTableLength;i++){
		a[i]=new Array(iColLength);
		b[i]=0;
	}

	var otable = document.getElementById(tableid);
	for(var i=0;i<iTableLength;i++) {
		for(var j=0;j<otable.rows(i).cells.length;j++) {
				
			var tdObj = otable.rows(i).cells(j) ;
			
			var lStartCol=-1;
			for(var m=0;m<tdObj.rowSpan;m++){
				lStartCol=b[i+m]+1;
				
				for(var n=0;n<getColSpan(tdObj);n++){
					/*
					if (mydebug && mydebug.value=="1"){
						alert("i="+i+"|j="+j+"|m="+m+"|n="+n
							+"|tdObj.rowSpan="+tdObj.rowSpan+"|tdObj.colSpan="+tdObj.colSpan
							+"|b[0]="+b[0]+"|b[1]="+b[1]+"|b[2]="+b[2]+"|tdObj.value="+tdObj

							+"\n"
							+"|a[0][0]="+a[0][0].cell+"|a[0][1]="+a[0][1].cell
							+"|a[0][2]="+a[0][2].cell+"|a[0][3]="+a[0][3].cell
							+"|a[0][4]="+a[0][4].cell+"|a[0][5]="+a[0][5].cell
							+"|a[0][6]="+a[0][6].cell+"|a[0][7]="+a[0][7].cell
							
							+"\n"
							+"|a[1][0]="+a[1][0].cell+"|a[1][1]="+a[1][1].cell
							+"|a[1][2]="+a[1][2].cell+"|a[1][3]="+a[1][3].cell
							+"|a[1][4]="+a[1][4].cell+"|a[1][5]="+a[1][5].cell
							+"|a[1][6]="+a[1][6].cell+"|a[1][7]="+a[1][7].cell

							+"\n"
							+"|a[2][0]="+a[2][0].cell+"|a[2][1]="+a[2][1].cell
							+"|a[2][2]="+a[2][2].cell+"|a[2][3]="+a[2][3].cell
							+"|a[2][4]="+a[2][4].cell+"|a[2][5]="+a[2][5].cell
							+"|a[2][6]="+a[2][6].cell+"|a[2][7]="+a[2][7].cell
							

						);
					}
					*/
					a[i+m][b[i+m]]=	{value:tdObj.innerHTML,cell:tdObj,colstart:lStartCol};
					b[i+m]=b[i+m]+1;
				}	
				if (getColSpan(tdObj)<tdObj.colSpan){
					var myInsertCount=0,mylastcell=null,mylastcolstart=-1;
					for (var n=j+1;n<otable.rows(i).cells.length;n++){
						if (otable.rows(i).cells(n).isInsert){
							myInsertCount++;
							//����׷��
							mylastcell=otable.rows(i).cells(n);
							mylastcolstart=b[i+m];
							a[i+m][b[i+m]]=	{value:tdObj.innerHTML,cell:mylastcell,colstart:mylastcolstart};
							b[i+m]=b[i+m]+1;								
							
							j++;
						}else{
							break;
						}
					}
					if (mylastcell==null){
						mylastcell=tdObj;
						mylastcolstart=lStartCol;
					}
					/*
					if (mydebug && mydebug.value=="1"){
						alert("�ж�:getColSpan(tdObj)+myInsertCount="+ (getColSpan(tdObj)+myInsertCount)
							+"|tdObj.colSpan="+tdObj.colSpan+"|realColspan"+getRealColSpan(tdObj));
					}*/
					for (var n=getColSpan(tdObj)+myInsertCount;n<getRealColSpan(tdObj);n++){
					/*	if (mydebug && mydebug.value=="1"){
							alert("����:n="+n+"|b[i+m]="+b[i+m]+"|value="+mylastcell.innerHTML);
						}*/
						a[i+m][b[i+m]]=	{value:mylastcell.innerHTML,cell:mylastcell,colstart:mylastcolstart};
						b[i+m]=b[i+m]+1;
					}
				}
			}
		}
	}
	return a;
}







