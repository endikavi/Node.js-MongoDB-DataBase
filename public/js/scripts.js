// onload //
window.onload = function (){
    
    localStorage.setItem ("Sesion","true")   
    
}
//llamada inicial                ***************************************************************************
function llamadaInicial() {
  if  (localStorage.getItem("Sesion") == "true"  ){
    localStorage.setItem ("Page",1);  
    addSpinner($('body'));
    delBtnIni();
    btnModos();
    printBoxTotal();
    table = false;
    llamada(true, "GET", "https://prueba-base-de-datos-endika.herokuapp.com/user", "JSON");
  }else{alert('Sesion no iniciada')}
};
//llamada ajax al servidor       ***************************************************************************
function llamada(data, type, url, dataType) {
    $.ajax({
            data: data,
            type: type,
            dataType: dataType,
            url: url,
        })
        .done(function (data, textStatus, jqXHR) {
            console.log("La solicitud se ha completado correctamente.");
        
            if (type == "GET") {
                obj = JSON.parse(JSON.stringify(data));
          
            } else if (type == "DELETE") {
                console.log("Administrador borrado")
                obj.admins.splice(TempAdmin, 1);
             
            } else if (type == "PUT") {
                console.log("Administrador actualizado")
                delete obj.admins[TempAdmin];
                obj.admins[TempAdmin] = editAdmin;
                cancelForm();
           
            } else if (type == "POST") {
                console.log("Administrador añadido");
                obj.admins.unshift(newAdmin);
                cancelForm();
            }
          console.log(jqXHR.status);
          console.log(data);
          return true;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("La solicitud a fallado: " + textStatus);
         if (type == "GET") {console.log("No se pudo recibir datos del servidor.");} 
        
          else if (type == "DELETE") {console.log("No se pudo eliminar el Administrador.");}
        
          else if (type == "PUT") {console.log("No se pudo actualizar el Administrador.");} 
        
          else if (type == "POST") {console.log("No se pudo crear nuevo usuario");}
        
         if (jqXHR.status == 404){alert('Error,objeto no encontrado.')
            obj.admins.splice(TempAdmin, 1);
            cancelForm();
        }
        else if (jqXHR.status == 400){alert('Informacion de envio no valida.!')}
        else if (jqXHR.status == 500){alert('Error en el servidor.')}
        else if (jqXHR.status == 503){alert('Servicio no disponible vuelva a intentarlo mas tarde.')}
        else{alert('Error en la conexion')}
        console.log("ERROR:");
        console.log(jqXHR.status);
        console.log(data);
        return false;
        })
        .always(function (jqXHR, data) {
          console.log(jqXHR.status);
          console.log(data);
          console.log("Fin de la llamada");
            printAdmins();
            removeSpinner($('body'));
            printTotal();
        });
};
//actualizar datos desde el servidor         ***************************************************************************
function Actualizar() {
    llamada(true, "GET", "https://lanbide-node.herokuapp.com/admins", "JSON");
}
//pinta los administradores en Boxs                    **************************************************************************
function printAdminsBox() {
    delContent();
    for (var i = 0; i < obj.admins.length; i++) {
        admins = obj.admins[i];
        printBox(i);
        printBlank(admins, i);
        printAvatars(admins, i);
        btnEdit(admins, i);
        printNames(admins, i);
        printIds(admins, i);
        printUserNames(admins, i);
        printEmails(admins, i);
        printState(admins, i);
    }
    delNav();
    table = false;
    paginador();
};
//pinta los administradores en tables              *************************************************************************
function printAdminsTables() {
    delContent();
    for (var i = 0; i < obj.admins.length; i++) {
        admins = obj.admins[i];
        printTable(i);
        printBlankTable(admins, i);
        printAvatars(admins, i);
        printNames(admins, i);
        printIds(admins, i);
        printBlankTable(admins, i);
        printUserNames(admins, i);
        printEmails(admins, i);
        btnEdit(admins, i);
        printState(admins, i);
    }
    delNav();
    table = true;
    paginadorTable();
};
//botones de modo                    ***************************************************************************
function btnModos() {
    var botonBox = '<input type="button" class="btn-modo" onclick="printAdminsBox();localStorage.setItem("Page",1);" value="Ver en cajas" id="btn-Boxs" name="btn-Boxs"/>';
    $('#btn-modos').append(botonBox);
    var botonTable = '<input type="button" class="btn-modo" onclick="printAdminsTables()localStorage.setItem("Page",1);" value="Ver en tabla" id="btn-tables" name="btn-tables"/>';
    $('#btn-modos').append(botonTable);
    var botonNewAdmin = '<input type="button" class="btn-modo" onclick="printFormNew();" value="Nuevo admin" id="btn-newadmin" name="btn-newadmin"/>';
    $('#btn-modos').append(botonNewAdmin);
    var botonActualizar = '<input type="button" class="btn-modo" onclick="Actualizar();" value="Actualizar" id="btn-Actualizar" name="btn-Actualizar"/>';
    $('#btn-modos').append(botonActualizar);
};
//botones para editar                   **************************************************************************
function btnEdit(admins, i) {
    $("<span/>", {
        id: "box-edit" + i,
    }).appendTo("#box_" + i).addClass("boxedit");
    $("<span/>", {
        id: "box-del" + i,
    }).appendTo("#box_" + i).addClass("boxdel");
    var botonEdit = '<input type="button" class="btnedit" onclick="formEdit(' + i + ')" value="Edit" id="edit" name="btn-Boxs"/>';
    $('#box-edit' + i).append(botonEdit);
    var botonDel = '<input type="button" class="btndel" onclick="btnDel(' + i + ')" value="del" id="del" name="btn-tables"/>';
    $('#box-del' + i).append(botonDel);
}
//borrar boton inicial                 *************************************************************************
function delBtnIni() {
    $(".div-ini").empty();
};
//borrar contenido                      *************************************************************************
function delContent() {
    $(".contenido").empty();
};
//borrar barra de navegacion             ************************************************************************
function delNav() {
    $("#navbar").empty();
};
//funciones de pintado                  ***************************************************************************
//pintar Boxs                    
function printBox(i) {
    $("<div/>", {
        id: "box_" + i,
        class: "Box"
    }).appendTo("#contenido");
};
//pintar tables                            ***************************************************************************
function printTable(i) {
    $("<div/>", {
        id: "box_" + i,
        class: "table"
    }).appendTo("#contenido");
};
//pintar y filtrar informacion                     *************************************************************************
//pintar el total de admins
function printTotal() {
    $("#box_total").empty();
    $("<h3/>", {
        id: "total",
        class: "total",
        text: "Total de admins: " + obj.admins.length
    }).appendTo("#box_total");
};

