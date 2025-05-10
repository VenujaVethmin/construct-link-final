import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();





export const getProduct = async (req, res) => {
  try {
    // Get supplier ID from authenticated user (this assumes you have authentication middleware)
    // If you don't have authentication yet, you can continue using the hardcoded ID
    const supplierId = req.user?.id || "cm9qw67qj0000ibw4piy35qds";
    
    const data = await prisma.product.findMany({
      where: {
        supplierId: supplierId,
      },
      orderBy: {
        updatedAt: 'desc', // Get newest products first
      },
      include: {
        // Include any relational data you might need
        // Remove this if you don't need order details with products
        orders: {
          select: {
            id: true,
            quantity: true,
            status: true,
          },
        },
      },
    });
    
    // Use 200 for successful GET requests instead of 201 (which is for resource creation)
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      
      unit,
      
      images,
      stock,
      minStock,
      minOrder,
      
      estimatedDelivery,
      category,
      features,
      specifications,
      applications,
      certifications,
      faqs,
      
    } = req.body;

    const supplierId = req.user?.id || "cm9qw67qj0000ibw4piy35qds";

    const data = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        
        unit,
        images : images,
      
        stock: stock ? parseInt(stock) : null,
        minStock: minStock ? parseInt(minStock) : null,
        minOrder: minOrder ? parseInt(minOrder) : null,
       
        estimatedDelivery,
        category,
        features,
        specifications,
        applications,
        certifications,
        faqs,
      
        supplierId,
      },
    });
    
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message });
  }
};



export const updateProduct = async (req, res) => {
  try {
    
const {
  name,
  description,
  price,
  image,
  stock,
  minStock,
  category,
  specifications,
  
} = req.body;

    const data = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: name,
        description: description,
        image: image,
        minStock: minStock,
        specifications: specifications,
        category: category,
        price: price,
        stock: stock,
      
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

