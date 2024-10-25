import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import arrowDown from "@iconify-icons/mdi/arrow-down";
import reload from "@iconify-icons/mdi/reload";
import send from "@iconify-icons/mdi/send";
import windowClose from "@iconify-icons/mdi/window-close";

const Modal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [queryText, setQueryText] = useState("");
  const [response, setResponse] = useState("");
  const [insertVisible, setInsertVisible] = useState(false);
  const modalRef = useRef(null);

  const topQueries = [
    "Thank you for connecting",
    "Can we schedule a call?",
    "I am interested in your profile",
    "Follow-up on my application",
    "How are you?",
    "Is this role still available?",
    "Thank you for the opportunity",
    "Can we collaborate?",
    "Please review my profile",
    "Looking forward to hearing from you"
  ];

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  const handleGenerate = () => {
    if (query.trim() === "") {
      alert("Please enter a query.");
      return;
    }
    setQueryText(query);
    let generatedResponse = "";

    if (query.includes("thank you") || query.includes("thanks")) {
      generatedResponse = "You're very welcome! If you need further assistance, feel free to reach out.";
    } else if (query.includes("follow up") || query.includes("update")) {
      generatedResponse = "Thank you for the follow-up! I’ll make sure to provide you with the updates as soon as possible.";
    } else if (query.includes("connect")) {
      generatedResponse = "I’d love to connect! Looking forward to staying in touch and collaborating in the future.";
    } else if (query.includes("opportunity") || query.includes("job")) {
      generatedResponse = "Thank you for the opportunity! If there’s anything else you need from me, I’d be happy to assist.";
    } else if (query.includes("collaborate")) {
      generatedResponse = "That sounds great! I’d love to discuss how we can collaborate further.";
    } else if (query.includes("schedule") || query.includes("call")) {
      generatedResponse = "I'd be happy to schedule a call. Please let me know your availability!";
    } else if (query.includes("review my profile")) {
      generatedResponse = "I'd appreciate it if you could review my profile. Let me know if we can discuss potential opportunities.";
    } else {
      generatedResponse = "Thank you for reaching out! Let me know if you have more questions or need further clarification.";
    }

    setTimeout(() => {
      setResponse(generatedResponse);
    }, 1000);

    setInsertVisible(true);
  };

  const handleInsert = () => {
    if (response.trim() === "") {
      alert("Cannot insert empty response.");
      return;
    }
    const messageContentEditable = document.querySelector(
      ".msg-form__contenteditable p"
    );
    if (response && messageContentEditable) {
      messageContentEditable.textContent = response;
    }
    const placeholder = document.querySelector(".msg-form__placeholder");
    if (placeholder) {
      placeholder.remove();
    }
    setQuery("");
    setResponse("");
    setQueryText("");
    setInsertVisible(false);
    onClose();
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 z-50 flex justify-center items-center w-full h-full">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-5 shadow-md w-[400px] md:w-[600px]"
      >
        <div className="h-[400px]">
          <div className="w-full bg-gray-900 p-3 flex items-center justify-between rounded-sm">
            <p className="text-white font-bold">
              Made with ❤️ by <span className="text-yellow-500">Rituraj Tripathi.</span>
            </p>
            <button
              className="text-white font-bold cursor-pointer"
              onClick={onClose}
            >
              <Icon icon={windowClose} />
            </button>
          </div>

          {/* Hide scrollbar but allow scrolling */}
          <div className="mt-2 mb-3 hide-scrollbar overflow-x-auto whitespace-nowrap flex space-x-3">
            {topQueries.map((suggestion, index) => (
              <span
                key={index}
                className="bg-gray-300 text-gray-900 p-2 rounded-lg cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </span>
            ))}
          </div>

          <div className="flex flex-col mt-3">
            <div className={` ${queryText ? "visible" : "hidden"}`}>
              <p className="rounded-lg p-3 bg-gray-600 mb-3 ml-auto text-right max-w-[200px] text-white text-xl">
                {queryText}
              </p>
            </div>
            <div className={`${response ? "visible" : "hidden"}`}>
              <p className="rounded-lg p-3 bg-blue-400 mb-3 mr-auto text-left max-w-[200px] text-white text-xl">
                {response}
              </p>
            </div>
          </div>
        </div>
        <input
          type="text"
          className="w-full p-3 mb-3 rounded-lg text-base bg-gray-200 focus:bg-gray-200"
          placeholder="Please enter your query here"
          value={query}
          onChange={handleQueryChange}
        />
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 generate-button p-3 bg-blue-500 hover:bg-blue-800 text-white rounded-lg cursor-pointer text-xl"
            onClick={handleGenerate}
          >
            {response ? <Icon icon={reload} /> : <Icon icon={send} />}
            {response ? "Regenerate" : "Generate"}
          </button>
          {insertVisible && (
            <button
              className="flex items-center gap-1 insert-button p-3 bg-blue-500 hover:bg-blue-800 text-white rounded-lg cursor-pointer text-xl"
              onClick={handleInsert}
            >
              <Icon icon={arrowDown} /> Insert
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
