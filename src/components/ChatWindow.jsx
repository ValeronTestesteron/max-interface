import { useEffect, useRef } from 'react';

export function ChatWindow({
  chatId,
  phoneNumber,
  messages,
  currentMessage,
  setCurrentMessage,
  onSendMessage,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chatId) {
    return (
      <div className="chat-window">
        <div className="no-chat-placeholder">
          <p>Выберите или создайте чат, чтобы начать общение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h4>Чат с {phoneNumber}</h4>
      </div>

      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.type}`}>
            <div className="message-box">
              <p className="message-text">{msg.text}</p>
              <span className="message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={onSendMessage} className="message-input-area">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
