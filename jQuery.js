
$(document).ready(function(){

        $.get( "https://swapi.co/api/people/1/?format=json", function( data ) {
            $( ".result" ).html( data.name );
        });
       });