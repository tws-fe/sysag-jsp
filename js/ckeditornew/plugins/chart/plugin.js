/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file Forms Plugin
 */
var matech_chart_win ;
CKEDITOR.plugins.add( 'chart',
{
	init : function( editor )
	{
		
		var pluginName = 'chart';
       // CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/chart.js');
        editor.addCommand(pluginName, {
        	exec:function(editor) {
        		if(!matech_chart_win)
        			matech_chart_win = new Ext.matech.form.chartDialog({editor:editor});
        		matech_chart_win.clear();
        		matech_chart_win.show() ;
        	}
        });
        

		if ( editor.contextMenu )
		{
			editor.contextMenu.addListener( function( element )
				{
					if ( element.is('input') ) {
						//new inputDialog();
						//alert(345543);
					} 
						
				});
		}

		editor.on( 'doubleclick', function( evt ){
			 var element = evt.data.element;  
			 
             if ( element.is('input') )  {
            	 var type = element.getAttribute( 'type' ) ;
            	 var value = element.getAttribute( 'value' ) ;
            	 var ext = element.getAttribute( 'matech_ext' ) ;    
            	    	 
            	  if(value == "{图表控件}" || (ext.indexOf("ext_type=chart;") > -1)) {
            		 if(!matech_chart_win) {
            			 matech_chart_win = new Ext.matech.form.chartDialog({editor:editor});
            		 }
            		 var attribute = element.getAttribute("matech_ext");
            		 matech_chart_win.clear();
            		 matech_chart_win.parse(attribute) ;
            		 matech_chart_win.setElement(element) ;
            		 matech_chart_win.show() ;	
            	 }
             }
            
		});
	},

	afterInit : function( editor ){
		
	}
} );


