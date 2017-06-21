var Cat = function() {
      this.name = ko.observable("Kitten1");
      this.imgSrc = ko.observable("https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/");
      this.clicks = ko.observable(0);

      this.nickNames = ko.observableArray([
      	{name: "Cute kitten"},
      	{name: "Soft kitten"},
      ]);

      this.level = ko.computed(function() {
      	var title;
      	var clicks = this.clicks();
      	if (clicks < 10) {
      		title = "Newborn";
  		} else if (clicks < 50) {
  			title = "Infant";
		} else if (clicks < 100) {
			title = "Child";
		} else if (clicks < 200) {
			title = "Teen";
		} else if (clicks < 500) {
			title = "Adult";
		} else {
			title = "Ninja"
		}
		return title;
      }, this);
}

var ViewModel = function() {
	this.currentCat = ko.observable(new Cat());
	this.incrementCounter = function() {
		this.currentCat().clicks(this.currentCat().clicks() + 1);
	};

}

ko.applyBindings(new ViewModel());
