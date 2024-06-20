db.createCollection("userModel", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "userModel",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "profileImage": { bsonType: "string" },
        "username": { bsonType: "string" },
        "email": { bsonType: "string" },
        "createdAt": { bsonType: "date" },
        "googleId": { bsonType: "string" },
        "refreshToken": { bsonType: "string" },
      },
    },
  },
});

db.createCollection("notesModel", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "notesModel",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "title": { bsonType: "string" },
        "content": { bsonType: "string" },
        "media": { bsonType: "array", items: { bsonType: "string" } },
        "createdAt": { bsonType: "date" },
        "user": { bsonType: "objectId" },
      },
    },
  },
});