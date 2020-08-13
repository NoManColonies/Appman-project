# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
### Mongodb schema

Run the following command to create collections.

#### product collection.

```js
db.createCollection("product_list", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "owner", "category", "thumbnail"],
      properties: {
        name: {
          bsonType: "string"
        },
        owner: {
          bsonType: "string"
        },
        type: {
          bsonType: "array"
        },
        category: {
          bsonType: "array"
        },
        description: {
          bsonType: "string"
        },
        thumbnail: {
          bsonType: "string"
        },
        review: {
          bsonType: "array"
        }
      }
    }
  }
})
```
#### user collection.

```js
db.createCollection("user_profile", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password"],
      properties: {
        username: {
          bsonType: "string"
        },
        email: {
          bsonType: "string"
        },
        password: {
          bsonType: "string"
        },
        product: {
         bsonType: "array"
        },
        cart: {
          bsonType: "array"
        },
        token: {
          bsonType: "string"
        },
        user_info: {
          bsonType: "object"
        },
        transaction: {
          bsonType: "array"
        }
      }
    }
  }
})
```
### Insert predefined collection

```js
db.product_list.insertMany([
  {
    name: "Pikachu miki",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product5.jpg",
    type: [
    {
      pricePday: 199,
      deposit: 199,
      color: "pink",
      size: "38",
      quantity: 1
    },
    {
      pricePday: 199,
      deposit: 199,
      color: "blue",
      size: "38",
      quantity: 2
    }]
  },
  {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product7.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
 {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product20.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
  {
    name: "Pikachu miki",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product8.jpg",
    type: [
    {
      pricePday: 199,
      deposit: 199,
      color: "pink",
      size: "38",
      quantity: 1
    },
    {
      pricePday: 199,
      deposit: 199,
      color: "blue",
      size: "38",
      quantity: 2
    }]
  },
  {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product9.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
 {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product10.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
  {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product11.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
 {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product12.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
  {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product13.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  },
 {
    name: "Wonderchibi",
    owner: "admin",
    category: ["toy", "all"],
    description: "description",
    thumbnail: "product14.jpg",
    type: [
    {
      pricePday: 255.55,
      deposit: 300,
      color: "red",
      size: "24",
      quantity: 1
    }]
  }
])
```
