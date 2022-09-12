export interface jobHuntingInfo {
    /**
     * 唯一标识
     */
    id?: number

    /**
     * 求职状态
     */
    jobStatus?: string

    /**
     * 职位
     */
    position?: string

    /**
     * 最低工资
     */
    salaryMin?: number

    /**
     * 最高工资
     */
    salaryMax?: number

    /**
     * 期望城市
     */
    expectCity?: string[]

    /**
     * 工作性质
     */
    jobNature?: string


    /**
     * 期望行业
     */
    expectIndustry?: string

    /**
     * 学校名称
     */
    colleges?: string

    /**
     * 学历
     */
    education?: string


    /**
     * 专业
     */
    profession?: string


    /**
     * 学年
     */
    academicYear?: Date[] | any

    /**
     * 附件路径
     */
    appendix?: string

    /**
     * 专业技能
     */
    professionalSkill?: string


    /**
     * 作品
     */
    works?: string

    /**
     * 状态 0: 可用 1:不可用
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


