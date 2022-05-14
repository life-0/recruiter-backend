class userInfo {
    address: string
    age: number
    createTime: Date
    email: string
    firmId: number
    gender: boolean
    id: number
    imgPath: string
    introduction: string
    iphone: string
    name: string
    number: string
    position: string
    state: boolean
    updateTime: Date
    vx: string

    // 构造方法
    constructor(address: string, age: number, createTime: Date,
                email: string, firmId: number, gender: boolean,
                id: number, imgPath: string, introduction: string,
                iphone: string, name: string, number: string, position: string,
                state: boolean, updateTime: Date, vx: string,) {
        this.address = address
        this.age = age
        this.createTime = createTime
        this.email = email
        this.firmId = firmId
        this.gender = gender
        this.id = id
        this.imgPath = imgPath
        this.introduction = introduction
        this.iphone = iphone
        this.name = name
        this.number = number
        this.position = position
        this.updateTime = updateTime
        this.createTime = createTime
        this.state = state
        this.vx=vx
    }
    set(id: number) {
        this.id = id
    }



}
