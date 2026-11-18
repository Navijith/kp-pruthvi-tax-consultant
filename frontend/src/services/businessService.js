import api from './api'

export const getBusinesses = async () => (await api.get('/businesses')).data
export const getBusinessById = async (id) => (await api.get(`/businesses/${id}`)).data
