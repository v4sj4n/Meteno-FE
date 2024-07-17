import { backendDir } from '@/Constants'
import axios from 'axios'

export const SimpleAxios = axios.create({
  baseURL: backendDir,
  // headers: {'Authorization': `Bearer ${token}`}
})
export const TokenAxios = axios.create({
  baseURL: backendDir,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})
