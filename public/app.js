$('document').ready(function(){

    $("#movie").on("submit", function( event ) {
        const form = this;

        event.preventDefault()
        event.stopPropagation()

        form.classList.add('was-validated');

        if (form.checkValidity() === false) {
            return
        }

        const btn = $("#moviebtnSubmit");
        btn.attr('disabled', true).before("<i class='fa fa-spinner fa-spin text-info'></i>");
    
        const formData = $( this ).serialize() 
        console.log( formData );

        const url = '//127.0.0.1:3333/dashboard/media-items';

        $.post(url , formData)
            .done((resp)=>{
                btn.before('<p class="text-success"><i class="fa fa-check-circle mr-2"></i>Successfully added</p>');
                setTimeout(()=> btn.prev().remove(), 2500)
            }).fail((resp)=>{
                btn.before('<p class="text-danger"><i class="fa fa-times-circle mr-2"></i>Error occoured! Please try again later</p>');
                setTimeout(()=> btn.prev().remove(), 3000)
            }).always((resp)=> {
                btn.attr('disabled', false).prev().prev().remove();
                form.classList.remove('was-validated');
                form.reset();
            });
    });
})
