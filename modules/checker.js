x = 0;
allproblems = ["Datos no validos:<br>"];

exports.addcheck = (option) => {
	if(option === 1){x++;}else if(option === 0){delete x}
	return x
}

exports.addproblem = (option,message) => {
	if(option === 1){allproblems.push(message)}
	return allproblems
}