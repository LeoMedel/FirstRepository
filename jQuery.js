

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


function creeModal(nom, mass, eyes, he, hair, skin, birth, gender)
{
	$( ".modal-body" ).empty();
	$(".modal-body").append("<ul class='list-group'>"+
								
									"<li class='list-group-item'>"+
										"<h1 class = 'nom'>"+nom+"</h1>"+
									"</li>"+

									"<li class='list-group-item'>Masse: "+mass+"</li>"+
									"<li class='list-group-item'>Couleur des yeux: "+eyes+"</li>"+
									"<li class='list-group-item'>Taille: "+he+"</li>"+
									"<li class='list-group-item'>Couleur des cheveux: "+hair+"</li>"+
									"<li class='list-group-item'>Peau: "+skin+"</li>"+
									"<li class='list-group-item'>Joyeux anniversaire: "+birth+"</li>"+
									"<li class='list-group-item'>Genre: "+gender+"</li>"+

									
								"<li class='list-group-item active'>Films</li>"+
								"<li class='list-group-item film'></li>"+
							"</ul>");
}


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
			$(".list-group").append("<button type='button' class='list-group-item list-group-item-action active'>List des Personnage</button>");
			$(".sui").attr("id", personnage.next);
			for (var i = 0; i < personnage.results.length; i++)
			{
				var nomPer = personnage.results[i].name;
				var mass = personnage.results[i].mass;
				var eye = personnage.results[i].eye_color;
				var hei = personnage.results[i].height;
				var hair = personnage.results[i].hair_color;
				var skin = personnage.results[i].skin_color;
				var birth = personnage.results[i].birth_year;
				var gen = personnage.results[i].gender;

				/*
				console.log('Personnage: '+nomPer);
				console.log('hair color: '+ hei);
				console.log('skin color: '+ skin);
				console.log('eye color: '+eye);
				console.log('birth year: '+ birth);
				console.log('gender: '+gen);
				*/

				//AJOUTER Nom aux images
				$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
				$( ".nom"+i).html( personnage.results[i].name);

				//Procediure
            	$(".list-group").append("<button type='button', onclick = \"creeModal('"+nomPer+"', '"+mass+"', '"+eye+"', '"+hei+"', '"+hair+"', '"+skin+"', '"+birth+"', '"+gen+"')\","+
            	 						"class='list-group-item list-group-item-action', data-toggle='modal', data-target='#myModal'>"+personnage.results[i].name+"</button>");

	            
	            for(var e = 0; e< personnage.results[i].films.length; e++)
	            {
	            	/*
	            	console.log("   Hola:          "+e +"   "+personnage.results[i].name);
	            	console.log("   PELI:          "+e +"   "+personnage.results[i].films);
	            	console.log("   PELICULAS:          "+e +"   "+personnage.results[i].films[e]);*/
	            	console.log("   Nombre PELICULA:          "+e +"   "+personnage.results[i].films[e].title);
	            	
	            	$.ajax({
						url: personnage.results[i].films[e],
						type: 'GET',
						dataType: 'json',
						success: function(peli)
						{
							$(".film").append("<p class='films'>"+peli.title+"</p>");
						}
					})
					
	            }	
			}

		}
	});
	
}