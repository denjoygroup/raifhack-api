import { QrInfo } from "../../../constants/utils";

export default interface IQrBusiness {
    createQr(value: number): Promise<QrInfo>
    getLastQrInfoFromApi(qrId: string): Promise<QrInfo>;
    getLastQrInfo(): Promise<QrInfo | undefined>;
    value: number;
}
