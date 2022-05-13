import {InvokableActionPipeline} from 'src/action-pipeline';
import {HttpPipelineInput} from 'src/http/http-pipeline-input';
import {HttpBindingInfo} from 'src/http/http-binding-info';

export type HttpPipeline = InvokableActionPipeline<HttpPipelineInput, any, HttpBindingInfo<string>>;