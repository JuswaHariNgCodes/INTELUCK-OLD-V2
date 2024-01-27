
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
$(function () {
    console.log('OADM-script loaded')
    //GLOBAL VARIABLES
    let submitType = 0;
    let isFormNewOrNot = 1;
    let module = $('li a.module-tab.active').attr('id')
    console.log(module)
    //START PAGE SETTERS -------------------------------------------------------------------------------------------------------------------------------------------------------
        getAdminContentRows(module);
    //END PAGE SETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------

    //START DBLCLICK -------------------------------------------------------------------------------------------------------------------------------------------------------
        // SELECT EMPLOYEE
        $(document.body).on('dblclick', '#tblEmployee tbody tr', function () 
        {
            let empId = $(this).children('td.item-1').text();
            let lastName = $(this).children('td.item-2').text();
            let firstName = $(this).children('td.item-3').text();
            let middleName = ($(this).children('td.item-4').text() == 'null') ? '' : $(this).children('td.item-4').text();
            let email = $(this).children('td.item-5').text();
            let jobTitle = $(this).children('td.item-6').text();

            let name = lastName + ' ,' + firstName + ' ' + middleName;
            $('[name="emp_id"]').val(empId);
            $('[name="name"]').val(name);
            $('[name="email"]').val(email);

            $('#modalEmployeeList').modal('hide');
        });
        // SELECT USER
        $(document.body).on('dblclick', '#tblUser tbody tr', function () 
        {
            let selectedUser= $(this).closest('tr').find('td.item-1').text();
            getSelectedUser(selectedUser);
        
            $('#modalUserList').modal('hide');
        });
    //END DBLCLICK --------------------------------------------------------------------------------------------------------------------------------------------------------
 
    //START CLICK -----------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document.body).on('click', 'input[type="file"]', function () 
    { 
        //$('#image_path').css('background-color','#FDEFB2');
        
    });
    $(document.body).on('click', '.card-footer > button', function () 
    { 
        let type = $(this).val();
        console.log('Submit type = ' + type)
        submitType=type
    });
  
    
    $(document.body).on('click', '#documentAdd', function () 
    { 
        $('#userDetails').find('input').val('').prop('readonly', false);
        $("#user-pic").attr('src', 'assets/img/user-profile-pictures/default.jpg');
        $('#userDetails').find('.toggle-visible').removeClass('d-none');
        $('#btnAddConfirm').removeClass('d-none');
        $('#btnUpdateConfirm').addClass('d-none');
    });
    
    $(document.body).on('click', '#btnEdit', function () 
    { 
        toggleEditableFields();
    });

    $(document.body).on('click', '#btnCancel', function () 
    { 
        toggleReset();
       
    });
    //END CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //START CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //END CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //START CHANGE ------------------------------------------------------------------------------------------------------------------------------------------------------------
    
        $(document.body).on('change', '[name="DocType"]', function (e) 
        {
            const module = $('li a.module-tab.active').attr('id')
            console.log(module)
            getAdminContentRows(module);
        });

    //END CHANGE ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    //################################################### -- START CONTENT FUNCTIONS -- ############################################################################################################
        // START CHANGE TAB 
        $(document.body).on('click', 'li a.module-tab', function (e) 
        {
            const module = $(this).attr('id')
            console.log(module)
            getAdminContentRows(module);
        });

        

        // END CHANGE TAB
        // START REQUIRED FIELDS
        $(document.body).on('blur', '.required', function (e) 
        {
            const module = $('li a.module-tab.active').attr('id')
            let value = $(this).val();
            let rowAddVerifier = $(this).attr('data-row-add-verifier')
      
            if(rowAddVerifier == 'true'){
                if(value != ''){
                    
                    if(jQuery.inArray(value, eval(validValues)) !== -1){
                        console.log(functionDetails)
                        eval(functionDetails)
                        toggleRemoveDisableExceptRowVerifier();
                        getAdminContentRowAdd(module);
                    }
                    else{
                        $(modal).modal('show')
                        toggleDisableExceptRowVerifier();
                        $(this).focus();
                    }
                
                }else{
                    toggleDisableExceptRowVerifier();
                    $(this).focus();
                }
               
            }
        
        });
        // END REQUIRED FIELDS
    //################################################### -- END CONTENT FUNCTIONS -- ############################################################################################################
       
    //START SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //ADD
        $(document.body).on('submit', '#OADMForm', function (e) 
        {
            e.preventDefault();
            console.log('trying to post....')
            const activeTab = $('.module-type-tab.active').attr('id')
            const activeSubTab = $('.sub-tab.active').attr('id')
            const docType = $('.module-type-tab.active').find('select[name="DocType"]').val()
            const contentRowsArray = []; 
		    
            console.log(activeTab)
            console.log(activeSubTab)
            console.log(docType)
            let error = 0;
            $('#tblContentRows tbody tr').each(function (i) 
            {
                const otArr = [];
                let position = $(this).find('td input[name="position"]').val()
                let width = $(this).find('td input[name="width"]').val()
                let id = $(this).find('td input[name="id"]').val()
                let name = $(this).find('td input[name="name"]').val()
                if(position != '' && width != '' && id != '' && name != ''){
                    $(this).find('td input.editable-text, td select.editable-text').each(function (i) 
                    {
                    
                            const itArr = [];
                            if($(this).attr('name') == 'width'){
                                itArr.push('"' + $(this).attr('name')  + '"' + ":" +  '"' + $(this).val().toString() + 'px"')
                            }else{
                                itArr.push('"' + $(this).attr('name')  + '"' + ":" +  '"' + $(this).val() + '"')
                            }
    
                            otArr.push(itArr.join(','));
                    
                    })
    
                    const jsonRow =  '{' + otArr + '}'
                
                    const newJSON = JSON.stringify( $.parseJSON(jsonRow) );
                    contentRowsArray.push(newJSON);
                }
                
               
              
                
            });
            if(error == 0){
                const contentRows = '[' + contentRowsArray + ']'
                $.ajax({
                    url: 'post-content-rows',
                    method: "POST",
                    headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                    data: {
                        activeTab:activeTab,
                        activeSubTab:activeSubTab,
                        docType:docType,
                        contentRows:contentRows
                    },
                    success:function(response)
                    {
                        console.log(response.message)
                       
                      
    
                    
                    },
                        error: function(response) {
                            console.log(response)
                           
                    }
                });
            }else{
               
            }
          
        });
    //END SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 

    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
    
    
    function getAdminContentRows(module){
       
        let docType = $('[name="DocType"]').val() 
        $.ajax({
            method: "GET",
            url: "get-admin-content-rows",
            data: {
                module:module,
                docType:docType,
                },
            success: function(data){
                isFormNewOrNot = 0;
                $('#tblContentRows').html(data)
                getAdminContentRowAdd(module);
                
            },
            error: function( e ) {
                
            }
        });
    }
    function getAdminContentRowAdd(module){
        let docType = $('[name="DocType"]').val() 
        let lastRowNo = parseInt($('#tblContentRows tbody tr:last').find('.rownumber').text().replace(/\s+/g, '')) + 1;
        
            $.ajax({
                method: "GET",
                url: "get-admin-content-rows-add",
                data: {
                    module:module,
                    docType:docType,
                    lastRowNo: lastRowNo
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
   
           
    function toggleErrorToast(errorMessage){
        toastr.error(errorMessage,'Error')
    }
    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    
    //SWEET TOAST

      
   
});  
