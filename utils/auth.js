export const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};

export const isNotAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.redirect("/index");
	} else {
		next();
	}
};

export const isAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		next();
	} else {
		res.status(401).json({
			msg: "No estas autorizado para ver esta sección, ya que no eres administrador",
		});
	}
};