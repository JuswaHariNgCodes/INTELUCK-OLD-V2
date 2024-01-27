
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('PCTP-WINDOW-script loaded')
    
    
   
    $('.dateP').datetimepicker();

    $('.dupli').on( 'click', function(e){
    var dup = $('.cpy').first().clone();
    $('.table').append( dup );
    $('.dateP').datetimepicker();
    });
    let activeTabGlobal = 'summaryTab';
    
    toggleValidateDateFormatDefaults();
    $(document.body).on('click', '.card-footer > button', function () 
    { 
        let type = $(this).val();
        console.log('Submit type = ' + type)
        submitType=type
    });
  
    

    $(document.body).on('click', '#btnCancel', function () 
    { 
        toggleReset();
       
    });

   
  
    //################################################### -- START HEADER FUNCTIONS -- ############################################################################################################
    // START CLICK 
        $(document.body).on('click', '#btnPctpWindowSearch', function (e) 
        {
            submitPctpSearch(activeTabGlobal)
            
        });

        $(document.body).on('click', '.content-tab', function (e) 
        {
            const activeTab = $(this).attr('id');
            activeTabGlobal = activeTab
            console.log(activeTab)

        });
    // END CLICK
    // START CHANGE
        $(document.body).on('change', '#chkBoxFreezePane', function (e) 
        {
        
            if( $('#chkBoxFreezePane').prop("checked") == true){
                    
                    toggleFreezePain('On')
                }
                else{
                    toggleFreezePain('Off')
                }
        });    
    // END CHANGE
    
    //START SUBMIT
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
    //END SUBMIT
    //################################################### -- END HEADER FUNCTIONS -- ############################################################################################################    
   

    //################################################### -- START CONTENTS FUNCTIONS -- ############################################################################################################
        // START CHANGE
        $(document.body).on('change', '#chkBoxFreezePane', function (e) 
        {
        
            if( $('#chkBoxFreezePane').prop("checked") == true){
                    
                    toggleFreezePain('On')
                }
                else{
                    toggleFreezePain('Off')
                }
        });    
        // END CHANGE
    //################################################### -- END CONTENTS FUNCTIONS -- ############################################################################################################
      
   
});  
