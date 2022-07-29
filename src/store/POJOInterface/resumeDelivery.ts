export interface resumeDelivery {
    /**
     * 唯一标识
     */
    number?: string;

    /**
     * 用户id
     */
    userId?: number;

    /**
     * 是否使用在线简历
     */
    isOnlineResume?: boolean;

    /**
     * 职位标识
     */
    jobNumber?: string;

    /**
     * 公司id
     */
    firmId?: number;

    /**
     * 状态 0: 可使用 1: 失效
     */
    state?: boolean;

    /**
     * 简历评估结果 1:未查看 2:已查看(正在评估) 3: 简历通过 4:简历拒绝
     */
    result?: number;

    /**
     * 更新时间     value指数据库字段
     */
    updateTime?: Date;

    /**
     * 创建时间     value指数据库字段
     */
    createTime?: Date;
}


