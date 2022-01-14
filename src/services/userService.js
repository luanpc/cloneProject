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

const deleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
    deleteUser
}