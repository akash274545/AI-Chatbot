const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const newChatBtn = document.getElementById("new-chat-btn");
const clearChatBtn = document.getElementById("clear-chat-btn");
const darkModeToggle = document.getElementById("dark-mode");

const historyBtn = document.getElementById("history-btn");
const chatHistory = document.getElementById("chat-history");


// ==========================================
// STORAGE
// ==========================================

const CHATS_STORAGE_KEY = "ai_chat_conversations";


// ==========================================
// CURRENT CHAT
// ==========================================

let currentChatId = null;


// ==========================================
// CREATE NEW CHAT ID
// ==========================================

function createChatId() {
  return Date.now().toString();
}


// ==========================================
// GET ALL CHATS
// ==========================================

function getChats() {
  return JSON.parse(
    localStorage.getItem(CHATS_STORAGE_KEY)
  ) || [];
}


// ==========================================
// SAVE ALL CHATS
// ==========================================

function saveChats(chats) {
  localStorage.setItem(
    CHATS_STORAGE_KEY,
    JSON.stringify(chats)
  );
}


// ==========================================
// CREATE CHAT
// ==========================================

function createNewConversation() {

  const chats = getChats();

  const newChat = {
    id: createChatId(),
    title: "New Conversation",
    createdAt: new Date().toISOString(),
    messages: []
  };

  chats.push(newChat);

  saveChats(chats);

  currentChatId = newChat.id;

  showWelcomeMessage();

  renderChatHistory();

  userInput.value = "";
  userInput.focus();
}


// ==========================================
// GET CURRENT CHAT
// ==========================================

function getCurrentChat() {

  const chats = getChats();

  return chats.find(
    chat => chat.id === currentChatId
  );
}


// ==========================================
// SAVE MESSAGE TO CURRENT CHAT
// ==========================================

function saveMessage(sender, text, time = null) {

  if (!currentChatId) {
    createNewConversation();
  }

  const chats = getChats();

  const chat = chats.find(
    chat => chat.id === currentChatId
  );

  if (!chat) return;

  const messageTime =
    time ||
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  chat.messages.push({
    sender: sender,
    text: text,
    time: messageTime
  });


  // Create title from first user message

  if (
    sender === "user" &&
    chat.title === "New Conversation"
  ) {

    chat.title =
      text.length > 30
        ? text.substring(0, 30) + "..."
        : text;
  }

  saveChats(chats);

  renderChatHistory();
}


// ==========================================
// ADD MESSAGE TO UI
// ==========================================

function addMessage(
  sender,
  text,
  save = true,
  time = null,
  showCopy = false
) {

  const messageDiv =
    document.createElement("div");

  messageDiv.classList.add(
    "message",
    sender
  );


  // Message text

  const textDiv =
    document.createElement("div");

  textDiv.className = "message-text";

  textDiv.innerText = text;

  messageDiv.appendChild(textDiv);


  // Bottom section

  const bottomDiv =
    document.createElement("div");

  bottomDiv.className = "message-bottom";


  // Timestamp

  const timeSpan =
    document.createElement("span");

  timeSpan.className = "message-time";

  timeSpan.innerText =
    time ||
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  bottomDiv.appendChild(timeSpan);


  // Copy button only for AI messages

  if (
    sender === "bot" &&
    showCopy
  ) {

    const copyBtn =
      document.createElement("button");

    copyBtn.className = "copy-btn";

    copyBtn.innerHTML = "📋 Copy";

    copyBtn.title = "Copy response";


    copyBtn.addEventListener(
      "click",
      async () => {

        try {

          await navigator.clipboard.writeText(
            textDiv.innerText
          );

          copyBtn.innerHTML = "✅ Copied!";

          setTimeout(() => {
            copyBtn.innerHTML = "📋 Copy";
          }, 1500);

        } catch (error) {

          console.error(
            "Copy failed:",
            error
          );

          copyBtn.innerHTML =
            "⚠️ Failed";

          setTimeout(() => {
            copyBtn.innerHTML = "📋 Copy";
          }, 1500);
        }
      }
    );

    bottomDiv.appendChild(copyBtn);
  }


  messageDiv.appendChild(bottomDiv);

  chatBox.appendChild(messageDiv);


  chatBox.scrollTop = chatBox.scrollHeight;


  if (save) {

    saveMessage(
      sender,
      text,
      time
    );
  }


  return messageDiv;
}


// ==========================================
// TYPING EFFECT
// ==========================================


// ==========================================
// TYPING EFFECT
// ==========================================

