class SmartTab{
	constructor(options){
		this.options = options;
		this.btnWrap = document.querySelector(options.btnEle);
		this.btnLists = Array.prototype.slice.call(this.btnWrap.querySelectorAll('li'));
		this.btns = Array.prototype.slice.call(this.btnWrap.querySelectorAll('a'));
		this.contents = Array.prototype.slice.call(document.querySelectorAll(options.contentEle));
		this.currentActiveIndex = typeof options.firstTabIndex !== 'undefined' ? options.firstTabIndex : 0;

		this.a11y();
		this.init();
		
		setTimeout(() => {
			this.changeTab();
			
		}, 500);
	}

	a11y(){
		let options = this.options;
		let btnWrap = this.btnWrap;
		let btnLists = this.btnLists;
		let btns = this.btns;
		let contents = this.contents;

		btnWrap.role = 'tablist';
		
		btnLists.forEach((ele, index) => {
			ele.role = 'none'
			ele.querySelector('a').dataset.index = index;
		});
	
		btns.forEach(ele => {
			ele.role = 'tab';
			ele.ariaSelected = false;
			ele.setAttribute('aria-controls', ele.hash.replace('#', ''));
		});
	
		contents.forEach(ele => {
			ele.role = 'tabpanel';
			ele.tabIndex = 0;
	
			if(!options.tabOutline){
				ele.style.outline = 'none';
			}
		});
	}

	init(){
		let options = this.options;
		let currentActiveIndex = this.currentActiveIndex;
	
		//First Active Tab
		let initTab = document.querySelector('a[data-index="' + currentActiveIndex + '"]');
		initTab.classList.add(options.cssModeClass);
		initTab.ariaSelected = true;
		document.getElementById(initTab.getAttribute('aria-controls')).classList.add(options.cssModeClass);
	}

	changeTab(callback){
		let options = this.options;
		let btnWrap = this.btnWrap;
		let btns = this.btns;
		let currentActiveIndex = this.currentActiveIndex;

		btns.forEach(ele => {
			ele.addEventListener('click', function(e){
				e.preventDefault();
	
				let beforeTab;
				let beforeIndex;
				let currentTabHash = this.getAttribute('aria-controls');
	
				if(this.ariaSelected == 'false'){
					//Not the first click
					if(btnWrap.querySelector('a[aria-selected=true]')){
						let _this = btnWrap.querySelector('a[aria-selected=true]');
						beforeIndex = _this.dataset.index;
						beforeTab = _this.getAttribute('aria-controls');
	
						_this.ariaSelected = false;
						_this.classList.remove(options.cssModeClass);
	
						document.getElementById(beforeTab).classList.remove(options.cssModeClass);

					}
	
					this.ariaSelected = true;
					this.classList.add(options.cssModeClass);
	
					let winTop = window.scrollY;
					document.getElementById(currentTabHash).classList.add(options.cssModeClass);
					document.getElementById(currentTabHash).focus();
					window.scrollTo(0, winTop);
	
					currentActiveIndex = this.dataset.index;

					//Callback
					callback && callback(this, currentActiveIndex);
				}
			});
		});
	}
}