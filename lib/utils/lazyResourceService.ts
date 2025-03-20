import type { KnSelectDefaultOptionType } from '../types.ts';
import type { Ref } from 'vue';
import { ref } from 'vue';

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented');
  }
}

export declare type RequestFn<
  ServiceType extends AbstractLazyResourceService,
  ResponseType = any,
  RequestOptionsType extends Record<string, any> = Record<string, any>
> = (ctx: ServiceType, stringFilter?: string, options?: RequestOptionsType) => Promise<ResponseType>

export class AbstractLazyResourceService<
  DataItem extends KnSelectDefaultOptionType = KnSelectDefaultOptionType,
  ResponseType = any,
  RequestOptionsType extends Record<string, any> = Record<string, any>
> {
  private readonly requestFn: RequestFn<AbstractLazyResourceService, ResponseType, RequestOptionsType>;
  items: Ref<DataItem[]> = ref([])

  constructor(requestFn: RequestFn<AbstractLazyResourceService, ResponseType, RequestOptionsType>) {
    this.requestFn = requestFn;
  }

  // @ts-ignore
  getItemsFromResponse(response: ResponseType): DataItem[] {
    throw new NotImplementedError();
  }

  preRequest(): void {
  }

  async makeRequest(stringFilter?: string, options?: RequestOptionsType): Promise<ResponseType> {
    this.preRequest()
    return await this.requestFn(this as any, stringFilter, options);
  }

  processResponse(response: ResponseType): ResponseType {
    return response
  }

  async getNextItems(stringFilter?: string): Promise<DataItem[]> {
    const response = await this.makeRequest(stringFilter);
    this.processResponse(response)
    return this.getItemsFromResponse(response);
  }

  clearData(): void {
    this.items.value = [];
  }

  async loadNextItems(
    stringFilter?: string,
    clear?: boolean
  ): Promise<DataItem[]> {
    if (clear) {
      this.clearData()
    }
    if (this.isFullyLoaded()) {
      return this.items.value;
    }
    this.items.value.push(...(await this.getNextItems(stringFilter)))
    return this.items.value
  }

  isFullyLoaded(): boolean {
    throw new NotImplementedError()
  }
}

export class BaseLazyResourceService<
  DataItem extends KnSelectDefaultOptionType = KnSelectDefaultOptionType,
> extends AbstractLazyResourceService<DataItem, DataItem[]> {

  _loaded: boolean = false

  preRequest() {
    this._loaded = false
  }

  getItemsFromResponse(response: DataItem[]): DataItem[] {
    return response;
  }

  processResponse(response: DataItem[]): DataItem[] {
    this._loaded = true
    return response
  }


  isFullyLoaded(): boolean {
    return this._loaded
  }
}

export class LimitOffsetLazyResourceService<
  DataItem extends KnSelectDefaultOptionType = KnSelectDefaultOptionType,
  ResponseType = any,
> extends AbstractLazyResourceService<DataItem, ResponseType> {

  limit: number
  total: number = -1
  offset: number = 0
  _loaded: boolean = false

  constructor(
    requestFn: RequestFn<LimitOffsetLazyResourceService, ResponseType>,
    limit: number,
  ) {
    super(requestFn as any);
    this.limit = limit
  }


  isFullyLoaded(): boolean {
    return this._loaded && this.items.value.length >= this.total;
  }
}
