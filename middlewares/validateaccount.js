const validator = require('validator');
const AccountCtrl = require('../controllers/accountctrl')

let x = 0;
let allMessages = "";
let problems = "Datos no validos:<br>";
const problem_lost = "Faltan datos necesarios.";
const problem_username = "El nombre de usuario no es valido.";
const problem_username_taked = "El nombre de usuario indicado ya esta en uso.";
const problem_email = "Email incorrecto.";
const problem_email_taked = "El email proporcionado ya esta vinculado a una cuenta.";
const problem_password = "Contraseña no valida.";
const problem_repeated = "La contraseña no puede contener el nombre de usuario.";

regular_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}])|(([a-zA-ZÀ-ž\-0-9]+\.)+[a-zA-ZÀ-ž]{2,3}))$/;
regular_username = /(?=^[A-z0-9À-ž]+$).{3,15}$/;
regular_password_secure = /(?=^[a-zA-Z0-9]+$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$/;

function addcheck(option){
x=x+1;
if(option === "get"){return x}
}

function addproblem(option,message){
	if (option === true){return allMessages}
	allMessages = allMessages + message;
}

exports.validateAccount = (user) => {

	if(typeof(user.username) != "undefined" && typeof(user.password) != "undefined" && typeof(user.email) != "undefined" && 
    user.username !== "" && user.password !== "" && user.email !== "" ){
		
		addproblem("set","");
		
    	if (regular_email.test(user.email)) {addcheck(0);}else{addproblem(0,problem_email)};
			
		if(regular_username.test(user.username)) {addcheck(0);}else{addproblem(0,problem_username)};
			
		if (regular_password_secure.test (user.password)) {addcheck(0);}else{addproblem(0,problem_password)};
             
		if (user.password.toLowerCase().indexOf(user.username.toLowerCase()) === -1) {addcheck(0);}else{addproblem(0,problem_repeated)};
            
        AccountCtrl.checkEmail(user.email)
            .then((emailChecked) => {
                if (emailChecked.length === 0) {
                    
                    addcheck(0);
            
                }else{
                    addproblem(0,problem_username_taked)
                }
            })
        
            .catch((err) => {
                return err;
            })  
            
        AccountCtrl.checkUsername(user.username)
            
            .then((userChecked) => {
            
                 if (userChecked.length === 0) {
                     
                     addcheck(0);
                     
                     
                 }else{
                   addproblem(0,problem_email_taked)
                 }                    
            })
            
            .catch((err) => {
                 return err;
            })  
         console.log(addcheck("get"))   
         if (addcheck("get") == 8){return true}else{return addproblem(true,"")};
            
		}else{return problem_lost};
        
	} 


    