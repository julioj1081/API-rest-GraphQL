import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import MessageFormUpdate from './components/MessageFormUpdate'
import { Navigation } from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<MessageList/>}/>
          <Route path="/new-message" element={<MessageForm/>}/>
          <Route path="/update-message/:id/:title/:content/:author" element={<MessageFormUpdate/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
