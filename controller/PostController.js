import prisma from "../DB/db.config.js";

export const fetchPosts = async (req, res) => {
  //pagination
  let page = Number(req.query.page) || 1; //default page is 1
  let limit = Number(req.query.limit) || 10; //default limit is 10

  if (page <= 0) {
    page = 1;
  }

  if (limit <= 0 || limit > 100) {
    limit = 10;
  }

  const skip = (page - 1) * limit; //number of posts to skip

  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,

    include: {
      //return all the comments of the post
      //   comment: true,

      //return only comment and the user who commented
      comment: {
        include: {
          //   user: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },

    orderBy: {
      id: "desc",
    },

    // where: {
    //   // comment_count: {
    //   //   gt: -1,
    //   // },
    //   title: {
    //     // startsWith: "Next",
    //     equals: "Next halloween",
    //   },
    // },
  });

  //to get the total count of posts
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / limit);

  return res.status(200).json({
    data: posts,
    meta: { totalPages, currentPage: page, limit: limit },
  });
};

export const createPost = async (req, res) => {
  const { userId, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      userId: Number(userId),
      title: title,
      description: description,
    },
  });

  return res.status(201).json({
    message: "Post created successfully",
    data: newPost,
  });
};

//fetch post by id

export const fetchPostById = async (req, res) => {
  const postId = req.params.id;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });

  return res.status(200).json({ data: post });
};

//Update the post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId, title, description } = req.body;

  const updatedPost = await prisma.post.update({
    where: {
      id: Number(postId),
    },

    data: {
      userId: Number(userId),
      title: title,
      description: description,
    },
  });

  return res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
};

//delete post by id

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });

  return res
    .status(200)
    .json({ message: "Post deleted successfully", data: deletedPost });
};

// To search the post(full text search)
export const searchPosts = async (req, res) => {
  // const query = req.query.q;
  // or
  const { q } = req.query; //destructuring
  const posts = await prisma.post.findMany({
    where: {
      description: {
        // search: query,
        search: q,
      },
    },
  });

  return res.status(200).json({ data: posts });
};
