
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
				console.log("Que es personnage???: " + personnage);
				console.log("pagina anterior "+personnage.previous);
				$( ".list-group" ).empty();
				$( ".nom" ).empty();
				$(".list-group").append("<button type='button' class='list-group-item list-group-item-action active'>List des Personnage</button>");
				$(".prevPag").attr("onclick", "cargaPersonajes('"+personnage.previous+"')");
				$(".nextPag").attr("onclick", "cargaPersonajes('"+personnage.next+"')");


				for (var i = 0; i < personnage.results.length; i++)
				{
					//Aouter nom aux Images
					if(pag === "https://swapi.co/api/people/?format=json")
					{
						$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
						$( ".nom"+i).html( personnage.results[i].name);
					}

					console.log("Personaje "+i+" "+personnage.results[i].name);
					
					var nomPer = personnage.results[i].name;
					var mass = personnage.results[i].mass;
					var eye = personnage.results[i].eye_color;
					var hei = personnage.results[i].height;
					var hair = personnage.results[i].hair_color;
					var skin = personnage.results[i].skin_color;
					var birth = personnage.results[i].birth_year;
					var gen = personnage.results[i].gender;
					var fl = personnage.results[i].films;
					console.log("Que tiene fl: "+fl[0]);
					var numPel = personnage.results[i].films.length;
					
					console.log("Mega URL: "+personnage.results[i].films);
					console.log("Mega URL 1111: "+personnage.results[i].films[0]);
		            console.log("LONGITUD DE LA MEGA URL: " + personnage.results[i].films.length);


	            	for(var e = 0; e< personnage.results[i].films.length; e++)
		            {
		            	$(".list-group").append("<button type='button', onclick = \"creeModal('"+nomPer+"', '"+mass+"', '"+eye+"', '"+hei+"', '"+hair+"', '"+skin+"', '"+birth+"', '"+gen+"', '"+fl[e]+"')\","+
		            							"class='list-group-item list-group-item-action perso', data-toggle='modal', data-target='#myModal'>"+personnage.results[i].name+"</button>");

		            }
				}
			}
		});

	}
	else if (pag === "null")
	{
		alert("Il n'y a plus de page de personnages de Star Wars");
	}
}