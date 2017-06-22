var initialCats = [
    {
      name: "Kitten1",
      imgSrc: "https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/",
      id: 0,
      clicks: 0,
      nickNames: [{name: "Mei"}, {name: "Diva"}]
    },
    {
      name: "Kitten2",
      imgSrc: "https://www.pets4homes.co.uk/images/articles/1646/large/kitten-emergencies-signs-to-look-out-for-537479947ec1c.jpg",
      id: 1,
      clicks: 0,
      nickNames: [{name: "Mercy"}, {name: "Tracer"}]
    },

    {
      name: "Kitten3",
      imgSrc:"https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg",
      id: 2,
      clicks: 0,
      nickNames: [{name: "Sombra"}, {name: "Widowmaker"}]
    },

    {
      name: "Kitten4",
      imgSrc:"https://s-media-cache-ak0.pinimg.com/736x/a0/1b/59/a01b5920f688f91677527fd270c6a7e3.jpg",
      id: 3,
      clicks: 0,
      nickNames: [{name: "Pharah"}, {name: "Ana"}]
    },

    {
      name: "Kitten5",
      imgSrc:"https://s-media-cache-ak0.pinimg.com/736x/a0/1b/59/a01b5920f688f91677527fd270c6a7e3.jpg",
      id: 4,
      clicks: 0,
      nickNames: [{name: "Symmetra"}, {name: "Zarya"}]
    }
  ]

var Cat = function(data) {
      this.name = ko.observable(data.name);
      this.imgSrc = ko.observable(data.imgSrc);
      this.clicks = ko.observable(data.clicks);

      this.nickNames = ko.observableArray(data.nickNames);

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
	/*
	// outter this is view model
	this.currentCat = ko.observable(new Cat({
		name: "Kitten1",
		imgSrc: "https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/",
		clicks: 0,
		nickNames: [{name: "Cute kitten"},{name: "Soft kitten"}]
	}));
	this.incrementCounter = function() {
		// inner this: represnets the binding context of the current cat
		this.clicks(this.clicks() + 1);
	};
	*/
	//This is also ok, because you define self to be the view model
	var self = this;
	this.catList = ko.observableArray([]);
	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem));
	});
	this.currentCat = ko.observable(this.catList()[0]);
	this.incrementCounter = function() {
		self.currentCat().clicks(self.currentCat().clicks() + 1);
	};

	this.setCat = function(clickedCat) {
		self.currentCat(clickedCat);
	}
}

ko.applyBindings(new ViewModel());
