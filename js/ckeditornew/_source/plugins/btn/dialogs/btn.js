Ext.namespace("Ext.matech.form");  
Ext.matech.form.btnDialog = Ext.extend(Ext.Window , {
	
	id:'matech_btn_window',
	title: '按钮属性',
	width: 500,
	height:300,  
    closeAction:'hide',
    contentEl:'btnAttr',
    element:null,
    btnArr:null,
    listeners:{
		'hide':{fn: function () {
			 document.getElementById("btnAttr").style.display = "none";
		}}
	},
    layout:'fit',
    modal:true,
    autoScroll:true,
    buttons:[{
        text:'确定',
      	handler:function() {
      	
      		var win = Ext.getCmp("matech_btn_window") ;
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
        	var win = Ext.getCmp("matech_btn_window") ;
        	win.hide();
        }
    }],
    
    show:function(){
    	document.getElementById("btnAttr").style.display = "";
    	Ext.matech.form.btnDialog.superclass.show.call(this) ;
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
    	
    	Ext.each(mt_formDesign_btnArr,function(record){
    		var input = record.get("name") || record.get("key") ;    
    		var key = record.get("key") ;		
    		var value = Ext.get(input).dom.value ;
    		
    		if(value) {
    			if(key == "ext_field") {
        			val += "ext_id=" + value + ";ext_name=" + value + ";" ;
        			val += key + "=" + value +";" ;
        			attribute += " id='" + value + "' " ;
        		}else if(key == "ext_value") {
        			attribute += " value='" + value + "'" ;
        			val += key + "=" + value +";" ;
        		}else if(key == "ext_other") {
        			val += value ;
        		}else {
        			//通用处理
        			val += key + "=" + value +";" ;
        		}
    		}
    		
    		
    		//加在外面的特殊属性
    	});
    	
    	var inputHtml = "<input type=button " + attribute + " " + tag + "'ext_type=btn;" + val + "ext_end" + "'" + " />" ;
    
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
    				Ext.each(mt_formDesign_btnArr,function(record){
    					var key1 = record.get("key"); 
    					var input = record.get("name") || record.get("key") ;
    					//alert(key + " " + input + " "+ (key == input) + " " + value) ;
    		    		if(key == key1) {
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
    	
    	Ext.each(mt_formDesign_btnArr,function(record){
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
Ext.reg('btnDialog',Ext.matech.form.btnDialog);



