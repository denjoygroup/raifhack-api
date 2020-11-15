import { QrInfo } from "../../../constants/utils";

export default interface IQrBusiness {
    createQr(value: number): Promise<QrInfo>
    getLastQrInfoFromApi(qrId: string): Promise<QrInfo>;
    getLastQrInfo(): Promise<{lastQrInfo: QrInfo | undefined, value: number}>;
    value: number;
}
