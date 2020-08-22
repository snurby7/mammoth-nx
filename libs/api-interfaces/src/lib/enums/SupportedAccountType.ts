// ! Important: This was originally exported out from the ../common package but there was something between it getting
// ! from that package to this package that caused it to not allow me import it here, but in hindsight it would make sense for this package
// ! to export out it's types that it supports.
export enum SupportedAccountType {
  Checking = 'Checking',
  Savings = 'Savings',
  Cash = 'Cash',
  CreditCard = 'Credit Card',
  LineOfCredit = 'Line of Credit',
  Asset = 'Asset', // Investments, etc.
  Liability = 'Liability', // Mortgage, etc.
}
