sap.ui.define(["sap/ui/model/json/JSONModel", 'sap/m/MessageToast', 'sap/ui/unified/DateRange',
	"sap/ui/core/mvc/Controller"
], function(JSONModel, MessageToast, DateRange, Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.view.applyLeave", {

		onInit: function() {
			this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({
				pattern: "yyyy-MM-dd"
			});

		},
		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.oSource;
			this._updateText(oCalendar);
			//	this._handleDisabledays(oCalendar);

		},
		_updateText: function(oCalendar) {
			var oSelectedDateFrom = this.getView().byId("startDatePick");
			var oSelectedDateTo = this.getView().byId("EndDatePick");
			var aSelectedDates = oCalendar.getSelectedDates();

			var oDate;
			if (aSelectedDates.length > 0) {
				oDate = aSelectedDates[0].getStartDate();
				if (oDate) {
					oSelectedDateFrom.setText(this.oFormatYyyymmdd.format(oDate));
				} else {
					oSelectedDateTo.setText("No Date Selected");
				}
				oDate = aSelectedDates[0].getEndDate();
				if (oDate) {
					oSelectedDateTo.setText(this.oFormatYyyymmdd.format(oDate));
				} else {
					oSelectedDateTo.setText("No Date Selected");
				}

			}
			var date = aSelectedDates[0].getStartDate();
			var ototalDays = this.getView().byId("totaldays");
			var oneDay = 24 * 60 * 60 * 1000;

			var diffDays = Math.round(Math.abs((aSelectedDates[0].getStartDate() - aSelectedDates[0].getEndDate()) / (oneDay)));
		
			if (diffDays === Math.round(Math.abs(aSelectedDates[0].getStartDate() / (oneDay)))) {
				ototalDays.setText("1");
			} else {
				ototalDays.setText(diffDays + 1);

			}

		},

		onPressSubmit: function() {
			//var oModel = new sap.ui.model.json.JSONModel("getLeave_details.xsjs", true);
			var content = {};
			content.LTYPE = this.getView().byId("leaveType").getSelectedItem().mProperties.text;
			content.SDATE = this.getView().byId("startDatePick").getText();
			content.EDATE = this.getView().byId("EndDatePick").getText();
			content.REASON = this.getView().byId("leaveReason").getValue();
			//	console.log(content.leaveType);
			console.log(content);
			if (content.SDATE === "No Date Selected" || content.REASON ===
				""
			) {

				alert("Please fill all required entries");
			} else {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("/LeaveApplication/create_leave_request.xsjs", content, true, 'POST');
				//	location.reload();
				var msg = "Leave has been submitted for Approval";
				MessageToast.show(msg);
				var omg = sap.ui.getCore().byId("appleave");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var oSplitApp = oRouter._findSplitApp(this.getView());
				oSplitApp.removeAllCurtainContent();
				oRouter.navTo("Home_leave");
			}
			//This code was generated by the layout editor.
		},
		onPressCancel: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oSplitApp = oRouter._findSplitApp(this.getView());
			oSplitApp.removeAllCurtainContent();
			oRouter.navTo("Home_leave");
			//This code was generated by the layout editor.
		},
		onNavButton: function() {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oSplitApp = oRouter._findSplitApp(this.getView());
			oSplitApp.removeAllCurtainContent();
			oRouter.navTo("Home_leave");
			//This code was generated by the layout editor.
		}

	});

});