function printBoxTotal() {
    $("<div/>", {
        id: "box_total",
        class: "boxtotal"
    }).appendTo("#btn-modos");
};
//pintar y filtrar avatares                 *************************************************************************
function printAvatars(admins, i) {
    if (admins.avatar == null) {
        printAvatarDefault(admins, i)
    } else if (admins.avatar == "") {
        printAvatarDefaultu(admins, i)
    } else {
        printAvatar(admins, i)
    }
};

function printAvatar(admins, i) {
    $("<img/>", {
        src: admins.avatar
    }).appendTo("#box_" + i).addClass("avatar");
}

function printAvatarDefault(admins, i) {
    $("<img/>", {
        src: "img/" + admins.avatar + "user.png"
    }).appendTo("#box_" + i).addClass("avatar");
}

function printAvatarDefaultu(admins, i) {
    $("<img/>", {
        src: "img/undefineduser.png"
    }).appendTo("#box_" + i).addClass("avatar");
}
//pintar y filtrar emails                   ******************************************************************************
function printEmails(admins, i) {
    if (admins.email == undefined) {
        printEmailDefault(admins, i)
    } else if (admins.email == "") {
        printEmailDefaultu(admins, i)
    } else {
        printEmail(admins, i)
    }
};

function printEmail(admins, i) {
    $("<p/>", {
        text: "Email: " + admins.email
    }).appendTo("#box_" + i);
}

function printEmailDefault(admins, i) {
    $("<p/>", {
        text: "Email:No datos "
    }).appendTo("#box_" + i);
}

function printEmailDefaultu(admins, i) {
    $("<p/>", {
        text: "Email:No datos "
    }).appendTo("#box_" + i);
}
//pintar y filtrar nombres de usuario            *******************************************************************************
function printUserNames(admins, i) {
    if (admins.username == undefined) {
        printUserNameDefault(admins, i)
    } else if (admins.username == "") {
        printUserNameDefaultu(admins, i)
    } else {
        printUserName(admins, i)
    }
};

function printUserName(admins, i) {
    $("<p/>", {
        text: "Nombre de usuario: " + admins.username
    }).appendTo("#box_" + i);
}

function printUserNameDefault(admins, i) {
    $("<p/>", {
        text: "Nombre de usuario:No datos "
    }).appendTo("#box_" + i);
}

function printUserNameDefaultu(admins, i) {
    $("<p/>", {
        text: "Nombre de usuario:No datos "
    }).appendTo("#box_" + i);
}
//pintar y filtrar ids              ****************************************************************************
function printIds(admins, i) {
    if (admins._id == undefined) {
        printIdDefault(obj, i)
    } else if (admins._id == "") {
        printIdDefaultu(admins, i)
    } else {
        printId(admins, i)
    }
};

