export function Sidebar({ phoneNumber, setPhoneNumber, chatId, onCreateChat }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Чаты</h3>
      </div>
      <form onSubmit={onCreateChat} className="chat-create-form">
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Номер телефона (например, 79991234567)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Создать чат</button>
      </form>
      {chatId && (
        <div className="active-chat-item">
          <div className="avatar">M</div>
          <div className="chat-info">
            <span className="chat-name">{phoneNumber}</span>
            <span className="chat-status">Активен</span>
          </div>
        </div>
      )}
    </div>
  );
}
