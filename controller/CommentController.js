import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      //   post: true,
      // return user who commented and the post on which the comment is made
      user: true,
      post: {
        // return user who made the post
        include: {
          user: true,
        },
      },
    },
  });
  return res.status(200).json({ data: comments });
};

export const createComment = async (req, res) => {
  const { postId, userId, comment } = req.body;

  //increment the comment count in the post table
  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      postId: Number(postId),
      userId: Number(userId),
      comment: comment,
    },
  });

  return res.status(201).json({
    message: "Comment created successfully",
    data: newComment,
  });
};

//fetch comment by id

export const fetchCommentById = async (req, res) => {
  const commentId = req.params.id;

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  return res.status(200).json({ data: comment });
};

//Update the comment

export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { postId, userId, comment } = req.body;

  const updatedComment = await prisma.comment.update({
    where: {
      id: Number(commentId),
    },

    data: {
      postId: Number(postId),
      userId: Number(userId),
      comment: comment,
    },
  });

  return res.status(200).json({
    message: "Comment updated successfully",
    data: updatedComment,
  });
};

//delete comment by id

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const postId = req.body.postId;

  //decrement the comment count in the post table
  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });

  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return res
    .status(200)
    .json({ message: "Comment deleted successfully", data: deletedComment });
};
