import Axios from "axios";

const API_KEY =
  '';
const url = 'http://localhost:8080/';

const instance = Axios.create({
    withCredentials: true,
    baseURL: url,
    headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json",
    },
});

export const scanAPI = {
    setInput(raw) {
        return instance.post(`receipts`, raw)
    },
}

export const historyAPI = {
    updData(raw) {
        return instance.get(`receipts?ids=${raw}`)
    },
}