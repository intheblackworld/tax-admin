import { get, post } from './axios'
// example
export const getPersonDetail = (employeeId: string) =>
  get(`api/person/${employeeId}`, {})
export const create = (data: object) => post('/api/person/insert', data)

/* 期別管理頁 */
// 搜尋
export const getPeriods = (data: object) => post('/api/periodmanagement/search', data)
// 期別管理_新增編輯
export const createPeriod = (data: object) => post('/api/periodadd', data)
export const deletePeriod = (id: string) => get(`/api/period-delete?PeriodId=${id}`, {})
/* 開徵作業頁 */
// 定期開徵-獲取資料-已繳清
export const getTaxList = (data: object) => post('/api/tax-list', data)
// 定期開徵-獲取資料-未繳清
export const getTaxUnpaidList = (data: object) => post('/api/tax-list-unpaid', data)
// 期開徵作業_定期開徵_新增編輯
export const createTax = (data: object) => post('/api/tax-add', data)



