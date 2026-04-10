import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gov_scheme_app",
  password: "MsdNjr71011",
  port: 5000
});

export default pool;