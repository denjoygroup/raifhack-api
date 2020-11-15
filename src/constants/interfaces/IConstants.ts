export default interface IConstants {
    port: number,
    sbp: {
        key: string,
        merchant: string,
        host: string,
        prefix: string,
    }
    postgres: {
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
    };
}
