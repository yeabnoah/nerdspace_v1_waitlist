import React, { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function AIChatHistory() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Category 1', 'Category 2', 'Category 3'];

  const handleSubmit = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: input.trim(),
      };
      setMessages([...messages, newMessage]);
      setInput('');
      // Here you would typically send the message to your AI service
      // and then add the AI's response to the messages array
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Categories */}
      <div className="p-2 sm:p-4 overflow-x-auto">
        <div className="flex flex-nowrap space-x-2 sm:space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm sm:text-base rounded-full whitespace-nowrap
                ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${
              m.role === "assistant" ? "text-blue-600" : "text-gray-800"
            }`}
          >
            <div className="font-semibold text-sm sm:text-base mb-1">{m.role}</div>
            <div className="text-sm sm:text-base leading-relaxed">{m.content}</div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-2 sm:p-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md text-sm sm:text-base"
          rows={3}
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChatHistory;