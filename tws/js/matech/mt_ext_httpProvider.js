
Ext.state.HttpProvider = function(config){
    Ext.state.HttpProvider.superclass.constructor.call(this);
    this.url = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=getGridConfig";
    this.tableId = "" ;
    Ext.apply(this, config);
    this.state = this.readValues(this.tableId);
};

Ext.extend(Ext.state.HttpProvider, Ext.state.Provider, {
    // private
    set : function(name, value){
        if(typeof value == "undefined" || value === null){
            this.clear(name);
            return;
        }
        this.setValue(name, value);
        Ext.state.HttpProvider.superclass.set.call(this, name, value);
    },
    
    get : function (state){
    	//alert(state);
    	return this.state ;
    },

    // private
    clear : function(name){
        this.clearValue(name);
        Ext.state.HttpProvider.superclass.clear.call(this, name);
    },

    // private
    readValues : function(tableId){
        var state = {};
        var responseText = ajaxLoadPageSynch(this.url,"&tableId="+tableId) ;
        state = eval(responseText) ; 
        if(!state) return "" ;
        return state[0] ;
        
    },

    // private
    setValue : function(name, value){    	
    	//do nothing!!
    }

});