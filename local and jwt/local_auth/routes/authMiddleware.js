//passport middleware to authorize users on any route
const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.send('<h1>You are not authenticated</h1><a href="/">Home</a>');
	}
};

const isAdmin = (req, res, next) => {
	if (req.session.passport.user === "5f21681fbdb9068e7d928c64") {
		res.send('<h1>You are Admin</h1> <a href="/logout">logout</a>');
		next();
	} else {
		res.send('<h1>You are not admin</h1><a href="/">Home</a>');
	}
};

module.exports.isAuth = isAuth;
module.exports.isAdmin = isAdmin;
