![SmartTab](https://cdn.jsdelivr.net/gh/fe-jw/SmartTab/img/ST_logo.jpg)

# **Smart Tab [Demo](https://fe-jw.github.io/SmartTab)**

This is a tab contents switching plugin.

---

## **Features**
* Supports web accessibility.
* Easy to apply.

## **Get Started**
* Add Markup: Match the a tag's href attribute with the tab content's id.
	```html
	<ul class="your-class-1">
		<li><a href="#ST-1">Tab 1</a></li>
		<li><a href="#ST-2">Tab 2</a></li>
		<li><a href="#ST-3">Tab 3</a></li>
	</ul>
	<div id="ST-1" class="your-class-2">
		Tab 1
	</div>
	<div id="ST-2" class="your-class-2">
		Tab 2
	</div>
	<div id="ST-3" class="your-class-2">
		Tab 3
	</div>
	```

* Add CSS
	```css
	.your-class-2	{display:none;}
	.your-class-2.active	{display:block;}
	```

* Add JS
	```html
	<!-- Don't add my CDN in your project. I recommend adding it to your CDN -->
	<script src="https://cdn.jsdelivr.net/gh/fe-jw/SmartTab/SmartTab.min.js"></script>
	```

* Initialize
	```js
	const myTab = new SmartTab({
		//Required
		btnEle: '.your-class-1',
		contentEle: '.your-class-2',
		cssModeClass: 'active',

		//Optional
		firstTabIndex: 0,	//Index of the tab content to be displayed first(Default is 0)
		tabOutline: false	//Determines whether the tab content has a style outline(Default is false)
	});
	```

## **SmartTab API**

|name|type|required|description|
|---|---|:---:|---|
|btnEle|string|O|Class name of the tab button's wrap element|
|contentEle|string|O|Common class name of tab content|
|cssModeClass|string|O|Activate tab class name|
|firstTabIndex|number||Index of the first activation tab (Default is 0)|
|tabOutline|boolean||Whether the tab outline style (Default is false)|

<!-- 
## **SmartTab Method**

|name|description|
|---|---|
|changeTab(evt, index)|Called after a tab switch. It takes 2 parameters, 1 is the element object and 2 is the index of the active tab.|
 -->


## **Change Log**
* 221109
	* 1.0.1
		* I found a bug in the "changeTab" method and removed it once. It will be added later.
* 221107
	* 1.0.0
		* FIrst Release