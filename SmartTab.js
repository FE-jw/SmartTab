class SmartTab{
	constructor(options){
		this.btns = Array.prototype.slice.call(document.querySelectorAll(options.btnEle + ' li'));
		this.contents = Array.prototype.slice.call(document.querySelectorAll(options.contentEle));
	}

	callBtn(){
		return this.btns;
	}

	callCont(){
		return this.contents;
	}
}