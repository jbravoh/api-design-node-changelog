import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  // putting things in memory can reduce performance (best to update schema)
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  req.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findFirst({
    where: {
      id,
      productId: req.product.id,
    },
  });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: "'nope" });
  }
  const update = prisma.update.create({
    data: req.body,
  });

  res.json({ data: update, message: "update created" });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: "nope" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate, message: "update updated" });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: "unable to delete" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted, message: "Update deleted" });
};
