const { pwCheck } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID_GOOGLE

class Controller {
	static register(req, res, next) {
		let input = {
			email: req.body.email || null,
			name: req.body.name || null,
			password: req.body.password || null,
		};

		User.create(input)
			.then((result) => {
				res.status(201).json({
					id: result.id,
					name: result.name,
					email: result.email,
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static login(req, res, next) {
		User.findOne({
			where: {
				email: req.body.email,
			},
		})
			.then((result) => {
				if (!result) next({ name: "Username or Password is wrong" });

				if (pwCheck(req.body.password, result.password)) {
					let token = generateToken({
						id: result.id,
						email: result.email,
					});
					res.status(200).json({ 
                        message: "Login Succesfully", 
                        token,
                        userData : {
                            name: result.name,
                            email: result.email,
                            status: result.status,
                        } 
                    });
				} else next({ name: "Username or Password is wrong" });
			})
			.catch((err) => {
				next(err);
			});
	}

    static fetchUserData(req, res, next) {
		User.findByPk(req.currentUser.id)
			.then((result) => {
				res.status(200).json({
					name: result.name,
					email: result.email,
					status: result.status,
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static googleLogin(req, res, next){
        let token = req.body.token
        let emailUser
        const client = new OAuth2Client(CLIENT_ID);

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })
        .then((ticket) => {
            const {email} = ticket.getPayload();
            emailUser = email
            return User.findOne({where : { email: email}})
        })
        .then(user => {
            console.log(user);
            if(!user){
                return User.create({
                    email : emailUser,
                    password: Math.random() *100 + "aiueo"
                })
            }else{
                const token = generateToken({
                    id : user.id,
                    email: user.email
                })
                res.status(200).json({ 
					message: "Login Succesfully", 
					token,
					userData : {
						name: user.name,
						email: user.email,
						status: user.status,
					} 
				});

            }
        })
        .then(user => {
            const token = generateToken({
                id : user.id,
                email: user.email
            })
            res.status(201).json({ 
				message: "Login Succesfully", 
				token,
				userData : {
					name: user.name,
					email: user.email,
					status: user.status,
				} 
			});
        })
        .catch((err) => {
            next(err)
        });

    }
}

module.exports = Controller;
