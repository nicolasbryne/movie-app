const MEDIA_ITEMS_URL = '//127.0.0.1:3333/dashboard/media-items';


function tmdbShow(){
    $("#autocomplete").show();
}

function tmdbHide(){
    setTimeout(()=> $("#autocomplete").hide(), 100);
}

function setTmdbId(id){
    console.log(id)
    $('#movie input[name="tmdb_id"]').val(id);
}
async function tmdbSearch(type){
    let term = $("#movie_title").val();
    if(!term || term.length < 3) return;
    let queryUrl = type === 1 
        ? `https://api.themoviedb.org/3/search/movie?api_key=06ce019263a2716bce250a7a6624e935&page=1&query=${encodeURIComponent(term)}`
        :`https://api.themoviedb.org/3/search/tv?api_key=06ce019263a2716bce250a7a6624e935&page=1&query=${encodeURIComponent(term)}`
    $("#autocomplete").show();
    $("#data-bind").text(`'${term}'`);
    $("#search").html(`
        <li class="autocomplete-list-item">
            <div class="autocomplete-display-holder mb-3">
                <span class="w-100 text-center"><i class="fa fa-spinner fa-spin"></i></span>
            </div>
        </li>`
    );
    const resp = await $.get(queryUrl)
    console.log(resp);
    if(resp.results && resp.results.length){
        let results = "";
        for(let res of resp.results){
            results += `<a class="autocomplete-item" onClick="setTmdbId(${res.id})"><li class="autocomplete-list-item">
                <div class="autocomplete-display-holder">
                    <div class="list-item-block poster" style="background-image: url('https://image.tmdb.org/t/p/w92${res.poster_path}');"></div>
                    <div class="list-item-block text p-2">
                        <div class="title">
                            ${res.title || res.name}
                        </div>
                        <div class="year text-dark mt-1">
                            (${new Date(res.release_date || res.first_air_date).getFullYear()})
                        </div>
                    </div>
                </div>
            </li></a>`
        }    
        $("#search").html(results)
    }else{
        $("#search").html(
            `<li class="autocomplete-list-item">
                <div class="autocomplete-display-holder">
                    <div class="list-item-block text">
                        Title is not found!
                    </div>
                </div>
             </li>`
        )
    }

}

$('document').ready(function(){
    console.log($('#movie input[name="tmdb_id"]'))
    $('#movie_title').on("keyup", function(e) {
        if (e.keyCode == 13) {
            tmdbSearch(1);
        }
    });

    $('#movie').on('keyup keypress', function(e) {
        console.log('catch')
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) { 
            console.log('pre')
          e.preventDefault();
          e.stopPropagation()
          return false;
        }
    });

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

        $.post(MEDIA_ITEMS_URL, formData)
            .done((resp)=>{
                btn.before('<p class="text-success"><i class="fa fa-check-circle mr-2"></i>Successfully added</p>');
                setTimeout(()=> btn.prev().remove(), 2500);
                form.reset();
            }).fail((resp)=>{
                btn.before('<p class="text-danger"><i class="fa fa-times-circle mr-2"></i>Error occoured! Please try again later</p>');
                setTimeout(()=> btn.prev().remove(), 6000)
            }).always((resp)=> {
                btn.attr('disabled', false).prev().prev().remove();
                form.classList.remove('was-validated');
            });
    });


    $("#tv_show").on("submit", function( event ) {
        const form = this;

        event.preventDefault()
        event.stopPropagation()

        form.classList.add('was-validated');

        if (form.checkValidity() === false) {
            return
        }

        const btn = $("#tv_showbtnSubmit");
        btn.attr('disabled', true).before("<i class='fa fa-spinner fa-spin text-info'></i>");
    
        const formData = $( this ).serialize() 
        console.log( formData );



        $.post(MEDIA_ITEMS_URL, formData)
            .done((resp)=>{
                btn.before('<p class="text-success"><i class="fa fa-check-circle mr-2"></i>Successfully added</p>');
                setTimeout(()=> btn.prev().remove(), 2500);
                form.reset();
            }).fail((resp)=>{
                btn.before('<p class="text-danger"><i class="fa fa-times-circle mr-2"></i>Error occoured! Please try again later</p>');
                setTimeout(()=> btn.prev().remove(), 6000)
            }).always((resp)=> {
                btn.attr('disabled', false).prev().prev().remove();
                form.classList.remove('was-validated');
            });
    });
})
