const Types = {

    /**
     * Databases
     */
    PgClient: Symbol.for('PgClient'),
    IProviderPgConnection: Symbol.for('IProviderPgConnection'),

    /**
     * Constants
     */
    Constants: Symbol.for('Constants'),


    /**
     * Business
     */
    SaleBusiness: Symbol.for('SaleBusiness'),

    /**
     * Services
     */
    HandlerService: Symbol.for('HandlerService'),

    /**
     * Repository
     */
    SaleRepository: Symbol.for('SaleRepository')


}

export default Types;
