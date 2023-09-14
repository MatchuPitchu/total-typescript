// Let’s take a look at some application code for the open-source platform called Mattermost, an open source platform for collaboration in software.
const typePurchases = {
  a: 'first_purchase',
  b: 'refewal_self',
  c: 'monthly_subscription',
  d: 'annual_subscription',
} as const;

type ValueOf<T> = T[keyof T];

export type MetadataGatherWireTransferKeys = `${ValueOf<typeof typePurchases>}_alt_payment_method`;
// --> "first_purchase_alt_payment_method" | "refewal_self_alt_payment_method" | "monthly_subscription_alt_payment_method" | "annual_subscription_alt_payment_method"

export type CustomerMetadataGatherWireTransfer = Partial<Record<MetadataGatherWireTransferKeys, string>>;
// --> {
//   first_purchase_alt_payment_method?: string | undefined
//   refewal_self_alt_payment_method?: string | undefined
//   monthly_subscription_alt_payment_method?: string | undefined
//   annual_subscription_alt_payment_method?: string | undefined
// }
