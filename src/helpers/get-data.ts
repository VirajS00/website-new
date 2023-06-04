import mysql from "mysql2/promise";

export const getData = async (sql: string) => {
	const connection = await mysql.createConnection({
		host: import.meta.env.DATABASE_HOST,
		user: import.meta.env.DATABASE_USERNAME,
		database: import.meta.env.DATABASE_NAME,
		password: import.meta.env.DATABASE_PASSWORD,
		connectTimeout: 30000,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [rows, _] = await connection.query(sql);

	connection.destroy();

	return rows;
};
