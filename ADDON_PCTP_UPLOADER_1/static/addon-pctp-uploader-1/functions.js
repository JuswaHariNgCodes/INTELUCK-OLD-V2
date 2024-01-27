
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

    console.log('PCTP-UPLOADER-1-FUNCTIONS-script loaded')

    const selector = document.querySelector.bind(document)
    const selectorAll = document.querySelectorAll.bind(document)
    let contentTable
    //GLOBAL VARIABLES
    let submitType = 0;
    let isFormNewOrNot = 1;
    let cardCodeArray = [];
    let itemCodeArray = [];
    let bpAddressesArray = [];
    let moduleName = 'PCTP Uploader 1';

    let DateFormat = $('#DateFormat').text();
    let TotalsAccuracy = $('#TotalsAccuracy').text();
    let PriceAccuracy = $('#PriceAccuracy').text();
    let RateAccuracy = $('#RateAccuracy').text();
    let AccuracyofQuantities = $('#AccuracyofQuantities').text();
    let PercentageAccuracy = $('#PercentageAccuracy').text(); 
    let MeasuringAccuracy = $('#MeasuringAccuracy').text(); 
    let QueryAccuracy = $('#QueryAccuracy').text(); 


    let UDFWithTableFieldtoBePopulated = '';


    let otArrItem = [];
    let otArrPOD = [];   		 

    let otArrRowsItem = [];
    let otArrRowsPOD = [];
    let otArrRowsBilling = [];
    let otArrRowsTP = [];
    let otArrRowsPricing = [];

    let otItemCount = 0;
    let otArrPODNotNullCells = [];
    let otArrPODNotNullCellsRow = [];
    let otArrPODNotNullCellsTotal = 0;
    let otArrPODNotNullCellsTotalWithFailed = 0;
    let notNullCouterRows = 0;

    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //################################################### -- START TOGGLE FUNCTIONS -- ############################################################################################################
        
    //################################################### -- END TOGGLE FUNCTIONS -- ############################################################################################################


    //################################################### -- START SUBMIT FUNCTIONS -- ############################################################################################################
        //FILE UPLOAD
        function uploadCSV(){
            if ($.fn.dataTable.isDataTable('#tblContentRows')) {
                $('#tblContentRows').DataTable().clear().destroy();
            }
            const file=$('#csvFile').prop('files')[0];
            console.log(file)
            formData= new FormData();
            formData.append("csvFile", file);

            $.ajax({
                url: 'post-pctp-uploader-1-upload-csv',
                method: "POST",
                headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                data: formData,
                processData: false,
                contentType: false,
                success:function(response)
                {   
                    message = 'CSV File Uploaded!';
                    toggleSuccessToast(message);

                    console.log(response)
                    
                    html = JSON.parse(response.html);
                    
                    
                    requiredValues = JSON.parse(response.requiredValues);
                    invalidValues = JSON.parse(response.invalidValues);
                    invalidDate = JSON.parse(response.invalidDate);

                    existingValues = JSON.parse(response.existingValues);
                    existingValuesPOD = JSON.parse(response.existingValuesPOD);
                    existingValuesBilling = JSON.parse(response.existingValuesBilling);
                    existingValuesTP = JSON.parse(response.existingValuesTP);
                    existingValuesPricing = JSON.parse(response.existingValuesPricing);

                    notUniqueValues = JSON.parse(response.notUniqueValues);

                    postableItem = JSON.parse(response.postableItem);
                    postablePOD = JSON.parse(response.postablePOD);

                    ready = JSON.parse(response.ready);
                    failed = JSON.parse(response.failed);
                    count = JSON.parse(response.count);
                    
                    
                    $('#tblContentRows').html(html)

                    $('#requiredValues').text(requiredValues)
                    $('#invalidValues').text(invalidValues)
                    $('#invalidDate').text(invalidDate)

                    $('#existingValues').text(existingValues)
                    $('#existingValuesPOD').text(existingValuesPOD)
                    $('#existingValuesBilling').text(existingValuesBilling)
                    $('#existingValuesTP').text(existingValuesTP)
                    $('#existingValuesPricing').text(existingValuesPricing)

                    $('#notUniqueValues').text(notUniqueValues)

                    $('#postableItem').text(postableItem)
                    $('#postablePOD').text(postablePOD)

                    $('#ready').text(ready)
                    $('#failed').text(failed)
                    $('#count').text(count)
                    
                    
                
                

                
                },
                error: function(response) {
                    message = 'Cannot Read CSV File!';
                    toggleErrorToast(message);
                    
                },
                complete: function(response) {
                    InitializeTblContentsDatatable();
                }
            });
        }
        // POST ROWS TO PCTP TABLES
        function postData(){
            
            console.log(otArrRowsItem)
            console.log(otArrRowsPOD)
            console.log(otArrRowsBilling)
            console.log(otArrRowsTP)
            console.log(otArrRowsPricing)
            if(otArrRowsItem.length == 0 && 
                otArrRowsPOD.length == 0 &&
                otArrRowsBilling.length == 0 &&
                otArrRowsTP.length == 0 &&
                otArrRowsPricing.length == 0
                ){
                    message = 'Rows posted already!';
                    toggleSuccessToast(message);
            }else{
                $('#modalLoading').modal('show');
                $.ajax({
                    url: '/api/pctp-post-tables',
                    type: "POST",
                    dataType: "JSON",
                    data: JSON.stringify({
                        otArrRowsItem:otArrRowsItem,
                        otArrRowsPOD: otArrRowsPOD,
                        otArrRowsBilling: otArrRowsBilling,
                        otArrRowsTP: otArrRowsTP,
                        otArrRowsPricing: otArrRowsPricing
                    }),
                    success: (data) => {
                    console.log(data);
                    },
                    error: (error) => {
                    console.log(error);
                    },
                    complete: (data) =>{
                        message = 'Posting complete!';
                        toggleSuccessToast(message);
                        $('#modalLoading').modal('hide');
 
                        uploadCSV();
                        
                    }
                });
            }
        }   
        function rowsToJSONFormat(){

            var dataTable = $('#tblContentRows').dataTable()
            var rowInArray = 0;
            otArrRowsItem = [];
            otArrRowsPOD = [];
            otArrRowsBilling = [];
            otArrRowsTP = [];
            otArrRowsPricing = [];
            $(dataTable.fnGetNodes()).each(function(i)
            {
        
                    let itArrRowsItem = [];
                    let itArrRowsPOD = [];
                    let itArrRowsBilling = [];
                    let itArrRowsTP = [];
                    let itArrRowsPricing = [];
        
                    notNullCouterRows = 0;
                    notNullCouterRowsButFailed = 0;
                    let notNullCouter = 0;
                    console.log( $(this).find("td:eq(0) i.item").html() + ' :item')
                    console.log( $(this).find("td:eq(0) i.pod").html() + ' :pod')
                    console.log( $(this).find("td:eq(0) i.billing").html() + ' :billing')
                    console.log( $(this).find("td:eq(0) i.tp").html() + ' :tp')
                    console.log( $(this).find("td:eq(0) i.pricing").html() + ' :pricing')

                    console.log(typeof($(this).find("td:eq(0) i.pod").html()))
                    console.log(typeof($(this).find("td:eq(0) i.tp").html()))
                    // POD
                    if($(this).find("td:eq(1)").text() == 'READY!'){
                        console.log($(this).find("td:eq(1)").text())
                        
                        // ItemCode
                        // ItemName
                        // InventoryItem

                        if($(this).find("td:eq(2)").text() != '' && $(this).find("td:eq(0) i.item").html() == undefined){
                            itArrRowsItem.push('"' + 'ItemCode' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                            itArrRowsItem.push('"' + 'ItemName' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                            itArrRowsItem.push('"' + 'InventoryItem' + '"' + ":" +  '"' + 'N' + '"')	
                            itArrRowsItem.push('"' + 'ItemsGroupCode' + '"' + ":" +  103)
                        }					
                        otArrRowsItem.push('{' + itArrRowsItem.join(',') + '}'); 

                        
        
                        if($(this).find("td:eq(2)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_bookingdate' + '"' + ":" + '"' + $(this).find("td:eq(2)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')					
                            itArrRowsPOD.push('"' + 'name' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(3)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_bookingnumber' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(4)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_clientname' + '"' + ":" + '"' + $(this).find("td:eq(4)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(5)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                                itArrRowsPOD.push('"' + 'u_sapclient' + '"' + ":" + '"' + $(this).find("td:eq(5)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(6)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_truckername' + '"' + ":" + '"' + $(this).find("td:eq(6)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(7)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_saptrucker' + '"' + ":" + '"' + $(this).find("td:eq(7)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(8)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_platenumber' + '"' + ":" + '"' + $(this).find("td:eq(8)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')     
                        }
                        if($(this).find("td:eq(9)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                        itArrRowsPOD.push('"' + 'u_vehicletypecap' + '"' + ":" + '"' + $(this).find("td:eq(9)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(10)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_deliveryorigin' + '"' + ":" + '"' + $(this).find("td:eq(10)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(11)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_destination' + '"' + ":" + '"' + $(this).find("td:eq(11)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(12)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_deliverystatus' + '"' + ":" + '"' + $(this).find("td:eq(12)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(13)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_deliverydatedtr' + '"' + ":" + '"' + $(this).find("td:eq(13)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')			
                        }
                        if($(this).find("td:eq(14)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_noofdrops' + '"' + ":" +  $(this).find("td:eq(14)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") )
                        }
                        if($(this).find("td:eq(15)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_triptype' + '"' + ":" + '"' + $(this).find("td:eq(15) select").val() + '"')
                        }
                        if($(this).find("td:eq(16)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_remarks' + '"' + ":" + '"' + $(this).find("td:eq(16)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(17)").text() != '' && $(this).find("td:eq(0) i.pod").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_docnum' + '"' + ":" + '"' + $(this).find("td:eq(17)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        otArrRowsPOD.push('{' + itArrRowsPOD.join(',') + '}'); 
                        // otArrRowsPOD.push(JSON.stringify(itArrRowsPOD)); 
                        otArrPODNotNullCellsRow.push(notNullCouterRows);


                        // BILLING
                        if($(this).find("td:eq(2)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_bookingdate' + '"' + ":" + '"' + $(this).find("td:eq(2)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')					
                            itArrRowsBilling.push('"' + 'name' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                            itArrRowsBilling.push('"' + 'u_podnum' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')					
                         
                        }
                        if($(this).find("td:eq(3)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_bookingid' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(4)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_customername' + '"' + ":" + '"' + $(this).find("td:eq(4)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(5)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                                itArrRowsBilling.push('"' + 'u_sapclient' + '"' + ":" + '"' + $(this).find("td:eq(5)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(8)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_platenumber' + '"' + ":" + '"' + $(this).find("td:eq(8)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')     
                        }
                        if($(this).find("td:eq(9)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                        itArrRowsBilling.push('"' + 'u_vehicletypecap' + '"' + ":" + '"' + $(this).find("td:eq(9)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(10)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_deliveryorigin' + '"' + ":" + '"' + $(this).find("td:eq(10)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(11)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_destination' + '"' + ":" + '"' + $(this).find("td:eq(11)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(12)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_deliverystatus' + '"' + ":" + '"' + $(this).find("td:eq(12)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(13)").text() != '' && $(this).find("td:eq(0) i.billing").html() == undefined){
                            itArrRowsBilling.push('"' + 'u_deliverydatepod' + '"' + ":" + '"' + $(this).find("td:eq(13)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')			
                        }
                        otArrRowsBilling.push('{' + itArrRowsBilling.join(',') + '}'); 

                        // TP
                        if($(this).find("td:eq(2)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsTP.push('"' + 'u_bookingdate' + '"' + ":" + '"' + $(this).find("td:eq(2)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')					
                            itArrRowsTP.push('"' + 'name' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                            itArrRowsTP.push('"' + 'u_podnum' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                          
                        }
                        if($(this).find("td:eq(3)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsTP.push('"' + 'u_bookingid' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(4)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_clientname' + '"' + ":" + '"' + $(this).find("td:eq(4)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(6)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_truckername' + '"' + ":" + '"' + $(this).find("td:eq(6)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(7)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsPOD.push('"' + 'u_truckersap' + '"' + ":" + '"' + $(this).find("td:eq(7)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(9)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsTP.push('"' + 'u_vehicletypecap' + '"' + ":" + '"' + $(this).find("td:eq(9)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(10)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsTP.push('"' + 'u_deliveryorigin' + '"' + ":" + '"' + $(this).find("td:eq(10)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(12)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsTP.push('"' + 'u_deliverystatus' + '"' + ":" + '"' + $(this).find("td:eq(12)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(13)").text() != '' && $(this).find("td:eq(0) i.tp").html() == undefined){
                            itArrRowsTP.push('"' + 'u_deliverydatepod' + '"' + ":" + '"' + $(this).find("td:eq(13)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')			
                        }
                        otArrRowsTP.push('{' + itArrRowsTP.join(',') + '}'); 

                        // PRICING
                        if($(this).find("td:eq(2)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_bookingdate' + '"' + ":" + '"' + $(this).find("td:eq(2)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')					
                            itArrRowsPricing.push('"' + 'name' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                            itArrRowsPricing.push('"' + 'u_podnum' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                          
                        }
                        if($(this).find("td:eq(3)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_bookingid' + '"' + ":" + '"' + $(this).find("td:eq(3)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(4)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_customername' + '"' + ":" + '"' + $(this).find("td:eq(4)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(5)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_clienttag' + '"' + ":" + '"' + $(this).find("td:eq(5)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(6)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_truckername' + '"' + ":" + '"' + $(this).find("td:eq(6)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(7)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_truckertag' + '"' + ":" + '"' + $(this).find("td:eq(7)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(9)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                        itArrRowsPricing.push('"' + 'u_vehicletypecap' + '"' + ":" + '"' + $(this).find("td:eq(9)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(10)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_deliveryorigin' + '"' + ":" + '"' + $(this).find("td:eq(10)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(11)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_destination' + '"' + ":" + '"' + $(this).find("td:eq(11)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(12)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_deliverystatus' + '"' + ":" + '"' + $(this).find("td:eq(12)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        if($(this).find("td:eq(16)").text() != '' && $(this).find("td:eq(0) i.pricing").html() == undefined){
                            itArrRowsPricing.push('"' + 'u_remarkspod' + '"' + ":" + '"' + $(this).find("td:eq(16)").text().replace(/,/g, '').replace(/"/g, '').replace(/(\r\n|\n|\r)/gm, '').replace(/\t/g, ' ').replace(/'/g,"''").replace(/\\/g,"") + '"')
                        }
                        
                        otArrRowsPricing.push('{' + itArrRowsPricing.join(',') + '}'); 
                    

                    }
                });
                console.log(otArrRowsPOD)
            }          
    //################################################### -- END SUBMIT FUNCTIONS -- ############################################################################################################
    const postedMessage = '<span style="color:#0275D8"><b>POSTED!</b></span>';
    const successMessage = '<span style="color:#023020"><b>READY!</b></span>';
    const failedMessage = '<span class="text-danger"><b>FAILED!</b></span>';
    const requiredValueIcon = '<i class="fa-solid fa-triangle-exclamation text-danger" style="background-color:white;border: 3px #DC3545 solid; border-radius:50%; padding:3px"></i>';
    const invalidValueIcon = '<i class="fa-solid fa-triangle-exclamation" style="background-color:white;color: #964B00;border: 3px #964B00 solid; border-radius:50%; padding:3px"></i>';
    const invalidDateIcon = '<i class="fa-solid fa-triangle-exclamation" style="background-color:white;color: #FFC107;border: 3px #FFC107 solid; border-radius:50%; padding:3px"></i>';
    
    const existingValueIcon = '<i class="fa-solid fa-triangle-exclamation item" style="background-color:white;color: #0275D8;border: 3px #0275D8 solid; border-radius:50%; padding:3px"></i>';
    const existingValuePODIcon = '<i class="fa-solid fa-triangle-exclamation pod" style="background-color:white;color: #A020F0;border: 3px #A020F0 solid; border-radius:50%; padding:3px"></i>';
    const existingValueBillingIcon = '<i class="fa-solid fa-triangle-exclamation billing" style="background-color:white;color: #9ACD32;border: 3px #9ACD32 solid; border-radius:50%; padding:3px"></i>';
    const existingValueTPIcon = '<i class="fa-solid fa-triangle-exclamation tp" style="background-color:white;color: #87CEEB;border: 3px #87CEEB solid; border-radius:50%; padding:3px"></i>';
    const existingValuePricingIcon = '<i class="fa-solid fa-triangle-exclamation pricing" style="background-color:white;color: #FF00FF;border: 3px #FF00FF solid; border-radius:50%; padding:3px"></i>';
    
    const notUniqueValueIcon = '<i class="fa-solid fa-triangle-exclamation" style="background-color:white;color: black;border: 3px black solid; border-radius:50%; padding:3px"></i>';
    
    
    function InitializeTblContentsDatatable(){
        if ($.fn.dataTable.isDataTable('#tblContentRows')) {
        
        }
        else {
        // Initialize the dataTable
        setTimeout(function() { 
            contentTable = $("#tblContentRows").DataTable({
            "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
            "scrollX": true,
            "columnDefs": [
                {
                    targets: 1,
                    render: function (data, type, row) {
                        // if(data.includes('- InvalidValue')){
                        let newValue = data.replace("InvalidValue", invalidValueIcon + ' ,')
                                            .replace("RequiredValue", requiredValueIcon + ' ,')
                                            .replace("ItemExistingValue", existingValueIcon + ' ,')
                                            .replace("PODExistingValue", existingValuePODIcon + ' ,')
                                            .replace("BillingExistingValue", existingValueBillingIcon + ' ,')
                                            .replace("TPExistingValue", existingValueTPIcon + ' ,')
                                            .replace("PricingExistingValue", existingValuePricingIcon + ' ,')
                                            .replace("NotUniqueValue", notUniqueValueIcon + ' ,')
                                            .replace("InvalidDate", invalidDateIcon + ' ,');

                        return newValue;
                        // }
                        // return data;
                    }
                },
                {
                    targets: 2,
                    render: function (data, type, row) {
                        if(data.includes('FAILED!')){
                            const newValue = data.replace("FAILED!", failedMessage);
                            return newValue;
                        }else if(data.includes('POSTED!')){
                            const newValue = data.replace("POSTED!", postedMessage);
                            return newValue;
                        }else{
                            const newValue = data.replace("READY!", successMessage);
                            return newValue;
                        }
                        return data;
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row) {
                       
                            const newValue = data.replace("- InvalidDate", invalidDateIcon);
                            return newValue;
                       
                    }
                },
                {
                    targets: 4,
                    render: function (data, type, row) {
                       
                            const newValue = data.replace("- RequiredValue", requiredValueIcon)
                                                // .replace("- ItemExisting", existingValueIcon)
                                                // .replace("- PODExisting", existingValuePODIcon)
                                                .replace("- NotUnique", notUniqueValueIcon);
                            return newValue;
                       
                    }
                },
                {
                    targets: 6,
                    render: function (data, type, row) {
                            const newValue = data.replace("- InvalidValue", invalidValueIcon);
                            const newValue2 = newValue.replace("- RequiredValue", requiredValueIcon);
                            return newValue2
                    }
                },
                {
                    targets: 8,
                    render: function (data, type, row) {
                        const newValue = data.replace("- InvalidValue", invalidValueIcon);
                        const newValue2 = newValue.replace("- RequiredValue", requiredValueIcon);
                        return newValue2
                    }
                },
                {
                    targets: 10,
                    render: function (data, type, row) {
                        const newValue = data.replace("- InvalidValue", invalidValueIcon);
                        return newValue;
                    }
                }
            ],
            // td colour changes
            "createdRow": function( row, data, dataIndex ) {
                    if(data[2].includes('FAILED!')){
                        $(row).closest('tr').find('td').css('background-color', '#FFCCCB');
                    }else if(data[2].includes('POSTED!')){
                        $(row).closest('tr').find('td').css('background-color', '#D4EBF2');
                    }else{
                        $(row).closest('tr').find('td').css('background-color', '#BCF5BC');
                        $(row).closest('tr').addClass('ready');
                    }

                    
                }
            }).buttons().container().appendTo('#tblContentRows .col-md-6:eq(0)');

            
     
        },100);
    }
        setTimeout(function() { 
            $('#tblContentRows').removeClass('d-none');
        },600);
    }     
    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
   