export const domycategories = [
  { id: 1, category_name: 'Electronics' },
  { id: 2, category_name: 'Fashion' },
  { id: 3, category_name: 'Home & Kitchen' },
  { id: 4, category_name: 'Toys' },
  { id: 5, category_name: 'Beauty' },
  { id: 6, category_name: 'Sports' },
  { id: 7, category_name: 'Automotive' },
  { id: 8, category_name: 'Books' },
  { id: 9, category_name: 'Health' },
  { id: 10, category_name: 'Groceries' },
];

export const domysubCategories = [
  // Subcategories for Electronics
  { id: 1, category: 1, sub_category_name: 'Mobile Phones' },
  { id: 2, category: 1, sub_category_name: 'Laptops' },
  { id: 3, category: 1, sub_category_name: 'Tablets' },
  { id: 4, category: 1, sub_category_name: 'Headphones' },

  // Subcategories for Fashion
  { id: 5, category: 2, sub_category_name: 'Men\'s Clothing' },
  { id: 6, category: 2, sub_category_name: 'Women\'s Clothing' },
  { id: 7, category: 2, sub_category_name: 'Shoes' },
  { id: 8, category: 2, sub_category_name: 'Accessories' },

  // Subcategories for Home & Kitchen
  { id: 9, category: 3, sub_category_name: 'Furniture' },
  { id: 10, category: 3, sub_category_name: 'Appliances' },
  { id: 11, category: 3, sub_category_name: 'Bedding' },
  { id: 12, category: 3, sub_category_name: 'Kitchenware' },

  // Subcategories for Toys
  { id: 13, category: 4, sub_category_name: 'Action Figures' },
  { id: 14, category: 4, sub_category_name: 'Educational Toys' },
  { id: 15, category: 4, sub_category_name: 'Building Blocks' },
  { id: 16, category: 4, sub_category_name: 'Outdoor Toys' },

  // Subcategories for Beauty
  { id: 17, category: 5, sub_category_name: 'Makeup' },
  { id: 18, category: 5, sub_category_name: 'Haircare' },
  { id: 19, category: 5, sub_category_name: 'Skincare' },
  { id: 20, category: 5, sub_category_name: 'Fragrances' },

  // Subcategories for Sports
  { id: 21, category: 6, sub_category_name: 'Gym Equipment' },
  { id: 22, category: 6, sub_category_name: 'Outdoor Sports' },
  { id: 23, category: 6, sub_category_name: 'Sports Apparel' },
  { id: 24, category: 6, sub_category_name: 'Fitness Trackers' },

  // Subcategories for Automotive
  { id: 25, category: 7, sub_category_name: 'Car Accessories' },
  { id: 26, category: 7, sub_category_name: 'Motorcycle Accessories' },
  { id: 27, category: 7, sub_category_name: 'Car Electronics' },
  { id: 28, category: 7, sub_category_name: 'Tools & Equipment' },

  // Subcategories for Books
  { id: 29, category: 8, sub_category_name: 'Fiction' },
  { id: 30, category: 8, sub_category_name: 'Non-Fiction' },
  { id: 31, category: 8, sub_category_name: 'Children\'s Books' },
  { id: 32, category: 8, sub_category_name: 'Educational' },

  // Subcategories for Health
  { id: 33, category: 9, sub_category_name: 'Supplements' },
  { id: 34, category: 9, sub_category_name: 'Personal Care' },
  { id: 35, category: 9, sub_category_name: 'Medical Devices' },
  { id: 36, category: 9, sub_category_name: 'Vitamins' },

  // Subcategories for Groceries
  { id: 37, category: 10, sub_category_name: 'Fruits & Vegetables' },
  { id: 38, category: 10, sub_category_name: 'Dairy Products' },
  { id: 39, category: 10, sub_category_name: 'Snacks' },
  { id: 40, category: 10, sub_category_name: 'Beverages' },
];

  
// Dummy Data for Products (2 products for each of 40 subcategories, totaling 80 products)
export const domyproducts = [
  // Electronics > Mobile Phones
  { id: 1, category_id: 1, subcategory_id: 1, product_name: 'Samsung Galaxy S21', product_image1: 'https://example.com/product/samsung-s21.jpg', price: 799.99, discount: 10, description: 'Latest model with high-end features.', rating: 4.5 },
  { id: 2, category_id: 1, subcategory_id: 1, product_name: 'iPhone 13', product_image1: 'https://example.com/product/iphone-13.jpg', price: 999.99, discount: 15, description: 'Apple\'s flagship smartphone.', rating: 4.8 },

  // Electronics > Laptops
  { id: 3, category_id: 1, subcategory_id: 2, product_name: 'MacBook Pro 16-inch', product_image1: 'https://example.com/product/macbook-pro.jpg', price: 2399.99, discount: 5, description: 'High-performance laptop for professionals.', rating: 4.9 },
  { id: 4, category_id: 1, subcategory_id: 2, product_name: 'Dell XPS 13', product_image1: 'https://example.com/product/dell-xps.jpg', price: 1599.99, discount: 7, description: 'Ultrabook with excellent display and performance.', rating: 4.7 },

  // Electronics > Tablets
  { id: 5, category_id: 1, subcategory_id: 3, product_name: 'Apple iPad Pro', product_image1: 'https://example.com/product/ipad-pro.jpg', price: 1099.99, discount: 12, description: 'The best tablet for performance and creativity.', rating: 4.8 },
  { id: 6, category_id: 1, subcategory_id: 3, product_name: 'Samsung Galaxy Tab S7', product_image1: 'https://example.com/product/galaxy-tab-s7.jpg', price: 649.99, discount: 10, description: 'Great performance with a stunning display.', rating: 4.6 },

  // Electronics > Wearables
  { id: 7, category_id: 1, subcategory_id: 4, product_name: 'Apple Watch Series 7', product_image1: 'https://example.com/product/apple-watch-7.jpg', price: 399.99, discount: 8, description: 'Smartwatch with a sleek design and powerful features.', rating: 4.7 },
  { id: 8, category_id: 1, subcategory_id: 4, product_name: 'Samsung Galaxy Watch 4', product_image1: 'https://example.com/product/galaxy-watch-4.jpg', price: 249.99, discount: 10, description: 'Wearable with advanced health tracking features.', rating: 4.5 },

  // Fashion > Men's Clothing
  { id: 9, category_id: 2, subcategory_id: 5, product_name: 'Men\'s Leather Jacket', product_image1: 'https://example.com/product/leather-jacket.jpg', price: 149.99, discount: 20, description: 'Stylish leather jacket for men.', rating: 4.2 },
  { id: 10, category_id: 2, subcategory_id: 5, product_name: 'Men\'s Casual Shirt', product_image1: 'https://example.com/product/casual-shirt.jpg', price: 39.99, discount: 10, description: 'Comfortable and trendy shirt for men.', rating: 4.3 },

  // Fashion > Women's Clothing
  { id: 11, category_id: 2, subcategory_id: 6, product_name: 'Women\'s Summer Dress', product_image1: 'https://example.com/product/summer-dress.jpg', price: 79.99, discount: 15, description: 'Elegant and breezy summer dress.', rating: 4.5 },
  { id: 12, category_id: 2, subcategory_id: 6, product_name: 'Women\'s Winter Coat', product_image1: 'https://example.com/product/winter-coat.jpg', price: 129.99, discount: 25, description: 'Warm and stylish coat for the winter season.', rating: 4.6 },

  // Fashion > Shoes
  { id: 13, category_id: 2, subcategory_id: 7, product_name: 'Nike Air Max 270', product_image1: 'https://example.com/product/nike-air-max-270.jpg', price: 129.99, discount: 10, description: 'Stylish and comfortable sneakers for daily wear.', rating: 4.7 },
  { id: 14, category_id: 2, subcategory_id: 7, product_name: 'Adidas Ultraboost', product_image1: 'https://example.com/product/adidas-ultraboost.jpg', price: 159.99, discount: 12, description: 'High-performance running shoes for athletes.', rating: 4.8 },

  // Fashion > Accessories
  { id: 15, category_id: 2, subcategory_id: 8, product_name: 'Ray-Ban Aviator Sunglasses', product_image1: 'https://example.com/product/rayban-aviator.jpg', price: 139.99, discount: 5, description: 'Classic aviator sunglasses for a timeless look.', rating: 4.6 },
  { id: 16, category_id: 2, subcategory_id: 8, product_name: 'Fossil Leather Wallet', product_image1: 'https://example.com/product/fossil-wallet.jpg', price: 49.99, discount: 10, description: 'Premium leather wallet for men.', rating: 4.5 },

  // Home & Kitchen > Furniture
  { id: 17, category_id: 3, subcategory_id: 9, product_name: 'Wooden Coffee Table', product_image1: 'https://example.com/product/coffee-table.jpg', price: 299.99, discount: 10, description: 'Elegant wooden coffee table with modern design.', rating: 4.4 },
  { id: 18, category_id: 3, subcategory_id: 9, product_name: 'Leather Sofa', product_image1: 'https://example.com/product/leather-sofa.jpg', price: 899.99, discount: 15, description: 'Comfortable leather sofa for living room.', rating: 4.7 },

  // Home & Kitchen > Kitchen Appliances
  { id: 19, category_id: 3, subcategory_id: 10, product_name: 'Nespresso Coffee Machine', product_image1: 'https://example.com/product/nespresso.jpg', price: 249.99, discount: 15, description: 'Coffee machine with barista-quality results.', rating: 4.6 },
  { id: 20, category_id: 3, subcategory_id: 10, product_name: 'Dyson V11 Vacuum Cleaner', product_image1: 'https://example.com/product/dyson-v11.jpg', price: 599.99, discount: 10, description: 'Powerful cordless vacuum cleaner with strong suction.', rating: 4.8 },

  // Home & Kitchen > Lighting
  { id: 21, category_id: 3, subcategory_id: 11, product_name: 'Philips Hue Smart Bulbs', product_image1: 'https://example.com/product/hue-bulb.jpg', price: 59.99, discount: 10, description: 'Smart LED bulbs with customizable colors.', rating: 4.7 },
  { id: 22, category_id: 3, subcategory_id: 11, product_name: 'Ikea Floor Lamp', product_image1: 'https://example.com/product/ikea-lamp.jpg', price: 79.99, discount: 15, description: 'Minimalistic design with adjustable height.', rating: 4.5 },

  // Toys > Action Figures
  { id: 23, category_id: 4, subcategory_id: 13, product_name: 'Iron Man Action Figure', product_image1: 'https://example.com/product/iron-man-figure.jpg', price: 19.99, discount: 5, description: 'Detailed Iron Man action figure with multiple accessories.', rating: 4.4 },
  { id: 24, category_id: 4, subcategory_id: 13, product_name: 'Spider-Man Action Figure', product_image1: 'https://example.com/product/spider-man-figure.jpg', price: 17.99, discount: 10, description: 'High-quality Spider-Man figure with movable parts.', rating: 4.6 },

  // Toys > Educational Toys
  { id: 25, category_id: 4, subcategory_id: 14, product_name: 'Building Blocks Set', product_image1: 'https://example.com/product/building-blocks.jpg', price: 29.99, discount: 20, description: 'Creative building block set for kids.', rating: 4.8 },
  { id: 26, category_id: 4, subcategory_id: 14, product_name: 'Math Learning Toy', product_image1: 'https://example.com/product/math-toy.jpg', price: 15.99, discount: 10, description: 'Interactive toy to help kids learn math.', rating: 4.7 },

  // Beauty > Makeup
  { id: 27, category_id: 5, subcategory_id: 17, product_name: 'Matte Lipstick', product_image1: 'https://example.com/product/matte-lipstick.jpg', price: 19.99, discount: 5, description: 'Long-lasting matte lipstick in various shades.', rating: 4.6 },
  { id: 28, category_id: 5, subcategory_id: 17, product_name: 'Highlighter Palette', product_image1: 'https://example.com/product/highlighter-palette.jpg', price: 29.99, discount: 10, description: 'Shimmering highlighter palette for glowing skin.', rating: 4.8 },

  // Beauty > Haircare
  { id: 29, category_id: 5, subcategory_id: 18, product_name: 'Shampoo and Conditioner Set', product_image1: 'https://example.com/product/shampoo-conditioner.jpg', price: 25.99, discount: 15, description: 'Gentle shampoo and conditioner for all hair types.', rating: 4.5 },
  { id: 30, category_id: 5, subcategory_id: 18, product_name: 'Hair Styling Gel', product_image1: 'https://example.com/product/hair-styling-gel.jpg', price: 15.99, discount: 10, description: 'Strong hold hair styling gel for a perfect look.', rating: 4.4 },

  // Sports > Gym Equipment
  { id: 31, category_id: 6, subcategory_id: 21, product_name: 'Adjustable Dumbbells', product_image1: 'https://example.com/product/dumbbells.jpg', price: 99.99, discount: 15, description: 'Adjustable dumbbells set for home workouts.', rating: 4.7 },
  { id: 32, category_id: 6, subcategory_id: 21, product_name: 'Yoga Mat', product_image1: 'https://example.com/product/yoga-mat.jpg', price: 19.99, discount: 5, description: 'Non-slip yoga mat for a comfortable workout.', rating: 4.6 },

  // Sports > Outdoor Sports
  { id: 33, category_id: 6, subcategory_id: 22, product_name: 'Camping Tent', product_image1: 'https://example.com/product/camping-tent.jpg', price: 149.99, discount: 20, description: 'Durable tent for outdoor adventures.', rating: 4.8 },
  { id: 34, category_id: 6, subcategory_id: 22, product_name: 'Hiking Boots', product_image1: 'https://example.com/product/hiking-boots.jpg', price: 89.99, discount: 15, description: 'Comfortable and durable boots for hiking.', rating: 4.7 },

  // Automotive > Car Accessories
  { id: 35, category_id: 7, subcategory_id: 25, product_name: 'Car Phone Mount', product_image1: 'https://example.com/product/car-phone-mount.jpg', price: 19.99, discount: 10, description: 'Adjustable car phone mount for hands-free driving.', rating: 4.5 },
  { id: 36, category_id: 7, subcategory_id: 25, product_name: 'Car Seat Cover', product_image1: 'https://example.com/product/car-seat-cover.jpg', price: 49.99, discount: 20, description: 'Waterproof car seat cover for protection.', rating: 4.6 },

  // Automotive > Car Maintenance
  { id: 37, category_id: 7, subcategory_id: 26, product_name: 'Car Tire Inflator', product_image1: 'https://example.com/product/car-tire-inflator.jpg', price: 59.99, discount: 5, description: 'Portable tire inflator for emergency use.', rating: 4.6 },
  { id: 38, category_id: 7, subcategory_id: 26, product_name: 'Car Battery Charger', product_image1: 'https://example.com/product/car-battery-charger.jpg', price: 89.99, discount: 10, description: 'Portable charger for car batteries.', rating: 4.7 },

  // Grocery > Beverages
  { id: 39, category_id: 8, subcategory_id: 27, product_name: 'Green Tea', product_image1: 'https://example.com/product/green-tea.jpg', price: 9.99, discount: 5, description: 'Premium quality green tea for relaxation.', rating: 4.5 },
  { id: 40, category_id: 8, subcategory_id: 27, product_name: 'Coffee Beans', product_image1: 'https://example.com/product/coffee-beans.jpg', price: 14.99, discount: 10, description: 'Freshly roasted coffee beans for coffee lovers.', rating: 4.7 },

  // Grocery > Snacks
  { id: 41, category_id: 8, subcategory_id: 28, product_name: 'Chocolate Chips', product_image1: 'https://example.com/product/chocolate-chips.jpg', price: 4.99, discount: 15, description: 'Sweet and delicious chocolate chips.', rating: 4.6 },
  { id: 42, category_id: 8, subcategory_id: 28, product_name: 'Granola Bars', product_image1: 'https://example.com/product/granola-bars.jpg', price: 5.99, discount: 10, description: 'Healthy and tasty granola bars.', rating: 4.4 }
];


