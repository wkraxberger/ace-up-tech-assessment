products = [
  { name: "Wireless Mouse", sku: "WM-001", price: 29.99 },
  { name: "Mechanical Keyboard", sku: "MK-002", price: 89.99 },
  { name: "USB-C Hub", sku: "UH-003", price: 49.99 },
  { name: "Monitor Stand", sku: "MS-004", price: 39.99 },
  { name: "Webcam HD", sku: "WC-005", price: 59.99 }
]

products.each do |attrs|
  Product.find_or_create_by!(sku: attrs[:sku]) do |p|
    p.name = attrs[:name]
    p.price = attrs[:price]
  end
end
