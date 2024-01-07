import dotenv from 'dotenv';

dotenv.config();

const mode = Number(process.env.APP_MODE);

const configs = [
  {
    filenames_path: String(process.env.FILENAMES),  
    files_dir_path: String(process.env.FILES_DIR),
    index_path: String(process.env.INDEXFILE)
  },
  {
    filenames_path: String(process.env.DEV_FILENAMES),  
    files_dir_path: String(process.env.DEV_FILES_DIR),
    index_path: String(process.env.INDEXFILE)
  },
  {
    filenames_path: String(process.env.TEST_FILENAMES),  
    files_dir_path: String(process.env.TEST_FILES_DIR),
    index_path: String(process.env.INDEXFILE)
  }
];

const config = configs[mode];

export default config;