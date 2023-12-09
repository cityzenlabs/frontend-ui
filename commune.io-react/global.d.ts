// For PNG module declarations
declare module "*.png";
declare module "*jpeg";
// in a declarations.d.ts file
declare module "flowbite-datepicker";

// Global augmentations
declare global {
  interface Window {
    Flowbite: any; // Use 'any' or a more specific type if you know the structure of Flowbite
  }
}

// This export is necessary to convert this into a module file rather than a script file
export {};
