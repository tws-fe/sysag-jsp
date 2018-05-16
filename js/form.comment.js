function Comment(config) {
    
    var id = config.id;
    var value = config.value;
    var inputView  = document.getElementById(id);
    var readOnly = inputView.getAttribute('readonly');
    var hidden = inputView.getAttribute('ext_hidden');
    var width;
    var width = inputView.getAttribute('ext_width')||inputView.style.width||400;
    var pageSize = config.pageSize||10;
    var currentPage = 1;
    var totalPage = 1;

    var tree;
    width = width.toString();
    if(width.indexOf('px')>-1) {
        width = width.substr(0,width.length-2);
    }
    
    var box;
    var btn_show;

    var commentBox;
    var commentPage;
   
    var commentFireadOnlyeld;
    var commentFieldInput;
    var commentField;


    function initView(){
        var mainDom = '<ul class = "comment"></ul>';
        mainDom += '<ul class="comment_page"></ul>';
        if(!readOnly) {
            mainDom +=
            '<div class = "comment_input_box">'+
                '<div class="comment_input" contenteditable=true></div>'+
                '<div class ="comment_submit"><button type="button">评论</button></div>'+
            '</div>';
        }
        box = insertNodeAfter(mainDom,inputView);
		box.className = "comment_box";
        box.style.width = width;
        commentBox = getElementsByClassName('comment',box,'ul')[0];
        commentPage = getElementsByClassName('comment_page',box,'ul')[0];
        if(!readOnly) {
            commentField = getElementsByClassName('comment_input_box',box,'div')[0];
            commentFieldInput = getElementsByClassName('comment_input',commentField,'div')[0];
            commentFieldSubmit = getElementsByClassName('comment_submit',commentField,'div')[0];
            commentFieldSubmit.onclick = function(){
                var content = commentFieldInput.innerHTML;
                if(content=="" || content=="<br>" ) {
                    return;
                }
                if(value==undefined||value =="") {
                    createComment(content);
                } else {
                    postComment({},content,true); 
                }
            };
        }

        btn_show = insertNodeAfter('点击收起评论',inputView);
        btn_show.className = 'btn_show';
        btn_show.style.width = width;
      
        btn_show.onclick = function () {
            if(this.innerHTML == "点击收起评论") {
                commentBox.style.display ="none";
                commentPage.style.display = "none";
                this.innerHTML = "点击展开评论";
            } else {
                commentBox.style.display ="block";
                commentPage.style.display = "block";
                this.innerHTML = "点击收起评论";
            } 
        }

        if(hidden) {
            btn_show.innerHTML = "点击展开评论";
            commentBox.style.display ="none";
            commentPage.style.display = "none";
        }
    }

    function setReadOnly(ro) {
        readOnly = ro;
        clear();
        initView();
        initData();
    }

    function clear() {
        box.parentNode.removeChild(box);
        btn_show.parentNode.removeChild(btn_show);
    }

    function initData(){
        fetch({
            url:MATECH_SYSTEM_WEB_ROOT + "common.do?method=comment",
            params:{
                "act":"select",
                "foreignid":value
            },
            method:"POST",
            callback:function(json){
                var list = json.data.commentList;
                tree = buildTreeData(list);
                totalPage = Math.ceil(tree.length/pageSize);
                renderComment(tree);
            }
        });
    }
    
    function createComment(comment) {
        fetch({
            url:MATECH_SYSTEM_WEB_ROOT+"common.do?method=comment",
            params:{
                "act":"create",
                "comment":comment
            },
            method:"POST",
            callback:function(json) {
                insertComment(json.data.newComment,true);
                commentFieldInput.innerHTML = "";
                value = json.data.newComment.foreignid;
                inputView.value = value;
                bindEvent();
            }
        });
    }
    
    function postComment(recipient,comment,toLastPage) {
        fetch({
            url:MATECH_SYSTEM_WEB_ROOT + "common.do?method=comment",
            params:{
                "act":"reply",
                "foreignid":value,
                "recipientid":recipient.id?recipient.id:"",
                "comment":comment,
                "parent":recipient.uuid?recipient.uuid:""
            },
            method:"POST",
            callback:function(json) {
                insertComment(json.data.newComment,toLastPage);
                commentFieldInput.innerHTML = "";
                bindEvent();
            }
        });
    }
    
    function removeComment(uuid,view) {
        fetch({
            url:MATECH_SYSTEM_WEB_ROOT + "common.do?method=comment",
            params:{
                "act":"remove",
                "uuid":uuid
            },
            method:"POST",
            callback:function(json) {
                if(json.errorcode!="200") {
                    alert(json.message);
                } else {
                    traverseAndRemoverNode(tree,uuid);
                    totalPage = Math.ceil(tree.length/pageSize);
                    if(currentPage>totalPage) {
                        currentPage = totalPage;
                    }
                    renderComment(tree);
                }
            }
        });
    }

    function renderComment(tree) {
        var html = renderCommentTree(tree,currentPage);
        commentBox.innerHTML = html;
        bindEvent();
    }

    function renderCommentTree(tree,page) {
        var html = "<ul class = 'clearfix'>";
        var i = 0,end = tree.length;
        if(page) {
            i = (page-1)*pageSize;
            if(i+pageSize<tree.length) {
                 end = i+pageSize;
            }
        }
        for(;i<end;i++) {
            html += '<li class ="comment_cell">'+
                '<div class="cell_user">'+tree[i].sendername+
                (tree[i].recipientname?'<span class="text_reply">回复</span>'+tree[i].recipientname+'</div>':'</div>')+
                '<div class="cell_content">'+
                    tree[i].content+
                '</div>'+
                '<div class="cell_bottom clearfix">'+
                    '<div class="clearfix">'+
                    '<div class="cell_date">'+tree[i].sendtime+'</div>';
                
            if(readOnly) {
                html +=
                    '</div>'+
                '</div>'
            } else {
                html += 
                    '<div class ="comment_cell_input">'+
                        (tree[i].issender=="true"?'<button class="cell_btn_delete" type="button" data-uuid="'+tree[i].uuid+'">删除</button>':'')+
                        '<button class="cell_btn_comment" type="button" data-sender="'+tree[i].sender+'" data-uuid="'+tree[i].uuid+'" data-sender-name="'+tree[i].sendername+'">回复</button>'+
                    '</div>'+
                    '</div>'+
                '</div>';
            }
            if(tree[i].children) {
                html += renderCommentTree(tree[i].children);
            }
            html +="</li>"
        }
        html+="</ul>";

        if(page&&totalPage>0) {
            var pageHtml = "";
            if(currentPage!=1) {
                pageHtml+='<li class="page-before">上一页</li>';
            }

            var start = currentPage-5;
            var end = currentPage+5;
            if(start<=0) {
                start = 0;
            } else {
                pageHtml+='<li class="page-cell">1</li>';
                pageHtml+='<li>...</li>'
            }
            var endHtml = "";
            if(end<totalPage) {
                endHtml = "<li>...</li>"
                endHtml+='<li class="page-cell">'+totalPage+'</li>';
            } else {
                end =totalPage;
            }
            for(var j=start;j<end;j++) {
                if(j+1==currentPage) {
                    pageHtml+='<li class="page-cell active">';
                } else {
                    pageHtml+='<li class="page-cell">';
                }
                pageHtml+=(j+1)+'</li>';
            }

            if(endHtml) {
                pageHtml+=endHtml;
            }
            if(currentPage!=totalPage) {
                pageHtml+='<li class="page-after">下一页</li>'
            }
            commentPage.innerHTML = pageHtml;
        }
        return html;
    }
    
    
    function buildTreeData(list) {
        var treeList = [];
        for(var i = 0;i<list.length;i++) {
            if(list[i].parent&&list[i].parent!="") {
                for(var j = treeList.length-1;j>=0;j--) {
                    if(treeList[j].uuid==list[i].parent) {
                        if(!treeList[j]['children']) {
                            treeList[j]['children'] = [];
                        }
                        treeList[j]['children'].push(list[i])
                        break;
                    }
                    if(traverse(treeList[j].children,list[i])) {
                        break;
                    }
                }
            } else {
                treeList.push(list[i]);
            }
        }
        return treeList;
    }

    function traverse(tree,node) {
        if(!tree) {
            return false;
        }
        
        for(var i = 0;i<tree.length;i++) {
            
            if(tree[i].uuid==node.parent) {
                if(!tree[i]['children']) {
                    tree[i]['children'] = [];
                }
                tree[i]['children'].push(node)
                return true;
            }
            if(traverse(tree[i].children,node)) {
                return true;
            }
        }
        return false;
    }

    function traverseAndRemoverNode(tree,uuid) {
        if(!tree) {
            return false;
        }
        
        for(var i = 0;i<tree.length;i++) {
            if(tree[i].uuid==uuid) {
                tree.remove(tree[i])
                return true;
            }
            if(traverseAndRemoverNode(tree[i].children,uuid)) {
                return true;
            }
        }
        return false;
    }
    
    function bindEvent(){
        var cell_btn_delete = getElementsByClassName('cell_btn_delete',box,'button');
        for(var i = 0;i<cell_btn_delete.length;i++) {
            cell_btn_delete[i].onclick=function(){
                var id = this.getAttribute('data-uuid');
                if (confirm("你确定删除这条回复吗？")) {  
                    removeComment(id,this);
                }
            }
        }
        var cell_btn_comment = getElementsByClassName('cell_btn_comment',box,'button');
        for(var i = 0;i<cell_btn_comment.length;i++) {
            cell_btn_comment[i].onclick=function(){
                
                var recipient = {};
                recipient['id'] =  this.getAttribute('data-sender');
                recipient['name'] = this.getAttribute('data-sender-name');
                recipient['uuid'] = this.getAttribute('data-uuid');  
            
                var li = this; 
                while(li.className.indexOf('cell_bottom')==-1) {
                    li = li.parentNode;
                }
                
                if(this.className.indexOf('show_input')==-1) {
                    this.className = this.className + " show_input";
                    var show_input = this;
                    var newNode = document.createElement('div');
                    newNode.innerHTML = '<div class="comment_input_child" contenteditable=true></div><div class ="comment_submit"><button type="button">评论</button></div>';
                    li.appendChild(newNode);
                    var edit = getElementsByClassName('comment_input_child',newNode,'div')[0];
                    var button = getElementsByClassName('comment_submit',newNode,'div')[0];
                    edit.focus();
                    button.onclick = function() {
                        var content = edit.innerHTML;

                        if(content=="") {
                            return;
                        }
                    
                        postComment(recipient,content,false); 
                    
                    };
                } else {
                    var edit = getElementsByClassName('comment_input_child',li,'div')[0];
                    edit.focus();
                }
            }
        }

        var pageCell = getElementsByClassName('page-cell',box,'li');
        for(var i =0;i<pageCell.length;i++) {
            pageCell[i].onclick = function() {
                currentPage = parseInt(this.innerHTML);
                renderComment(tree);
            }
        }

        var toLastPage = getElementsByClassName('page-before',box,'li')[0];
        var toNextPage = getElementsByClassName('page-after',box,'li')[0];

        if(toLastPage) {
            toLastPage.onclick = function() {
                currentPage--;
                renderComment(tree);
            }
        }

        if(toNextPage) {
            toNextPage.onclick = function () {
                currentPage++;
                renderComment(tree);
            }
        }
    }
    
    function insertNodeAfter(newNode,refNode) {
        var node = document.createElement("div");
        node.innerHTML = newNode;
        if(refNode.nextSibling) {
            refNode.parentNode.insertBefore(node,refNode.nextSibling);
        } else {
            refNode.parentNode.appendChild(node);
        }
        return node;
    } 

    function getElementsByClassName(searchClass, node,tag) {
        node = node || document;
        var result = [];
        if(node.getElementsByClassName) {
            var nodes =  (node || document).getElementsByClassName(searchClass);
              for(var i=0 ;node = nodes[i++];){
                if(tag&&tag !== "*" && node.tagName === tag.toUpperCase()){
                  result.push(node)
                }
              }
              return result
        } else {
            tag = tag || "*";
            var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
            patterns = [],
            current,
            match;
            var i = classes.length;
            while(--i >= 0) {
                patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
            }
            var j = elements.length;
            while(--j >= 0) {
                current = elements[j];
                match = false;
                for(var k=0, kl=patterns.length; k<kl; k++){
                  match = patterns[k].test(current.className);
                  if (!match)  break;
                }
                if (match)  result.push(current);
            }
            return result;
        }
    }
    
    
    function insertComment(comment,toLastPage) {       
        if(toLastPage) {
            tree.push(comment);
        } else {
            traverse(tree,comment);
        }
        totalPage = Math.ceil(tree.length/pageSize);
        if(toLastPage) {
            currentPage = totalPage;
        }
        renderComment(tree);
    }

    initView();
    initData();

    return {
        setReadOnly:setReadOnly,
        clear:clear
    }
}
//url,method,params,callback
function fetch(config) {
    
    var url = config.url;                // requires
    var method = config.method||"GET";   // options
    var params = config.params;          // options
    var callback = config.callback;      // options
    
    var xmlhttp=null;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null) {
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4) {
              if (xmlhttp.status==200) {
                 if(callback) {
                     callback(eval('('+xmlhttp.responseText+')'));
                 }
              } else {
                  alert("XMLHttpRequest Error : Problem retrieving XML data");
              }
            }
        };
        
        var formData = "";
        
        for(var key in params) {
            formData += key+"="+params[key]+"&";
        }

        xmlhttp.open(method,url,true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(formData);
    } else {
        alert("XMLHttpRequest Error : Your browser does not support XMLHTTP.");
    }
}