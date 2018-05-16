﻿Ext.namespace("Ext.matech.form");  
Ext.matech.form.chartDialog = Ext.extend(Ext.Window , {
	
	id:'matech_chart_window',
	title: '图形设置属性',
	width: 650,
	height:400,  
    closeAction:'hide',
    contentEl:'chartAttr',
    element:null,
    chartArr:null,
    listeners:{
		'hide':{fn: function () {
			 document.getElementById("chartAttr").style.display = "none";
		}}
	},
    layout:'fit',
    modal:true,
    autoScroll:true,
    buttons:[{
        text:'确定',
      	handler:function() {
      		var win = Ext.getCmp("matech_chart_window") ;
      		var serialHtml = win.serialize();
      		var element = win.getElement() ;
      		if(element) {
      			//修改
      			var newElement = CKEDITOR.dom.element.createFromHtml(serialHtml);
      			element.setAttribute('matech_ext',newElement.getAttribute("matech_ext")) ;
      			element.setAttribute('size',newElement.getAttribute("size")) ;
      			element.setAttribute('value',newElement.getAttribute("value")) ;
      		}else {
      			win.editor.insertHtml(serialHtml) ;
      		}  
      		
      		win.hide();
      	}
    },{
        text:'取消',
        handler:function(e){
        	var win = Ext.getCmp("matech_chart_window") ;
        	win.hide();
        }
    }],
    
    show:function(){
    	document.getElementById("chartAttr").style.display = "";
    	Ext.matech.form.chartDialog.superclass.show.call(this) ;
    },
    
    setElement:function(element){
    	this.element = element ;
    },
    
    getElement:function(){
    	return this.element ;
    },
    
    serialize:function(){
    	
    	var tag = "matech_ext=" ;
    	var val = "" ;
    	var attribute = "" ;
    	
    	Ext.each(mt_formDesign_chartArr,function(record){
    		var input = record.get("name") || record.get("key") ;
    		var value = Ext.get(input).dom.value ;
    		
    		if(value) {
    			if(input == "ext_name") {
        			val += "ext_id=" + value + ";" ;
        			val += input + "=" + value +";" ;
        		}else if(input == "ext_default") {
        			attribute += " value='" + value + "'" ;
        			val += input + "=" + value +";" ;
        		}else if(input == "ext_other") {
        			val += value ;
        		}else {
        			//通用处理
        			val += input + "=" + value +";" ;
        		}
    		}
    		
    		
    		//加在外面的特殊属性
    	});
    	
    	var inputHtml = "<input value='{图表控件}' " + attribute + tag + "'ext_type=chart;" + val + "ext_end" + "'" + " />" ;
    
    	return inputHtml ;
    },
    parse:function (attr) {
    	if(attr) {
    		var attrArr = attr.split(";") ;
    		var otherArribute = "" ;
    		for(var k=0;k<attrArr.length;k++) {
    			var keyValue = attrArr[k].split("=") ;
    			var key = keyValue[0] ;
    			var value = keyValue[1] ;
    			if(value) {
    				var isMatch = false ; //是否与已有属性匹配，
    				Ext.each(mt_formDesign_chartArr,function(record){
    					//alert(key + " " + input + " "+ (key == input) + " " + value) ;
    					var input = record.get("name") || record.get("key") ;
    		    		if(key == input) {
    		    			var inputCmp = Ext.getCmp(input) ;
    		    			if(inputCmp) {
    		    				inputCmp.setRealValue(value) ;
    		    			}else {
    		    				Ext.get(input).dom.value = value ;
    		    			}
    		    			isMatch = true ;
    		    		}
    		    	});
    				
    				if(!isMatch && key != "ext_id")
    					otherArribute += attrArr[k] + ";" ;
    			}
    		}
    		
    		Ext.get("ext_other").dom.value = otherArribute ; //其它属性是写死的
    	}
    },
    clear:function(){
    	
    	Ext.each(mt_formDesign_chartArr,function(record){
    		var autoid = record.get("autoid") ;
    		var name = record.get("name") || record.get("key") ;
    		
    		if(autoid) {
    			Ext.getCmp(name).clear();
    		}else {
    			Ext.getDom(name).value = "" ; 
    		}
    	});
    
    	this.setElement(null) ;
    }
}
);
Ext.reg('chartDialog',Ext.matech.form.chartDialog);



