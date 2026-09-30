import { OrderDAO } from "./OrderDAO";
import { ProductDAO } from "./ProductDAO";

const productDAO = new ProductDAO();

productDAO.addProduct("Laptop", 1000, 10);
productDAO.addProduct("Mouse", 25, 50);
productDAO.addProduct("Keyboard", 75, 25);

const products = productDAO.findAll();
products.forEach(product => {
    console.log(product.getInfo());
});

console.log("=====================================");

const product = productDAO.findProductById(2);
console.log(product?.getInfo());

console.log("=====================================");

if(product){
    const orderDAO = new OrderDAO();
    orderDAO.createOrder(product.getId(), 5);
}

