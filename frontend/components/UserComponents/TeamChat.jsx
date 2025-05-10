import { ArrowRightIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'



const TeamChat = () => {
     const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  return (
      <div className="fixed right-0 top-0 h-screen w-80 bg-gray-800/50 backdrop-blur-xl border-l border-gray-700">
          <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-bold text-white">Team Chat</h2>
              </div>

              <div className="flex-1 overflow-auto p-4">
                  {messages.map((message) => (
                      <div key={message.id} className="mb-4">
                          <div className="flex items-start gap-3">
                              <img
                                  src={message.sender.avatar}
                                  alt={message.sender.name}
                                  className="w-8 h-8 rounded-full"
                              />
                              <div>
                                  <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-white">
                                          {message.sender.name}
                                      </p>
                                      <span className="text-xs text-gray-400">
                                          {message.timestamp}
                                      </span>
                                  </div>
                                  <p className="text-sm text-gray-300">{message.content}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                      <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2
                                        text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                          onClick={() => {
                              if (newMessage.trim()) {
                                  setMessages([
                                      ...messages,
                                      {
                                          id: messages.length + 1,
                                          sender: team[0],
                                          content: newMessage,
                                          timestamp: new Date().toLocaleTimeString(),
                                      },
                                  ]);
                                  setNewMessage("");
                              }
                          }}
                          className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                          <ArrowRightIcon className="h-5 w-5" />
                      </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default TeamChat