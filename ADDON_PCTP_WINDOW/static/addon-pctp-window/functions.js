
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
//  IDs ARE FOR DI API

    console.log('PCTP-WINDOW-FUNCTIONS-script loaded')

    const selector = document.querySelector.bind(document)
    const selectorAll = document.querySelectorAll.bind(document)
    let contentTable
    //GLOBAL VARIABLES
    let submitType = 0;
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



    //START FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //################################################### -- START TOGGLE FUNCTIONS -- ############################################################################################################
        
        function toggleValidateDateFormatDefaults(){
            $('#fromBookingDate').datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value: $('#fromBookingDate').val(), 
            icons: {
                rightIcon: '<i class="far fa-calendar-alt" style="margin:0 !important; padding:0 !important;"></i>'
            },showRightIcon: false});
            $('#toBookingDate').datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value: $('#toBookingDate').val(), 
            icons: {
                rightIcon: '<i class="far fa-calendar-alt" style="margin:0 !important; padding:0 !important;"></i>'
            },showRightIcon: false});
            $('#fromDeliveryDate').datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value: $('#fromDeliveryDate').val(), 
            icons: {
                rightIcon: '<i class="far fa-calendar-alt" style="margin:0 !important; padding:0 !important;"></i>'
            },showRightIcon: false});
            $('#toDeliveryDate').datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value: $('#toDeliveryDate').val(), 
            icons: {
                rightIcon: '<i class="far fa-calendar-alt" style="margin:0 !important; padding:0 !important;"></i>'
            },showRightIcon: false});
            
        } 
        
        
        function toggleFreezePain(mode){
            if(mode == 'Off'){
                $('th.first-col').removeClass('sticky-col').removeClass('first-col-pod')
                $('td.first-col').removeClass('sticky-col').removeClass('first-col-pod')
    
                $('th.second-col').removeClass('sticky-col').removeClass('second-col-pod')
                $('td.second-col').removeClass('sticky-col').removeClass('second-col-pod')
    
                $('th.third-col').removeClass('sticky-col').removeClass('third-col-pod')
                $('td.third-col').removeClass('sticky-col').removeClass('third-col-pod')
    
                $('th.fourth-col').removeClass('sticky-col').removeClass('fourth-col-pod')
                $('td.fourth-col').removeClass('sticky-col').removeClass('fourth-col-pod')
    
                $('th.fifth-col').removeClass('sticky-col').removeClass('fifth-col-pod').removeClass('sticky-last-column')
                $('td.fifth-col').removeClass('sticky-col').removeClass('fifth-col-pod').removeClass('sticky-last-column')
    
                
            }else{
                $('th.first-col').addClass('sticky-col').addClass('first-col-pod')
                $('td.first-col').addClass('sticky-col').addClass('first-col-pod')
    
                $('th.second-col').addClass('sticky-col').addClass('second-col-pod')
                $('td.second-col').addClass('sticky-col').addClass('second-col-pod')
    
                $('th.third-col').addClass('sticky-col').addClass('third-col-pod')
                $('td.third-col').addClass('sticky-col').addClass('third-col-pod')
    
                $('th.fourth-col').addClass('sticky-col').addClass('fourth-col-pod')
                $('td.fourth-col').addClass('sticky-col').addClass('fourth-col-pod')
    
                $('th.fifth-col').addClass('sticky-col').addClass('fifth-col-pod').addClass('sticky-last-column')
                $('td.fifth-col').addClass('sticky-col').addClass('fifth-col-pod').addClass('sticky-last-column')
              
            }
        }

        function toggleFormatDateForSQL(date){
            
            let month = date.getMonth();
            console.log(month) ; // 8

            let day = date.getDate();
            console.log(day); // 23
            
            let year = date.getFullYear();
            console.log(year); // 2022
            
            newDate = month + 1 + '/' + day + '/' + year;

            if(newDate == 'NaN/NaN/NaN'){
                return ''
            }else{
                return newDate
            }

            
        }
    
    //################################################### -- END TOGGLE FUNCTIONS -- ############################################################################################################


    //################################################### -- START SUBMIT FUNCTIONS -- ############################################################################################################
        function submitPctpSearch(activeTabGlobal){
            $('#modalLoading').modal('show');
            
            $('#tblContentRowsPOD tbody').html('')
            const valueToFind = ($('#Find').val() != '') ? $('#Find').val().replace(/ /g, '')  : 'novalue';
            const fromBookingDate = toggleFormatDateForSQL(new Date($('#fromBookingDate').val()));
            const toBookingDate = toggleFormatDateForSQL(new Date($('#toBookingDate').val()));
            const fromDeliveryDate = toggleFormatDateForSQL(new Date($('#fromDeliveryDate').val()));
            const toDeliveryDate = toggleFormatDateForSQL(new Date($('#toDeliveryDate').val()));
            const ClientTag = ($('#ClientTag').val() != '') ? $('#ClientTag').val().replace(/ /g, '')  : 'novalue';
            const TruckerTag = ($('#TruckerTag').val() != '') ? $('#TruckerTag').val().replace(/ /g, '')  : 'novalue';
            const DeliveryStatus = ($('#DeliveryStatus').val() != '') ? $('#DeliveryStatus').val()  : 'novalue';
            const PODStatus = ($('#PODStatus').val() != '') ? $('#PODStatus').val()  : 'novalue';
            const PTFNo = ($('#PTFNo').val() != '') ? $('#PTFNo').val().replace(/ /g, '')  : 'novalue';
            const activeTab = $("ul.nav-tabs li a.active").attr('id').replace(/ /g, '');

            var datastring = $("#pctpSearchForm").serialize();
            console.log(valueToFind)
            console.log(fromBookingDate)
            console.log(toBookingDate)
            console.log(fromDeliveryDate)
            console.log(ClientTag)
            console.log(TruckerTag)
            console.log(DeliveryStatus)
            console.log(PODStatus)
            console.log(PTFNo)
            console.log(activeTab)


            let url = '';


            switch(activeTabGlobal) {
                case 'summaryTab':
                url = '';
                break;
                case 'podTab':
                url = 'get-pctp-window-latest-200-pod';
                break;
                case 'billingTab':
                url = '';
                break;
                case 'tpTab':
                url = '';
                break;
                case 'pricingTab':
                url = '';
                break;
                default:
                url = '';
            }

            $.ajax({
                url: url,
                type: "GET",
                data: {
                    valueToFind:valueToFind,
                    fromBookingDate:fromBookingDate,
                    toBookingDate:toBookingDate,
                    fromDeliveryDate:fromDeliveryDate,
                    toDeliveryDate:toDeliveryDate,
                    ClientTag:ClientTag,
                    TruckerTag:TruckerTag,
                    DeliveryStatus:DeliveryStatus,
                    PODStatus:PODStatus,
                    PTFNo:PTFNo,
                    activeTab:activeTab
                },
                success: (data) => {
                    // console.log(data);
                    switch(activeTabGlobal) {
                        case 'summaryTab':
                        url = '';
                        break;
                        case 'podTab':
                            $('#tblContentRowsPOD').addClass('d-none');
                            if ($.fn.dataTable.isDataTable('#tblContentRowsPOD')) {
                                $('#tblContentRowsPOD').DataTable().clear();
                                $('#tblContentRowsPOD').DataTable().destroy();
                                InitializeTblContentsPODDatatable();
                            }else{
                                InitializeTblContentsPODDatatable();
                            }
                            
                            $('#tblContentRowsPOD').removeClass('d-none');
                            $('#tblContentRowsPOD tbody').html(data);
                            $('#modalLoading').modal('hide');
                        break;
                        case 'billingTab':
                        url = '';
                        break;
                        case 'tpTab':
                        url = '';
                        break;
                        case 'pricingTab':
                        url = '';
                        break;
                        default:
                        url = '';
                    }
                
                },
                error: (error) => {
                    console.log(error);
                },
                complete: (data) =>{
                    
                }
            });
        }                  
    //################################################### -- END SUBMIT FUNCTIONS -- ############################################################################################################

    //################################################### -- START DATATABLE FUNCTIONS -- ############################################################################################################
        function InitializeTblContentsPODDatatable(){
            if ($.fn.dataTable.isDataTable('#tblContentRowsPOD')) {
                
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 

                var dataTable = $('#tblContentRowsPOD').dataTable({
                    "dom": 'Blfrtip',
                    "responsive": false, "lengthChange": false, "autoWidth": true,  "pageLength": 10, "ordering": false,
                        "buttons": [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5'
                        ],
                    "scrollX": true,
                })
                
                
                $(dataTable.fnGetNodes()).each(function(i)
                {
                    x = i+1
                    if($(this).find("td:eq(3) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(3) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(3) input.custom-date-input").val().replace('T00:00:00.000',''), 
                            icons: {
                                rightIcon: '<i class="far fa-calendar-alt"></i>'
                            },showRightIcon: false});
                    }
                    if($(this).find("td:eq(20) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(20) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(20) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    if($(this).find("td:eq(33) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(33) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(33) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    if($(this).find("td:eq(34) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(34) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(34) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    if($(this).find("td:eq(35) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(35) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(35) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    if($(this).find("td:eq(36) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(36) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(36) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    if($(this).find("td:eq(37) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(37) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(37) input.custom-date-input").val().replace('T00:00:00.000',''), 
                            icons: {
                                rightIcon: '<i class="far fa-calendar-alt"></i>'
                            },showRightIcon: false});
                    }
                    if($(this).find("td:eq(39) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(39) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(39) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    if($(this).find("td:eq(42) input").hasClass('custom-date-input') ){
                        $(this).find("td:eq(42) input.custom-date-input").datepicker({ uiLibrary: 'bootstrap4',format: 'yyyy-mm-dd',value:  $(this).find("td:eq(42) input.custom-date-input").val().replace('T00:00:00.000',''), 
                        icons: {
                            rightIcon: '<i class="far fa-calendar-alt"></i>'
                        },showRightIcon: false});
                    }
                    
                });
            },100);
        }
            setTimeout(function() { 
                $('#tblContentRowsPOD').removeClass('d-none');
            },600);
        }     
    //################################################### -- END DATATABLE FUNCTIONS -- ############################################################################################################
    //END FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
   