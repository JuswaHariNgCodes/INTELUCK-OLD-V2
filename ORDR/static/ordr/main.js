//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('ORDR-MAIN-script loaded')
    
    //START PAGE SETTERS -------------------------------------------------------------------------------------------------------------------------------------------------------
        getContentRows();
        getUDFsHeader();
        document.getElementById('input[name="CardCode"]').focus();
        // .css('background-color','#fdefb2');
        setTimeout(function() { 

            toggleDisableExceptCardCode();
            
        }, 500);
        
        // ************ FOR REMOVAL DUE TO SLOW PERFORMANCE WHEN MANY DATA ********************************************
        // CARDCODE VALID VALUES ARRAY
        let cardCodes = document.querySelectorAll('[name="CardCodeQueryResult"] option');

        cardCodes.forEach(function (cardCode, index) {
            cardCodeArray.push(cardCode);
        });
        // ITEMCODE VALID VALUES ARRAY
        $('[name="ItemCodeQueryResult"] option').each( function(i) {
            itemCodeArray.push($(this).val());
        });
        // ************ FOR REMOVAL DUE TO SLOW PERFORMANCE WHEN MANY DATA ********************************************
       
    //END PAGE SETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------
    //START DBLCLICK -------------------------------------------------------------------------------------------------------------------------------------------------------
   
    //END DBLCLICK --------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document.body).on('focus', 'input', function () 
    { 
        let input = $(this);
        toggleFocus(input);
    });
    $(document.body).on('focus', 'select', function () 
    { 
        let input = $(this);
        toggleFocusSelect(input);
    });
    $(document.body).on('blur', 'input, select', function () 
    { 
        let input = $(this);
        toggleBlur(input);
    });
    $(document.body).on('blur', 'select', function () 
    { 
        let input = $(this);
        toggleBlurSelect(input);
    });
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
    
    $(document.body).on('click', '#btnAddConfirm', function () 
    { 
        toggleCrystal();
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
    //START KEYUP / KEYDOWN ----------------------------------------------------------------------------------------------------------------------------------------------------
     
    //START KEYUP / KEYDOWN ----------------------------------------------------------------------------------------------------------------------------------------------------
    //START CHANGE ------------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document.body).on('change', '[name="image_path"]', function (e) 
    {
           let reader = new FileReader();
           let fileName = ew.target.files[0].name;
           reader.onload = (e) => { 
             $('[name="user_pic"]').attr('src', e.target.result); 
             
           }
           reader.readAsDataURL(this.files[0]); 

    });
    $(document.body).on('change', '[name="DocType"]', function (e) 
    {
        getContentRows();
    });
    $(document.body).on('change', '[name="ShipToCode"]', function (e) 
    {
        const cardCode = $('[name="CardCode"]').val() 
        const shipToCode = $('[name="ShipToCode"]').val()
        getAddressShipType(cardCode,shipToCode);
    });
    $(document.body).on('change', '[name="PayToCode"]', function (e) 
    {
        const cardCode = $('[name="CardCode"]').val() 
        const payToCode = $('[name="PayToCode"]').val()
        getAddressBillType(cardCode,payToCode);
    });

    //################################################### -- START HEADER FUNCTIONS -- ############################################################################################################
        //START CARDCODE ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
            $(document.body).on('keyup focus change', '[name="CardCode"]', function (e) 
            {
                let list = $(this).attr('list');
                let value = $(this).val();
                let fieldName = $(this).attr('data-name');
                if(value == ''){
                    $('[name="' + list + '"]').attr('id','');
                    console.log($('[name="' + list + '"]').attr('id'));
                    if($("#modulebody a.btn").not('#CardCodeDiv  a').hasClass("disabled-a-buttons")) {
                    
                    }else{
                        errorMessage = 'Business Partner is required!';
                        toggleDisableExceptCardCode();
                        toggleErrorToast(errorMessage);
                    }
                }else{
                    $('[name="' + list + '"]').attr('id',list);
                    // let cardName = $('[name="' + list + '"] option[value="' + value + '"]').attr("label")
                    // $('[name="' + fieldName + '"]').val(cardName);
                    if(jQuery.inArray(value, cardCodeArray) !== -1){
                    
                        if($("#modulebody a.btn").not('#CardCodeDiv  a').hasClass("disabled-a-buttons")) {
                            toggleRemoveDisableExceptCardCode();
                            //DATE FORMAT
                            var date = new Date();

                            $('.default-date-group').datetimepicker({
                                format: DateFormat,
                                date: new Date()
                            });

                            $('.date-group').datetimepicker({
                                format: DateFormat,
                            });
                            
                        }
                    }
                }
            });
            $(document.body).on('blur', '[name="CardCode"]', function (e) 
            {
                let value = $(this).val();
                let list = $(this).attr('list');
                let fieldName = $(this).attr('data-name');
                let modal = $(this).attr('data-modal-id')
            
                if(value != ''){
                    
                    if(jQuery.inArray(value, cardCodeArray) !== -1){
                        getBusinessPartnerDetails();
                        if($("#modulebody a.btn").not('#CardCodeDiv  a').hasClass("disabled-a-buttons")) {
                            toggleRemoveDisableExceptCardCode();
                        }
                       
                    }
                    else{
                        $(modal).modal('show')
                        if($("#modulebody a.btn").not('#CardCodeDiv  a').hasClass("disabled-a-buttons")) {
                        
                        }else{
                            errorMessage = 'Business Partner is required!';
                            toggleDisableExceptCardCode();
                            toggleErrorToast(errorMessage);
                        }
                        $(this).focus();
                    }
                
            }else{
                    $(this).focus();
                    errorMessage = 'Business Partner is required!';
                    toggleDisableExceptCardCode();
            }
            
            });
            $(document.body).on('dblclick', '#tblBusinessPartner tbody tr', function () 
            {
                let selected= $(this).closest('tr').find('td.item-1').text();
                $('[name="CardCode"]').val(selected);
                getBusinessPartnerDetails();
            
                $('#modalBusinessPartnerList').modal('hide');
            });
        //END CARDCODE ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //START SHIP ADDRESS DETAILS ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        $(document.body).on('click', '#btnShipToDetailsUpdate', function () 
        {
            getAddressShipTypeInTextArea();
        });
        //END SHIP ADDRESS DETAILS ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //START BILL ADDRESS DETAILS ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        $(document.body).on('click', '#btnBillToDetailsUpdate', function () 
        {
            getAddressBillTypeInTextArea();
        });
        //END BILL ADDRESS DETAILS ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //START UDF AMOUNTS ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        $(document.body).on('blur',"input.amount", function ()
        {   
            let decimalProperty = $(this).attr('data-format')
            console.log($(this).attr('data-format'))
            console.log($(this).attr('id'))
            let decimal = $('#' + decimalProperty).text()
            $(this).val(toggleValidateAmount($(this).val(),decimal))
        })
        //END UDF AMOUNTS ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //START UDF DATA FROM TABLE ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        $(document.body).on('dblclick',"#tblUDF tbody > tr", function ()
        {   
            const value = $(this).children('td.item-1').text();
            $('[name="'+ UDFWithTableFieldtoBePopulated +'"]').val(value)
            $('[name="modalReusableUDF"]').modal('hide')
           
        })
        //END UDF DATA FROM TABLE ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        
    //################################################### -- END HEADER FUNCTIONS -- ############################################################################################################
    //################################################### -- START CONTENT FUNCTIONS -- ############################################################################################################
        //START ITEMCODE
            $(document.body).on('change', '.row-input-with-search', function (e) 
            {
                let value = $(this).val();
                let list = $(this).attr('list');
                let fieldName = $(this).attr('data-name');
                let modal = $(this).attr('data-modal-id')
                let validValues = $(this).attr('data-valid-values')
                let functionDetails = $(this).attr('data-function-details')
                let rowAddVerifier = $(this).attr('data-row-add-verifier')
                let errorMessage = 'Field required!'
                if(rowAddVerifier == 'true'){
                    if(value != ''){
                        
                        if(jQuery.inArray(value, eval(validValues)) !== -1){
                            toggleRemoveDisableExceptRowVerifier();
                            
                        }
                        else{
                            toggleDisableExceptRowVerifier();
                            toastr.error(errorMessage)
                            $(this).focus();
                        }
                    }else{
                        toggleDisableExceptRowVerifier();
                        toastr.error(errorMessage)
                        $(this).focus();
                    
                    }
                }
            });    
           
            $(document.body).on('blur', '.row-input-with-search', function (e){
                let value = $(this).val();
                let list = $(this).attr('list');
                let fieldName = $(this).attr('data-name');
                let modal = $(this).attr('data-modal-id')
                let validValues = $(this).attr('data-valid-values')
                let functionDetails = $(this).attr('data-function-details')
                let rowAddVerifier = $(this).attr('data-row-add-verifier')
                 
                if(rowAddVerifier == 'true'){
                    if(value != ''){
                        
                        if(jQuery.inArray(value, eval(validValues)) !== -1){
                            console.log(functionDetails)
                            eval(functionDetails)
                            toggleRemoveDisableExceptRowVerifier();
                            getContentRowAdd();
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
            $(document.body).on('dblclick', '#tblItem tbody tr', function () 
            {
                let selected= $(this).closest('tr').find('td.item-1').text();
                $('[name="CardCode"]').val(selected);
               // getBusinessPartnerDetails();
            
                $('#modalBusinessPartnerList').modal('hide');
            });
        //END ITEMCODE

        //START AMOUNTS
            $(document.body).on('blur',".content-row-selected input.amount", function ()
            {   
                let decimalProperty = $(this).attr('data-format')
                console.log(decimalProperty)
                let decimal = $('#' + decimalProperty).text()

                if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                    errorMessage = 'Invalid discount percentage!';
                    toggleErrorToast(errorMessage);
                    $(this).val($(this).val())
                    $(this).focus()
                }else{
                    $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                }
            })
        //END AMOUNTS
        //START QUANTITY
         $(document.body).on('blur',".content-row-selected input[name=Quantity]", function ()
         {   
             let decimalProperty = $(this).attr('data-format')
             let decimal = $('#' + decimalProperty).text()
             if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                 errorMessage = 'Invalid amount!';
                 toggleErrorToast(errorMessage);
                 $(this).val($(this).val())
                 $(this).focus()
             }else{
                 $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                 computeTransactionTotal();
             }
         })
        //END QUANTITY
        //START PRICE
         $(document.body).on('blur',".content-row-selected input[name=Price]", function ()
         {   
             let decimalProperty = $(this).attr('data-format')
             let decimal = $('#' + decimalProperty).text()
             if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                 errorMessage = 'Invalid amount!';
                 toggleErrorToast(errorMessage);
                 $(this).val($(this).val())
                 $(this).focus()
             }else{
                 $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                 computeTransactionTotal();
             }
         })
        //END PRICE
        //START PRICE BEFORE DISCOUNT
        $(document.body).on('blur',".content-row-selected input[name=PriceBefDi]", function ()
        {   
            let decimalProperty = $(this).attr('data-format')
            let decimal = $('#' + decimalProperty).text()
            if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                errorMessage = 'Invalid amount!';
                toggleErrorToast(errorMessage);
                $(this).val($(this).val())
                $(this).focus()
            }else{
                $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                computeTransactionTotal();
            }
        })
        //END PRICE BEFORE DISCOUNT
        //START PRICE AFTER VAT
            $(document.body).on('change',".content-row-selected input[name=PriceAfVat]", function ()
            {   
                let decimalProperty = $(this).attr('data-format')
                let decimal = $('#' + decimalProperty).text()
                if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                    errorMessage = 'Invalid amount!';
                    toggleErrorToast(errorMessage);
                    $(this).val($(this).val())
                    $(this).focus()
                }else{
                    $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                    computeTransactionTotal();
                }
            })
        //END PRICE AFTER VAT
        //START DISCOUNT PERCENT
        $(document.body).on('change',".content-row-selected input[name=DiscPrcnt]", function ()
        {   
            let decimalProperty = $(this).attr('data-format')
            let decimal = $('#' + decimalProperty).text()
            if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                errorMessage = 'Invalid amount!';
                toggleErrorToast(errorMessage);
                $(this).val($(this).val())
                $(this).focus()
            }else{
                $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                computeTransactionTotal();
            }
        })
        //END DISCOUNT PERCENT
        //START LINE TOTAL
        $(document.body).on('change',".content-row-selected input[name=LineTotal]", function ()
        {   
            let decimalProperty = $(this).attr('data-format')
            let decimal = $('#' + decimalProperty).text()
            if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                errorMessage = 'Invalid amount!';
                toggleErrorToast(errorMessage);
                $(this).val($(this).val())
                $(this).focus()
            }else{
                $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                computeTransactionTotal();
            }
        })
        //END LINE TOTAL
        //START GROSS TOTAL
        $(document.body).on('change',".content-row-selected input[name=GTotal]", function ()
        {   
            let decimalProperty = $(this).attr('data-format')
            let decimal = $('#' + decimalProperty).text()
            if(toggleValidateAmount($(this).val(),decimal,decimalProperty) == 'Error'){
                errorMessage = 'Invalid amount!';
                toggleErrorToast(errorMessage);
                $(this).val($(this).val())
                $(this).focus()
            }else{
                $(this).val(toggleValidateAmount($(this).val(),decimal,decimalProperty))
                computeTransactionTotal();
            }
        })
        //END GROSS TOTAL
        
        
        //START UNIT OF MEASURE
        $(document.body).on('dblclick', '#tblUnitOfMeasure tbody tr', function () 
        {
            const code = $(this).closest('tr').find('td.item-1').text();
            const name = $(this).closest('tr').find('td.item-2').text();
            
            $('.content-row-selected').find('[name="UomCode"]').val(code);
            $('.content-row-selected').find('[name="UomName"]').val(name);

            $('#modalUnitOfMeasureList').modal('hide');
        });
        //END UNIT OF MEASURE

        //START WAREHOUSE
         $(document.body).on('dblclick', '#tblWarehouse tbody tr', function () 
         {
            const code = $(this).closest('tr').find('td.item-1').text();
            const name = $(this).closest('tr').find('td.item-2').text();
            
            $('.content-row-selected').find('[name="WhsCode"]').val(code);
            $('.content-row-selected').find('[name="WhsName"]').val(name);

            $('#modalWarehouseList').modal('hide');
         });
        //END WAREHOUSE
        
    //################################################### -- END CONTENT FUNCTIONS -- ############################################################################################################
           
    //START SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //ADD
        $(document.body).on('submit', '#OUSRForm', function (e) 
        {
            e.preventDefault();


            let formdata = new FormData(this);
            console.log('trying to post....')
           
            let modulesArray = [];
            $("input:checkbox[name=modules]:checked").each(function(){
                modulesArray.push($(this).attr('id'));
            });
            let modulesString = modulesArray.toString();
           
            formdata.append('modules', modulesString);
            formdata.append('submitType',submitType);
            for (var pair of formdata.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log(modulesString)
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
                            toggleReset();
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
