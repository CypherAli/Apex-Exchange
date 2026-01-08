-- Create simple orders table for matching engine
CREATE TABLE IF NOT EXISTS engine_orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    side VARCHAR(10) NOT NULL CHECK (side IN ('Bid', 'Ask')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create simple trades table for matching engine
CREATE TABLE IF NOT EXISTS engine_trades (
    id BIGSERIAL PRIMARY KEY,
    maker_order_id BIGINT NOT NULL,
    taker_order_id BIGINT NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_engine_orders_user_id ON engine_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_engine_orders_symbol ON engine_orders(symbol);
CREATE INDEX IF NOT EXISTS idx_engine_orders_status ON engine_orders(status);
CREATE INDEX IF NOT EXISTS idx_engine_trades_maker_order_id ON engine_trades(maker_order_id);
CREATE INDEX IF NOT EXISTS idx_engine_trades_taker_order_id ON engine_trades(taker_order_id);
