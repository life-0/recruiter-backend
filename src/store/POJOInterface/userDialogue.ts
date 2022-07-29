interface userDialogue {
    /**
     * 唯一标识
     */
    number: string;

    id: number;

    /**
     * 联系对象id
     */
    contactUserId: number;

    /**
     * 对话记录路径
     */
    recordPath: string;
}
export default userDialogue
