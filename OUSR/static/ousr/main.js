
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
document.addEventListener('DOMContentLoaded', () => {
    console.log('OUSR-MAIN-script loaded')
    
    
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
    $(document.body).on('focus', 'input', function () 
    { 
        let input = $(this);
        toggleFocus(input);
    });
    $(document.body).on('blur', 'input', function () 
    { 
        let input = $(this);
        toggleBlur(input);
    });
    //START CLICK -----------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document.body).on('click', 'input[type="file"]', function () 
    { 
        //$('#image_path').css('background-color','#FDEFB2');
        
    });
    $(document.body).on('click', '.submit-buttons', function () 
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

    $(document.body).on('click', '.avatar-selection', function () 
    { 
        
        const selectedAvatarValue = $(this).attr('data-value')
        const selectedAvatarId = $(this).attr('id')
        selectedAvatar(selectedAvatarValue,selectedAvatarId);
       
    });
    //END CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //START CLICK ------------------------------------------------------------------------------------------------------------------------------------------------------------
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
            console.log('trying to post....')
            alert(selectedAvatarImage + ' ETO')
            let modulesArray = [];
            $("input:checkbox[name=modules]:checked").each(function(){
                modulesArray.push($(this).attr('id'));
            });
            let modulesString = modulesArray.toString();
           
            formdata.append('modules', modulesString);
            formdata.append('submitType',submitType);
            formdata.append('useravatar', selectedAvatarImage);


            for (var pair of formdata.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log(modulesString)
            console.log(formdata)
            $.ajax({
                url: 'post-ousr',
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
                            if(response.submittype == '1'){
                                toggleOnlyForViewing();
                            }else if(response.submittype == '2'){
                                toggleReset();
                            }
                            
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

    
    //SWEET TOAST

      
   
});  
