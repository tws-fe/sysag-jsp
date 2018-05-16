function Kitable(o){
	this.init(o);
}

(function($){
	Kitable.prototype.init = function(o){
		for(var k in o){
			this[k] = o[k];
		}
		return this;
	};
	
	
	Kitable.prototype.render = function(data){
		if (!this.renderTo){
			throw "[KiTable] no element to be rendered to ";
		}	
		var $renderTo = $("#" + this.renderTo);
		$renderTo.html('');
		if ($renderTo.length == 0){
			throw "[KiTable] invalid element to be rendered to : " + this.renderTo;
		}
		var tableHtml = '<table id="ki-table-' + this.renderTo + '" class="ki-table ';
		if (this.className){
			tableHtml += this.className + '" ';
		}
		if (this.style){
			tableHtml += 'style="' + this.style; 
		}
		tableHtml += '" align="center" ></table>';
		$(tableHtml).appendTo($renderTo).append(this.renderHeader());
		
		this.renderData(data);
		return this;
	};
	
	Kitable.prototype.renderHeader = function(){
		var h = [];
		h.push('<tr class="ki-tr ki-tr-header">');
		h.push('<th class="ki-th ki-row-header">');
		h.push(this.header.rowheader ? this.header.rowheader : '&nbsp;');
		h.push('</th>');
		for(var k in this.header.map){
			h.push('<th class="ki-th">' + this.header.map[k] + '</th>');
		}
		h.push('</tr>');
		return h.join('');
	};
	
	Kitable.prototype.renderData = function(data){
		if (data){
			this.data = data;
		}
		if (this.data_src){
			var param = KiUtil.parseTokenMap.call(this, this.data_param);
			$.ajax({
				type : 'POST',
				url : this.data_src,
				data : param,
				dataType : 'text',
				context : this,
				success : function(r){
					this.data = KiUtil.eval(r);
					if (this.adaptData){
						var r = this.adaptData(this.data);
						if (r){
							this.data = r;
						}
					}
					this.$$renderData();
				}, 
				error : function(e){
					throw "[kitable] fetch data from " + this.data_src + " fail : " + e;
				}
			});
		} else {
			if (this.adaptData){
				var r = this.adaptData(this.data);
				if (r){
					this.data = r;
				}
			}
			this.$$renderData();
		}
		return this;
	};
	
	Kitable.prototype.renderRowHeader = function(td, i){
		return i + 1;
	};
	
	Kitable.prototype.renderCell = function(td, key, value, record, i){
		return value;
	};
	
	Kitable.prototype.$$renderData = function(){
		var html;
		var table = document.getElementById('ki-table-' + this.renderTo);
		for(var i = 0; i < this.data.length; i++){
			
			if (this.beforeRenderRow){
				if (this.beforeRenderRow(this.data[i], i) == false){
					continue;
				}
			}
			
			var tr = table.insertRow();
			var trClassName = 'ki-tr ';
			if (this.tr){
				trClassName = this.tr.className ? trClassName + this.tr.className : trClassName;
				KiUtil.cloneMap(this.tr.style, tr.style);
			}
			tr.className = trClassName;
			
			if (this.afterRenderRow){
				if (this.afterRenderRow(tr, this.data[i], i) == false){
					continue;
				}
			}
			
			var td = tr.insertCell();
			var tdClassName = 'ki-td';
			if (this.td){
				tdClassName = this.td.className ? tdClassName + this.td.className : tdClassName;
				KiUtil.cloneMap(this.td.style, td.style);
			}
			td.className = tdClassName;
			
			html = this.renderRowHeader(td, i);
			if (html){
				td.innerHTML = html;
			}
			for(var k in this.header.map){
				td = tr.insertCell();
				tdClassName = 'ki-td';
				if (this.td){
					tdClassName = this.td.className ? tdClassName + this.td.className : tdClassName;
					KiUtil.cloneMap(this.td.style, td.style);
				}
				td.className = tdClassName;
				html = this.renderCell(td, k, this.data[i][k], this.data[i], i);
				if (html){
					td.innerHTML = html;
				}
			}
		}
		return this;
	};
	
	
})(jQuery);