import { config } from "../config";
import { logger } from "../utils/winston";

const persistence = config.persistence;

class DAOFactory {
	constructor() {
		this.DAO = null;
	}

	getDAO = async () => {
		try {
			if (!this.DAO) {
				this.DAO = await import(`./products/${persistence}DAO.js`);
			}

			return this.DAO;
		} catch (error) {
			logger.log(
				"error",
				`No se encontro el DAO para la persistencia ${persistence} -> error: ${error}`
			);
		}
	};
}

export default DAOFactory;