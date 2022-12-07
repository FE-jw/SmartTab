/**
 * Version: 1.0.3
 * Web: https://fe-jw.github.io/SmartTab
 * GitHub: https://github.com/FE-jw/SmartTab
 * Released: 2022-12-##
*/

class SmartTab{
	constructor(options){
		this.options = options;
		this.btnWrap = document.querySelector(options.btnEle);
		this.btnLists = Array.prototype.slice.call(this.btnWrap.querySelectorAll('li'));
		this.btns = Array.prototype.slice.call(this.btnWrap.querySelectorAll('a'));
		this.contents = Array.prototype.slice.call(document.querySelectorAll(options.contentEle));
		this.currentActiveIndex = typeof options.firstTabIndex !== 'undefined' ? options.firstTabIndex : 0;

		this.initialize();
	}

	a11y(){
		//A11Y
		this.btnWrap.role = 'tablist';

		this.btnLists.forEach(li => {
			li.role = 'none';
		});

		this.btns.forEach((btn, index) => {
			btn.role = 'tab';
			btn.ariaSelected = false;
			btn.dataset.index = index;
			btn.setAttribute('aria-controls', btn.hash.replace('#', ''));
		});
		
		this.contents.forEach(content => {
			content.role = 'tabpanel';
			content.tabIndex = 0;
	
			if(!this.options.tabOutline){
				content.style.outline = 'none';
			}
		});
	}

	initialize(){
		this.a11y();

		//Initialize(First Active Tab)
		let initTab = this.btnWrap.querySelector('a[data-index="' + this.currentActiveIndex + '"]');
		initTab.classList.add(this.options.cssModeClass);
		initTab.ariaSelected = true;
		document.getElementById(initTab.getAttribute('aria-controls')).classList.add(this.options.cssModeClass);

		//Click Tab Button
		this.btns.forEach(ele => {
			ele.addEventListener('click', (e) => {
				e.preventDefault();

				if(ele.ariaSelected == 'false'){
					//Not the first click
					let _this = this.btnWrap.querySelector('a[aria-selected=true]');
					let beforeTab = _this.getAttribute('aria-controls');

					_this.ariaSelected = false;
					_this.classList.remove(this.options.cssModeClass);
					document.getElementById(beforeTab).classList.remove(this.options.cssModeClass);
	
					ele.ariaSelected = true;
					ele.classList.add(this.options.cssModeClass);
				}

				let currentTabHash = ele.getAttribute('aria-controls');
				document.getElementById(currentTabHash).classList.add(this.options.cssModeClass);
				let winTop = window.scrollY;
				document.getElementById(currentTabHash).focus();
				window.scrollTo(0, winTop);
			});
		});
	}
}