/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
});

(function() {
    listAllMovies();
    listAllSeries();
    listAllEpisodes("Firefly");
}());

function listAllMovies()
{
    document.getElementById("movies_icon").setAttribute("class", "glyphicon glyphicon-refresh gly-spin");
    
    $.ajax({
        url: './ActionServlet',
        type: 'GET',
        data: {
            action: 'list',
            type: 'movie'
        },
        async:false,
        dataType: 'json'
    })
    .done(function(data) {
        var movies = data.list;

        var contenuHtml = '<div class="panel-group">';

        for (var i = 0; i < movies.length; i++)
        {
            var val = movies[i].title.split(".");
            var title = "";
            
            for (var j = 0; j < val.length - 1; j++)
            {
                title += val[j];
            }
            
            var id = title.replace(/ /g, "_").replace(/"/g, "_").replace(/'/g, "_");          
            
            contenuHtml += '<div>';
            contenuHtml += '<div class="panel panel-heading"><h5 class="panel-title">';
            contenuHtml += '<a class="clickable accordion-toggle" data-toggle="collapse" href="#' + id + '" onclick="viewMovie(\'' + id + '\')">' + title;
            contenuHtml += '</h5></div>';
            contenuHtml += '<div id="' + id + '" class="panel-collapse collapse"></div>';
            contenuHtml += '</div>';      
        }
        
        contenuHtml += '</div>';
        $('#movies').html(contenuHtml);
        
        document.getElementById("movies_icon").setAttribute("class", "");
    })
    .fail(function() {
        console.log('Couldn\'t load the list.');
    })
    .always(function() {
        //
    });
}

function listAllSeries()
{
    document.getElementById("series_icon").setAttribute("class", "glyphicon glyphicon-refresh gly-spin");
    
    $.ajax({
        url: './ActionServlet',
        type: 'GET',
        data: {
            action: 'list',
            type: 'series'
        },
        async:false,
        dataType: 'json'
    })
    .done(function(data) {
        var series = data.list;

        var contenuHtml = '<div class="panel-group">';

        for (var i = 0; i < series.length; i++)
        {
            var title = series[i].title;
            
            var id = title.replace(/ /g, "_").replace(/"/g, "_").replace(/'/g, "_");         
            
            contenuHtml += '<div id="' + id + '">';
            contenuHtml += '<div class="panel panel-heading"><h5 class="panel-title">';
            contenuHtml += '<a class="clickable accordion-toggle" data-toggle="collapse" href="#' + id + '" onclick="viewSeries(\'' + id + '\')">' + title;
            contenuHtml += '</h5></div>';
            contenuHtml += '<div id="' + id + '_infos"></div>';
            contenuHtml += '<div id="' + id + '_episodes" class="panel-collapse collapse"></div>';
            contenuHtml += '</div>';      
        }
        
        contenuHtml += '</div>';
        $('#series').html(contenuHtml);
        
        document.getElementById("series_icon").setAttribute("class", "");
    })
    .fail(function() {
        console.log('Couldn\'t load the list.');
    })
    .always(function() {
        //
    });
}

function listAllEpisodes(series)
{
    $.ajax({
        url: './ActionServlet',
        type: 'GET',
        data: {
            action: 'list',
            type: 'episode',
            series: series
        },
        async:false,
        dataType: 'json'
    })
    .done(function(data) {
        var episodes = data.list;
        var contenuHtml = '<table class="table table-hover"><tbody>';
        var id_series = series.replace(/ /g, "_").replace(/"/g, "_").replace(/'/g, "_");

        for (var i = 0; i < episodes.length; i++)
        {
            var id = episodes[i].title.replace(/ /g, "_").replace(/"/g, "_").replace(/'/g, "_");
            contenuHtml += '<tr data-toggle="collapse" data-target="#' + id + '" class="clickable accordion-toggle" onclick="voirEpisode(\'' + id + '\')">';
            contenuHtml += '<td>' + episodes[i].title + '</td></tr>';
        }
        
        contenuHtml += '</tbody>';
        
        
        
        contenuHtml += '</table>';
        
        console.log(contenuHtml);
        document.getElementById(id_series + "_episodes").innerHTML = contenuHtml;
        console.log(document.getElementById(id_series + "_episodes"));
    })
    .fail(function() {
        console.log('Couldn\'t load the list.');
    })
    .always(function() {
        //
    });
}

function viewMovie(id)
{
    var title_api = id.replace(/_/g, "+");
    
    var request = new XMLHttpRequest();

    request.open("GET", 'http://www.omdbapi.com/?t=' + title_api + '&y=&type=movie&plot=short&r=json', false);
    request.send();

    var data = JSON.parse(request.responseText);
    
    if (data.Response === "True")
    {
        var contenuHtml = '<div class="container">';
        contenuHtml += '<img src="' + data.Poster + '" class="col-sm-2 img-responsive">';
        contenuHtml += '<div class="col-sm-10">';
        contenuHtml += '<div class="row">';
        contenuHtml += '<span class="label label-default"> Year: ' + data.Year + '</span>';
        contenuHtml += '<span class="label label-default">Rated: ' + data.Rated + '</span>';
        contenuHtml += '<span class="label label-default">Runtime: ' + data.Runtime + '</span>';
        contenuHtml += '</div>';
        contenuHtml += '<div class="row">';
        contenuHtml += '<label>Languages: </label>';
        
        var languages = data.Language.split(", ");
        
        for (var i = 0; i < languages.length; i++)
        {
            contenuHtml += '<span class="label label-default">' + languages[i] + '</span>';
        }
        
        contenuHtml += '</div>';
        contenuHtml += '</div>';
    }
    
    $('#' + id).html(contenuHtml);
}

function viewSeries(id)
{
    var title_api = id.replace(/_/g, "+");
    
    var request = new XMLHttpRequest();

    request.open("GET", 'http://www.omdbapi.com/?t=' + title_api + '&y=&type=series&plot=short&r=json', false);
    request.send();

    var data = JSON.parse(request.responseText);
    
    if (data.Response === "True")
    {
        var contenuHtml = '<div class="container">';
        contenuHtml += '<img src="' + data.Poster + '" class="col-sm-2 img-responsive">';
        contenuHtml += '<div class="col-sm-10">';
        contenuHtml += '<div class="row">';
        contenuHtml += '<span class="label label-default"> Year: ' + data.Year + '</span>';
        contenuHtml += '<span class="label label-default">Rated: ' + data.Rated + '</span>';
        contenuHtml += '<span class="label label-default">Runtime: ' + data.Runtime + '</span>';
        contenuHtml += '</div>';
        contenuHtml += '<div class="row">';
        contenuHtml += '<label>Languages: </label>';
        
        var languages = data.Language.split(", ");
        
        for (var i = 0; i < languages.length; i++)
        {
            contenuHtml += '<span class="label label-default">' + languages[i] + '</span>';
        }
        
        contenuHtml += '</div>';
        contenuHtml += '</div></div>';
    }
    
    $('#' + id + '_infos').html(contenuHtml);
}