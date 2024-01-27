
//  INPUT FIELDS ARE SELECTED BY THEIR NAMES NOT IDs
// INPUT TAGS: 
//     - ID for DI API
//     - Name SQL Field
$(function () {
        console.log('LOGIN-script loaded')
       
        
//START SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
        //LOGIN
        $(document.body).on('submit', '#form', function (e) 
        {   
            
            e.preventDefault();
            $("#btnSubmit").prop("disabled",true);
            console.log('trying to login....')
            let formdata = new FormData(this);
            var i = 0;
            $("#myProgress").removeClass("d-none");
            var elem = document.getElementById("myBar");
            var width = 1;
             
            if(i == 0){
                var id = setInterval(frame, 10);
                function frame() {
                i = 1;
                if (width <= 50) {
                    width++;
                    elem.style.width = width + "%";
                
                } 
            
                }
            }

            $.ajax({
                url: 'post-login',
                method: "POST",
                data: formdata,
                processData: false,
                contentType: false,
               
                success:function(response)
                {
                    console.log(response)
                    if(response.type == 'Success'){
                        var id = setInterval(frame, 10);
                        function frame() {
                            if (width >= 100) {
                                clearInterval(id);
                                i = 0;
                                $("#myProgress").addClass("d-none");
                            
                            } else {
                                width++;
                                elem.style.width = width + "%";
                            }
                        }

                        $('#modal-success').modal('show')
                        $('#modal-success-body').text(response.message)
                        let docEntry = response.docEntry;
                        setTimeout(function() { 
                            $('#modal-success').modal('hide')
                            window.location.href = '/dashboard';
                        }, 3000);
                    }else{
                        var id = setInterval(frame, 10);
                        function frame() {
                            if (width >= 100) {
                                clearInterval(id);
                                i = 0;
                                $("#myProgress").addClass("d-none");
                            
                            } else {
                                width++;
                                elem.style.width = width + "%";
                            }
                        }
                        $("#btnSubmit").prop("disabled",false);
                        $('#modal-danger').modal('show')
                        $('#modal-danger-body').text(response.message)
                        
                        setTimeout(function() { 
                            $('#modal-danger').modal('hide')
                        }, 3000);
                    }
                  

                
                },
                    error: function(response) {
                        console.log(response.message)
                        var id = setInterval(frame, 10);
                        function frame() {
                            if (width >= 100) {
                                clearInterval(id);
                                i = 0;
                                $("#myProgress").addClass("d-none");
                            
                            } else {
                                width++;
                                elem.style.width = width + "%";
                            }
                        }
                        $("#btnSubmit").prop("disabled",false);
                        $('#modal-danger').modal('show')
                        $('#modal-danger-body').text(response.responseJSON.message)
                        
                        setTimeout(function() { 
                            $('#modal-danger').modal('hide')
                        }, 3000);
                       
                }
            });
        });
    });
    //END SUBMIT ------------------------------------------------------------------------------------------------------------------------------------------------------------ 
