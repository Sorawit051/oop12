import { Product } from "./Product";
import { BaseDAO } from "./BaseDAO";
import { Order } from "./Order";
import { ProductDAO } from "./ProductDAO";

export class OrderDAO extends BaseDAO {
    protected iniTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY
                AUTOINCREMENT ,
                product_name TEXT NOT NULL UNIQUE,
                quantity INTEGER NOT NULL,
                total_price REAL NOT NULL
            )
        `);
    }

public createOrder(productId: number, quantity: number): boolean {
    const productDAO = new ProductDAO();
    const prod = productDAO.findProductById(productId);

    if (!prod) {
        console.log("ไม่พบรายการสินค้านี้");
        return false;
    }

    if (prod.getStock() >= quantity) {
        const newstock = prod.getStock() - quantity;
        const totalPrice = prod.getPrice() * quantity;
        
        const stmt = this.db.prepare('INSERT INTO orders (product_name, quantity, total_price) VALUES (?, ?, ?)');
        const result = stmt.run(prod.getName(), quantity, totalPrice);

        if (result.changes > 0) {
            productDAO.updateStock(prod.getId(), newstock);
            console.log("สร้างคำสั่งซื้อสำเร็จ");
            return true;
        }
    } else {
        console.log("สินค้าไม่เพียงพอ");
        return false;
    }

    return false; 
}
}