import prisma from "../DB/db.config.js";

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      //return all the posts of the user
      // post: true,

      //return only title and description of the post
      post: {
        select: {
          title: true,
          description: true,
          comment_count: true,
        },
      },
    },

    // return the count of posts of the user
    // select: {
    //   _count: {
    //     select: {
    //       post: true,
    //       comment: true,
    //     },
    //   },
    // },
  });
  return res.status(200).json({ data: users });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

//fetch user by id

export const fetchUserById = async (req, res) => {
  const userId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  return res.status(200).json({ data: user });
};

//Update the user

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },

    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
};

//delete user by id

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return res
    .status(200)
    .json({ message: "User deleted successfully", user: deletedUser });
};
