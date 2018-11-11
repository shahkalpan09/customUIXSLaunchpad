sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.view.Main", {

		onInit: function() {
			var that = this;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRouteMatched(function(oEvent) {
				if (oEvent.getParameter("name") === "Home") {
					var username = that.getUsername();
					var count = {};
					count.username = username;
					var app = that.getView().byId("idAppControl");
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(count);
					app.setModel(oModel);
				}
			});
		},

		handlePressConfiguration: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oSplitApp = oRouter._findSplitApp(this.getView());
			oSplitApp.removeAllCurtainContent();
			oRouter.navTo("Home");
		},

		getCSRFTthis: function() {
			var token = null;
			$.ajax({
				url: "/sap/hana/xs/formLogin/token.xsjs",
				type: "GET",
				async: false,
				cache: false,
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function(xhr) {
					token = xhr.getResponseHeader('X-CSRF-Token');
				}
			});
			return token;
		},

		getUsername: function() {
			var name = "";
			var CSRFToken = this.getCSRFTthis();
			//window.globalVariable = this.getCSRFToken();
			$.ajax({
				url: "/sap/hana/xs/home/server/service.xsjs?action=getUserName",
				type: "GET",
				async: false,
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", CSRFToken);
				},
				success: function(ret) {
					name = ret.username;
				}
			});
			return name;
		},

		logout: function() {
			//var CSRFToken = window.globalVariable;
			var CSRFToken = this.getCSRFTthis();
			$.ajax({
				url: "/sap/hana/xs/formLogin/logout.xscfunc",
				type: "POST",
				//  dataType: "json",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", CSRFToken);
				},
				success: function() {
					document.location.reload(true);
				}
			});
		},

		Notify: function(oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("sap.ui.demo.view.popOver", this);
				this.getView().addDependent(this._oPopover);
				
				var notification = [{
				    "req_id": "PO is Approved",
				    "desc" : "Approved"
				},{
				    "req_id": "SO is rejected by Manager",
				    "desc" : "Rejected"
				}];
				var oModel7 = new sap.ui.model.json.JSONModel();
				oModel7.setData(notification);
				this._oPopover.setModel(oModel7);
			}

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._oPopover.openBy(oButton);
			});

		}

	});

});