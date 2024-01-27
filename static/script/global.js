$(function () {
    console.log('GLOBAL-script loaded')


   //START PAGE SETTERS -------------------------------------------------------------------------------------------------------------------------------------------------------
   let dateFormat = $('#DateFormat').text()

    
    // $(".default-date").datetimepicker({
    //     dateFormat: dateFormat
    // }).datetimepicker('setDate', date)
    /** add active class and stay opened when selected */
    var url = window.location;

    // for sidebar menu entirely but not cover treeview
    $('ul.nav-sidebar a').filter(function() {
        return this.href == url;
    }).addClass('active');

    // for treeview
    $('ul.nav-treeview a').filter(function() {
        return this.href == url;
    }).parentsUntil(".nav-sidebar > .nav-treeview").addClass('menu-open').prev('a').addClass('active');

  
   

  


    //END PAGE SETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------

    //START DATE--------------------------------------------------------------------------------------------------------------------------------------------------------

    $(document.body).on('change', '.datetimepicker-input', function (e) 
    {
         

    });

    //END DATE--------------------------------------------------------------------------------------------------------------------------------------------------------

    //################################################### -- START CONTENT FUNCTIONS -- ############################################################################################################
    //SELECTING ROW ON MAIN CONTENTS    
    $(document.body).on('focus', '.row-input', function () 
    {
        // Remove selected class from any row
        $('#tblContentRows tbody tr').removeClass('content-row-selected')

        // Assign selected class to clicked row
        $(this).closest('tr').addClass('content-row-selected')
                
    });
    $(document.body).on('click', '.rownumber', function () 
    {
        
        // Remove selected class from any row
        $('#tblContentRows tbody tr').removeClass('content-row-selected')

        // Assign selected class to clicked row
        $(this).closest('tr').addClass('content-row-selected')
                
    });
    $(document.body).on('click', '#tblContentRows > tbody tr > td > div.input-group', function () 
	{
		
       // Remove selected class from any row
       $('#tblContentRows tbody tr').removeClass('content-row-selected')

       // Assign selected class to clicked row
       $(this).closest('tr').addClass('content-row-selected')
		
    });
    //SELECTING ROW ON MAIN CONTENTS    



    //SELECTING ROW ON POD CONTENTS    
    $(document.body).on('focus', '.row-input', function () 
    {
        // Remove selected class from any row
        $('#tblContentRowsPOD tbody tr').removeClass('content-row-selected-pod')

        // Assign selected class to clicked row
        $(this).closest('tr').addClass('content-row-selected-pod')
                
    });
    $(document.body).on('click', '.rownumber', function () 
    {
        
        // Remove selected class from any row
        $('#tblContentRowsPOD tbody tr').removeClass('content-row-selected-pod')

        // Assign selected class to clicked row
        $(this).closest('tr').addClass('content-row-selected-pod')
                
    });
    $(document.body).on('click', '#tblContentRowsPOD > tbody tr > td > div.input-group', function () 
	{
		
       // Remove selected class from any row
       $('#tblContentRowsPOD tbody tr').removeClass('content-row-selected-pod')

       // Assign selected class to clicked row
       $(this).closest('tr').addClass('content-row-selected-pod')
		
    });
    //SELECTING ROW ON POD CONTENTS    
    //################################################### -- END CONTENT FUNCTIONS -- ############################################################################################################
    

    
    function toggleRemoveDisableExceptRowVerifier(){
        $('.content-row-selected').find('a').removeClass('disabled-a-buttons')
        $('#modulebody tr:not(.content-row-selected)').find('a').removeClass('disabled-a-buttons')
        $('#modulebody select').prop('disabled',false)
    }


})
//################################################### -- START GLOBAL FUNCTIONS -- ############################################################################################################
    

    function toggleSuccessToast(message){
        toastr.success(message,'Success')
    }
    function toggleErrorToast(message){
        toastr.error(message,'Error')
    }
    function toggleContentTableScrollBottom(){
        $("#ContentRows").animate({ scrollTop: $(document).height() }, 1000);
    }
    function getContentRowAdd(){
        let docType = $('[name="DocType"]').val() 
        let lastRowNo = parseInt($('#tblContentRows tbody tr:last').find('.rownumber').text().replace(/\s+/g, '')) + 1;
        let lastItemCodeOrGLAccount = $('#tblContentRows tbody tr:last').find('input[data-row-add-verifier="true"]').val()

        console.log(docType)

        if(lastItemCodeOrGLAccount != ''){
            $.ajax({
                method: "GET",
                url: "get-content-rows-add",
                data: {
                    docType:docType,
                    lastRowNo:lastRowNo
                    },
                success: function(data){
                   
                    isFormNewOrNot = 0;
                    $('#tblContentRows tbody').append(data)
                    toggleContentTableScrollBottom();
                
                },
                error: function( e ) {
                    
                }
            });
        }
            
    }