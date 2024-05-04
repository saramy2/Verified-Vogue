// export const BACKEND_URL = 'https://fyb-backend.vercel.app'
export const BACKEND_URL = 'http://localhost:4000'

export const CONTRACT_ADDRESS = '0xa45beA20AFDA5C9af9888503bfadbE1394e117Fc'
export const CONTRACT_ABI = [{"inputs":[{"internalType":"uint256","name":"productId","type":"uint256"}],"name":"isFakeProduct","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"productList","outputs":[{"internalType":"uint256","name":"product_id","type":"uint256"},{"internalType":"string","name":"product_name","type":"string"},{"internalType":"uint256","name":"product_price","type":"uint256"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"bool","name":"isFake","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"productId","type":"uint256"}],"name":"reportFakeProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"productId","type":"uint256"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"change OwnerShip","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"uploadProduct","outputs":[],"stateMutability":"nonpayable","type":"function"}]