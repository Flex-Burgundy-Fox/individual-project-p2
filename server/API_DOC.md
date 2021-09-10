# API Doc Gourmet Tavern App

## Gourmet Tavern heroku server = 

## Gourmet Tavern Client =

---

## User

### Register

Daftar akun sebagai user

-   **URL**

    `/users/register`

-   **Method:**

    `POST`

-   **Body:**

    ```json
    {
    	"email": "<email>",
    	"name": "<name>", //optional
    	"password": "<password>"
    }
    ```

-   **Success Response:**

    -   **Code:** 201<br />
        **Content:**

        ```json
        {
            "id": 16,
            "name": "test30",
            "email": "test30@mail.com"
        }
        ```

-   **Error Response:**
    -   **Code:** 400 Validation Error <br />
        **Content:**

        ```json
        {
        	"errors": ["<Validation Error>"]
        }
        ```

    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Login

Masuk atau login ke akun yang sudah ada

-   **URL**

    `/users/login`

-   **Method:**

    `POST`

-   **Body:**

    ```json
    {
    	"email": "<email>",
    	"password": "<password>"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message": "Login Succesfully",
            "token": "<token>",
            "userData": {
                "name": "test1",
                "email": "test1@mail.com",
                "status": "New User"
            }
        }
        ```

-   **Error Response:**

    -   **Code:** 400 <br />
        **Content:**

        ```json
        {
        	"errors": ["Username or Password is wrong"]
        	// or Password and Email can't be empty
        }
        ```

    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Login with Google

Login menggunakan akun Google

- **URL**

  `/users/login-google`

- **Method:**

  `POST`

- **Url Param:** none
- **Body:**

  ```json
  {
  	"token": "<token google>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
        "message": "Login Succesfully",
        "token": "<token>",
        "userData": {
            "name": "test1",
            "email": "test1@gmail.com",
            "status": "New User"
        }
    }
    ```

  - **Code:** 201 First-time sign-in <br />
    **Content:**

    ```json
    {
        "message": "Login Succesfully",
        "token": "<token>",
        "userData": {
            "name": "test1",
            "email": "test1@gmail.com",
            "status": "New User"
        }
    }
    ```

- **Error Response:**
  - **Code:** 500 INTERNAL SERVER ERROR <br />

---




### Fetch User Data

Mendapatkan data profil

-   **URL**

    `/users/userData`

-   **Method:**

    `GET`

-   **Headers:**
    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            
            "name": "test1",
            "email": "test1@mail.com",
            "status": "New User"
        }
        ```

-   **Error Response:**

    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```

    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

## Recipes

### Show Recipes

Mendapatkan semua data recipe yang ada

-   **URL**

    `/recipes`

-   **Method:**

    `GET`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        [
            {
                "id": 2,
                "name": "Mie goreng",
                "timeReq": 3,
                "servings": 1,
                "summary": "easy",
                "imageUrl": "https://cdn0-production-images-kly.akamaized.net/xvY-j6s9LSth2Xpq-HyTdPh0gx4=/673x379/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3129172/original/099632200_1589527804-shutterstock_1455941861.jpg",
                "status": "published",
                "category": "private",
                "price": 15000,
                "userId": 14,
                "createdAt": "2021-09-09T14:34:47.030Z",
                "updatedAt": "2021-09-09T14:55:44.213Z"
            },
            {
                "id": 1,
                "name": "ayam goreng 13",
                "timeReq": 5,
                "servings": 3,
                "summary": "tereenak",
                "imageUrl": "https://asset.kompas.com/crops/dIDzCqllVeKUuB_mguXnloiADHo=/0x0:1000x667/750x500/data/photo/2020/05/19/5ec3642991040.jpg",
                "status": "published",
                "category": "private",
                "price": 5000,
                "userId": 1,
                "createdAt": "2021-09-08T11:56:01.183Z",
                "updatedAt": "2021-09-09T13:35:13.258Z"
            }
        ]
        ```

-   **Error Response:**

    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Search Recipes

Mencari semua resep yang ada di database

-   **URL**

    `/search?`

-   **Method:**

    `GET`

- **Url Query:** `search=string`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        [
            {
                "id": 2,
                "name": "Mie goreng",
                "timeReq": 3,
                "servings": 1,
                "summary": "easy",
                "imageUrl": "https://cdn0-production-images-kly.akamaized.net/xvY-j6s9LSth2Xpq-HyTdPh0gx4=/673x379/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3129172/original/099632200_1589527804-shutterstock_1455941861.jpg",
                "status": "published",
                "category": "private",
                "price": 15000,
                "userId": 14,
                "createdAt": "2021-09-09T14:34:47.030Z",
                "updatedAt": "2021-09-09T14:55:44.213Z"
            },
        ]
        ```

