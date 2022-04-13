import { Action } from './interface';
import { uploadFileFromDisk } from '../tools/qiniu';
interface UploadFile {
    isFile: true;
    isDirectory: false;
    name: string;
    path: string;
}
interface UploadDir {
    isFile: false;
    isDirectory: true;
    name: string;
    path: string;
}

/**
 * {
  code: 'upload',
  type: 'files',
  payload: [
    {
      isFile: true,
      isDirectory: false,
      name: '下载.jpg',
      path: 'C:\\Users\\Administrator\\Desktop\\下载.jpg'
    }
  ]
}
{
  code: 'upload',
  type: 'files',
  payload: [
    {
      isFile: false,
      isDirectory: true,
      name: 'homework',
      path: 'C:\\Users\\Administrator\\Desktop\\homework'
    }
  ]
}
 */
export default async function uploadFile(action: Action<UploadFile | UploadDir>) {}
