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
- Kafka
- Java 8+

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

# Apache Kafka & ZooKeeper Installation Guide

## Prerequisites
- Java 8 or higher (JDK)
- Curl or wget (Linux/macOS)
- Windows PowerShell or Command Prompt

## Step 1: Install Java (if not installed)
### Windows:
1. Download Java JDK from [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) or [OpenJDK](https://openjdk.org/).
2. Install and configure the `JAVA_HOME` environment variable.
3. Verify installation with:
   ```sh
   java -version
   ```

### macOS (Homebrew):
```sh
brew install openjdk@17
export JAVA_HOME=$(brew --prefix openjdk@17)
export PATH="$JAVA_HOME/bin:$PATH"
```
Verify with:
```sh
java -version
```

### Linux (Ubuntu/Debian):
```sh
sudo apt update && sudo apt install -y openjdk-17-jdk
java -version
```

### Linux (RHEL/CentOS):
```sh
sudo yum install -y java-17-openjdk-devel
java -version
```

## Step 2: Download Apache Kafka
### Windows:
1. Download Kafka from [Apache Kafka Downloads](https://kafka.apache.org/downloads)
2. Extract the archive (e.g., `kafka_2.13-3.6.0.tgz`) to a directory (e.g., `C:\kafka`)

### macOS/Linux:
```sh
wget https://downloads.apache.org/kafka/3.6.0/kafka_2.13-3.6.0.tgz
mkdir -p ~/kafka && tar -xvzf kafka_2.13-3.6.0.tgz -C ~/kafka --strip-components=1
cd ~/kafka
```

## Step 3: Start ZooKeeper
Kafka requires ZooKeeper to manage cluster state.

### Windows (PowerShell):
```sh
cd C:\kafka
.\zookeeper-server-start.bat config\zookeeper.properties
```

### macOS/Linux:
```sh
bin/zookeeper-server-start.sh config/zookeeper.properties
```

## Step 4: Start Kafka Broker
### Windows:
```sh
cd C:\kafka
.\kafka-server-start.bat config\server.properties
```

### macOS/Linux:
```sh
bin/kafka-server-start.sh config/server.properties
```

## Step 5: Create a Kafka Topic
```sh
bin/kafka-topics.sh --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```
Verify topic:
```sh
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

## Step 6: Produce and Consume Messages
### Produce Messages:
```sh
bin/kafka-console-producer.sh --topic test-topic --bootstrap-server localhost:9092
```
Type messages and press Enter.

### Consume Messages:
```sh
bin/kafka-console-consumer.sh --topic test-topic --from-beginning --bootstrap-server localhost:9092
```

## Step 7: Stop Kafka and ZooKeeper
### Windows:
```sh
.\kafka-server-stop.bat
.\zookeeper-server-stop.bat
```

### macOS/Linux:
```sh
bin/kafka-server-stop.sh
bin/zookeeper-server-stop.sh
```

## Troubleshooting & References
- Kafka Documentation: [https://kafka.apache.org/documentation/](https://kafka.apache.org/documentation/)
- Apache ZooKeeper: [https://zookeeper.apache.org/](https://zookeeper.apache.org/)
- Stack Overflow for common issues: [https://stackoverflow.com/questions/tagged/apache-kafka](https://stackoverflow.com/questions/tagged/apache-kafka)


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
