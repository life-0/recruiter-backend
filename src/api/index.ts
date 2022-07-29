// @ts-ignore
import api from "./axiosConfig.js";

export const getJsonRequest = (url: string, data: any) => api.jsonGet('/api' + url, data)
export const postJsonRequest = (url: string, data: any) => api.jsonPost('/api' + url, data)

export const getFileDownload = (url: string, data: any) => api.fileDownloadGet('/api' + url, data)
export const postFileDownload = (url: string, data: any) => api.fileDownloadPost('/api' + url, data)

export const getFileUpload = (url: string, data: any) => api.fileUploadGet('/api' + url, data)
export const postFileUpload = (url: string, data: any) => api.fileUploadPost('/api' + url, data)

export const getRequest = (url: string) => api.get('/api' + url)
export const postRequest = (url: string, data: any) => api.post('/api' + url, data)
