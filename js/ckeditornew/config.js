/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	 //config.skin = 'v2';	//可选：kama|office2003|v2
	 config.height = document.body.clientHeight -120 ;    
	 config.extraPlugins = 'input,listView,chart'; 
	 
	 config.toolbar_Full = [
	       ['Source'],
	       ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
	       ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
	       '/',
	       ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
	        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
	        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
	        ['Link','Unlink','Anchor'],
	       ['Image','Table','HorizontalRule','Smiley','SpecialChar'],
	       '/',
	        ['Styles','Format','Font','FontSize'],
	        ['TextColor','BGColor']
	    ];

	 //config.enterMode = CKEDITOR.ENTER_DIV; //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_DIV
	 config.toolbarCanCollapse = true;
	 config.allowedContent = true;
	 config.removePlugins = 'elementspath';
	 config.toolbarStartupExpanded =false;
	 config.height = 400;

};
