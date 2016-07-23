
#### query user documents that have enrolled with username 
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }

db.users.find({enrolledWith: {$in: ["emily@emily.com"]}})


####  update use  _______asdofms
__okay 
57867869ce3b7d142b20c94d  mr user
db.users.update({username: "user@user.org"}, {$set: {enrolledWith : ["emily@emily.com", "sara@sara.com"]}})


ms test

db.users.update({username: "some@body.com"}, {$set: {enrolledWith : [ "sara@sara.com"]}})

db.users.update({username: "emily@emily.com"}, {$set: {name : "Emily's"}})
db.users.update({username: "debi@downer.com"}, {$set: {name : "Debi", username:"debi@debi.com"}})


"_id" : ObjectId("578579fce2dd0aa832419d67"),
        "role" : "clinician",
        "name" : "someone",
        "username" : "special@a.com",
        "phoneNumber" : "234-5345-63453",
        "password" : "$2a$11$jBTsWhDXvqyfphqLW7wUn.2fctOCgBD9zcFU2cs0N8VCt2NnSDOOu",
        "patient" : {
                "enrolledWith" : [ ]
        },
        "__v" : 0
}