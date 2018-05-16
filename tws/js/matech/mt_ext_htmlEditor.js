
Ext.namespace("Ext.matech");

var DEFAULT_TREE_URL =MATECH_SYSTEM_WEB_ROOT+ "/general.do?method=getTreeJsonData";

/**
 * 扩展ExtJS htmlEditor插件，支持插入网络图片、本地上传图片功能
 * 
 */

Ext.matech.HTMLEditor = Ext.extend(Ext.form.HtmlEditor, {
    addImage : function() {
        var editor = this;
        var imgform = new Ext.FormPanel({
            region : 'center',
            labelWidth : 60,
            frame : true,
            bodyStyle : 'padding:5px 5px 0',
            autoScroll : true,
            border : false,
            fileUpload : true,
            items : [{
                        xtype : 'textfield',
                        fieldLabel : '选择文件',
                        name : 'userfile',
                        inputType : 'file',
                        allowBlank : false,
                        blankText : '文件不能为空',
                        height : 25,
                        anchor : '98%',
                        readOnly:false,
                        
                        listeners:{  
                            focus:function(obj){  
                                upload(obj);  
                            }  
                        }  
                    }],
            buttons : [{
                text : '上传',
                type : 'submit',
                handler : function() {
                	
                	var furl= imgform.form.findField('userfile').getValue();
                    var type=furl.substring(furl.length-3).toLowerCase();
                    var filename=furl.substring(furl.lastIndexOf("\\")+1);
                    if (furl==""||furl==null) {return;}
                    if(type!='jpg'&&type!='bmp'&&type!='gif'&&type!='png'){
	                     alert('仅支持jpg、bmp、gif、png格式的图片');
	                     return;
                    }
                	//alert(imgform.form.isValid())
                    if (!imgform.form.isValid()) {return;}
                    imgform.form.submit({
                        waitMsg : '正在上传',
                        url : MATECH_SYSTEM_WEB_ROOT + '/general.do?method=attachUpload&handler=ProjectBugHandler&indexTable=',
                        success : function(form, action) {

                            var element = document.createElement("img");

                            element.src = MATECH_SYSTEM_WEB_ROOT+"/"+ action.result.fileURL.replaceAll("%2F","/");
                            if (Ext.isIE) {
                                editor.insertAtCursor(element.outerHTML);
                            } else {
                                var selection = editor.win.getSelection();
                                if (!selection.isCollapsed) {
                                    selection.deleteFromDocument();
                                }
                                selection.getRangeAt(0).insertNode(element);
                            }
                            win.hide();
                        },
                        failure : function(form, action) {
                            form.reset();
                            if (action.failureType == Ext.form.Action.SERVER_INVALID)
                                Ext.MessageBox.alert('警告',
                                        action.result.msg);
                        }
                    });
                }
            }, { 
                text : '关闭',
                type : 'submit',
                handler : function() {
                    win.close(this);
                }
            }]
        });

        function upload(obj) {
        	//alert(obj.startValue);
        	
        	//return false;
           /* var dialog = new Ext.ux.UploadDialog.Dialog({    
                title:config.title || '图片上传',    
                url: config.url || '',    
                post_var_name: config.post_var_name || 'file',  
                reset_on_hide: config.reset_on_hide || false,    
                modal: config.modal || true,  
                draggable: config.draggable || true,  
                proxyDrag: config.proxyDrag || true,     
                resizable: config.resizable || true,     
                constraintoviewport: true,    
                permitted_extensions: config.permitted_extensions || ['JPG','jpg','GIF','gif','PNG','png'],    
                allow_close_on_upload: config.allow_close_on_upload || false,    
                upload_autostart: config.upload_autostart || true //是否自动上传  
            });   
            dialog.show();  
            //上传成功后回调函数  
            dialog.on('uploadsuccess',function(dialog, filename, resp_data, record){  
                //把上传成功的图片相对路径赋值到imgUrl框中  
                Ext.getCmp('imgUrl').setValue(resp_data.data.msg);  
                dialog.hide();  
            }); */
        } 
        
        var win = new Ext.Window({
                    title : "上传图片",
                    width : 350,
                    height : 120,
                    modal : true,
                    border : false,
                    iconCls : "form-btn-picture",
                    layout : "fit",
                    items : imgform

                });
        win.show();

    },
    createToolbar : function(editor) {
    	Ext.matech.HTMLEditor.superclass.createToolbar.call(this, editor);
        this.tb.insertButton(16, {
        			id:'pic',
                    cls : "x-html-editor-tip",
                    icon : "img/picture.png",
                    handler : this.addImage,
                    tooltip: '上传图片',
                    scope : this
                });

    }
});