async function typeBotMessage(text) {

  const messageDiv = document.createElement("div");

  messageDiv.classList.add(
    "message",
    "bot"
  );


  // Text container

  const textDiv = document.createElement("div");

  textDiv.className = "message-text";

  messageDiv.appendChild(textDiv);


  // Bottom area

  const bottomDiv = document.createElement("div");

  bottomDiv.className = "message-bottom";


  // Timestamp

  const timeSpan = document.createElement("span");

  timeSpan.className = "message-time";

  timeSpan.innerText =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  bottomDiv.appendChild(timeSpan);


  // Copy button

  const copyBtn = document.createElement("button");

  copyBtn.className = "copy-btn";

  copyBtn.innerHTML = "📋 Copy";

  copyBtn.title = "Copy response";

  copyBtn.style.display = "none";


  copyBtn.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard.writeText(
          textDiv.innerText
        );

        copyBtn.innerHTML = "✅ Copied!";

        setTimeout(() => {
          copyBtn.innerHTML = "📋 Copy";
        }, 1500);

      } catch (error) {

        console.error(
          "Copy failed:",
          error
        );

        copyBtn.innerHTML = "⚠️ Failed";

        setTimeout(() => {
          copyBtn.innerHTML = "📋 Copy";
        }, 1500);

      }

    }
  );


  bottomDiv.appendChild(copyBtn);

  messageDiv.appendChild(bottomDiv);

  chatBox.appendChild(messageDiv);


  // ==========================================
  // SMART SCROLL CONTROL
  // ==========================================

  let userIsScrolling = false;

  let wasAtBottom = true;


  function isAtBottom() {

    const distanceFromBottom =
      chatBox.scrollHeight -
      chatBox.scrollTop -
      chatBox.clientHeight;

    return distanceFromBottom < 50;
  }


  // Check initial position

  wasAtBottom = isAtBottom();


  // Detect manual scrolling

  const handleScroll = () => {

    if (!isAtBottom()) {

      userIsScrolling = true;

    } else {

      userIsScrolling = false;

    }

  };


  chatBox.addEventListener(
    "scroll",
    handleScroll
  );


  // ==========================================
  // TYPE RESPONSE
  // ==========================================

  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    textDiv.innerText += text[i];


    // ----------------------------------------
    // AUTO SCROLL ONLY IF USER DID NOT
    // MANUALLY SCROLL UP
    // ----------------------------------------

    if (
  wasAtBottom &&
  !userIsScrolling
) {

  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth"
  });

}


    await new Promise(
      resolve =>
        setTimeout(resolve, 5)
    );

  }


  // ==========================================
  // REMOVE SCROLL LISTENER
  // ==========================================

  chatBox.removeEventListener(
    "scroll",
    handleScroll
  );


  // ==========================================
  // SHOW COPY BUTTON
  // ==========================================

  copyBtn.style.display =
    "inline-flex";


  // ==========================================
  // SAVE COMPLETE RESPONSE
  // ==========================================

  saveMessage(
    "bot",
    text,
    timeSpan.innerText
  );

}
// ==========================================
// SEND MESSAGE
// ==========================================

async function sendMessage() {

  const message =
    userInput.value.trim();

  if (!message) return;


  // Create chat automatically

  if (!currentChatId) {
    createNewConversation();
  }


  removeWelcomeMessage();


  // Add user message

  addMessage(
    "user",
    message,
    true
  );


  userInput.value = "";


  // Disable input

  userInput.disabled = true;

  sendBtn.disabled = true;


  // Thinking animation

  const thinking =
    addThinking();


  try {

    const response =
      await fetch("/chat", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          message: message
        })

      });


    const data =
      await response.json();


    thinking.remove();


    if (!response.ok) {

      addMessage(
        "bot",
        data.reply ||
        "⚠️ Something went wrong.",
        true,
        null,
        true
      );

      return;
    }


    if (data.reply) {

      // Typing effect

      await typeBotMessage(
        data.reply
      );

    } else {

      addMessage(
        "bot",
        "⚠️ Empty AI response.",
        true,
        null,
        true
      );
    }


  } catch (error) {

    console.error(
      "Chat Error:",
      error
    );


    thinking.remove();


    addMessage(
      "bot",
      "⚠️ Unable to connect to AI server.",
      true,
      null,
      true
    );

  }


  // Enable input

  userInput.disabled = false;

  sendBtn.disabled = false;

  userInput.focus();
}


// ==========================================
// THINKING ANIMATION
// ==========================================

function addThinking() {

  const div =
    document.createElement("div");

  div.classList.add(
    "message",
    "bot",
    "thinking-message"
  );


  div.innerHTML = `

    <span class="thinking-icon">
      🤖
    </span>

    <span>
      AI is thinking
    </span>

    <span class="dots">

      <span>.</span>
      <span>.</span>
      <span>.</span>

    </span>

  `;


  chatBox.appendChild(div);


  chatBox.scrollTop =
    chatBox.scrollHeight;


  return div;
}


// ==========================================
// LOAD CHAT
// ==========================================

