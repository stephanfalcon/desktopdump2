from solcx import compile_standard
import json
from web3 import Web3
import os
from dotenv import load_dotenv
# , install_solc

# function for loading environment variable that contain private key
load_dotenv()

with open("./SimpleStorage.sol","r") as file:
  simple_storage_file = file.read()
# install_solc("0.6.0")
compiled_sol = compile_standard(
  {
    "language" : "Solidity",
    "sources":{"SimpleStorage.sol":{"content": simple_storage_file}},
    "settings": {
      "outputSelection":{
          "*":{"*":["abi","metadata","evm.bytecode","evm.sourceMap"]}
      }
    },
  },
  solc_version="0.6.0",
)

with open("compiled_code.json","w") as file:
  json.dump(compiled_sol,file)

# get bytecode

bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"]["bytecode"]["object"]

# get abi

abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:8545"))
chain_id = 1337
my_address="0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
private_key=os.getenv("private_key")

SimpleStorage = w3.eth.contract(abi=abi,bytecode=bytecode)

nonce = w3.eth.getTransactionCount(my_address)

transaction = SimpleStorage.constructor().buildTransaction({"chainId":chain_id,"from":my_address,"nonce":nonce})

signed_txn = w3.eth.account.sign_transaction(transaction,private_key=private_key)

tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

# call simulates makeing the call and gettting a return value
# transact actually make state change

store_transaction = simple_storage.functions.store(15).buildTransaction({
  "chainId": chain_id, "from":my_address, "nonce":nonce+1
})

signed_stored_txn = w3.eth.account.sign_transaction(store_transaction,private_key=private_key)

send_store_tx = w3.eth.send_raw_transaction(signed_stored_txn.rawTransaction)

tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

print(simple_storage.functions.retrieve().call())
print(simple_storage.functions.store(15).call())