-   **Error Response:**

    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


### Show Self Posted Recipe

Mendapatkan semua data recipe yang telah dipost oleh user

-   **URL**

    `/myProfile/recipes`

-   **Method:**

    `GET`

-   **Headers:**
    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        [
            {
                "id": 1,
                "name": "ayam goreng 13",
                "timeReq": 5,
                "servings": 3,
                "summary": "tereenak",
                "imageUrl": "https://asset.kompas.com/crops/dIDzCqllVeKUuB_mguXnloiADHo=/0x0:1000x667/750x500/data/photo/2020/05/19/5ec3642991040.jpg",
                "status": "published",
                "category": "private",
                "price": 5000,
                "userId": 1,
                "createdAt": "2021-09-08T11:56:01.183Z",
                "updatedAt": "2021-09-09T13:35:13.258Z"
            }
        ]
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
            "errors": ["Missing JWT"]
            // or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Show Recipe Detail

Mendapatkan data detail recipe

-   **URL**

    `/recipeDetail/:recipeId`

-   **Method:**

    `GET`

-   **Headers:**
    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "id": 1,
            "name": "ayam goreng 13",
            "timeReq": 5,
            "servings": 3,
            "summary": "tereenak",
            "imageUrl": "https://asset.kompas.com/crops/dIDzCqllVeKUuB_mguXnloiADHo=/0x0:1000x667/750x500/data/photo/2020/05/19/5ec3642991040.jpg",
            "status": "published",
            "category": "private",
            "price": 5000,
            "userId": 1,
            "createdAt": "2021-09-08T11:56:01.183Z",
            "updatedAt": "2021-09-09T13:35:13.258Z",
            "User" : {
                "name": "test",
                "status": "New User",
                "Recipes": [
                    {
                        "id": 1
                    }
                ]
            },
            "Component": { //IF NOT RESTRICTED
                "id": 1,
                "ingredients": "[{\"name\":\"ayam\",\"quantity\":\"1kg\"},{\"name\":\"bumbu\",\"quantity\":\"1 sendok\"}]",
                "tools": "[{\"name\":\"minyak\",\"quantity\":\"500 ml\"}]",
                "recipeId": 1,
                "createdAt": "2021-09-08T12:00:43.000Z",
                "updatedAt": "2021-09-08T15:08:08.002Z"
            },
            "Methods": [ //IF NOT RESTRICTED
                {
                    "id": 4,
                    "title": "potong ayam",
                    "description": "bersih",
                    "imageUrl": null,
                    "recipeId": 1,
                    "createdAt": "2021-09-08T14:35:21.403Z",
                    "updatedAt": "2021-09-08T14:35:21.403Z"
                }
            ],
        }
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
            "errors": ["Missing JWT"]
            // or JWT Invalid
        }
        ```
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


### Add Recipes

membuat data recipe

-   **URL**

    `/newRecipe`

-   **Method:**

    `POST`

-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Body:**

    ```json
    {
    	"name": "<string>",
    	"timeReq": "<number>",
    	"servings": "<string>",
    	"summary": "<string>",
    	"imageUrl": "<imageUrl>",
    	"category": "<public || private>",
    	"status": "<string>",
    	"price": "<number>",
    }
    ```

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**

        ```json
        {
            "id": 4,
            "name": "test resep",
            "timeReq": 60,
            "servings": 5,
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et tristique turpis, ut scelerisque lacus. Cras in tortor neque. Quisque commodo nibh vel tincidunt consequat",
            "imageUrl": null,
            "category": "public",
            "status": null,
            "price": 1000,
            "userId": 1,
            "updatedAt": "2021-09-10T05:56:26.659Z",
            "createdAt": "2021-09-10T05:56:26.659Z"
        }
        ```

-   **Error Response:**

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Add Component

membuat component recipe

-   **URL**

    `/newRecipe/components/:recipeId`

-   **Method:**

    `POST`
-   **Url Params:** `recipeId=number`
-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Body:**

    ```json
    {
    	"ingredients": "<JSON>",
    	"tools": "<JSON>",
    }
    ```

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**

        ```json
        {
            "ingredients": [
                {
                    "name" : "test",
                    "quantity" : 1,
                }
            ],
            "tools": [
                {
                    "name" : "test",
                    "quantity" : 1,
                }
            ],
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Add Method

membuat method recipe

-   **URL**

    `/newRecipe/methods/:recipeId`

-   **Method:**

    `POST`

-   **Url Params:** `recipeId=number`
-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Body:**

    ```json
    {
        "ingredients" : "json array",
        "tools" : "json array"
    }
    ```

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**

        ```json
        {
            "id": 7,
            "title": "test",
            "description": "test",
            "imageUrl": null,
            "recipeId": 4,
            "updatedAt": "2021-09-10T06:40:54.026Z",
            "createdAt": "2021-09-10T06:40:54.026Z"
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


### Publish Recipe

mempublikasikan recipe

-   **URL**

    `/newRecipe/publish/:recipeId`

-   **Method:**

    `patch`

-   **Url Params:** `recipeId=number`
-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Body:**

    ```json
    {
        "status": "published", 
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message": "Recipe succesfully published"
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


### Edit Recipes

mengubah data recipe

-   **URL**

    `/editRecipe/:recipeId`

-   **Method:**

    `PUT`

-   **Url Param:**`recipeId=[number]`
-   **Body:**

    ```json
    {
    	"name": "<string>",
    	"timeReq": "<number>",
    	"servings": "<string>",
    	"summary": "<string>",
    	"imageUrl": "<imageUrl>",
    	"category": "<public || private>",
    	"status": "<string>",
    	"price": "<number>",
    }
    ```

-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message" : "Recipe succesfully edited"
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Edit Component

mengubah component recipe

-   **URL**

    `/editRecipe/components/:recipeId`

-   **Method:**

    `put`
-   **Url Params:** `recipeId=number`
-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Body:**

    ```json
    {
    	"ingredients": "<JSON>",
    	"tools": "<JSON>",
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message" : "Component succesfully edited"
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Delete Method

menghapus method recipe

-   **URL**

    `/destroyMethod/:recipeId`

-   **Method:**

    `delete`
-   **Url Params:** `recipeId=number`
-   **Headers:**<br />
    **Content:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Body:**

    ```json
    {
    	"methodId": "<number>",
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message" : "Method Successfully Deleted"
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Recipe Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```

    -   **Code:** 400 Validation Error<br />

        ```json
        {
        	"errors": ["Validation Error"]		
        }
        ```

    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


## Transactions

### Create Transaction

Membuat token pembayaran midtrans 

-   **URL**

    `/createPaymentToken`

-   **Method:**

    `post`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```
-   **Body:**

    ```json
    {
    	"orderId": "<orderid midtrans>",
    	"price": "number"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "token": "eabb7088-72c3-43e3-af7d-5e3ad3996c07",
            "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/eabb7088-72c3-43e3-af7d-5e3ad3996c07"
        }
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Create Transaction

Menambahkan data transaksi di database 

-   **URL**

    `/createTransaction`

-   **Method:**

    `post`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```
-   **Body:**

    ```json
    {
    	"order_id": "<orderid midtrans>",
    	"transaction_status": "<status transaction>",
    }
    ```

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**

        ```json
        {
            "id": 13,
            "order_id": "1GTRECIPELALALAL",
            "status": "pending",
            "userId": 1,
            "recipeId": 1,
            "updatedAt": "2021-09-10T07:01:47.870Z",
            "createdAt": "2021-09-10T07:01:47.870Z"
        }
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---

### View Transaction

Menampilakan data transaction / recipe yang dibeli user

-   **URL**

    `/transactions`

-   **Method:**

    `get`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        [
            {
                "id": 13,
                "order_id": "1GTRECIPELALALAL",
                "status": "pending",
                "userId": 1,
                "recipeId": 1,
                "createdAt": "2021-09-10T07:01:47.870Z",
                "updatedAt": "2021-09-10T07:01:47.870Z",
                "Recipe": {
                    "id": 1,
                    "name": "ayam goreng 13",
                    "category": "private",
                    "price": 5000,
                    "imageUrl": "https://asset.kompas.com/crops/dIDzCqllVeKUuB_mguXnloiADHo=/0x0:1000x667/750x500/data/photo/2020/05/19/5ec3642991040.jpg"
                }
            }
        ]
        ```

-   **Error Response:**
    -   **Code:** 401 <br />
        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---


### Update status transaction

Mengupdate status transaction

-   **URL**

    `/transactions/:transactionId`

-   **Method:**

    `patch`
-   **Url Params:** `transactionId=number`

-   **Headers:**

    ```json
    {
    	"access_token": "access token"
    }
    ```

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**

        ```json
        {
            "message" : "Transaction succesfully updated" 
        }
        ```
    -   **Code:** 202 <br />
        **Content:**

        ```json
        {
            "message" : "Transaction isn't payed yet" 
        }
        ```

-   **Error Response:**
    -   **Code:** 404 <br />
        ```json
        {
            "errors": ["Transaction Not Found"]
        }
        ```
    -   **Code:** 403 <br />
        ```json
        {
            "errors": ["Access invalid"]
        }
        ```
    -   **Code:** 401 <br />

        ```json
        {
        	"errors": ["Missing JWT"]
        	// or JWT Invalid
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />

---
