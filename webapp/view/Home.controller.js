sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.view.Home", {

	
		onInit: function() {
			var that = this;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRouteMatched(function(oEvent) {
				if (oEvent.getParameter("name") === "Home") {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					var oSplitApp = oRouter._findSplitApp(that.getView());
					oSplitApp.setShowCurtainPane(false);
					
					
				// 	var url = "";
				// 	var JSONModel = new sap.ui.model.json.JSONModel();
				// 	jQuery.ajax({
				// 		url: url,
				// 		method: "GET",
				// 		async: false,
				// 		dataType: "json",
				// 		success: function(data) {
				// 			JSONModel.setData(data);

				// 		}
				// 	});

                // Replace static json data by web service
					var request = [{
					    "TILE_NAME" : "Pending Action",
					    "ICON" : "sap-icon://action",
					    "NUMBER": '10'
					},{
					    "TILE_NAME" : "Leave Tracker",
					    "ICON" : "sap-icon://create-leave-request",
					    "NUMBER": '20'
					}];
					var app = this.getView().byId("__container0");
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(request);
					app.setModel(oModel); //implementation
				}
			}, this);
		},

		onPressPD: function(oEvent) {
			var oRouter;
			var oSplitApp;
			switch (oEvent.oSource.mBindingInfos.title.binding.oValue) {
				case 'Pending Action':
					oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oSplitApp = oRouter._findSplitApp(this.getView());
					oSplitApp.removeAllCurtainContent();
					oRouter.navTo("applyLeave");
					break;
				case 'Leave Tracker':
					oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oSplitApp = oRouter._findSplitApp(this.getView());
					oSplitApp.removeAllCurtainContent();
					oRouter.navTo("applyLeave");
					break;
			}

		}

	});

});