mod models;
mod orderbook;
mod engine; // Nhớ khai báo module mới

#[cfg(test)]
mod tests;

use models::{Command, Order, Side};
use engine::MatchingEngine;
use rust_decimal_macros::dec; // Macro để viết số thập phân nhanh

fn main() {
    println!("🚀 Starting Matching Engine v1.0...");
    
    let mut engine = MatchingEngine::new();

    // Giả lập một chuỗi các lệnh gửi đến Engine (thay vì nhập tay)
    let commands = vec![
        // 1. Đặt lệnh Bán BTC (Tạo thanh khoản)
        Command::Place(Order::new(1, 101, dec!(50000), dec!(1.0), Side::Ask)),
        
        // 2. Đặt lệnh Mua BTC (Khớp ngay)
        Command::Place(Order::new(2, 102, dec!(50000), dec!(0.5), Side::Bid)),
        
        // 3. Hủy lệnh (Thử hủy lệnh ID 1 đã bị khớp 1 phần)
        Command::Cancel(1),
    ];

    // Vòng lặp xử lý (Event Loop)
    for cmd in commands {
        println!("\n📥 Input Command: {:?}", cmd);
        
        let events = engine.process_command(cmd);
        
        for event in events {
            println!("   📤 Output Event: {:?}", event);
        }
    }
}
