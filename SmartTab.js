class SmartTab{
	constructor(options){
		const btnWrap = document.querySelector(options.btnEle);
		const btnLists = Array.prototype.slice.call(btnWrap.querySelectorAll('li'));
		const btns = Array.prototype.slice.call(btnWrap.querySelectorAll('a'));
		const contents = Array.prototype.slice.call(document.querySelectorAll(options.contentEle));
		let beforeActiveIndex;
		let currentActiveIndex;

		//Accessibility Settings
		btnWrap.setAttribute('role', 'tablist');
	
		btnLists.forEach((ele, index) => {
			ele.setAttribute('role', 'none');
			ele.dataset.index = index;
		});
	
		btns.forEach(ele => {
			let tabHash = ele.hash.replace('#', '');

			ele.setAttribute('role', 'tab');
			ele.setAttribute('aria-selected', 'false');
			ele.setAttribute('aria-controls', tabHash);

			//Click on the A tag
			ele.addEventListener('click', function(e){
				e.preventDefault();
	
				let selected = this.getAttribute('aria-selected');
	
				if(selected == 'false'){
					if(!btnWrap.querySelector('a[aria-selected=true]')){
						//First click
					}else{
						//Not the first click
						btnWrap.querySelector('a[aria-selected=true]').setAttribute('aria-selected', false);
						btnWrap.querySelector('a.active').classList.remove('active');
					}

					this.setAttribute('aria-selected', true);
					this.classList.add('active');
					currentActiveIndex = this.parentElement.dataset.index;

					console.log('currentActiveIndex: ', currentActiveIndex);
				}
	
				let winTop = window.scrollY;
				document.getElementById(tabHash).style.display = '';
				document.getElementById(tabHash).focus();
				window.scrollTo(0, winTop);
			});
		});
	
		contents.forEach(ele => {
			ele.setAttribute('role', 'tabpanel');
			ele.tabIndex = 0;

			if(!options.tabOutline){
				ele.style.outline = 'none';
			}
		});

		this.btnWrap = btnWrap;
		this.btnLists = btnLists;
		this.btns = btns;
		this.contents = contents;
	}

	changeTab(){
		console.log('changeTab');
	}

	callBtn(){
		return this.btns;
	}

	callCont(){
		return this.contents;
	}
}