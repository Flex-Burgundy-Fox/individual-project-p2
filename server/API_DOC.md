user Login to app
URL Heroku: https://coke-project.herokuapp.com/
URL Firebase: https://coke-projects.web.app/

--------------------------------------------------
## Register User
----
add user to Database

* **URL**

    ``/users/register`

* **Method:**
  
    ``POST` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
        {
          "email": "<user email>"
          "password": "<user password>"
        }
        
* **Success Response:** 
  * **Code:** 201 <br />
    **Content:** 
  ```json
  {
    "id": "integer",
    "email": "string"
  }
  ```
 
* **Error Response:**
   * **Code:** 400 VALIDATION ERRORS <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "(MESSAGE OF VALIDATION ERRORS)"
         ] 
      }
      ```


--------------------------------------------------
## Login User
----
user Login to app

* **URL**

    ``/users/login`

* **Method:**
  
    ``POST` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
      {
        "email": "<user email>"
        "password": "<user password>"
      }

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "access_token": "string"
  }
  ```
 
* **Error Response:**
   * **Code:** 400 LOGIN FAILED <br />
      **Content:** 
      ```json
      { 
         "error" : "Email or Password incorrect"
      }
      ```
--------------------------------------------------
## Show Covid Weekly
----
melihat semua data covid mingguan

* **URL**

    ``/covids/weekly`

* **Method:**
  
    ``GET` 
  
*  **URL Params** : 'https://data.covid19.go.id/public/api/update.json'

* **Data Params** : 
 
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": [
        {
          "key_as_string": "2021-09-04T00:00:00.000Z",
          "key": 1630713600000,
          "doc_count": 1,
          "jumlah_meninggal": {
              "value": 539
          },
          "jumlah_sembuh": {
              "value": 13806
          },
          "jumlah_positif": {
              "value": 6727
          },
          "jumlah_dirawat": {
              "value": -7618
          },
          "jumlah_positif_kum": {
              "value": 4123617
          },
          "jumlah_sembuh_kum": {
              "value": 3827449
          },
          "jumlah_meninggal_kum": {
              "value": 135469
          },
          "jumlah_dirawat_kum": {
              "value": 160699
          }
        }
    ]
  }
  ```
 
* **Error Response:**
  
  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```

--------------------------------------------------
## Show Covid News
----
melihat semua berita covid

* **URL**

    ``/covids/covid-news`

* **Method:**
  
    ``GET` 
  
*  **URL Params** : 'https://newsapi.org/v2/top-headlines?country=id&q=covid'

* **Data Params** : 
* **Headers:** <br />
    {
      Authorization : API_Key
    }
 
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": [
        {
            "source": {
                "id": null,
                "name": "Tabloidbintang.com"
            },
            "author": "Redaksi",
            "title": "Hoaks Soal Vaksin Covid-19: dari Mengubah DNA Sampai Menyebabkan Kemandulan - Tabloidbintang.com",
            "description": "Hoaks Soal Vaksin Covid-19: dari Mengubah DNA Sampai Menyebabkan Kemandulan",
            "url": "https://www.tabloidbintang.com/berita/peristiwa/read/164345/hoaks-soal-vaksin-covid-19-dari-mengubah-dna-sampai-menyebabkan-kemandulan",
            "urlToImage": "https://media.tabloidbintang.com/files/thumb/jokowi-vaksinasibudayawan-setneg.jpg/745",
            "publishedAt": "2021-09-10T04:30:39Z",
            "content": "TABLOIDBINTANG.COM - Ada banyak rumor atau mitos atau informasi tak benar beredar terkait vaksin Covid-19. Beberapa hoaks itu bisa membuat cemas. Tapi jangan langsung percaya informasi yang belum jel… [+1779 chars]"
        }   
      ]
  }
  ```
* **Error Response:**
  
  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```
--------------------------------------------------
## Show News by Cat
----
melihat semua berita by category

* **URL**

    ``/news-category/:cat`

* **Method:**
  
    ``GET` 
  
*  **URL Params** : 'https://newsapi.org/v2/top-headlines?country=id&category='

* **Data Params** :  required: cat=[string]
* **Headers:** <br />
    {
      Authorization : API_Key,
      access_token : required
    }
 
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": [
        {
            "source": {
                "id": null,
                "name": "Tabloidbintang.com"
            },
            "author": "Redaksi",
            "title": "Hoaks Soal Vaksin Covid-19: dari Mengubah DNA Sampai Menyebabkan Kemandulan - Tabloidbintang.com",
            "description": "Hoaks Soal Vaksin Covid-19: dari Mengubah DNA Sampai Menyebabkan Kemandulan",
            "url": "https://www.tabloidbintang.com/berita/peristiwa/read/164345/hoaks-soal-vaksin-covid-19-dari-mengubah-dna-sampai-menyebabkan-kemandulan",
            "urlToImage": "https://media.tabloidbintang.com/files/thumb/jokowi-vaksinasibudayawan-setneg.jpg/745",
            "publishedAt": "2021-09-10T04:30:39Z",
            "content": "TABLOIDBINTANG.COM - Ada banyak rumor atau mitos atau informasi tak benar beredar terkait vaksin Covid-19. Beberapa hoaks itu bisa membuat cemas. Tapi jangan langsung percaya informasi yang belum jel… [+1779 chars]"
        }   
      ]
  }
  ```
* **Error Response:**
  
  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```

--------------------------------------------------
## Show Covid Province
----
melihat semua data covid penambahan semua provinsi

* **URL**

    ``/covids/prov`

* **Method:**
  
    ``GET` 
  
*  **URL Params** : 'https://data.covid19.go.id/public/api/prov.json'

* **Data Params** : 
* **Headers:** <br />
    {
      access_token : required
    }
 
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": [
        {
        "last_date": "2021-09-09",
        "current_data": 99.99997592292833,
        "missing_data": 0.000024077071671513295,
        "tanpa_provinsi": 1,
        "list_data": [
            {
                "key": "DKI JAKARTA",
                "doc_count": 20.559580038085112,
                "jumlah_kasus": 853907,
                "jumlah_sembuh": 836157,
                "jumlah_meninggal": 13418,
                "jumlah_dirawat": 4332,
                "jenis_kelamin": [
                    {
                        "key": "LAKI-LAKI",
                        "doc_count": 419159
                    },
                    {
                        "key": "PEREMPUAN",
                        "doc_count": 424109
                    }
                ],
                "kelompok_umur": [
                    {
                        "key": "0-5",
                        "doc_count": 27737,
                        "usia": {
                            "value": 5
                        }
                    },
                    {
                        "key": "6-18",
                        "doc_count": 81240,
                        "usia": {
                            "value": 18
                        }
                    },
                    {
                        "key": "19-30",
                        "doc_count": 226936,
                        "usia": {
                            "value": 30
                        }
                    },
                    {
                        "key": "31-45",
                        "doc_count": 249072,
                        "usia": {
                            "value": 45
                        }
                    },
                    {
                        "key": "46-59",
                        "doc_count": 167871,
                        "usia": {
                            "value": 59
                        }
                    },
                    {
                        "key": "≥ 60",
                        "doc_count": 87031,
                        "usia": {
                            "value": 36583
                        }
                    }
                ],
                "lokasi": {
                    "lon": 106.83611829006928,
                    "lat": -6.204698991169558
                },
                "penambahan": {
                    "positif": 308,
                    "sembuh": 486,
                    "meninggal": 13
                }
            },
          ]
        }
    ]
  }
  ```
 
* **Error Response:**
  
  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```
