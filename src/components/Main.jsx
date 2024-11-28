import userImg from '../assets/user_icon.png'
import chatImg from '../assets/gemini_icon.png'
import sendImg from '../assets/send_icon.png'
import galleryImg from '../assets/gallery_icon.png'
import micImg from '../assets/mic_icon.png'
import { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Main() {
    const textRef = useRef();
    const chatSessionRef = useRef(null);
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([
        {
            user: true,
            message: "Hello"
        },
        {
            user: false,
            message: "Hello im not user"
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!chatSessionRef.current) {
            chatSessionRef.current = model.startChat({
                generationConfig: {
                    temperature: 0.9,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 2048
                },
                history: []
            });
        }
    }, [messages]);
    function handleHideSend(){
        if(textRef.current){
            setIsTyping(false);
        }else{
            setIsTyping(true)
        }
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemeni-1.5-pro" });

    const Message = ({ user, message }) => (
        <div className={`message ${user ? 'user-message' : 'chat-message'}`}>
            <img src={user ? userImg : chatImg} alt="avatar" />
            <p>{message}</p>
        </div>
    );

    return (
        <main className="main">
            <div className="top-block">
                <p>Gemini</p>
                <img src={userImg} alt="" />
            </div>
            <div className="chat-container">
                <div className="chat">
                    {messages.map((message, index) => (
                        <Message key={index} user={message.user} message={message.message} />
                    ))}
                </div>
            </div>
            <div className="chat-footer">
                <div className="chat-input">
                    <input type='text' value={input} onChange={(e) => {
                        handleHideSend()
                        setInput(e.target.value)
                        }} placeholder='Enter a prompt here' ref={textRef} />
                    <div className="promt-inputs">
                        <button className='image-send'>
                            <img src={galleryImg} alt="" />
                        </button>
                        <button className='voice-send'>
                            <img src={micImg} alt="" />
                        </button>
                        {isTyping &&
                            <button className="chat-send">
                                <img src={sendImg} alt="" />
                            </button>
                        }
                    </div>
                </div>
            </div>
            <p className='disclaimer'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </main>
    );
}