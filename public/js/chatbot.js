const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

// =============================
// API Key and URL for Llama API
// =============================
const API_KEY = "";
const API_URL = "https://api.llama-api.com/chat/completions";

// Make a list with all the messages
let messagesList = [
  {
    role: "assistant",
    content: "Hi there 👋<br>How can I help you today?",
  },
];
// Get the initial height of the input textarea
const inputInitHeight = chatInput.scrollHeight;

// ======================================
// Function to create a chat <li> element
// ======================================
const createChatBubble = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);

  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;

  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;

  // return chat <li> element
  return chatLi;
};

// =======================================
// Function to generate a response message
// =======================================
const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      messages: messagesList,
      functions: [
        {
          name: "get_movie_assistance",
          description: "Provide an answer to the message provided.",
          parameters: {
            type: "object",
            properties: {
              answer: {
                type: "string",
                description: "A human answer to the message.",
              },
            },
          },
          required: ["answer"],
        },
      ],
      stream: false,
      function_call: "get_movie_assistance",
    }),
    redirect: "follow",
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.text())
    .then((data) => {
      let response =
        JSON.parse(data).choices[0].message.function_call.arguments;

      // Check if response is a string
      if (typeof response == "string") {
        console.log("Response is a string");
        response = response.slice(12);
        response = response.slice(0, -2);
        messageElement.textContent = response;
      }
      // Check if response is undefined
      else if (response["answer"] == undefined) {
        console.log("Response is undefined");
        response = "Sorry! Can't find the answer to that.";
        messageElement.classList.add("error");
        messageElement.textContent = response;
      }
      // Check if response is well formed
      else {
        console.log("Response well formed");
        response = response["answer"];
        messageElement.textContent = response;
      }

      // Append the response to the chat history
      messagesList.push({
        role: "assistant",
        content: response,
      });
    })
    .catch((error) => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Service is currently unavailable. Please try again later.";
      console.error(error);
    })
    // Scroll to the bottom of the chatbox
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

// ===============================
// Main function to handle the chat
// ===============================
const handleChat = () => {
  // Get user entered message and remove extra whitespace
  let userMessage = chatInput.value.trim();

  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatBubble(userMessage, "outgoing"));
  // Append the user's message to the messages list
  messagesList.push({ role: "user", content: userMessage });

  // Scroll to the bottom of the chatbox
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Typing..." message while waiting for the response
    const incomingChatLi = createChatBubble("Typing...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    // Generate a response after 600ms
    generateResponse(incomingChatLi);
  }, 600);
};

// Adjust the height of the input textarea based on its content
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

// Send chat message when the send button is clicked
sendChatBtn.addEventListener("click", handleChat);

// Close the chatbot when the close button is clicked
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);

// Toggle the chatbot when the chatbot toggler is clicked
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
