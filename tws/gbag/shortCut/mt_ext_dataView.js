Ext.namespace("Ext.matech");

var DEFAULT_TREE_URL =MATECH_SYSTEM_WEB_ROOT+ "tws/gbag/shortCut/";

Ext.matech.DataView = Ext.extend(Ext.DataView,{
    id: 'watchs',
    itemSelector: 'li.watch',
    overClass   : 'watch-hover',
    singleSelect: true,
    multiSelect : true,
    autoScroll  : true,
    imgHeight:110,
	imgWidth:110,
	inHeight:80,
	inWidth:80,
	
    onclick:'',
	//初始化
	initComponent : function() {
		var self=this;
		
		Ext.matech.DataView.superclass.initComponent.call(self); 
		
	   var store = new Ext.data.JsonStore({
		     url:DEFAULT_TREE_URL+self.autoid,
		     autoLoad:true,     
	         remoteSort: true,
	         fields:self.fields,
			 baseParams : {
					autoid : self.autoid,
					treeGrid:'true',
					multilevel:'true',
					refer:self.refer,//$2
					refer1:self.refer1,//$3
					refer2:self.refer2//$4					
				}
			});
	   
        var tpl=new Ext.XTemplate(
                '<ul>',
                    '<tpl for=".">',
                        '<li class="watch" style="height: '+self.imgHeight+'px;width: '+self.imgWidth+'px;">',
                            '<div id="'+self.imgid+'"></div>',
                            '<a href="#" onclick="'+self.onclick.replaceAll("{","\'{").replaceAll("}","}\'")+';"><img width="'+self.inWidth+'" height="'+self.inHeight+'" src="'+self.imgsrc+'" /></a>',
                            '<strong>'+self.imgtitle+'</strong>',
                        '</li>',
                    '</tpl>',
                '</ul>'
            );
            
        self.mode = 'remote' ;
		self.store=store;
		self.tpl=tpl;
		
	}
});