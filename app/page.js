"use client"
import { useState } from "react"

function analyzeText(text) {
  const positive = ['good','great','excellent','amazing','wonderful','fantastic','love','happy','beautiful','perfect','awesome','best','nice','brilliant','outstanding','superb','delightful','joyful','positive','success','impressive','stellar','remarkable','exceptional'];
  const negative = ['bad','terrible','awful','horrible','hate','angry','sad','ugly','worst','poor','disgusting','dreadful','terrifying','horrific','negative','failure','disappointing','frustrating','annoying','depressing','disastrous','abysmal','atrocious'];
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  let posCount = 0, negCount = 0;
  words.forEach(w => {
    if (positive.includes(w)) posCount++;
    if (negative.includes(w)) negCount++;
  });
  const total = posCount + negCount;
  const score = total > 0 ? ((posCount - negCount) / total * 100).toFixed(1) : 0;
  const sentiment = score > 20 ? 'Positive' : score < -20 ? 'Negative' : 'Neutral';
  const emoji = sentiment === 'Positive' ? '😊' : sentiment === 'Negative' ? '😞' : '😐';
  
  return {
    original: text,
    summary: emoji + ' <strong>Sentiment: ' + sentiment + '</strong> (' + score + '%)<br/>Positive words: ' + posCount + ' | Negative words: ' + negCount + '<br/>Neutral words: ' + (words.length - posCount - negCount),
    originalLen: words.length,
    summaryLen: 3,
    compression: 95
  };
}

export default function Home() {
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      try {
        const res = analyzeText(text)
        setResult(res)
      } catch(e) {
        setResult({ summary: "Error: " + e.message })
      }
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <div className="card" style={{ textAlign: "center" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to analyze sentiment..."
        />
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <button className="btn" onClick={handleAnalyze} disabled={loading || !text.trim()}>
            {loading ? "Analyzing..." : "Analyze Sentiment"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>Sentiment Analysis</h2>
          <div className="result" style={{ fontSize: "1.2rem", textAlign: "center" }} dangerouslySetInnerHTML={{ __html: result.summary }} />
          <p style={{ color: "#888", marginTop: "1rem", fontSize: "0.85rem" }}>
            {result.originalLen} words analyzed
          </p>
        </div>
      )}
    </>
  )
}