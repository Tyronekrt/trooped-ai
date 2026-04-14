import { useState } from "react";

export default function Home() {
  const [adInput, setAdInput] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adInput, url }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>AI Landing Page Optimizer</h1>
        <p style={styles.subtitle}>
          Personalize landing pages based on ad intent using AI-driven CRO logic
        </p>
      </div>

      {/* INPUT CARD */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Input Configuration</h2>

        <textarea
          placeholder="Paste Ad Creative (e.g. 50% off coding courses for beginners...)"
          value={adInput}
          onChange={(e) => setAdInput(e.target.value)}
          style={styles.textarea}
        />

        <input
          type="text"
          placeholder="Enter Landing Page URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? "Generating Personalization..." : "Generate Optimized Page"}
        </button>

        {error && <div style={styles.errorBox}>⚠️ {error}</div>}
      </div>

      {/* RESULTS */}
      {result && result.original && result.personalized && (
        <div style={styles.grid}>
          {/* ORIGINAL */}
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Original Page</h3>

            <div style={styles.previewBox}>
              <h2>{result.original.headline}</h2>
              <p>{result.original.subheadline}</p>
              <button style={styles.cta}>{result.original.cta}</button>

              <div style={styles.textBlock}>
                {result.original.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* PERSONALIZED */}
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>AI Personalized Page</h3>

            <div style={{ ...styles.previewBox, background: "#f0f7ff" }}>
              <h2>{result.personalized.headline}</h2>
              <p>{result.personalized.subheadline}</p>
              <button style={{ ...styles.cta, background: "#2563eb" }}>
                {result.personalized.cta}
              </button>

              <div style={styles.textBlock}>
                {result.personalized.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!result && !loading && (
        <div style={styles.emptyState}>
          <p>Enter an ad and URL to generate personalized landing pages</p>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#f6f7fb",
    minHeight: "100vh",
    padding: "40px",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "28px",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "30px",
  },

  sectionTitle: {
    marginBottom: "15px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  errorBox: {
    marginTop: "10px",
    color: "red",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  panel: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  panelTitle: {
    marginBottom: "10px",
  },

  previewBox: {
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #eee",
  },

  cta: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

  textBlock: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#444",
  },

  emptyState: {
    textAlign: "center",
    color: "#888",
    marginTop: "50px",
  },
};
