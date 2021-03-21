*Use auth token of the user while making all the "/books/.." API calls in the header.*



**getting a book by id**
```
GET "/books/:id"
req = NULL
res = Book document with given id 
```


**getting list of all books**
```
GET "/books"
req = NULL
res = array of all Book documents
```


**getting list of books by tags**
```
GET "/books/tags"
req = array of tag_id's
res = array of Book documents with all the given tags
```

**getting list of books based on location**
```
GET "/books/loc"
req = location string
res = array of book documents in the location
```

**getting books based on search string**
```
GET "/books/search"
req = search string
res = array of book documents matching search string
```

**posting ad for book**
```
POST "/books"
req = book document
res = NULL
```

**updating details of book's ad**
```
PATCH "/books/:id"
req = JSON object of fields to be updated
res = Updated book document
```

**delete a book's ad**
```
DELETE "/books/:id"
req = NULL
res = deleted book document
```

**getting a user by id**
```
GET "/users/:id"
req = NULL
res = User document with given id
```

**getting ads posted by a user**
```
GET "/users/:id/ads"
req = NULL
res = book documents posted by user with given id
```

**logging in a user**
```
POST "/users/login"
req = JSON object with email, password
res = auth token and user document
```

**logging out a user instance**
```
POST "/users/me/logout"
req = auth token
res = NULL (delete the given auth token)
```

**logging out from all devices**
```
POST "/users/me/logoutall"
req = auth token
res = NULL (delete all auth tokens of the user)
```

**user's recommendations**
```
GET "/users/me/recommended"
req = NULL
res = array of book documents recommended to user
```

**user's wishlist**
```
GET "/users/me/wishlist"
req = NULL
res = array of book documents in user's wishlist
```

**ads posted by user**
```
GET "/users/me/ads"
req = NULL
res = array of book documents posted by user
```

**books bought by user(history)**
```
GET "/users/me/history"
req = NULL
res = array of book documents bought by user
```

**signing up a user**
```
POST "/users/signup"
req = User document
res = auth token and newly created user document
```

**Update user's profile**
```
PATCH "/users/me/update"
req = JSON object with fields to be updated
res = updated user document
```

**deleting the account**
```
DELETE "/users/me/deleteAcc"
req = NULL
res = NULL (delete all books posted by user as well)
```
