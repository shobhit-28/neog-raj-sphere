import { formatRandomCommentDate, formatRandomPostDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "1",
    content: "RajSphere is the best app 🎉",
    pic: "",
    username: "shobhitraj",
    postedBy: {
      _id: "1",
      firstName: "Shobhit",
      lastName: "Raj",
      username: "shobhitraj",
      profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "1",
        content: "Yeah... I am using it",
        postId: "1",
        user: {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        replies: [
          {
            _id: "1",
            user: {
              _id: "1",
              firstName: "Shobhit",
              lastName: "Raj",
              username: "shobhitraj",
              profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
            },
            content: "Ping me @ayush if you find any bug",
          },
        ],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
      {
        _id: "2",
        content: "I am also using it",
        postId: "1",
        user: {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
        replies: [
          {
            _id: "1",
            user: {
              _id: "1",
              firstName: "Shobhit",
              lastName: "Raj",
              username: "shobhitraj",
              profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
            },
            content: "Ping me @mallick if you find any bug",
          },
        ],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
    ],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "2",
    content: "Must try these momos from Kalimpong Restaurant, Dharamshala",
    pic: "https://www.thespruceeats.com/thmb/T_R22QniykdQ9aPCLKIk-O22Gh4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
    username: "mallick",
    postedBy: {
      _id: "2",
      firstName: "Rahul",
      lastName: "Mallick",
      username: "mallick",
      profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
    },
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "1",
          firstName: "Shobhit",
          lastName: "Raj",
          username: "shobhitraj",
          profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
        },
        {
          _id: "4",
          firstName: "Saurabh",
          lastName: "Kumar",
          username: "saurabh",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/saitama_isaxm6.jpg",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "1",
        content: "Sure, I'll give it a try.",
        postId: "2",
        user: {
          _id: "1",
          firstName: "Shobhit",
          lastName: "Raj",
          username: "shobhitraj",
          profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
        },
        replies: [],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
    ],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "3",
    content: "Hadimba Temple covered with snow, a symbol of peace and tranquility",
    pic: "https://2.bp.blogspot.com/-lWmqyny4pOU/XB_S3p271kI/AAAAAAAAZcU/k-1aAHyk5yAkF--jnHXs90xDwQ7AL1cKACLcBGAs/s1600/hidimba%2Bmata%2B2.jpg",
    username: "ayush",
    postedBy: {
      _id: "3",
      firstName: "Ayush",
      lastName: "Singh",
      username: "ayush",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
    },
    likes: {
      likeCount: 4,
      likedBy: [
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
        {
          _id: "1",
          firstName: "Shobhit",
          lastName: "Raj",
          username: "shobhitraj",
          profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
        },
        {
          _id: "4",
          firstName: "Saurabh",
          lastName: "Kumar",
          username: "saurabh",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/saitama_isaxm6.jpg",
        },
        {
          _id: "5",
          firstName: "Eklavya",
          lastName: "Prasad",
          username: "eklavya",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650009611/uchicha_crest_ngetfr.jpg",
        }
      ],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "4",
    content: "Went to the new Apple store in Mumbai",
    pic: "https://static.dezeen.com/uploads/2023/04/apple-store-mumbai-foster-partners-india_dezeen_2364_hero_12-852x479.jpg",
    username: "saurabh",
    postedBy: {
      _id: "4",
      firstName: "Saurabh",
      lastName: "Kumar",
      username: "saurabh",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/saitama_isaxm6.jpg",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "1",
        content: "How was your experience, I also plan on visiting soon.",
        postId: "4",
        user: {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        replies: [
          {
            _id: "1",
            user: {
              _id: "4",
              firstName: "Saurabh",
              lastName: "Kumar",
              username: "saurabh",
              profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/saitama_isaxm6.jpg",
            },
            content: "It was nice",
          },
        ],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
    ],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "5",
    content: "Got this view after 2 hours trek",
    pic: "https://static.toiimg.com/photo/msid-94791202,width-96,height-65.cms",
    username: "eklavya",
    postedBy: {
      _id: "5",
      firstName: "Eklavya",
      lastName: "Prasad",
      username: "eklavya",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650009611/uchicha_crest_ngetfr.jpg",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "6",
          firstName: "Nitin",
          lastName: "Lakra",
          username: "tintin",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/one_piece_2_jcjkvz.jpg",
        },
        {
          _id: "1",
          firstName: "Shobhit",
          lastName: "Raj",
          username: "shobhitraj",
          profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "1",
        content: "WoW!!",
        postId: "5",
        user: {
          _id: "1",
          firstName: "Shobhit",
          lastName: "Raj",
          username: "shobhitraj",
          profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
        },
        replies: [],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
    ],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "6",
    content: "Went to this gaming fair yesterday!",
    pic: "https://upload.wikimedia.org/wikipedia/commons/e/ee/EGX_2014.jpg",
    username: "tintin",
    postedBy: {
      _id: "6",
      firstName: "Nitin",
      lastName: "Lakra",
      username: "tintin",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/one_piece_2_jcjkvz.jpg",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "5",
          firstName: "Eklavya",
          lastName: "Prasad",
          username: "eklavya",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650009611/uchicha_crest_ngetfr.jpg",
        },
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
      ],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
];

