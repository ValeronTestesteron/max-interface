export function AuthCard({
  idInstance,
  setIdInstance,
  apiTokenInstance,
  setApiTokenInstance,
  onAuthorize,
}) {
  return (
    <div className="auth-card">
      <h2>Настройка GREEN-API</h2>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <button onClick={onAuthorize}>Войти в чат</button>
    </div>
  );
}
