Ext.namespace("Ext.matech.chart");
var TEMP_SYSTEM_WEB_ROOT=MATECH_SYSTEM_WEB_ROOT;

function matech_chart_topPage(obj){
	Ext.getCmp(obj).topPage();
};
function matech_chart_previousPage(obj){
	Ext.getCmp(obj).previousPage();
};
function matech_chart_nextPage(obj){
	Ext.getCmp(obj).nextPage();
};
function matech_chart_bottomPage(obj){
	Ext.getCmp(obj).bottomPage();
};
function matech_chart_allPage(obj){
	Ext.getCmp(obj).allPage();
};
Ext.matech.chart.Panel = Ext.extend(Ext.Panel,{
	id:'fusionCharts',
	dataJson:null,
	data:null,
	dataURL:TEMP_SYSTEM_WEB_ROOT+"/fusionchart.do?method=getChartsXML",
	dataXML:null,
	handler:null,
	autoId:null,
	dataRequest:'',
	fusionCharts:null,
	contentEl:'chart_panel_div',
	cWidth:Ext.getBody().getWidth(),
	cHeight:Ext.getBody().getHeight()-20,
	autoSize:true,
	renderto:null,
	renderDiv:'chart_panel_object_div',
	chartsType:null,
	categoryType:'m',
	curPage:1,
	pageCount:8,
	totalPage:1,
	totalCount:null,
	isAllPage:0,
	
	setDataXML:function(_dataXML){
		this.dataXML=_dataXML;
	},
	setCWidth:function(_cWidth){
		this.cWidth=_cWidth;
	},
	setCHeight:function(_cHeight){
		this.cHeight=_cHeight;
	},	
	setAutoSize:function(_autoSize){
		this.autoSize=_autoSize;
	},	
	setHandler:function(_handler){
		this.handler=_handler;
	},	
	setAutoId:function(_autoId){
		this.autoId=_autoId;
	},
	setDataRequest:function(_dataRequest){
		this.dataRequest=_dataRequest;
	},	
	setRenderto:function(_renderto){
		this.renderto=_renderto;
	},		
	listeners : {
	 	'resize':function() {
	 		var self=this;
	 		
	 		if(self.autoSize){
		 		self.cWidth=Ext.getBody().getWidth();
		 		self.cHeight=Ext.getBody().getHeight()-20;	 			
	 		}
	 		
			self.fusionCharts = new FusionCharts(TEMP_SYSTEM_WEB_ROOT + "/FusionChart/charts/"+self.chartsType+".swf",self.id,self.cWidth,self.cHeight,"0","1");
	 		
	 		if(self.dataXML){
				self.fusionCharts.addParam("wmode","Opaque");
				self.fusionCharts.setDataXML(self.dataXML);
				self.fusionCharts.render(self.renderDiv);		 			
	 		}else{
		 		if(self.data){
					self.fusionCharts.addParam("wmode","Opaque");
					self.fusionCharts.setDataXML(self.data);
					self.fusionCharts.render(self.renderDiv);		 			
		 		}	 			
	 		}
	 	 }
	},
	initData:function(){
		var self=this;
		
		if(!self.dataURL || !self.autoId || !self.handler){
			return;
		}	
		var params=self.dataRequest+"&handler="+self.handler+"&autoId="+self.autoId+"&curPage="
		          +self.curPage+"&pageCount="+self.pageCount+"&isAllPage="+self.isAllPage+"&categoryType="+self.categoryType;
		var result=ajaxLoadPageSynch(self.dataURL,params);

		self.dataJson=Ext.util.JSON.decode(result);

		self.data=self.dataJson[0]["dataXML"];
		self.totalCount=self.dataJson[0]["totalCount"];
		self.totalPage=parseInt(self.dataJson[0]["totalPage"]);
		
		if(self.handler=="com.tws.cmjt.service.fusioncharts.handler.GanttChartImpl" && self.totalCount){
			self.cHeight=150+(parseInt(self.totalCount)*35);

			var _hml='<div style="text-align: center; width: 100%;">'+
			 	           '<a href="#" onclick="matech_chart_topPage(\''+self.id+'\');" >首页</a> &nbsp;'+
			 	           '<a href="#" onclick="matech_chart_previousPage(\''+self.id+'\');" >上一页</a> &nbsp;'+
				           '<span id="currentPage">'+self.curPage+'</span>/<span id="totalPage">'+self.totalPage+'</span> &nbsp;'+
				           '<a href="#" onclick="matech_chart_nextPage(\''+self.id+'\');" >下一页</a> &nbsp;'+
				           '<a href="#" onclick="matech_chart_bottomPage(\''+self.id+'\');" >尾页</a> &nbsp;'+
				           '<a href="#" onclick="matech_chart_allPage(\''+self.id+'\');" >全部</a> &nbsp;'+
			         '</div>';
			 
			$("#chart_panel_object_fbar_div").html(_hml);
		}

	},
	initChart:function(){
		var self=this;
		
		if(!self.chartsType){
			return;
		}

		if(self.dataXML){
			self.fusionCharts = new FusionCharts(TEMP_SYSTEM_WEB_ROOT + "/FusionChart/charts/"+self.chartsType+".swf",self.id,self.cWidth,self.cHeight,"0","1");

			self.fusionCharts.addParam("wmode","Opaque");
			self.fusionCharts.setDataXML(self.dataXML);
			self.fusionCharts.render(self.renderDiv);			
		}else{
			
			self.initData();
			
			self.fusionCharts = new FusionCharts(TEMP_SYSTEM_WEB_ROOT + "/FusionChart/charts/"+self.chartsType+".swf",self.id,self.cWidth,self.cHeight,"0","1");
			self.fusionCharts.addParam("wmode","Opaque");
			self.fusionCharts.setDataXML(self.data);
			self.fusionCharts.render(self.renderDiv);			
		}
		if(self.caption && !self.renderto){
			$("#chart_panel_object_caption_div").html('<font style="font-size:13px;color:#006699;font-family:微软雅黑;font-weight:bold;">'+self.caption+'</font>');
		}
	},
	//初始化
	initComponent : function() {
		var self=this;
		if(!self.renderto){
			var chartHtml='<div id="chart_panel_div" style="text-align:center;">'+			      
					      '    <div id="chart_panel_object_div"></div> '+
			              '    <div id="chart_panel_object_caption_div"></div>'+
			              '    <div id="chart_panel_object_fbar_div"></div>'+		              
			              '</div>';
			Ext.DomHelper.append(Ext.getBody(),chartHtml,true);			
		}else{
			self.renderDiv=self.renderto;
		}
		
		this.initChart();
		
		Ext.matech.chart.Panel.superclass.initComponent.call(self); 
	},
	changeType:function(_type){
		
		var self=this;
		
		if(_type && _type!=self.chartsType){
			self.chartsType=_type;
		}
		self.fireEvent('resize');
	},
	reload:function(){
		var self=this;
		self.initChart();
	},
	getDataProp:function(propName){
		var self=this;
		
		var index=self.data.indexOf(propName+"=");
		var bIndex=index+propName.length+1;
		var eIndex=self.data.indexOf("\"",bIndex+1);
		
		return self.data.substring(bIndex+1,eIndex);		
	},
	topPage:function(){
		var self=this;
		if(self.isAllPage=="1"){
			self.isAllPage="0";
			self.curPage=1;
			self.initData();
			self.fireEvent('resize');			
		}else{
			if(self.curPage!=1){
				self.curPage=1;
				self.initData();
				self.fireEvent('resize');
			}			
		}
	},
	previousPage:function(){
		var self=this;
		self.isAllPage="0";
		if(self.curPage>1){
			self.curPage=self.curPage-1;
			self.initData();
			self.fireEvent('resize');
		}
	},
	nextPage:function(){
		var self=this;
		self.isAllPage="0";
		if(self.curPage<self.totalPage){
			self.curPage=self.curPage+1;
			self.initData();
			self.fireEvent('resize');
		}
		
	},
	bottomPage:function(){
		var self=this;
		self.isAllPage="0";
		if(self.curPage!=self.totalPage){
			self.curPage=self.totalPage;
			self.initData();
			self.fireEvent('resize');
		}
	},
	allPage:function(){
		var self=this;
		
		if(self.isAllPage!="1"){
			self.isAllPage="1";
			self.initData();
			self.fireEvent('resize');
		}
	}
});