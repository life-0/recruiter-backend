export interface firmInfo {
    /**
     * 唯一标识
     */
    number?: string;

    /*自增*/
    firmId?: number;

    /**
     * 公司名字
     */
    firmName?: string;

    /**
     * 公司头像
     */
    firmAvatar?: string;

    /**
     * 融资规模
     */
    financingScale?: string;
    /**
     * 福利
     */
    welfare?: string[];
    /**
     * 公司地址
     */
    address?: string;

    /**
     * 企业人数
     */
    firmNumber?: number;

    /**
     * 企业官网
     */
    officialUrl?: string;

    /**
     * 企业简介
     */
    introduction?: string;

    /**
     * 企业领域
     */

    field?: string;

    /**
     * 成立时间
     */

    established?: Date;

    /**
     * 法人
     */

    legalPerson?: string;

    /**
     * 注册资本
     */

    registeredCapital?: string;

    /**
     * 机构类型
     */

    organizationType?: string;

    /**
     * 公司信息链接
     */
    infoUrl?: string;

    /**
     * 状态 0: 可使用 1: 失效
     */

    state?: boolean;

    /**
     * 更新时间     value指数据库字段
     */

    updateTime?: Date;

    /**
     * 创建时间     value指数据库字段
     */
    createTime?: Date;
}