/*Ext.QuickTips.init();
Ext.QuickTips.register({
	target:'pic',
	title:'aaa',
	text:'ddd'
});*/



Ext.EmoteChooser = function(config){
    Ext.EmoteChooser.superclass.constructor.call(this, config);
    this.addEvents(
        'select'
    );
    if(this.handler){
        this.on("select", this.handler, this.scope, true);
    }
};
Ext.extend(Ext.EmoteChooser, Ext.Component, {
    itemCls : "emote-chooser",
    value : null,
    clickEvent:'click',
    ctype: "Ext.EmoteChooser",
    allowReselect : false,
    emotes : [//表情列表 
        "001","002","003","004","005","006","007","008","009","010","011",
        "012","013","014","015","016","017","018","019","020","021","022",
        "023","024","025","026","027","028","029","030","031","032","033",
        "034","035","036","037","038","039","040","041","042","043",
        "044","045","046","047","048","049","050","051","052","053","054",
        "055","056","057","058","059","060"
    ],
    onRender : function(container, position){
        var t = this.tpl || new Ext.XTemplate(
            '<tpl for="."><a href="#" class="emote-{.}" hidefocus="on"><em><img src="images/emote/emote_{.}.gif" unselectable="on" /></em></a></tpl>'
        );//套用模板，图片路径需自己修改 
        var el = document.createElement_x("div");
        el.className = this.itemCls;
        t.overwrite(el, this.emotes);
        container.dom.insertBefore(el, position);
        this.el = Ext.get(el);
        this.el.on(this.clickEvent, this.handleClick,  this, {delegate: "a"});
        if(this.clickEvent != 'click'){
            this.el.on('click', Ext.emptyFn,  this, {delegate: "a", preventDefault:true});
        }
    },
    afterRender : function(){
        Ext.EmoteChooser.superclass.afterRender.call(this);
        if(this.value){
            var s = this.value;
            this.value = null;
            this.select(s);
        }
    },
    handleClick : function(e, t){
        e.preventDefault();
        if(!this.disabled){
            var c = t.className.match(/(?:^|\s)emote-(.{3})(?:\s|$)/)[1];
            this.select(c.toUpperCase());
        }
    },
    select : function(emote){
        //emote = emote.replace("#", ""); 
        if(emote != this.value || this.allowReselect){
            var el = this.el;
            if(this.value){
                el.child("a.emote-"+this.value).removeClass("emote-chooser-sel");
            }
            el.child("a.emote-"+emote).addClass("emote-chooser-sel");
            this.value = emote;
            this.fireEvent("select", this, emote);
        }
    }
});
Ext.reg('emotechooser', Ext.EmoteChooser);

Ext.menu.EmoteItem = function(config){
    Ext.menu.EmoteItem.superclass.constructor.call(this, new Ext.EmoteChooser(config), config);
    this.chooser = this.component;
    this.relayEvents(this.chooser, ["select"]);
    if(this.selectHandler){
        this.on('select', this.selectHandler, this.scope);
    }
};
Ext.extend(Ext.menu.EmoteItem, Ext.menu.Adapter);

Ext.menu.EmoteMenu = function(config){
    Ext.menu.EmoteMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var ci = new Ext.menu.EmoteItem(config);
    this.add(ci);
    this.chooser = ci.chooser;
    this.relayEvents(ci, ["select"]);
};
Ext.extend(Ext.menu.EmoteMenu, Ext.menu.Menu);