function loadConversation(chatId) {

  const chats = getChats();

  const chat =
    chats.find(
      chat => chat.id === chatId
    );

  if (!chat) return;


  currentChatId =
    chat.id;


  chatBox.innerHTML = "";


  if (
    chat.messages.length === 0
  ) {

    showWelcomeMessage();

    return;
  }


  chat.messages.forEach(
    message => {

      addMessage(
        message.sender,
        message.text,
        false,
        message.time,
        message.sender === "bot"
      );

    }
  );


  chatBox.scrollTop =
    chatBox.scrollHeight;
}


// ==========================================
// DELETE CHAT
// ==========================================

function deleteConversation(chatId) {

  let chats = getChats();


  chats =
    chats.filter(
      chat => chat.id !== chatId
    );


  saveChats(chats);


  if (
    currentChatId === chatId
  ) {

    currentChatId = null;

    showWelcomeMessage();
  }


  renderChatHistory();
}


// ==========================================
// RENDER HISTORY
// ==========================================

function renderChatHistory() {

  if (!chatHistory) return;


  const chats =
    getChats();


  chatHistory.innerHTML = "";


  if (chats.length === 0) {

    chatHistory.innerHTML = `

      <div class="history-empty">
        No conversations yet
      </div>

    `;

    return;
  }


  const title =
    document.createElement("div");


  title.className =
    "history-title";


  title.innerText =
    "Recent Chats";


  chatHistory.appendChild(
    title
  );


  chats
    .slice()
    .reverse()
    .slice(0, 10)
    .forEach(chat => {

      const wrapper =
        document.createElement("div");


      wrapper.className =
        "history-row";


      const button =
        document.createElement("button");


      button.className =
        "history-item";


      button.innerText =
        "💬 " +
        chat.title;


      button.title =
        chat.title;


      button.addEventListener(
        "click",
        () => {

          loadConversation(
            chat.id
          );

        }
      );


      const deleteBtn =
        document.createElement("button");


      deleteBtn.className =
        "history-delete";


      deleteBtn.innerText =
        "×";


      deleteBtn.title =
        "Delete conversation";


      deleteBtn.addEventListener(
        "click",
        (event) => {

          event.stopPropagation();

          deleteConversation(
            chat.id
          );

        }
      );


      wrapper.appendChild(
        button
      );


      wrapper.appendChild(
        deleteBtn
      );


      chatHistory.appendChild(
        wrapper
      );

    });

}


// ==========================================
// WELCOME
// ==========================================

function showWelcomeMessage() {

  chatBox.innerHTML = `

    <div class="welcome-message">

      <div class="welcome-icon">
        🤖
      </div>

      <h2>
        Hello! 👋
      </h2>

      <p>
        I'm your AI assistant.
        How can I help you today?
      </p>

    </div>

  `;

}


// ==========================================
// REMOVE WELCOME
// ==========================================

function removeWelcomeMessage() {

  const welcome =
    document.querySelector(
      ".welcome-message"
    );


  if (welcome) {
    welcome.remove();
  }

}


// ==========================================
// NEW CHAT BUTTON
// ==========================================

newChatBtn.addEventListener(
  "click",
  () => {

    createNewConversation();

  }
);


// ==========================================
// SEND BUTTON + ENTER
// ==========================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


userInput.addEventListener(
  "keydown",
  (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();

    }

  }
);


// ==========================================
// CLEAR CURRENT CHAT
// ==========================================

clearChatBtn.addEventListener(
  "click",
  () => {

    if (!currentChatId) {

      showWelcomeMessage();

      return;
    }


    const chats =
      getChats();


    const chat =
      chats.find(
        chat =>
          chat.id === currentChatId
      );


    if (chat) {

      chat.messages = [];

      chat.title =
        "New Conversation";

    }


    saveChats(chats);


    showWelcomeMessage();

    renderChatHistory();


    userInput.value = "";

    userInput.focus();

  }
);


// ==========================================
// DARK MODE
// ==========================================

darkModeToggle.addEventListener(
  "change",
  () => {

    if (
      darkModeToggle.checked
    ) {

      document.body.classList
        .remove("light-mode");


      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.body.classList
        .add("light-mode");


      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }
);


// ==========================================
// LOAD THEME
// ==========================================

function loadTheme() {

  const theme =
    localStorage.getItem(
      "theme"
    );


  if (theme === "light") {

    document.body.classList
      .add("light-mode");


    darkModeToggle.checked =
      false;

  } else {

    document.body.classList
      .remove("light-mode");


    darkModeToggle.checked =
      true;

  }

}


// ==========================================
// KEYBOARD SHORTCUT
// ==========================================

document.addEventListener(
  "keydown",
  (event) => {

    // Ctrl + K = New Chat

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      createNewConversation();

    }

  }
);


// ==========================================
// INITIALIZE
// ==========================================

loadTheme();

renderChatHistory();


// Restore latest conversation

const chats = getChats();


if (chats.length > 0) {

  const latestChat =
    chats[chats.length - 1];

  loadConversation(
    latestChat.id
  );

} else {

  showWelcomeMessage();

}