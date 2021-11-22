type Nullable<T> = T | null;
export interface IPost {
    id: number
    title: string
    body: string
}
export interface ICounties {
    id: number,
    number: number,
    name: string,
    countyId: number
}
export interface IElectricityContract {
    productId: string,
    supplierId: string,
    productType: string,
    feeType: string,
    organizationName: string,
    organizationUrl: string,
    organizationId: string,
    productName: string,
    orderUrl: string,
    vatApplicable: boolean,
    elCertificateApplicable: boolean,
    ctApplicable: boolean,
    lastProductVersionId: number,
    maxKWYear: number,
    addonPriceMinimumFixedFor: string,
    addonPriceMinimumFixedForUnits: string,
    willNotifyDirectly: boolean,
    willNotifyDirectlyChannel: string,
    currentPrice: {
        epochMonth: number,
        monthlyFee: number,
        addonPrice: number,
        feePayment: number,
        kwPrice: number,
        spotPrice: number,
        vatRatio: number,
        consumerElectricityTax: number,
        usageMonthlyProfile: number,
        feeMail: number,
        contractBreachFee: number,
    },
    memberships: Array<string>,
    lastNordpoolEpochMonth: number,
    elCertificatePrice: number,
    priceType: number,
    standardAlert: string,
    applicableToCustomersType: string,
    supplierUrl: string,
    otherConditions: string,
    agreementTime: number,
    agreementTimeUnits: string,
    billingFrequency: number,
    billingFrequencyUnits: boolean,
    feeEFakturaMandatory: boolean,
    feeAvtalegiroMandatory: boolean,
    feeMandatoryUpdated: boolean,
}