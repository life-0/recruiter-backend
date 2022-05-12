import api from "./axiosConfig"

export const getRequest = (url) => api.get("/api" + url)
export const postRequest = (url, data) => api.post("/api" + url, data)

export const getJsonRequest = (url, data) => api.jsonGet("/api" + url, data)
export const postJsonRequest = (url, data) => api.jsonPost("/api" + url, data)

export const getFileDownload = (url, data) => api.fileDownloadGet("/api" + url, data)
export const postFileDownload = (url, data) => api.fileDownloadPost("/api" + url, data)

export const getFileUpload = (url, data) => api.fileUploadGet("/api" + url, data)
export const postFileUpload = (url, data) => api.fileUploadPost("/api" + url, data)
