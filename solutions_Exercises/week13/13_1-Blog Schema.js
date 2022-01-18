const author = {
  _id: new ObjectId("1111"),
  imgs:{
      profile:'url',
      background:'url'
  },
  posts: [{ id1 }, { id2 }, { id3 }, { id4 }],
};


const posts = {
  _id: new ObjectId("1"),
  content: '',
  timeStamp: '',
  author: new ObjectId('1111'),
  likes: [{id},{id},{},{},{}],
  //pagination- only load the first few comments, reference the rest
//   npm install mongoose-paginate-v2
  comments: [{},{},{}],
};

const like = [
        {
            _id= new ObjectId(''),
            userId:"",
            timeStamp:'',
            postId:''
        },
        {
            _id= new ObjectId(''),
            userId:"",
            timeStamp:'',
            postId:''
        },
        {
            _id= new ObjectId(''),
            userId:"",
            timeStamp:'',
            postId:''
        },
    ]

const comments =  [
        {
            _id= new ObjectId(''),
            timeStamp:'',
            userId:'',
            content:'',
            //123 is in reference to the comment below
            replies:[{'123'},{ids},{ids}] //replies to this specific comment
        },
        {
            _id= new ObjectId('123'),
            timeStamp:'',
            userId:'',
            content:'',
            replies:[{ids},{ids},{ids}]
        },
      
    ]


