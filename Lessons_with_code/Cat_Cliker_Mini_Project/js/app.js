var ViewModel = function() {
      this.name = ko.observable("Kitten1");
      this.http = ko.observable("https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/");
      this.clicks = ko.observable(0);

      this.incrementCounter = function() {
      	this.clicks(this.clicks() + 1);
      };
}

ko.applyBindings(new ViewModel());
