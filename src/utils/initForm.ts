export const basicInit = {
  name: '', // 姓名*
  personStatus: 0, // 身分註記* 無 原住民 外籍人士
  personNo: '', // 身分證字號*(外籍人士請填護照號碼)
  cardNo: '', // 卡  號*
  birthday: '', //  出生日期*
  gender: 0, // 性  別*
  deathDate: '', // 性  別*
  permanentAddress: '', // 戶籍地址*
  mailingAddress: '', // 通訊地址
  mobile: '', // 行動電話*
  email: '', // email
  phones: [], // 其他電話
  educationLevel: 0, // 最高學歷
  educationOther: '', // 其他學歷
  insuranceNo: '', // 勞(公)保證號
  insuranceDate: '', // 投保日期
  identityAttaches: [], // 身分證明文件
  educationAttaches: [], // 學歷證明文件
  otherAttaches: [], // 其他相關附件
  remark: '', // 備註
}
export const incumbentInit = {
  organization: '',
  subsidiary: '',
  mineType: 0,
  projectName: '',
  libraryNo: '',
  positionTitle: 0,
  positionType: 0,
  employmentNo: '',
  employmentStart: '',
  employmentEnd: '',
  resignationNo: '',
  resignationStart: '',
  resignationEnd: '',
  certificateNo: '',
  incumbentFile: [],
  incumbentFileName: '',
  isShowIncumbentPositionTitle: false,
}

export const trainingInit = {
  organization: '', // 任職單位
  subsidiary: '', // 附屬單位
  positionTrainingType: 0, // 課程種類
  mineType: 0, // 礦場類別
  trainingType: 0, // 訓練課程類別
  years: 0, // 年度
  periodType: 0, // 期別 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
  customPeriod: 0,
  trainingStart: '', // 訓練起始日期
  trainingEnd: '', // 訓練結束日期
  trainingFile: [], // 附件上傳
  trainingFileName: '', // 附件顯示名稱
  isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
}

export const qualificationInit = {
  qualificationCategory: 0, // 資格類別
  certificateNo: '', // 證明書字號
  compliance: '', // 符合條款
  issueDate: '', // 發證日期
  qualificationFile: [], // 附件上傳
  qualificationFileName: '',
}

export const rewardInit = {
  jobAttrType: 0, // 職務屬性
  rewardType: 0, // 獎懲種類及額度
  legalBasisType: 0, // 法令依據
  rewardDate: '', // 獎懲日期
  rewardDesc: '', // 獎懲事實
  rewardFile: [], // 附件上傳
  rewardFileName: '', // 附件顯示名稱
}

export const createRequestData = {
  basic: {
    name: '', // 姓名*
    personStatus: 0, // 身分註記* 無 原住民 外籍人士
    personNo: '', // 身分證字號*(外籍人士請填護照號碼)
    cardNo: '', // 卡  號*
    birthday: '', //  出生日期*
    gender: '', // 性  別*
    deathDate: '', // 性  別*
    permanentAddress: '', // 戶籍地址*
    mailingAddress: '', // 通訊地址
    mobile: '', // 行動電話*
    email: '', // email
    phones: [], // 其他電話
    educationLevel: 0, // 最高學歷
    educationOther: '', // 其他學歷
    insuranceNo: '', // 勞(公)保證號
    insuranceDate: '', // 投保日期
    identityAttaches: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 身分證明文件
    educationAttaches: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 學歷證明文件
    otherAttaches: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 其他相關附件
    remark: '', // 備註
  },
  incumbents: [
    {
      organization: '', // 任職單位
      subsidiary: '', // 附屬單位
      mineType: 0, // 礦場類別
      projectName: '', // 工程名稱
      libraryNo: '', // 庫號
      positionTitle: 0, // 職稱
      positionType: 0, // 職別
      employmentNo: '', // 任用通過文號
      employmentStart: '', // 任用通過日期起
      employmentEnd: '', // 任用通過日期訖
      resignationNo: '', // 離職通過文號
      resignationStart: '', // 離職通過日期起
      resignationEnd: '', // 離職通過日期訖
      certificateNo: '', // 證書字號
      incumbentFile: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 附件上傳
    },
  ],
  trainings: [
    {
      organization: '', // 任職單位
      subsidiary: '', // 附屬單位
      positionTrainingType: 0, // 課程種類
      mineType: 0, // 礦場類別
      trainingType: 0, // 訓練課程類別
      years: 0, // 年度
      periodType: 0, // 期別 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
      customPeriod: 0,
      trainingStart: '', // 訓練起始日期
      trainingEnd: '', // 訓練結束日期
      trainingFile: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 附件上傳
    },
  ],
  qualifications: [
    {
      qualificationCategory: 0, // 資格類別
      certificateNo: '', // 證明書字號
      compliance: '', // 符合條款
      issueDate: '', // 發證日期
      qualificationFile: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 附件上傳
    },
  ],
  rewards: [
    {
      jobAttr: 0, // 職務屬性
      rewardType: 0, // 獎懲種類及額度
      legalBasis: 0, // 法令依據
      rewardDate: '', // 獎懲日期
      rewardDesc: '', // 獎懲事實
      rewardFile: [{name: 'xxx', url: 'data:image/png;base64xxx'}], // 附件上傳
    },
  ],
}
