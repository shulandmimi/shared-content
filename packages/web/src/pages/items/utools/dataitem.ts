import { DataContent, DataItem, DataType } from '@shared/core';
import { platform } from '@/utools/platform';
export const createDataItem = (item: DataContent): DataItem => ({ platform: platform(), content: item });

export const createImageItem = (url: string) => createDataItem({ type: DataType.Image, url });
export const createTextItem = (content: string) => createDataItem({ type: DataType.Text, content });
export const createFileItem = (url: string) => createDataItem({ type: DataType.File, url });
