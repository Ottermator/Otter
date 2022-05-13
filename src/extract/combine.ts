import {Extractor} from './extractor';
import {PartialExtractor} from './partial-extractor';


/**
 * Generates a function which takes in a {@code TInput}, runs each of the
 * {@code partialExtractors}, then returns the intersection of all their
 * returns.
 *
 * This function is intended for internal-use-only, see the protocol-specific
 * {@code extract} function for the proper typing.
 */
export function combine<TInput>(
  ...partialExtractors: Array<PartialExtractor<TInput>>
): Extractor<TInput, any> {
  return (ctx: TInput) => {
    return partialExtractors
      .map(pe => pe(ctx))
      .reduce((acc, val) => {
        return {...acc, ...val};
      }, {}) as any;
  }
}
