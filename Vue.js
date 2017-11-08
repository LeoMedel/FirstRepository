
//'https://swapi.co/api/people/?format=json'
new Vue({
	el: '#lista',
	//created: function(){ this.cargaPersonajes('https://swapi.co/api/people/?format=json&page=1'); },
	data: {
		personnages:[],
		previ: '',
		nex: ''
	},
	methods: {
		cargaPersonajes: function (pag)
		{
			console.log("que pagina es: "+pag);

			this.$http.get(pag).then(function(acteurs){
	    		this.personnages = acteurs.data.results;
	    		this.previ = acteurs.data.previous;
	    		this.nex = acteurs.data.next;
	    		
	    		console.log("pag Previa:           "+ this.previ);
				console.log("Pag Next:           "+this.nex);

				//$( ".prevPag" ).attr("v-on:click", "cargaPersonajes('"+this.previ+"')");
				//$( ".nextPag" ).attr("v-on:click", "cargaPersonajes('"+this.nex+"')");

				//$( ".b1" ).empty();
				//$( ".b2" ).empty();


				//$(".b1").append("<button type='button' v-on:click=changePage('"+acteurs.data.previous+"') class='btn btn-primary btn-lg btn-outline-dark nextPag' >previous</button>");
				//$(".b2").append("<button type='button' v-on:click=changePage('"+acteurs.data.next+"') class='btn btn-primary btn-lg btn-outline-dark nextPag'>next</button>");
			})
		},
		changePage: function ()
		{
			if(pag !== null)
			{
				this.$http.get(this.nex).then(function(acteurs){
					this.personnages = acteurs.data.results;
				})
			}
			else
			{
				alert("Ya es todo");
			}
		},
		creeModal: function(item)
		{
			console.log("Personnage selectioné:           "+item.name);

			//Pour eviter la concatenation de contenu 
			$( ".modal-body" ).empty();

			//Creation du Modal d'un personnage
			$(".modal-body").append(
				"<ul class='list-group info'>"+
					"<li class='list-group-item'> <h1 class = 'nom'>"+item.name+"</h1></li>"+
					"<li class='list-group-item list-group-item-dark'> <h5>Mass: </h5> </li>"+
					"<li class='list-group-item'>"+item.mass+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Couleur des yeux:</h5> </li>"+
					"<li class='list-group-item'>"+item.eye_color+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Taille:</h5></li>"+
					"<li class='list-group-item'>"+item.height+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Couleur des cheveux:</h5></li>"+
					"<li class='list-group-item'>"+item.hair_color+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Peau:</h5></li>"+
					"<li class='list-group-item'>"+item.skin_color+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Joyeux anniversaire:</h5></li>"+
					"<li class='list-group-item'>"+item.birth_year+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Genre:</h5></li>"+
					"<li class='list-group-item'>"+item.gender+"</li>"+
					"<li class='list-group-item list-group-item-dark'><h5>Films:</h5>"+
					"</li>"+
				"</ul>");

			for (var i = 0; i < item.films.length; i++)
			{
				this.$http.get(item.films[i]).then(function(film){
					console.log("Films: "+film.data.title);
					$(".info").append("<li class='list-group-item '><p>"+film.data.title+"</p></li>");
				})
				
			}
		}
	}
})