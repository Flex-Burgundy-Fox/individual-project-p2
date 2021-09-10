## **Register**

`Before integrating with Theater24 App you must register first by entering your email and password data you can via json or x-www-form-urlencoded and rest assured Theater24 App maintains your privacy (because password will be hashed before entering the database).`

-  **URL**

   `/users/register`

-  **Method:**

   `POST`

-  **URL Params**

   `None`

-  **Data Params**

   ```json
   {
      "email": "user@mail.com",
      "password": "12345678",
      "role": "basic"
   }
   ```

-  **Success Response:**

   -  **Code:** 201 Created <br />
      **Content:**
      ```json
      {
         "id": 1,
         "email": "user1@mail.com"
      }
      ```

-  **Error Response:**

   -  **Code:** 400 Bad Request <br />
      **Content:**
      ```json
      {
         "error_messages": [
            "Email has been used",
            "Email input must be in email format",
            "Email input cannot be null",
            "Email input cannot be empty",
            "Password input must be at least 8 characters",
            "Password input cannot be null",
            "Password input cannot be empty"
         ]
      }
      ```

   OR

   -  **Code:** 500 Internal Server Error <br />
      **Content:**
      ```json
      { "error_messages": ["Internal server error"] }
      ```

---

## **Login**

`Before getting access rights in the Theater24 App, the user must first login by entering his email data and password and selecting one of the basic or pro roles, either using json or x-www-form-urlencoded.`

-  **URL**

   `/users/login`

-  **Method:**

   `POST`

-  **URL Params**

   `None`

-  **Data Params**

   ```json
   {
      "email": "user1@mail.com",
      "password": "12345678",
      "role": "basic"
   },
   ```

-  **Success Response:**

   -  **Code:** 200 OK <br />
      **Content:**
      ```json
      {
         "id": 1,
         "email": "user@mail.com",
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImVtYWlsIjoidXNlcjEzQG1haWwuY29tIiwiaWF0IjoxNjI4NDg1MzgxfQ.TyZk9PztRz2WxBSEnvotR_FhynDvnh5Pm-gVtrf0GRY"
      }
      ```

-  **Error Response:**

   -  **Code:** 400 Bad Request <br />
      **Content:**

      ```json
      {
         "error_messages": [
            "The username and password you entered did not match our records. Please double-check and try again"
         ]
      }
      ```

   OR

   -  **Code:** 401 Unauthorized <br />
      **Content:**
      ```json
      {
         "error_messages": ["User not found"]
      }
      ```

   OR

   -  **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      { "error_messages": ["Internal server error"] }
      ```

---

## **Google-Login**

-  **URL**

   `/users/google-login`

-  **Method:**

   `POST`

-  **URL Params**

   `None`

-  **Data Params**

   ```json
   {
      "token": "<token>"
   },
   ```

-  **Success Response:**

   -  **Code:** 200 OK <br />
      **Content:**
      ```json
      {
         "id": 1,
         "email": "user1@mail.com",
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImVtYWlsIjoidXNlcjEzQG1haWwuY29tIiwiaWF0IjoxNjI4NDg1MzgxfQ.TyZk9PztRz2WxBSEnvotR_FhynDvnh5Pm-gVtrf0GRY"
      }
      ```

-  **Error Response:**

   -  **Code:** 400 Bad Request <br />
      **Content:**

      ```json
      {
         "error_messages": [
            "The username and password you entered did not match our records. Please double-check and try again"
         ]
      }
      ```

   OR

   -  **Code:** 401 Unauthorized <br />
      **Content:**
      ```json
      {
         "error_messages": ["User not found"]
      }
      ```

   OR

   -  **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      { "error_messages": ["Internal server error"] }
      ```

---

## **Add Favorite**

-  **URL**

   `/favoriteMovies`

-  **Method:**

   `POST`

-  **URL Params**

   `None`

-  **Headers:**

   `access_token`

-  **Data Params**

   ```json
   {
      "MovieId": 1,
      "UserId": 1
   }
   ```

-  **Success Response:**

   -  **Code:** 200 OK <br />
      **Content:**
      ```json
      {
         "data": {
            "id": 1,
            "MovieId": 1,
            "UserId": 1,
            "updatedAt": "2021-08-09T05:21:17.269Z",
            "createdAt": "2021-08-09T05:21:17.269Z"
         }
      }
      ```

-  **Error Response:**

   -  **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**

      ```json
      { "error_messages": ["Internal server error"] }
      ```

---

## **Add Favorite**

-  **URL**

   `/favoriteMovies`

-  **Method:**

   `POST`

-  **URL Params**

   `None`

-  **Headers:**

   `access_token`

-  **Data Params**

   ```json
   {
      "MovieId": 1,
      "UserId": 1
   }
   ```

-  **Success Response:**

   -  **Code:** 200 OK <br />
      **Content:**
      ```json
      {
         "data": {
            "id": 1,
            "MovieId": 1,
            "UserId": 1,
            "updatedAt": "2021-08-09T05:21:17.269Z",
            "createdAt": "2021-08-09T05:21:17.269Z"
         }
      }
      ```

-  **Error Response:**

   -  **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**

      ```json
      { "error_messages": ["Internal server error"] }
      ```

---

## **Cancel Favorite**

-  **URL**

   `/favoriteMovies`

-  **Method:**

   `DELETE`

-  **URL Params**

   **Required:**

   `id=[integer]`

-  **Headers:**

   `access_token`

-  **Data Params**

   `None`

-  **Success Response:**

   -  **Code:** 200 OK <br />
      **Content:**

      ```json
      {
         "success_message": "Data deleted successfully"
      }
      ```

-  **Error Response:**

   -  **Code:** 401 Unauthorized <br />
      **Content:**

      ```json
      {
         "error_messages": ["User not found", "Unauthorized access"]
      }
      ```

   OR

   -  **Code:** 404 Not Found <br />
      **Content:**

      ```json
      {
         "error_messages": ["Access token not found", "Product not found"]
      }
      ```

   OR

   -  **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**

      ```json
      { "error_messages": ["Internal server error"] }
      ```

---

client: https://theater24.web.app/
server: https://theater24.herokuapp.com
