
#### query user documents that have enrolled with username 
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }

db.users.find({enrolledWith: {$in: ["emily@emily.com"]}})


####  update use  _______asdofms
__okay 
57867869ce3b7d142b20c94d  mr user
db.users.update({username: "user@user.org"}, {$set: {enrolledWith : ["emily@emily.com", "sara@sara.com"]}})


ms test

db.users.update({username: "test@test.com"}, {$set: {enrolledWith : ["emily@emily.com", "sara@sara.com"]}})