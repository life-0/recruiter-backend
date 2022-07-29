export interface jobList {
    /**
     * 唯一标识
     */
    number: string;

    /**
     * 发布者id
     */

    announcerId: number;
    /**
     * 公司id
     */
    firmId: number;

    /**
     * 职位
     */
    position: string;
    /**
     * 职位
     */
    technologyStack: string[];
    /**
     * 薪资
     */
    salary?: number[];

    /**
     * 工作地址
     */
    address: string;

    /**
     * 工作经验
     */
    workExperience: string;

    /**
     * 学历
     */
    education: string;

    /**
     * 需求人数
     */
    requireCount: number;

    /**
     * 申请人数
     */
    applicantCount: number;

    /**
     * 应聘条件
     */
    applicationConditions: string;

    /**
     * 工作性质
     */
    nature: string;

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

