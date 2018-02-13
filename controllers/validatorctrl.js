// checkear que no existe el usuario o email //

exports.checkEmail(){
       checkEmailpromise(user.email)
            .then((emailChecked) => {
                if (emailChecked.length === 0) {
                    control.log(emailChecked)
                    addcheck(1);
                }else{
					control.log(emailChecked)
                    addproblem(1,problem_username_taked)
                }
            })
        
            .catch((err) => {
                return err;
            })  
}
        ValidatorCtrl.checkUsername(user.username)
            
            .then((userChecked) => {
            
                 if (userChecked.length === 0) {
					 control.log(userChecked)
                     addcheck(1);
                     
                     
                 }else{
                   addproblem(1,problem_email_taked)
					control.log(userChecked) 
                 }                    
            })
            
            .catch((err) => {
                 return err;
            }) 

exports.checkUsername = (data) => {

    return new Promise(function(resolve, reject) {
    	// Do async job
       (User.find({username: data}).lean().exec(function(err, result) {
            if (err) {
                reject(err);
            } 
            resolve(result);            
        }))
    })       
}
function checkEmailpromise = (data) => {
    
    return new Promise(function(resolve, reject, data) {
    	// Do async job
       (User.find({email: data}).lean().exec(function(err, result) {
            if (err) {
                reject(err);
            } 
            resolve(result);            
        }))
    })         
}

// checkear la validez de los datos //

