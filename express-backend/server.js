const express = require("express");
const bodyParser = require("body-parser");
const kafka = require("kafka-node");
const cors = require("cors");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Kafka Configuration
const kafkaClientOptions = { kafkaHost: "localhost:9092" };
const client = new kafka.KafkaClient(kafkaClientOptions);
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
  client,
  [{ topic: "transactions", partition: 0 }],
  { autoCommit: true }
);

let transactions = []; // Store transactions to prevent multiple event listeners

// Kafka Producer Setup
producer.on("ready", () => {
  console.log("Kafka Producer is ready!");
});

producer.on("error", (error) => {
  console.error("Error in Kafka Producer", error);
});

// Kafka Consumer Setup (Consume messages once)
consumer.on("message", (message) => {
  console.log("Message received from Kafka:", message.value);
  transactions.push(JSON.parse(message.value));
});

consumer.on("error", (err) => {
  console.error("Error in Kafka Consumer", err);
});

// API Endpoint to Publish Transaction
app.post("/api/transaction", (req, res) => {
  const { sender, recipient, amount } = req.body;

  if (!sender || !recipient || !amount) {
    return res.status(400).json({ error: "Invalid transaction format!" });
  }

  const transactionMessage = JSON.stringify({
    sender,
    recipient,
    amount,
    timestamp: new Date().toISOString(),
  });

  const payloads = [{ topic: "transactions", messages: transactionMessage }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error("Error sending to Kafka", err);
      return res.status(500).json({ error: "Failed to send transaction to Kafka" });
    }
    console.log("Transaction sent to Kafka", data);
    res.status(200).json({ message: "Transaction sent successfully!", data });
  });
});

// API Endpoint to Fetch Processed Transactions
app.get("/api/blockchain", (req, res) => {
  res.json({ blockchain: transactions });
});

// Start the Express server only if this is the main module
const PORT = 3000;
let server = null;

if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, server, producer, consumer };
