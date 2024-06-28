export interface CreateOrder {
    productId: string;
    productName: string;
    orderedBy: string;
    quantity: number;
}

export interface UpdateOrder {
    productId?: string;
    productName?: string;
    orderedBy?: string;
    quantity?: number;
}
