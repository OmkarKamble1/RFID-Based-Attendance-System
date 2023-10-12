const saveAttendance = (req, res) => {
	const { uid } = req.body;
	console.log("POST UID: ", uid);
	res.status(200).send(JSON.stringify({
		success: true,
		message: "Attendance saved.",
		UID: uid
	}));
}

export default saveAttendance;