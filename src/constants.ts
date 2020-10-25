import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 11111,
  NILE = 201910292,
  SHASTA = 1
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// TODO(tron): nile address is 0x41DA32Ec09Fb54aB5f5742F1eB730003caaC0BbF
export const FACTORY_ADDRESS = '0x040A3d84309784628290b9f3437874868beE30Af'

export const INIT_CODE_HASH = '0x278d8201610c32bb650c43e9c27bb9124680c6c6b82d65d58a4117c055f01573'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}

// @TRON only
export const FACTORY_ADDRESSES = {
  [ChainId.NILE]: '0x41da32ec09fb54ab5f5742f1eb730003caac0bbf',
  [ChainId.MAINNET]: '0x040A3d84309784628290b9f3437874868beE30Af',
  [ChainId.SHASTA]: '0xtodo'
}

// TODO: build that data structure from a simple array of (tokenA, tokenB, pairAddress) to avoid human error when adding pairs...

interface PairAddresses {
  [token0Address: string]: { [token1Address: string]: string }
}

// @TRON
function buildPairAddresses(list: [string, string, string][]): PairAddresses {
  const res: PairAddresses = {}
  list.forEach(([tokenA, tokenB, pairAddress]) => {
    // deterministically sort addresses (prevents duplicates, e.g. (a, b) vs (b ,a))
    const [token0_, token1_] = tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA]
    const token0 = token0_.toLowerCase()
    const token1 = token1_.toLowerCase()
    res[token0] = res[token0] || {}
    if (res[token0][token1]) {
      throw new Error(`duplicated pair ${tokenA}, ${tokenB}, ${pairAddress}`)
    }
    res[token0][token1] = pairAddress
  })
  return res
}

// format: token1, token2, pairAddress
export const PAIR_ADDRESSES: { [chainId: string]: PairAddresses } = {
  [ChainId.NILE]: buildPairAddresses([
    [
      // DTKN/WTRX
      '0x42c142500ff7068f326c01a8f1b3cd8ea7d9377f',
      '0x8f44113a985076431b77f6078f0929f949cb8836',
      '0x02a6a10E4C7750a7F8dC159b95936B574c211f0D'
    ]
  ]),
  [ChainId.MAINNET]: buildPairAddresses([
    [
      // USDT/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C', // USDT
      '0xC4488fa262236619425E19f6bA4A8639b8cA1973' // Pair
    ],
    [
      // sTRX/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0xA099cc498284ed6e25F3C99e6d55074e6ba42911', // sTRX
      // Pair address, as queried from
      // https://tronscan.org/#/contract/TFetSGMphMDu8MLwVPMd5s1QYYTLrTmPs8/code
      // getPair(41891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18, 41A099cc498284ed6e25F3C99e6d55074e6ba42911)
      '0x6C872684e348EC3a5418Fb1E952556110550c924'
    ],
    [
      // OKS/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0xE11cDc164a9D8C1aE19D95B0165278690D39d84B', // OKS
      '0x3308A4E8EbD10e88321abF91B92A026ca78F47A1' // Pair
    ],
    [
      // sUSD/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0xda2853b2bede0e3018f56d47624a413b2abe0831', // sUSD
      '0x8D6d7d0bf06A5b92BF07516385dd3ea516227323' // Pair
    ],
    [
      // sETH/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0xA1402557c4C7a50f958e15c0527A60bF6666C77e', // sETH
      '0x33251ab1103EdFc7Dd5CDa63C10334e2920e80aa' // Pair
    ],
    [
      // CNS/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0x7C503A569a8E62210bdCe6b3e733272e154d08ab', // CNS
      '0x61C9b7B424D7bDC181D5A6b2237b618c806d3a4E' // Pair
    ],
    [
      // MIMA/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0x400E3A5eAedd27B4D9193de2Bf442E1D072D5A5c', // MIMA
      '0xd5AD3E87478FF81569Fab51fcaB663D224E00A89' // Pair
    ],
    [
      // USDJ/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0x834295921A488D9d42b4b3021ED1a3C39fB0f03e', // USDJ
      '0x43965424c16fF65c2d85ffe6514C1585890b99Aa' // pair
    ],
    [
      // DCD/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0x8cE2B3fc3e8AD8fad36973A386547Fb8A97326E0', // DCD
      '0x8aCbf441A1735f894e23C3Dd14dA1299db0728AB' // Pair
    ],
    [
      // BNKR/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0x8CaEea9c7EBb8840eE4B49d10542B99Cec6fFbc6', // BNKR
      '0xf196517a21085cA1847e66666829f69fc2Bea383' // Pair
    ],
    [
      // JST/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x18FD0626DAF3Af02389AEf3ED87dB9C33F638ffa',
      '0x9d0E43bb37d013FAc1fD37d6A293406955ebecF9'
    ],
    [
      // TEWKEN/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x130E4C9746E2F7b0A9D1F5eAB71AA13896037Ae8',
      '0xa9545CFe49F917EA73aFB1396Bb2d813979679BD'
    ],
    [
      // USDT/OKS
      '0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C', // USDT
      '0xE11cDc164a9D8C1aE19D95B0165278690D39d84B', // OKS
      '0xE5CB7A7E08Da38E5bC76fd5D97B3aa47AD8f7b99' // Pair
    ]
  ]),
  [ChainId.SHASTA]: {}
}
