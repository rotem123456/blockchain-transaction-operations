A TypeScript utility library for interacting with EVM-compatible blockchains, focused on **transaction management, reliability, and observability**.

This tool simplifies common transaction workflows such as nonce handling, rebroadcasting stuck transactions, and fetching transactions individually or in batches. It is designed for backend services, relayers, wallets, and automation scripts that require robust interaction with EVM networks.

---

## 🚀 Features

- 🔢 **Get account nonce**
- 🔁 **Rebroadcast pending or dropped transactions**
- 📄 **Fetch a single transaction**
- 📦 **Batch-fetch transactions**
- 🌐 Works with **any EVM/TRON/XRP/TON compatible blockchain**
- 🧱 Written in **TypeScript**
- ⚡ Optimized for backend and infra use cases
- 🔌 RPC-provider agnostic

---

## 📦 Installation

```bash
npm install

For broadcasting a TON transaction please create a TON api key from  https://docs.ton.org/ecosystem/api/toncenter/get-api-key
and then create a .env file with TON_API_KEY = <YOUR TON API KEY>
