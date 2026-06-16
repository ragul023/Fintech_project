-- Banks registered with NPCI
CREATE TABLE IF NOT EXISTS bank_mapping (
    bank_code SERIAL PRIMARY KEY,
    bank_name VARCHAR(100) NOT NULL,
    callback_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VPA Mapping maintained by NPCI
CREATE TABLE IF NOT EXISTS vpa_mapping (
    vpa_id SERIAL PRIMARY KEY,
    vpa VARCHAR(100) UNIQUE NOT NULL,
    bank_code INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bank
    FOREIGN KEY (bank_code)
    REFERENCES bank_mapping(bank_code)
    ON DELETE CASCADE
);

-- Transaction Log
CREATE TABLE IF NOT EXISTS transaction_log (
    transaction_id VARCHAR(50) PRIMARY KEY,
    payer_vpa VARCHAR(100) NOT NULL,
    payee_vpa VARCHAR(100) NOT NULL,
    payer_bank_code INT NOT NULL,
    payee_bank_code INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    remarks VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payer_bank
    FOREIGN KEY (payer_bank_code)
    REFERENCES bank_mapping(bank_code),

    CONSTRAINT fk_payee_bank
    FOREIGN KEY (payee_bank_code)
    REFERENCES bank_mapping(bank_code)
);