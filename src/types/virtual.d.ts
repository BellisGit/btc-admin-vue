declare module 'virtual:eps' {
  export const eps: {
    service: any;
    list: any[];
  };
}

declare module 'virtual:ctx' {
  export const ctx: {
    serviceLang: string;
    modules: any[];
    pages: any[];
    subPackages: any[];
  };
}

declare module 'virtual:svg-register' {
  const registerSvgIcons: () => void;
  export default registerSvgIcons;
}

declare module 'virtual:svg-icons' {
  export const svgIcons: Record<string, string>;
}
