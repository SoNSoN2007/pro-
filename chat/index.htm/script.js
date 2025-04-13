// Function to send user input to the backend
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Append user message to chat log
    appendMessage("user", userInput);

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const aiResponse = data.response;

        // Append AI response to chat log
        appendMessage("ai", aiResponse);
    } catch (error) {
        console.error("Error communicating with backend:", error);
        appendMessage("ai", "An error occurred. Please try again.");
    }

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Function to append messages to the chat log
function appendMessage(sender, message) {
    const messageContainer = document.querySelector(".message-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to bottom
}