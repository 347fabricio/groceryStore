CREATE DATABASE testdatabase;

CREATE TABLE customer (
  customer_name VARCHAR(100),
  phone_number BIGINT
);

-- -----------------------------------------------------

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(31),
  description VARCHAR(127)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(63) NOT NULL,
  price NUMERIC(4,2) NOT NULL,
  unit VARCHAR(31)  NOT NULL,
  quantity int NOT NULL,
  purchaseData date NOT NULL,
  madeBy VARCHAR(31) NOT NULL,
  madeOn date NOT NULL,
  expiresOn date NOT NULL,
  categoryID int REFERENCES category (id) 
);

INSERT INTO products (name, price, unit, quantity, purchaseData, madeBy, madeOn, expiresOn, description) VALUES ('Açúcar', 6.79, 'KG', 9, '2024-07-05', 'União', '2024-02-28', '2025-02-28', 'Açúcar demarara');

