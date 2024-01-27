
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
$(function () {
    console.log('OUSR-script loaded')
    //START DBLCLICK -------------------------------------------------------------------------------------------------------------------------------------------------------
        // SELECT EMPLOYEE
        $(document.body).on('dblclick', '#tblEmployee tbody tr', function () 
        {
            let empId = $(this).children('td.item-1').text();
            let lastName = $(this).children('td.item-2').text();
            let firstName = $(this).children('td.item-3').text();
            let middleName = ($(this).children('td.item-4').text() == 'null') ? '' : $(this).children('td.item-4').text();
            let jobTitle = $(this).children('td.item-5').text();

            let name = lastName + ' ,' + firstName + ' ' + middleName;
            $('[name="emp_id"]').val(empId);
            $('[name="name"]').val(name);

            $('#modalEmployeeList').modal('hide');
        });
        // SELECT USER
        $(document.body).on('dblclick', '#tblUser tbody tr', function () 
        {
            let selectedUser= $(this).closest('tr').find('td.item-1').text();
            showSelectedUser(selectedUser);
        
            $('#modalUserList').modal('hide');
        });
    //END DBLCLICK -----------------------------------------------------------------------------------------------------------------------------------------------------------
    
    //START CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
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

    $(document.body).on('click', '#btnCancelProgress', function () 
    { 
        reset();
       
    });
    //END CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------

    //START CHANGE ------------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document.body).on('change', '[name="image_path"]', function (ew) 
    {
           let reader = new FileReader();
           let fileName = ew.target.files[0].name;
           reader.onload = (e) => { 
             $('[name="user_pic"]').attr('src', e.target.result); 
             
           }
           reader.readAsDataURL(this.files[0]); 

    });
    //END CHANGE ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    
    //START SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //ADD
        $(document.body).on('submit', '#OUSRForm', function (e) 
        {
            e.preventDefault();
            let formdata = new FormData(this);
            console.log(formdata)
            console.log('trying to post....')
            let url = $(this).attr('action');
            let modulesArray = [];
            $("input:checkbox[name=modules]:checked").each(function(){
                modulesArray.push($(this).attr('id'));
            });
            let modulesString = modulesArray.toString();
            formdata.append('modules', modulesString);
            for (var pair of formdata.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log(modules)
            $.ajax({
                url: url,
                method: "POST",
                headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                data: formdata,
                processData: false,
                contentType: false,
                success:function(response)
                {
                    console.log(response.message)
                    if(response.type == 'Success'){
                        $('#modal-success').modal('show')
                        $('#modal-success-body').text(response.message)
                        
                        setTimeout(function() { 
                            $('#modal-success').modal('hide')
                            reset();
                        }, 3000);
                    }else{
                        $('#modal-danger').modal('show')
                        $('#modal-danger-body').text(response.message)
                        
                        setTimeout(function() { 
                            $('#modal-danger').modal('hide')
                        }, 3000);
                    }
                  

                
                },
                    error: function(response) {
                        console.log(response)
                       
                }
            });
        });
    //END SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 

    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
    function toggleEditableFields(){
        $('.editable-text').prop("disabled", false).css('background-color','#FDEFB2');
        $('.editable-checkbox').prop("disabled", false);
        $('.editable-text-button').prop("disabled", false);
        $('.editable-submit-button').removeClass('d-none');
        $('.fresh-submit-button').addClass('d-none');
    }

    function toggleFreshFields(){
        $('.editable-text').prop("disabled", true).css('background-color','');
        $('.editable-checkbox').prop("disabled", true);
        $('.editable-text-button').prop("disabled", true);
        $('.editable-submit-button').addClass('d-none');
        $('.fresh-submit-button').addClass('d-none');
    }
    
    function showSelectedUser(selectedUser){
        $.ajax({
            method: "GET",
            url: "user-profile",
            data: {
                selectedUser:selectedUser,
                },
            success: function(data){
                console.log(data)
                $.each(data, function(key,valueObj){
                    $('[name="id"]').val(valueObj.id)
                    $('[name="username"]').val(valueObj.username)
                    $('[name="emp_id"]').val(valueObj.emp_id)
                    $('[name="name"]').val(valueObj.name)
                    $('[name="password"]').val('********')
                    $('[name="email"]').val(valueObj.email)
                    $('[name="user_pic"]').attr('src', 'assets/img/user-profile-pictures/' + valueObj.image_path);

                    if(valueObj.superuser == 1){
                        $('[name=superuser]').prop('checked', true);
                    }
                    if(valueObj.locked == 1){
                        $('[name=locked]').prop('checked', true);
                    }
                    
                    let userModules = valueObj.modules.split(","); 
                    $("input:checkbox[name=modules]").each(function(i){
                        console.log(valueObj.modules)
                        console.log(userModules[i] + '/' + $(this).attr('id'))
                        if( jQuery.inArray($(this).attr('id'), userModules) !== -1 ){
                            $(this).prop('checked', true);
                            i+1;
                        }
                    });
                    
                    //.prop('checked', true);
                });
            },
            error: function( e ) {
                
            }
        });
    }
    
    

    function reset(){
        $('#OUSRForm').trigger("reset");
        $('[name="user_pic"]').attr('src', "{{('assets/img/user-profile-pictures/default.jpg')}}");
        $('#btnAddConfirm').removeClass('d-none');
        $('#btnUpdateConfirm').addClass('d-none');
    }

    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    
    //SWEET TOAST

      
   
});  
