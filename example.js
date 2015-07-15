//	This example works with misojs, simply save
//	this file as an mvc entity in your misojs app.
var m = require('mithril'),
	//	In misojs, the path to publically accessible 
	//	node_modules is as per below:
	//	Select2 = require('../public/node_modules/misojs-select2/select2.component.js')();
	Select2 = require('select2.component.js')();

module.exports.index = {
	controller: function(params) {
		//	List of users to show
		this.data = [
			{id: 1, name: "John"},
			{id: 2, name: "Mary"},
			{id: 3, name: "Senequia"}
		];
		this.currentUser = m.prop(this.data[1]);
		return this;
	},
	view: function(ctrl) {
		with(sugartags) {
			return m('DIV', {"class": "cw cf"}, [
				m('H1', "Select2 example"),
				m('DIV', m.component(Select2, {
					data: ctrl.data, 
					value: ctrl.currentUser
				}))
			]);
		};
	}
};