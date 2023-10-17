export const sessionCheckerMiddleware = async (req, res, next) => {
	if(!req.session || !req.session.user) {
		res.redirect('/teacher/login')
		return;
	} else {
		await next();
		return;
	}
}

export const loginMiddleware = async (req, res, next) => {
	if(req.session.user || req.session.authenticated) {
		console.log(req.session.user, req.session.authenticated)
		res.status(200).json({
			success: true,
			message: 'User logged in',
		})
	} else {
		res.status(400).json({
			success: false,
			message: 'User not logged in',
		})
	}
};


export const hardwareMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;
	if(authorization === process.env.DEVICE_SECRET) {
		await next();
	} else {
		res.status(401).json({
			success: false,
			message: "Unauthorized device"
		})
	}
};