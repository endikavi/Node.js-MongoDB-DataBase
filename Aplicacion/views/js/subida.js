$("#formuploadajax").on("submit", function(e){
    e.preventDefault();
    var f = $(this);

    // ... resto del código de mi ejercicio
});

var formData = new FormData(document.getElementById("formuploadajax"));
formData.append("dato", "valor");

$.ajax({
    url: "gs://base-de-imagenes.appspot.com/",
    type: "post",
    dataType: "html",
    data: formData,
    cache: false,
    contentType: false,
    processData: false
})
    .done(function(res){
        $("#mensaje").html("Respuesta: " + res);
    });