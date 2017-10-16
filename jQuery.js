
$(document).ready(function(){

        $.get( "https://swapi.co/api/people/?format=json", function( data ) {
            $( ".result" ).html( data.name);

            for (var i = 0; i < 6; i++)
            {
            	console.log('Personage '+(i+1)+': '+ data.results[i].name);
            }
            

        });
       });
