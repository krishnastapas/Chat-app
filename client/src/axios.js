import axios from "axios"

const instsnce = axios.create({
    // baseURL:'http://localhost:5001/pathfinder-exam-platform/us-central1/api'
    // baseURL: " https://us-central1-pathfinder-exam-platform.cloudfunctions.net/api"
    baseURL: "http://192.168.98.114:81"
    // baseURL: ""



})

export default instsnce;
