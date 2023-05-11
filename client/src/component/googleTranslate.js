import axios from "../axios"


export const googleTranslateApi = async ({ text, code }) => {
    try {
        console.log({
            "text": text,
            "code": code
        })
        let path = 'text-translate';
        let payload = {
            "text": text,
            "language": code
        }
        const response =await axios.post(path, payload);

        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error)
    }
}