// Dummy Data for Flash Sale Products (20 products)
export const flashSales = [
  { id: 1, product_id: 1, discount_percentage: 20, start_time: '2025-02-15T10:00:00', end_time: '2025-02-15T14:00:00', quantity_in_stock: 100 },
  { id: 2, product_id: 2, discount_percentage: 15, start_time: '2025-02-15T10:00:00', end_time: '2025-02-15T14:00:00', quantity_in_stock: 50 },
  { id: 3, product_id: 3, discount_percentage: 25, start_time: '2025-02-16T11:00:00', end_time: '2025-02-16T15:00:00', quantity_in_stock: 30 },
  { id: 4, product_id: 4, discount_percentage: 18, start_time: '2025-02-16T11:00:00', end_time: '2025-02-16T15:00:00', quantity_in_stock: 60 },
  { id: 5, product_id: 5, discount_percentage: 30, start_time: '2025-02-17T12:00:00', end_time: '2025-02-17T16:00:00', quantity_in_stock: 120 },
  { id: 6, product_id: 6, discount_percentage: 10, start_time: '2025-02-17T12:00:00', end_time: '2025-02-17T16:00:00', quantity_in_stock: 80 },
  { id: 7, product_id: 7, discount_percentage: 15, start_time: '2025-02-18T13:00:00', end_time: '2025-02-18T17:00:00', quantity_in_stock: 40 },
  { id: 8, product_id: 8, discount_percentage: 12, start_time: '2025-02-18T13:00:00', end_time: '2025-02-18T17:00:00', quantity_in_stock: 70 },
  { id: 9, product_id: 9, discount_percentage: 20, start_time: '2025-02-19T14:00:00', end_time: '2025-02-19T18:00:00', quantity_in_stock: 50 },
  { id: 10, product_id: 10, discount_percentage: 15, start_time: '2025-02-19T14:00:00', end_time: '2025-02-19T18:00:00', quantity_in_stock: 60 },
  { id: 11, product_id: 11, discount_percentage: 25, start_time: '2025-02-20T15:00:00', end_time: '2025-02-20T19:00:00', quantity_in_stock: 30 },
  { id: 12, product_id: 12, discount_percentage: 30, start_time: '2025-02-20T15:00:00', end_time: '2025-02-20T19:00:00', quantity_in_stock: 90 },
  { id: 13, product_id: 13, discount_percentage: 18, start_time: '2025-02-21T16:00:00', end_time: '2025-02-21T20:00:00', quantity_in_stock: 40 },
  { id: 14, product_id: 14, discount_percentage: 22, start_time: '2025-02-21T16:00:00', end_time: '2025-02-21T20:00:00', quantity_in_stock: 60 },
  { id: 15, product_id: 15, discount_percentage: 15, start_time: '2025-02-22T17:00:00', end_time: '2025-02-22T21:00:00', quantity_in_stock: 80 },
  { id: 16, product_id: 16, discount_percentage: 10, start_time: '2025-02-22T17:00:00', end_time: '2025-02-22T21:00:00', quantity_in_stock: 40 },
  { id: 17, product_id: 17, discount_percentage: 30, start_time: '2025-02-23T18:00:00', end_time: '2025-02-23T22:00:00', quantity_in_stock: 100 },
  { id: 18, product_id: 18, discount_percentage: 18, start_time: '2025-02-23T18:00:00', end_time: '2025-02-23T22:00:00', quantity_in_stock: 50 },
  { id: 19, product_id: 19, discount_percentage: 20, start_time: '2025-02-24T19:00:00', end_time: '2025-02-24T23:00:00', quantity_in_stock: 70 },
  { id: 20, product_id: 20, discount_percentage: 25, start_time: '2025-02-24T19:00:00', end_time: '2025-02-24T23:00:00', quantity_in_stock: 90 }
];

  
  