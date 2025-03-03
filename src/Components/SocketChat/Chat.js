import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { useParams, useNavigate } from "react-router-dom";

const Chat = () => {
  const { recipientId } = useParams(); // Recipient ID from URL (if any)
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // All users (same college except yourself)
  const [onlineUsers, setOnlineUsers] = useState([]); // List of online user IDs
  const [messages, setMessages] = useState([]); // Chat messages between you and the recipient
  const [content, setContent] = useState(""); // Message input field
  const [otherTyping, setOtherTyping] = useState(false); // Whether the other person is typing
  const [myId, setMyId] = useState(null); // Your own user ID (decoded from token)
  const [myUser, setMyUser] = useState(null); // Your own full profile (including image)

  // Decode token to get your user ID (Already exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const decoded = JSON.parse(atob(parts[1]));
          setMyId(decoded.userId);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch your own profile (Keep only one useEffect here)
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile-alumni", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        // If the API returns an array, take the first element; otherwise, use data directly.
        setMyUser(Array.isArray(data) ? data[0] : data)
      )
      .catch((err) => console.error("Error fetching my profile:", err));
  }, []);

  // Fetch all users from the same college (except yourself)
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/get-all-users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // When a recipient is selected, fetch previous messages via socket event (Already exists)
  useEffect(() => {
    if (recipientId) {
      socket.emit("fetchMessages", { recipientId });
    }
  }, [recipientId]);

  // Listen for socket events (Already exists)
  useEffect(() => {
    socket.on("previousMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("updateOnlineUsers", (onlineList) => {
      setOnlineUsers(onlineList);
    });

    socket.on("typing", ({ senderId }) => {
      if (recipientId && senderId === recipientId) {
        setOtherTyping(true);
      }
    });

    socket.on("stopTyping", ({ senderId }) => {
      if (recipientId && senderId === recipientId) {
        setOtherTyping(false);
      }
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
      socket.off("updateOnlineUsers");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [recipientId]);

  const sendMessage = () => {
    if (content.trim() && recipientId) {
      socket.emit("sendMessage", {
        recipientId,
        content,
      });
      setContent("");
    }
  };

  const handleTyping = () => {
    if (recipientId) socket.emit("typing", { recipientId });
  };

  const handleStopTyping = () => {
    if (recipientId) socket.emit("stopTyping", { recipientId });
  };

  // Helper: Get sender's details from users list (for messages not sent by you)
  const getSenderDetails = (senderId) => {
    const user = users.find((u) => u._id === senderId);
    return (
      user || {
        name: "Unknown",
        img: "https://static.vecteezy.com/system/resources/thumbnails/021/548/095/small/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      }
    );
  };

  // Helper: Returns a valid image source. If the image is empty or only whitespace, return default avatar.
  const getValidImgSrc = (img) => {
    return img && img.trim() !== "" ? img : "/avatar.png";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar: List of users with online indicator */}
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              className="btn btn-outline w-full mb-2 flex items-center gap-2"
              onClick={() => navigate(`/chat/${user._id}`)}
            >
              <div className="relative">
                <img
                  src={getValidImgSrc(user.img)}
                  alt={user.name || "Default avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                )}
              </div>
              <span>{user.name}</span>
            </button>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Chat Area */}
      <div className="w-3/4 p-4 flex flex-col">
        {recipientId ? (
          <>
            <div className="mb-4 border-b pb-2">
              {/* Display chat partner details */}
              {(() => {
                const partner = getSenderDetails(recipientId);
                return (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={getValidImgSrc(partner.img)}
                        alt={partner.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {onlineUsers.includes(recipientId) && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold">{partner.name}</h2>
                  </div>
                );
              })()}
            </div>
            <div className="flex-1 overflow-y-auto border p-4 mb-4 space-y-2">
              {messages.map((msg, index) => {
                const isMe = msg.senderId === myId;
                const senderDetails = isMe
                  ? {
                      name: myUser?.name || "You",
                      img: myUser?.img || "/avatar.png",
                    }
                  : getSenderDetails(msg.senderId);

                // Format the timestamp (assuming msg.timestamp is a valid date string)
                const formattedTime = new Date(
                  msg.timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={index}
                    className={`w-full flex ${
                      isMe ? "justify-end" : "justify-start"
                    } my-2`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-xs ${
                        isMe ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={getValidImgSrc(senderDetails.img)}
                          alt={senderDetails.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {!isMe && onlineUsers.includes(msg.senderId) && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-bold ${
                            isMe ? "text-right" : "text-left"
                          }`}
                        >
                          {senderDetails.name}
                        </p>
                        <div
                          className={`p-2 rounded-lg ${
                            isMe
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={`text-xs  text-right mt-1 ${
                              isMe ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            {formattedTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing skeleton */}
              {otherTyping && (
                <div className="flex items-center gap-2">
                  <span className="text-sm italic text-gray-500">
                    {getSenderDetails(recipientId).name} is typing...
                  </span>
                </div>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                value={content}
                placeholder="Type a message..."
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleTyping}
                onBlur={handleStopTyping}
                className="input input-bordered flex-1"
              />
              <button onClick={sendMessage} className="btn ml-2">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
