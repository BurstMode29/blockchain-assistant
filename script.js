let chatHistory = [];

const userState = {
    address: generateRandomAddress(), // Default hashed address
    balance: 500000, // Default RozzTokens assigned
};

const defaultOptions = [
    "Hello! I can help you with the following options:",
    "✅ Say 'Hello' or 'Hi' to start a conversation.",
    "✅ Ask about 'transactions' to initiate one.",
    "✅ Ask about 'blockchain' for more info.",
    "✅ Say 'verify' to learn about hashing and mining.",
    "✅ Ask about 'Genesis' to learn about the first block.",
    "✅ Ask about 'Kafka' to understand messaging in the system.",
    "✅ Type 'Show Blockchain' to view the blockchain.",
    "✅ Type 'My Balance' to view your RozzTokens balance and address.",
    "✅ Format transactions as: 'Send <amount> from <A> to <B>'",
    "✅ Say 'Bye' or 'Exit' to end the chat."
].join("\n");

const rules = [
    { pattern: /hello|hi/gi, response: "Hello! How can I assist you today?" },
    { pattern: /transaction|transfer/gi, response: "Do you want to initiate a transaction? If so, provide details in the format: 'Send <amount> from <A> to <B>'." },
    { pattern: /blockchain/gi, response: "Blockchain is a distributed ledger technology. Do you have specific questions about it?" },
    { pattern: /verify/gi, response: "The verification process requires hashing. Would you like to know more about mining blocks?" },
    { pattern: /balance|my balance/i, response: () => `Your current balance is ${userState.balance} RozzTokens.\nYour address is: ${userState.address}` },
    { pattern: /thank you|thanks/gi, response: "You're welcome! Anything else I can help with?" },
    { pattern: /bye|exit/gi, response: "Goodbye! Have a great day!" },
    { pattern: /Genesis/i, response: "The Genesis block is the first block in a chain. It's the foundation of the blockchain." },
    { pattern: /hash/i, response: "A hash is a cryptographic representation of data. Each block has a unique hash." },
    { pattern: /Kafka/i, response: "Kafka is used as a messaging queue for passing transactions in this demo system." },
    { pattern: /.*/, response: defaultOptions } // Fallback response now returns menu
];

document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", sendMessage);
    addMessageToChat(defaultOptions, "bot"); // Show options on load
});

function sendMessage() {
    const inputField = document.getElementById("message");
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    // Display User Message
    addMessageToChat(userMessage, "user");

    // Check for transaction message
    if (userMessage.startsWith("Send")) {
        const transactionDetails = parseTransaction(userMessage); // Parse transaction details
        if (transactionDetails) {
            processTransaction(transactionDetails);
        } else {
            addMessageToChat("Invalid transaction format. Please use 'Send <amount> from <A> to <B>'.", "bot");
        }
    } else if (userMessage.toLowerCase() === "show blockchain") {
        fetchBlockchain();
    } else {
        // Generate Bot Response
        const botMessage = getBotResponse(userMessage);
        addMessageToChat(botMessage, "bot");
    }

    inputField.value = ""; // Clear input field
}

function parseTransaction(message) {
    const regex = /Send (\d+) from (\w+) to (\w+)/;
    const match = message.match(regex);
    if (match) {
        return { amount: parseInt(match[1], 10), sender: match[2], recipient: match[3] };
    }
    return null;
}

function processTransaction(transaction) {
    if (transaction.sender !== userState.address) {
        addMessageToChat("You can only send tokens from your own address.", "bot");
        return;
    }

    if (transaction.amount > userState.balance) {
        addMessageToChat("Insufficient balance to complete this transaction.", "bot");
        return;
    }

    // Deduct tokens and assume success
    userState.balance -= transaction.amount;
    addMessageToChat(
        `Transaction processed! Sent ${transaction.amount} RozzTokens from ${transaction.sender} to ${transaction.recipient}.`,
        "bot"
    );

    sendTransactionToBackend(transaction);
}

function sendTransactionToBackend(transaction) {
    fetch("http://localhost:3000/api/transaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Transaction response:", data);
        })
        .catch(error => {
            console.error("Error sending transaction:", error);
            addMessageToChat("Error sending transaction to the blockchain backend.", "bot");
        });
}

function fetchBlockchain() {
    fetch("http://localhost:3000/api/blockchain")
        .then(response => response.json())
        .then(data => {
            const blockchain = data.blockchain || [];
            let blockchainMessages = "Current Blockchain:\n";
            blockchain.forEach((block, index) => {
                blockchainMessages += `Transaction ${index + 1}: ${JSON.stringify(block)}\n`;
            });
            addMessageToChat(blockchainMessages, "bot");
        })
        .catch(error => {
            console.error("Error fetching blockchain:", error);
            addMessageToChat("Error fetching blockchain data.", "bot");
        });
}

function getBotResponse(message) {
    for (const rule of rules) {
        if (message.match(rule.pattern)) {
            return typeof rule.response === "function" ? rule.response() : rule.response;
        }
    }
    return defaultOptions; // Ensure fallback shows the menu
}

function addMessageToChat(message, sender) {
    const conversationDiv = document.getElementById("conversation");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = message;

    conversationDiv.appendChild(messageDiv);
    conversationDiv.scrollTop = conversationDiv.scrollHeight; // Auto-scroll to bottom
}

// Utility to generate a random hashed address
function generateRandomAddress() {
    return "0x" + Array.from(crypto.getRandomValues(new Uint8Array(20)))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

export {
    parseTransaction,
    processTransaction,
    getBotResponse,
    generateRandomAddress,
};