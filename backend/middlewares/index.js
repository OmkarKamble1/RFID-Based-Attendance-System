export const sessionCheckerMiddleware = async (req, res, next) => {
	if(!req.session || !req.session.user) {
		res.redirect('/teacher/login')
		return;
	} else {
		await next();
	}
}

export const loginMiddleware = (req, res, next) => {
	if(!req.session || !req.session.user){
		next()
	} else {
		res.redirect('/')
	}
};