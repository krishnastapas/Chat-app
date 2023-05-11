import axios from "../axios"



// const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
//     "role": "system", "content": "Explain things like you're software professional with 10 years of experience."
// }
const systemMessage = {
    "role": "system", "content": "You are friendBot, an automated reply what they ask. \
You first greet the friend \
and then asks what he want."

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