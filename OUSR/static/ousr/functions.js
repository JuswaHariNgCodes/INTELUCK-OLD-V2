
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

console.log('OUSR-FUNCTIONS-script loaded')
    //GLOBAL VARIABLES
    submitType = 0;
    isFormNewOrNot = 1;
    selectedAvatarImage = 'user-profile-pictures/Avatar6.png';

    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
   
    //TOGGLE 
    function toggleOnlyForViewing(){
        $('.submit-buttons').addClass('d-none');
        $('input').prop('readonly', 'readonly');
        $('input[type="checkbox"]').prop('disabled', 'disabled');
        $('.editable-button').prop('disabled', 'disabled');
        $('.editable-file').prop('disabled', 'disabled');
        $('.uneditable-button').prop('disabled', 'disabled');
        $('input[type="password"]').val('********');
    }
    function toggleReadyForUpdate(){
        $('#btnAdd').addClass('d-none');
        $('#btnUpdate').removeClass('d-none');
        $('.editable').prop('readonly', '');
    }
    function toggleEditableFields(){
        if(isFormNewOrNot == 0){
            $('.editable').prop('readonly', '');
            $('.editable-checkbox').prop('disabled', '');
            $('.editable-button').prop('disabled', '');
            $('.editable-file').prop('disabled', '');
            $('.uneditable-button').prop('disabled', 'disabled');
            $('.editable-submit-button').removeClass('d-none');
            $('.fresh-submit-button').addClass('d-none');
        }
        
    }
    function toggleFreshFields(){
        $('.editable').prop("readonly", true);
        $('.editable-submit-button').addClass('d-none');
        $('.fresh-submit-button').addClass('d-none');
    }
    function toggleFocus(input){
        if(input.prop('readonly') == false){
            input.css('background-color','#FDEFB2');
        }
        
    }
    function toggleBlur(input){
        if(input.prop('readonly') == false){
            input.css('background-color','');
        }
    }
    function toggleReset(){
        isFormNewOrNot = 1;
        $('#OUSRForm').trigger("reset");
        $('[name="user_pic"]').attr('src', "/media/user-profile-pictures/default.jpg");
        $('#btnAddConfirm').removeClass('d-none');
        $('#btnUpdateConfirm').addClass('d-none');
        $('.uneditable').prop('readonly', '');
        $('.editable').prop('readonly', '');
        $('.editable-checkbox').prop('disabled', '');
        $('.editable-button').prop('disabled', '');
        $('.uneditable-button').prop('disabled', '');
        $('.editable-file').prop('disabled', '');
      
    }
    //TOGGLE 
    
    function getSelectedUser(selectedUser){
        $.ajax({
            method: "GET",
            url: "get-user-profile",
            data: {
                selectedUser:selectedUser,
                },
            success: function(data){
                isFormNewOrNot = 0;

                $('[name="id"]').val(data.user_id)
                $('[name="username"]').val(data.user_username)
                $('[name="emp_id"]').val(data.sapb1_employee_id)
                $('[name="emp_id"]').parent().find('button')
                $('[name="name"]').val(data.user_empname)
                //$('[name="password"]').val('********')
                $('[name="email"]').val(data.user_email)
                // $('[name="user_pic"]').attr('src', '/static/media/' + data.user_profilepic);
                alert(data.user_profilepic)
                getSelectedAvatar(data.user_profilepic)
                console.log($('[name="user_pic"]').attr('src'))
                if(data.user_superuser == 1){
                    $('[name=superuser]').prop('checked', true);
                }
                if(data.user_locked == 1){
                    $('[name=locked]').prop('checked', true);
                }
                let userModulesString = data.user_modules.replace(/"/g, "").replace(/'/g, "").replace(/\[|\]/g, "").trim();
                let userModules = userModulesString.split(", ");
                $("input:checkbox[name=modules]").each(function(i){
                    console.log(userModules)
                    console.log(userModules[i] + '/' + $(this).attr('id'))
                    if( jQuery.inArray($(this).attr('id'), userModules) !== -1 ){
                        $(this).prop('checked', true);
                        i+1;
                    }
                });
                
                toggleOnlyForViewing();
                
            },
            error: function( e ) {
                
            }
        });
    }

    
    function selectedAvatar(selectedAvatarValue,selectedAvatarId){
        selectedAvatarImage = selectedAvatarValue;
        $(".avatar-choices").each(function(i){
            if($(this).attr('data-id') == selectedAvatarId){
                $(this).removeClass('d-none')
            }
            else{
                $(this).addClass('d-none')
            }
        });
    }

    function getSelectedAvatar(selectedAvatarDataPath){
        $(".avatar-choices").each(function(i){
            if($(this).attr('data-path') == selectedAvatarDataPath){
                $(this).removeClass('d-none')
            }
            else{
                $(this).addClass('d-none')
            }
        });
    }
    

    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    