"use client";

import axiosInstance from "@/lib/axiosInstance";
import {
  ArchiveBoxIcon,
  PencilIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import useSWR from "swr";


const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const ProductsPage = () => {

    const {
      data: products,
      error,
      isLoading,
      mutate,
    } = useSWR("/supplier/getProduct", fetcher);


  const fileInputRef = useRef(null);
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     name: "Premium Portland Cement",
  //     category: "Building Materials",
  //     image:
  //       "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
  //     price: 950,
  //     unit: "bag",
  //     stock: 5000,
  //     minStock: 1000,
  //     specifications: ["Type I/II", "42.5 Grade", "50 KG Bag"],
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     name: "Steel Reinforcement Bars",
  //     category: "Building Materials",
  //     image:
  //       "https://images.unsplash.com/photo-1611750325917-cdfaf72101be?q=80&w=800",
  //     price: 85000,
  //     unit: "ton",
  //     stock: 50,
  //     minStock: 10,
  //     specifications: ["Grade 500", "12mm Diameter", "ASTM Compliant"],
  //     status: "active",
  //   },
  // ]);

  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    specifications: [],
  });

  const [addForm, setAddForm] = useState({
    name: "",
    category: "Building Materials",
    price: "",
    unit: "bag",
    stock: "",
    minStock: "",
    specifications: [],
    image: "",
    status: "active",
  });

  // Unit types for dropdown
  const unitTypes = [
    "bag",
    "piece",
    "ton",
    "kg",
    "sq.ft",
    "sq.m",
    "meter",
    "liter",
    "gallon",
    "roll",
    "sheet",
    "panel",
    "unit",
  ];

  // Categories for dropdown
  const categories = [
    "Building Materials",
    "Flooring",
    "Electrical",
    "Plumbing",
    "Paint & Finish",
    "Windows & Doors",
    "Hardware",
    "Tools & Equipment",
    "Fixtures",
    "Roofing",
    "Insulation",
    "Landscaping",
    "Other",
  ];

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // For demo purposes, we'll use the preview as the image URL
        // In a real app, you'd upload this to a server
        setAddForm({
          ...addForm,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Open edit modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      minStock: product.minStock,
      specifications: product.specifications,
    });
    setIsEditModal(true);
  };

  // Update product
  const handleUpdate = async () => {
    if (selectedProduct) {
     try {
      const res = await axiosInstance.put(`supplier/updateProduct/${selectedProduct.id}`, {
        ...editForm,
      });

      if (res.status === 200) {
        window.alert("Product updated successfully!");
      }
     } catch (error) {
      console.error(error);
     }
      setIsEditModal(false);
    }
  };

  // Add new product
  const handleAddProduct =async () => {
 

    try {

      const res = await axiosInstance.post("supplier/createProduct",{
        ...addForm
      })
       if(res.status === 201){
        window.alert("nice")
       }
       setIsAddModal(false);

       // Reset form
       setAddForm({
         name: "",
         category: "Building Materials",
         price: "",
         unit: "bag",
         stock: "",
         minStock: "",
         specifications: [],
         image: "",
         status: "active",
       });
       setSelectedImage(null);
       setImagePreview("");
      
    } catch (error) {
      console.error(error)
    }
   
  };

  // Quick stock update
  const handleStockUpdate = (productId, change) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + change) } : p
      )
    );
  };

  // Handle specification input
  const handleSpecInput = (value) => {
    if (!value.trim()) return;

    setAddForm({
      ...addForm,
      specifications: [...addForm.specifications, value.trim()],
    });

    // Clear the input field
    document.getElementById("spec-input").value = "";
  };

  // Remove specification
  const removeSpec = (index) => {
    const updatedSpecs = [...addForm.specifications];
    updatedSpecs.splice(index, 1);
    setAddForm({
      ...addForm,
      specifications: updatedSpecs,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Products & Stock</h1>
            <p className="text-gray-400 mt-1">
              Manage your products and inventory
            </p>
          </div>
          <button
            onClick={() => setIsAddModal(true)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={
                    product.image ||
                    "https://i0.wp.com/tinasbotanicals.com/wp-content/uploads/2025/01/No-Product-Image-Available.png?fit=800%2C800&ssl=1"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.stock <= product.minStock && (
                  <div className="absolute top-2 right-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded-full">
                    Low Stock Alert
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-white">
                    {product.name}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {product.category}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white">
                      Rs. {product.price.toLocaleString()}/{product.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Stock:</span>
                    <span className="text-white">
                      {product.stock.toLocaleString()} {product.unit}s
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Min. Stock Level:</span>
                    <span className="text-white">
                      {product.minStock.toLocaleString()} {product.unit}s
                    </span>
                  </div>
                </div>

                {/* Quick Stock Update */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => handleStockUpdate(product.id, -1)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    <span className="text-lg text-gray-400 font-bold">-</span>
                  </button>
                  <input
                    type="number"
                    value={product.stock}
                    className="flex-1 bg-gray-700/30 border border-gray-600 rounded px-3 py-1 text-white text-center"
                    readOnly
                  />
                  <button
                    onClick={() => handleStockUpdate(product.id, 1)}
                    className="p-1 hover:bg-gray-700/50 rounded"
                  >
                    <span className="text-lg text-gray-400 font-bold">+</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg flex items-center justify-center gap-1"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit Details
                  </button>
                  <button className="px-3 py-1.5 bg-gray-700/50 text-gray-400 hover:bg-gray-700 rounded-lg">
                    <ArchiveBoxIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModal && selectedProduct && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-md p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Edit Product
                  </h3>
                  <button
                    onClick={() => setIsEditModal(false)}
                    className="p-1 hover:bg-gray-700 rounded-full"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.stock}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            stock: Math.max(0, Number(e.target.value)),
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Minimum Stock Level
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.minStock}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          minStock: Math.max(0, Number(e.target.value)),
                        })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex gap-3 justify-end mt-6">
                    <button
                      onClick={() => setIsEditModal(false)}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Product Modal */}
        <AnimatePresence>
          {isAddModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-md p-6 my-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Add New Product
                  </h3>
                  <button
                    onClick={() => setIsAddModal(false)}
                    className="p-1 hover:bg-gray-700 rounded-full"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={addForm.name}
                      onChange={(e) =>
                        setAddForm({ ...addForm, name: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Category *
                    </label>
                    <select
                      value={addForm.category}
                      onChange={(e) =>
                        setAddForm({ ...addForm, category: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1rem",
                      }}
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Product Image
                    </label>

                    <div className="mt-1 flex items-center space-x-4">
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="flex flex-col items-center justify-center w-32 h-32 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg hover:bg-gray-700/80 cursor-pointer transition-colors"
                      >
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={imagePreview}
                              alt="Product preview"
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        ) : (
                          <>
                            <PhotoIcon className="h-10 w-10 text-gray-400" />
                            <span className="mt-2 text-xs text-gray-400">
                              Click to upload
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          value={addForm.image}
                          onChange={(e) =>
                            setAddForm({ ...addForm, image: e.target.value })
                          }
                          placeholder="Or enter image URL"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Upload an image or provide an URL
                        </p>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Price *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={addForm.price}
                        onChange={(e) =>
                          setAddForm({
                            ...addForm,
                            price: Math.max(0, Number(e.target.value)),
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Unit Type *
                      </label>
                      <select
                        value={addForm.unit}
                        onChange={(e) =>
                          setAddForm({ ...addForm, unit: e.target.value })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                        style={{
                          backgroundImage:
                            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                        required
                      >
                        {unitTypes.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Initial Stock *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={addForm.stock}
                        onChange={(e) =>
                          setAddForm({
                            ...addForm,
                            stock: Math.max(0, Number(e.target.value)),
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Minimum Stock Level *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={addForm.minStock}
                        onChange={(e) =>
                          setAddForm({
                            ...addForm,
                            minStock: Math.max(0, Number(e.target.value)),
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Specifications
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        id="spec-input"
                        type="text"
                        placeholder="Add specification and press Enter"
                        className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSpecInput(e.target.value);
                          }
                        }}
                      />
                      <button
                        onClick={() =>
                          handleSpecInput(
                            document.getElementById("spec-input").value
                          )
                        }
                        className="px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg"
                      >
                        Add
                      </button>
                    </div>

                    {addForm.specifications.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {addForm.specifications.map((spec, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-700 text-gray-300"
                          >
                            {spec}
                            <button
                              onClick={() => removeSpec(index)}
                              className="ml-1 text-gray-400 hover:text-gray-200"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end mt-6">
                    <button
                      onClick={() => setIsAddModal(false)}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProduct}
                      disabled={
                        !addForm.name ||
                        !addForm.price ||
                        !addForm.stock ||
                        !addForm.minStock
                      }
                      className={`px-4 py-2 rounded-lg ${
                        !addForm.name ||
                        !addForm.price ||
                        !addForm.stock ||
                        !addForm.minStock
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsPage;
