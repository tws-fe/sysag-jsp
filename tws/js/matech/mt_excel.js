if (!this.matech.excel) {
    this.matech.excel = {};
}
(function () {
	matech.excel.createWorksheet=function(_grid,_title,includeHidden) {
        // Calculate cell data types and extra class names which affect formatting
        var cellType = [];
        var cellTypeClass = [];
        var cm = _grid.getColumnModel();
        var store=_grid.getStore();
        var totalWidthInPixels = 0;
        var colXml = '';
        var headerXml = '';
        var visibleColumnCountReduction = 0;
        var colCount = cm.getColumnCount();
        
        
        
        for (var i = 0; i < colCount; i++) {
        	
            if ((cm.getDataIndex(i) != '') && (includeHidden || !cm.isHidden(i))) {
            	
                var w = cm.getColumnWidth(i);
                totalWidthInPixels += w;

                if (cm.getColumnHeader(i) === "" || matech.string(cm.getColumnHeader(i)).startWith('<input') ){
                	cellType.push("None");
                	cellTypeClass.push("");
                	++visibleColumnCountReduction;
                }else{
                    colXml += '<ss:Column ss:AutoFitWidth="1" ss:Width="' + w + '" />';
                    headerXml += '<ss:Cell ss:StyleID="headercell">' +
                        '<ss:Data ss:Type="String">' + cm.getColumnHeader(i) + '</ss:Data>' +
                        '<ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>';

                    var fld = store.recordType.prototype.fields.get(cm.getDataIndex(i));
                    
                    switch(fld.type) {
                        case "int":
                            cellType.push("Number");
                            cellTypeClass.push("int");
                            break;
                        case "float":
                            cellType.push("Number");
                            cellTypeClass.push("float");
                            break;
                        case "bool":
                        case "boolean":
                            cellType.push("String");
                            cellTypeClass.push("");
                            break;
                        case "date":
                            cellType.push("DateTime");
                            cellTypeClass.push("date");
                            break;
                        default:
                            cellType.push("String");
                            cellTypeClass.push("");
                            break;
                    }
                }
            }
        }
        var visibleColumnCount = cellType.length - visibleColumnCountReduction;
        
        var result = {
            height: 9000,
            width: Math.floor(totalWidthInPixels * 30) + 50
        };
 
        // Generate worksheet header details.
        var t="";
        if(!_title || _title==""){
            t = '<ss:Worksheet ss:Name="Sheet1">' +
            '<ss:Names>' +
            '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'Sheet1\'!R1:R2" />' +
            '</ss:Names>' +
            '<ss:Table x:FullRows="1" x:FullColumns="1"' +
            ' ss:ExpandedColumnCount="' + (visibleColumnCount + 2) +
            '" ss:ExpandedRowCount="' + (store.getCount() + 2) + '">' +
            colXml +
            '<ss:Row ss:AutoFitHeight="1">' +
            headerXml +
            '</ss:Row>';       	
        }else{
            t = '<ss:Worksheet ss:Name="' + _title + '">' +
            '<ss:Names>' +
            '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'' + _title + '\'!R1:R2" />' +
            '</ss:Names>' +
            '<ss:Table x:FullRows="1" x:FullColumns="1"' +
            ' ss:ExpandedColumnCount="' + (visibleColumnCount + 2) +
            '" ss:ExpandedRowCount="' + (store.getCount() + 2) + '">' +
            colXml +
            '<ss:Row ss:Height="38">' +
            '<ss:Cell ss:StyleID="title" ss:MergeAcross="' + (visibleColumnCount - 1) + '">' +
            '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">' +
            '<html:B></html:B>'+_title+'</ss:Data><ss:NamedCell ss:Name="Print_Titles" />' +
            '</ss:Cell>' +
            '</ss:Row>' +
            '<ss:Row ss:AutoFitHeight="1">' +
            headerXml +
            '</ss:Row>';        	
        }

        // Generate the data rows from the data in the Store
        for (var i = 0, it = store.data.items, l = it.length; i < l; i++) {
            t += '<ss:Row>';
            var cellClass = 'odd';
            r = it[i].data;
            var k = 0;

            for (var j = 0; j < colCount; j++) {

                if ((cm.getDataIndex(j) != '')
                    && (includeHidden || !cm.isHidden(j))) {
                    var v = r[cm.getDataIndex(j)];
                    
                    //过滤html 标记
                    v = matech.string().removeHTMLTag(v); 
                    
                    if (cellType[k] !== "None") {
                        t += '<ss:Cell ss:StyleID="' + cellClass + cellTypeClass[k] + '"><ss:Data ss:Type="' + cellType[k] + '">';
                        if (cellType[k] == 'DateTime') {
                            t += v.format('Y-m-d');
                        } else {
                            t += v;
                        }
                        t +='</ss:Data></ss:Cell>';
                    }
                    k++;
                }
                
            }
            t += '</ss:Row>';
        }
        
        
        
        result.xml = t + '</ss:Table>' +
            '<x:WorksheetOptions>' +
            '<x:PageSetup>' +
            '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />' +
            '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />' +
            '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />' +
            '</x:PageSetup>' +
            '<x:FitToPage />' +
            '<x:Print>' +
            '<x:PrintErrors>Blank</x:PrintErrors>' +
            '<x:FitWidth>1</x:FitWidth>' +
            '<x:FitHeight>32767</x:FitHeight>' +
            '<x:ValidPrinterInfo />' +
            '<x:VerticalResolution>600</x:VerticalResolution>' +
            '</x:Print>' +
            '<x:Selected />' +
            '<x:DoNotDisplayGridlines />' +
            '<x:ProtectObjects>False</x:ProtectObjects>' +
            '<x:ProtectScenarios>False</x:ProtectScenarios>' +
            '</x:WorksheetOptions>' +
            '</ss:Worksheet>';
        return result;
    };
    
	matech.excel.getExcelXml=function(_grid,_title,includeHidden) {
		
        var worksheet = matech.excel.createWorksheet(_grid,_title,includeHidden);
        
        //var totalWidth = _grid.getColumnModel().getTotalWidth(includeHidden);
        return '<xml version="1.0" encoding="utf-8">' +
            '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">' +
            '<o:DocumentProperties><o:Title>' + _title+ '</o:Title></o:DocumentProperties>' +
            '<ss:ExcelWorkbook>' +
            '<ss:WindowHeight>' + worksheet.height + '</ss:WindowHeight>' +
            '<ss:WindowWidth>' + worksheet.width + '</ss:WindowWidth>' +
            '<ss:ProtectStructure>False</ss:ProtectStructure>' +
            '<ss:ProtectWindows>False</ss:ProtectWindows>' +
            '</ss:ExcelWorkbook>' +
            '<ss:Styles>' +
            '<ss:Style ss:ID="Default">' +
            '<ss:Alignment ss:Vertical="Top" ss:WrapText="1" />' +
            '<ss:Font ss:FontName="arial" ss:Size="10" />' +
            '<ss:Borders>' +
            '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />' +
            '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />' +
            '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />' +
            '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />' +
            '</ss:Borders>' +
            '<ss:Interior />' +
            '<ss:NumberFormat />' +
            '<ss:Protection />' +
            '</ss:Style>' +
            '<ss:Style ss:ID="title">' +
            '<ss:Borders />' +
            '<ss:Font />' +
            '<ss:Alignment ss:WrapText="1" ss:Vertical="Center" ss:Horizontal="Center" />' +
            '<ss:NumberFormat ss:Format="@" />' +
            '</ss:Style>' +
            '<ss:Style ss:ID="headercell">' +
            '<ss:Borders>' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />' +
            '</ss:Borders>' +
            '<ss:Font ss:Bold="1" ss:Size="10" />' +
            '<ss:Alignment ss:WrapText="1" ss:Horizontal="Center" />' +
            '<ss:Interior ss:Pattern="Solid" ss:Color="#A3C9F1" />' +
            '</ss:Style>' +
            '<ss:Style ss:ID="even">' +
            '<ss:Interior ss:Pattern="Solid" ss:Color="#FFFFFF" />' +
            '</ss:Style>' +
            '<ss:Style ss:Parent="even" ss:ID="evendate">' +
            '<ss:NumberFormat ss:Format="yyyy-mm-dd" />' +
            '</ss:Style>' +
            '<ss:Style ss:Parent="even" ss:ID="evenint">' +
            '<ss:NumberFormat ss:Format="0" />' +
            '</ss:Style>' +
            '<ss:Style ss:Parent="even" ss:ID="evenfloat">' +
            '<ss:NumberFormat ss:Format="0.00" />' +
            '</ss:Style>' +
            '<ss:Style ss:ID="odd">' +
            '<ss:Borders>' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />' +
            '<ss:Border ss:Color="#000000" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />' +
            '</ss:Borders>' +
            '<ss:Interior ss:Pattern="Solid" ss:Color="#FFFFFF" />' +
            '</ss:Style>' +
            '<ss:Style ss:Parent="odd" ss:ID="odddate">' +
            '<ss:NumberFormat ss:Format="yyyy-mm-dd" />' +
            '</ss:Style>' +
            '<ss:Style ss:Parent="odd" ss:ID="oddint">' +
            '<ss:NumberFormat ss:Format="0" />' +
            '</ss:Style>' +
            '<ss:Style ss:Parent="odd" ss:ID="oddfloat">' +
            '<ss:NumberFormat ss:Format="0.00" />' +
            '</ss:Style>' +
            '</ss:Styles>' +
            worksheet.xml +
            '</ss:Workbook>';
    };
    matech.excel.exportExcel=function(_grid,includeHidden,_title){
    	
		var vExportContent = matech.excel.getExcelXml(_grid,_title,includeHidden);
		
		if (Ext.isIE8||Ext.isIE6||Ext.isIE9 || Ext.isIE7 || Ext.isSafari || Ext.isSafari2 || Ext.isSafari3) { //判断浏览器
            var fd = Ext.get('frmDummy');
            if (!fd) {
                fd = Ext.DomHelper.append(
                        Ext.getBody(), {
                            tag : 'form',
                            method : 'post',
                            id : 'frmDummy',
                            action : MATECH_SYSTEM_WEB_ROOT+'/exportExcel.jsp',
                            target : '_blank',
                            name : 'frmDummy',
                            cls : 'x-hidden',
                            cn : [ {
                                tag : 'input',
                                name : 'exportContent',
                                id : 'exportContent',
                                type : 'hidden'
                            } ]
                        }, true);
            }
            fd.child('#exportContent').set( {
                value : vExportContent
            });
            fd.dom.submit();
        } else {
            document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(vExportContent);
        }
	};

}());