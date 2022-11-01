class SmartTab{
	constructor(options){
		this.options = options;
		this.btnWrap = document.querySelector(options.btnEle);
		this.btnLists = Array.prototype.slice.call(this.btnWrap.querySelectorAll('li'));
		this.btns = Array.prototype.slice.call(this.btnWrap.querySelectorAll('a'));
		this.contents = Array.prototype.slice.call(document.querySelectorAll(options.contentEle));
		this.currentActiveIndex = typeof options.firstTabIndex !== 'undefined' ? options.firstTabIndex : 0;

		this.init();
		this.changeTab();
	}

	init(){
		let options = this.options;
		let btnWrap = this.btnWrap;
		let btnLists = this.btnLists;
		let btns = this.btns;
		let contents = this.contents;
		let currentActiveIndex = this.currentActiveIndex;

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
	
			if(!options.cssClassMode){
				ele.style.display = 'none';
			}
	
			if(!options.tabOutline){
				ele.style.outline = 'none';
			}
		});
	
		//First Active Tab
		let initTab = document.querySelector('a[data-index="' + currentActiveIndex + '"]');
		initTab.classList.add('active');
		initTab.ariaSelected = true;
	
		if(!options.cssClassMode){
			document.getElementById(initTab.getAttribute('aria-controls')).style.display = '';
		}else{
			document.getElementById(initTab.getAttribute('aria-controls')).classList.add(options.cssClassMode);
		}
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
				let selected = this.ariaSelected;
				let currentIndex = this.dataset.index;
				let currentTabHash = this.getAttribute('aria-controls');
	
				if(selected == 'false'){
					//Not the first click
					if(btnWrap.querySelector('a[aria-selected=true]')){
						let _this = btnWrap.querySelector('a[aria-selected=true]');
						beforeIndex = _this.dataset.index;
						beforeTab = _this.getAttribute('aria-controls');
	
						_this.ariaSelected = false;
						_this.classList.remove('active');
	
						if(!options.cssClassMode){
							document.getElementById(beforeTab).style.display = 'none';
						}else{
							document.getElementById(beforeTab).classList.remove(options.cssClassMode);
						}
					}
	
					this.ariaSelected = true;
					this.classList.add('active');
	
					if(!options.cssClassMode){
						console.log(document.getElementById(currentTabHash));
						document.getElementById(currentTabHash).style.display = '';
					}else{
						document.getElementById(currentTabHash).classList.add(options.cssClassMode);
					}
	
					currentActiveIndex = currentIndex;
				}
	
				let winTop = window.scrollY;
				document.getElementById(currentTabHash).style.display = '';
				document.getElementById(currentTabHash).focus();
				window.scrollTo(0, winTop);

				//Callback
				callback && callback();
			});
		});
	}
}