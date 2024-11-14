import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { Scrollbars } from "react-custom-scrollbars-2";
import useSocketIO from "../../layouts/header/header-01/useWebSocket";
import { IoMdChatbubbles } from "react-icons/io";

const ChatBot = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const scrollbarsRef = useRef(null);

    const { isConnected, chatMessages, sendMessage } = useSocketIO(userId);
    console.log(isConnected, chatMessages, sendMessage);

    useEffect(() => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollToBottom();
        }
    }, [chatMessages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === "") return;

        sendMessage("chat_message", { 
            senderId: userId, 
            recipientId: 'AI', 
            message: inputMessage,
            timestamp: new Date().toISOString()
        });

        setInputMessage("");
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button onClick={toggleChat} className="chatbot-toggle" aria-label="Open chat">
                    <IoMdChatbubbles className="chatbot-icon" />
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>ChatBot</h3>
                        <button onClick={toggleChat} className="chatbot-close" aria-label="Close chat">
                            ✖
                        </button>
                    </div>

                    <Scrollbars ref={scrollbarsRef} autoHide autoHideTimeout={1000} autoHideDuration={200} className="chatbot-messages">
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`message ${message.senderId === userId ? "user-message" : "bot-message"}`}>
                                <div className="message-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message.message)}} />
                                <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                            </div>
                        ))}
                    </Scrollbars>

                    <form onSubmit={handleSendMessage} className="chatbot-input-form">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="chatbot-input"
                            aria-label="Type a message"
                        />
                        <button type="submit" className="chatbot-send" aria-label="Send message">
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;