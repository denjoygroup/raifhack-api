import Sale from "../../models/Sale";

export default interface ISaleBusiness {
    test(): Promise<any>;
    index(): Promise<Sale[]>;
    getTotal(): Promise<number>;
    getByHours(): Promise<{total: number, label: string}[]>;
    generateSales(): Promise<void>;
}
