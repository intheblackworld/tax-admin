import { get, post } from './axios'
// example
export const getPersonDetail = (employeeId: string) =>
  get(`api/person/${employeeId}`, {})
export const create = (data: object) => post('/api/person/insert', data)

const devApi = 'https://www.kase.com.tw/MOEA_Auth/'
const prdApi = 'https://mims.mine.gov.tw/AuthService/'
const devOuterApi = 'https://www.kase.com.tw/MOEA_MIMS/'
const prdOuterApi = 'https://mims.mine.gov.tw/MineMIMSBackend/'


const authUrl = process.env.NODE_ENV === 'development' ? devApi : prdApi
const outerUrl = process.env.NODE_ENV === 'development' ? devOuterApi : prdOuterApi

/* 期別管理頁 */
// 搜尋
export const getPeriods = (data: object) =>
  post('/api/periodmanagement/search', data)
// 期別管理_新增編輯
export const createPeriod = (data: object) => post('/api/periodadd', data)
export const deletePeriod = (id: string) =>
  get(`/api/period-delete?PeriodId=${id}`, {})
/* 開徵作業頁 */
// 定期開徵-獲取資料-已繳清
export const getTaxList = (data: {
  year: string
  type: number
  PaylimitDate: string
  CreateTaxDate: string,
}) =>
  get(
    `/api/tax-list?year=${data.year}&type=${data.type}&PaylimitDate=${
    data.PaylimitDate
    }&CreateTaxDate=${data.CreateTaxDate}`,
    {},
  )
// 定期開徵-獲取資料-未繳清
export const getTaxUnpaidList = (data: {
  PaylimitDate: string, CreateTaxDate: string, year: string
  type: number, IsTaxCase: boolean
}) =>
  get(
    `/api/tax-list-unpaid/${data.PaylimitDate}?year=${data.year}&type=${data.type}&CreateTaxDate=${
    data.CreateTaxDate
    }&IsTaxCase=${data.IsTaxCase}`,
    {},
  )
// 定期開徵作業_定期開徵_新增編輯
export const createTax = (data: object) => post('/api/tax-add', data)
// 個案開徵-獲取資料
export const getTaxCase = (data: {
  year: string
  type: number
  PaylimitDate: string
  CreateTaxDate: string,
}) =>
  get(
    `/api/tax-case/${data.PaylimitDate}?year=${data.year}&type=${data.type}&CreateTaxDate=${data.CreateTaxDate}`,
    {},
  )
// 列印通知表
export const addPrint = (data: object) => post('/api/noticerecord-add', data)

/* 開徵管理頁 */
export const getTaxManage = (data: object) =>
  post('/api/tax-management/search', data)
/* multiple btn */
// 開徵管理_繳費_全繳
export const payAll = (data: object) =>
  post('/api/tax-management/payment-add-all', data)
// 開徵管理_繳費(非全繳)
export const payCustom = (data: object) =>
  post('/api/tax-management/payment-add', data)
// 編輯
export const createTaxManage = (data: object) =>
  post('/api/tax-management/update', data)
// 繳費記錄
export const payHistory = (data: { No: string; Type: number; Year: number }) =>
  get(
    `/api/tax/resume/payment-record?No=${data.No}&Type=${data.Type}&Year=${
    data.Year
    }`,
    {},
  )

/* 開徵履歷頁 */
// 1./api/tax/resume/search 開徵履歷_礦區列表=> 開徵履歷左下的礦場字號及名稱
export const getHistory = (data: object) => post('/api/tax/resume/search', data)
// 2./api/tax/resume/payment-record 開徵履歷_繳費紀錄 => 繳費紀錄
export const getPaymentHistory = (data: { No: string }) =>
  get(`/api/tax/resume/payment-record?No=${data.No}`, {})
// 3./api/tax/resume/notice-record 開徵履歷_繳納通知單紀錄 => 繳納通知單紀錄
export const getNoticeHistory = (data: { No: string }) =>
  get(`/api/tax/resume/notice-record?No=${data.No}`, {})
