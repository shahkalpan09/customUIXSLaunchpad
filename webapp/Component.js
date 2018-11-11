sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/demo/myRouter",
	"sap/ui/demo/model/models"
], function(UIComponent, Device, myRouter, models) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.Component", {

		metadata: {
			//	manifest: "json"

			rootView: "sap.ui.demo.view.Main",
			"routing": {
				"config": {
					"routerClass": "sap.ui.demo.myRouter",
					"viewType": "XML",
					"targetControl": "idAppControl"
				},
				"routes": [{
						"pattern": "",
						"name": "Home",
						"view": "Home", //	"viewId": "app",
						"viewPath": "sap.ui.demo.view",
						"targetControl": "idAppControl",
						"targetAggregation": "curtainContent"
					},
				{
						"pattern": "applyLeave",
						"name": "applyLeave",
						"view": "applyLeave",
						"viewPath": "sap.ui.demo.view",
						"targetControl": "idAppControl",
						"targetAggregation": "curtainContent"
				}

						]

			}

		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});

});