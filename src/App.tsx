import { useState, useEffect } from "react";
import './App.css'

function App() {
    const [status, setStatus] = useState(null);
    const startBot = async () => {
        try {
            const response = await fetch("http://localhost:8081/start-bot", {
                method: "POST",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    const stopBot = async () => {
        try {
            const response = await fetch("http://localhost:8081/stop-bot", {
                method: "POST",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch("http://localhost:8081/status");
            const data = await response.json();
            console.log(data)
            setStatus(data);
        } catch (error) {
            console.error("Fehler beim Abrufen des Status:", error);
        }
    };

    // Status alle 3 Sekunden abrufen
   useEffect(() => {
        fetchStatus(); // Direkt beim Laden einmal abrufen
        const interval = setInterval(fetchStatus, 10000);

        return () => clearInterval(interval); // Cleanup, wenn die Komponente unmountet
    }, []);



  return (
    <>
<button onClick={() => startBot()}>Start</button>
        <button onClick={() => stopBot()}>stop</button>
        <h2>Bot-Status:</h2>
        {status ? (
            <>
            <pre>{status.solBalance}</pre>
            </>
        ) : (
            <p>⏳ Lade Status...</p>
        )}
    </>
  )
}

export default App
