import { useContext } from 'react'
import { ChatContext } from './feature/context/ChatContext';

function Chat() {
  const { user } = useContext(ChatContext);
  return (
    <div>{user}</div>
  )
}

export default Chat