var imageLoader = document.getElementById('fileUploader');
imageLoader.addEventListener('change', handleImage, false);


function removePhoto(index) {
    delete $('#fileUploader')[0].files[index];
}

function handleImage(e) {
    //Check File API support

    if (window.File && window.FileList && window.FileReader) {
    	 var currentFiles = $('#fileUploader')[0].files;
        var files = event.target.files; //FileList object
        var output = document.getElementById("result");
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) continue;
            let index = i;
            var picReader = new FileReader();
            picReader.addEventListener("load", function(event) {
                $('.pre-upload-content').hide();
                $('.post-upload-content').show();
                var picFile = event.target;
                var div = document.createElement("div");
                div.innerHTML = "<button onclick='removePhoto(" + index + ");' id='removePhoto' class='remove-photo'>X</button>"+index+"<img class='thumbnail' src='" + picFile.result + "'" + "'/>";
                output.insertBefore(div, null);
            });
            //Read the image
            picReader.readAsDataURL(file);
        }
    } else {
        console.log("Your browser does not support File API");
    }
    // var reader = new FileReader();
    // reader.onload = function(event) {
    //     $('.post-upload-content img').attr('src', event.target.result);
    //     $('.pre-upload-content').hide();
    //     $('.post-upload-content').show();
    // }
    // reader.readAsDataURL(e.target.files[0]);
}

$('#removePhoto').click(function() {
    $('.post-upload-content img').attr('src', '');
    $('.post-upload-content').hide();
    $('.pre-upload-content').fadeIn();

});

$('.file-uploader').on({

    dragleave: function(e) {
        $(this).removeClass('over');
    },
    dragenter: function(e) {
        $(this).addClass('over');
    },
    dragover: function(e) {
        e.preventDefault();
    },
    dragend: function() {
        $(this).removeClass('over');

    },
    drop: function() {
        $('#fileUploader').val(null);
        $(this).removeClass('over');
    }
});

$('.panel.style .custom-radio').click(function() {

    $('.panel.style .custom-radio').removeClass('checked');
    $(this).addClass('checked');
});

$('.panel.frame .frame-item').click(function() {
    $('.panel.frame .frame-item').removeClass('checked');
    $(this).addClass('checked');
});