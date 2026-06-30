async function sendMessage() {

    let input = document.getElementById("userInput");

    let message = input.value.trim();

    if(message === "") return;

    let chatBox = document.getElementById("chatBox");

    let userDiv = document.createElement("div");

    userDiv.className = "user-message";

    userDiv.innerText = message;

    chatBox.appendChild(userDiv);

    input.value = "";

    const response = await fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: message
        })

    });

    const data = await response.json();

    let botDiv = document.createElement("div");

    botDiv.className = "bot-message";

    botDiv.innerText = data.reply;

    chatBox.appendChild(botDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

}
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});