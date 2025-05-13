import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      include: {
        supplier: {
          select: {
            name: true,
            stores: {
              select: {
                location: true,
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductByid = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.product.findUnique({
      where: {
        id: id,
      },

      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            stores: {
              select: {
                location: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: "cmaeag0xr0000f97gptu6absi" },
          { projectMembers: { some: { userId: "cmaeag0xr0000f97gptu6absi" } } },
        ],
      },
      select: {
        name: true,
        id: true,
        location: true,
      },
    });

    const address = await prisma.address.findMany({
      where: {
        userId: "cmaeag0xr0000f97gptu6absi",
      },
      select: {
        id: true,
        addressName: true,
        fullAddress: true,
      },
    });

    res.status(201).json({ data, projects, address });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addNewAddress = async (req, res) => {
  try {
    const { addressName, fullAddress, contactName, contactNumber } = req.body;

    const data = await prisma.address.create({
      data: {
        userId: "cmaeag0xr0000f97gptu6absi",
        addressName: addressName,
        fullAddress: fullAddress,
        contactName: contactName,
        contactNumber: contactNumber,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const { productId, projectId, deliveryAddress, paymentMethod, quantity } =
      req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const price = product.price * quantity;

    const data = await prisma.order.create({
      data: {
        userId: "cmaeag0xr0000f97gptu6absi",
        productId: productId,
        projectId: projectId,
        deliveryAddress: deliveryAddress,
        paymentMethod: paymentMethod,
        quantity: quantity,
        totalPrice: price,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchMarket = async (req, res) => {
  try {
    const searchTerm = req.query.search || ""; // default to empty string if not provided

    const data = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        supplier: {
          select: {
            name: true,
            stores: {
              select: {
                location: true,
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error searching market:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const marketplace = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      
    });

    const suppliers = await prisma.user.findMany({
      where: {
        role: "SUPPLIER",
      },
      take: 4,
      include: {
        stores: {
          select: {
            location: true,
            name: true,
            image: true,
          },
        },
        products: {
          take : 4
        }, // includes all product fields
      },
    });


   return res.status(200).json({ products, suppliers });
  } catch (error) {
    console.error("Error searching market:", error);
    res.status(500).json({ error: error.message });
  }
};
