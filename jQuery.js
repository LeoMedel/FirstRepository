

var nPer = 1;
var nFilms = 4;

$.ajax({
	url: "https://swapi.co/api/people/?format=json",
	type: 'GET',
	dataType: 'json',
	success: function(personnage)
	{
		for (var i = 0; i < nPer; i++)
        {

        	$("#but").attr("type", personnage.next);
        	
        	$(".result"+i).append("<h4 class = 'nom"+i+"'></h4>");
            $( ".nom"+i).html( personnage.results[i].name);
            $(".list-group").append("<button type='button' class='list-group-item list-group-item-action', data-toggle='modal', data-target='#myModal'>"+personnage.results[i].name+"</button>");
            
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
            


            console.log('Personage '+i+': '+ personnage.results[i].name);



            for(var e = 0; e< nFilms; e++)
            {
            	$.ajax({
					url: personnage.results[i].films[e],
					type: 'GET',
					dataType: 'json',
					success: function(films)
					{
						$(".film").append(
							"<p class='films'>"+films.title+"</p>");

						console.log('title du film '+films.title);

					}
				})
            }
        }
	}
})













            






