
$(function () {
    
    console.log('modals-script loaded')
    //DECLARE MODULE PROPERTIES
    let objectType = $("[name=objectType]").text();
    let SAPMainTable = $("[name=SAPMainTable]").text();
    let SAPChildTable1 = $("[name=SAPChildTable1]").text();
    let rowItemType = $("[name=rowItemType]").text();
    let rowServiceType = $("[name=rowServiceType]").text();
    let currentLoggedInUserId = $("[name=currentLoggedInUserId]").text();
    let formSettingsURL = $("[name=formSettingsURL]").text();
    let updateFormSettingsURL = $("[name=updateFormSettingsURL]").text();

    let SumDec = $("[name=SumDec]").text();
    let PriceDec = $("[name=PriceDec]").text();
    let RateDec = $("[name=RateDec]").text();
    let QtyDec = $("[name=QtyDec]").text();
    let PercentDec = $("[name=PercentDec]").text();
    let MeasureDec = $("[name=MeasureDec]").text();

   
   
    let docType = $("[name=DocType]").val();

    //START CLICK -------------------------------------------------------------------------------------------------------------------------------------------------------
        //FIND DOCUMENT
        $(document.body).on('click', '#btnFind', function () 
        {
            findModuleModal();
        });
        //FORM SETTINGS DOCUMENT
        $(document.body).on('click', '#btnFormSettings', function () 
        {
            formSettingsModal();
        });
        $(document.body).on('click', '#btnFormSettingsUpdate', function () 
        {
            updateFormSettings();
        });
        //LOG OUT 
        $(document.body).on('click', '#btnLogout', function () 
        {
            $('#modalLogoutConfirmation').modal('show');

           
        
        });
        $(document.body).on('click', '#btnConfirmLogout', function () 
        {
            $('#modalLogoutConfirmation').modal('hide');
            setTimeout(function() { 
                logout();
                location.reload();
            }, 1000);
            
        });
        
        
        
    //END CLICK -------------------------------------------------------------------------------------------------------------------------------------------------------
    //START SHOWN -------------------------------------------------------------------------------------------------------------------------------------------------------
        //SHOW LOADING
        $('#modal-loading').on('shown.bs.modal', function (e) {
            move();
        })
        
        //SHOW EMPLOYEE LIST
        $('#modalEmployeeList').on('shown.bs.modal', function (e) {
            create_post();
          
            
            
        });
        //END SHOW EMPLOYEE LIST ------------------------------------------------------------------------------------------------------------------------------------------
        //SHOW USER LIST
        $('#modalUserList').on('shown.bs.modal', function (e) {
            if($("#tblUser > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "user-list",
                success: function(data){
                    console.log(data)
                    $.each(data, function(key,valueObj){


                        $("#tblUser > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1'>" 
                                +valueObj.id+ 
                                "</td><td class='item-2'>" 
                                +valueObj.username+
                                "</td><td class='item-3'>"
                                +valueObj.email+ 
                                "</td><td class='item-4'>" 
                                +valueObj.emp_id+
                                "</td><td class='item-5'>" 
                                +valueObj.name+ 
                                "</td></tr>"
                                
                                )
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeUserDatatable();
            
           
            }
            
            
        });
        //END SHOW USER LIST ------------------------------------------------------------------------------------------------------------------------------------------
         //SHOW BUSINESS PARTNER LIST
         $('#modalBusinessPartnerList').on('shown.bs.modal', function (e) {
            if($("#tblBusinessPartner > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "business-partner-list",
                success: function(data){
                    console.log('data')
                    $.each(data, function(key,valueObj){
                        $("#tblBusinessPartner > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1'>" 
                                +valueObj.CardCode+ 
                                "</td><td class='item-2'>" 
                                +valueObj.CardName+
                                "</td></tr>")
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeBusinessPartnerDatatable();
            
           
            }
            
            
        });
        //END SHOW BUSINESS PARTNER LIST ------------------------------------------------------------------------------------------------------------------------------------------
        //SHOW CONTACT PERSON LIST
        $('#modalContactPersonList').on('shown.bs.modal', function (e) {
            let cardCode = $("[name=CardCode]").val();
            if($("#tblContactPerson > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "contact-person-list",
                data: {
                    cardCode: cardCode,
                },
                success: function(data){
                    console.log('data')
                    $.each(data, function(key,valueObj){
                        $("#tblContactPerson > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1 d-none'>" 
                                +valueObj.CntctCode+ 
                                "</td><td class='item-2'>" 
                                +valueObj.Name+ 
                                "</td><td class='item-3'>" 
                                +valueObj.Position+ 
                                "</td><td class='item-4'>" 
                                +valueObj.Tel1+
                                "</td></tr>")

                               
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeContactPersonDatatable();
            
           
            }
            
            
        });
        //END SHOW CONTACT PERSON LIST ------------------------------------------------------------------------------------------------------------------------------------------
        //SHOW SALES EMPLOYEE LIST
        $('#modalSalesEmployeeList').on('shown.bs.modal', function (e) {
            if($("#tblSalesEmployee > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "sales-employee-list",
               
                success: function(data){
                    console.log('data')
                    $.each(data, function(key,valueObj){
                        $("#tblSalesEmployee > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1 d-none'>" 
                                +valueObj.SlpCode+ 
                                "</td><td class='item-2'>" 
                                +valueObj.SlpName+ 
                                "</td><td class='item-3'>" 
                                +valueObj.Memo+
                                "</td></tr>")

                               
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeSalesEmployeeDatatable();
            
           
            }
            
            
        });
        //END SHOW SALES EMPLOYEE LIST ------------------------------------------------------------------------------------------------------------------------------------------
        
        //SHOW ITEM LIST
        $('#modalItemList').on('shown.bs.modal', function (e) {
            if($("#tblItem > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "item-list",
                success: function(data){
                    console.log(data)
                    $.each(data, function(key,valueObj){
                        $("#tblItem > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1'>" 
                                +valueObj.ItemCode+ 
                                "</td><td class='item-2'>" 
                                +valueObj.ItemName+
                                "</td><td class='item-3 text-right'>"
                                +valueObj.OnHand+ 
                                "</td></tr>")
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeItemDatatable();
            
           
            }
            
            
        });
        //END SHOW ITEM LIST ------------------------------------------------------------------------------------------------------------------------------------------
        //SHOW WAREHOUSE LIST
        $('#modalWarehouseList').on('shown.bs.modal', function (e) {
            if($("#tblWarehouse > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "warehouse-list",
                success: function(data){
                    console.log(data)
                    $.each(data, function(key,valueObj){
                        $("#tblWarehouse > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1'>" 
                                +valueObj.WhsCode+ 
                                "</td><td class='item-2'>" 
                                +valueObj.WhsName+
                                "</td></tr>")
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeWarehouseDatatable();
            
           
            }
            
            
        });
        //END SHOW WAREHOUSE LIST ------------------------------------------------------------------------------------------------------------------------------------------
        //SHOW UNIT OF MEASURE LIST
         $('#modalUnitOfMeasureList').on('shown.bs.modal', function (e) {
            if($("#tblUnitOfMeasure > tbody tr").length == 0){
                $.ajax({
                method: "GET",
                url: "unit-of-measure-list",
                success: function(data){
                    console.log('data')
                    $.each(data, function(key,valueObj){
                        $("#tblUnitOfMeasure > tbody")
                        .append("<tr><td class='item-0 text-right'>" 
                                + (key + 1) + 
                                "<td class='item-1'>" 
                                +valueObj.UomCode+ 
                                "</td><td class='item-2'>" 
                                +valueObj.UomName+
                                "</td></tr>")
                        
                    });
                },
                error: function( e ) {
                    
                }
            });

            InitializeUnitofMeasureDatatable();
            
           
            }
            
            
        });
        //END SHOW UNIT OF MEASURE LIST ------------------------------------------------------------------------------------------------------------------------------------------
       
        //SHOW SALES ORDER LIST
        $('#modalSalesOrderList').on('shown.bs.modal', function (e) {
        if($("#tblSalesOrder > tbody tr").length == 0){
            $.ajax({
            method: "GET",
            url: "sales-order-list",
            success: function(data){
                console.log('data')
                $.each(data, function(key,valueObj){

                    $("#tblSalesOrder > tbody")
                    .append("<tr><td class='item-0 text-right'>" 
                            + (key + 1) + 
                            "<td class='item-1'>" 
                            +valueObj.DocEntry+ 
                            "</td><td class='item-2'>" 
                            +valueObj.DocNum+
                            "</td><td class='item-3'>" 
                            +valueObj.DocDate+
                            "</td><td class='item-4'>" 
                            +valueObj.CardCode+
                            "</td><td class='item-5'>" 
                            +valueObj.CardName+
                            "</td><td class='item-6'>" 
                            +valueObj.NumAtCard+
                            "</td><td class='item-7'>" 
                            +valueObj.DocDueDate+
                            "</td></tr>")
                    
                });
            },
                error: function( e ) {
                    
                }
            });

            InitializeSalesOrderDatatable();
        
        
        }
            
            
        });
        //END SHOW SALES ORDER LIST ------------------------------------------------------------------------------------------------------------------------------------------
        

        //SHOW FORM SETTINGS
        $('#modalFormSettings').on('shown.bs.modal', function (e) {
            
            if($("#tblFormSettings > tbody tr").length == 0){
                $.ajax({
                    method: "GET",
                    url: formSettingsURL,
                    data: {
                        SAPMainTable : SAPMainTable,
                        rowItemType : rowItemType,
                        rowServiceType : rowServiceType,
                        currentLoggedInUserId : currentLoggedInUserId,
                        docType : docType
                    },
                    success: function(data){
                        $.each(data, function(key,valueObj){
                            
                            $.each(valueObj, function(key2,valueObj2){
                               columns = JSON.parse(valueObj2);

                               $.each(columns, function(i, item) {
                                    extraspace="";
                                    visible = "";
                                    if(item.visible == "true"){
                                        visible = "checked";
                                    }
                                    else{
                                        visible = "unchecked";
                                    }
                                    $("#tblFormSettings > tbody")
                                            .append("<tr><td class='text-right'>" 
                                                    + (i + 1) + 
                                                    "<td class='text-right d-none position' data-name='position'>"
                                                    +item.position+ 
                                                    "<td class='text-right d-none width' data-name='width'>"
                                                    +item.width+ 
                                                    "</td><td class=''>" 
                                                    +item.name+ 
                                                    "</td><td class='text-center class='visible'><input type='checkbox'  class='visible'  data-name='visible' "+visible+">" 
                                                   + extraspace +
                                                    "</td><td class='text-right d-none id' data-name='id'>"
                                                    +item.id+ 
                                                    "</td><td class='text-right d-none name' data-name='name'>"
                                                    +item.name+ 
                                                    "</td><td class='text-right d-none diapi' data-name='diapi'>"
                                                    +item.diapi+ 
                                                    "</td><td class='text-right d-none masterdata' data-name='masterdata'>"
                                                    +item.masterdata+ 
                                                    "</td><td class='text-right d-none modal' data-name='modal'>"
                                                    +item.modal+ 
                                                    "</td><td class='text-right d-none type' data-name='type'>"
                                                    +item.type+ 
                                                    "</td><td class='text-right d-none selectoptions' data-name='selectoptions'>"
                                                    +item.selectoptions+ 
                                                    "</td><td class='text-right d-none format' data-name='format'>"
                                                    +item.format+ 
                                                    "</td><td class='text-right d-none dataListTable' data-name='dataListTable'>"
                                                    +item.dataListTable+ 
                                                    "</td><td class='text-right d-none dataListID' data-name='dataListID'>"
                                                    +item.dataListID+ 
                                                    "</td><td class='text-right d-none dataListFieldToSearch' data-name='dataListFieldToSearch'>"
                                                    +item.dataListFieldToSearch+ 
                                                    "</td><td class='text-right d-none connectedName' data-name='connectedName'>"
                                                    +item.connectedName+ 
                                                    "</td><td class='text-right d-none postable' data-name='postable'>"
                                                    +item.postable+ 
                                                    "<td class='text-right d-none dnone' data-name='dnone'>"
                                                    +item.dnone+ 
                                                    "</td></tr>")


                                });
                            })
                        })
                    },
                    error: function( e ) {
                        
                    }
                });


            InitializeFormSettingsDatatable();
            
           
            }
            
            
        });
        //END SHOW FORM SETTINGS ------------------------------------------------------------------------------------------------------------------------------------------
    //END SHOWN -------------------------------------------------------------------------------------------------------------------------------------------------------

 
    //START FUNCTION -------------------------------------------------------------------------------------------------------------------------------------------------------
    //FIND MODAL 
    
        function findModuleModal(){
         
            if(objectType == '00'){
                $('#modalUserList').modal('show');
            }
            else if(objectType == '17'){
                $('#modalSalesOrderList').modal('show');
            }
          

        }
    //FORM SETTINGS
        function formSettingsModal(){
            $('#modalFormSettings').modal('show');
        }
      
        function updateFormSettings(){
            let rowCount = $('#tblFormSettings > tbody > tr').length / 2;
            let jsonRows = '[';
            let otArr = [];
            $('#tblFormSettings > tbody > tr').each(function(i) { 
                if(i + 1 <= rowCount){
                    let itArr = [];
                    visible = "";
                    if($(this).find('input.visible').prop('checked')){
                        visible = "true";
                    }
                    else{
                        visible = "false";
                    }
                    console.log($(this).find('input.visible').prop('checked'))
                    itArr.push('"' + $(this).find('td.position').attr('data-name') + '": "' + $(this).find('td.position').text() + '"');
                    itArr.push('"' + $(this).find('td.width').attr('data-name') + '": "' + $(this).find('td.width').text() + '"');
                    itArr.push('"' + $(this).find('td.id').attr('data-name') + '": "' + $(this).find('td.id').text() + '"');
                    itArr.push('"' + $(this).find('td.name').attr('data-name') + '": "' +  $(this).find('td.name').text() + '"');
                    itArr.push('"' + $(this).find('td.diapi').attr('data-name') + '": "' +  $(this).find('td.diapi').text() + '"');
                    itArr.push('"' + $(this).find('td.masterdata').attr('data-name') + '": "' +  $(this).find('td.masterdata').text() + '"');
                    itArr.push('"' + $(this).find('td.modal').attr('data-name') + '": "' +  $(this).find('td.modal').text() + '"');
                    itArr.push('"' + $(this).find('td.type').attr('data-name') + '": "' +  $(this).find('td.type').text() + '"');
                    itArr.push('"' + $(this).find('td.selectoptions').attr('data-name') + '": "' +  $(this).find('td.selectoptions').text() + '"');
                    itArr.push('"' + $(this).find('td.format').attr('data-name') + '": "' +  $(this).find('td.format').text() + '"');
                    itArr.push('"' + $(this).find('td.dataListTable').attr('data-name') + '": "' +  $(this).find('td.dataListTable').text() + '"');
                    itArr.push('"' + $(this).find('td.dataListID').attr('data-name') + '": "' +  $(this).find('td.dataListID').text() + '"');
                    itArr.push('"' + $(this).find('td.dataListFieldToSearch').attr('data-name') + '": "' +  $(this).find('td.dataListFieldToSearch').text() + '"');
                    itArr.push('"' + $(this).find('td.connectedName').attr('data-name') + '": "' +  $(this).find('td.connectedName').text() + '"');
                    itArr.push('"' + $(this).find('td.postable').attr('data-name') + '": "' + $(this).find('td.postable').text() + '"');
                    itArr.push('"' + $(this).find('input.visible').attr('data-name') + '": "' + visible + '"');

                    otArr.push('{' + itArr.join(',') + '}'); 
                }
                
            });

            jsonRows += otArr.join(",") + ']';
            console.log(jsonRows)
            $.ajax({
                    method: "POST",
                    url: updateFormSettingsURL,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        SAPMainTable : SAPMainTable,
                        rowItemType : rowItemType,
                        rowServiceType : rowServiceType,
                        currentLoggedInUserId : currentLoggedInUserId,
                        docType : docType,
                        jsonRows : jsonRows,
                    },
                    success: function(data){
                        
                    },
                    error: function( e ) {
                        
                    }
                });
        }
    
    
    
    //LOGOUT
        function logoutModal(){
            $('#modalLogoutConfirmation').modal('show');
        }
        function logout(){
             $.ajax({
                    method: "GET",
                    url: "/logout",
                    success: function(data){
                       
                    },
                    error: function( e ) {
                        
                    }
                });
        }
        

        

    //DATATABLE 
        function InitializeEmployeeDatatable(){
            if ($.fn.dataTable.isDataTable('#tblEmployee')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblEmployee").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalEmployeeList').find('.overlay').addClass('d-none');
                $('#tblEmployee').removeClass('d-none');
            },600);
    }
    function InitializeUserDatatable(){
            if ($.fn.dataTable.isDataTable('#tblUser')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblUser").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalUserList').find('.overlay').addClass('d-none');
                $('#tblUser').removeClass('d-none');
            },600);
    }
    function InitializeBusinessPartnerDatatable(){
        if ($.fn.dataTable.isDataTable('#tblBusinessPartner')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblBusinessPartner").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalBusinessPartnerList').find('.overlay').addClass('d-none');
                $('#tblBusinessPartner').removeClass('d-none');
            },600);
    }
    function InitializeContactPersonDatatable(){
        if ($.fn.dataTable.isDataTable('#tblContactPerson')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblContactPerson").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalContactPersonList').find('.overlay').addClass('d-none');
                $('#tblContactPerson').removeClass('d-none');
            },600);
    }
    function InitializeSalesEmployeeDatatable(){
        if ($.fn.dataTable.isDataTable('#tblSalesEmployee')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblSalesEmployee").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalSalesEmployeeList').find('.overlay').addClass('d-none');
                $('#tblSalesEmployee').removeClass('d-none');
            },600);
    }
    function InitializeItemDatatable(){
            if ($.fn.dataTable.isDataTable('#tblItem')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblItem").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalItemList').find('.overlay').addClass('d-none');
                $('#tblItem').removeClass('d-none');
            },600);
    }
    function InitializeWarehouseDatatable(){
        if ($.fn.dataTable.isDataTable('#tblWarehouse')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblWarehouse").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalWarehouseList').find('.overlay').addClass('d-none');
                $('#tblWarehouse').removeClass('d-none');
            },600);
    }
    function InitializeUnitofMeasureDatatable(){
        if ($.fn.dataTable.isDataTable('#tblUnitOfMeasure')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblUnitOfMeasure").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalunitOfMeasureList').find('.overlay').addClass('d-none');
                $('#tblUnitOfMeasure').removeClass('d-none');
            },600);
    }
    function InitializeSalesOrderDatatable(){
        if ($.fn.dataTable.isDataTable('#tblSalesOrder')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblSalesOrder").DataTable({
                "responsive": false, "lengthChange": true, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalSalesOrderList').find('.overlay').addClass('d-none');
                $('#tblSalesOrder').removeClass('d-none');
            },600);
    }
    

    function InitializeFormSettingsDatatable(){
            if ($.fn.dataTable.isDataTable('#tblFormSettings')) {
            // Do something else since the dataTable's already initialized
            
            }
            else {
            // Initialize the dataTable
            setTimeout(function() { 
                $("#tblFormSettings").DataTable({
                "responsive": false, "lengthChange": false, "autoWidth": false,  "pageLength": 10, "ordering": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

             
            },500);
        }
            setTimeout(function() { 
                $('#modalFormSettings').find('.overlay').addClass('d-none');
                $('#tblFormSettings').removeClass('d-none');
            },600);
    }

    function move() {
        var i = 0;
        $("#myProgress").removeClass("d-none");
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 1;
            var id = setInterval(frame, 10);
            function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                console.log(1)
                $("#myProgress").addClass("d-none");
                $("#modal-loading").modal("hide");
            } else {
                width++;
                elem.style.width = width + "%";
                console.log(0)
            }
            }
        }
    }

    // AJAX for posting
function create_post() {
    console.log("create post is working!") // sanity check
    $.ajax({
        url : "get-employee-master-data", // the endpoint
        type : "GET", // http method
        
        // handle a successful response
        success : function(json) {
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(json) {
            console.log(json); // log the returned json to the console
            console.log("failed"); // another sanity check
        }
    });
}
    
    //END FUNCTION -------------------------------------------------------------------------------------------------------------------------------------------------------
});
