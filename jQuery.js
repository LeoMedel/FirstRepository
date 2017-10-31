
function myfunction()
      {
        console.log("survol");
      }

function appelAlt(per)
{
	iman = document.images[per].alt;
	console.log(iman);
}


function creeModal(nom, mass, eyes, he, hair, skin, birth, gender, personnage)
{
	console.log("numero de peliculas: "+personnage.length);


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
								"<li class='list-group-item film'>Loading...</li>"+
							"</ul>");
	$.ajax({
		url: personnage,
		type: 'GET',
		dataType: 'json',
		success: function(peli)
		{

			console.log("pelicula: "+peli.title);
			$( ".film" ).empty();
			$(".film").append("<p class='film'>"+peli.title+"</p>");
		}
	})
	
}


function cargaPersonajes(pag)
{
	if(pag === "https://swapi.co/api/people/?format=json" || pag !=="null")
	{
		console.log("Page Valide");

		$.ajax({
			url: pag,
			type: 'GET',
			dataType: 'json',
			success: function(personnage)
			{
				console.log("pagina anterior "+personnage.previous);
				$( ".list-group" ).empty();
				$( ".nom" ).empty();
				$(".list-group").append("<button type='button' class='list-group-item list-group-item-action active'>List des Personnage</button>");
				$(".prevPag").attr("onclick", "cargaPersonajes('"+personnage.previous+"')");
				$(".nextPag").attr("onclick", "cargaPersonajes('"+personnage.next+"')");


				for (var i = 0; i < personnage.results.length; i++)
				{
					console.log("Personaje "+i+" "+personnage.results[i].name);
					
					var nomPer = personnage.results[i].name;
					var mass = personnage.results[i].mass;
					var eye = personnage.results[i].eye_color;
					var hei = personnage.results[i].height;
					var hair = personnage.results[i].hair_color;
					var skin = personnage.results[i].skin_color;
					var birth = personnage.results[i].birth_year;
					var gen = personnage.results[i].gender;
					var fil = personnage.results[i].films;
					
					//AJOUTER Nom aux images
					if(pag === "https://swapi.co/api/people/?format=json")
					{
						$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
						$( ".nom"+i).html( personnage.results[i].name);
					}
					
					var pel = personnage.results[i].films+" "; 
					//console.log("Que resulto de PELICULAS: "+personnage.results[i].films);
					
					//onclick = \"creeModal('"+nomPer+"', '"+mass+"', '"+eye+"', '"+hei+"', '"+hair+"', '"+skin+"', '"+birth+"', '"+gen+"', '"+personnage.results[i].films[e]+"')\",
					
	            	for(var e = 0; e< personnage.results[i].films.length; e++)
		            {
		            	console.log("Mega URL: "+personnage.results[i].films);
		            	console.log("Que es esto? "+personnage.results[i].films[e]);
		            	$(".list-group").append("<button type='button', onclick = \"creeModal('"+nomPer+"', '"+mass+"', '"+eye+"', '"+hei+"', '"+hair+"', '"+skin+"', '"+birth+"', '"+gen+"', '"+personnage.results[i].films[e]+"')\","+
	            	 						"class='list-group-item list-group-item-action perso', data-toggle='modal', data-target='#myModal'>"+personnage.results[i].name+"</button>");
		            	//$(".perso").attr("onclick", "creeModal('"+nomPer+"', '"+mass+"', '"+eye+"', '"+hei+"', '"+hair+"', '"+skin+"', '"+birth+"', '"+gen+"', '"+personnage.results[i].films[e]+"')");
	            	
		            	/*
		            	$.ajax({
							url: personnage.results[i].films[e],
							type: 'GET',
							dataType: 'json',
							success: function(peli)
							{

								console.log(": "+peli.title);
								//$(".film").append("<p class='film'>"+peli.title+"</p>");
							}
						})
						*/
		            }
				}

			}
		});

	}
	else if (pag === "null")
	{
		console.log("Ya son todas las paginas");

	}
}