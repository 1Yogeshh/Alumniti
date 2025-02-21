import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar"; // Assuming you have a Navbar component

const Message = ({ userId }) => {
  const [messages, setMessages] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchMessages = async () => {
    setLoading(true);
    setError(null); // Reset error on fetch
    try {
      const response = await axios.get(
        apiUrl + `/api/auth/messages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if the response is an array
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        setMessages([]); // Set to empty array if not an array
        setError("Received unexpected data structure");
      }
    } catch (err) {
      setError("Error fetching messages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    try {
      const response = await axios.post(
        apiUrl + `/api/auth/send/${userId}`,
        { content: newMessage }, // Assuming you're using userId as recipientId
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update messages with the newly sent message
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage(""); // Clear input after sending
    } catch (err) {
      setError("Error sending message");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]); // Fetch messages when userId changes

  return (
    <div className="message-page">
      <Navbar />
      <div className="message-container">
        <h2 className="message-header">Messages</h2>

        {loading && <p>Loading messages...</p>}
        {error && <p className="error">{error}</p>}

        <div className="message-display">
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((message) => (
              <div key={message._id} className="message">
                {" "}
                {/* Using message._id as key */}
                <p>{message.content}</p>
                <span className="message-time">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
