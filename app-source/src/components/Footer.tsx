export function Footer() {
  return (
    <footer className="site-footer">
      <div
        className="wrap"
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 10 }}
      >
        <p>© {new Date().getFullYear()} Jesús Alejandro García Hernández — Alejandro Hernández</p>
        <p>Marketing · Branding · IA · Data</p>
      </div>
    </footer>
  );
}
