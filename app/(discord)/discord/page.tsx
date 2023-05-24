export default function page() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'var(--font-vietnam)',
        color: 'white',
        backgroundColor: 'black',
        textDecoration: 'none',
        padding: '0 1rem',
      }}
    >
      <h1>This tool may or may not be remade in the future... sorry!</h1>
        <div style={{ cursor: 'pointer', padding: '0.5rem 1.5rem', color: 'black', backgroundColor: "white", borderRadius: '2rem', fontSize: '1.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: 'black' }}>Go back</a>
        </div>
    </div>
  )
}