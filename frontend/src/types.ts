export type Tasks = {
    liveFreight: LiveFreight;
    dryGoods: DryGoods;
    perishables: Perishables;
    bulk: Bulk;
    beerWine: BeerWine;
    extraNotes: ExtraNotes;
}& {
    [key: string]: any; // Add index signature
};
//   export type Tasks = {
//     liveFreight: {[key: string]: LiveFreight};
//     dryGoods: {[key: string]: DryGoods};
//     perishables: {[key: string]: Perishables};
//     bulk: Partial<{[key: string]: Bulk}>;
//     beerWine: Partial<{[key: string]: BeerWine}>;
//     extraNotes: Partial<{[key: string]: ExtraNotes}>;
//   };

  // LIVE FREIGHT

export type LiveFreight = {
    dryGoodsLive: {[key: string]: DryGoodsLive};
    perishablesLive: {[key: string]: PerishablesLiveFreight};
    bulkLive: {[key: string]: BulkLive};
};
// export type LiveFreight = {
//     dryGoodsLive: Partial<{[key: string]: DryGoodsLive}>;
//     perishablesLive: Partial<{[key: string]: PerishablesLiveFreight}>;
//     bulkLive: Partial<{[key: string]: BulkLive}>;
// };
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

// DRY GOODS

export type DryGoods = {
  upstock: {[key:string]:DryGoodsTask};
  backstock: {[key:string]:DryGoodsTask};
  sectors: {[key:string]:DryGoodsTask};
  rounding: {[key:string]:DryGoodsTask};
};
// export type DryGoods = {
//     upstock: DryGoodsTask;
//     backstock: DryGoodsTask;
//     sectors: DryGoodsTask;
//     rounding: DryGoodsTask;
//   };
export type DryGoodsTask = {
    name: string;
    aisle: number & string;
    start: string;
    end: string;
    status: string;
}

// PERISHABLES

export type Perishables = {
  castors: {[key:string]:PerishablesTask};
  backstock: {[key:string]:PerishablesTask};
};
export type PerishablesTask = {
    name: string;
    aisle: number & string;
    start: string;
    end: string;
    status: string;
}


export type Bulk = Record<string, unknown>;
export type BeerWine = Record<string, unknown>;
export type ExtraNotes = Record<string, unknown>;

// EMPLOYEES

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

// SHRINK LOG

export type ShrinkItem = {
    name: string,
    UPC: string,
    size: string,
    date: string,
    quantity: number,
    employee: string
}

export function forEachTask<T extends object>(
    tasks: T,
    callback: (task: T[keyof T]) => void
) {
    for (const key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            callback(tasks[key]);
        }
    }
}