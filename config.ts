import dotenv from 'dotenv';

dotenv.config();

const mode = Number(process.env.APP_MODE);

const configs = [
  {
    filenames_path: process.env.FILENAMES,  
    files_dir_path: process.env.FILES_DIR
  },
  {
    filenames_path: process.env.DEV_FILENAMES,  
    files_dir_path: process.env.DEV_FILES_DIR
  },
  {
    filenames_path: process.env.TEST_FILENAMES,  
    files_dir_path: process.env.TEST_FILES_DIR
  }
];

const config = configs[mode];

export default config;