# Fintech Project Documentation  
**Date Started:** April 2026  

---

# Phase - I

## Objectives

- To create a bank server.
- To create a model (semi-working) of NPCI switch.
- Transaction between one account to another.
- Enclosing multiple bank transactions.

> **Main thing:**  
> Do not exaggerate things at early stage.  
> The project has to show the MVP first.  
> We can scale it later.  
> That is the real architecture approach.

---

# Project Overview

## Fintech Project

### Users

- Users have UPI IDs.
- UPI IDs are linked to bank accounts.
- One user can have multiple bank accounts.
- One UPI ID is mapped to one account.

---

# Initial Entity Design

## UPI ID

- id
- bank_id
- account_number

---

## Bank Account

- bank_id
- user_id
- balance

---

# Project Design

## Frontend

Application like:
- GPay
- PhonePe

Which uses:
- UPI ID

---

## Bank Servers

- Separate bank servers run on separate ports.
- Each bank has activities like:
  - balance management
  - UPI mapping

---

## NPCI Switch

Used to:
- address the bank
- route the transactions

---

# Database Design

## Account Types

- Savings account
- Current account

---

# Accounts Table

Fields:
- acc_num
- user_id
- acc_type

---

## Initial SQL Design

```sql
CREATE TABLE Account (
    account_number INT PRIMARY KEY,
    user_id INT,
    acc_type
);
```

---

# Project Contains

## A Semi-Real Bank System

The system includes:
- real banking techniques
- account types
- withdrawal limits
- daily limits
- transaction history

---

# Real Working Route of NPCI Switch

## Real Working of UPI

Real-time UPI system contains NPCI switch.

The switch:
- routes the UPI transactions

Implementation goal:
- implement NPCI router model

---

# User Table Design

## Requirements

An user must need:
- name
- email
- phone number

---

## Minimal Variable Product Design

```sql
CREATE TABLE users (
    id INTEGER SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(10) NOT NULL
);
```

---

## Minimal Design Note

This is the minimal design for the user table.

---

# Accounts Table Design

## Minimum Design of Accounts

A minimum account needs:
- balance
- account number
- UPI pin

---

## SQL Design

```sql
CREATE TABLE accounts (
    acc_id SERIAL PRIMARY KEY,
    user_id INTEGER FOREIGN KEY,
    account_number VARCHAR(14),
    balance NUMERIC(12,2),
    upi_pin NUMERIC(6)
);
```

---

## Important Note

UPI pin is referred here because:
- one UPI pin is associated with one account

---

# Transactions Table

## Transaction Requirements

While recording transactions:

For MVP:
- record payment price involved
- record transaction details

---

## SQL Design

```sql
CREATE TABLE transactions (
    tran_id SERIAL,
    sender_acc_no VARCHAR(14),
    receiver_upi VARCHAR(30),
    amount DECIMAL(12,2),
    status VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Real-Time Flow Architecture

## Main Components (Primary Flow)

### 1. User Agent App

The user agent app:
- controls user interactions
- handles UPI entries
- handles amount entries
- manages all user interactions

---

### 2. NPCI Server

The NPCI server:
- maintains UPI mappings
- routes transactions securely
- gives final request routing
- sends initial request from user agent

Acts as:
- switch for transaction routing

---

### 3. Bank Servers

Bank servers are:
- core servers
- responsible for all money-related requests

Responsibilities:
- handle user requests
- debit
- credit
- validate requests from users

---

# UPI Transaction Flow

1. User app sends UPI request  
2. NPCI server checks sender balance  
3. Balance check success  
4. Receiver verification success  
5. Receiver can receive  
6. Money transferred from sender to receiver  
7. Response sent back to user  

---

# Performance Note

> Fun fact:  
> All the process occurs within seconds.

---

# Initial Setup of the Project  
**Date:** 24/05/2026

## Progress Done

1. Created bank database (MVP style).
2. Created bank server using MVC structure.
3. Written very basic get-user code.

---

## Overall Status

Initialized the bank server of the project.

Next:
- Need to repeat this setup for multiple banks.
