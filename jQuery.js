

function myfunction()
      {
        console.log("survol");
      }

function appelAlt(per)
{
	iman = document.images[per].alt;
	console.log(iman);
}


var appiSW = "https://swapi.co/api/people/?format=json";

function cargaPersonajes()
{
	$.ajax({
		url: "https://swapi.co/api/people/?format=json",
		type: 'GET',
		dataType: 'json',
		success: function(personnage)
		{
			$( ".list-group" ).empty();
			$( ".nom" ).empty();
			for (var i = 0; i < personnage.results.length; i++)
			{
				$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
				$( ".nom"+i).html( personnage.results[i].name);

            	$(".list-group").append("<button type='button' class='list-group-item list-group-item-action', data-toggle='modal', data-target='#myModal'>"+personnage.results[i].name+"</button>");

            	$( ".modal-body" ).empty();
            				$(".modal-body").append("<ul class='list-group'>"+
									  "<li class='list-group-item active'>Name</li>"+
									  "<li class='list-group-item'>"+personnage.results[i].name+"</li>"+
									  "<li class='list-group-item active'>Mass</li>"+
									  "<li class='list-group-item'>"+personnage.results[i].mass+"</li>"+
									  "<li class='list-group-item active'>Eyes Color</li>"+
									  "<li class='list-group-item'>"+personnage.results[i].eye_color+"</li>"+
									  "<li class='list-group-item active'>Films</li>"+
									  "<li class='list-group-item film'></li>"+
									"</ul>");

	            console.log("    PERSONAJE:   " + i +" "+ personnage.results[i].name);

	            for(var e = 0; e< personnage.results[i].films.length; e++)
	            {
	            	console.log("   Hola:          "+e +"   "+personnage.results[i].name);
	            	console.log("   PELI:          "+e +"   "+personnage.results[i].films);
	            	console.log("   PELICULA:          "+e +"   "+personnage.results[i].films[e]);
	            	console.log("   Nombre PELICULA:          "+e +"   "+personnage.results[i].films[e].title);
	            	$.ajax({
						url: personnage.results[i].films[e],
						type: 'GET',
						dataType: 'json',
						success: function(peli)
						{
							$( ".film").empty();
							$(".film").append(
								"<p class='films'>"+peli.title+"</p>");
						}
					})
					
	            }	
			}

		}
	});
	
}