function printId(admins, i) {
    $("<p/>", {
        text: "ID: " + admins._id
    }).appendTo("#box_" + i);
}

function printIdDefault(admins, i) {
    $("<p/>", {
        text: "ID:No datos "
    }).appendTo("#box_" + i);
}

function printIdDefaultu(admins, i) {
    $("<p/>", {
        text: "ID:No datos "
    }).appendTo("#box_" + i);
}
//pintar y filtrar nombres              *****************************************************************************
function printNames(admins, i) {
    if (admins.name == undefined) {
        printNameDefault(admins, i)
    } else if (admins.name == "") {
        printNameDefaultu(admins, i)
    } else {
        printName(admins, i)
    }
};

function printName(admins, i) {
    $("<p/>", {
        text: "Nombre: " + admins.name
    }).appendTo("#box_" + i);
}

function printNameDefault(admins, i) {
    $("<p/>", {
        text: "Nombre:No datos "
    }).appendTo("#box_" + i);
}

function printNameDefaultu(admins, i) {
    $("<p/>", {
        text: "Nombre:No datos "
    }).appendTo("#box_" + i);
}
//pintar y filtrar estado                     ***************************************************************************
function printState(admins, i) {
    $("<img/>", {
        src: "img/" + admins.active + ".png"
    }).appendTo("#box_" + i).addClass("estado");
};
//funcion pintar Box vacia                  ***************************************************************************
function printBlank(admins, i) {
    $("<span/>", {
        id: "Blank",
        class: "Blank",
        text: ""
    }).appendTo("#box_" + i).addClass("Blank");
};
//funcion pintar Box vacia table              *****************************************************************************
function printBlankTable(admins, i) {
    $("<span/>", {
        id: "Blank",
        class: "Blank",
        text: ""
    }).appendTo("#box_" + i).addClass("Blanktable");
};
//funcion añadir espinner                    ***************************************************************************
function addSpinner(el, static_pos) {
    var spinner = el.children('.spinner');
    if (spinner.length && !spinner.hasClass('spinner-remove')) return null;
    !spinner.length && (spinner = $('<div class="spinner' + (static_pos ? '' : ' spinner-absolute') + '"/>').appendTo(el));
    animateSpinner(spinner, 'add');
}
//funcion que anima el spinner                **************************************************************************
function animateSpinner(el, animation, complete) {
    if (el.data('animating')) {
        el.removeClass(el.data('animating')).data('animating', null);
        el.data('animationTimeout') && clearTimeout(el.data('animationTimeout'));
    }
    el.addClass('spinner-' + animation).data('animating', 'spinner-' + animation);
    el.data('animationTimeout', setTimeout(function () {
        animation == 'remove' && el.remove();
        complete && complete();
    }, parseFloat(el.css('animation-duration')) * 1000));
}

//funcion que quita el spinner                  **************************************************************
function removeSpinner(el, complete) {
    var spinner = el.children('.spinner');
    spinner.length && animateSpinner(spinner, 'remove', complete);
}
//funciones de paginador                         **************************************************************************
function paginador() {
    $('#contenido').easyPaginate({
        paginateElement: 'div',
        elementsPerPage: 20,
    });
};

function paginadorTable() {
    $('#contenido').easyPaginate({
        paginateElement: 'div',
        elementsPerPage: 32,
    });
};
//boton-confirmar                            ****************************************************************************
function btnDel(a) {
    swal({
        title: 'Estas seguro?',
        text: "No vas a poder recuperarlo!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar!',
        confirmButtonText: 'Si,eliminar!'
    }).then(function (result) {
        if (result.value) {
            swal(
                'Eliminado!',
                'Admin eliminado.'
            )
            delAdmin(a);
        }
    })
};
//funcion para eliminar admins                    **************************************************************************
function delAdmin(N) {
    TempAdmin = N;
    id = obj.admins[TempAdmin]._id;
    llamada(true, "DELETE", "https://lanbide-node.herokuapp.com/admins/" + id, "JSON");
};
//funcion elegir pintado                          ************************************************************************
function printAdmins() {
    if (table == true) {
        printAdminsTables();
    } else {
        printAdminsBox();
    }
}
//funcion pintar formulario nuevo admin            ************************************************************************
function printFormNew() {
    printBackForm();
    printNewForm();
    printBtnCancelForm();
    printFormularioNew();
}
//funcion pintar formulario editar admin              ***********************************************************************
function printFormEdit() {}
//pintar partes del formulario                    **********************************************************************
//pintar back
function printNewForm() {
    $("<div/>", {
        id: "new_form",
        class: "editform"
    }).appendTo("#back_form");
};
//Box                                           ****************************************************************************
function printBackForm() {
    $("<div/>", {
        id: "back_form",
        class: "backform",
    }).appendTo("#formulario");
};
//boton de cancelar                           **************************************************************************
function printBtnCancelForm() {
    $("<div/>", {
        id: "btn_cancel_form",
        class: "btncancel"
    }).appendTo(".editform");
    var botonCancel = '<input type="button" class="btn" onclick="cancelForm();" value="Cancelar" id="btn-cancelar" name="btn-cancel"/>';
    $('#btn_cancel_form').append(botonCancel);
};
//borrar form                                  **************************************************************************
function cancelForm() {
    $("#formulario").empty();
}
// formulario                                **************************************************************************
function formEdit(a) {
    printBackForm();
    printNewForm();
    printBtnCancelForm();
    printFormularioEdit(a);
}

