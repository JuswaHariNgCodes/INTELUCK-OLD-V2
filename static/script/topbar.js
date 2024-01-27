
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
$(function () {
    console.log('TOPBAR-script loaded')
    let userid = $("[name=userid]").text();
    let baseurl = $("[name=baseurl]").text();
    let enableSAPModuleTopBarButtons = $('#enableSAPModuleTopBarButtons').text()

    if(enableSAPModuleTopBarButtons == 'N'){
        toggleDisableSapB1TopBarFeatures()
    }else{
        toggleEnableSapB1TopBarFeatures()
    }
    //START CLICK -----------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document.body).on('click', '#btnConfirmLogout', function () 
    { 
        logout();
    });
    
    //END CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
   
    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
    
    function toggleDisableSapB1TopBarFeatures(){
        // $('a.sapb1-modules').attr('disabled','disabled')
        $('a.sapb1-modules').addClass('disabled-sapb1-topbar-buttons')
    }
    function toggleEnableSapB1TopBarFeatures(){
        // $('a.sapb1-modules').attr('disabled','disabled')
        $('a.sapb1-modules').removeClass('disabled-sapb1-topbar-buttons')
    }


    function logout(userid){
        $.ajax({
            method: "GET",
            url: baseurl + 'logout',
            data: {
                userid:userid,
                },
            success: function(data){
                console.log(data);
                location.reload();
            },
            error: function( e ) {
                
            }
        });
    }

    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 

      
   
});  
