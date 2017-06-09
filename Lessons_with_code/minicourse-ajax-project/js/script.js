
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load nytimes
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='
                    + cityStr + '&sort=newest&api-key=69320ebeda28496db6d9ec79804c62d4'
    $.getJSON(nytimesUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">'
                            + article.headline.main+'</a>' + '<p>' + article.snippet
                            + '</p>' + '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    // load wikipedia data
    // wiki endpoint
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
                    + cityStr + '&format=json&callback=wikiCallback';
    // error handling:
    // if no response after 8000 miliseconds later, text for error will show up
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get wikipedia resources");
    }, 8000);

    // ajax request object
    $.ajax({
        url: wikiUrl,
        // set datatype indicating this is a jsonp request
        dataType: "jsonp",
        // jsonp: "callback",
        success: function(response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr
                                    + '</a></li>');
            };
            // use this clearTimeout, otherwise no matter request is successful
            // or not, wiki area will replaced with the error message.
            clearTimeout(wikiRequestTimeout);
        }

    });
    return false;
};

$('#form-container').submit(loadData);