function printFormularioNew() {
    var form = '<label onload="subida()" for="Nombre">Nombre:</label><input type="text" id="Nombre" name="Nombre" placeholder=" Nombre..." maxlength="10" autofocus required ><span id="linkAvatar"><img class="avatarform" src="img/undefineduser.png"></img></span><br><br><label for="Email">Correo:</label><input type="email" id="Email" name="Email" placeholder="Email..." required><br><br><label for="Usuario">Usuario:</label><input type="text" id="Usuario" name="Usuario" placeholder=" Usuario..." maxlength="10" required ><br><br><label for="Id">ID:</label><input type="text" id="ID" name="ID" placeholder=" ID..." maxlength="30"  required ><br><br><label for="Estado">Estado:</label><input type="checkbox" name="Estado" id="Estado" value="true">Activo<br><br><label for="Avatar">Avatar:</label><input type="file" id="file" name="file" class="subida"/><br><br><br><button type="button" class="enviar" onclick="createNewAdmin()">Enviar</button>'
    $('.editform').append(form);
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
}

function createNewAdmin() {
    Nombre = document.getElementById("Nombre").value;
    Usuario = document.getElementById("Usuario").value;
    Email = document.getElementById("Email").value;
    Newid = document.getElementById("ID").value;
    if ($('#Estado').is(":checked")) {
        Estado = document.getElementById("Estado").value;
    } else {
        Estado = false
    }
    Avatar = localStorage.getItem("Avatar");
    newAdmin = {_id: Newid,name: Nombre,username: Usuario,email: Email,avatar: Avatar,active: Estado};
    llamada(newAdmin, "POST", "https://lanbide-node.herokuapp.com/admins", "JSON");
}

function printFormularioEdit(a) {
    var form = '<label for="Nombre">Nombre:</label><input type="text" id="Nombre" name="Nombre" placeholder="' + obj.admins[a].name + '" value="' + obj.admins[a].name + '" maxlength="10" autofocus required ><span id="linkAvatar"><img class="avatarform" src="' + obj.admins[a].avatar + '" alt="Avatar"></img></span><br><br><label for="Email">Correo:</label><input type="email" id="Email" name="Email" placeholder="' + obj.admins[a].email + '" value="' + obj.admins[a].email + '" required><br><br><label for="Usuario">Usuario:</label><input type="text" id="Usuario" name="Usuario" placeholder="' + obj.admins[a].username + '" value="' + obj.admins[a].username + '" maxlength="10" required ><br><br><label for="Id">ID:</label><input type="text" id="ID" name="ID" placeholder="' + obj.admins[a]._id + '" maxlength="30"  disabled ><br><label for="Estado">Estado:</label><input type="checkbox" name="Estado" id="Estado" value="true">Activo<br><br><br><label for="Avatar">Avatar:</label><input type="file" id="file" name="file" class="subida"/><br><br><br><button type="button" class="enviar" onclick="editarAdmin(' + a + ')">Enviar</button>'
    $('.editform').append(form);
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
}

function editarAdmin(N) {
    TempAdmin = N;
    id = obj.admins[TempAdmin]._id;
    Nombre = document.getElementById("Nombre").value;
    Usuario = document.getElementById("Usuario").value;
    Email = document.getElementById("Email").value;
    Newid = document.getElementById("ID").value;
    if ($('#Estado').is(":checked")) {
        Estado = document.getElementById("Estado").value;
    } else {
        Estado = false
    }
    Avatar = localStorage.getItem("Avatar");
    editAdmin = {_id: id,name: Nombre,username: Usuario,email: Email,avatar: Avatar,active: Estado};
   llamada(editAdmin, "PUT", "https://lanbide-node.herokuapp.com/admins/" + id, "JSON")
  
}

// Funciones de para editar y añadir administradores                                   *********************************************************************************