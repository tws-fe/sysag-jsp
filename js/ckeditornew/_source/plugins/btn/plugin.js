/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file Forms Plugin
 */
var matech_btn_win ;
CKEDITOR.plugins.add( 'btn',
{
	init : function( editor )
	{
		
		var pluginName = 'btn';
       // CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/btn.js');
        editor.addCommand(pluginName, {
        	exec:function(editor) {
        		if(!matech_btn_win)
        			matech_btn_win = new Ext.matech.form.btnDialog({editor:editor});
        		matech_btn_win.clear();
        		matech_btn_win.show() ;
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
            	    	 
            	  if(ext.indexOf("ext_type=btn;") > -1) {
            		 if(!matech_btn_win) {
            			 matech_btn_win = new Ext.matech.form.btnDialog({editor:editor});
            		 }
            		 var attribute = element.getAttribute("matech_ext");
            		 matech_btn_win.clear();
            		 matech_btn_win.parse(attribute) ;
            		 matech_btn_win.setElement(element) ;
            		 matech_btn_win.show() ;	
            	 }
             }
            
		});
	},

	afterInit : function( editor ){
		
	}
} );


