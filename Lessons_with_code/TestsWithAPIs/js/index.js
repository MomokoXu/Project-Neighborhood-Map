/* =========== Model ==========*/
var model = {
  curCat:null,
  listCats: [
    {
      name: "Kitten1",
      imgSrc: "https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/",
      id: 0,
      clicks: 0
    },
    {
      name: "Kitten2",
      imgSrc: "https://www.pets4homes.co.uk/images/articles/1646/large/kitten-emergencies-signs-to-look-out-for-537479947ec1c.jpg",
      id: 1,
      clicks: 0
    },

    {
      name: "Kitten3",
      imgSrc:"https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg",
      id: 2,
      clicks: 0
    },

    {
      name: "Kitten4",
      imgSrc:"https://s-media-cache-ak0.pinimg.com/736x/a0/1b/59/a01b5920f688f91677527fd270c6a7e3.jpg",
      id: 3,
      clicks: 0
    },

    {
      name: "Kitten5",
      imgSrc:"https://s-media-cache-ak0.pinimg.com/736x/a0/1b/59/a01b5920f688f91677527fd270c6a7e3.jpg",
      id: 4,
      clicks: 0
    }
  ]
};

/* ============ Octopus ========== */
var octopus = {
  init: function() {
    // set current cat to the first one in the cat list
    model.curCat = model.listCats[0];
    // tell our views to initialize
    catListView.init();
    catView.init();
    adminView.init();
  },

  getCurCat: function() {
    return model.curCat;
  },

  getCats: function() {
    return model.listCats;
  },

  setCurCat: function(cat) {
    model.curCat = cat;
  },

  incrementCounter: function() {
    model.curCat.clicks++;
    catView.render();
  }
};


/* ========== View =========== */

var catView = {
  init: function() {
    // store pointers to our DOM elements for easy access later
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');
    // on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function() {
        octopus.incrementCounter();
    });

    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    var curCat = octopus.getCurCat();
    this.catNameElem.textContent = curCat.name;
    this.countElem.textContent = curCat.clicks;
    this.catImageElem.src = curCat.imgSrc;
  }
};

var catListView = {
  init: function() {
    // store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');
    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    var cat, elem, i;
    // get the cats we'll be rendering from the octopus
    var cats = octopus.getCats();
    // empty the cat list
    this.catListElem.innerHTML = '';
    // loop over the cats
    for (i = 0; i < cats.length; i++) {
        // this is the cat we're currently looping over
        cat = cats[i];

        // make a new cat list item and set its text
        elem = document.createElement("div");
        elem.className = "col-md-2";
        elem.innerHTML = '<h2>' + cat.name + '</h2>';

        // on click, setCurrentCat and render the catView
        // (this uses our closure-in-a-loop trick to connect the value
        //  of the cat variable to the click event function)
        elem.addEventListener('click', (function(catCopy) {
            return function() {
                octopus.setCurCat(catCopy);
                catView.render();
            };
        })(cat));

        // finally, add the element to the list
        this.catListElem.appendChild(elem);
    }
  }
};


var adminView = {

    init: function() {
        this.adminElem = document.getElementById('admin-btn');
        this.adminForm = document.getElementById('admin-form');
        this.saveBtn = document.getElementById('save');
        this.cancelBtn = document.getElementById('cancel');

        this.inputName = document.getElementById('name');
        this.inputSrc = document.getElementById('imgSrc');
        this.inputClicks = document.getElementById('clicks');
        this.render();
    },

    render: function() {
      var curView = this;

      this.adminElem.addEventListener('click', function() {
        curView.showForm();
      });

      this.saveBtn.click(function(){
        curView.saveForm();
      });

      this.cancelBtn.click(function(){
        curView.hideForm();
      });
    },

    showForm: function() {
      var cat = octopus.getCurCat();
      this.adminForm.style.display = "block";
      this.inputName.textContent = cat.name;
      this.inputClicks.textContent = cat.clicks;
      this.inputSrc.src = cat.imgSrc;
    },

    hideForm: function() {
      this.inputName.textContent = '';
      this.inputClicks.textContent = '';
      this.inputSrc.src = '';
    },

    saveForm: function() {
      var name = this.inputName;
      var imgSrc = this.inputSrc;
      var clicks = this.clicks;
      this.hideForm();
      var cat = octopus.getCurCat();
      cat.name = name;
      cat.imgSrc = imgSrc;
      cat.clicks = clicks;
      octopus.setCurCat(cat);
    }
}


octopus.init();

// old implmenetation
/*
function loadCatClicker() {
  var listCats = [
    {
      name: "Kitten1",
      http: "https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/",
      id: 0,
      clicks: 0
    },
    {
      name: "Kitten2",
      http: "https://www.pets4homes.co.uk/images/articles/1646/large/kitten-emergencies-signs-to-look-out-for-537479947ec1c.jpg",
      id: 1,
      clicks: 0
    },

    {name: "Kitten3",
    http:"https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg",
     id: 2,
    clicks: 0
    },

    {name: "Kitten4",
    http:"https://s-media-cache-ak0.pinimg.com/736x/a0/1b/59/a01b5920f688f91677527fd270c6a7e3.jpg",
     id: 3,
    clicks: 0
    },

    {name: "Kitten5",
    http:"https://s-media-cache-ak0.pinimg.com/736x/a0/1b/59/a01b5920f688f91677527fd270c6a7e3.jpg",
     id: 4,
    clicks: 0
    }
  ];
  */
  /*
  listCats.forEach(function(element, index) {
    var cat = document.getElementById("cat" + index);
    var catDisplay = document.getElementById("cat-display");
    cat.innerHTML = "<h2>" + element.name + "</h2>";
    cat.addEventListener("click",(function(e) {
      return function() {
        catDisplay.style.display = "inline";
        catDisplay.innerHTML = "<h3>" + e.name + "</h3>"
                             + "<p> Clicks: " + e.clicks + "</p>"
                             + "<img src=" + e.http + " /> ";
        catDisplay.onclick = (function(e) {
          return function() {
            console.log("display clicked");
            e.clicks++;
            catDisplay.innerHTML = "<h3>" + e.name + "</h3>"
                                 + "<p> Clicks: " + e.clicks + "</p>"
                                 + "<img src=" + e.http + " /> ";
            };
          })(e);
        };
      })(element)
    );
  });
  */
  /*
  //change to show dropdown list for kittens
  var cat = document.getElementById("cat");
  var catDisplay = document.getElementById("cat-display");

  //cat.addEventListener("click", displayFrame);
  cat.addEventListener("change", displayCat);

  function displayFrame() {
    catDisplay.style.display = "inline";
    catDisplay.innerHTML = "<h3>" + "Please Select A Kitten" + "</h3>";
  }

  function displayCat() {
    var curCat = listCats[$("#cat").val()];
    if (curCat == null) {
      catDisplay.innerHTML = "<div class='flash'>" + "Please Select A Kitten" + "</div>";
    } else
    {
      catDisplay.style.display = "inline";
      catDisplay.innerHTML = "<h2>" + curCat.name + "</h2>"
                           + "<p> Clicks: " + curCat.clicks + "</p>"
                           + "<img src=" + curCat.http + " /> ";
      catDisplay.onclick = (showClicks);
    }
  }

  function showClicks() {
    console.log("display clicked");
    var curCat = listCats[$("#cat").val()];
    curCat.clicks++;
    catDisplay.innerHTML = "<h2>" + curCat.name + "</h2>"
                         + "<p> Clicks: " + curCat.clicks + "</p>"
                         + "<img src=" + curCat.http + " /> ";
  }
}
*/