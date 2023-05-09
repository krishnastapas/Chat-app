import axios from "../axios"



// const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
//     "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
// }
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to your boyfriend."
}


export const chatGPTAPI = async ({ messageList }) => {

    try {


        console.log(messageList)
        let payload = [systemMessage, ...messageList];
        let path = `/chatbot`
        const response = await axios.post(path, payload);
        if (response.status == 200) {
            let newArray = [...messageList, response.data].reverse()
            return newArray
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}