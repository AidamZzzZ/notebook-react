import axios from "axios";

const getAll = (url) => {
    const response = axios.get(url).then(response => response.data)
    return response
}

const created = (url, newObject) => {
    const response = axios.post(url, newObject). then(response =>  response.data)
    return response
}

const deleted = (url, id) => {
    const response = axios.post(`${url}/${id}`).then(response => response.data)
    return response
}

export default { getAll, created, deleted }