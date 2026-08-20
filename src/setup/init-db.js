//External
const fs = require('fs');
const path = require('path');
//Database
const { dbConnection } = require('../db/config');

const INIT_DIR = path.join(__dirname, '..', '..', 'init');
const INIT_FILES = [
  '01_db_dispositivos_electronicos_DDL.sql',
  '02_db_dispositivos_electronicos_DML_INSERT.sql',
  '03_db_dispositivos_electronicos_DML_UPDATE.sql',
];

/**
 * @returns {Promise<boolean>}
 */
const componentesTableExists = async () => {
  const [rows] = await dbConnection.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'componentes'
    ) AS "exists";
  `);
  return Boolean(rows?.[0]?.exists);
};

/**
 * Runs one SQL file against the configured database.
 * @param {string} fileName
 */
const runSqlFile = async (fileName) => {
  const fullPath = path.join(INIT_DIR, fileName);
  let sql = fs.readFileSync(fullPath, 'utf8');
  // Docker seed uses "DELETE ... CASCADE" (MySQL-ish); Postgres only allows CASCADE on DROP/TRUNCATE
  sql = sql.replace(/delete\s+from\s+(\w+)\s+cascade\s*;/gi, 'DELETE FROM $1;');
  console.log(`[db-init] Running ${fileName}...`);
  await dbConnection.query(sql);
  console.log(`[db-init] Done ${fileName}`);
};

/**
 * If public.componentes is missing, apply DDL + INSERT + UPDATE (same scripts as Docker init/).
 * Local Docker already seeds on first boot, so this is a no-op there.
 */
const ensureDatabaseInitialized = async () => {
  try {
    await dbConnection.authenticate();
    const exists = await componentesTableExists();
    if (exists) {
      console.log('[db-init] Schema already present (componentes). Skip.');
      return { initialized: false, reason: 'already_exists' };
    }

    console.log('[db-init] Empty database detected. Applying DDL + INSERT + UPDATE...');
    for (const fileName of INIT_FILES) {
      await runSqlFile(fileName);
    }
    console.log('[db-init] Database ready.');
    return { initialized: true, reason: 'created', files: INIT_FILES };
  } catch (error) {
    const detail =
      error?.parent?.message || error?.message || error?.original?.message || String(error);
    console.error(`[db-init] Failed: ${detail}`);
    throw error;
  }
};

module.exports = {
  ensureDatabaseInitialized,
  componentesTableExists,
};

if (require.main === module) {
  ensureDatabaseInitialized()
    .then((result) => {
      console.log('[db-init]', result);
      process.exit(0);
    })
    .catch(() => process.exit(1));
}
