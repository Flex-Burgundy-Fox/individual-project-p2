const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

function generateToken(payload) {
	return jwt.sign(payload, PRIVATE_KEY);
}

function checkToken(token) {
	return jwt.verify(token, PRIVATE_KEY);
}

module.exports = { generateToken, checkToken };
