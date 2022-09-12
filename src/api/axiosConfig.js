import axios from 'axios';
import qs from 'qs';

let api_base_url = ''
// vite
if (
    import.meta.env.NODE_ENV === 'development') {
    api_base_url = 'http://106.52.71.175:9090/'
} else if (
    import.meta.env.NODE_ENV === 'production') {
    //  http://106.52.71.175:9090/
    api_base_url = 'http://106.52.71.175:9090/'
}
// 如果是vue-cli
//if (process.env.NODE_ENV === 'development') {
//  api_base_url = 'https://client.doubilm.com'
//} else if (import.meta.env.NODE_ENV === 'production') {
//  api_base_url = 'https://client.doubilm.com'
//}

/*  防止请求重复
1. 我们需要对所有正在进行中的请求进行缓存。在请求发起前判断缓存列表中该请求是否正在进行，如果有则取消本次请求。
2.在任意请求完成后，需要在缓存列表中删除该次请求，以便可以重新发送该请求
*/

//正在请求的API队列
let requestList = []
/**
 * @name:  阻止请求get
 * @param {array} requestList 当前API请求队列
 * @param {string} currentUrl  当前请求API
 * @param {function} cancelFn  请求中断函数
 * @param {string} errorMsg   中断错误信息
 */
const stopRepeatRequest = (requestList, currentUrl, cancelFn, errorMsg) => {
    const errorMessage = errorMsg || '请求出错拥堵'
    for (let i = 0; i < requestList.length; i++) {
        if (requestList[i] === currentUrl) {
            cancelFn(errorMessage)
            return
        }
    }
    // 将当前请求加入执行队列
    requestList.push(currentUrl)
}
/**
 * @name:  请求完成后从队列删除当前请求
 * @param {array} requestList 当前API请求队列
 * @param {string} currentUrl  当前请求API
 */
const allowRequest = (requestList, currentUrl) => {
    for (let i = 0; i < requestList.length; i++) {
        if (requestList[i] === currentUrl) {
            requestList.splice(i, 1)
            break
        }
    }
}
/*
 * axios.get不能用@RequestBody获取，能用@RequestParam获取。
 * axios.post 可以用@RequestBody获取且不需要qs.stringify序列化，直接传对象就可以了。
 * post请求后台用@RequestParam()获取的时候，前端需要用qs.stringify序列化所传递的参数
 *
 */
let api = {} //接口请求

let jsonInstance = axios.create({ // json格式发送数据
    timeout: 1000 * 80,
    baseURL: api_base_url,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',

    },
})
/*设置json返回的数据*/
jsonInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// jsonInstance.defaults.responseType = 'json'
// jsonInstance.defaults.withCredentials = true

jsonInstance.defaults.transformRequest = [
    data => {
        // 转换成json格式 可对应后端的 @RequestBody
        return JSON.stringify(data)
    }
]

// jsonInstance.transformResponse = [
//     function (data) {
//         // 对 data 进行任意转换处理
//         console.log(data)
//         return data;
//     }]
jsonInstance.defaults.validateStatus = function () {
    // return status >= 200 && status < 400; // 200- 399  resolve  其他状态码 reject
    // 如果在响应拦截设置了状态码判断，这里设置返回 true
    return true
}
// 请求拦截器
jsonInstance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.headers.BASE_TOKEN = localStorage.getItem('token')
        // 设置cancelToken
        let cancelFn = null;
        config.cancelToken = new axios.CancelToken(function (c) {
            cancelFn = c
        })
        //阻止重复请求
        stopRepeatRequest(requestList, config.url, cancelFn, `不要连续请求：${config.url}，速度太快了`)
        //{url: "/slides", method: "get", headers: {…}, baseURL: "http://api.hzwlb.org", transformRequest: Array(1), responseType: "json",…}
        return config
    },
    error => {
        // Message.error({ message: '请求超时!' })
        // console.log('请求超时！');
        return Promise.reject(error)
    }
)
// 响应拦截器即异常处理
// 服务器 Response 对象
jsonInstance.interceptors.response.use(
    response => {
        //不得重复发送
        setTimeout(() => {
            allowRequest(requestList, response.config.url), 1000
        })
        // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
        let data = response.data //响应的数据部分(服务器返回部分)
        let status = response.status //标准状态码
        if (status === 200) { //如果响应正常则放行 数据
            return Promise.resolve(data)
        } else if (status >= 400 && status <= 499) {
            // Message.error({ message: '客户端请求错误!' })
            console.log('客户端请求错误码：', status);
            return
        } else {
            //其他错误
            // Message.error({ message: response.statusText })
            // console.log('服务器错误,错误码：', status);
            // return Promise.reject(response)
            if (axios.isCancel(thrown)) {
                console.log(thrown.message);
            } else {
                return Promise.reject(response)
            }
        }
    },
    error => {
        console.log('响应错误信息：')
        console.log(error.message)
    }
)

