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
// mainnet address is 0x98fED14512ec379eB5a545e1aE1DbDa17476439A
export const FACTORY_ADDRESS = '0x98fED14512ec379eB5a545e1aE1DbDa17476439A'

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
  [ChainId.MAINNET]: '0x98fED14512ec379eB5a545e1aE1DbDa17476439A',
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
      // OKS/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0xE11cDc164a9D8C1aE19D95B0165278690D39d84B',
      '0xd458a1f548f578d4da9f887504d7d478f05b6371'
    ],
    [
      // SETH/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0xA1402557c4C7a50f958e15c0527A60bF6666C77e',
      '0xba430ca6d3889838165f021b14141c52f7482a5a'
    ],
    [
      // STRX/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0xA099cc498284ed6e25F3C99e6d55074e6ba42911',
      '0x6ce89df5918e5bc9bcf30850ab077dacd38e7c83'
    ],
    [
      // SUSD/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0xda2853b2bede0e3018f56d47624a413b2abe0831',
      '0xbe5ca5d12a16dbeb16fd56862f3fe1d2b6a65bf9'
    ],
    [
      // USDJ/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18', // WTRX
      '0x834295921A488D9d42b4b3021ED1a3C39fB0f03e', // USDJ
      '0x97241d2a49699e9f333fa5ea2b0e57f52c7d63b5' // pair
    ],
    [
      // JST/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x18FD0626DAF3Af02389AEf3ED87dB9C33F638ffa',
      '0xd884f83f06f65df263b32ee961cfec68b9613870'
    ],
    [
      // DCD/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x8cE2B3fc3e8AD8fad36973A386547Fb8A97326E0',
      '0x400d234d52345c976e95808503e2111ac878e491'
    ],
    [
      // TEWKEN/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x130E4C9746E2F7b0A9D1F5eAB71AA13896037Ae8',
      '0x2b6046ac669f567154d995e9b723ad03fb670e2c'
    ],
    [
      // CNS/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x7C503A569a8E62210bdCe6b3e733272e154d08ab',
      '0x286feba54b2728b21a9b899c5b12884548b613ec'
    ],
    [
      // MIMA/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x400E3A5eAedd27B4D9193de2Bf442E1D072D5A5c',
      '0x12bb90e238dd2cbbac5c4ec3e6a798a7e5900f16'
    ],
    [
      // BNKR/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x8CaEea9c7EBb8840eE4B49d10542B99Cec6fFbc6',
      '0xcc9e9acaf2ab4558ced15c69e781e854b13f1b36'
    ],
    [
      // CSX/TRX
      '0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18',
      '0x629550b68f84Db46B53ebE095C92E5815AAA6d24',
      '0x4b11611536994a25133d48c13a496d44cfc8d484'
    ]
  ]),
  [ChainId.SHASTA]: {}
}
