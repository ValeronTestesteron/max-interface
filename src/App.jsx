import { useState, useEffect, useRef } from 'react';
import { AuthCard } from './components/AuthCard';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import './App.css';

function App() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [chatId, setChatId] = useState('');

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const baseUrl = `https://api.green-api.com`;
  const chatIdRef = useRef(chatId);

  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  const handleAuthorize = () => {
    if (idInstance && apiTokenInstance) setIsAuthorized(true);
  };

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setChatId(`${phoneNumber.replace(/\D/g, '')}@c.us`);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || !chatId) return;

    const url = `${baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const payload = { chatId, message: currentMessage };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: currentMessage,
            type: 'outgoing',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setCurrentMessage('');
      } else {
        alert('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;

    let isMounted = true;

    const receiveNotifications = async () => {
      const receiveUrl = `${baseUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

      while (isMounted) {
        try {
          const response = await fetch(receiveUrl);

          if (response.status === 200) {
            const textData = await response.text();

            if (!textData || textData.trim() === '') {
              await new Promise((resolve) => setTimeout(resolve, 3000));
              continue;
            }

            const data = JSON.parse(textData);

            if (data && data.receiptId) {
              const receiptId = data.receiptId;
              const typeWebhook = data.body?.typeWebhook;

              if (typeWebhook === 'incomingMessageReceived') {
                const messageData = data.body?.messageData;
                const senderId = data.body?.senderData?.sender || data.body?.senderData?.chatId;

                if (messageData && messageData.typeMessage === 'textMessage') {
                  const text = messageData.textMessageData?.textMessage;
                  const currentChatId = chatIdRef.current;

                  if (currentChatId && senderId === currentChatId && text) {
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: receiptId,
                        text: text,
                        type: 'incoming',
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        }),
                      },
                    ]);
                  }
                }
              }

              const deleteUrl = `${baseUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
              await fetch(deleteUrl, { method: 'DELETE' });
            }
          } else if (response.status === 400 || response.status === 403) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        if (isMounted) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    receiveNotifications();

    return () => {
      isMounted = false;
    };
  }, [isAuthorized, idInstance, apiTokenInstance, baseUrl]);

  return (
    <div className="app-container">
      {!isAuthorized ? (
        <AuthCard
          idInstance={idInstance}
          setIdInstance={setIdInstance}
          apiTokenInstance={apiTokenInstance}
          setApiTokenInstance={setApiTokenInstance}
          onAuthorize={handleAuthorize}
        />
      ) : (
        <div className="messenger-container">
          <Sidebar
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            chatId={chatId}
            onCreateChat={handleCreateChat}
          />
          <ChatWindow
            chatId={chatId}
            phoneNumber={phoneNumber}
            messages={messages}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            onSendMessage={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
