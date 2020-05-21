import React from "react"

type Props = {
  optionalArray?: unknown[],
  optionalBool?: boolean,
  optionalFunc?: (...args: unknown[]) => unknown,
  optionalNumber?: number,
  optionalObject?: object,
  optionalString?: string,
  optionalSymbol?: symbol,
  optionalNode?: React.ReactNode,
  optionalElement?: React.ReactElement,
  optionalElementType?: React.ElementType,
  optionalEnum?: "News" | "Photos",
  optionalUnion?: string | number,
  optionalArrayOf?: number[],
  optionalObjectOf?: Record<string, number>,
  optionalObjectWithShape?: {
    optionalProperty?: string,
    requiredProperty: number
  },
  optionalObjectWithStrictShape: {
    optionalProperty?: string,
    requiredProperty: number
  },
  requiredFunc: (...args: unknown[]) => unknown,
  requiredAny: any,
  requiredEnum: "News" | "Photos"
};

export function MyComponent(props: Props) {
  return <span />
}
