import JSBI from 'jsbi'

import { SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Tron, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Tron.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  /**
   * The only instance of the base class `Currency`.
   */
  // @TRON
  // public static readonly TRON: Currency = new Currency(18, 'TRX', 'Tron')
  public static readonly TRON: Currency = new Currency(6, 'TRX', 'Tron')

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.TRON`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

const TRON = Currency.TRON
export { TRON }
