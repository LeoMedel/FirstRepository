new Vue({
	el: '#lista',
	
	data: {
		personnages:[],
		previ: '',
		nex: ''
	},
	methods: {
		cargaPersonajes: function (pag)
		{
			console.log("Page actuelle: "+pag);

			this.$http.get(pag).then(function(acteurs){
	    		this.personnages = acteurs.data.results;
	    		this.previ = acteurs.data.previous;
	    		this.nex = acteurs.data.next;

	    		$(".nextPag").removeClass("invisible");
	    		$(".prevPag").removeClass("invisible");
	    		$(".debut").remove();
			})
		},
		suivantPage: function ()
		{
			if(this.nex !== null)
			{
				console.log("Page actuelle" + this.nex);
				this.$http.get(this.nex).then(function(page){
					this.personnages = page.data.results;
					this.nex = page.data.next;
					this.previ = page.data.previous;

					if(this.nex !== null && this.previ !== null)
					{
						$(".nextPag").show();
						$(".prevPag").show();
					}
					else
					{
						$(".nextPag").hide();
					}
				})
			}
			else
			{
				alert("C'est la derniere page");
			}
		},
		dernierePage: function ()
		{
			if(this.previ !== null)
			{
				console.log("Page actuelle" + this.previ);
				this.$http.get(this.previ).then(function(page){
					this.personnages = page.data.results;
					this.previ = page.data.previous;
					this.nex = page.data.next;

					if(this.previ !== null && this.next !== null)
					{
						$(".prevPag").show();
						$(".nextPag").show();
					}
					else
					{
						$(".prevPag").hide();
					}
				})
			}
			else
			{
				alert("Vous êtes à la premiere page");
			}
		},
		creeModal: function(item)
		{
			console.log("Personnage selectionné:   "+item.name);
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
			//"FOR" pour creer les elements de chaque film dans le modal
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