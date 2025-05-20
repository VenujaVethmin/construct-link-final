import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const dashboard = async (req , res) => {

  try {



    const totalRevenue = await prisma.order.count({
      where:{
        product: {
          supplierId: "cmatemd5v0000f9j8zm15ypix",
          
        },
        status: "DELIVERED"
      }
    })


    const totalOrders = await prisma.order.count({
      where:{
        product: {
          supplierId: "cmatemd5v0000f9j8zm15ypix",
        },
        status : {
          not: "DELIVERED"
        }
      }
    }
    )


    const pendingOrders = await prisma.order.count({
      where:{
        product: {
          supplierId: "cmatemd5v0000f9j8zm15ypix",
        },
        status : "PENDING"
      }
    })


    const activeProducts = await prisma.product.count({
      where: {
        supplierId: "cmatemd5v0000f9j8zm15ypix",
      },
    });


    const products = await prisma.product.findMany({
      where: {
        supplierId: "cmatemd5v0000f9j8zm15ypix",

      },
      select: {
        name: true,
        stock: true,
        minStock: true,
      },
    })

    const data = await prisma.order.findMany({
      where: {
        product: {
          supplierId: "cmatemd5v0000f9j8zm15ypix",
          
        },
        
      },
      include:{
        project:{
          select:{
            name : true
          }
        }
       
      }
    });

    const store = await prisma.user.findUnique({
      where: {
        id: "cmatemd5v0000f9j8zm15ypix",
      },
      select: {
       stores :{
        select:{
          name : true,
          description:true
        }
       }
      },
    });
    return res.status(200).json({
      data,
      totalRevenue,
      totalOrders,
      pendingOrders,
      activeProducts,
      products,
      store,
    });
    
  } catch (error) {
    console.error("Error in dashboard:", error);
    res.status(500).json({ error: error.message });
    
  }

}





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

    const supplierId = req.user?.id || "cmatemd5v0000f9j8zm15ypix";

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

export const createStore = async (req, res) => {
  try {
    const {
      name,
      description,
      phone,
      address,
      city,
      state,
      postalCode,
      type,
      serviceAreas,
      image,
    } = req.body;

    const ownerId = "cmatemd5v0000f9j8zm15ypix"; // replace with req.user.id

    const store = await prisma.store.upsert({
      where: { ownerId_name: { ownerId, name } }, // uses the unique key
      create: {
        name,
        description,
        phone,
        address,
        city,
        state,
        postalCode,
        type,
        serviceAreas,
        image,
        ownerId,
      },
      update: {}, // keep existing row unchanged
    });

    // flag first‑time login only when we just created the store
    if (store.createdAt.getTime() === store.updatedAt.getTime()) {
      await prisma.user.update({
        where: { id: ownerId },
        data: { firstTimeLogin: false },
      });
    }

    return res.status(200).json(store);
  } catch (error) {
    console.error("Error in createStore:", error);
    return res.status(500).json({ error: error.message });
  }
};



export const store = async (req ,res) => {
  try {
    const data = await prisma.product.findMany({
      where: {
        supplierId: "cmatemd5v0000f9j8zm15ypix",
      },
      include:{
        supplier:{
          include:{
            stores:true
          }
        }
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in createStore:", error);
    return res.status(500).json({ error: error.message });
  }
}



// Example of what the supplier profile endpoint might look like
// GET /api/suppliers/:id
export async function getSupplierById(req, res) {
  const { id } = req.params;
  
  try {
    const supplier = await prisma.user.findUnique({
      where: { id },
      include: {
        stores: true,
        products: {
          orderBy: { createdAt: 'desc' },
          take: 20, // Limiting to recent products
        },
      },
    });

  
    return res.status(200).json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    return res.status(500).json({ error: 'Failed to fetch supplier data' });
  }
}