
function Tagit(config) {
	var tagitId = config.tagitId;		
	var initValue = config.initValue;
	var boxWidth = parseInt((config.width || 500));			
	var autoid = config.autoid;	

	var refer = config.refer;	
	var refer1 = config.refer1;	
	var refer2 = config.refer2;	
	
	var dataSource = [];
	var placeholderData;
	
	$('#'+tagitId+'-tagit').remove();
	
	var box = $('<div id="'+tagitId+'-tagit" class="tagit"></div>').insertAfter('#'+tagitId);
	var input;
	var tagbox;
	var placeholderBox;
	var hasText = false;
	var selectedIndex = -1;
	var output = [];
	var searchKey = config.searchKey || 'text';
	var separator = config.separator || ',';
	
	var closeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEvklEQVR4Xu1a7VUVQQxNKlArUCoQKhArECsQK1ArUCsQKlAqECsQKhAqECoQKojnatYz5MxHsjtvWc/bOWf/vDc7m9y5ucl8MG154y33n1YAVgZsOQJrCGw5AVYRnCUEROQhET0jol0i2ieiJ/qkBLwiIjxnRHRBROfMfLNphm4MAHX6BRG9VcfH+AIgjojo26bA6A6AOv5GHcfM92hgAoA47g1EVwBEBI5/IKJejlvwAMQHZj7ugSrG6AKAiCCmvzaofq7xjRi/YWbQ+18TEegDgING4IFmlBrefcnM0IxJbTIAInJARJ8Ls36tjDiNUldD6VBD6XHGS7DhNTOfTkFgEgAiAgPhvG1/HGfmL1OMG97V7yC0ckAAhNHfGQ1AxXnEJ5zvmsKUEQABOmPbaBBGAaC0R8yn7ZaIDqdSssUY/TZm/IHpC00Ih0MYABW8Hybm4fy+FbaWM2P/V8GEmKYggHF7UWEcAwCch2IPbVbnE12ADRaEC2beiwAbAkBEUNV96kG9iJGlvoVQfMfMKJpczQ2AitBPQ31UZgDl3pqIwNlUGBEKO14RjgAABX6feIpUt1v6kM7OU63j7xQ9XrQ01rGeuCwJnE4Mxk9T5Edmhr3N5gKgMPvF1JOhZjhNZdJsUeUzfd0s8AJgC55rZkb5m20iYtmCfm4QCjVGdVZFBGVxygLX97wAWOWvDq7UxTu2NY2qFFhIccVQygi0KyM0AVD6/zKePGqJTMWRWuiUSmsPcFhIhe30AIDFTlr1YacGq7Vmi4AQ6VsJPdQF6SqyWR16ALDx7FZYGOpxzNOnifbfb4Vt9QBgUX3OzPjN3WoO6iC5FWWT9tYAEQEzvye/N9nqAQDFT6r4VTGq0LMU37lXws4r21Aep+J7xcw7tZnyACDpAMzcfGciCKOcH74pIiF7m85EB2zFRSUcQrVCBeQVgAhjZ2VAY/YHuxcXArbE/J9EsFqyA3EPA/6nNBgu2jwAhIuLNAY9RY6nT0tcNQ2GbfUAEEY1SUnu2r4HCCKykVJ41CJjjENj3knAHmVnkwFKLSxDsbsztOq+20KWw9hFSjdvs1HkBcBSuVpi3tOGiC3ZXenUCwDohXSY7sMveUsMW/VPWnsWrjSYxJhVWACCmiB7BKb7gqAgDkanbIpChLG7kz310Q0bLIDSBZt7ye5igOpAjgVL3BZ3z36IAQrC9h6MJKFgMwJCAJsko2juKXByfTTTYPMjvY3iUv47i6WoAXo4CmftweRsIBScB/VxUBO6NeLWAFPe2uoQf3e5sdGakMqNlOYGaG7sUQCoHpTKXJzVQYU3cUECR3O5s0hXzu8KQAME0BC3RE5aM+r5X0Re6V2j3GnUaOfDWaAgRgiH3I0NdAcQYMRJlBGa3+E4ZjzneJcbKaNDwGgCDEShkq4XLF5YqQ3PbeGaHIR1uCZXO3y5JKKDqOB1DwE7oJ7PoWK093c8TPf0wawjtNwXIFqDdmGAYQPyMmiLpxcQcBxOH0VDaXYAkoIJQEAfAEQtNGo2gupwPHzRsuX48H93BhSEcrgCm16Xt5ceceMkvS5/1nu2N64BXtSX1G8WBizJYWvLCsCSZ2cO21YGzIHykr+xMmDJszOHbb8BJqKYX6SU0HAAAAAASUVORK5CYII=";
	

	var readOnly = $('#'+tagitId).hasClass("readonly")||$('#'+tagitId).attr("readonly")||false;
	var begainWithReadOnly = readOnly;
	
	var renderTip = function(row){
		return '<div>'+row[searchKey]+'</div>';
	};
	
	var onChange = function(output) {
		var val = "";
		var box = $('#' + tagitId);
		box.val('');
		output.map(function(row){
			val += ',' + row['value'];
		});
		if(val != "") val = val.substr(1);
		box.val(val);            
				
		box.trigger('onchange');
	
	}
	
	//$('<style>.tagit{position:relative;display:block;padding:10px;border:1px solid #eee;border-radius:4px;background-color:#fff;zoom:1}.tagit-tag{float:left;display:inline-block;margin:4px;padding:3px 6px;border-color:#398439;border-radius:4px;background-color:#449d44;color:#fff;vertical-align:middle;text-align:center;white-space:nowrap;font-weight:400;font-size:14px;line-height:1.42857143;cursor:pointer;touch-action:manipulation;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tagit-tag img{position:relative;top:3px}.tagit-tag-error{border-color:#d43f3a;background-color:#d9534f}.tagit-input{margin:4px;padding:3px 6px;border:none}.tagit-placeholder{position:absolute;top:50px;right:0;left:0;display:none;overflow:scroll;height:180px;border:1px solid #eee;border-radius:4px;background:#fff}.tagit-placehoder-item{padding:10px;border-bottom:1px solid #eee}.tagit-placehoder-item.active,.tagit-placehoder-item:hover{background:#eee;cursor:pointer}</style>').appendTo(box);
	
	function initView() {
		if(boxWidth) {
			box.width(boxWidth);
		}
		var inputBox = $('<ul></ul>').appendTo(box);
		tagbox = $('<div  class="tagbox"></div>').appendTo(inputBox);
		var li = $('<li></li>').appendTo(inputBox);
		input = $('<input type="text" class="tagit-input"/>').appendTo(li);	
		placeholderBox=$('<ul class="tagit-placeholder"></ul>').appendTo(box);
		placeholderBox.width(inputBox.width());
	}

	initView();
	initData();

	function ready() {

		box.click(function () {
			$(this).find('input').focus();
		});
		var focus = false;

		input.focus(function () {
			if(readOnly) {
				return ;
			}
			change();
			focus = true;
			
			initData();
			
			changePlaceholder();
			box.css('z-index','1000');
				
		}).blur(function () {
			if(readOnly) {
				return ;
			}
			if (selectedIndex >= 0 && selectedIndex < 10) {
				addTag(placeholderData[selectedIndex]);
			} else if (input.val() != '') {
				if(placeholderData.length>0) {
					addTag(placeholderData[0]);
				} else {
					addTagWithName(input.val());
				}
				hasText = false;
			}
					
			
			setTimeout(function(){
				if(!focus) {
					placeholderBox.css('display','none');
					box.css('z-index','0');
				}
			},200);
			focus = false;
		});
		input.keyup(function (key) {
			if(readOnly) {
				return;
			}
			switch (key.keyCode) {
				case 8:
					if (input.val() == '') {
						if (hasText) {
							hasText = false;
						} else {
							removeLastTag();
						}
					} else {
						changePlaceholder();
					}
					break;
				case 13:
					if (selectedIndex >= 0 && selectedIndex < 10) {
						addTag(placeholderData[selectedIndex]);
					} else if (input.val() != '') {
						if(placeholderData.length>0) {
							addTag(placeholderData[0]);
						} else {
							addTagWithName(input.val());
						}
						hasText = false;
					}
					break;
				case 38:
					if (selectedIndex > 0) {
						selectedIndex--;
						if (selectedIndex >= 0) {
							var selectedCell = placeholderBox.find('li').eq(selectedIndex);
							selectedCell.addClass('active').siblings().removeClass('active');
							if (selectedCell.position().top < 0) {
								placeholderBox.scrollTop(placeholderBox.scrollTop() - 35);
							}
						}
					}
					break;
				case 40:
					if (selectedIndex+1<placeholderData.length&&selectedIndex < 10) {
						selectedIndex++;
						if (selectedIndex < 10) {
							var selectedCell = placeholderBox.find('li').eq(selectedIndex);
							selectedCell.addClass('active').siblings().removeClass('active');
							if (selectedCell.position().top > placeholderBox.height() - 35) {
								placeholderBox.scrollTop(placeholderBox.scrollTop() + 35);
							}
						}
					}
					break;
				default:
					changePlaceholder();
					hasText = true;
			}
		});
	}
	ready();
	
	function initData(){
		var referObj = document.getElementById(refer) ;
		var refer1Obj = document.getElementById(refer1) ;
		var refer2Obj = document.getElementById(refer2) ;
		
		var referValue = "";
		var refer1Value = "";
		var refer2Value = "";
		
		var reg3=new RegExp(separator,"g");    //替换英文,为','
		
		if(referObj) {
			referValue = referObj.value ; 	
			//if(referValue){
			//	referValue = (referValue+"").replace(reg3,"','");	
			//}					
		}else {
			referValue = refer ; 
		}
		
		if(refer1Obj) {
			refer1Value = refer1Obj.value ; 
			//if(refer1Value){
			//	refer1Value = (refer1Value+"").replace(reg3,"','");
			//}
		}else {
			refer1Value = refer1 ; 
		}
		
		if(refer2Obj) {
			refer2Value = refer2Obj.value ; 
			//if(refer2Value){
			//	refer2Value = (refer2Value+"").replace(reg3,"','");
			//}
		}else {
			refer2Value = refer2 ; 
		}	
		
		var url = MATECH_SYSTEM_WEB_ROOT + "/hint.do?method=combox";
		var request = "&autoid=" + autoid;
		if(refer && referValue != "") request += "&refer=" + referValue;			
		if(refer1 && refer1Value != "") request += "&refer1=" + refer1Value;
		if(refer2 && refer2Value != "") request += "&refer2=" + refer2Value;		
		//alert(request);
		var result = ajaxLoadPageSynch(url, request);		
		//alert(result)
		var ds = eval('(' + result + ')');
		dataSource = ds.data;	
	}

	function changePlaceholder() {
		selectedIndex = -1;
		placeholderBox.css('display', 'block');
		var text = input.val();
		placeholderData = [];
		var placeholderView = $('#'+tagitId+'-tagit').find('.tagit-placeholder');
		placeholderView.html('');

		var outCount = 0;
		for (var i = 0; i < dataSource.length; i++) {
			if (outCount >= 10) {
				break;
			}
			var row = dataSource[i];
			if (row[searchKey].indexOf(text) != -1) {
				placeholderData.push(row);					
				var li = document.createElement('li');
				li.setAttribute('searchKey',row[searchKey]);
				if(renderTip) {
					li.innerHTML = renderTip(row);
				} else {
					li.innerHTML = row[searchKey];
				}
				li.className = 'tagit-placehoder-item';
				li.onclick = function () {
					addTagWithName($(this).attr('searchKey'));
				};
				placeholderView.append(li);
				outCount++;
			}
		}
	}

	function addTagWithName(name) {
		if(checkRepeat(name)) {
			return ;
		}

		var li = document.createElement('li');
		li.innerHTML = name + '<img src = "'+closeImage +'" width = "16"/>';
		li.className = 'tagit-tag tagit-tag-error';
		for (var i = 0; i < dataSource.length; i++) {
			if (dataSource[i][searchKey] == name) {
				output.push(dataSource[i]);
				li.className = 'tagit-tag';
				break;
			}
		}
		li.onclick = function () {
			if(readOnly) {
				return ;
			}
			var name = $(this).html();
			removeTagByName(name);
			$(this).remove();
		};
		tagbox.append(li);
		input.val('');
		hasText = false;
		change();
	}

	function addTag(row) {

		if(checkRepeat(row[searchKey])) {
			return ;
		}

		output.push(row);
		var li = document.createElement('li');
		li.innerHTML = row[searchKey] + '<img src ="'+closeImage+ '" width = "16"/>';
		li.className = 'tagit-tag';
		li.onclick = function () {
			if(readOnly) {
				return ;
			}
			var name = $(this).html();
			removeTagByName(name);
			$(this).remove();
		};
		tagbox.append(li);
		input.val('');
		hasText = false;
		change();
	}

	function checkRepeat(name) {
		for(var i = 0;i<output.length;i++) {
			if(output[i][searchKey] == name) {
				tagbox.find('.tagit-tag').eq(i).stop().css({'background-color': '#ec971f','border-color': '#d58512'}).animate({'background-color': '#449d44','border-color': '#398439'},300);
				return true;
			}
		}
		return false;
	}

	function removeLastTag() {
		tagbox.find('li:last').remove();
		output.pop();
		change();
	}

	function removeTagByName(name) {
		name = name.substr(0, name.indexOf('<'));
		for (var i = 0; i < output.length; i++) {
			if (output[i][searchKey] == name) {
				output.splice(i, 1);
				change();
				break;
			}
		}
	}

	function change() {
		if(onChange) {
			onChange(output);
		}
		placeholderBox.css({'top':box.height()+parseInt(box.css('padding-top'))+parseInt(box.css('padding-bottom'))});
	}
	
	function clearAll(){
		output = [];
		tagbox.find('li').remove();
		change();
	}

	
	if(initValue) {
		var initValueArray = initValue.split(',');
		if(begainWithReadOnly) {
			initValueArray.map(function(row) {	
			    addTagWithName(row);
			});
		} else {
			initValueArray.map(function(row) {	
				for(var i = 0;i<dataSource.length;i++) {
				    if(dataSource[i]['id']==row) {
					   addTag(dataSource[i]);
					   break;
				    }
			   }
			});
		}
		
	}
	
	function setReadOnly(ro) {
		readOnly = ro;
		if(ro) {
			box.css("background","transparent");
			box.css("border","none");
			input.css("display","none");
			box.find("img").css("display","none");
		} else {
			box.css("background","#fff");
			input.css("display","block");
			box.css("border","1px solid #CCCCCC");
			box.find("img").css("display","block");
		}
	}
	
	if(readOnly) {
		setReadOnly(true);
	}
	
	
	return {
		clearAll:clearAll,
		setReadOnly:setReadOnly
	}	
}