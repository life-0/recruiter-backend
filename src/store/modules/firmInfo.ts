class firmInfo {
    address: string
    createTime: Date
    established: Date
    field: string
    financingScale: string
    firmAvatar: string
    firmId: number
    firmName: string
    firmNumber: number
    infoUrl: string
    introduction: string
    legalPerson: string
    number: string
    officialUrl: string
    organizationType: string
    registeredCapital: string
    state: boolean
    updateTime: Date
    welfare: string[]

    constructor(address: string, createTime: Date, established: Date,
                field: string, financingScale: string, firmAvatar: string,
                firmId: number, firmName: string, firmNumber: number,
                infoUrl: string, introduction: string, legalPerson: string,
                number: string, officialUrl: string, organizationType: string,
                registeredCapital: string, state: boolean, updateTime: Date, welfare: string[]) {
        this.address = address
        this.createTime = createTime
        this.established = established
        this.field = field
        this.financingScale = financingScale
        this.firmAvatar = firmAvatar
        this.firmId = firmId
        this.firmName = firmName
        this.firmNumber = firmNumber
        this.infoUrl = infoUrl
        this.introduction = introduction
        this.legalPerson = legalPerson
        this.number = number
        this.officialUrl = officialUrl
        this.organizationType = organizationType
        this.registeredCapital = registeredCapital
        this.state = state
        this.updateTime = updateTime
        this.welfare = welfare

    }
}
