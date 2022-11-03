![SmartTab](img/ST_logo.jpg)

# **Smart Tab [Demo](https://fe-jw.github.io/SmartTab)**

This is a smart tab contents plugin.

---

## **How To Use**

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

## **Get Started**

```html
<!-- Don't add my CDN in your project. I recommend adding it to your CDN -->
<script src="https://cdn.jsdelivr.net/gh/fe-jw/SmartTab/SmartTab.min.js"></script>
```

```js
//Initialized
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

## **Change Log**
* 22####
	* Released Ver 1