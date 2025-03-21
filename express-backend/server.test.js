const request = require("supertest");
const { app, server, producer, consumer } = require("./server");

afterAll(() => {
    if (server) {
        server.close();
    }
    producer.close(); // Close Kafka Producer
    consumer.close(); // Close Kafka Consumer
});

test("Server responds with 200 on GET /api/blockchain", async () => {
    const response = await request(app).get("/api/blockchain");
    expect(response.status).toBe(200);
});
