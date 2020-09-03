import { Web3Provider } from '@ethersproject/providers'
import { ChainId, Token, Pair, WETH } from '../src'

import createJavaTronProvider from '@opentron/java-tron-provider'

function getNileProvider() {
  const provider = createJavaTronProvider({ network: 'nile' })
  const library = new Web3Provider(provider)
  return library
}

describe('getAddress', () => {
  const DTKN = new Token(ChainId.NILE, '0x42C142500ff7068f326c01A8F1B3cd8ea7D9377f', 6, 'DTKN', 'Demo Token')

  describe('getAddressAsync', () => {
    it('returns the correct address', async () => {
      const provider = getNileProvider()
      const tokenA = WETH[ChainId.NILE]
      const tokenB = DTKN
      const addr = await Pair.getAddressAsync(tokenA, tokenB, provider)
      expect(addr).toEqual('0x02a6a10E4C7750a7F8dC159b95936B574c211f0D')
    })
  })
})
