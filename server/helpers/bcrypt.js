const bcrypt = require("bcryptjs");

function hash(password) {
	let salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}

function pwCheck(pw, dbpw) {
	return bcrypt.compareSync(pw, dbpw);
}

module.exports = { hash, pwCheck };
