/**
 * Version: 1.0.1
 * Web: https://fe-jw.github.io/SmartTab
 * GitHub: https://github.com/FE-jw/SmartTab
 * Released: 2022-11-09
*/

class SmartTab{
	constructor(options){
		this.options = options;
		this.btnWrap = document.querySelector(options.btnEle);
		this.btnLists = Array.prototype.slice.call(this.btnWrap.querySelectorAll('li'));
		this.btns = Array.prototype.slice.call(this.btnWrap.querySelectorAll('a'));
		this.contents = Array.prototype.slice.call(document.querySelectorAll(options.contentEle));
		this.currentActiveIndex = typeof options.firstTabIndex !== 'undefined' ? options.firstTabIndex : 0;

		//A11Y
		this.btnWrap.role = 'tablist';
		this.btnLists.forEach((li, index) => {
			li.role = 'none'
			li.querySelector('a').dataset.index = index;
		});
		this.btns.forEach(btn => {
			btn.role = 'tab';
			btn.ariaSelected = false;
			btn.setAttribute('aria-controls', btn.hash.replace('#', ''));
		});
		this.contents.forEach(content => {
			content.role = 'tabpanel';
			content.tabIndex = 0;
	
			if(!options.tabOutline){
				content.style.outline = 'none';
			}
		});
	
		//Initialize(First Active Tab)
		let initTab = this.btnWrap.querySelector('a[data-index="' + this.currentActiveIndex + '"]');
		initTab.classList.add(options.cssModeClass);
		initTab.ariaSelected = true;
		document.getElementById(initTab.getAttribute('aria-controls')).classList.add(options.cssModeClass);

		//Click Tab Button
		let btnWrap = this.btnWrap;
		this.btns.forEach(ele => {
			ele.addEventListener('click', function(e){
				e.preventDefault();
	
				if(this.ariaSelected == 'false'){
					//Not the first click
					let _this = btnWrap.querySelector('a[aria-selected=true]');
					let beforeTab = _this.getAttribute('aria-controls');

					_this.ariaSelected = false;
					_this.classList.remove(options.cssModeClass);
					document.getElementById(beforeTab).classList.remove(options.cssModeClass);
	
					this.ariaSelected = true;
					this.classList.add(options.cssModeClass);
	
					let winTop = window.scrollY;
					let currentTabHash = this.getAttribute('aria-controls');
					document.getElementById(currentTabHash).classList.add(options.cssModeClass);
					document.getElementById(currentTabHash).focus();
					window.scrollTo(0, winTop);
				}
			});
		});
	}

	changeTab(callback){
		this.btns.forEach(ele => {
			ele.addEventListener('click', function(){
				callback && callback(
					this,
					document.getElementById(this.getAttribute('aria-controls')),
					this.dataset.index
				);
			});
		});
	}
}