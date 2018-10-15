$('document').ready(function(){
    /* $('#movie').validate({
        messages: {
            required : 'test'
        }
    }) */
    $("#movie").on("submit", function( event ) {
        console.log(this)
        const form = $("#movie");

        if (form[0].checkValidity() === false) {
            console.log('her')
            event.preventDefault()
            event.stopPropagation()
        }
        console.log(form[0])
        form.addClass('was-validated');
        event.preventDefault()
        event.stopPropagation()
        //return;
        //event.preventDefault();
        const formData = $( this ).serialize() 
        console.log( formData );

        const url = '//127.0.0.1:3333/dashboard/media-items';
        $.post(url , formData).done(console.log).fail(console.error);
    });
})
