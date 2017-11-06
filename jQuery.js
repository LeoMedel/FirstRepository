function myfunction(){
  	console.log("survol");
}

function appelAlt(per){
	iman = document.images[per].alt;
	console.log(iman);
}

function cargaPersonajes(pag)
{
	$.ajax({
		url: pag,
		type: 'GET',
		dataType: 'json',
		success: function(personnage)
		{
			//Creation des LISTE DE PERSONNAGE DE "STAR WARS"
			$( ".list-group" ).empty();
			$( ".nom" ).empty();
			$(".list-group").append("<button type='button' class='list-group-item list-group-item-dark active'>List des Personnage</button>");
			$(".prevPag").attr("onclick", "cargaPersonajes('"+personnage.previous+"')");
			$(".nextPag").attr("onclick", "cargaPersonajes('"+personnage.next+"')");
			
			$(".prevPag").removeClass("invisible");
			$(".nextPag").removeClass("invisible");

			//SHOW() et HIDE(); pour montrer les buttons 'next' et 'previous' dynamiquement
			if(personnage.next !== null && personnage.previous !== null)
			{
				console.log("PAGE INTERMEDIAIRE .........................................................................................................................");
				$(".prevPag").removeClass("invisible");
				$(".nextPag").removeClass("invisible");

				$(".prevPag").show();
				$(".nextPag").show();
			}
			else if (personnage.next === null)
			{
				console.log("DERNIERE PAGE DE PERSONNAGE .........................................................................................................................");
				$(".prevPag").show();
				$(".nextPag").hide();
			}
			else if (personnage.previous === null)
			{
				console.log("PREMIERE PAGE DE PERSONNAGE .........................................................................................................................");
				$(".prevPag").hide();
				$(".nextPag").show();
			}

			for (var i = 0; i < personnage.results.length; i++)
			{
				//Agregation des Noms aux Images
				if(pag === "https://swapi.co/api/people/?page=1&format=json")
				{
					$(".result"+i).empty();
					$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
					$( ".nom"+i).html(personnage.results[i].name);
				}

				//Variables avec les valeurs de l'API 
				var nomPer = personnage.results[i].name;
				var mass = personnage.results[i].mass;
				var eye = personnage.results[i].eye_color;
				var hei = personnage.results[i].height;
				var hair = personnage.results[i].hair_color;
				var skin = personnage.results[i].skin_color;
				var birth = personnage.results[i].birth_year;
				var gen = personnage.results[i].gender;
				var fl = personnage.results[i].films;

				console.log("Personnage "+i+": "+ nomPer);

				//Creation des elements de la Liste de Personnage avec son Modal
				$(".list-group").append("<button type='button', onclick = \"creeModal('"+nomPer+"', '"+mass+"', '"+eye+"', '"+hei+"', '"+hair+"', '"+skin+"', '"+birth+"', '"+gen+"', '"+personnage.results[i].films.length+"', '"+fl+"')\","+
	            							"class='list-group-item list-group-item-action perso', data-toggle='modal', data-target='#myModal'>"+personnage.results[i].name+"</button>");
			}
		}
	});
}

function creeModal(nom, mass, eyes, he, hair, skin, birth, gender, numPel, fil)
{
	console.log("Personnage selectioné:           "+nom);
	//Transfomation du String a Array
	var res = fil.split(',');
	console.log(res);

	//Pour eviter la concatenation de contenu 
	$( ".modal-body" ).empty();

	//Creation du Modal d'un personnage
	$(".modal-body").append(
		"<ul class='list-group info'>"+
			"<li class='list-group-item'> <h1 class = 'nom'>"+nom+"</h1></li>"+
			"<li class='list-group-item list-group-item-dark'> <h5>Mass: </h5> </li>"+
			"<li class='list-group-item'>"+mass+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Couleur des yeux:</h5> </li>"+
			"<li class='list-group-item'>"+eyes+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Taille:</h5></li>"+
			"<li class='list-group-item'>"+he+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Couleur des cheveux:</h5></li>"+
			"<li class='list-group-item'>"+hair+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Peau:</h5></li>"+
			"<li class='list-group-item'>"+skin+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Joyeux anniversaire:</h5></li>"+
			"<li class='list-group-item'>"+birth+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Genre:</h5></li>"+
			"<li class='list-group-item'>"+gender+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Films:</h5>"+
			"</li>"+
		"</ul>");

	//"FOR" pour creer les elements des noms de chaque film
	for (var i = 0; i < numPel; i++)
	{
		$.ajax({
			url: res[i],
			type: 'GET',
			dataType: 'json',
			success: function(peli)
			{
				console.log("Film:  "+peli.title);
				$(".info").append("<li class='list-group-item '><p>"+peli.title+"</p></li>");
			}
		})
	}
}