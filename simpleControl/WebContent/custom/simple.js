sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Input",
	"sap/m/Button"
],function(control,input,button){
	"use strict";
	
	return button.extend("echart.custom.simple",{
		
//		metadata: {
//			properties: {
//				"text" : {type: "string", defaultValue: "zm"},
//				"size" : {type: "sap.ui.core.CSSSize", defaultValue: "200px"}
//			},
//			events: {
//				
//			},
//			aggregation: {
//				
//			}
//		},
//		
//		renderer: function(oRm, oControl){
//			
//			oRm.write("<div");
//			oRm.writeControlData(oControl);
//			oRm.addStyle("width", oControl.getSize());
//			oRm.addStyle("height", oControl.getSize());
//			oRm.writeStyles();
//			oRm.addClass("mySquare"); 
//			oRm.writeClasses();  
//			oRm.write(">");
//	        oRm.writeEscaped(oControl.getText()); // write the Control property 'name', with XSS protection
//	        
//	        oRm.write("</div>");
//		},
//		
//		onclick: function(evt){
//			alert("Control clicked! Text of the Control is:\n" + this.getText());
//		}
	    // the Control API:
//	    metadata : {
//	        properties : {            // setter and getter are created behind the scenes,
//	            // incl. data binding and type validation
//	            "boxColor" : "string"  // the color to use for the frame around each child Control
//	        },
//	        aggregations: {
//	            content: {singularName: "content"} // default type is "sap.ui.core.Control", multiple is "true"
//	        }
//	    },


	    // the part creating the HTML:
//	    renderer : function(oRm, oControl) { // static function, so use the given "oControl" instance
//	        // instead of "this" in the renderer function
//	        oRm.write("<div");
//	        oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
//	        oRm.writeClasses();              // there is no class to write, but this enables
//	                                         // support for ColorBoxContainer.addStyleClass(...)
//	        oRm.write(">");
//
//	        var aChildren = oControl.getContent();
//	        for (var i = 0; i < aChildren.length; i++) { // loop over all child Controls,
//	            // render the colored box around them
//	            oRm.write("<div");
//	            oRm.addStyle("display", "inline-block");
//	            oRm.addStyle("border", "3px solid " + oControl.getBoxColor()); // specify the border around the child
//	            oRm.writeStyles();
//	            oRm.write(">");
//
//	            oRm.renderControl(aChildren[i]);   // render the child Control
//	                                               // (could even be a big Control tree, but you don't need to care)
//
//
//	            oRm.write("</div>"); // end of the box around the respective child
//	        }
//
//	        oRm.write("</div>"); // end of the complete Control
//	    }
		renderer: {
			// note that no render() function is given here. The Input's render() function is used. 
			// But one function is overwritten:

			writeImgHtml : function(oRm, oInput) {
				sap.m.ButtonRenderer.writeImgHtml.apply(this, arguments); // the default method should be called
																	 // this will make sure that all default input attributes will be there

				oRm.addStyle('text-decoration-color', 'red');  // this change could also be done with plain CSS. 
													  // But you get the idea...
				  }
			  }
	    
	});
})