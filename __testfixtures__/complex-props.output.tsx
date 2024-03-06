import React from "react"

interface MyComponentProps {
  optionalArray?: unknown[]
  optionalBool?: boolean
  optionalFunc?: (...args: unknown[]) => unknown
  optionalNumber?: number
  optionalObject?: object
  optionalString?: string
  optionalSymbol?: symbol
  optionalNode?: React.ReactNode
  optionalElement?: React.ReactElement
  optionalElementType?: React.ElementType
  optionalEnum?: "News" | "Photos"
  optionalNumericEnum?: 1 | 2 | 3
  optionalMixedEnum?: 1 | "Unknown" | false | unknown
  optionalUnknownEnum?: unknown[]
  optionalUnion?: string | number
  optionalArrayOf?: number[]
  optionalObjectOf?: Record<string, number>
  optionalInstanceOf?: Message
  optionalObjectWithShape?: {
    optionalProperty?: string
    requiredProperty: number
    functionProperty?: (...args: unknown[]) => unknown
  }
  optionalObjectWithStrictShape?: {
    optionalProperty?: string
    requiredProperty: number
  }
  requiredArray: unknown[]
  requiredBool: boolean
  requiredFunc: (...args: unknown[]) => unknown
  requiredNumber: number
  requiredObject: object
  requiredString: string
  requiredSymbol: symbol
  requiredNode: React.ReactNode
  requiredElement: React.ReactElement
  requiredElementType: React.ElementType
  requiredEnum: "News" | "Photos"
  requiredUnion: string | number
  requiredArrayOf: number[]
  requiredObjectOf: Record<string, number>
  requiredInstanceOf: Message
  requiredObjectWithShape: {
    optionalProperty?: string
    requiredProperty: number
  }
  requiredObjectWithStrictShape: {
    optionalProperty?: string
    requiredProperty: number
  }
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}
