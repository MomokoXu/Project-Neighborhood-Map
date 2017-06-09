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
    }

  ];

  listCats.forEach(function(element, index) {
    var cat = document.getElementById("cat" + index);
    var catDisplay = document.getElementById("cat-display");
    cat.innerHTML = "<h2>" + element.name + "</h2>";
    cat.addEventListener("click",(function(e) {
      return function() {
        catDisplay.style.display = "inline";
        catDisplay.innerHTML = "<h3>" + e.name + "</h3>"
                             + "<p'> Clicks: " + e.clicks + "</p>"
                             + "<img src=" + e.http + " /> ";
        catDisplay.onclick = (function(e) {
          return function() {
            console.log("display clicked");
            e.clicks++;
            catDisplay.innerHTML = "<h3>" + e.name + "</h3>"
                                 + "<p'> Clicks: " + e.clicks + "</p>"
                                 + "<img src=" + e.http + " /> ";
            };
          })(e);
        };
      })(element)
    );
  });
}
