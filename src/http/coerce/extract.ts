import {combine, Extractor, PartialExtractor} from 'src/extract';
import {HttpPipelineInput} from 'src/http';

export function extract<TInput extends HttpPipelineInput,
  T0 extends object,
  >(
  p0: PartialExtractor<TInput, T0>,
): Extractor<TInput, T0>;
export function extract<TInput extends HttpPipelineInput,
  T0 extends object,
  T1 extends object,
  >(
  p0: PartialExtractor<TInput, T0>,
  p1: PartialExtractor<TInput, T1>,
): Extractor<TInput, T0 & T1>;
export function extract<TInput extends HttpPipelineInput,
  T0 extends object,
  T1 extends object,
  T2 extends object,
  >(
  p0: PartialExtractor<TInput, T0>,
  p1: PartialExtractor<TInput, T1>,
  p2: PartialExtractor<TInput, T2>,
): Extractor<TInput, T0 & T1 & T2>;
export function extract<TInput extends HttpPipelineInput,
  T0 extends object,
  T1 extends object,
  T2 extends object,
  T3 extends object,
  >(
  p0: PartialExtractor<TInput, T0>,
  p1: PartialExtractor<TInput, T1>,
  p2: PartialExtractor<TInput, T2>,
  p3: PartialExtractor<TInput, T3>,
): Extractor<TInput, T0 & T1 & T2 & T3>;
export function extract<TInput extends HttpPipelineInput,
  T0 extends object,
  T1 extends object,
  T2 extends object,
  T3 extends object,
  T4 extends object,
  >(
  p0: PartialExtractor<TInput, T0>,
  p1: PartialExtractor<TInput, T1>,
  p2: PartialExtractor<TInput, T2>,
  p3: PartialExtractor<TInput, T3>,
  p4: PartialExtractor<TInput, T4>,
): Extractor<TInput, T0 & T1 & T2 & T3 & T4>;
export function extract<TInput extends HttpPipelineInput>(
  ...args: Array<PartialExtractor<TInput, any>>
): Extractor<TInput, any>;
export function extract(...args: Array<PartialExtractor<any, any>>): Extractor<any, any> {
  return combine(...args);
}
