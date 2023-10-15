export const sessionCheckerMiddleware = async (req, res, next) => {
	if(!req.session || !req.session.user) {
		res.redirect('/teacher/login')
		return;
	} else {
		await next();
	}
}

export const loginMiddleware = async (req, res, next) => {
	if(!req.session || !req.session.user){
		await next();
	} else {
		res.redirect('/dashboard')
	}
};


export const saveAttendanceMiddleware = async (req, res, next) => {
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