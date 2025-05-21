import Navbar from "./components/Navbar";
import UrlChecker from "./components/UrlChecker";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <Navbar />
            <UrlChecker />
            <Toaster position="top-right" />
        </>
    );
}

export default App;
