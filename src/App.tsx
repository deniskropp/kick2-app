import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import { SystemPage } from "./pages/system";
import { TextPage } from "./pages/text";
import { FilePage } from "./pages/file";
import { SessionsPage } from "./pages/sessions";
import { MessagesPage } from "./pages/messages";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<SystemPage />} />
          <Route path="/text" element={<TextPage />} />
          <Route path="/file" element={<FilePage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;