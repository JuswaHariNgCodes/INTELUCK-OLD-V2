
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

    console.log('ORDR-FUNCTIONS-script loaded')

    const selector = document.querySelector.bind(document)
    const selectorAll = document.querySelectorAll.bind(document)

    //GLOBAL VARIABLES
    let submitType = 0;
    let isFormNewOrNot = 1;
    let cardCodeArray = [];
    let itemCodeArray = [];
    let bpAddressesArray = [];
    let moduleName = 'Sales Order';

    let DateFormat = $('#DateFormat').text();
    let TotalsAccuracy = $('#TotalsAccuracy').text();
    let PriceAccuracy = $('#PriceAccuracy').text();
    let RateAccuracy = $('#RateAccuracy').text();
    let AccuracyofQuantities = $('#AccuracyofQuantities').text();
    let PercentageAccuracy = $('#PercentageAccuracy').text(); 
    let MeasuringAccuracy = $('#MeasuringAccuracy').text(); 
    let QueryAccuracy = $('#QueryAccuracy').text(); 


    let UDFWithTableFieldtoBePopulated = '';

    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
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
            // input.css('background-color','#FDEFB2');
        }
    }
    function toggleFocusSelect(input){
        if(input.prop('disabled') == false){
            // input.css('background-color','#FDEFB2');
        }
        
    }
    function toggleBlur(input){
        if(input.prop('readonly') == false){
            input.css('background-color','');
        }else if(input.prop('disabled') == false){
            input.css('background-color','');
        }
    }
    function toggleBlurSelect(input){
        if(input.prop('disabled') == false){
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
    function toggleDisableExceptCardCode(){
        $('#modulebody a.btn').not('#CardCodeDiv  a').addClass('disabled-a-buttons')
        $('#modulebody select').prop('disabled',true)
       
    }
    function toggleRemoveDisableExceptCardCode(){
        $('#modulebody a.btn').not('#CardCodeDiv  a').removeClass('disabled-a-buttons')
        $('#modulebody select').prop('disabled',false)
    }
    function toggleDisableExceptRowVerifier(){
        $('.content-row-selected').find('a:not([data-row-add-verifier=true])').addClass('disabled-a-buttons')
        $('#modulebody tr:not(.content-row-selected)').find('a').addClass('disabled-a-buttons')
        $('#modulebody select').prop('disabled',true)
    
    }
    function toggleRemoveDisableExceptRowVerifier(){
        $('.content-row-selected').find('a').removeClass('disabled-a-buttons')
        $('#modulebody tr:not(.content-row-selected)').find('a').removeClass('disabled-a-buttons')
        $('#modulebody select').prop('disabled',false)
    }
    function toggleValidateAmount(amount,decimal,decimalProperty){
        // if(amount != undefined){
        //     const length = amount.substring(0, amount.indexOf(".")).length;
        // }
        
        if(decimalProperty == 'PercentageAccuracy' && parseFloat(amount.replace(/,/g, '')) > 100.00){
            const result = 'Error'
            return result
        }else{
            const result = accounting.formatMoney(amount, "", decimal);
            return result;
        }
       
    }
    function toggleCrystal(){
        $.ajax({
            method: "GET",
            url: "crystal-trial",
           
            success: function(data){
              
                
            },
            error: function( e ) {
                
            }
        });
    }
    
    function getContentRows(){
        let docType = $('[name="DocType"]').val() 
        $.ajax({
            method: "GET",
            url: "get-content-rows",
            data: {
                docType:docType,
                },
            success: function(data){
                isFormNewOrNot = 0;
                $('#tblContentRows').html(data)
                
            },
            error: function( e ) {
                
            }
        });
    }

    function getContentRowAdd(){
        let docType = $('[name="DocType"]').val() 
        let lastRowNo = parseInt($('#tblContentRows tbody tr:last').find('.rownumber').text().replace(/\s+/g, '')) + 1;
        let lastItemCodeOrGLAccount = $('#tblContentRows tbody tr:last').find('input[data-row-add-verifier="true"]').val()

        console.log($('#tblContentRows tbody tr:last').find('.rownumber').text().replace(/\s+/g, ''))
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
    function getUDFsHeader(){
        $.ajax({
            method: "GET",
            url: "get-udf-header",
            success: function(data){
                $('#udfContainer').html(data)
            },
            error: function( e ) {
                
            }
        });

    }
    function getBusinessPartnerDetails(){
        const cardCode = $('[name="CardCode"]').val() 
        $('.select-to-fill').html('');
        $.ajax({
            method: "GET",
            url: "get-business-partner-details",
            data: {
                cardCode:cardCode
                },
            success: function(data){
                const businessPartnerContactPersonsJSON = JSON.parse(data.businessPartnerContactPersonsJSON);
                console.log(data.businessPartnerContactPersonsJSON)
                let ctr=0
              
                $.each( businessPartnerContactPersonsJSON, function( key, value ) {
                    $('[name="CntctCode"]').append('<option value="'+businessPartnerContactPersonsJSON[ctr]["CntctCode"]+'" >'+businessPartnerContactPersonsJSON[ctr]["Name"]+'</opton>')
                    ctr++;
                });
                const businessPartnerAddressShipTypeJSON = JSON.parse(data.businessPartnerAddressShipTypeJSON);
                console.log(data.businessPartnerAddressShipTypeJSON)
                let ctr1=0
                $.each( businessPartnerAddressShipTypeJSON, function( key, value ) {
                    $('[name="ShipToCode"]').html('<option value="'+businessPartnerAddressShipTypeJSON[ctr1]["AddressS"]+'" >'+businessPartnerAddressShipTypeJSON[ctr1]["AddressS"]+'</opton>')
                    ctr1++;
                });
                const businessPartnerAddressBillTypeJSON = JSON.parse(data.businessPartnerAddressBillTypeJSON);
                console.log(data.businessPartnerAddressBillTypeJSON)
                let ctr2=0
                $.each( businessPartnerAddressBillTypeJSON, function( key, value ) {
                    $('[name="PayToCode"]').html('<option value="'+businessPartnerAddressBillTypeJSON[ctr2]["AddressB"]+'" >'+businessPartnerAddressBillTypeJSON[ctr2]["AddressB"]+'</opton>')
                    ctr2++;
                });
                const businessPartnerDetailsJSON = JSON.parse(data.businessPartnerDetailsJSON);
                console.log(businessPartnerDetailsJSON)
                  $.each( businessPartnerDetailsJSON[0], function( key, value ) {
                      $("[data-default-trigger='getBusinessPartnerDetails()']").each(function (i) {
                          if(key == $(this).attr('data-SQL-field')){
                              $(this).val(value);
                          }
                      });
                  });
                  const shipToCode = $('[name="ShipToCode"]').val()
                  const payToCode = $('[name="PayToCode"]').val()
                  getAddressShipType(cardCode,shipToCode);
                  getAddressBillType(cardCode,payToCode);
            },
            error: function( e ) {
                
            }
        });
        
        $('[name="JrnlMemo"]').val(moduleName + ' - ' + cardCode) 
       
    }
    function getAddressShipType(cardCode,shipToCode){
        $(".shipdetails").val('')
        $.ajax({
            method: "GET",
            url: "get-business-partner-details-address-s-details",
            data: {
                cardCode:cardCode,
                shipToCode:shipToCode
                },
            success: function(data){
                const businessPartnerAddressShipTypeDetailsJSON = JSON.parse(data.businessPartnerAddressShipTypeDetailsJSON);
                console.log(businessPartnerAddressShipTypeDetailsJSON)
                $.each( businessPartnerAddressShipTypeDetailsJSON[0], function( key, value ) {
                    
                    $(".shipdetails").each(function (i) {
                        if(key == $(this).attr('data-SQL-field')){
                            $(this).val(value);
                        }
                    });
                })
                getAddressShipTypeInTextArea();
            },
            error: function( e ) {
                
            }
        });
    }
    function getAddressBillType(cardCode,payToCode){
        $.ajax({
            method: "GET",
            url: "get-business-partner-details-address-b-details",
            data: {
                cardCode:cardCode,
                payToCode:payToCode
                },
            success: function(data){
                const businessPartnerAddressBillTypeDetailsJSON = JSON.parse(data.businessPartnerAddressBillTypeDetailsJSON);
                console.log(businessPartnerAddressBillTypeDetailsJSON)
                $.each( businessPartnerAddressBillTypeDetailsJSON[0], function( key, value ) {
                    
                    $(".billdetails").each(function (i) {
                        if(key == $(this).attr('data-SQL-field')){
                            $(this).val(value);
                        }
                    });
                })
                getAddressBillTypeInTextArea();
            },
            error: function( e ) {
                
            }
        });
    }
    function getAddressShipTypeInTextArea(){
        const ShipToStreet = $('[name="ShipToStreet"]').val();
        const ShipToStreetNo = $('[name="ShipToStreetNo"]').val();
        const ShipToCity = $('[name="ShipToCity"]').val();
        const ShipToZipCode = $('[name="ShipToZipCode"]').val();
        const ShipToState = $('[name="ShipToState"]').val() == null ? '' :  $('[name="ShipToState"]').val();
        const ShipToCountry = $('[name="ShipToCountry"] option:selected').attr('label');
        const ShipToBuilding = $('[name="ShipToBuilding"]').val();
       
        $('[name="Address2"]').val(ShipToBuilding + "/" + ShipToStreetNo + " \n"
                                    + ShipToStreet + " \n"
                                    + ShipToCity + " " + ShipToState + " " + ShipToZipCode + " \n"
                                    + ShipToCountry
        );
    }
    function getAddressBillTypeInTextArea(){
        const BillToStreet = $('[name="BillToStreet"]').val();
        const BillToStreetNo = $('[name="BillToStreetNo"]').val();
        const BillToCity = $('[name="BillToCity"]').val();
        const BillToZipCode = $('[name="BillToZipCode"]').val();
        const BillToState = $('[name="BillToState"]').val() == null ? '' :  $('[name="BillToState"]').val();
        const BillToCountry = $('[name="BillToCountry"] option:selected').attr('label');
        const BillToBuilding = $('[name="BillToBuilding"]').val();
       
        $('[name="Address"]').val(BillToBuilding + "/" + BillToStreetNo + " \n"
                                    + BillToStreet + " \n"
                                    + BillToCity + " " + BillToState + " " + BillToZipCode + " \n"
                                    + BillToCountry
        );
    }
    function getUDFDetails(type,table){

        $.ajax({
            method: "GET",
            url: "get-udf-details",
            data: {
                type:type,
                table:table
                },
            success: function(data){
                $('[name="modalReusableUDF"]').html(data.html) 
                $('[name="modalReusableUDF"]').modal('show')
            
            },
            error: function( e ) {
                
            }
        });
    }
   
    function computeTransactionTotal(){
        
    }
    //################################################### -- END HEADER FUNCTIONS -- ############################################################################################################
       

    function getItemDetails(){
        console.log('it worked!')
        let cardCode = $('[name="CardCode"]').val();
        let itemCode = $('.content-row-selected').find('[name="ItemCode"]').val();
        let thisFunctionName = 'getItemDetails()';
        let id = 'ItemCode'
        console.log(itemCode)
       
        $.ajax({
            method: "GET",
            url: "get-item-details",
            data: {
                cardCode:cardCode,
                itemCode:itemCode
                },
            success: function(data){

                itemDetailsJSON = JSON.parse(data.itemDetailsJSON);
                    setTimeout(function() { 
                        $('.content-row-selected  input[data-function-trigger="'+id+'"], .content-row-selected select[data-function-trigger="'+id+'"').each(function(i, obj) {
                            console.log($(this).attr('data-format'))
                            if($(this).attr('data-format') != ''){
                                let decimalProperty = $(this).attr('data-format')
                                console.log(decimalProperty)
                                let decimal = $('#' + decimalProperty).text()
                                $(this).val(toggleValidateAmount(itemDetailsJSON[0][$(this).attr('name')],decimal))
                            }else{
                                $(this).val(itemDetailsJSON[0][$(this).attr('name')])
                            }
                           

                            if($(this).attr('data-function-details') != '' && $(this).attr('data-function-details') != thisFunctionName){
                                if($(this).attr('data-function-details') !== undefined){
                                    let functionDetails = $(this).attr('data-function-details');
                                    console.log(functionDetails)
                                    eval(functionDetails)
                                }
                            }
                           
                        });  
                    }, 10);
                  
                  
            },
            error: function( e ) {
                
            }
        });
        computeTransactionTotal();
    }

    function getUomDetails(){
        let itemCode = $('.content-row-selected').find('[name="ItemCode"]').val();
        $.ajax({
            method: "GET",
            url: "get-uom-details",
            data: {
                itemCode:itemCode
                },
            success: function(data){
               
                $('#modalUnitOfMeasureList').html(data.html) 
            },
            error: function( e ) {
                
            }
        });
    }

    function getWarehouseDetails(){
        let itemCode = $('.content-row-selected').find('[name="ItemCode"]').val();
        $.ajax({
            method: "GET",
            url: "get-whse-details",
            data: {
                itemCode:itemCode
                },
            success: function(data){
               
                $('#modalWarehouseList').html(data.html) 
               
            },
            error: function( e ) {
                
            }
        });
    }


   function computeTransactionTotal(){
       
        const quantity =  $('.content-row-selected').find('input[name="Quantity"]').val() != '' ? $('.content-row-selected').find('input[name="Quantity"]').val().replace(/,/g, '') : '0.00'; 
        const priceBefDi = $('.content-row-selected').find('input[name="PriceBefDi"]').val() != '' ? $('.content-row-selected').find('input[name="PriceBefDi"]').val().replace(/,/g, '') : '0.00'; 
        const price = $('.content-row-selected').find('input[name="Price"]').val() != '' ? $('.content-row-selected').find('input[name="Price"]').val().replace(/,/g, '') : '0.00';
        const priceAfVat = $('.content-row-selected').find('input[name="PriceAfVat"]').val() != '' ? $('.content-row-selected').find('input[name="PriceAfVat"]').val().replace(/,/g, '') : '0.00'; 
        const discPrcnt = $('.content-row-selected').find('input[name="DiscPrcnt"]').val() != '' ? $('.content-row-selected').find('input[name="DiscPrcnt"]').val().replace(/,/g, '') / 100 : '0.00'; 
        const taxCodeRate = $('.content-row-selected').find('select[name="TaxCode"] option:selected').attr('data-rate');
        const lineTotal = $('.content-row-selected').find('input[name="LineTotal"]').val() != '' ? $('.content-row-selected').find('input[name="LineTotal"]').val().replace(/,/g, '') : '0.00'; 
        const gTotal = $('.content-row-selected').find('input[name="GTotal"]').val() != '' ? $('.content-row-selected').find('input[name="GTotal"]').val().replace(/,/g, '') : '0.00';

        

        
        let quantityFormat =  $('.content-row-selected').find('input[name="Quantity"]').attr('data-format'); 
        let priceBefDiFormat = $('.content-row-selected').find('input[name="PriceBefDi"]').attr('data-format'); 
        let priceFormat = $('.content-row-selected').find('input[name="Price"]').attr('data-format'); 
        let priceAfVatFormat = $('.content-row-selected').find('input[name="PriceAfVat"]').attr('data-format'); 
        let discPrcntFormat = $('.content-row-selected').find('input[name="DiscPrcnt"]').attr('data-format'); 
        let lineTotalFormat = $('.content-row-selected').find('input[name="LineTotal"]').attr('data-format'); 
        let gTotalFormat = $('.content-row-selected').find('input[name="GTotal"]').attr('data-format'); 
      

        let quantityDecimal = $('#' + quantityFormat).text();
        let priceBefDiDecimal = $('#' + priceBefDiFormat).text();
        let priceDecimal = $('#' + priceFormat).text();
        let priceAfVatDecimal = $('#' + priceAfVatFormat).text();
        let discPrcntDecimal = $('#' + discPrcntFormat).text();
        let lineTotalDecimal = $('#' + lineTotalFormat).text();
        let gTotalDecimal = $('#' + gTotalFormat).text();

        const discAmount = (quantity * priceBefDi) * discPrcnt;
        const priceAmount = priceBefDi - discAmount;
        const vatAmount = price * taxCodeRate;
        const priceAfVatAmount = price + (vatAmount / 100);
        const lineTotalAmount = quantity * price;
        const gTotalAmount = quantity * priceAfVat;

        console.log(quantity)
        console.log(priceAfVat)
        console.log(vatAmount)
        console.log(lineTotal)
        console.log(gTotal)
        
        $('.content-row-selected').find('input[name="Price"]').val(toggleValidateAmount(priceAmount.toString(),priceDecimal,priceFormat))
        $('.content-row-selected').find('input[name="PriceAfVat"]').val(toggleValidateAmount(priceAfVatAmount.toString(),priceAfVatDecimal,priceFormat))
        $('.content-row-selected').find('input[name="LineTotal"]').val(toggleValidateAmount(lineTotalAmount.toString(),lineTotalDecimal,lineTotalFormat))
        $('.content-row-selected').find('input[name="GTotal"]').val(toggleValidateAmount(gTotalAmount.toString(),gTotalDecimal,gTotalFormat))

        
    }
    //################################################### -- END CONTENT FUNCTIONS -- ############################################################################################################
         
    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
   