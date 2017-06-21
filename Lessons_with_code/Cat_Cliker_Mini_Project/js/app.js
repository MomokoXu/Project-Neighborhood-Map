var ViewModel = function() {
      this.name = ko.observable("Kitten1");
      this.http = ko.observable("https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/");
      this.clicks = ko.observable(0);
      this.level = ko.computed(function() {
      	if (this.clicks() <= 10) return "Newborn";
      	else if (this.clicks() <= 30) return "Infant";
      	else if (this.clicks() <= 50) return "Baby";
      	else if (this.clicks() <= 50) return "Teen";
      	else return "Growup";
      }, this);

      this.incrementCounter = function() {
      	this.clicks(this.clicks() + 1);
      };

      this.nickNames = ko.observableArray([
      	{name: "Cute kitten"},
      	{name: "Soft kitten"},
      ]);
}

ko.applyBindings(new ViewModel());
