$('document').ready(function(){
    /* $('#movie').validate({
        messages: {
            required : 'test'
        }
    }) */
    $( "#movie" ).on( "submit", function( event ) {
        event.preventDefault();
        const formData = $( this ).serialize() 
        console.log( formData );

        const url = '//127.0.0.1:3333/dashboard/media-items';
        $.post(url , formData).done(console.log).fail(console.error);
    });
})
