**User**
 {  
    ID: Deafult,
    Name: String,
    Mobile: int[10],
    password: String(encrypted), 
    lastUpdated: Date (Default: Date.now())
    countryCode: String,
    Address: String,
    emailID: email,
    Books: array of Book_ID,
    wishList: array of Book_ID,

 }

**Tag**{
    ID: Default,
    Name: String,
    Books: array of Book_ID
}

**Book**{
     ID:Default,
     Name: String,
     photo: binaryfile,
     Owner: User_ID,
     price: int,
     tags: array of strings,
     dateOfUpload: Date (Default: Date.now())
     location: string,
     description: string,
     isActive: boolean 
 }

 post /post parameters: Book
