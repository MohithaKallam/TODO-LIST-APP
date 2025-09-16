package com.todo.utils;

import com.mongodb.client.*;
import org.bson.Document;

public class MongoHelper {

    private static final String CONNECTION_STRING = "mongodb://localhost:27017"; // 🔹 update if needed
    private static final String DB_NAME = "todoApp"; // 🔹 update if your DB is different
    private static final String COLLECTION_NAME = "users";

    private static MongoClient mongoClient;
    private static MongoDatabase database;

    static {
        mongoClient = MongoClients.create(CONNECTION_STRING);
        database = mongoClient.getDatabase(DB_NAME);
    }

    public static MongoCollection<Document> getUsersCollection() {
        return database.getCollection(COLLECTION_NAME);
    }

    public static void closeConnection() {
        if (mongoClient != null) {
            mongoClient.close();
        }
    }
}