api.jsonGet = function (url, data) {
    return new Promise((resolve, reject) => {
        jsonInstance
            .get(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
api.jsonPost = function (url, data) {
    return new Promise((resolve, reject) => {
        jsonInstance
            .post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


let fileDownloadInstance = axios.create({
    timeout: 1000 * 80,
    baseURL: api_base_url,
    // responseType: 'blob' //接收返回的类型
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer',
    // 1 默认的格式请求体中的数据会以json字符串的形式发送到后端
    // headers: {
    // 	'Content-Type: application/json'
    // }

})
/*设置json返回的数据*/
fileDownloadInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// jsonInstance.defaults.responseType = 'json'
// jsonInstance.defaults.withCredentials = true

fileDownloadInstance.defaults.transformRequest = [
    data => {
        // 转换成name=XX&age=XX格式 可对应后端的 @RequestParam
        return qs.stringify(data)
    }
]
fileDownloadInstance.defaults.validateStatus = function () {
    // return status >= 200 && status < 400; // 200- 399  resolve  其他状态码 reject
    // 如果在响应拦截设置了状态码判断，这里设置返回 true
    return true
}
// 请求拦截器
fileDownloadInstance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.headers.BASE_TOKEN = localStorage.getItem('token')
        // 设置cancelToken
        let cancelFn = null;
        config.cancelToken = new axios.CancelToken(function (c) {
            cancelFn = c
        })
        //阻止重复请求
        stopRepeatRequest(requestList, config.url, cancelFn, `不要连续请求：${config.url}，速度太快了`)
        // {url: "/slides", method: "get", headers: {…}, baseURL: "http://api.hzwlb.org", transformRequest: Array(1), responseType: "json",…}
        return config
    },
    error => {
        // Message.error({ message: '请求超时!' })
        // console.log('请求超时！');
        return Promise.reject(error)
    }
)
// 响应拦截器即异常处理
// 服务器 Response 对象
fileDownloadInstance.interceptors.response.use(
    response => {
        //不得重复发送
        setTimeout(() => {
            allowRequest(requestList, response.config.url), 1000
        })
        // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
        let data = response.data //响应的数据部分(服务器返回部分)
        let status = response.status //标准状态码
        if (status === 200) { //如果响应正常则放行 数据
            return Promise.resolve(data)
        } else if (status >= 400 && status <= 499) {
            // Message.error({ message: '客户端请求错误!' })
            console.log('客户端请求错误码：', status);
        } else {
            //其他错误
            // Message.error({ message: response.statusText })
            // console.log('服务器错误,错误码：', status);
            // return Promise.reject(response)
            if (axios.isCancel(thrown)) {
                console.log(thrown.message);
            } else {
                return Promise.reject(response)
            }
        }
    },
    error => {
        console.log('响应错误信息：')
        console.log(error.message)
    }
)

api.fileDownloadGet = function (url, data) {
    return new Promise((resolve, reject) => {
        fileDownloadInstance
            .get(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
api.fileDownloadPost = function (url, data) {
    return new Promise((resolve, reject) => {
        fileDownloadInstance
            .post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

let mutlifileDownloadInstance = axios.create({

    // baseURL: api_base_url,
    // responseType: 'blob' //接收返回的类型
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer',
    // 1 默认的格式请求体中的数据会以json字符串的形式发送到后端
    // headers: {
    // 	'Content-Type: application/json'
    // }

})
mutlifileDownloadInstance.defaults.transformRequest = [
    data => {
        // 转换成name=XX&age=XX格式 可对应后端的 @RequestParam
        return qs.stringify(data)
    }
]

api.mutliFilesDownloadPost = function (data) {
    return mutlifileDownloadInstance
        .post("/api" + data.url, data.data)

}


// api.mutliFilesDownloadPost = async function(data) {
// let promises = [];
// // console.log("value", data);
// let result = [];
// data.forEach((value) => {
// 	axios({
// 			method: 'post',
// 			data: qs.stringify(value.data),
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			},
// 			url: 'http://106.52.71.175:9090' + value.url,
// 			responseType: 'arraybuffer'
// 		})
// 		.then(function(response) {
// 			result.push(response);
// 			// console.log("response", response.data);
// 		});
// })
// return result;

// data.forEach((value) => {
// 	// console.log(item);
// 	mutlifileDownloadInstance({
// 		method: 'post'
// 	}).then(response => {
// 		result.push(response)
// 		// resolve(response)
// 	});
// promises.push(
// 	new mutlifileDownloadInstance
// 	.post("/api" + value.url, value.data)
// 	.then(response => {
// 		result.push(response)
// 		// resolve(response)
// 	})
// )
// })
// return result;

// data.forEach(value => {
// 	promises.push(new Promise((resolve, reject) => {
// 		new mutlifileDownloadInstance
// 			.post("/api" + value.url, value.data)
// 			.then(response => {
// 				resolve(response)
// 			})
// 			.catch(error => {
// 				reject(error)
// 			})
// 	}))
// })
// return axios.all(promises);
// console.log("value", promises);
// return Promise.all(promises)

// }


let fileUploadInstance = axios.create({ // json格式发送数据
    timeout: 1000 * 80,
    baseURL: api_base_url,
    headers: {
        "Content-Type": "multipart/form-data"
    }

})
// defaultInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// defaultInstance.defaults.responseType = 'json'
// defaultInstance.defaults.withCredentials = true

fileUploadInstance.defaults.validateStatus = function () {
    // return status >= 200 && status < 400; // 200- 399  resolve  其他状态码 reject
    // 如果在响应拦截设置了状态码判断，这里设置返回 true
    return true
}
// 请求拦截器
fileUploadInstance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.headers.BASE_TOKEN = localStorage.getItem('token')
        // 设置cancelToken
        let cancelFn = null;
        config.cancelToken = new axios.CancelToken(function (c) {
            cancelFn = c
        })
        //阻止重复请求
        stopRepeatRequest(requestList, config.url, cancelFn, `不要连续请求：${config.url}，速度太快了`)
        //{url: "/slides", method: "get", headers: {…}, baseURL: "http://api.hzwlb.org", transformRequest: Array(1), responseType: "json",…}
        return config
    },
    error => {
        // Message.error({ message: '请求超时!' })
        // console.log('请求超时！');
        return Promise.reject(error)
    }
)
// 响应拦截器即异常处理
// 服务器 Response 对象
fileUploadInstance.interceptors.response.use(
    response => {
        //不得重复发送
        setTimeout(() => {
            allowRequest(requestList, response.config.url), 1000
        })
        // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
        let data = response.data //响应的数据部分(服务器返回部分)
        let status = response.status //标准状态码
        if (status === 200) { //如果响应正常则放行 数据
            return Promise.resolve(data)
        } else if (status >= 400 && status <= 499) {
            // Message.error({ message: '客户端请求错误!' })
            console.log('客户端请求错误码：', status);
        } else {
            //其他错误
            // Message.error({ message: response.statusText })
            // console.log('服务器错误,错误码：', status);
            // return Promise.reject(response)
            if (axios.isCancel(thrown)) {
                console.log(thrown.message);
            } else {
                return Promise.reject(response)
            }
        }
    },
    error => {
        console.log('响应错误信息：')
        console.log(error.message)
    }
)

api.fileUploadGet = function (url) {
    return new Promise((resolve, reject) => {
        fileUploadInstance
            .get(url)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
api.fileUploadPost = function (url, data) {
    return new Promise((resolve, reject) => {
        fileUploadInstance
            .post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

let defaultInstance = axios.create({ // json格式发送数据
    timeout: 1000 * 80,
    baseURL: api_base_url,

})
// defaultInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// defaultInstance.defaults.responseType = 'json'
// defaultInstance.defaults.withCredentials = true
defaultInstance.defaults.transformRequest = [
    data => {
        // 转换成name=XX&age=XX格式 可对应后端的 @RequestParam
        return qs.stringify(data)
        // return data
    }
]
defaultInstance.defaults.validateStatus = function () {
    // return status >= 200 && status < 400; // 200- 399  resolve  其他状态码 reject
    // 如果在响应拦截设置了状态码判断，这里设置返回 true
    return true
}
// 请求拦截器
defaultInstance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.headers.BASE_TOKEN = localStorage.getItem('token')
        // 设置cancelToken
        let cancelFn = null;
        config.cancelToken = new axios.CancelToken(function (c) {
            cancelFn = c
        })
        //阻止重复请求
        stopRepeatRequest(requestList, config.url, cancelFn, `不要连续请求：${config.url}，速度太快了`)
        //{url: "/slides", method: "get", headers: {…}, baseURL: "http://api.hzwlb.org", transformRequest: Array(1), responseType: "json",…}
        return config
    },
    error => {
        // Message.error({ message: '请求超时!' })
        // console.log('请求超时！');
        return Promise.reject(error)
    }
)
// 响应拦截器即异常处理
// 服务器 Response 对象
defaultInstance.interceptors.response.use(
    response => {
        //不得重复发送
        setTimeout(() => {
            allowRequest(requestList, response.config.url), 1000
        })
        // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
        let data = response.data //响应的数据部分(服务器返回部分)
        let status = response.status //标准状态码
        if (status === 200) { //如果响应正常则放行 数据
            return Promise.resolve(data)
        } else if (status >= 400 && status <= 499) {
            // Message.error({ message: '客户端请求错误!' })
            console.log('客户端请求错误码：', status);
            return
        } else {
            //其他错误
            // Message.error({ message: response.statusText })
            // console.log('服务器错误,错误码：', status);
            // return Promise.reject(response)
            if (axios.isCancel(thrown)) {
                console.log(thrown.message);
            } else {
                return Promise.reject(response)
            }
        }
    },
    error => {
        console.log('响应错误信息：')
        console.log(error.message)
    }
)

api.get = function (url) {
    return new Promise((resolve, reject) => {
        defaultInstance
            .get(url)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
api.post = function (url, data) {
    return new Promise((resolve, reject) => {
        defaultInstance
            .post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default api
