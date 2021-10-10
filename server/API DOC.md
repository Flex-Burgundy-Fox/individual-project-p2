# Anon - Individual Project H8 Phase02

## Users​

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /login-google`

### POST /register

Request:

- data:

```json
{
    "first_name" : "Patrick",
    "last_name" : "Mahomes",
    "email" : "tombradyisold@mail.com",
    "password" : "12345"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "name": "Patrick Mahomes",
    "id": 8,
    "email": "tombradyisold@mail.com",
    "avatar": "https://avatars.dicebear.com/api/bottts/anon-168.svg"
}
```
- status: 500
- body:
  ​

```json
{
  "errors" : "Internal Server Error"
}
```

- status: 400
- body:
  ​

```json
{
  "errors" : "Validation Error"
}
```

### POST /login

Request:

- data:

```json
{
    "email" : "user1@mail.com",
    "password" : "12345"
}
```


Response:

- status: 200
- body:
  ​

```json
{
    "id": 1,
    "name": "Andrew Wiggins",
    "email": "user1@mail.com",
    "avatar": "https://avatars.dicebear.com/api/bottts/anonnull.svg",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxMjUzMjYwfQ.jDvducDr5A43oP5uuT4p-ZGRJpl8qhftkUefXogFxJ4"
}
```

- status: 500
- body:
  ​

```json
{
  "errors" : "Internal Server Error"
}
```

- status: 400
- body:
  ​

```json
{
  "errors" : "Validation Error"
}
```


## Blablas

List of available endpoints:
​
- `GET /blablas`
- `POST /blablas`
- `GET /blablas/:id`
- `PUT /blablas/:id`
- `PATCH /blablas/:id`
- `DELETE /blablas/:id`

### GET /blablas

Request:


Response:

- status: 200
- body:
  ​

```json
{
    "data": [
        {
            "id": 1,
            "contents": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
            "UserId": 2,
            "createdAt": "2021-09-10T04:27:26.382Z",
            "updatedAt": "2021-09-10T04:27:26.382Z"
        },
        {
            "id": 2,
            "contents": "I just thinking nachos",
            "UserId": 1,
            "createdAt": "2021-09-10T04:34:40.800Z",
            "updatedAt": "2021-09-10T04:34:40.800Z"
        },
        {
            "id": 5,
            "contents": "Hahahaha life is funny",
            "UserId": 1,
            "createdAt": "2021-09-10T05:58:18.979Z",
            "updatedAt": "2021-09-10T05:58:18.979Z"
        }
    ]
}
```

- status: 500
- body:
  ​

```json
{
  "errors" : "Internal Server Error"
}
```

- status: 400
- body:
  ​

```json
{
  "errors" : "Validation Error"
}
```

### POST /blablas

Request:

- data:

```json
{
    "contents" : "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "data": {
        "id": 1,
        "contents": "Fifty years ago, for every $1 a man earned, a woman would only get around $0.60. Today, that figure is closer to $0.83, and although there’s still a long way to go, the gender pay gap has significantly narrowed in recent years. What do we know?",
        "UserId": 2,
        "updatedAt": "2021-09-10T04:27:26.382Z",
        "createdAt": "2021-09-10T04:27:26.382Z"
    }
}
```

- status: 500
- body:
  ​

```json
{
  "errors" : "Internal Server Error"
}
```

- status: 400
- body:
  ​

```json
{
  "errors" : "Validation Error"
}
```

### DELETE /blablas/:id

Response:

- status: 200
- body:
  ​

```json
{
    "message": "data has been deleted!"
}
```

- status: 500
- body:
  ​

```json
{
  "errors" : "Internal Server Error"
}
```

- status: 400
- body:
  ​

```json
{
  "errors" : "Validation Error"
}
```