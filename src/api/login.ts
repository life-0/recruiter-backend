import {request} from "@/utils/service"
// @ts-ignore
import {postRequest} from "@/api"


interface IUserRequestData {
    username: string
    password: string
}

/** 登录，返回 token */
export function accountLogin(data: { account: string; password: string }) {
    let result = postRequest("/gate/login", data);
    console.log('Nav login:', result);
    return result

    // return request({
    //     url: "/api/gate/login",
    //     method: "post",
    //     data
    // })

}

/** 获取用户详情 */
export function userInfoRequest(token: string) {
    let result = postRequest("/permission/getUserRankByToken", {token: token});
    console.log('userInfoRequest:', result);
    return result
    // return request({
    //     url: "/api/permission/getUserRankById",
    //     method: "post",
    // })
}
