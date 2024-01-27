
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
$(function () {
    console.log('SIDEBAR-script loaded')
    let modules = $("[name=sidebarmodules]").text();
    let userid = $("[name=userid]").text();
    let baseurl = $("[name=baseurl]").text();
    showModules(userid)
    
    function showModules(userid){
        $.ajax({
            method: "GET",
            url: baseurl + 'get_user_modules',
            data: {
                userid:userid,
                modules:modules
                },
            success: function(data){
                let modules = data.replace(/"/g, "").replace(/'/g, "").replace(/"/g, "").replace(/\[|\]/g, "").trim();
                let userModules = modules.split(", ");
                //ADMIN
                // 'ousr', 'ocon', 'olic', 'oapp', 'oadm', 
                //SALES
                //'oqut', 'ordr', 'odln', 'oinv', 
                //PURCHASING
                //'oprq', 'opor', 'opdn', 
                //BUSINESS PARTNER
                //'ocrd', 
                //INVENTORY
                //'oitm', 'oign', 'oige', 'owtq', 'owtr'
               


                $("a.modules").each(function(i){
                    //console.log(userModules)
                    if( jQuery.inArray( $(this).attr('data-module') , userModules) == -1 ){
                        $(this).addClass('d-none')
                       // console.log($(this).attr('data-module') + '/' + 'restricted!')
                       
                    }else{
                       // console.log($(this).attr('data-module') + '/' + 'not restricted!')
                    }


                });
                



                $("a.adminmodules").each(function(i){
                   // console.log($(this).attr('data-module'))
                    if( jQuery.inArray( $(this).attr('data-module') , userModules) == -1 ){
                        $('#Administration').addClass('d-none')
                       // console.log($(this).attr('data-module') + '/' + 'restricted!')
                       
                    }else{
                       // console.log($(this).attr('data-module') + '/' + 'not restricted!')
                    }
                });
                $("a.salesmodules").each(function(i){
                   // console.log($(this).attr('data-module'))
                    if( jQuery.inArray( $(this).attr('data-module') , userModules) == -1 ){
                        $('#Sales').addClass('d-none')
                       // console.log($(this).attr('data-module') + '/' + 'restricted!')
                       
                    }else{
                       // console.log($(this).attr('data-module') + '/' + 'not restricted!')
                    }
                });
                $("a.purchasingmodules").each(function(i){
                    //console.log($(this).attr('data-module'))
                    if( jQuery.inArray( $(this).attr('data-module') , userModules) == -1 ){
                        $('#Purchasing').addClass('d-none')
                        //console.log($(this).attr('data-module') + '/' + 'restricted!')
                       
                    }else{
                       // console.log($(this).attr('data-module') + '/' + 'not restricted!')
                    }
                });
                $("a.businesspartnermodules").each(function(i){
                   // console.log($(this).attr('data-module'))
                    if( jQuery.inArray( $(this).attr('data-module') , userModules) == -1 ){
                        $('#BusinessPartner').addClass('d-none')
                      // console.log($(this).attr('data-module') + '/' + 'restricted!')
                       
                    }else{
                        //console.log($(this).attr('data-module') + '/' + 'not restricted!')
                    }
                });
                $("a.inventorymodules").each(function(i){
                   // console.log($(this).attr('data-module'))
                    if( jQuery.inArray( $(this).attr('data-module') , userModules) == -1 ){
                        $('#Inventory').addClass('d-none')
                        //console.log($(this).attr('data-module') + '/' + 'restricted!')
                       
                    }else{
                       // console.log($(this).attr('data-module') + '/' + 'not restricted!')
                    }
                });
            },
            error: function( e ) {
                
            }
        });
    }
   
    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    
    //SWEET TOAST

      
   
});  
