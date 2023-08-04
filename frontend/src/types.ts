export type DryGoodsLive = {
    name: string;
    aisle: number;
    start: string;
    boxes: number;
    totes: number;
    end: string;
    status: string;
}
export type PerishablesLiveFreight = {
    name: string;
    distributerName: string;
    arrival: string;
    start: string;
    end: string;
    status: string;
}
export type BulkLive = {
    name: string;
    aisle: number;
    start: string;
    boxes: number;
    totes: number;
    end: string;
    status: string;
}

export type DryGoods = {
  upstock: {[key:string]:DryGoodsTask};
  backstock: {[key:string]:DryGoodsTask};
  sectors: {[key:string]:DryGoodsTask};
  rounding: {[key:string]:DryGoodsTask};
};

export type Perishables = {
  castors: {[key:string]:PerishablesTask};
  backstock: {[key:string]:PerishablesTask};
};

export type Bulk = Record<string, unknown>;
export type BeerWine = Record<string, unknown>;
export type ExtraNotes = Record<string, unknown>;

export type Tasks = {
  liveFreight: {[key: string]: LiveFreight};
  dryGoods: {[key: string]: DryGoods};
  perishables: {[key: string]: Perishables};
  bulk: {[key: string]: Bulk};
  beerWine: {[key: string]: BeerWine};
  extraNotes: {[key: string]: ExtraNotes};
};






export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

// LIVE FREIGHT

export type LiveFreight = {
    dryGoodsLive: {[key: string]: DryGoodsLive};
    perishablesLive: {[key: string]: PerishablesLiveFreight};
    bulkLive: {[key: string]: BulkLive};
}

// DRY GOODS

export type DryGoodsTask = {
    name: string;
    aisle: number;
    start: string;
    end: string;
    status: string;
}

export type PerishablesTask = {
    name: string;
    aisle: number;
    start: string;
    end: string;
    status: string;
}