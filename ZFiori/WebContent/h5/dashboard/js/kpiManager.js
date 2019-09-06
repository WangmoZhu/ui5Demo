function kpiManager(elementId, option) {
    this.echartObj = undefined;
    this.option = option || {};
    this.init(elementId)
}

kpiManager.prototype = {

    constructor: kpiManager,

    init: function(elementId) {                
        this.echartObj = echarts.init(document.getElementById(elementId));
        this.echartObj.setOption(this.option);
    },

    updateDate: function(callBack) {
        if(!this.echartObj) return; 
        if(callBack)callBack(this.echartObj);
    }
}