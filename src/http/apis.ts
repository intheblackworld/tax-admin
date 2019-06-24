import { get, post } from './axios'
// example
export const getPersonDetail = (employeeId: string) =>
  get(`api/person/${employeeId}`, {})
export const create = (data: object) => post('/api/person/insert', data)
