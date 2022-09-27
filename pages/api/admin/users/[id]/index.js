import { getSession } from "next-auth/react";
import User from "../../../../../models/User";
import db from "../../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('Admin signin required');
  }

  if (req.method === 'GET') {
    return getHandler(req, res)
  } else if (req.method === 'PUT') {
    return updateHandler(req, res)
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: 'Method not allowed' })
  }
}

const getHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id)
  await db.disconnect();
  res.send(user)
}


const updateHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
    user.name = req.body.name
    user.isAdmin = Boolean(req.body.isAdmin)
    await user.save()
    await db.disconnect()
    res.send({ message: 'User updated successfully' })
  } else {
    await db.disconnect()
    res.status(400).send({ message: 'User not found' })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
    if (user.isAdmin) {
      return res.status(400).send({ message: 'Cannot delete admin user' })
    }
    await user.remove()
    await db.disconnect()
    res.send({ message: 'User deleted' })
  } else {
    await db.disconnect()
    res.status(400).send({ message: 'User not found' })
  }
}

export default handler