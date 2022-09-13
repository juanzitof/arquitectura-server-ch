import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "public/users_photos");
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}.${file.originalname.split(".")[1]}`);
	},
});

export default multer({ storage: storage });