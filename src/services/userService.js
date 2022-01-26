import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const editUser = (editData) => {
    return axios.put('/api/edit-user', editData)
}

const deleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCodeService,
    getTopDoctorHomeService
}