// 4. /api/tax/resume/tax-record 開徵履歷_開徵作業=>開徵紀錄
export const getTaxHistory = (data: { No: string }) =>
  get(`/api/tax/resume/tax-record?No=${data.No}`, {})

/* 開立通知單紀錄 */
export const getNotice = (data: object) =>
  post('/api/noticerecord/search', data)

export const login = () =>
  post(authUrl + 'api/login/', {
    'nameid': 'aallom4j',
    'given_name': 'Adriena Allom',
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': [
      'Billboard.Manage',
      'Permission.Manage',
      'People.Manage',
      'People.Search',
    ],
    'exp': 1560346273,
    'iss': 'MOAE',
    'aud': 'Auth',
  })

export const logout = () =>
  get(authUrl + 'api/logout/', {})

/* 報表列印 */
// unit0 + unit1 + unit2 = 000, 010, 012 ......
// 000 當期開徵明細
export const getPeriodSingle = (data: object) =>
  post('/api/report-current-period-tax', data)
// 010 四期開徵明細
export const getPeriodFour = (data: object) =>
  post('/api/report-four-tax', data)
// 011 單期別已繳明細 -> 實際上是四期別已繳明細
export const getPeriodFourPaid = (data: object) =>
  post('/api/report-single-peroid-paid', data)
// 012 四期欠繳開徵明細
export const getPeriodFourUnPaid = (data: object) =>
  post('/api/report-four-refund-tax', data)
// 020 選擇期別開徵明細
export const getPeriodMultiple = (data: object) =>
  post('/api/report-multiple-tax', data)
// 021 跨期別已繳明細
export const getPeriodMultiplePaid = (data: object) =>
  post('/api/report-multiple-peroid-paid', data)
// 022 跨期別欠繳明細
export const getPeriodMultipleUnPaid = (data: object) =>
  post('/api/report-multiple-peroid-unpaid', data)

// 100 個案開徵明細
export const getCaseTax = (data: object) => post('/api/report-case-tax', data)

// 200 具礦產權利金
export const getRoyalty = (data: object) =>
  post('/api/report-royalty-detail', data)
// 201 核減礦業權費明細
export const getRefund = (data: object) =>
  post('/api/report-refund-mineconcessionfee', data)
// 202 具欠繳金額(四期)
export const getPeriodSingleUnpaid = (data: object) =>
  post('/api/report-single-peroid-unpaid', data)
// 300 權利金徵收額
export const getCollectionPrice = (data: object) =>
  post('/api/report-collection-price', data)
// 301 場交單價
export const getFieldPrice = (data: object) =>
  post('/api/report-field-price', data)

export const FetchUrlsByUsername = (name: string) =>
  post(`${authUrl}api/AuthorityMember/FetchUrlsByUsername`, { username: name })

// ## 0定期開徵明細
// ### 0選擇期別: 單期
// 0全部 /api/report-current-period-tax 000
// 1已繳 001
// 2欠繳 002
// ### 1選擇期別: 四期
// 0全部 /api/report-four-tax 010
// 1已繳 /api/report-single-peroid-paid 011
// 2欠繳 /api/report-four-refund-tax 012
// ### 2選擇期別: 多期
// 0全部 /api/report-multiple-tax 020
// 1已繳 /api/report-multiple-peroid-paid 021
// 2欠繳 /api/report-multiple-peroid-unpaid 022
// ---

// ## 1個案開徵明細
// /api/report-case-tax 100
// ---

// ## 2金額判斷
// ### 0金額類別: 具礦產權利金
// /api/report-royalty-detail 200
// ### 1金額類別: 具核減礦業權費
// /api/report-refund-mineconcessionfee 201
// ### 2金額類別: 具欠繳金額(四期)
// /api/report-single-peroid-unpaid 202
// ---

// ## 3場交價相關報表
// ### 0選擇報表：權利金徵收額
// /api/report-collection-price 300
// ### 1選擇報表：場交單價
// /api/report-field-price 301
