declare module "@cashfreepayments/cashfree-js" {
    export function load(options: { mode: "sandbox" | "production" }): Promise<any>;

  export function create(arg0: { mode: string; }) {
    throw new Error("Function not implemented.");
  }
}
