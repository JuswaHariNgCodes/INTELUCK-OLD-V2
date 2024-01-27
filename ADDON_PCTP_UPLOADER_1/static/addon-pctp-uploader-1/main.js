
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('PCTP-UPLOADER-1-MAIN-script loaded')
    
    
    
    $(document.body).on('input', 'input[type="file"]', function () 
    { 
       uploadCSV();
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

    $(document.body).on('click', '#btnCancel', function () 
    { 
        toggleReset();
       
    });
  
    $(document.body).on('change', '[name="image_path"]', function (e) 
    {
           let reader = new FileReader();
           let fileName = ew.target.files[0].name;
           reader.onload = (e) => { 
             $('[name="user_pic"]').attr('src', e.target.result); 
             
           }
           reader.readAsDataURL(this.files[0]); 

    });

    //################################################### -- START HEADER FUNCTIONS -- ############################################################################################################
        
    //START SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //ADD
        $(document.body).on('click', '#btnAddConfirm', function (e) 
        {
            rowsToJSONFormat();
            postData();
            
        });

        $(document.body).on('click', '#btnTest', function (e) 
        {
                e.preventDefault();
            var win = window.open('https://localhost:44389/SAPCrystalReport/Layout/Test', '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
        })
    //END SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 

   

      
   
});  
