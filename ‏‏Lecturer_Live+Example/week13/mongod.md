DataBase --> Shop
Shop --> Users,Orders(Collections)
Document --> {"name":"computer","price:120}, {"name":"rasberrypie"}
BSON -> Binary JSON

{
"name":"Pini",
"gender":"Male",
"address":{
"city":"Rosh-hayain"
},
"hobbies":[
{"name":"cooking},{"name":"Sports}
]
}

key value pairs,
nested data (embbeded document)
List of embbdeded documents

Shell Vs Drivers
Shell is the univrsal langauge to play around with mongod

FrontEnd(UI) ---> Backend(Server) ---> Driver ---> MongoDbServer ---> File Access
mongoDB Shell ---> MongoDbServer(Locally) ---> File Access

CRUD

- create
  insertOne(data,options)
  insertMany([data,data], options)

- read

find(filter, options)
findOne(filter, options)

- update
  updateOne(filter,data,options)
  updateMany(filter,data,options)
  replaceOne(filter, data, options)

- delete
  deleteOne(filter, options)
  deleteMany(filter, options)
