import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { KnSelectDefaultOptionType } from '../types.ts';

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented');
  }
}

type OptionType = KnSelectDefaultOptionType

export declare type RequestFn<
  DataItem extends {} = {},
  ResponseType = any,
  C extends AbstractLazyResourceService<DataItem, ResponseType, C> = any
> = (ctx: C, stringFilter?: string) => Promise<ResponseType>

interface ResourceServiceConstructorOptions<
  DataType extends {} = {},
  ResponseType = any,
  C extends AbstractLazyResourceService<DataType, ResponseType, C> = any
> {
  loadingRef?: Ref<boolean>;
  requestFn: RequestFn<C, ResponseType>;
  itemToOption?: (item: DataType) => OptionType
}

export class AbstractLazyResourceService<
  DataItem extends {} = {},
  ResponseType = any,
  C extends AbstractLazyResourceService<DataItem, ResponseType, C> = any
> {
  private readonly requestFn: RequestFn<C>;
  items: Ref<DataItem[]> = ref([])
  private readonly loadingRef?: Ref<boolean>;
  private readonly _itemToOption?: any;

  constructor(options: ResourceServiceConstructorOptions<
    DataItem,
    ResponseType,
    C
  >) {
    this.requestFn = options.requestFn;
    this.loadingRef = options.loadingRef;
    this._itemToOption = options.itemToOption
  }

  itemToOption(item: DataItem): OptionType {
    if (this._itemToOption) {
      return this._itemToOption(item)
    }
    throw new NotImplementedError()
  }

  get options() {
    return computed(() => this.items.value.map(this.itemToOption))
  }

  // @ts-ignore
  getItemsFromResponse(response: ResponseType): DataItem[] {
    throw new NotImplementedError();
  }

  preRequest(): void {
  }

  async makeRequest(stringFilter?: string): Promise<ResponseType> {
    this.preRequest()
    return await this.requestFn(this as any, stringFilter)
  }

  // @ts-ignore
  processResponse(response: ResponseType): void {
  }

  async getNextItems(stringFilter?: string): Promise<DataItem[]> {
    if (this.loadingRef) {
      this.loadingRef.value = true
    }
    const response = await this.makeRequest(stringFilter);
    this.processResponse(response)
    if (this.loadingRef) {
      this.loadingRef.value = false
    }
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
      return []
    }
    const newItems = await this.getNextItems(stringFilter)
    this.items.value.push(...newItems)
    return newItems
  }

  isFullyLoaded(): boolean {
    throw new NotImplementedError()
  }
}

export class BaseLazyResourceService<
  DataItem extends {} = {},
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
  DataItem extends {} = {},
  ResponseType = any,
  C extends LimitOffsetLazyResourceService<DataItem, ResponseType, C> = any
> extends AbstractLazyResourceService<DataItem, ResponseType, C> {

  limit: number
  total: number = -1
  offset: number = 0
  _loaded: boolean = false

  constructor(
    options: ResourceServiceConstructorOptions<
      DataItem,
      ResponseType,
      C
    > & {
      limit: number
    }
  ) {
    super(options);
    this.limit = options.limit
  }


  processResponse(response: ResponseType) {
    super.processResponse(response);
    this._loaded = true
  }

  isFullyLoaded(): boolean {
    return this._loaded && this.items.value.length >= this.total;
  }
}
