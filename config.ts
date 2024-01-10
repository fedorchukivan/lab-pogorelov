import dotenv from 'dotenv';

dotenv.config();

const mode = Number(process.env.APP_MODE);
const port = Number(process.env.PORT);
const index_default = String(process.env.DEF_INDEXFILE);

const configs = [
  {
    files_loc: String(process.env.FILES_LOC_PROD),
    filenames_default: String(process.env.DEF_FILENAMES),  
    files_dir_path: String(process.env.DEF_FILES_DIR),
    port,
    index_default
  },
  {
    files_loc: String(process.env.FILES_LOC),
    filenames_default: String(process.env.DEF_FILENAMES),  
    files_dir_path: String(process.env.DEF_FILES_DIR),
    port,
    index_default
  },
  {
    files_loc: String(process.env.FILES_LOC),
    filenames_default: String(process.env.TEST_FILENAMES),  
    files_dir_path: String(process.env.TEST_FILES_DIR),
    port,
    index_default
  }
];

const config = configs[mode];

export default config;