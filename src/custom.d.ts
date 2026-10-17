declare module "*.css";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "react-payment-inputs" {
  export function usePaymentInputs(options?: any): {
    meta: {
      cardType?: {
        displayName: string
        type: string
        format: RegExp
        lengths: number[]
        gaps: number[]
        patterns: number[]
        code: { name: string; size: number }
      }
      error?: string
      erroredInputs?: Record<string, string>
      touchedInputs?: Record<string, boolean>
    }
    getCardNumberProps: (props?: any) => any
    getExpiryDateProps: (props?: any) => any
    getCVCProps: (props?: any) => any
    getZIPProps: (props?: any) => any
    getCardImageProps: (props?: any) => any
    wrapperProps: any
  }
}

declare module "react-payment-inputs/images" {
  export type CardImages = Record<string, any>
  const images: CardImages
  export default images
}
