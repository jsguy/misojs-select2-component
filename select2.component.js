/*
	Select2 component

	This implements Select2's `<select>` progressive enhancement mode, 
	and works on both server and client.

	Note: for client funcitonality we assume that both jQuery and 
	Select2 are included in the page, so you must manually do that.
*/
var m = require('mithril'),
	//	Assume we're installed within misojs in the 
	//	/public directory - pass in different path if needed
	basePath = "node_modules/misojs-select2-component/";

var Select2 = {
	//	Note: if no controller, mithril assumes we don't want the arguments.
	controller: function(args){
		return args;
	},
	//	Returns a select box
	view: function(ctrl) {
		var selectedId = ctrl.value().id;
		return [

			//	It's ok to include these each time - browser will cache.
			m("SCRIPT", { src:  basePath + "lib/jquery-2.1.4.min.js"}),
			m("SCRIPT", { src:  basePath + "node_modules/select2/dist/js/select2.min.js"}),
			m("LINK", {   href: basePath + "node_modules/select2/dist/css/select2.min.js", rel: "stylesheet"}),

			m("select", {config: Select2.config(ctrl)}, [
				ctrl.data.map(function(item) {
					var args = {value: item.id};
					//	Set selected option
					if(item.id == selectedId) {
						args.selected = "selected";
					}
					return m("option", args, item.name);
				})
			])
		];
	},
	/**
	Select2 config factory. The params in this doc refer to properties of the `ctrl` argument
	@param {Object} data - the data with which to populate the <option> list
	@param {prop} value - the prop of the item in `data` that we want to select
	@param {function(Object id)} onchange - the event handler to call when the selection changes.
		`id` is the the same as `value`
	*/
	//	Note: The config is never run server side.
	config: function(ctrl) {
		return function(element, isInitialized) {
			if(typeof jQuery !== 'undefined' && typeof jQuery.fn.select2 !== 'undefined') {
				var el = $(element);
				if (!isInitialized) {
					el.select2()
						.on("change", function(e) {
							var id = el.select2("val");
							m.startComputation();

							ctrl.data.map(function(d){
								if(d.id == id) {
									ctrl.value(d);
								}
							});

							if (typeof ctrl.onchange == "function"){
								ctrl.onchange(el.select2("val"));
							}
							m.endComputation();
						});
				}
				el.val(ctrl.value().id).trigger("change");
			} else {
				console.warn('ERROR: You need jquery and Select2 in the page');	
			}
		};
	}
};

module.exports = function(args){
	if(args && args.basePath) {
		basePath = args.basePath;
	}
	return Select2;
};