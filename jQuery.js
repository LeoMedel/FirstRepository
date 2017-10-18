

var nPer = 6;
var nFilms = 3;

$.ajax({
	url: "https://swapi.co/api/people/?format=json",
	type: 'GET',
	dataType: 'json',
	crossDomain:false,
	success: function(personnage)
	{
		for (var i = 0; i < nPer; i++)
        {
        	$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
            $( ".nom"+i).html( personnage.results[i].name);
            console.log('Personage '+i+': '+ personnage.results[i].name);
            console.log('      ');
            for(var e = 0; e< nFilms; e++)
            {
            	$.ajax({
					url: personnage.results[i].films[e],
					type: 'GET',
					dataType: 'json',
					success: function(films)
					{
						console.log('title du film '+films.title);

					}
				})
            }
        }
	}
})











            






