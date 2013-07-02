function queryYify(imdbId, success) {
    var request = $.ajax({
        url: "http://yify-torrents.com/api/list.json",
        type: "GET",
        data: "limit=" + "1" + "&quality=" + "720p" + "&keywords=" + imdbId,
        dataType: "json"
    });

    request.done(function(result) {
        if (!(result["error"] === "No movies found")) {
            var movieTorrentUrl = result["MovieList"][0]["TorrentUrl"];
            success(movieTorrentUrl);
        }
    });
}

function initYifyEnhancement() {
    console.log("");

    if (window.location.href.indexOf("http://trakt.tv/movie") == 0) {
        console.log();
        var imdbId = $('#meta-imdb-id').attr("value");
        //var title = $("#below-header h2").text();

        queryYify(imdbId, function(movieTorrentUrl) {
            $("#vip-refresh-wrapper").append('<img id="download-torrents" class="show-tip" title="" src="http://b.dryicons.com/images/icon_sets/coquette_part_5_icons_set/png/128x128/magnet.png">');
            $("#download-torrents").click(function() {
                location.href = movieTorrentUrl;
            });
        });
    }

    $(".library-show , .poster").has('a[href^="/movie"]').has('.add-to-list').each(function(index, data) {
        var title = $(data).find(".title").text();
        var parsedJSON = $.parseJSON($(data).find(".add-to-list").attr('rel'));
        var imdbId = parsedJSON.imdb_id;
        console.log(title + " - " + imdbId);
        queryYify(imdbId, function(movieTorrentUrl) {
            $(data).find(".general").append('<span class="download show-tip" title="Download" />');
            $(data).find(".download").click(function() {
                location.href = movieTorrentUrl;
            });
        });
    })
}