$(document).ready(function(){
    if(checkexpire() === false)  $("#exportbtn").html("Login to Google Drive");
})

gotodrive = false;
drivecopyid = false;
function clickmaker(){
    if(gotodrive){
        location.href = "https://drive.google.com";
        gotodrive = false;
        return;
    }
    if(localStorage.getItem('ysp_access_token') === null){ 
        console.log('no token');   
        localStorage.setItem("ysp_org_url", "<?php echo htmlspecialchars($dynamic_url) ; ?>");
        gotologin();
    }else if (localStorage.getItem('ysp_access_token') == 'true') {
        console.log('token'); 
        //if(checkexpire() === true){
            console.log('valid'); 
            exportdrive();
        //}else{
            //console.log('expired'); 
            //gotologin();  
        //}    
    }
}

function checkexpire(){
    current = Math.round(new Date().getTime()/1000);
    expire = localStorage.getItem('ysp_access_token_expire');
    console.log(expire);
    console.log(current);
    if((expire !== null) && (expire > current)){
        console.log('not ex');
        return true;
    }else{
        console.log('ex');
        localStorage.removeItem('ysp_access_token');
        localStorage.removeItem('ysp_access_token_expire');
        return false;
    }

}

function exportdrive(){
    var sit = '<?php echo $site; ?>';
    var yspid = <?php echo $res['id']; ?>;//"0BzXhBtT7ip8FS3ptdmYyNHlCZ1k";
    var url = "https://yoteshinportal.org/api/getexport.php"; //"http://yoteshinportal.cf/googleapi/examples/getexport.php";
    data = "s="+sit+"&yspid="+yspid;
    $("#exportbtn").addClass("button-drive-disabled");
    $("#exportbtn").prop("disabled", true);
    $("#exportbtn").html("Checking account...");
    $(".noti-area").html('<img src="https://yoteshinportal.org/assests/loadergrey.gif" width="20px">Please wait...');
    //ga('send', 'event', 'GDrive Helper', 'Try to save', '<?php echo $moviename." - ".$site; ?>'); //Google Analytics Send Events
    $.post(url, data, function(res){
        var resp;
        try{
            resp = $.parseJSON(res); 
        }catch(e){
            $(".noti-area").html("[500] Internal errors occour on server");
            $("#exportbtn").html("Try again later");
        }
        if(resp.status == 'error'){
            
            if(resp.desc == 'not found'){
                $(".noti-area").html("Error occour on server. Requested movie not found");
                $("#exportbtn").html("Try again later");
                ga('send', 'event', 'GDrive Helper', 'Error', 'Error occour on server. Requested movie not found');
                return;
            }else if(resp.desc == 'api_error'){
                $(".noti-area").html("Error occour while connecting to google server");
                ga('send', 'event', 'GDrive Helper', 'Error', 'Error occour while connecting to google server');
            }else if(resp.desc == 'token_not_found'){
                $(".noti-area").html("Session Expired. Please login to google account");
                localStorage.removeItem('ysp_access_token');
                ga('send', 'event', 'GDrive Helper', 'Error', 'Session Expired. Please login to google account');
            }else if(resp.desc.error.code == 403 || resp.desc.error.code == 404){
                $(".noti-area").html(resp.desc.error.message);
                $("#exportbtn").html("Try again later");
                ga('send', 'event', 'GDrive Helper', 'Error', resp.desc.error.message);
                return;
            }else if(resp.desc.error.code == 401){
                $(".noti-area").html(resp.desc.error.message);
                $("#exportbtn").html("Invalid Credentials. Login again and allow permissions");
                localStorage.removeItem('ysp_access_token');
                ga('send', 'event', 'GDrive Helper', 'Error', resp.desc.error.message);
            }else{
                $(".noti-area").html(resp.desc);
                ga('send', 'event', 'GDrive Helper', 'Error', resp.desc.error.message);
            }
            $("#exportbtn").removeClass("button-drive-disabled");
            $("#exportbtn").prop("disabled", false);
            $("#exportbtn").html("Login to Google Drive");
            //localStorage.removeItem('ysp_access_token');
            //alert('Error occour. '+resp.desc);
            return;
        }else if (resp.status == 'success') {
            drivecopyid = resp.copyid;
            localStorage.removeItem('ysp_org_url');
            $(".button-drive").css('background', 'rgb(25, 155, 78)');
            $("#exportbtn").html("Saved!");
            $("#exportbtn").fadeIn(800);
            setTimeout(function(){
                $("#exportbtn").html("Go to Drive");
                $("#exportbtn").removeClass("button-drive-disabled");
                $("#exportbtn").prop("disabled", false);
                $(".noti-area").html("Successfully save to your drive");
                $("#downloadbtn").prop("disabled", false);
                $("#downloadbtn").css("opacity", "1");
                gotodrive = true;
            },1500)
            ga('send', 'event', 'GDrive Helper', 'Saved', "<?php echo $moviename." - ".$site; ?>"); //Google Analytics Send Events
            //alert('Successfully saved to your drive');
        };


    })
}

function gotodownload(){
    if(drivecopyid !== false){
        durl="https://drive.google.com/uc?id="+drivecopyid+"&export=download";
        $("#downloadbtn").prop("disabled", true);
        $("#downloadbtn").css("opacity", "0.7");
        $("#downloadbtn").html("Downloading...");
        location.href = durl;
    }else{
        location.href = "https://drive.google.com";
    }
    
}

var win;
function gotologin(){
    //oauthurl = "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=online&client_id=588371974302-tamr0osm9g6d0tsag5l5ipur8cbofhmc.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fyoteshinportal.cf%2Fapi%2Ftokencallback.php&state&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&approval_prompt=auto";
    ga('send', 'event', 'GDrive Helper', 'Login', 'Go to google login')
    oauthurl = "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&client_id=588371974302-tamr0osm9g6d0tsag5l5ipur8cbofhmc.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fyoteshinportal.org%2Fapi%2Ftokencallback.php&state&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&approval_prompt=force";
    //location.href = oauthurl;
    if(win==undefined){
        win = window.open(oauthurl,'Login to your account','height=700,width=550,toolbar=no,location=no,status=no,menubar=no,addressbar=no;scrollbars=yes,resizable=no');
    }else{
        win.focus();
    }
    checkWindowClosed()    
    return false;
}


function checkWindowClosed(){
    var timer = setInterval(function() {
        if(win.closed) {
        clearInterval(timer);
        //progress();
        popupcloseafter();
        win = undefined;
        }
    }, 1000);
}

function popupcloseafter(){
    if(localStorage.getItem('ysp_access_token') === null){       
        $("#exportbtn").html("Login to Google Drive");
    }else if (localStorage.getItem('ysp_access_token') == 'true'/* && checkexpire() === true*/) {
        $(".noti-area").html("You are logged in. Click save button to keep in your drive");
        $("#exportbtn").html("Save to my drive");
        exportdrive();
    };

}
