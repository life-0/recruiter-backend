interface jobFavorites {
    /**
     * 唯一标识
     */
    Number: string;


    /**
     * 用户id
     */
    userId: number;

    /**
     * 职位标识
     */

    jobNumber: string;

    /**
     * 状态 0: 可使用 1: 失效
     */

    state: boolean;

    /**
     * 更新时间     value指数据库字段
     */
    updateTime: Date;

    /**
     * 创建时间     value指数据库字段
     */
    createTime: Date;
}

export default jobFavorites
