import { io } from 'socket.io-client'
import { ApiBaseUrl } from './apiInstace'

export const socket = io(ApiBaseUrl)
