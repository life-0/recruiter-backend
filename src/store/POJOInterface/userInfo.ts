export interface userInfo {
    /**
     * 唯一标识
     */
    number?: string;

    /**
     * ID
     */
    id?: number;

    /**
     * 真实姓名
     */
    name?: string;

    /*
     *  年龄
     */
    age?: number;

    /**
     * 性别
     */
    gender?: boolean;

    /**
     * 住址
     */
    address?: string;

    /**
     * 职位
     */
    position?: string;
    /**
     * 公司id
     */
    firmId?: number;

    /**
     * 邮箱
     */
    email?: string;

    /**
     * 电话
     */
    iphone?: string;

    /**
     * 微信号
     */
    vx?: string;

    /**
     * 创建时间
     */
    createTime?: Date;

    /**
     * 图片路径
     */
    imgPath?: string;
    /**
     * 简介
     */
    introduction?: string;
    /**
     * 更新时间
     */
    updateTime?: Date;
    /**
     * 状态 0: 可使用 1: 失效
     */
    state?: boolean;
}
