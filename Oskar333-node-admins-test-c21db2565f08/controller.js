const Admin = require('./model');

exports.getAllAdmins = (req, res) => {
	Admin.find({}, (err, admins) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
		if(!admins) return res.status(404).send({message: `No existen admins`});
		res.status(200).send({admins: admins});
	});
};

exports.getAdminById = (req, res) => {
	let adminId = req.params.id;
	Admin.find({_id: adminId}, (err, admin) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
		if(!admin) return res.status(404).send({message: `No existen ese admin`});
		console.log({AdminById: admin});
		res.send({admin: admin});
	});
};

exports.newAdmin = (req, res) => {
	var newAdmin = new Admin({
	    name: req.body.name,
	    username: req.body.username,
	    email: req.body.email, 
	    avatar: req.body.avatar,
	    active: req.body.active
	  }); 
	newAdmin.save()
	.then((newAdmin) => {
	  console.log({newAdmin:newAdmin});
	  res.send({newAdmin:newAdmin});
	})       
	.catch(err => console.error('El Admin no ha podido guardarse: ', err));
};

exports.updateAdmin = (req, res) => {
	let adminId = req.params.id;
	let update = req.body;
	Admin.findByIdAndUpdate(adminId, update, {new: true}, (err, adminUpdated) => {
		if(err) return res.status(500).send({message: `Error al actualizar el admin: ${err}`});
		console.log({Updated:adminUpdated});
		res.status(200).send({message: adminUpdated});
	});
};

exports.deleteAdmin = (req, res) => {
	let adminId = req.params.id;
	Admin.findById(adminId, (err, admin) => {
		if(err) return res.status(500).send({message: `Error al borrar el admin: ${err}`});
		if(!admin) return res.status(404).send({message: `El admin no existe`});
		admin.remove(err => {
			if(err) return res.status(500).send({message: `Error al borrar el admin: ${err}`});
	  		console.log({Deleted: admin});
			res.status(200).send({message: `El admin ${admin.name} ha sido eliminado`});
		});
	});
};