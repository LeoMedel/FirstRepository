
$(document).ready(function(){

        $.get( "https://swapi.co/api/people/?format=json", function( data ) {
            

            for (var i = 0; i < 6; i++)
            {
            	$( ".result"+i+"").html( data.results[i].name);
            	console.log('Personage '+(i+1)+': '+ data.results[i].name);
            }
            
        });
       });




