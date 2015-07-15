# misojs-select2-component

A Select2 component for use in misojs

## installation

In your main misojs application directory:

```
npm install misojs-select2-component --save --prefix ./public
cd public/node_modules/misojs-select2-component
npm install .
```

## Usage

You've now installed the component into the /public directory, and you can acceess it in your mvc entities like so:

```javascript
var Select2 = require('../public/node_modules/misojs-select2-component/select2.component.js')();
```

In your controller, you might set a value like so:

```javascript
this.data = [
	{id: 1, name: "John"},
	{id: 2, name: "Mary"},
	{id: 3, name: "Senequia"}
];
this.currentUser = m.prop(this.data[1]);
```

And in your view:

```javascript
m('DIV', m.component(Select2, {
	data: ctrl.data, 
	value: ctrl.currentUser
}))
```

This will render a Select2 component with the users.

## Updating

Don't forget to update with the prefix as well, eg, in /public of your misojs app:

```javascript
npm update misojs-select2-component --prefix ./public
```

This will update the component.