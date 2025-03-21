# RozzBot

RozzBot is an interactive blockchain chatbot that allows users to engage with blockchain concepts, execute transactions, and learn about distributed ledger technologies. 

## Features
- 💬 **Interactive Chat:** Engage with RozzBot through various predefined commands.
- 💰 **RozzTokens:** Each user starts with a balance of 500,000 RozzTokens.
- 🔗 **Blockchain Simulation:** View and interact with the blockchain.
- ✅ **Transaction Processing:** Perform transactions using a structured format.
- 🔄 **Verification & Hashing:** Learn about cryptographic hashing and mining.
- 📡 **Kafka Integration:** Understand message queues in a blockchain system.
- 🧪 **Unit Tests:** Includes Jest-based tests for key functionalities.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/burstmode29/RozzBot.git
   cd RozzBot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. Run tests:
   ```sh
   npm test
   ```

## Usage

### Available Commands
RozzBot supports various commands for user interaction:
- `Hello` or `Hi` - Start a conversation.
- `Transactions` - Learn how to make transactions.
- `Blockchain` - Get information about blockchain.
- `Verify` - Understand hashing and mining.
- `Genesis` - Learn about the first block in the blockchain.
- `Kafka` - Understand message queues in this system.
- `Show Blockchain` - View the blockchain ledger.
- `My Balance` - View your RozzTokens balance and wallet address.
- `Send <amount> from <A> to <B>` - Execute a transaction.
- `Bye` or `Exit` - End the chat.

## API Endpoints
RozzBot communicates with a blockchain backend using these endpoints:
- `POST /api/transaction` - Process a transaction.
- `GET /api/blockchain` - Retrieve the blockchain state.

## Special Features
- **Random Address Generator:** Each user gets a unique blockchain address.
- **Auto-Balance Updates:** Token transfers automatically update user balances.
- **Real-time Chat Responses:** Predefined patterns for various queries.
- **Error Handling:** Informative responses for invalid transactions.

## Testing
This project includes Jest-based unit tests covering:
- Transaction parsing and validation.
- Blockchain interactions.
- Message responses.
- Address generation.

Run tests with:
```sh
npm test
```

## Dependencies
The project uses the following npm packages:
- `jest` - Unit testing framework.
- `crypto` - Secure random address generation.
- `express` (if running a backend server) - API handling.
- `fetch` - API calls to the backend blockchain system.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
[Rafeeq Weideman](https://github.com/burstmode29)
