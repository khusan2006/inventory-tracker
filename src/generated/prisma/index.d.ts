
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Batch
 * 
 */
export type Batch = $Result.DefaultSelection<Prisma.$BatchPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model Debt
 * 
 */
export type Debt = $Result.DefaultSelection<Prisma.$DebtPayload>
/**
 * Model MonthlyReport
 * 
 */
export type MonthlyReport = $Result.DefaultSelection<Prisma.$MonthlyReportPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Refund
 * 
 */
export type Refund = $Result.DefaultSelection<Prisma.$RefundPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RefundType: {
  CASH: 'CASH',
  STORE_CREDIT: 'STORE_CREDIT',
  EXCHANGE: 'EXCHANGE'
};

export type RefundType = (typeof RefundType)[keyof typeof RefundType]


export const RefundReason: {
  DEFECTIVE: 'DEFECTIVE',
  WRONG_ITEM: 'WRONG_ITEM',
  CUSTOMER_CHANGE_MIND: 'CUSTOMER_CHANGE_MIND',
  DUPLICATE_ORDER: 'DUPLICATE_ORDER',
  NOT_AS_DESCRIBED: 'NOT_AS_DESCRIBED',
  OTHER: 'OTHER'
};

export type RefundReason = (typeof RefundReason)[keyof typeof RefundReason]


export const ItemCondition: {
  NEW: 'NEW',
  OPENED: 'OPENED',
  DAMAGED: 'DAMAGED',
  DEFECTIVE: 'DEFECTIVE'
};

export type ItemCondition = (typeof ItemCondition)[keyof typeof ItemCondition]

}

export type RefundType = $Enums.RefundType

export const RefundType: typeof $Enums.RefundType

export type RefundReason = $Enums.RefundReason

export const RefundReason: typeof $Enums.RefundReason

export type ItemCondition = $Enums.ItemCondition

export const ItemCondition: typeof $Enums.ItemCondition

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.batch`: Exposes CRUD operations for the **Batch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Batches
    * const batches = await prisma.batch.findMany()
    * ```
    */
  get batch(): Prisma.BatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.debt`: Exposes CRUD operations for the **Debt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Debts
    * const debts = await prisma.debt.findMany()
    * ```
    */
  get debt(): Prisma.DebtDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyReport`: Exposes CRUD operations for the **MonthlyReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyReports
    * const monthlyReports = await prisma.monthlyReport.findMany()
    * ```
    */
  get monthlyReport(): Prisma.MonthlyReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refund`: Exposes CRUD operations for the **Refund** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Refunds
    * const refunds = await prisma.refund.findMany()
    * ```
    */
  get refund(): Prisma.RefundDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    User: 'User',
    Category: 'Category',
    Product: 'Product',
    Batch: 'Batch',
    Sale: 'Sale',
    Debt: 'Debt',
    MonthlyReport: 'MonthlyReport',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Refund: 'Refund'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "user" | "category" | "product" | "batch" | "sale" | "debt" | "monthlyReport" | "account" | "session" | "verificationToken" | "refund"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Batch: {
        payload: Prisma.$BatchPayload<ExtArgs>
        fields: Prisma.BatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findFirst: {
            args: Prisma.BatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findMany: {
            args: Prisma.BatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          create: {
            args: Prisma.BatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          createMany: {
            args: Prisma.BatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          delete: {
            args: Prisma.BatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          update: {
            args: Prisma.BatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          deleteMany: {
            args: Prisma.BatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          upsert: {
            args: Prisma.BatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          aggregate: {
            args: Prisma.BatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatch>
          }
          groupBy: {
            args: Prisma.BatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchCountArgs<ExtArgs>
            result: $Utils.Optional<BatchCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SaleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      Debt: {
        payload: Prisma.$DebtPayload<ExtArgs>
        fields: Prisma.DebtFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DebtFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DebtFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>
          }
          findFirst: {
            args: Prisma.DebtFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DebtFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>
          }
          findMany: {
            args: Prisma.DebtFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>[]
          }
          create: {
            args: Prisma.DebtCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>
          }
          createMany: {
            args: Prisma.DebtCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DebtCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>[]
          }
          delete: {
            args: Prisma.DebtDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>
          }
          update: {
            args: Prisma.DebtUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>
          }
          deleteMany: {
            args: Prisma.DebtDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DebtUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DebtUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>[]
          }
          upsert: {
            args: Prisma.DebtUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtPayload>
          }
          aggregate: {
            args: Prisma.DebtAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDebt>
          }
          groupBy: {
            args: Prisma.DebtGroupByArgs<ExtArgs>
            result: $Utils.Optional<DebtGroupByOutputType>[]
          }
          count: {
            args: Prisma.DebtCountArgs<ExtArgs>
            result: $Utils.Optional<DebtCountAggregateOutputType> | number
          }
        }
      }
      MonthlyReport: {
        payload: Prisma.$MonthlyReportPayload<ExtArgs>
        fields: Prisma.MonthlyReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          findFirst: {
            args: Prisma.MonthlyReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          findMany: {
            args: Prisma.MonthlyReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          create: {
            args: Prisma.MonthlyReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          createMany: {
            args: Prisma.MonthlyReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          delete: {
            args: Prisma.MonthlyReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          update: {
            args: Prisma.MonthlyReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          aggregate: {
            args: Prisma.MonthlyReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyReport>
          }
          groupBy: {
            args: Prisma.MonthlyReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyReportCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyReportCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Refund: {
        payload: Prisma.$RefundPayload<ExtArgs>
        fields: Prisma.RefundFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefundFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefundFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>
          }
          findFirst: {
            args: Prisma.RefundFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefundFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>
          }
          findMany: {
            args: Prisma.RefundFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>[]
          }
          create: {
            args: Prisma.RefundCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>
          }
          createMany: {
            args: Prisma.RefundCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefundCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>[]
          }
          delete: {
            args: Prisma.RefundDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>
          }
          update: {
            args: Prisma.RefundUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>
          }
          deleteMany: {
            args: Prisma.RefundDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefundUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefundUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>[]
          }
          upsert: {
            args: Prisma.RefundUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundPayload>
          }
          aggregate: {
            args: Prisma.RefundAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefund>
          }
          groupBy: {
            args: Prisma.RefundGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefundGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefundCountArgs<ExtArgs>
            result: $Utils.Optional<RefundCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    user?: UserOmit
    category?: CategoryOmit
    product?: ProductOmit
    batch?: BatchOmit
    sale?: SaleOmit
    debt?: DebtOmit
    monthlyReport?: MonthlyReportOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    refund?: RefundOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    categories: number
    products: number
    batches: number
    sales: number
    debts: number
    refunds: number
    monthlyReports: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    categories?: boolean | CompanyCountOutputTypeCountCategoriesArgs
    products?: boolean | CompanyCountOutputTypeCountProductsArgs
    batches?: boolean | CompanyCountOutputTypeCountBatchesArgs
    sales?: boolean | CompanyCountOutputTypeCountSalesArgs
    debts?: boolean | CompanyCountOutputTypeCountDebtsArgs
    refunds?: boolean | CompanyCountOutputTypeCountRefundsArgs
    monthlyReports?: boolean | CompanyCountOutputTypeCountMonthlyReportsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountDebtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountMonthlyReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyReportWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    processedRefunds: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    processedRefunds?: boolean | UserCountOutputTypeCountProcessedRefundsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProcessedRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    batches: number
    sales: number
    debts: number
    refunds: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batches?: boolean | ProductCountOutputTypeCountBatchesArgs
    sales?: boolean | ProductCountOutputTypeCountSalesArgs
    debts?: boolean | ProductCountOutputTypeCountDebtsArgs
    refunds?: boolean | ProductCountOutputTypeCountRefundsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountDebtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundWhereInput
  }


  /**
   * Count Type BatchCountOutputType
   */

  export type BatchCountOutputType = {
    sales: number
    debts: number
    refunds: number
  }

  export type BatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | BatchCountOutputTypeCountSalesArgs
    debts?: boolean | BatchCountOutputTypeCountDebtsArgs
    refunds?: boolean | BatchCountOutputTypeCountRefundsArgs
  }

  // Custom InputTypes
  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchCountOutputType
     */
    select?: BatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountDebtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtWhereInput
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundWhereInput
  }


  /**
   * Count Type SaleCountOutputType
   */

  export type SaleCountOutputType = {
    refunds: number
  }

  export type SaleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refunds?: boolean | SaleCountOutputTypeCountRefundsArgs
  }

  // Custom InputTypes
  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleCountOutputType
     */
    select?: SaleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    categories?: boolean | Company$categoriesArgs<ExtArgs>
    products?: boolean | Company$productsArgs<ExtArgs>
    batches?: boolean | Company$batchesArgs<ExtArgs>
    sales?: boolean | Company$salesArgs<ExtArgs>
    debts?: boolean | Company$debtsArgs<ExtArgs>
    refunds?: boolean | Company$refundsArgs<ExtArgs>
    monthlyReports?: boolean | Company$monthlyReportsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    categories?: boolean | Company$categoriesArgs<ExtArgs>
    products?: boolean | Company$productsArgs<ExtArgs>
    batches?: boolean | Company$batchesArgs<ExtArgs>
    sales?: boolean | Company$salesArgs<ExtArgs>
    debts?: boolean | Company$debtsArgs<ExtArgs>
    refunds?: boolean | Company$refundsArgs<ExtArgs>
    monthlyReports?: boolean | Company$monthlyReportsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      batches: Prisma.$BatchPayload<ExtArgs>[]
      sales: Prisma.$SalePayload<ExtArgs>[]
      debts: Prisma.$DebtPayload<ExtArgs>[]
      refunds: Prisma.$RefundPayload<ExtArgs>[]
      monthlyReports: Prisma.$MonthlyReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Company$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Company$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Company$productsArgs<ExtArgs> = {}>(args?: Subset<T, Company$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    batches<T extends Company$batchesArgs<ExtArgs> = {}>(args?: Subset<T, Company$batchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sales<T extends Company$salesArgs<ExtArgs> = {}>(args?: Subset<T, Company$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    debts<T extends Company$debtsArgs<ExtArgs> = {}>(args?: Subset<T, Company$debtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refunds<T extends Company$refundsArgs<ExtArgs> = {}>(args?: Subset<T, Company$refundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    monthlyReports<T extends Company$monthlyReportsArgs<ExtArgs> = {}>(args?: Subset<T, Company$monthlyReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.categories
   */
  export type Company$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Company.products
   */
  export type Company$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Company.batches
   */
  export type Company$batchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    cursor?: BatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Company.sales
   */
  export type Company$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Company.debts
   */
  export type Company$debtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    where?: DebtWhereInput
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    cursor?: DebtWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebtScalarFieldEnum | DebtScalarFieldEnum[]
  }

  /**
   * Company.refunds
   */
  export type Company$refundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    where?: RefundWhereInput
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    cursor?: RefundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Company.monthlyReports
   */
  export type Company$monthlyReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    where?: MonthlyReportWhereInput
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    cursor?: MonthlyReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    companyId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    companyId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    companyId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string
    createdAt: Date
    updatedAt: Date
    companyId: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    processedRefunds?: boolean | User$processedRefundsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "createdAt" | "updatedAt" | "companyId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    processedRefunds?: boolean | User$processedRefundsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      processedRefunds: Prisma.$RefundPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string
      createdAt: Date
      updatedAt: Date
      companyId: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    processedRefunds<T extends User$processedRefundsArgs<ExtArgs> = {}>(args?: Subset<T, User$processedRefundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly companyId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.processedRefunds
   */
  export type User$processedRefundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    where?: RefundWhereInput
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    cursor?: RefundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
    companyId: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
    companyId: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    color: number
    createdAt: number
    updatedAt: number
    companyId: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    color: string
    createdAt: Date
    updatedAt: Date
    companyId: string
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "color" | "createdAt" | "updatedAt" | "companyId", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      color: string
      createdAt: Date
      updatedAt: Date
      companyId: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
    readonly companyId: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    sellingPrice: number | null
    totalStock: number | null
    minStockLevel: number | null
  }

  export type ProductSumAggregateOutputType = {
    sellingPrice: number | null
    totalStock: number | null
    minStockLevel: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    sku: string | null
    name: string | null
    description: string | null
    sellingPrice: number | null
    totalStock: number | null
    minStockLevel: number | null
    location: string | null
    imageUrl: string | null
    fitment: string | null
    supplier: string | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
    companyId: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    sku: string | null
    name: string | null
    description: string | null
    sellingPrice: number | null
    totalStock: number | null
    minStockLevel: number | null
    location: string | null
    imageUrl: string | null
    fitment: string | null
    supplier: string | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
    companyId: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    sku: number
    name: number
    description: number
    sellingPrice: number
    totalStock: number
    minStockLevel: number
    location: number
    imageUrl: number
    fitment: number
    supplier: number
    createdAt: number
    updatedAt: number
    categoryId: number
    companyId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    sellingPrice?: true
    totalStock?: true
    minStockLevel?: true
  }

  export type ProductSumAggregateInputType = {
    sellingPrice?: true
    totalStock?: true
    minStockLevel?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    description?: true
    sellingPrice?: true
    totalStock?: true
    minStockLevel?: true
    location?: true
    imageUrl?: true
    fitment?: true
    supplier?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    companyId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    description?: true
    sellingPrice?: true
    totalStock?: true
    minStockLevel?: true
    location?: true
    imageUrl?: true
    fitment?: true
    supplier?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    companyId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    description?: true
    sellingPrice?: true
    totalStock?: true
    minStockLevel?: true
    location?: true
    imageUrl?: true
    fitment?: true
    supplier?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    companyId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    sku: string
    name: string
    description: string | null
    sellingPrice: number
    totalStock: number
    minStockLevel: number
    location: string | null
    imageUrl: string | null
    fitment: string | null
    supplier: string | null
    createdAt: Date
    updatedAt: Date
    categoryId: string
    companyId: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    sellingPrice?: boolean
    totalStock?: boolean
    minStockLevel?: boolean
    location?: boolean
    imageUrl?: boolean
    fitment?: boolean
    supplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    companyId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    batches?: boolean | Product$batchesArgs<ExtArgs>
    sales?: boolean | Product$salesArgs<ExtArgs>
    debts?: boolean | Product$debtsArgs<ExtArgs>
    refunds?: boolean | Product$refundsArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    sellingPrice?: boolean
    totalStock?: boolean
    minStockLevel?: boolean
    location?: boolean
    imageUrl?: boolean
    fitment?: boolean
    supplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    companyId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    sellingPrice?: boolean
    totalStock?: boolean
    minStockLevel?: boolean
    location?: boolean
    imageUrl?: boolean
    fitment?: boolean
    supplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    companyId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    sku?: boolean
    name?: boolean
    description?: boolean
    sellingPrice?: boolean
    totalStock?: boolean
    minStockLevel?: boolean
    location?: boolean
    imageUrl?: boolean
    fitment?: boolean
    supplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    companyId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sku" | "name" | "description" | "sellingPrice" | "totalStock" | "minStockLevel" | "location" | "imageUrl" | "fitment" | "supplier" | "createdAt" | "updatedAt" | "categoryId" | "companyId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    batches?: boolean | Product$batchesArgs<ExtArgs>
    sales?: boolean | Product$salesArgs<ExtArgs>
    debts?: boolean | Product$debtsArgs<ExtArgs>
    refunds?: boolean | Product$refundsArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      batches: Prisma.$BatchPayload<ExtArgs>[]
      sales: Prisma.$SalePayload<ExtArgs>[]
      debts: Prisma.$DebtPayload<ExtArgs>[]
      refunds: Prisma.$RefundPayload<ExtArgs>[]
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sku: string
      name: string
      description: string | null
      sellingPrice: number
      totalStock: number
      minStockLevel: number
      location: string | null
      imageUrl: string | null
      fitment: string | null
      supplier: string | null
      createdAt: Date
      updatedAt: Date
      categoryId: string
      companyId: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    batches<T extends Product$batchesArgs<ExtArgs> = {}>(args?: Subset<T, Product$batchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sales<T extends Product$salesArgs<ExtArgs> = {}>(args?: Subset<T, Product$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    debts<T extends Product$debtsArgs<ExtArgs> = {}>(args?: Subset<T, Product$debtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refunds<T extends Product$refundsArgs<ExtArgs> = {}>(args?: Subset<T, Product$refundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly sellingPrice: FieldRef<"Product", 'Float'>
    readonly totalStock: FieldRef<"Product", 'Int'>
    readonly minStockLevel: FieldRef<"Product", 'Int'>
    readonly location: FieldRef<"Product", 'String'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly fitment: FieldRef<"Product", 'String'>
    readonly supplier: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly companyId: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.batches
   */
  export type Product$batchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    cursor?: BatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Product.sales
   */
  export type Product$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Product.debts
   */
  export type Product$debtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    where?: DebtWhereInput
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    cursor?: DebtWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebtScalarFieldEnum | DebtScalarFieldEnum[]
  }

  /**
   * Product.refunds
   */
  export type Product$refundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    where?: RefundWhereInput
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    cursor?: RefundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Batch
   */

  export type AggregateBatch = {
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  export type BatchAvgAggregateOutputType = {
    purchasePrice: number | null
    initialQuantity: number | null
    currentQuantity: number | null
  }

  export type BatchSumAggregateOutputType = {
    purchasePrice: number | null
    initialQuantity: number | null
    currentQuantity: number | null
  }

  export type BatchMinAggregateOutputType = {
    id: string | null
    purchaseDate: Date | null
    purchasePrice: number | null
    initialQuantity: number | null
    currentQuantity: number | null
    status: string | null
    supplier: string | null
    invoiceNumber: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    productId: string | null
    companyId: string | null
  }

  export type BatchMaxAggregateOutputType = {
    id: string | null
    purchaseDate: Date | null
    purchasePrice: number | null
    initialQuantity: number | null
    currentQuantity: number | null
    status: string | null
    supplier: string | null
    invoiceNumber: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    productId: string | null
    companyId: string | null
  }

  export type BatchCountAggregateOutputType = {
    id: number
    purchaseDate: number
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status: number
    supplier: number
    invoiceNumber: number
    notes: number
    createdAt: number
    updatedAt: number
    productId: number
    companyId: number
    _all: number
  }


  export type BatchAvgAggregateInputType = {
    purchasePrice?: true
    initialQuantity?: true
    currentQuantity?: true
  }

  export type BatchSumAggregateInputType = {
    purchasePrice?: true
    initialQuantity?: true
    currentQuantity?: true
  }

  export type BatchMinAggregateInputType = {
    id?: true
    purchaseDate?: true
    purchasePrice?: true
    initialQuantity?: true
    currentQuantity?: true
    status?: true
    supplier?: true
    invoiceNumber?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    companyId?: true
  }

  export type BatchMaxAggregateInputType = {
    id?: true
    purchaseDate?: true
    purchasePrice?: true
    initialQuantity?: true
    currentQuantity?: true
    status?: true
    supplier?: true
    invoiceNumber?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    companyId?: true
  }

  export type BatchCountAggregateInputType = {
    id?: true
    purchaseDate?: true
    purchasePrice?: true
    initialQuantity?: true
    currentQuantity?: true
    status?: true
    supplier?: true
    invoiceNumber?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    companyId?: true
    _all?: true
  }

  export type BatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batch to aggregate.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Batches
    **/
    _count?: true | BatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchMaxAggregateInputType
  }

  export type GetBatchAggregateType<T extends BatchAggregateArgs> = {
        [P in keyof T & keyof AggregateBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatch[P]>
      : GetScalarType<T[P], AggregateBatch[P]>
  }




  export type BatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithAggregationInput | BatchOrderByWithAggregationInput[]
    by: BatchScalarFieldEnum[] | BatchScalarFieldEnum
    having?: BatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchCountAggregateInputType | true
    _avg?: BatchAvgAggregateInputType
    _sum?: BatchSumAggregateInputType
    _min?: BatchMinAggregateInputType
    _max?: BatchMaxAggregateInputType
  }

  export type BatchGroupByOutputType = {
    id: string
    purchaseDate: Date
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status: string
    supplier: string | null
    invoiceNumber: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    productId: string
    companyId: string
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  type GetBatchGroupByPayload<T extends BatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchGroupByOutputType[P]>
            : GetScalarType<T[P], BatchGroupByOutputType[P]>
        }
      >
    >


  export type BatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    initialQuantity?: boolean
    currentQuantity?: boolean
    status?: boolean
    supplier?: boolean
    invoiceNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sales?: boolean | Batch$salesArgs<ExtArgs>
    debts?: boolean | Batch$debtsArgs<ExtArgs>
    refunds?: boolean | Batch$refundsArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    initialQuantity?: boolean
    currentQuantity?: boolean
    status?: boolean
    supplier?: boolean
    invoiceNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    initialQuantity?: boolean
    currentQuantity?: boolean
    status?: boolean
    supplier?: boolean
    invoiceNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectScalar = {
    id?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    initialQuantity?: boolean
    currentQuantity?: boolean
    status?: boolean
    supplier?: boolean
    invoiceNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    companyId?: boolean
  }

  export type BatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "purchaseDate" | "purchasePrice" | "initialQuantity" | "currentQuantity" | "status" | "supplier" | "invoiceNumber" | "notes" | "createdAt" | "updatedAt" | "productId" | "companyId", ExtArgs["result"]["batch"]>
  export type BatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sales?: boolean | Batch$salesArgs<ExtArgs>
    debts?: boolean | Batch$debtsArgs<ExtArgs>
    refunds?: boolean | Batch$refundsArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type BatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $BatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Batch"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      sales: Prisma.$SalePayload<ExtArgs>[]
      debts: Prisma.$DebtPayload<ExtArgs>[]
      refunds: Prisma.$RefundPayload<ExtArgs>[]
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      purchaseDate: Date
      purchasePrice: number
      initialQuantity: number
      currentQuantity: number
      status: string
      supplier: string | null
      invoiceNumber: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      productId: string
      companyId: string
    }, ExtArgs["result"]["batch"]>
    composites: {}
  }

  type BatchGetPayload<S extends boolean | null | undefined | BatchDefaultArgs> = $Result.GetResult<Prisma.$BatchPayload, S>

  type BatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BatchCountAggregateInputType | true
    }

  export interface BatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Batch'], meta: { name: 'Batch' } }
    /**
     * Find zero or one Batch that matches the filter.
     * @param {BatchFindUniqueArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchFindUniqueArgs>(args: SelectSubset<T, BatchFindUniqueArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Batch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchFindUniqueOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Batch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchFindFirstArgs>(args?: SelectSubset<T, BatchFindFirstArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Batch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Batches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Batches
     * const batches = await prisma.batch.findMany()
     * 
     * // Get first 10 Batches
     * const batches = await prisma.batch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchWithIdOnly = await prisma.batch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchFindManyArgs>(args?: SelectSubset<T, BatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Batch.
     * @param {BatchCreateArgs} args - Arguments to create a Batch.
     * @example
     * // Create one Batch
     * const Batch = await prisma.batch.create({
     *   data: {
     *     // ... data to create a Batch
     *   }
     * })
     * 
     */
    create<T extends BatchCreateArgs>(args: SelectSubset<T, BatchCreateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Batches.
     * @param {BatchCreateManyArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchCreateManyArgs>(args?: SelectSubset<T, BatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Batches and returns the data saved in the database.
     * @param {BatchCreateManyAndReturnArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Batch.
     * @param {BatchDeleteArgs} args - Arguments to delete one Batch.
     * @example
     * // Delete one Batch
     * const Batch = await prisma.batch.delete({
     *   where: {
     *     // ... filter to delete one Batch
     *   }
     * })
     * 
     */
    delete<T extends BatchDeleteArgs>(args: SelectSubset<T, BatchDeleteArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Batch.
     * @param {BatchUpdateArgs} args - Arguments to update one Batch.
     * @example
     * // Update one Batch
     * const batch = await prisma.batch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchUpdateArgs>(args: SelectSubset<T, BatchUpdateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Batches.
     * @param {BatchDeleteManyArgs} args - Arguments to filter Batches to delete.
     * @example
     * // Delete a few Batches
     * const { count } = await prisma.batch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchDeleteManyArgs>(args?: SelectSubset<T, BatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchUpdateManyArgs>(args: SelectSubset<T, BatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches and returns the data updated in the database.
     * @param {BatchUpdateManyAndReturnArgs} args - Arguments to update many Batches.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BatchUpdateManyAndReturnArgs>(args: SelectSubset<T, BatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Batch.
     * @param {BatchUpsertArgs} args - Arguments to update or create a Batch.
     * @example
     * // Update or create a Batch
     * const batch = await prisma.batch.upsert({
     *   create: {
     *     // ... data to create a Batch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Batch we want to update
     *   }
     * })
     */
    upsert<T extends BatchUpsertArgs>(args: SelectSubset<T, BatchUpsertArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchCountArgs} args - Arguments to filter Batches to count.
     * @example
     * // Count the number of Batches
     * const count = await prisma.batch.count({
     *   where: {
     *     // ... the filter for the Batches we want to count
     *   }
     * })
    **/
    count<T extends BatchCountArgs>(
      args?: Subset<T, BatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchAggregateArgs>(args: Subset<T, BatchAggregateArgs>): Prisma.PrismaPromise<GetBatchAggregateType<T>>

    /**
     * Group by Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchGroupByArgs['orderBy'] }
        : { orderBy?: BatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Batch model
   */
  readonly fields: BatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Batch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sales<T extends Batch$salesArgs<ExtArgs> = {}>(args?: Subset<T, Batch$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    debts<T extends Batch$debtsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$debtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refunds<T extends Batch$refundsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$refundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Batch model
   */
  interface BatchFieldRefs {
    readonly id: FieldRef<"Batch", 'String'>
    readonly purchaseDate: FieldRef<"Batch", 'DateTime'>
    readonly purchasePrice: FieldRef<"Batch", 'Float'>
    readonly initialQuantity: FieldRef<"Batch", 'Int'>
    readonly currentQuantity: FieldRef<"Batch", 'Int'>
    readonly status: FieldRef<"Batch", 'String'>
    readonly supplier: FieldRef<"Batch", 'String'>
    readonly invoiceNumber: FieldRef<"Batch", 'String'>
    readonly notes: FieldRef<"Batch", 'String'>
    readonly createdAt: FieldRef<"Batch", 'DateTime'>
    readonly updatedAt: FieldRef<"Batch", 'DateTime'>
    readonly productId: FieldRef<"Batch", 'String'>
    readonly companyId: FieldRef<"Batch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Batch findUnique
   */
  export type BatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findUniqueOrThrow
   */
  export type BatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findFirst
   */
  export type BatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findFirstOrThrow
   */
  export type BatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findMany
   */
  export type BatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batches to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch create
   */
  export type BatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Batch.
     */
    data: XOR<BatchCreateInput, BatchUncheckedCreateInput>
  }

  /**
   * Batch createMany
   */
  export type BatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Batch createManyAndReturn
   */
  export type BatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Batch update
   */
  export type BatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Batch.
     */
    data: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
    /**
     * Choose, which Batch to update.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch updateMany
   */
  export type BatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to update.
     */
    limit?: number
  }

  /**
   * Batch updateManyAndReturn
   */
  export type BatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Batch upsert
   */
  export type BatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Batch to update in case it exists.
     */
    where: BatchWhereUniqueInput
    /**
     * In case the Batch found by the `where` argument doesn't exist, create a new Batch with this data.
     */
    create: XOR<BatchCreateInput, BatchUncheckedCreateInput>
    /**
     * In case the Batch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
  }

  /**
   * Batch delete
   */
  export type BatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter which Batch to delete.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch deleteMany
   */
  export type BatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batches to delete
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to delete.
     */
    limit?: number
  }

  /**
   * Batch.sales
   */
  export type Batch$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Batch.debts
   */
  export type Batch$debtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    where?: DebtWhereInput
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    cursor?: DebtWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebtScalarFieldEnum | DebtScalarFieldEnum[]
  }

  /**
   * Batch.refunds
   */
  export type Batch$refundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    where?: RefundWhereInput
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    cursor?: RefundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Batch without action
   */
  export type BatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    quantity: number | null
    salePrice: number | null
    purchasePrice: number | null
    profit: number | null
    profitMargin: number | null
  }

  export type SaleSumAggregateOutputType = {
    quantity: number | null
    salePrice: number | null
    purchasePrice: number | null
    profit: number | null
    profitMargin: number | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    quantity: number | null
    salePrice: number | null
    purchasePrice: number | null
    profit: number | null
    profitMargin: number | null
    saleDate: Date | null
    customerId: string | null
    invoiceNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    productId: string | null
    batchId: string | null
    companyId: string | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    quantity: number | null
    salePrice: number | null
    purchasePrice: number | null
    profit: number | null
    profitMargin: number | null
    saleDate: Date | null
    customerId: string | null
    invoiceNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    productId: string | null
    batchId: string | null
    companyId: string | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: number
    customerId: number
    invoiceNumber: number
    createdAt: number
    updatedAt: number
    productId: number
    batchId: number
    companyId: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    quantity?: true
    salePrice?: true
    purchasePrice?: true
    profit?: true
    profitMargin?: true
  }

  export type SaleSumAggregateInputType = {
    quantity?: true
    salePrice?: true
    purchasePrice?: true
    profit?: true
    profitMargin?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    quantity?: true
    salePrice?: true
    purchasePrice?: true
    profit?: true
    profitMargin?: true
    saleDate?: true
    customerId?: true
    invoiceNumber?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    batchId?: true
    companyId?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    quantity?: true
    salePrice?: true
    purchasePrice?: true
    profit?: true
    profitMargin?: true
    saleDate?: true
    customerId?: true
    invoiceNumber?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    batchId?: true
    companyId?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    quantity?: true
    salePrice?: true
    purchasePrice?: true
    profit?: true
    profitMargin?: true
    saleDate?: true
    customerId?: true
    invoiceNumber?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    batchId?: true
    companyId?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date
    customerId: string | null
    invoiceNumber: string | null
    createdAt: Date
    updatedAt: Date
    productId: string
    batchId: string
    companyId: string
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    profit?: boolean
    profitMargin?: boolean
    saleDate?: boolean
    customerId?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    refunds?: boolean | Sale$refundsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    profit?: boolean
    profitMargin?: boolean
    saleDate?: boolean
    customerId?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    profit?: boolean
    profitMargin?: boolean
    saleDate?: boolean
    customerId?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    id?: boolean
    quantity?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    profit?: boolean
    profitMargin?: boolean
    saleDate?: boolean
    customerId?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
  }

  export type SaleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantity" | "salePrice" | "purchasePrice" | "profit" | "profitMargin" | "saleDate" | "customerId" | "invoiceNumber" | "createdAt" | "updatedAt" | "productId" | "batchId" | "companyId", ExtArgs["result"]["sale"]>
  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    refunds?: boolean | Sale$refundsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type SaleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      batch: Prisma.$BatchPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
      refunds: Prisma.$RefundPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantity: number
      salePrice: number
      purchasePrice: number
      profit: number
      profitMargin: number
      saleDate: Date
      customerId: string | null
      invoiceNumber: string | null
      createdAt: Date
      updatedAt: Date
      productId: string
      batchId: string
      companyId: string
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales and returns the data updated in the database.
     * @param {SaleUpdateManyAndReturnArgs} args - Arguments to update many Sales.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SaleUpdateManyAndReturnArgs>(args: SelectSubset<T, SaleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    refunds<T extends Sale$refundsArgs<ExtArgs> = {}>(args?: Subset<T, Sale$refundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly quantity: FieldRef<"Sale", 'Int'>
    readonly salePrice: FieldRef<"Sale", 'Float'>
    readonly purchasePrice: FieldRef<"Sale", 'Float'>
    readonly profit: FieldRef<"Sale", 'Float'>
    readonly profitMargin: FieldRef<"Sale", 'Float'>
    readonly saleDate: FieldRef<"Sale", 'DateTime'>
    readonly customerId: FieldRef<"Sale", 'String'>
    readonly invoiceNumber: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
    readonly updatedAt: FieldRef<"Sale", 'DateTime'>
    readonly productId: FieldRef<"Sale", 'String'>
    readonly batchId: FieldRef<"Sale", 'String'>
    readonly companyId: FieldRef<"Sale", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
  }

  /**
   * Sale updateManyAndReturn
   */
  export type SaleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to delete.
     */
    limit?: number
  }

  /**
   * Sale.refunds
   */
  export type Sale$refundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    where?: RefundWhereInput
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    cursor?: RefundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model Debt
   */

  export type AggregateDebt = {
    _count: DebtCountAggregateOutputType | null
    _avg: DebtAvgAggregateOutputType | null
    _sum: DebtSumAggregateOutputType | null
    _min: DebtMinAggregateOutputType | null
    _max: DebtMaxAggregateOutputType | null
  }

  export type DebtAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalAmount: number | null
    purchasePrice: number | null
  }

  export type DebtSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalAmount: number | null
    purchasePrice: number | null
  }

  export type DebtMinAggregateOutputType = {
    id: string | null
    quantity: number | null
    unitPrice: number | null
    totalAmount: number | null
    purchasePrice: number | null
    debtDate: Date | null
    customerName: string | null
    notes: string | null
    status: string | null
    paidDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    productId: string | null
    batchId: string | null
    companyId: string | null
  }

  export type DebtMaxAggregateOutputType = {
    id: string | null
    quantity: number | null
    unitPrice: number | null
    totalAmount: number | null
    purchasePrice: number | null
    debtDate: Date | null
    customerName: string | null
    notes: string | null
    status: string | null
    paidDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    productId: string | null
    batchId: string | null
    companyId: string | null
  }

  export type DebtCountAggregateOutputType = {
    id: number
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: number
    customerName: number
    notes: number
    status: number
    paidDate: number
    createdAt: number
    updatedAt: number
    productId: number
    batchId: number
    companyId: number
    _all: number
  }


  export type DebtAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalAmount?: true
    purchasePrice?: true
  }

  export type DebtSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalAmount?: true
    purchasePrice?: true
  }

  export type DebtMinAggregateInputType = {
    id?: true
    quantity?: true
    unitPrice?: true
    totalAmount?: true
    purchasePrice?: true
    debtDate?: true
    customerName?: true
    notes?: true
    status?: true
    paidDate?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    batchId?: true
    companyId?: true
  }

  export type DebtMaxAggregateInputType = {
    id?: true
    quantity?: true
    unitPrice?: true
    totalAmount?: true
    purchasePrice?: true
    debtDate?: true
    customerName?: true
    notes?: true
    status?: true
    paidDate?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    batchId?: true
    companyId?: true
  }

  export type DebtCountAggregateInputType = {
    id?: true
    quantity?: true
    unitPrice?: true
    totalAmount?: true
    purchasePrice?: true
    debtDate?: true
    customerName?: true
    notes?: true
    status?: true
    paidDate?: true
    createdAt?: true
    updatedAt?: true
    productId?: true
    batchId?: true
    companyId?: true
    _all?: true
  }

  export type DebtAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Debt to aggregate.
     */
    where?: DebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debts to fetch.
     */
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Debts
    **/
    _count?: true | DebtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DebtAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DebtSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DebtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DebtMaxAggregateInputType
  }

  export type GetDebtAggregateType<T extends DebtAggregateArgs> = {
        [P in keyof T & keyof AggregateDebt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDebt[P]>
      : GetScalarType<T[P], AggregateDebt[P]>
  }




  export type DebtGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtWhereInput
    orderBy?: DebtOrderByWithAggregationInput | DebtOrderByWithAggregationInput[]
    by: DebtScalarFieldEnum[] | DebtScalarFieldEnum
    having?: DebtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DebtCountAggregateInputType | true
    _avg?: DebtAvgAggregateInputType
    _sum?: DebtSumAggregateInputType
    _min?: DebtMinAggregateInputType
    _max?: DebtMaxAggregateInputType
  }

  export type DebtGroupByOutputType = {
    id: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date
    customerName: string | null
    notes: string | null
    status: string
    paidDate: Date | null
    createdAt: Date
    updatedAt: Date
    productId: string
    batchId: string
    companyId: string
    _count: DebtCountAggregateOutputType | null
    _avg: DebtAvgAggregateOutputType | null
    _sum: DebtSumAggregateOutputType | null
    _min: DebtMinAggregateOutputType | null
    _max: DebtMaxAggregateOutputType | null
  }

  type GetDebtGroupByPayload<T extends DebtGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DebtGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DebtGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DebtGroupByOutputType[P]>
            : GetScalarType<T[P], DebtGroupByOutputType[P]>
        }
      >
    >


  export type DebtSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalAmount?: boolean
    purchasePrice?: boolean
    debtDate?: boolean
    customerName?: boolean
    notes?: boolean
    status?: boolean
    paidDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debt"]>

  export type DebtSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalAmount?: boolean
    purchasePrice?: boolean
    debtDate?: boolean
    customerName?: boolean
    notes?: boolean
    status?: boolean
    paidDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debt"]>

  export type DebtSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalAmount?: boolean
    purchasePrice?: boolean
    debtDate?: boolean
    customerName?: boolean
    notes?: boolean
    status?: boolean
    paidDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debt"]>

  export type DebtSelectScalar = {
    id?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalAmount?: boolean
    purchasePrice?: boolean
    debtDate?: boolean
    customerName?: boolean
    notes?: boolean
    status?: boolean
    paidDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productId?: boolean
    batchId?: boolean
    companyId?: boolean
  }

  export type DebtOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantity" | "unitPrice" | "totalAmount" | "purchasePrice" | "debtDate" | "customerName" | "notes" | "status" | "paidDate" | "createdAt" | "updatedAt" | "productId" | "batchId" | "companyId", ExtArgs["result"]["debt"]>
  export type DebtInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type DebtIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type DebtIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $DebtPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Debt"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      batch: Prisma.$BatchPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantity: number
      unitPrice: number
      totalAmount: number
      purchasePrice: number
      debtDate: Date
      customerName: string | null
      notes: string | null
      status: string
      paidDate: Date | null
      createdAt: Date
      updatedAt: Date
      productId: string
      batchId: string
      companyId: string
    }, ExtArgs["result"]["debt"]>
    composites: {}
  }

  type DebtGetPayload<S extends boolean | null | undefined | DebtDefaultArgs> = $Result.GetResult<Prisma.$DebtPayload, S>

  type DebtCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DebtFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DebtCountAggregateInputType | true
    }

  export interface DebtDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Debt'], meta: { name: 'Debt' } }
    /**
     * Find zero or one Debt that matches the filter.
     * @param {DebtFindUniqueArgs} args - Arguments to find a Debt
     * @example
     * // Get one Debt
     * const debt = await prisma.debt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DebtFindUniqueArgs>(args: SelectSubset<T, DebtFindUniqueArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Debt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DebtFindUniqueOrThrowArgs} args - Arguments to find a Debt
     * @example
     * // Get one Debt
     * const debt = await prisma.debt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DebtFindUniqueOrThrowArgs>(args: SelectSubset<T, DebtFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Debt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtFindFirstArgs} args - Arguments to find a Debt
     * @example
     * // Get one Debt
     * const debt = await prisma.debt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DebtFindFirstArgs>(args?: SelectSubset<T, DebtFindFirstArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Debt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtFindFirstOrThrowArgs} args - Arguments to find a Debt
     * @example
     * // Get one Debt
     * const debt = await prisma.debt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DebtFindFirstOrThrowArgs>(args?: SelectSubset<T, DebtFindFirstOrThrowArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Debts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Debts
     * const debts = await prisma.debt.findMany()
     * 
     * // Get first 10 Debts
     * const debts = await prisma.debt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const debtWithIdOnly = await prisma.debt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DebtFindManyArgs>(args?: SelectSubset<T, DebtFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Debt.
     * @param {DebtCreateArgs} args - Arguments to create a Debt.
     * @example
     * // Create one Debt
     * const Debt = await prisma.debt.create({
     *   data: {
     *     // ... data to create a Debt
     *   }
     * })
     * 
     */
    create<T extends DebtCreateArgs>(args: SelectSubset<T, DebtCreateArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Debts.
     * @param {DebtCreateManyArgs} args - Arguments to create many Debts.
     * @example
     * // Create many Debts
     * const debt = await prisma.debt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DebtCreateManyArgs>(args?: SelectSubset<T, DebtCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Debts and returns the data saved in the database.
     * @param {DebtCreateManyAndReturnArgs} args - Arguments to create many Debts.
     * @example
     * // Create many Debts
     * const debt = await prisma.debt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Debts and only return the `id`
     * const debtWithIdOnly = await prisma.debt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DebtCreateManyAndReturnArgs>(args?: SelectSubset<T, DebtCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Debt.
     * @param {DebtDeleteArgs} args - Arguments to delete one Debt.
     * @example
     * // Delete one Debt
     * const Debt = await prisma.debt.delete({
     *   where: {
     *     // ... filter to delete one Debt
     *   }
     * })
     * 
     */
    delete<T extends DebtDeleteArgs>(args: SelectSubset<T, DebtDeleteArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Debt.
     * @param {DebtUpdateArgs} args - Arguments to update one Debt.
     * @example
     * // Update one Debt
     * const debt = await prisma.debt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DebtUpdateArgs>(args: SelectSubset<T, DebtUpdateArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Debts.
     * @param {DebtDeleteManyArgs} args - Arguments to filter Debts to delete.
     * @example
     * // Delete a few Debts
     * const { count } = await prisma.debt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DebtDeleteManyArgs>(args?: SelectSubset<T, DebtDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Debts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Debts
     * const debt = await prisma.debt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DebtUpdateManyArgs>(args: SelectSubset<T, DebtUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Debts and returns the data updated in the database.
     * @param {DebtUpdateManyAndReturnArgs} args - Arguments to update many Debts.
     * @example
     * // Update many Debts
     * const debt = await prisma.debt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Debts and only return the `id`
     * const debtWithIdOnly = await prisma.debt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DebtUpdateManyAndReturnArgs>(args: SelectSubset<T, DebtUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Debt.
     * @param {DebtUpsertArgs} args - Arguments to update or create a Debt.
     * @example
     * // Update or create a Debt
     * const debt = await prisma.debt.upsert({
     *   create: {
     *     // ... data to create a Debt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Debt we want to update
     *   }
     * })
     */
    upsert<T extends DebtUpsertArgs>(args: SelectSubset<T, DebtUpsertArgs<ExtArgs>>): Prisma__DebtClient<$Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Debts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtCountArgs} args - Arguments to filter Debts to count.
     * @example
     * // Count the number of Debts
     * const count = await prisma.debt.count({
     *   where: {
     *     // ... the filter for the Debts we want to count
     *   }
     * })
    **/
    count<T extends DebtCountArgs>(
      args?: Subset<T, DebtCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DebtCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Debt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DebtAggregateArgs>(args: Subset<T, DebtAggregateArgs>): Prisma.PrismaPromise<GetDebtAggregateType<T>>

    /**
     * Group by Debt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DebtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DebtGroupByArgs['orderBy'] }
        : { orderBy?: DebtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DebtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Debt model
   */
  readonly fields: DebtFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Debt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DebtClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Debt model
   */
  interface DebtFieldRefs {
    readonly id: FieldRef<"Debt", 'String'>
    readonly quantity: FieldRef<"Debt", 'Int'>
    readonly unitPrice: FieldRef<"Debt", 'Float'>
    readonly totalAmount: FieldRef<"Debt", 'Float'>
    readonly purchasePrice: FieldRef<"Debt", 'Float'>
    readonly debtDate: FieldRef<"Debt", 'DateTime'>
    readonly customerName: FieldRef<"Debt", 'String'>
    readonly notes: FieldRef<"Debt", 'String'>
    readonly status: FieldRef<"Debt", 'String'>
    readonly paidDate: FieldRef<"Debt", 'DateTime'>
    readonly createdAt: FieldRef<"Debt", 'DateTime'>
    readonly updatedAt: FieldRef<"Debt", 'DateTime'>
    readonly productId: FieldRef<"Debt", 'String'>
    readonly batchId: FieldRef<"Debt", 'String'>
    readonly companyId: FieldRef<"Debt", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Debt findUnique
   */
  export type DebtFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * Filter, which Debt to fetch.
     */
    where: DebtWhereUniqueInput
  }

  /**
   * Debt findUniqueOrThrow
   */
  export type DebtFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * Filter, which Debt to fetch.
     */
    where: DebtWhereUniqueInput
  }

  /**
   * Debt findFirst
   */
  export type DebtFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * Filter, which Debt to fetch.
     */
    where?: DebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debts to fetch.
     */
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Debts.
     */
    cursor?: DebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Debts.
     */
    distinct?: DebtScalarFieldEnum | DebtScalarFieldEnum[]
  }

  /**
   * Debt findFirstOrThrow
   */
  export type DebtFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * Filter, which Debt to fetch.
     */
    where?: DebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debts to fetch.
     */
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Debts.
     */
    cursor?: DebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Debts.
     */
    distinct?: DebtScalarFieldEnum | DebtScalarFieldEnum[]
  }

  /**
   * Debt findMany
   */
  export type DebtFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * Filter, which Debts to fetch.
     */
    where?: DebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Debts to fetch.
     */
    orderBy?: DebtOrderByWithRelationInput | DebtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Debts.
     */
    cursor?: DebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Debts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Debts.
     */
    skip?: number
    distinct?: DebtScalarFieldEnum | DebtScalarFieldEnum[]
  }

  /**
   * Debt create
   */
  export type DebtCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * The data needed to create a Debt.
     */
    data: XOR<DebtCreateInput, DebtUncheckedCreateInput>
  }

  /**
   * Debt createMany
   */
  export type DebtCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Debts.
     */
    data: DebtCreateManyInput | DebtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Debt createManyAndReturn
   */
  export type DebtCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * The data used to create many Debts.
     */
    data: DebtCreateManyInput | DebtCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Debt update
   */
  export type DebtUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * The data needed to update a Debt.
     */
    data: XOR<DebtUpdateInput, DebtUncheckedUpdateInput>
    /**
     * Choose, which Debt to update.
     */
    where: DebtWhereUniqueInput
  }

  /**
   * Debt updateMany
   */
  export type DebtUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Debts.
     */
    data: XOR<DebtUpdateManyMutationInput, DebtUncheckedUpdateManyInput>
    /**
     * Filter which Debts to update
     */
    where?: DebtWhereInput
    /**
     * Limit how many Debts to update.
     */
    limit?: number
  }

  /**
   * Debt updateManyAndReturn
   */
  export type DebtUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * The data used to update Debts.
     */
    data: XOR<DebtUpdateManyMutationInput, DebtUncheckedUpdateManyInput>
    /**
     * Filter which Debts to update
     */
    where?: DebtWhereInput
    /**
     * Limit how many Debts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Debt upsert
   */
  export type DebtUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * The filter to search for the Debt to update in case it exists.
     */
    where: DebtWhereUniqueInput
    /**
     * In case the Debt found by the `where` argument doesn't exist, create a new Debt with this data.
     */
    create: XOR<DebtCreateInput, DebtUncheckedCreateInput>
    /**
     * In case the Debt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DebtUpdateInput, DebtUncheckedUpdateInput>
  }

  /**
   * Debt delete
   */
  export type DebtDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
    /**
     * Filter which Debt to delete.
     */
    where: DebtWhereUniqueInput
  }

  /**
   * Debt deleteMany
   */
  export type DebtDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Debts to delete
     */
    where?: DebtWhereInput
    /**
     * Limit how many Debts to delete.
     */
    limit?: number
  }

  /**
   * Debt without action
   */
  export type DebtDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Debt
     */
    select?: DebtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Debt
     */
    omit?: DebtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyReport
   */

  export type AggregateMonthlyReport = {
    _count: MonthlyReportCountAggregateOutputType | null
    _avg: MonthlyReportAvgAggregateOutputType | null
    _sum: MonthlyReportSumAggregateOutputType | null
    _min: MonthlyReportMinAggregateOutputType | null
    _max: MonthlyReportMaxAggregateOutputType | null
  }

  export type MonthlyReportAvgAggregateOutputType = {
    year: number | null
    month: number | null
    totalSales: number | null
    totalProfit: number | null
    averageProfitMargin: number | null
  }

  export type MonthlyReportSumAggregateOutputType = {
    year: number | null
    month: number | null
    totalSales: number | null
    totalProfit: number | null
    averageProfitMargin: number | null
  }

  export type MonthlyReportMinAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    totalSales: number | null
    totalProfit: number | null
    averageProfitMargin: number | null
    isFinalized: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    companyId: string | null
  }

  export type MonthlyReportMaxAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    totalSales: number | null
    totalProfit: number | null
    averageProfitMargin: number | null
    isFinalized: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    companyId: string | null
  }

  export type MonthlyReportCountAggregateOutputType = {
    id: number
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized: number
    reportData: number
    createdAt: number
    updatedAt: number
    companyId: number
    _all: number
  }


  export type MonthlyReportAvgAggregateInputType = {
    year?: true
    month?: true
    totalSales?: true
    totalProfit?: true
    averageProfitMargin?: true
  }

  export type MonthlyReportSumAggregateInputType = {
    year?: true
    month?: true
    totalSales?: true
    totalProfit?: true
    averageProfitMargin?: true
  }

  export type MonthlyReportMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    totalSales?: true
    totalProfit?: true
    averageProfitMargin?: true
    isFinalized?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
  }

  export type MonthlyReportMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    totalSales?: true
    totalProfit?: true
    averageProfitMargin?: true
    isFinalized?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
  }

  export type MonthlyReportCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    totalSales?: true
    totalProfit?: true
    averageProfitMargin?: true
    isFinalized?: true
    reportData?: true
    createdAt?: true
    updatedAt?: true
    companyId?: true
    _all?: true
  }

  export type MonthlyReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyReport to aggregate.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyReports
    **/
    _count?: true | MonthlyReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyReportMaxAggregateInputType
  }

  export type GetMonthlyReportAggregateType<T extends MonthlyReportAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyReport[P]>
      : GetScalarType<T[P], AggregateMonthlyReport[P]>
  }




  export type MonthlyReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyReportWhereInput
    orderBy?: MonthlyReportOrderByWithAggregationInput | MonthlyReportOrderByWithAggregationInput[]
    by: MonthlyReportScalarFieldEnum[] | MonthlyReportScalarFieldEnum
    having?: MonthlyReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyReportCountAggregateInputType | true
    _avg?: MonthlyReportAvgAggregateInputType
    _sum?: MonthlyReportSumAggregateInputType
    _min?: MonthlyReportMinAggregateInputType
    _max?: MonthlyReportMaxAggregateInputType
  }

  export type MonthlyReportGroupByOutputType = {
    id: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized: boolean
    reportData: JsonValue
    createdAt: Date
    updatedAt: Date
    companyId: string
    _count: MonthlyReportCountAggregateOutputType | null
    _avg: MonthlyReportAvgAggregateOutputType | null
    _sum: MonthlyReportSumAggregateOutputType | null
    _min: MonthlyReportMinAggregateOutputType | null
    _max: MonthlyReportMaxAggregateOutputType | null
  }

  type GetMonthlyReportGroupByPayload<T extends MonthlyReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyReportGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyReportGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    totalSales?: boolean
    totalProfit?: boolean
    averageProfitMargin?: boolean
    isFinalized?: boolean
    reportData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    totalSales?: boolean
    totalProfit?: boolean
    averageProfitMargin?: boolean
    isFinalized?: boolean
    reportData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    totalSales?: boolean
    totalProfit?: boolean
    averageProfitMargin?: boolean
    isFinalized?: boolean
    reportData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    totalSales?: boolean
    totalProfit?: boolean
    averageProfitMargin?: boolean
    isFinalized?: boolean
    reportData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyId?: boolean
  }

  export type MonthlyReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "totalSales" | "totalProfit" | "averageProfitMargin" | "isFinalized" | "reportData" | "createdAt" | "updatedAt" | "companyId", ExtArgs["result"]["monthlyReport"]>
  export type MonthlyReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type MonthlyReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type MonthlyReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $MonthlyReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyReport"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      month: number
      totalSales: number
      totalProfit: number
      averageProfitMargin: number
      isFinalized: boolean
      reportData: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      companyId: string
    }, ExtArgs["result"]["monthlyReport"]>
    composites: {}
  }

  type MonthlyReportGetPayload<S extends boolean | null | undefined | MonthlyReportDefaultArgs> = $Result.GetResult<Prisma.$MonthlyReportPayload, S>

  type MonthlyReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyReportCountAggregateInputType | true
    }

  export interface MonthlyReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyReport'], meta: { name: 'MonthlyReport' } }
    /**
     * Find zero or one MonthlyReport that matches the filter.
     * @param {MonthlyReportFindUniqueArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyReportFindUniqueArgs>(args: SelectSubset<T, MonthlyReportFindUniqueArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyReportFindUniqueOrThrowArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyReportFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindFirstArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyReportFindFirstArgs>(args?: SelectSubset<T, MonthlyReportFindFirstArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindFirstOrThrowArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyReportFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyReports
     * const monthlyReports = await prisma.monthlyReport.findMany()
     * 
     * // Get first 10 MonthlyReports
     * const monthlyReports = await prisma.monthlyReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyReportFindManyArgs>(args?: SelectSubset<T, MonthlyReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyReport.
     * @param {MonthlyReportCreateArgs} args - Arguments to create a MonthlyReport.
     * @example
     * // Create one MonthlyReport
     * const MonthlyReport = await prisma.monthlyReport.create({
     *   data: {
     *     // ... data to create a MonthlyReport
     *   }
     * })
     * 
     */
    create<T extends MonthlyReportCreateArgs>(args: SelectSubset<T, MonthlyReportCreateArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyReports.
     * @param {MonthlyReportCreateManyArgs} args - Arguments to create many MonthlyReports.
     * @example
     * // Create many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyReportCreateManyArgs>(args?: SelectSubset<T, MonthlyReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyReports and returns the data saved in the database.
     * @param {MonthlyReportCreateManyAndReturnArgs} args - Arguments to create many MonthlyReports.
     * @example
     * // Create many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyReports and only return the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyReportCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyReport.
     * @param {MonthlyReportDeleteArgs} args - Arguments to delete one MonthlyReport.
     * @example
     * // Delete one MonthlyReport
     * const MonthlyReport = await prisma.monthlyReport.delete({
     *   where: {
     *     // ... filter to delete one MonthlyReport
     *   }
     * })
     * 
     */
    delete<T extends MonthlyReportDeleteArgs>(args: SelectSubset<T, MonthlyReportDeleteArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyReport.
     * @param {MonthlyReportUpdateArgs} args - Arguments to update one MonthlyReport.
     * @example
     * // Update one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyReportUpdateArgs>(args: SelectSubset<T, MonthlyReportUpdateArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyReports.
     * @param {MonthlyReportDeleteManyArgs} args - Arguments to filter MonthlyReports to delete.
     * @example
     * // Delete a few MonthlyReports
     * const { count } = await prisma.monthlyReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyReportDeleteManyArgs>(args?: SelectSubset<T, MonthlyReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyReportUpdateManyArgs>(args: SelectSubset<T, MonthlyReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyReports and returns the data updated in the database.
     * @param {MonthlyReportUpdateManyAndReturnArgs} args - Arguments to update many MonthlyReports.
     * @example
     * // Update many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyReports and only return the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyReportUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyReport.
     * @param {MonthlyReportUpsertArgs} args - Arguments to update or create a MonthlyReport.
     * @example
     * // Update or create a MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.upsert({
     *   create: {
     *     // ... data to create a MonthlyReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyReport we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyReportUpsertArgs>(args: SelectSubset<T, MonthlyReportUpsertArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportCountArgs} args - Arguments to filter MonthlyReports to count.
     * @example
     * // Count the number of MonthlyReports
     * const count = await prisma.monthlyReport.count({
     *   where: {
     *     // ... the filter for the MonthlyReports we want to count
     *   }
     * })
    **/
    count<T extends MonthlyReportCountArgs>(
      args?: Subset<T, MonthlyReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyReportAggregateArgs>(args: Subset<T, MonthlyReportAggregateArgs>): Prisma.PrismaPromise<GetMonthlyReportAggregateType<T>>

    /**
     * Group by MonthlyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyReportGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyReport model
   */
  readonly fields: MonthlyReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyReport model
   */
  interface MonthlyReportFieldRefs {
    readonly id: FieldRef<"MonthlyReport", 'String'>
    readonly year: FieldRef<"MonthlyReport", 'Int'>
    readonly month: FieldRef<"MonthlyReport", 'Int'>
    readonly totalSales: FieldRef<"MonthlyReport", 'Float'>
    readonly totalProfit: FieldRef<"MonthlyReport", 'Float'>
    readonly averageProfitMargin: FieldRef<"MonthlyReport", 'Float'>
    readonly isFinalized: FieldRef<"MonthlyReport", 'Boolean'>
    readonly reportData: FieldRef<"MonthlyReport", 'Json'>
    readonly createdAt: FieldRef<"MonthlyReport", 'DateTime'>
    readonly updatedAt: FieldRef<"MonthlyReport", 'DateTime'>
    readonly companyId: FieldRef<"MonthlyReport", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyReport findUnique
   */
  export type MonthlyReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport findUniqueOrThrow
   */
  export type MonthlyReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport findFirst
   */
  export type MonthlyReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport findFirstOrThrow
   */
  export type MonthlyReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport findMany
   */
  export type MonthlyReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReports to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport create
   */
  export type MonthlyReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyReport.
     */
    data: XOR<MonthlyReportCreateInput, MonthlyReportUncheckedCreateInput>
  }

  /**
   * MonthlyReport createMany
   */
  export type MonthlyReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyReports.
     */
    data: MonthlyReportCreateManyInput | MonthlyReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyReport createManyAndReturn
   */
  export type MonthlyReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyReports.
     */
    data: MonthlyReportCreateManyInput | MonthlyReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyReport update
   */
  export type MonthlyReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyReport.
     */
    data: XOR<MonthlyReportUpdateInput, MonthlyReportUncheckedUpdateInput>
    /**
     * Choose, which MonthlyReport to update.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport updateMany
   */
  export type MonthlyReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyReports.
     */
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyReports to update
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to update.
     */
    limit?: number
  }

  /**
   * MonthlyReport updateManyAndReturn
   */
  export type MonthlyReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyReports.
     */
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyReports to update
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyReport upsert
   */
  export type MonthlyReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyReport to update in case it exists.
     */
    where: MonthlyReportWhereUniqueInput
    /**
     * In case the MonthlyReport found by the `where` argument doesn't exist, create a new MonthlyReport with this data.
     */
    create: XOR<MonthlyReportCreateInput, MonthlyReportUncheckedCreateInput>
    /**
     * In case the MonthlyReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyReportUpdateInput, MonthlyReportUncheckedUpdateInput>
  }

  /**
   * MonthlyReport delete
   */
  export type MonthlyReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter which MonthlyReport to delete.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport deleteMany
   */
  export type MonthlyReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyReports to delete
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to delete.
     */
    limit?: number
  }

  /**
   * MonthlyReport without action
   */
  export type MonthlyReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Refund
   */

  export type AggregateRefund = {
    _count: RefundCountAggregateOutputType | null
    _avg: RefundAvgAggregateOutputType | null
    _sum: RefundSumAggregateOutputType | null
    _min: RefundMinAggregateOutputType | null
    _max: RefundMaxAggregateOutputType | null
  }

  export type RefundAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
    totalRefundAmount: Decimal | null
  }

  export type RefundSumAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
    totalRefundAmount: Decimal | null
  }

  export type RefundMinAggregateOutputType = {
    id: string | null
    refundNumber: string | null
    originalSaleId: string | null
    productId: string | null
    batchId: string | null
    quantity: number | null
    unitPrice: Decimal | null
    totalRefundAmount: Decimal | null
    refundType: $Enums.RefundType | null
    reason: $Enums.RefundReason | null
    customReason: string | null
    refundDate: Date | null
    processedBy: string | null
    itemCondition: $Enums.ItemCondition | null
    returnToInventory: boolean | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefundMaxAggregateOutputType = {
    id: string | null
    refundNumber: string | null
    originalSaleId: string | null
    productId: string | null
    batchId: string | null
    quantity: number | null
    unitPrice: Decimal | null
    totalRefundAmount: Decimal | null
    refundType: $Enums.RefundType | null
    reason: $Enums.RefundReason | null
    customReason: string | null
    refundDate: Date | null
    processedBy: string | null
    itemCondition: $Enums.ItemCondition | null
    returnToInventory: boolean | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefundCountAggregateOutputType = {
    id: number
    refundNumber: number
    originalSaleId: number
    productId: number
    batchId: number
    quantity: number
    unitPrice: number
    totalRefundAmount: number
    refundType: number
    reason: number
    customReason: number
    refundDate: number
    processedBy: number
    itemCondition: number
    returnToInventory: number
    companyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RefundAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalRefundAmount?: true
  }

  export type RefundSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalRefundAmount?: true
  }

  export type RefundMinAggregateInputType = {
    id?: true
    refundNumber?: true
    originalSaleId?: true
    productId?: true
    batchId?: true
    quantity?: true
    unitPrice?: true
    totalRefundAmount?: true
    refundType?: true
    reason?: true
    customReason?: true
    refundDate?: true
    processedBy?: true
    itemCondition?: true
    returnToInventory?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefundMaxAggregateInputType = {
    id?: true
    refundNumber?: true
    originalSaleId?: true
    productId?: true
    batchId?: true
    quantity?: true
    unitPrice?: true
    totalRefundAmount?: true
    refundType?: true
    reason?: true
    customReason?: true
    refundDate?: true
    processedBy?: true
    itemCondition?: true
    returnToInventory?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefundCountAggregateInputType = {
    id?: true
    refundNumber?: true
    originalSaleId?: true
    productId?: true
    batchId?: true
    quantity?: true
    unitPrice?: true
    totalRefundAmount?: true
    refundType?: true
    reason?: true
    customReason?: true
    refundDate?: true
    processedBy?: true
    itemCondition?: true
    returnToInventory?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RefundAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Refund to aggregate.
     */
    where?: RefundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Refunds
    **/
    _count?: true | RefundCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefundAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefundSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefundMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefundMaxAggregateInputType
  }

  export type GetRefundAggregateType<T extends RefundAggregateArgs> = {
        [P in keyof T & keyof AggregateRefund]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefund[P]>
      : GetScalarType<T[P], AggregateRefund[P]>
  }




  export type RefundGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundWhereInput
    orderBy?: RefundOrderByWithAggregationInput | RefundOrderByWithAggregationInput[]
    by: RefundScalarFieldEnum[] | RefundScalarFieldEnum
    having?: RefundScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefundCountAggregateInputType | true
    _avg?: RefundAvgAggregateInputType
    _sum?: RefundSumAggregateInputType
    _min?: RefundMinAggregateInputType
    _max?: RefundMaxAggregateInputType
  }

  export type RefundGroupByOutputType = {
    id: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal
    totalRefundAmount: Decimal
    refundType: $Enums.RefundType
    reason: $Enums.RefundReason
    customReason: string | null
    refundDate: Date
    processedBy: string
    itemCondition: $Enums.ItemCondition
    returnToInventory: boolean
    companyId: string
    createdAt: Date
    updatedAt: Date
    _count: RefundCountAggregateOutputType | null
    _avg: RefundAvgAggregateOutputType | null
    _sum: RefundSumAggregateOutputType | null
    _min: RefundMinAggregateOutputType | null
    _max: RefundMaxAggregateOutputType | null
  }

  type GetRefundGroupByPayload<T extends RefundGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefundGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefundGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefundGroupByOutputType[P]>
            : GetScalarType<T[P], RefundGroupByOutputType[P]>
        }
      >
    >


  export type RefundSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refundNumber?: boolean
    originalSaleId?: boolean
    productId?: boolean
    batchId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalRefundAmount?: boolean
    refundType?: boolean
    reason?: boolean
    customReason?: boolean
    refundDate?: boolean
    processedBy?: boolean
    itemCondition?: boolean
    returnToInventory?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    originalSale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    processedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refund"]>

  export type RefundSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refundNumber?: boolean
    originalSaleId?: boolean
    productId?: boolean
    batchId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalRefundAmount?: boolean
    refundType?: boolean
    reason?: boolean
    customReason?: boolean
    refundDate?: boolean
    processedBy?: boolean
    itemCondition?: boolean
    returnToInventory?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    originalSale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    processedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refund"]>

  export type RefundSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refundNumber?: boolean
    originalSaleId?: boolean
    productId?: boolean
    batchId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalRefundAmount?: boolean
    refundType?: boolean
    reason?: boolean
    customReason?: boolean
    refundDate?: boolean
    processedBy?: boolean
    itemCondition?: boolean
    returnToInventory?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    originalSale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    processedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refund"]>

  export type RefundSelectScalar = {
    id?: boolean
    refundNumber?: boolean
    originalSaleId?: boolean
    productId?: boolean
    batchId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalRefundAmount?: boolean
    refundType?: boolean
    reason?: boolean
    customReason?: boolean
    refundDate?: boolean
    processedBy?: boolean
    itemCondition?: boolean
    returnToInventory?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RefundOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "refundNumber" | "originalSaleId" | "productId" | "batchId" | "quantity" | "unitPrice" | "totalRefundAmount" | "refundType" | "reason" | "customReason" | "refundDate" | "processedBy" | "itemCondition" | "returnToInventory" | "companyId" | "createdAt" | "updatedAt", ExtArgs["result"]["refund"]>
  export type RefundInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalSale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    processedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefundIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalSale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    processedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefundIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalSale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    processedByUser?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefundPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Refund"
    objects: {
      originalSale: Prisma.$SalePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
      batch: Prisma.$BatchPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
      processedByUser: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      refundNumber: string
      originalSaleId: string
      productId: string
      batchId: string
      quantity: number
      unitPrice: Prisma.Decimal
      totalRefundAmount: Prisma.Decimal
      refundType: $Enums.RefundType
      reason: $Enums.RefundReason
      customReason: string | null
      refundDate: Date
      processedBy: string
      itemCondition: $Enums.ItemCondition
      returnToInventory: boolean
      companyId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["refund"]>
    composites: {}
  }

  type RefundGetPayload<S extends boolean | null | undefined | RefundDefaultArgs> = $Result.GetResult<Prisma.$RefundPayload, S>

  type RefundCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefundFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefundCountAggregateInputType | true
    }

  export interface RefundDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Refund'], meta: { name: 'Refund' } }
    /**
     * Find zero or one Refund that matches the filter.
     * @param {RefundFindUniqueArgs} args - Arguments to find a Refund
     * @example
     * // Get one Refund
     * const refund = await prisma.refund.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefundFindUniqueArgs>(args: SelectSubset<T, RefundFindUniqueArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Refund that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefundFindUniqueOrThrowArgs} args - Arguments to find a Refund
     * @example
     * // Get one Refund
     * const refund = await prisma.refund.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefundFindUniqueOrThrowArgs>(args: SelectSubset<T, RefundFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refund that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundFindFirstArgs} args - Arguments to find a Refund
     * @example
     * // Get one Refund
     * const refund = await prisma.refund.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefundFindFirstArgs>(args?: SelectSubset<T, RefundFindFirstArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refund that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundFindFirstOrThrowArgs} args - Arguments to find a Refund
     * @example
     * // Get one Refund
     * const refund = await prisma.refund.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefundFindFirstOrThrowArgs>(args?: SelectSubset<T, RefundFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Refunds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Refunds
     * const refunds = await prisma.refund.findMany()
     * 
     * // Get first 10 Refunds
     * const refunds = await prisma.refund.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refundWithIdOnly = await prisma.refund.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefundFindManyArgs>(args?: SelectSubset<T, RefundFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Refund.
     * @param {RefundCreateArgs} args - Arguments to create a Refund.
     * @example
     * // Create one Refund
     * const Refund = await prisma.refund.create({
     *   data: {
     *     // ... data to create a Refund
     *   }
     * })
     * 
     */
    create<T extends RefundCreateArgs>(args: SelectSubset<T, RefundCreateArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Refunds.
     * @param {RefundCreateManyArgs} args - Arguments to create many Refunds.
     * @example
     * // Create many Refunds
     * const refund = await prisma.refund.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefundCreateManyArgs>(args?: SelectSubset<T, RefundCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Refunds and returns the data saved in the database.
     * @param {RefundCreateManyAndReturnArgs} args - Arguments to create many Refunds.
     * @example
     * // Create many Refunds
     * const refund = await prisma.refund.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Refunds and only return the `id`
     * const refundWithIdOnly = await prisma.refund.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefundCreateManyAndReturnArgs>(args?: SelectSubset<T, RefundCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Refund.
     * @param {RefundDeleteArgs} args - Arguments to delete one Refund.
     * @example
     * // Delete one Refund
     * const Refund = await prisma.refund.delete({
     *   where: {
     *     // ... filter to delete one Refund
     *   }
     * })
     * 
     */
    delete<T extends RefundDeleteArgs>(args: SelectSubset<T, RefundDeleteArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Refund.
     * @param {RefundUpdateArgs} args - Arguments to update one Refund.
     * @example
     * // Update one Refund
     * const refund = await prisma.refund.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefundUpdateArgs>(args: SelectSubset<T, RefundUpdateArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Refunds.
     * @param {RefundDeleteManyArgs} args - Arguments to filter Refunds to delete.
     * @example
     * // Delete a few Refunds
     * const { count } = await prisma.refund.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefundDeleteManyArgs>(args?: SelectSubset<T, RefundDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refunds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Refunds
     * const refund = await prisma.refund.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefundUpdateManyArgs>(args: SelectSubset<T, RefundUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refunds and returns the data updated in the database.
     * @param {RefundUpdateManyAndReturnArgs} args - Arguments to update many Refunds.
     * @example
     * // Update many Refunds
     * const refund = await prisma.refund.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Refunds and only return the `id`
     * const refundWithIdOnly = await prisma.refund.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefundUpdateManyAndReturnArgs>(args: SelectSubset<T, RefundUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Refund.
     * @param {RefundUpsertArgs} args - Arguments to update or create a Refund.
     * @example
     * // Update or create a Refund
     * const refund = await prisma.refund.upsert({
     *   create: {
     *     // ... data to create a Refund
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Refund we want to update
     *   }
     * })
     */
    upsert<T extends RefundUpsertArgs>(args: SelectSubset<T, RefundUpsertArgs<ExtArgs>>): Prisma__RefundClient<$Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Refunds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundCountArgs} args - Arguments to filter Refunds to count.
     * @example
     * // Count the number of Refunds
     * const count = await prisma.refund.count({
     *   where: {
     *     // ... the filter for the Refunds we want to count
     *   }
     * })
    **/
    count<T extends RefundCountArgs>(
      args?: Subset<T, RefundCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefundCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Refund.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefundAggregateArgs>(args: Subset<T, RefundAggregateArgs>): Prisma.PrismaPromise<GetRefundAggregateType<T>>

    /**
     * Group by Refund.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefundGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefundGroupByArgs['orderBy'] }
        : { orderBy?: RefundGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefundGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Refund model
   */
  readonly fields: RefundFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Refund.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefundClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    originalSale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    processedByUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Refund model
   */
  interface RefundFieldRefs {
    readonly id: FieldRef<"Refund", 'String'>
    readonly refundNumber: FieldRef<"Refund", 'String'>
    readonly originalSaleId: FieldRef<"Refund", 'String'>
    readonly productId: FieldRef<"Refund", 'String'>
    readonly batchId: FieldRef<"Refund", 'String'>
    readonly quantity: FieldRef<"Refund", 'Int'>
    readonly unitPrice: FieldRef<"Refund", 'Decimal'>
    readonly totalRefundAmount: FieldRef<"Refund", 'Decimal'>
    readonly refundType: FieldRef<"Refund", 'RefundType'>
    readonly reason: FieldRef<"Refund", 'RefundReason'>
    readonly customReason: FieldRef<"Refund", 'String'>
    readonly refundDate: FieldRef<"Refund", 'DateTime'>
    readonly processedBy: FieldRef<"Refund", 'String'>
    readonly itemCondition: FieldRef<"Refund", 'ItemCondition'>
    readonly returnToInventory: FieldRef<"Refund", 'Boolean'>
    readonly companyId: FieldRef<"Refund", 'String'>
    readonly createdAt: FieldRef<"Refund", 'DateTime'>
    readonly updatedAt: FieldRef<"Refund", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Refund findUnique
   */
  export type RefundFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * Filter, which Refund to fetch.
     */
    where: RefundWhereUniqueInput
  }

  /**
   * Refund findUniqueOrThrow
   */
  export type RefundFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * Filter, which Refund to fetch.
     */
    where: RefundWhereUniqueInput
  }

  /**
   * Refund findFirst
   */
  export type RefundFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * Filter, which Refund to fetch.
     */
    where?: RefundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Refunds.
     */
    cursor?: RefundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Refunds.
     */
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Refund findFirstOrThrow
   */
  export type RefundFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * Filter, which Refund to fetch.
     */
    where?: RefundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Refunds.
     */
    cursor?: RefundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Refunds.
     */
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Refund findMany
   */
  export type RefundFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * Filter, which Refunds to fetch.
     */
    where?: RefundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refunds to fetch.
     */
    orderBy?: RefundOrderByWithRelationInput | RefundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Refunds.
     */
    cursor?: RefundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refunds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refunds.
     */
    skip?: number
    distinct?: RefundScalarFieldEnum | RefundScalarFieldEnum[]
  }

  /**
   * Refund create
   */
  export type RefundCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * The data needed to create a Refund.
     */
    data: XOR<RefundCreateInput, RefundUncheckedCreateInput>
  }

  /**
   * Refund createMany
   */
  export type RefundCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Refunds.
     */
    data: RefundCreateManyInput | RefundCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Refund createManyAndReturn
   */
  export type RefundCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * The data used to create many Refunds.
     */
    data: RefundCreateManyInput | RefundCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Refund update
   */
  export type RefundUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * The data needed to update a Refund.
     */
    data: XOR<RefundUpdateInput, RefundUncheckedUpdateInput>
    /**
     * Choose, which Refund to update.
     */
    where: RefundWhereUniqueInput
  }

  /**
   * Refund updateMany
   */
  export type RefundUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Refunds.
     */
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyInput>
    /**
     * Filter which Refunds to update
     */
    where?: RefundWhereInput
    /**
     * Limit how many Refunds to update.
     */
    limit?: number
  }

  /**
   * Refund updateManyAndReturn
   */
  export type RefundUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * The data used to update Refunds.
     */
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyInput>
    /**
     * Filter which Refunds to update
     */
    where?: RefundWhereInput
    /**
     * Limit how many Refunds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Refund upsert
   */
  export type RefundUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * The filter to search for the Refund to update in case it exists.
     */
    where: RefundWhereUniqueInput
    /**
     * In case the Refund found by the `where` argument doesn't exist, create a new Refund with this data.
     */
    create: XOR<RefundCreateInput, RefundUncheckedCreateInput>
    /**
     * In case the Refund was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefundUpdateInput, RefundUncheckedUpdateInput>
  }

  /**
   * Refund delete
   */
  export type RefundDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
    /**
     * Filter which Refund to delete.
     */
    where: RefundWhereUniqueInput
  }

  /**
   * Refund deleteMany
   */
  export type RefundDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Refunds to delete
     */
    where?: RefundWhereInput
    /**
     * Limit how many Refunds to delete.
     */
    limit?: number
  }

  /**
   * Refund without action
   */
  export type RefundDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: RefundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refund
     */
    omit?: RefundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    companyId: 'companyId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    companyId: 'companyId'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    name: 'name',
    description: 'description',
    sellingPrice: 'sellingPrice',
    totalStock: 'totalStock',
    minStockLevel: 'minStockLevel',
    location: 'location',
    imageUrl: 'imageUrl',
    fitment: 'fitment',
    supplier: 'supplier',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categoryId: 'categoryId',
    companyId: 'companyId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const BatchScalarFieldEnum: {
    id: 'id',
    purchaseDate: 'purchaseDate',
    purchasePrice: 'purchasePrice',
    initialQuantity: 'initialQuantity',
    currentQuantity: 'currentQuantity',
    status: 'status',
    supplier: 'supplier',
    invoiceNumber: 'invoiceNumber',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    productId: 'productId',
    companyId: 'companyId'
  };

  export type BatchScalarFieldEnum = (typeof BatchScalarFieldEnum)[keyof typeof BatchScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    quantity: 'quantity',
    salePrice: 'salePrice',
    purchasePrice: 'purchasePrice',
    profit: 'profit',
    profitMargin: 'profitMargin',
    saleDate: 'saleDate',
    customerId: 'customerId',
    invoiceNumber: 'invoiceNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    productId: 'productId',
    batchId: 'batchId',
    companyId: 'companyId'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const DebtScalarFieldEnum: {
    id: 'id',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalAmount: 'totalAmount',
    purchasePrice: 'purchasePrice',
    debtDate: 'debtDate',
    customerName: 'customerName',
    notes: 'notes',
    status: 'status',
    paidDate: 'paidDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    productId: 'productId',
    batchId: 'batchId',
    companyId: 'companyId'
  };

  export type DebtScalarFieldEnum = (typeof DebtScalarFieldEnum)[keyof typeof DebtScalarFieldEnum]


  export const MonthlyReportScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    totalSales: 'totalSales',
    totalProfit: 'totalProfit',
    averageProfitMargin: 'averageProfitMargin',
    isFinalized: 'isFinalized',
    reportData: 'reportData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    companyId: 'companyId'
  };

  export type MonthlyReportScalarFieldEnum = (typeof MonthlyReportScalarFieldEnum)[keyof typeof MonthlyReportScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const RefundScalarFieldEnum: {
    id: 'id',
    refundNumber: 'refundNumber',
    originalSaleId: 'originalSaleId',
    productId: 'productId',
    batchId: 'batchId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalRefundAmount: 'totalRefundAmount',
    refundType: 'refundType',
    reason: 'reason',
    customReason: 'customReason',
    refundDate: 'refundDate',
    processedBy: 'processedBy',
    itemCondition: 'itemCondition',
    returnToInventory: 'returnToInventory',
    companyId: 'companyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RefundScalarFieldEnum = (typeof RefundScalarFieldEnum)[keyof typeof RefundScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'RefundType'
   */
  export type EnumRefundTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundType'>
    


  /**
   * Reference to a field of type 'RefundType[]'
   */
  export type ListEnumRefundTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundType[]'>
    


  /**
   * Reference to a field of type 'RefundReason'
   */
  export type EnumRefundReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundReason'>
    


  /**
   * Reference to a field of type 'RefundReason[]'
   */
  export type ListEnumRefundReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundReason[]'>
    


  /**
   * Reference to a field of type 'ItemCondition'
   */
  export type EnumItemConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemCondition'>
    


  /**
   * Reference to a field of type 'ItemCondition[]'
   */
  export type ListEnumItemConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemCondition[]'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    categories?: CategoryListRelationFilter
    products?: ProductListRelationFilter
    batches?: BatchListRelationFilter
    sales?: SaleListRelationFilter
    debts?: DebtListRelationFilter
    refunds?: RefundListRelationFilter
    monthlyReports?: MonthlyReportListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    batches?: BatchOrderByRelationAggregateInput
    sales?: SaleOrderByRelationAggregateInput
    debts?: DebtOrderByRelationAggregateInput
    refunds?: RefundOrderByRelationAggregateInput
    monthlyReports?: MonthlyReportOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    categories?: CategoryListRelationFilter
    products?: ProductListRelationFilter
    batches?: BatchListRelationFilter
    sales?: SaleListRelationFilter
    debts?: DebtListRelationFilter
    refunds?: RefundListRelationFilter
    monthlyReports?: MonthlyReportListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    companyId?: StringFilter<"User"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    processedRefunds?: RefundListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
    company?: CompanyOrderByWithRelationInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    processedRefunds?: RefundOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    companyId?: StringFilter<"User"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    processedRefunds?: RefundListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    companyId?: StringWithAggregatesFilter<"User"> | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    color?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    companyId?: StringFilter<"Category"> | string
    products?: ProductListRelationFilter
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
    products?: ProductOrderByRelationAggregateInput
    company?: CompanyOrderByWithRelationInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_companyId?: CategoryNameCompanyIdCompoundUniqueInput
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    color?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    companyId?: StringFilter<"Category"> | string
    products?: ProductListRelationFilter
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "name_companyId">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    color?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    companyId?: StringWithAggregatesFilter<"Category"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    sellingPrice?: FloatFilter<"Product"> | number
    totalStock?: IntFilter<"Product"> | number
    minStockLevel?: IntFilter<"Product"> | number
    location?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    fitment?: StringNullableFilter<"Product"> | string | null
    supplier?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: StringFilter<"Product"> | string
    companyId?: StringFilter<"Product"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    batches?: BatchListRelationFilter
    sales?: SaleListRelationFilter
    debts?: DebtListRelationFilter
    refunds?: RefundListRelationFilter
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    fitment?: SortOrderInput | SortOrder
    supplier?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    companyId?: SortOrder
    category?: CategoryOrderByWithRelationInput
    batches?: BatchOrderByRelationAggregateInput
    sales?: SaleOrderByRelationAggregateInput
    debts?: DebtOrderByRelationAggregateInput
    refunds?: RefundOrderByRelationAggregateInput
    company?: CompanyOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    sellingPrice?: FloatFilter<"Product"> | number
    totalStock?: IntFilter<"Product"> | number
    minStockLevel?: IntFilter<"Product"> | number
    location?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    fitment?: StringNullableFilter<"Product"> | string | null
    supplier?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: StringFilter<"Product"> | string
    companyId?: StringFilter<"Product"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    batches?: BatchListRelationFilter
    sales?: SaleListRelationFilter
    debts?: DebtListRelationFilter
    refunds?: RefundListRelationFilter
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    fitment?: SortOrderInput | SortOrder
    supplier?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    companyId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    sku?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    sellingPrice?: FloatWithAggregatesFilter<"Product"> | number
    totalStock?: IntWithAggregatesFilter<"Product"> | number
    minStockLevel?: IntWithAggregatesFilter<"Product"> | number
    location?: StringNullableWithAggregatesFilter<"Product"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    fitment?: StringNullableWithAggregatesFilter<"Product"> | string | null
    supplier?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    companyId?: StringWithAggregatesFilter<"Product"> | string
  }

  export type BatchWhereInput = {
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    id?: StringFilter<"Batch"> | string
    purchaseDate?: DateTimeFilter<"Batch"> | Date | string
    purchasePrice?: FloatFilter<"Batch"> | number
    initialQuantity?: IntFilter<"Batch"> | number
    currentQuantity?: IntFilter<"Batch"> | number
    status?: StringFilter<"Batch"> | string
    supplier?: StringNullableFilter<"Batch"> | string | null
    invoiceNumber?: StringNullableFilter<"Batch"> | string | null
    notes?: StringNullableFilter<"Batch"> | string | null
    createdAt?: DateTimeFilter<"Batch"> | Date | string
    updatedAt?: DateTimeFilter<"Batch"> | Date | string
    productId?: StringFilter<"Batch"> | string
    companyId?: StringFilter<"Batch"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    sales?: SaleListRelationFilter
    debts?: DebtListRelationFilter
    refunds?: RefundListRelationFilter
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type BatchOrderByWithRelationInput = {
    id?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
    status?: SortOrder
    supplier?: SortOrderInput | SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    companyId?: SortOrder
    product?: ProductOrderByWithRelationInput
    sales?: SaleOrderByRelationAggregateInput
    debts?: DebtOrderByRelationAggregateInput
    refunds?: RefundOrderByRelationAggregateInput
    company?: CompanyOrderByWithRelationInput
  }

  export type BatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    purchaseDate?: DateTimeFilter<"Batch"> | Date | string
    purchasePrice?: FloatFilter<"Batch"> | number
    initialQuantity?: IntFilter<"Batch"> | number
    currentQuantity?: IntFilter<"Batch"> | number
    status?: StringFilter<"Batch"> | string
    supplier?: StringNullableFilter<"Batch"> | string | null
    invoiceNumber?: StringNullableFilter<"Batch"> | string | null
    notes?: StringNullableFilter<"Batch"> | string | null
    createdAt?: DateTimeFilter<"Batch"> | Date | string
    updatedAt?: DateTimeFilter<"Batch"> | Date | string
    productId?: StringFilter<"Batch"> | string
    companyId?: StringFilter<"Batch"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    sales?: SaleListRelationFilter
    debts?: DebtListRelationFilter
    refunds?: RefundListRelationFilter
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type BatchOrderByWithAggregationInput = {
    id?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
    status?: SortOrder
    supplier?: SortOrderInput | SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    companyId?: SortOrder
    _count?: BatchCountOrderByAggregateInput
    _avg?: BatchAvgOrderByAggregateInput
    _max?: BatchMaxOrderByAggregateInput
    _min?: BatchMinOrderByAggregateInput
    _sum?: BatchSumOrderByAggregateInput
  }

  export type BatchScalarWhereWithAggregatesInput = {
    AND?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    OR?: BatchScalarWhereWithAggregatesInput[]
    NOT?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Batch"> | string
    purchaseDate?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    purchasePrice?: FloatWithAggregatesFilter<"Batch"> | number
    initialQuantity?: IntWithAggregatesFilter<"Batch"> | number
    currentQuantity?: IntWithAggregatesFilter<"Batch"> | number
    status?: StringWithAggregatesFilter<"Batch"> | string
    supplier?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    invoiceNumber?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    productId?: StringWithAggregatesFilter<"Batch"> | string
    companyId?: StringWithAggregatesFilter<"Batch"> | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    quantity?: IntFilter<"Sale"> | number
    salePrice?: FloatFilter<"Sale"> | number
    purchasePrice?: FloatFilter<"Sale"> | number
    profit?: FloatFilter<"Sale"> | number
    profitMargin?: FloatFilter<"Sale"> | number
    saleDate?: DateTimeFilter<"Sale"> | Date | string
    customerId?: StringNullableFilter<"Sale"> | string | null
    invoiceNumber?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    productId?: StringFilter<"Sale"> | string
    batchId?: StringFilter<"Sale"> | string
    companyId?: StringFilter<"Sale"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    refunds?: RefundListRelationFilter
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
    saleDate?: SortOrder
    customerId?: SortOrderInput | SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
    product?: ProductOrderByWithRelationInput
    batch?: BatchOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    refunds?: RefundOrderByRelationAggregateInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    quantity?: IntFilter<"Sale"> | number
    salePrice?: FloatFilter<"Sale"> | number
    purchasePrice?: FloatFilter<"Sale"> | number
    profit?: FloatFilter<"Sale"> | number
    profitMargin?: FloatFilter<"Sale"> | number
    saleDate?: DateTimeFilter<"Sale"> | Date | string
    customerId?: StringNullableFilter<"Sale"> | string | null
    invoiceNumber?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    productId?: StringFilter<"Sale"> | string
    batchId?: StringFilter<"Sale"> | string
    companyId?: StringFilter<"Sale"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    refunds?: RefundListRelationFilter
  }, "id">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
    saleDate?: SortOrder
    customerId?: SortOrderInput | SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    quantity?: IntWithAggregatesFilter<"Sale"> | number
    salePrice?: FloatWithAggregatesFilter<"Sale"> | number
    purchasePrice?: FloatWithAggregatesFilter<"Sale"> | number
    profit?: FloatWithAggregatesFilter<"Sale"> | number
    profitMargin?: FloatWithAggregatesFilter<"Sale"> | number
    saleDate?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    customerId?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    invoiceNumber?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    productId?: StringWithAggregatesFilter<"Sale"> | string
    batchId?: StringWithAggregatesFilter<"Sale"> | string
    companyId?: StringWithAggregatesFilter<"Sale"> | string
  }

  export type DebtWhereInput = {
    AND?: DebtWhereInput | DebtWhereInput[]
    OR?: DebtWhereInput[]
    NOT?: DebtWhereInput | DebtWhereInput[]
    id?: StringFilter<"Debt"> | string
    quantity?: IntFilter<"Debt"> | number
    unitPrice?: FloatFilter<"Debt"> | number
    totalAmount?: FloatFilter<"Debt"> | number
    purchasePrice?: FloatFilter<"Debt"> | number
    debtDate?: DateTimeFilter<"Debt"> | Date | string
    customerName?: StringNullableFilter<"Debt"> | string | null
    notes?: StringNullableFilter<"Debt"> | string | null
    status?: StringFilter<"Debt"> | string
    paidDate?: DateTimeNullableFilter<"Debt"> | Date | string | null
    createdAt?: DateTimeFilter<"Debt"> | Date | string
    updatedAt?: DateTimeFilter<"Debt"> | Date | string
    productId?: StringFilter<"Debt"> | string
    batchId?: StringFilter<"Debt"> | string
    companyId?: StringFilter<"Debt"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type DebtOrderByWithRelationInput = {
    id?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
    debtDate?: SortOrder
    customerName?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    paidDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
    product?: ProductOrderByWithRelationInput
    batch?: BatchOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
  }

  export type DebtWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DebtWhereInput | DebtWhereInput[]
    OR?: DebtWhereInput[]
    NOT?: DebtWhereInput | DebtWhereInput[]
    quantity?: IntFilter<"Debt"> | number
    unitPrice?: FloatFilter<"Debt"> | number
    totalAmount?: FloatFilter<"Debt"> | number
    purchasePrice?: FloatFilter<"Debt"> | number
    debtDate?: DateTimeFilter<"Debt"> | Date | string
    customerName?: StringNullableFilter<"Debt"> | string | null
    notes?: StringNullableFilter<"Debt"> | string | null
    status?: StringFilter<"Debt"> | string
    paidDate?: DateTimeNullableFilter<"Debt"> | Date | string | null
    createdAt?: DateTimeFilter<"Debt"> | Date | string
    updatedAt?: DateTimeFilter<"Debt"> | Date | string
    productId?: StringFilter<"Debt"> | string
    batchId?: StringFilter<"Debt"> | string
    companyId?: StringFilter<"Debt"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type DebtOrderByWithAggregationInput = {
    id?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
    debtDate?: SortOrder
    customerName?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    paidDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
    _count?: DebtCountOrderByAggregateInput
    _avg?: DebtAvgOrderByAggregateInput
    _max?: DebtMaxOrderByAggregateInput
    _min?: DebtMinOrderByAggregateInput
    _sum?: DebtSumOrderByAggregateInput
  }

  export type DebtScalarWhereWithAggregatesInput = {
    AND?: DebtScalarWhereWithAggregatesInput | DebtScalarWhereWithAggregatesInput[]
    OR?: DebtScalarWhereWithAggregatesInput[]
    NOT?: DebtScalarWhereWithAggregatesInput | DebtScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Debt"> | string
    quantity?: IntWithAggregatesFilter<"Debt"> | number
    unitPrice?: FloatWithAggregatesFilter<"Debt"> | number
    totalAmount?: FloatWithAggregatesFilter<"Debt"> | number
    purchasePrice?: FloatWithAggregatesFilter<"Debt"> | number
    debtDate?: DateTimeWithAggregatesFilter<"Debt"> | Date | string
    customerName?: StringNullableWithAggregatesFilter<"Debt"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Debt"> | string | null
    status?: StringWithAggregatesFilter<"Debt"> | string
    paidDate?: DateTimeNullableWithAggregatesFilter<"Debt"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Debt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Debt"> | Date | string
    productId?: StringWithAggregatesFilter<"Debt"> | string
    batchId?: StringWithAggregatesFilter<"Debt"> | string
    companyId?: StringWithAggregatesFilter<"Debt"> | string
  }

  export type MonthlyReportWhereInput = {
    AND?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    OR?: MonthlyReportWhereInput[]
    NOT?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    id?: StringFilter<"MonthlyReport"> | string
    year?: IntFilter<"MonthlyReport"> | number
    month?: IntFilter<"MonthlyReport"> | number
    totalSales?: FloatFilter<"MonthlyReport"> | number
    totalProfit?: FloatFilter<"MonthlyReport"> | number
    averageProfitMargin?: FloatFilter<"MonthlyReport"> | number
    isFinalized?: BoolFilter<"MonthlyReport"> | boolean
    reportData?: JsonFilter<"MonthlyReport">
    createdAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    companyId?: StringFilter<"MonthlyReport"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type MonthlyReportOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
    isFinalized?: SortOrder
    reportData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type MonthlyReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_month_companyId?: MonthlyReportYearMonthCompanyIdCompoundUniqueInput
    AND?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    OR?: MonthlyReportWhereInput[]
    NOT?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    year?: IntFilter<"MonthlyReport"> | number
    month?: IntFilter<"MonthlyReport"> | number
    totalSales?: FloatFilter<"MonthlyReport"> | number
    totalProfit?: FloatFilter<"MonthlyReport"> | number
    averageProfitMargin?: FloatFilter<"MonthlyReport"> | number
    isFinalized?: BoolFilter<"MonthlyReport"> | boolean
    reportData?: JsonFilter<"MonthlyReport">
    createdAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    companyId?: StringFilter<"MonthlyReport"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "year_month_companyId">

  export type MonthlyReportOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
    isFinalized?: SortOrder
    reportData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
    _count?: MonthlyReportCountOrderByAggregateInput
    _avg?: MonthlyReportAvgOrderByAggregateInput
    _max?: MonthlyReportMaxOrderByAggregateInput
    _min?: MonthlyReportMinOrderByAggregateInput
    _sum?: MonthlyReportSumOrderByAggregateInput
  }

  export type MonthlyReportScalarWhereWithAggregatesInput = {
    AND?: MonthlyReportScalarWhereWithAggregatesInput | MonthlyReportScalarWhereWithAggregatesInput[]
    OR?: MonthlyReportScalarWhereWithAggregatesInput[]
    NOT?: MonthlyReportScalarWhereWithAggregatesInput | MonthlyReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyReport"> | string
    year?: IntWithAggregatesFilter<"MonthlyReport"> | number
    month?: IntWithAggregatesFilter<"MonthlyReport"> | number
    totalSales?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    totalProfit?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    averageProfitMargin?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    isFinalized?: BoolWithAggregatesFilter<"MonthlyReport"> | boolean
    reportData?: JsonWithAggregatesFilter<"MonthlyReport">
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MonthlyReport"> | Date | string
    companyId?: StringWithAggregatesFilter<"MonthlyReport"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type RefundWhereInput = {
    AND?: RefundWhereInput | RefundWhereInput[]
    OR?: RefundWhereInput[]
    NOT?: RefundWhereInput | RefundWhereInput[]
    id?: StringFilter<"Refund"> | string
    refundNumber?: StringFilter<"Refund"> | string
    originalSaleId?: StringFilter<"Refund"> | string
    productId?: StringFilter<"Refund"> | string
    batchId?: StringFilter<"Refund"> | string
    quantity?: IntFilter<"Refund"> | number
    unitPrice?: DecimalFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFilter<"Refund"> | $Enums.RefundType
    reason?: EnumRefundReasonFilter<"Refund"> | $Enums.RefundReason
    customReason?: StringNullableFilter<"Refund"> | string | null
    refundDate?: DateTimeFilter<"Refund"> | Date | string
    processedBy?: StringFilter<"Refund"> | string
    itemCondition?: EnumItemConditionFilter<"Refund"> | $Enums.ItemCondition
    returnToInventory?: BoolFilter<"Refund"> | boolean
    companyId?: StringFilter<"Refund"> | string
    createdAt?: DateTimeFilter<"Refund"> | Date | string
    updatedAt?: DateTimeFilter<"Refund"> | Date | string
    originalSale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    processedByUser?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefundOrderByWithRelationInput = {
    id?: SortOrder
    refundNumber?: SortOrder
    originalSaleId?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
    refundType?: SortOrder
    reason?: SortOrder
    customReason?: SortOrderInput | SortOrder
    refundDate?: SortOrder
    processedBy?: SortOrder
    itemCondition?: SortOrder
    returnToInventory?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    originalSale?: SaleOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    batch?: BatchOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    processedByUser?: UserOrderByWithRelationInput
  }

  export type RefundWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refundNumber?: string
    AND?: RefundWhereInput | RefundWhereInput[]
    OR?: RefundWhereInput[]
    NOT?: RefundWhereInput | RefundWhereInput[]
    originalSaleId?: StringFilter<"Refund"> | string
    productId?: StringFilter<"Refund"> | string
    batchId?: StringFilter<"Refund"> | string
    quantity?: IntFilter<"Refund"> | number
    unitPrice?: DecimalFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFilter<"Refund"> | $Enums.RefundType
    reason?: EnumRefundReasonFilter<"Refund"> | $Enums.RefundReason
    customReason?: StringNullableFilter<"Refund"> | string | null
    refundDate?: DateTimeFilter<"Refund"> | Date | string
    processedBy?: StringFilter<"Refund"> | string
    itemCondition?: EnumItemConditionFilter<"Refund"> | $Enums.ItemCondition
    returnToInventory?: BoolFilter<"Refund"> | boolean
    companyId?: StringFilter<"Refund"> | string
    createdAt?: DateTimeFilter<"Refund"> | Date | string
    updatedAt?: DateTimeFilter<"Refund"> | Date | string
    originalSale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    processedByUser?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "refundNumber">

  export type RefundOrderByWithAggregationInput = {
    id?: SortOrder
    refundNumber?: SortOrder
    originalSaleId?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
    refundType?: SortOrder
    reason?: SortOrder
    customReason?: SortOrderInput | SortOrder
    refundDate?: SortOrder
    processedBy?: SortOrder
    itemCondition?: SortOrder
    returnToInventory?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RefundCountOrderByAggregateInput
    _avg?: RefundAvgOrderByAggregateInput
    _max?: RefundMaxOrderByAggregateInput
    _min?: RefundMinOrderByAggregateInput
    _sum?: RefundSumOrderByAggregateInput
  }

  export type RefundScalarWhereWithAggregatesInput = {
    AND?: RefundScalarWhereWithAggregatesInput | RefundScalarWhereWithAggregatesInput[]
    OR?: RefundScalarWhereWithAggregatesInput[]
    NOT?: RefundScalarWhereWithAggregatesInput | RefundScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Refund"> | string
    refundNumber?: StringWithAggregatesFilter<"Refund"> | string
    originalSaleId?: StringWithAggregatesFilter<"Refund"> | string
    productId?: StringWithAggregatesFilter<"Refund"> | string
    batchId?: StringWithAggregatesFilter<"Refund"> | string
    quantity?: IntWithAggregatesFilter<"Refund"> | number
    unitPrice?: DecimalWithAggregatesFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalWithAggregatesFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeWithAggregatesFilter<"Refund"> | $Enums.RefundType
    reason?: EnumRefundReasonWithAggregatesFilter<"Refund"> | $Enums.RefundReason
    customReason?: StringNullableWithAggregatesFilter<"Refund"> | string | null
    refundDate?: DateTimeWithAggregatesFilter<"Refund"> | Date | string
    processedBy?: StringWithAggregatesFilter<"Refund"> | string
    itemCondition?: EnumItemConditionWithAggregatesFilter<"Refund"> | $Enums.ItemCondition
    returnToInventory?: BoolWithAggregatesFilter<"Refund"> | boolean
    companyId?: StringWithAggregatesFilter<"Refund"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Refund"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Refund"> | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    processedRefunds?: RefundCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    processedRefunds?: RefundUncheckedCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUncheckedUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
    company: CompanyCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
    company?: CompanyUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    batches?: BatchCreateNestedManyWithoutProductInput
    sales?: SaleCreateNestedManyWithoutProductInput
    debts?: DebtCreateNestedManyWithoutProductInput
    refunds?: RefundCreateNestedManyWithoutProductInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    companyId: string
    batches?: BatchUncheckedCreateNestedManyWithoutProductInput
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
    debts?: DebtUncheckedCreateNestedManyWithoutProductInput
    refunds?: RefundUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    batches?: BatchUpdateManyWithoutProductNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
    debts?: DebtUpdateManyWithoutProductNestedInput
    refunds?: RefundUpdateManyWithoutProductNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    batches?: BatchUncheckedUpdateManyWithoutProductNestedInput
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
    debts?: DebtUncheckedUpdateManyWithoutProductNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    companyId: string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type BatchCreateInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
    sales?: SaleCreateNestedManyWithoutBatchInput
    debts?: DebtCreateNestedManyWithoutBatchInput
    refunds?: RefundCreateNestedManyWithoutBatchInput
    company: CompanyCreateNestedOneWithoutBatchesInput
  }

  export type BatchUncheckedCreateInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
    sales?: SaleUncheckedCreateNestedManyWithoutBatchInput
    debts?: DebtUncheckedCreateNestedManyWithoutBatchInput
    refunds?: RefundUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
    sales?: SaleUpdateManyWithoutBatchNestedInput
    debts?: DebtUpdateManyWithoutBatchNestedInput
    refunds?: RefundUpdateManyWithoutBatchNestedInput
    company?: CompanyUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type BatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutBatchNestedInput
    debts?: DebtUncheckedUpdateManyWithoutBatchNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateManyInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
  }

  export type BatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type SaleCreateInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSalesInput
    batch: BatchCreateNestedOneWithoutSalesInput
    company: CompanyCreateNestedOneWithoutSalesInput
    refunds?: RefundCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
    companyId: string
    refunds?: RefundUncheckedCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
    batch?: BatchUpdateOneRequiredWithoutSalesNestedInput
    company?: CompanyUpdateOneRequiredWithoutSalesNestedInput
    refunds?: RefundUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    refunds?: RefundUncheckedUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleCreateManyInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
    companyId: string
  }

  export type SaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtCreateInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDebtsInput
    batch: BatchCreateNestedOneWithoutDebtsInput
    company: CompanyCreateNestedOneWithoutDebtsInput
  }

  export type DebtUncheckedCreateInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
    companyId: string
  }

  export type DebtUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDebtsNestedInput
    batch?: BatchUpdateOneRequiredWithoutDebtsNestedInput
    company?: CompanyUpdateOneRequiredWithoutDebtsNestedInput
  }

  export type DebtUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtCreateManyInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
    companyId: string
  }

  export type DebtUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type MonthlyReportCreateInput = {
    id?: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized?: boolean
    reportData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutMonthlyReportsInput
  }

  export type MonthlyReportUncheckedCreateInput = {
    id?: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized?: boolean
    reportData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type MonthlyReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutMonthlyReportsNestedInput
  }

  export type MonthlyReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type MonthlyReportCreateManyInput = {
    id?: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized?: boolean
    reportData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type MonthlyReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundCreateInput = {
    id?: string
    refundNumber: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    originalSale: SaleCreateNestedOneWithoutRefundsInput
    product: ProductCreateNestedOneWithoutRefundsInput
    batch: BatchCreateNestedOneWithoutRefundsInput
    company: CompanyCreateNestedOneWithoutRefundsInput
    processedByUser: UserCreateNestedOneWithoutProcessedRefundsInput
  }

  export type RefundUncheckedCreateInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalSale?: SaleUpdateOneRequiredWithoutRefundsNestedInput
    product?: ProductUpdateOneRequiredWithoutRefundsNestedInput
    batch?: BatchUpdateOneRequiredWithoutRefundsNestedInput
    company?: CompanyUpdateOneRequiredWithoutRefundsNestedInput
    processedByUser?: UserUpdateOneRequiredWithoutProcessedRefundsNestedInput
  }

  export type RefundUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundCreateManyInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type BatchListRelationFilter = {
    every?: BatchWhereInput
    some?: BatchWhereInput
    none?: BatchWhereInput
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type DebtListRelationFilter = {
    every?: DebtWhereInput
    some?: DebtWhereInput
    none?: DebtWhereInput
  }

  export type RefundListRelationFilter = {
    every?: RefundWhereInput
    some?: RefundWhereInput
    none?: RefundWhereInput
  }

  export type MonthlyReportListRelationFilter = {
    every?: MonthlyReportWhereInput
    some?: MonthlyReportWhereInput
    none?: MonthlyReportWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DebtOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefundOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CategoryNameCompanyIdCompoundUniqueInput = {
    name: string
    companyId: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    fitment?: SortOrder
    supplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    companyId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    fitment?: SortOrder
    supplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    companyId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    fitment?: SortOrder
    supplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    companyId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    sellingPrice?: SortOrder
    totalStock?: SortOrder
    minStockLevel?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type BatchCountOrderByAggregateInput = {
    id?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
    status?: SortOrder
    supplier?: SortOrder
    invoiceNumber?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    companyId?: SortOrder
  }

  export type BatchAvgOrderByAggregateInput = {
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
  }

  export type BatchMaxOrderByAggregateInput = {
    id?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
    status?: SortOrder
    supplier?: SortOrder
    invoiceNumber?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    companyId?: SortOrder
  }

  export type BatchMinOrderByAggregateInput = {
    id?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
    status?: SortOrder
    supplier?: SortOrder
    invoiceNumber?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    companyId?: SortOrder
  }

  export type BatchSumOrderByAggregateInput = {
    purchasePrice?: SortOrder
    initialQuantity?: SortOrder
    currentQuantity?: SortOrder
  }

  export type BatchScalarRelationFilter = {
    is?: BatchWhereInput
    isNot?: BatchWhereInput
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
    saleDate?: SortOrder
    customerId?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
    saleDate?: SortOrder
    customerId?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
    saleDate?: SortOrder
    customerId?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    quantity?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    profit?: SortOrder
    profitMargin?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DebtCountOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
    debtDate?: SortOrder
    customerName?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    paidDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
  }

  export type DebtAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
  }

  export type DebtMaxOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
    debtDate?: SortOrder
    customerName?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    paidDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
  }

  export type DebtMinOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
    debtDate?: SortOrder
    customerName?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    paidDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    companyId?: SortOrder
  }

  export type DebtSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalAmount?: SortOrder
    purchasePrice?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MonthlyReportYearMonthCompanyIdCompoundUniqueInput = {
    year: number
    month: number
    companyId: string
  }

  export type MonthlyReportCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
    isFinalized?: SortOrder
    reportData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type MonthlyReportAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
  }

  export type MonthlyReportMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
    isFinalized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type MonthlyReportMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
    isFinalized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyId?: SortOrder
  }

  export type MonthlyReportSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    totalSales?: SortOrder
    totalProfit?: SortOrder
    averageProfitMargin?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumRefundTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundType | EnumRefundTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundTypeFilter<$PrismaModel> | $Enums.RefundType
  }

  export type EnumRefundReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonFilter<$PrismaModel> | $Enums.RefundReason
  }

  export type EnumItemConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemCondition | EnumItemConditionFieldRefInput<$PrismaModel>
    in?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumItemConditionFilter<$PrismaModel> | $Enums.ItemCondition
  }

  export type SaleScalarRelationFilter = {
    is?: SaleWhereInput
    isNot?: SaleWhereInput
  }

  export type RefundCountOrderByAggregateInput = {
    id?: SortOrder
    refundNumber?: SortOrder
    originalSaleId?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
    refundType?: SortOrder
    reason?: SortOrder
    customReason?: SortOrder
    refundDate?: SortOrder
    processedBy?: SortOrder
    itemCondition?: SortOrder
    returnToInventory?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
  }

  export type RefundMaxOrderByAggregateInput = {
    id?: SortOrder
    refundNumber?: SortOrder
    originalSaleId?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
    refundType?: SortOrder
    reason?: SortOrder
    customReason?: SortOrder
    refundDate?: SortOrder
    processedBy?: SortOrder
    itemCondition?: SortOrder
    returnToInventory?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundMinOrderByAggregateInput = {
    id?: SortOrder
    refundNumber?: SortOrder
    originalSaleId?: SortOrder
    productId?: SortOrder
    batchId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
    refundType?: SortOrder
    reason?: SortOrder
    customReason?: SortOrder
    refundDate?: SortOrder
    processedBy?: SortOrder
    itemCondition?: SortOrder
    returnToInventory?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalRefundAmount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumRefundTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundType | EnumRefundTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundTypeWithAggregatesFilter<$PrismaModel> | $Enums.RefundType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundTypeFilter<$PrismaModel>
    _max?: NestedEnumRefundTypeFilter<$PrismaModel>
  }

  export type EnumRefundReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonWithAggregatesFilter<$PrismaModel> | $Enums.RefundReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundReasonFilter<$PrismaModel>
    _max?: NestedEnumRefundReasonFilter<$PrismaModel>
  }

  export type EnumItemConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemCondition | EnumItemConditionFieldRefInput<$PrismaModel>
    in?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumItemConditionWithAggregatesFilter<$PrismaModel> | $Enums.ItemCondition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemConditionFilter<$PrismaModel>
    _max?: NestedEnumItemConditionFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type BatchCreateNestedManyWithoutCompanyInput = {
    create?: XOR<BatchCreateWithoutCompanyInput, BatchUncheckedCreateWithoutCompanyInput> | BatchCreateWithoutCompanyInput[] | BatchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutCompanyInput | BatchCreateOrConnectWithoutCompanyInput[]
    createMany?: BatchCreateManyCompanyInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type SaleCreateNestedManyWithoutCompanyInput = {
    create?: XOR<SaleCreateWithoutCompanyInput, SaleUncheckedCreateWithoutCompanyInput> | SaleCreateWithoutCompanyInput[] | SaleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCompanyInput | SaleCreateOrConnectWithoutCompanyInput[]
    createMany?: SaleCreateManyCompanyInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type DebtCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DebtCreateWithoutCompanyInput, DebtUncheckedCreateWithoutCompanyInput> | DebtCreateWithoutCompanyInput[] | DebtUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutCompanyInput | DebtCreateOrConnectWithoutCompanyInput[]
    createMany?: DebtCreateManyCompanyInputEnvelope
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
  }

  export type RefundCreateNestedManyWithoutCompanyInput = {
    create?: XOR<RefundCreateWithoutCompanyInput, RefundUncheckedCreateWithoutCompanyInput> | RefundCreateWithoutCompanyInput[] | RefundUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutCompanyInput | RefundCreateOrConnectWithoutCompanyInput[]
    createMany?: RefundCreateManyCompanyInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type MonthlyReportCreateNestedManyWithoutCompanyInput = {
    create?: XOR<MonthlyReportCreateWithoutCompanyInput, MonthlyReportUncheckedCreateWithoutCompanyInput> | MonthlyReportCreateWithoutCompanyInput[] | MonthlyReportUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutCompanyInput | MonthlyReportCreateOrConnectWithoutCompanyInput[]
    createMany?: MonthlyReportCreateManyCompanyInputEnvelope
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type BatchUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<BatchCreateWithoutCompanyInput, BatchUncheckedCreateWithoutCompanyInput> | BatchCreateWithoutCompanyInput[] | BatchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutCompanyInput | BatchCreateOrConnectWithoutCompanyInput[]
    createMany?: BatchCreateManyCompanyInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<SaleCreateWithoutCompanyInput, SaleUncheckedCreateWithoutCompanyInput> | SaleCreateWithoutCompanyInput[] | SaleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCompanyInput | SaleCreateOrConnectWithoutCompanyInput[]
    createMany?: SaleCreateManyCompanyInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type DebtUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DebtCreateWithoutCompanyInput, DebtUncheckedCreateWithoutCompanyInput> | DebtCreateWithoutCompanyInput[] | DebtUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutCompanyInput | DebtCreateOrConnectWithoutCompanyInput[]
    createMany?: DebtCreateManyCompanyInputEnvelope
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
  }

  export type RefundUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<RefundCreateWithoutCompanyInput, RefundUncheckedCreateWithoutCompanyInput> | RefundCreateWithoutCompanyInput[] | RefundUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutCompanyInput | RefundCreateOrConnectWithoutCompanyInput[]
    createMany?: RefundCreateManyCompanyInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<MonthlyReportCreateWithoutCompanyInput, MonthlyReportUncheckedCreateWithoutCompanyInput> | MonthlyReportCreateWithoutCompanyInput[] | MonthlyReportUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutCompanyInput | MonthlyReportCreateOrConnectWithoutCompanyInput[]
    createMany?: MonthlyReportCreateManyCompanyInputEnvelope
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutCompanyInput | CategoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutCompanyInput | CategoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutCompanyInput | CategoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCompanyInput | ProductUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCompanyInput | ProductUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCompanyInput | ProductUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type BatchUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<BatchCreateWithoutCompanyInput, BatchUncheckedCreateWithoutCompanyInput> | BatchCreateWithoutCompanyInput[] | BatchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutCompanyInput | BatchCreateOrConnectWithoutCompanyInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutCompanyInput | BatchUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: BatchCreateManyCompanyInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutCompanyInput | BatchUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutCompanyInput | BatchUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type SaleUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<SaleCreateWithoutCompanyInput, SaleUncheckedCreateWithoutCompanyInput> | SaleCreateWithoutCompanyInput[] | SaleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCompanyInput | SaleCreateOrConnectWithoutCompanyInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutCompanyInput | SaleUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: SaleCreateManyCompanyInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutCompanyInput | SaleUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutCompanyInput | SaleUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type DebtUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DebtCreateWithoutCompanyInput, DebtUncheckedCreateWithoutCompanyInput> | DebtCreateWithoutCompanyInput[] | DebtUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutCompanyInput | DebtCreateOrConnectWithoutCompanyInput[]
    upsert?: DebtUpsertWithWhereUniqueWithoutCompanyInput | DebtUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DebtCreateManyCompanyInputEnvelope
    set?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    disconnect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    delete?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    update?: DebtUpdateWithWhereUniqueWithoutCompanyInput | DebtUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DebtUpdateManyWithWhereWithoutCompanyInput | DebtUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DebtScalarWhereInput | DebtScalarWhereInput[]
  }

  export type RefundUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<RefundCreateWithoutCompanyInput, RefundUncheckedCreateWithoutCompanyInput> | RefundCreateWithoutCompanyInput[] | RefundUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutCompanyInput | RefundCreateOrConnectWithoutCompanyInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutCompanyInput | RefundUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: RefundCreateManyCompanyInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutCompanyInput | RefundUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutCompanyInput | RefundUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type MonthlyReportUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<MonthlyReportCreateWithoutCompanyInput, MonthlyReportUncheckedCreateWithoutCompanyInput> | MonthlyReportCreateWithoutCompanyInput[] | MonthlyReportUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutCompanyInput | MonthlyReportCreateOrConnectWithoutCompanyInput[]
    upsert?: MonthlyReportUpsertWithWhereUniqueWithoutCompanyInput | MonthlyReportUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: MonthlyReportCreateManyCompanyInputEnvelope
    set?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    disconnect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    delete?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    update?: MonthlyReportUpdateWithWhereUniqueWithoutCompanyInput | MonthlyReportUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: MonthlyReportUpdateManyWithWhereWithoutCompanyInput | MonthlyReportUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutCompanyInput | CategoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutCompanyInput | CategoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutCompanyInput | CategoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCompanyInput | ProductUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCompanyInput | ProductUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCompanyInput | ProductUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type BatchUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<BatchCreateWithoutCompanyInput, BatchUncheckedCreateWithoutCompanyInput> | BatchCreateWithoutCompanyInput[] | BatchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutCompanyInput | BatchCreateOrConnectWithoutCompanyInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutCompanyInput | BatchUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: BatchCreateManyCompanyInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutCompanyInput | BatchUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutCompanyInput | BatchUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<SaleCreateWithoutCompanyInput, SaleUncheckedCreateWithoutCompanyInput> | SaleCreateWithoutCompanyInput[] | SaleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCompanyInput | SaleCreateOrConnectWithoutCompanyInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutCompanyInput | SaleUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: SaleCreateManyCompanyInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutCompanyInput | SaleUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutCompanyInput | SaleUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type DebtUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DebtCreateWithoutCompanyInput, DebtUncheckedCreateWithoutCompanyInput> | DebtCreateWithoutCompanyInput[] | DebtUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutCompanyInput | DebtCreateOrConnectWithoutCompanyInput[]
    upsert?: DebtUpsertWithWhereUniqueWithoutCompanyInput | DebtUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DebtCreateManyCompanyInputEnvelope
    set?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    disconnect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    delete?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    update?: DebtUpdateWithWhereUniqueWithoutCompanyInput | DebtUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DebtUpdateManyWithWhereWithoutCompanyInput | DebtUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DebtScalarWhereInput | DebtScalarWhereInput[]
  }

  export type RefundUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<RefundCreateWithoutCompanyInput, RefundUncheckedCreateWithoutCompanyInput> | RefundCreateWithoutCompanyInput[] | RefundUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutCompanyInput | RefundCreateOrConnectWithoutCompanyInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutCompanyInput | RefundUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: RefundCreateManyCompanyInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutCompanyInput | RefundUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutCompanyInput | RefundUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<MonthlyReportCreateWithoutCompanyInput, MonthlyReportUncheckedCreateWithoutCompanyInput> | MonthlyReportCreateWithoutCompanyInput[] | MonthlyReportUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutCompanyInput | MonthlyReportCreateOrConnectWithoutCompanyInput[]
    upsert?: MonthlyReportUpsertWithWhereUniqueWithoutCompanyInput | MonthlyReportUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: MonthlyReportCreateManyCompanyInputEnvelope
    set?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    disconnect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    delete?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    update?: MonthlyReportUpdateWithWhereUniqueWithoutCompanyInput | MonthlyReportUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: MonthlyReportUpdateManyWithWhereWithoutCompanyInput | MonthlyReportUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RefundCreateNestedManyWithoutProcessedByUserInput = {
    create?: XOR<RefundCreateWithoutProcessedByUserInput, RefundUncheckedCreateWithoutProcessedByUserInput> | RefundCreateWithoutProcessedByUserInput[] | RefundUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProcessedByUserInput | RefundCreateOrConnectWithoutProcessedByUserInput[]
    createMany?: RefundCreateManyProcessedByUserInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RefundUncheckedCreateNestedManyWithoutProcessedByUserInput = {
    create?: XOR<RefundCreateWithoutProcessedByUserInput, RefundUncheckedCreateWithoutProcessedByUserInput> | RefundCreateWithoutProcessedByUserInput[] | RefundUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProcessedByUserInput | RefundCreateOrConnectWithoutProcessedByUserInput[]
    createMany?: RefundCreateManyProcessedByUserInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CompanyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RefundUpdateManyWithoutProcessedByUserNestedInput = {
    create?: XOR<RefundCreateWithoutProcessedByUserInput, RefundUncheckedCreateWithoutProcessedByUserInput> | RefundCreateWithoutProcessedByUserInput[] | RefundUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProcessedByUserInput | RefundCreateOrConnectWithoutProcessedByUserInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutProcessedByUserInput | RefundUpsertWithWhereUniqueWithoutProcessedByUserInput[]
    createMany?: RefundCreateManyProcessedByUserInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutProcessedByUserInput | RefundUpdateWithWhereUniqueWithoutProcessedByUserInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutProcessedByUserInput | RefundUpdateManyWithWhereWithoutProcessedByUserInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RefundUncheckedUpdateManyWithoutProcessedByUserNestedInput = {
    create?: XOR<RefundCreateWithoutProcessedByUserInput, RefundUncheckedCreateWithoutProcessedByUserInput> | RefundCreateWithoutProcessedByUserInput[] | RefundUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProcessedByUserInput | RefundCreateOrConnectWithoutProcessedByUserInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutProcessedByUserInput | RefundUpsertWithWhereUniqueWithoutProcessedByUserInput[]
    createMany?: RefundCreateManyProcessedByUserInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutProcessedByUserInput | RefundUpdateWithWhereUniqueWithoutProcessedByUserInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutProcessedByUserInput | RefundUpdateManyWithWhereWithoutProcessedByUserInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CompanyCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoriesInput
    connect?: CompanyWhereUniqueInput
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CompanyUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoriesInput
    upsert?: CompanyUpsertWithoutCategoriesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCategoriesInput, CompanyUpdateWithoutCategoriesInput>, CompanyUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type BatchCreateNestedManyWithoutProductInput = {
    create?: XOR<BatchCreateWithoutProductInput, BatchUncheckedCreateWithoutProductInput> | BatchCreateWithoutProductInput[] | BatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutProductInput | BatchCreateOrConnectWithoutProductInput[]
    createMany?: BatchCreateManyProductInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type SaleCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type DebtCreateNestedManyWithoutProductInput = {
    create?: XOR<DebtCreateWithoutProductInput, DebtUncheckedCreateWithoutProductInput> | DebtCreateWithoutProductInput[] | DebtUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutProductInput | DebtCreateOrConnectWithoutProductInput[]
    createMany?: DebtCreateManyProductInputEnvelope
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
  }

  export type RefundCreateNestedManyWithoutProductInput = {
    create?: XOR<RefundCreateWithoutProductInput, RefundUncheckedCreateWithoutProductInput> | RefundCreateWithoutProductInput[] | RefundUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProductInput | RefundCreateOrConnectWithoutProductInput[]
    createMany?: RefundCreateManyProductInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type CompanyCreateNestedOneWithoutProductsInput = {
    create?: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutProductsInput
    connect?: CompanyWhereUniqueInput
  }

  export type BatchUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<BatchCreateWithoutProductInput, BatchUncheckedCreateWithoutProductInput> | BatchCreateWithoutProductInput[] | BatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutProductInput | BatchCreateOrConnectWithoutProductInput[]
    createMany?: BatchCreateManyProductInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type DebtUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<DebtCreateWithoutProductInput, DebtUncheckedCreateWithoutProductInput> | DebtCreateWithoutProductInput[] | DebtUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutProductInput | DebtCreateOrConnectWithoutProductInput[]
    createMany?: DebtCreateManyProductInputEnvelope
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
  }

  export type RefundUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<RefundCreateWithoutProductInput, RefundUncheckedCreateWithoutProductInput> | RefundCreateWithoutProductInput[] | RefundUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProductInput | RefundCreateOrConnectWithoutProductInput[]
    createMany?: RefundCreateManyProductInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type BatchUpdateManyWithoutProductNestedInput = {
    create?: XOR<BatchCreateWithoutProductInput, BatchUncheckedCreateWithoutProductInput> | BatchCreateWithoutProductInput[] | BatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutProductInput | BatchCreateOrConnectWithoutProductInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutProductInput | BatchUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: BatchCreateManyProductInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutProductInput | BatchUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutProductInput | BatchUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type SaleUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutProductInput | SaleUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutProductInput | SaleUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutProductInput | SaleUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type DebtUpdateManyWithoutProductNestedInput = {
    create?: XOR<DebtCreateWithoutProductInput, DebtUncheckedCreateWithoutProductInput> | DebtCreateWithoutProductInput[] | DebtUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutProductInput | DebtCreateOrConnectWithoutProductInput[]
    upsert?: DebtUpsertWithWhereUniqueWithoutProductInput | DebtUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: DebtCreateManyProductInputEnvelope
    set?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    disconnect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    delete?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    update?: DebtUpdateWithWhereUniqueWithoutProductInput | DebtUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: DebtUpdateManyWithWhereWithoutProductInput | DebtUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: DebtScalarWhereInput | DebtScalarWhereInput[]
  }

  export type RefundUpdateManyWithoutProductNestedInput = {
    create?: XOR<RefundCreateWithoutProductInput, RefundUncheckedCreateWithoutProductInput> | RefundCreateWithoutProductInput[] | RefundUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProductInput | RefundCreateOrConnectWithoutProductInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutProductInput | RefundUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: RefundCreateManyProductInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutProductInput | RefundUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutProductInput | RefundUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type CompanyUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutProductsInput
    upsert?: CompanyUpsertWithoutProductsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutProductsInput, CompanyUpdateWithoutProductsInput>, CompanyUncheckedUpdateWithoutProductsInput>
  }

  export type BatchUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<BatchCreateWithoutProductInput, BatchUncheckedCreateWithoutProductInput> | BatchCreateWithoutProductInput[] | BatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutProductInput | BatchCreateOrConnectWithoutProductInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutProductInput | BatchUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: BatchCreateManyProductInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutProductInput | BatchUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutProductInput | BatchUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutProductInput | SaleUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutProductInput | SaleUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutProductInput | SaleUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type DebtUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<DebtCreateWithoutProductInput, DebtUncheckedCreateWithoutProductInput> | DebtCreateWithoutProductInput[] | DebtUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutProductInput | DebtCreateOrConnectWithoutProductInput[]
    upsert?: DebtUpsertWithWhereUniqueWithoutProductInput | DebtUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: DebtCreateManyProductInputEnvelope
    set?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    disconnect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    delete?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    update?: DebtUpdateWithWhereUniqueWithoutProductInput | DebtUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: DebtUpdateManyWithWhereWithoutProductInput | DebtUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: DebtScalarWhereInput | DebtScalarWhereInput[]
  }

  export type RefundUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<RefundCreateWithoutProductInput, RefundUncheckedCreateWithoutProductInput> | RefundCreateWithoutProductInput[] | RefundUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutProductInput | RefundCreateOrConnectWithoutProductInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutProductInput | RefundUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: RefundCreateManyProductInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutProductInput | RefundUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutProductInput | RefundUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutBatchesInput = {
    create?: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBatchesInput
    connect?: ProductWhereUniqueInput
  }

  export type SaleCreateNestedManyWithoutBatchInput = {
    create?: XOR<SaleCreateWithoutBatchInput, SaleUncheckedCreateWithoutBatchInput> | SaleCreateWithoutBatchInput[] | SaleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutBatchInput | SaleCreateOrConnectWithoutBatchInput[]
    createMany?: SaleCreateManyBatchInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type DebtCreateNestedManyWithoutBatchInput = {
    create?: XOR<DebtCreateWithoutBatchInput, DebtUncheckedCreateWithoutBatchInput> | DebtCreateWithoutBatchInput[] | DebtUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutBatchInput | DebtCreateOrConnectWithoutBatchInput[]
    createMany?: DebtCreateManyBatchInputEnvelope
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
  }

  export type RefundCreateNestedManyWithoutBatchInput = {
    create?: XOR<RefundCreateWithoutBatchInput, RefundUncheckedCreateWithoutBatchInput> | RefundCreateWithoutBatchInput[] | RefundUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutBatchInput | RefundCreateOrConnectWithoutBatchInput[]
    createMany?: RefundCreateManyBatchInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type CompanyCreateNestedOneWithoutBatchesInput = {
    create?: XOR<CompanyCreateWithoutBatchesInput, CompanyUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutBatchesInput
    connect?: CompanyWhereUniqueInput
  }

  export type SaleUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<SaleCreateWithoutBatchInput, SaleUncheckedCreateWithoutBatchInput> | SaleCreateWithoutBatchInput[] | SaleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutBatchInput | SaleCreateOrConnectWithoutBatchInput[]
    createMany?: SaleCreateManyBatchInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type DebtUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<DebtCreateWithoutBatchInput, DebtUncheckedCreateWithoutBatchInput> | DebtCreateWithoutBatchInput[] | DebtUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutBatchInput | DebtCreateOrConnectWithoutBatchInput[]
    createMany?: DebtCreateManyBatchInputEnvelope
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
  }

  export type RefundUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<RefundCreateWithoutBatchInput, RefundUncheckedCreateWithoutBatchInput> | RefundCreateWithoutBatchInput[] | RefundUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutBatchInput | RefundCreateOrConnectWithoutBatchInput[]
    createMany?: RefundCreateManyBatchInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutBatchesNestedInput = {
    create?: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBatchesInput
    upsert?: ProductUpsertWithoutBatchesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutBatchesInput, ProductUpdateWithoutBatchesInput>, ProductUncheckedUpdateWithoutBatchesInput>
  }

  export type SaleUpdateManyWithoutBatchNestedInput = {
    create?: XOR<SaleCreateWithoutBatchInput, SaleUncheckedCreateWithoutBatchInput> | SaleCreateWithoutBatchInput[] | SaleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutBatchInput | SaleCreateOrConnectWithoutBatchInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutBatchInput | SaleUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: SaleCreateManyBatchInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutBatchInput | SaleUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutBatchInput | SaleUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type DebtUpdateManyWithoutBatchNestedInput = {
    create?: XOR<DebtCreateWithoutBatchInput, DebtUncheckedCreateWithoutBatchInput> | DebtCreateWithoutBatchInput[] | DebtUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutBatchInput | DebtCreateOrConnectWithoutBatchInput[]
    upsert?: DebtUpsertWithWhereUniqueWithoutBatchInput | DebtUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: DebtCreateManyBatchInputEnvelope
    set?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    disconnect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    delete?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    update?: DebtUpdateWithWhereUniqueWithoutBatchInput | DebtUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: DebtUpdateManyWithWhereWithoutBatchInput | DebtUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: DebtScalarWhereInput | DebtScalarWhereInput[]
  }

  export type RefundUpdateManyWithoutBatchNestedInput = {
    create?: XOR<RefundCreateWithoutBatchInput, RefundUncheckedCreateWithoutBatchInput> | RefundCreateWithoutBatchInput[] | RefundUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutBatchInput | RefundCreateOrConnectWithoutBatchInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutBatchInput | RefundUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: RefundCreateManyBatchInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutBatchInput | RefundUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutBatchInput | RefundUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type CompanyUpdateOneRequiredWithoutBatchesNestedInput = {
    create?: XOR<CompanyCreateWithoutBatchesInput, CompanyUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutBatchesInput
    upsert?: CompanyUpsertWithoutBatchesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutBatchesInput, CompanyUpdateWithoutBatchesInput>, CompanyUncheckedUpdateWithoutBatchesInput>
  }

  export type SaleUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<SaleCreateWithoutBatchInput, SaleUncheckedCreateWithoutBatchInput> | SaleCreateWithoutBatchInput[] | SaleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutBatchInput | SaleCreateOrConnectWithoutBatchInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutBatchInput | SaleUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: SaleCreateManyBatchInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutBatchInput | SaleUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutBatchInput | SaleUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type DebtUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<DebtCreateWithoutBatchInput, DebtUncheckedCreateWithoutBatchInput> | DebtCreateWithoutBatchInput[] | DebtUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: DebtCreateOrConnectWithoutBatchInput | DebtCreateOrConnectWithoutBatchInput[]
    upsert?: DebtUpsertWithWhereUniqueWithoutBatchInput | DebtUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: DebtCreateManyBatchInputEnvelope
    set?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    disconnect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    delete?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    connect?: DebtWhereUniqueInput | DebtWhereUniqueInput[]
    update?: DebtUpdateWithWhereUniqueWithoutBatchInput | DebtUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: DebtUpdateManyWithWhereWithoutBatchInput | DebtUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: DebtScalarWhereInput | DebtScalarWhereInput[]
  }

  export type RefundUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<RefundCreateWithoutBatchInput, RefundUncheckedCreateWithoutBatchInput> | RefundCreateWithoutBatchInput[] | RefundUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutBatchInput | RefundCreateOrConnectWithoutBatchInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutBatchInput | RefundUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: RefundCreateManyBatchInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutBatchInput | RefundUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutBatchInput | RefundUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutSalesInput = {
    create?: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSalesInput
    connect?: ProductWhereUniqueInput
  }

  export type BatchCreateNestedOneWithoutSalesInput = {
    create?: XOR<BatchCreateWithoutSalesInput, BatchUncheckedCreateWithoutSalesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutSalesInput
    connect?: BatchWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutSalesInput = {
    create?: XOR<CompanyCreateWithoutSalesInput, CompanyUncheckedCreateWithoutSalesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutSalesInput
    connect?: CompanyWhereUniqueInput
  }

  export type RefundCreateNestedManyWithoutOriginalSaleInput = {
    create?: XOR<RefundCreateWithoutOriginalSaleInput, RefundUncheckedCreateWithoutOriginalSaleInput> | RefundCreateWithoutOriginalSaleInput[] | RefundUncheckedCreateWithoutOriginalSaleInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutOriginalSaleInput | RefundCreateOrConnectWithoutOriginalSaleInput[]
    createMany?: RefundCreateManyOriginalSaleInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type RefundUncheckedCreateNestedManyWithoutOriginalSaleInput = {
    create?: XOR<RefundCreateWithoutOriginalSaleInput, RefundUncheckedCreateWithoutOriginalSaleInput> | RefundCreateWithoutOriginalSaleInput[] | RefundUncheckedCreateWithoutOriginalSaleInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutOriginalSaleInput | RefundCreateOrConnectWithoutOriginalSaleInput[]
    createMany?: RefundCreateManyOriginalSaleInputEnvelope
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSalesInput
    upsert?: ProductUpsertWithoutSalesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSalesInput, ProductUpdateWithoutSalesInput>, ProductUncheckedUpdateWithoutSalesInput>
  }

  export type BatchUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<BatchCreateWithoutSalesInput, BatchUncheckedCreateWithoutSalesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutSalesInput
    upsert?: BatchUpsertWithoutSalesInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutSalesInput, BatchUpdateWithoutSalesInput>, BatchUncheckedUpdateWithoutSalesInput>
  }

  export type CompanyUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<CompanyCreateWithoutSalesInput, CompanyUncheckedCreateWithoutSalesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutSalesInput
    upsert?: CompanyUpsertWithoutSalesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutSalesInput, CompanyUpdateWithoutSalesInput>, CompanyUncheckedUpdateWithoutSalesInput>
  }

  export type RefundUpdateManyWithoutOriginalSaleNestedInput = {
    create?: XOR<RefundCreateWithoutOriginalSaleInput, RefundUncheckedCreateWithoutOriginalSaleInput> | RefundCreateWithoutOriginalSaleInput[] | RefundUncheckedCreateWithoutOriginalSaleInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutOriginalSaleInput | RefundCreateOrConnectWithoutOriginalSaleInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutOriginalSaleInput | RefundUpsertWithWhereUniqueWithoutOriginalSaleInput[]
    createMany?: RefundCreateManyOriginalSaleInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutOriginalSaleInput | RefundUpdateWithWhereUniqueWithoutOriginalSaleInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutOriginalSaleInput | RefundUpdateManyWithWhereWithoutOriginalSaleInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type RefundUncheckedUpdateManyWithoutOriginalSaleNestedInput = {
    create?: XOR<RefundCreateWithoutOriginalSaleInput, RefundUncheckedCreateWithoutOriginalSaleInput> | RefundCreateWithoutOriginalSaleInput[] | RefundUncheckedCreateWithoutOriginalSaleInput[]
    connectOrCreate?: RefundCreateOrConnectWithoutOriginalSaleInput | RefundCreateOrConnectWithoutOriginalSaleInput[]
    upsert?: RefundUpsertWithWhereUniqueWithoutOriginalSaleInput | RefundUpsertWithWhereUniqueWithoutOriginalSaleInput[]
    createMany?: RefundCreateManyOriginalSaleInputEnvelope
    set?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    disconnect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    delete?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    connect?: RefundWhereUniqueInput | RefundWhereUniqueInput[]
    update?: RefundUpdateWithWhereUniqueWithoutOriginalSaleInput | RefundUpdateWithWhereUniqueWithoutOriginalSaleInput[]
    updateMany?: RefundUpdateManyWithWhereWithoutOriginalSaleInput | RefundUpdateManyWithWhereWithoutOriginalSaleInput[]
    deleteMany?: RefundScalarWhereInput | RefundScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutDebtsInput = {
    create?: XOR<ProductCreateWithoutDebtsInput, ProductUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDebtsInput
    connect?: ProductWhereUniqueInput
  }

  export type BatchCreateNestedOneWithoutDebtsInput = {
    create?: XOR<BatchCreateWithoutDebtsInput, BatchUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutDebtsInput
    connect?: BatchWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutDebtsInput = {
    create?: XOR<CompanyCreateWithoutDebtsInput, CompanyUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutDebtsInput
    connect?: CompanyWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProductUpdateOneRequiredWithoutDebtsNestedInput = {
    create?: XOR<ProductCreateWithoutDebtsInput, ProductUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDebtsInput
    upsert?: ProductUpsertWithoutDebtsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutDebtsInput, ProductUpdateWithoutDebtsInput>, ProductUncheckedUpdateWithoutDebtsInput>
  }

  export type BatchUpdateOneRequiredWithoutDebtsNestedInput = {
    create?: XOR<BatchCreateWithoutDebtsInput, BatchUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutDebtsInput
    upsert?: BatchUpsertWithoutDebtsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutDebtsInput, BatchUpdateWithoutDebtsInput>, BatchUncheckedUpdateWithoutDebtsInput>
  }

  export type CompanyUpdateOneRequiredWithoutDebtsNestedInput = {
    create?: XOR<CompanyCreateWithoutDebtsInput, CompanyUncheckedCreateWithoutDebtsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutDebtsInput
    upsert?: CompanyUpsertWithoutDebtsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutDebtsInput, CompanyUpdateWithoutDebtsInput>, CompanyUncheckedUpdateWithoutDebtsInput>
  }

  export type CompanyCreateNestedOneWithoutMonthlyReportsInput = {
    create?: XOR<CompanyCreateWithoutMonthlyReportsInput, CompanyUncheckedCreateWithoutMonthlyReportsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutMonthlyReportsInput
    connect?: CompanyWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneRequiredWithoutMonthlyReportsNestedInput = {
    create?: XOR<CompanyCreateWithoutMonthlyReportsInput, CompanyUncheckedCreateWithoutMonthlyReportsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutMonthlyReportsInput
    upsert?: CompanyUpsertWithoutMonthlyReportsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutMonthlyReportsInput, CompanyUpdateWithoutMonthlyReportsInput>, CompanyUncheckedUpdateWithoutMonthlyReportsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type SaleCreateNestedOneWithoutRefundsInput = {
    create?: XOR<SaleCreateWithoutRefundsInput, SaleUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutRefundsInput
    connect?: SaleWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutRefundsInput = {
    create?: XOR<ProductCreateWithoutRefundsInput, ProductUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutRefundsInput
    connect?: ProductWhereUniqueInput
  }

  export type BatchCreateNestedOneWithoutRefundsInput = {
    create?: XOR<BatchCreateWithoutRefundsInput, BatchUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutRefundsInput
    connect?: BatchWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutRefundsInput = {
    create?: XOR<CompanyCreateWithoutRefundsInput, CompanyUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutRefundsInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProcessedRefundsInput = {
    create?: XOR<UserCreateWithoutProcessedRefundsInput, UserUncheckedCreateWithoutProcessedRefundsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProcessedRefundsInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumRefundTypeFieldUpdateOperationsInput = {
    set?: $Enums.RefundType
  }

  export type EnumRefundReasonFieldUpdateOperationsInput = {
    set?: $Enums.RefundReason
  }

  export type EnumItemConditionFieldUpdateOperationsInput = {
    set?: $Enums.ItemCondition
  }

  export type SaleUpdateOneRequiredWithoutRefundsNestedInput = {
    create?: XOR<SaleCreateWithoutRefundsInput, SaleUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutRefundsInput
    upsert?: SaleUpsertWithoutRefundsInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutRefundsInput, SaleUpdateWithoutRefundsInput>, SaleUncheckedUpdateWithoutRefundsInput>
  }

  export type ProductUpdateOneRequiredWithoutRefundsNestedInput = {
    create?: XOR<ProductCreateWithoutRefundsInput, ProductUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutRefundsInput
    upsert?: ProductUpsertWithoutRefundsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutRefundsInput, ProductUpdateWithoutRefundsInput>, ProductUncheckedUpdateWithoutRefundsInput>
  }

  export type BatchUpdateOneRequiredWithoutRefundsNestedInput = {
    create?: XOR<BatchCreateWithoutRefundsInput, BatchUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutRefundsInput
    upsert?: BatchUpsertWithoutRefundsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutRefundsInput, BatchUpdateWithoutRefundsInput>, BatchUncheckedUpdateWithoutRefundsInput>
  }

  export type CompanyUpdateOneRequiredWithoutRefundsNestedInput = {
    create?: XOR<CompanyCreateWithoutRefundsInput, CompanyUncheckedCreateWithoutRefundsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutRefundsInput
    upsert?: CompanyUpsertWithoutRefundsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutRefundsInput, CompanyUpdateWithoutRefundsInput>, CompanyUncheckedUpdateWithoutRefundsInput>
  }

  export type UserUpdateOneRequiredWithoutProcessedRefundsNestedInput = {
    create?: XOR<UserCreateWithoutProcessedRefundsInput, UserUncheckedCreateWithoutProcessedRefundsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProcessedRefundsInput
    upsert?: UserUpsertWithoutProcessedRefundsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProcessedRefundsInput, UserUpdateWithoutProcessedRefundsInput>, UserUncheckedUpdateWithoutProcessedRefundsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumRefundTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundType | EnumRefundTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundTypeFilter<$PrismaModel> | $Enums.RefundType
  }

  export type NestedEnumRefundReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonFilter<$PrismaModel> | $Enums.RefundReason
  }

  export type NestedEnumItemConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemCondition | EnumItemConditionFieldRefInput<$PrismaModel>
    in?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumItemConditionFilter<$PrismaModel> | $Enums.ItemCondition
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumRefundTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundType | EnumRefundTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundType[] | ListEnumRefundTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundTypeWithAggregatesFilter<$PrismaModel> | $Enums.RefundType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundTypeFilter<$PrismaModel>
    _max?: NestedEnumRefundTypeFilter<$PrismaModel>
  }

  export type NestedEnumRefundReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonWithAggregatesFilter<$PrismaModel> | $Enums.RefundReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundReasonFilter<$PrismaModel>
    _max?: NestedEnumRefundReasonFilter<$PrismaModel>
  }

  export type NestedEnumItemConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemCondition | EnumItemConditionFieldRefInput<$PrismaModel>
    in?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemCondition[] | ListEnumItemConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumItemConditionWithAggregatesFilter<$PrismaModel> | $Enums.ItemCondition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemConditionFilter<$PrismaModel>
    _max?: NestedEnumItemConditionFilter<$PrismaModel>
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    processedRefunds?: RefundCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    processedRefunds?: RefundUncheckedCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutCompanyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutCompanyInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput>
  }

  export type CategoryCreateManyCompanyInputEnvelope = {
    data: CategoryCreateManyCompanyInput | CategoryCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCompanyInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    batches?: BatchCreateNestedManyWithoutProductInput
    sales?: SaleCreateNestedManyWithoutProductInput
    debts?: DebtCreateNestedManyWithoutProductInput
    refunds?: RefundCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCompanyInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    batches?: BatchUncheckedCreateNestedManyWithoutProductInput
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
    debts?: DebtUncheckedCreateNestedManyWithoutProductInput
    refunds?: RefundUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCompanyInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput>
  }

  export type ProductCreateManyCompanyInputEnvelope = {
    data: ProductCreateManyCompanyInput | ProductCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type BatchCreateWithoutCompanyInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
    sales?: SaleCreateNestedManyWithoutBatchInput
    debts?: DebtCreateNestedManyWithoutBatchInput
    refunds?: RefundCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutCompanyInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    sales?: SaleUncheckedCreateNestedManyWithoutBatchInput
    debts?: DebtUncheckedCreateNestedManyWithoutBatchInput
    refunds?: RefundUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutCompanyInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutCompanyInput, BatchUncheckedCreateWithoutCompanyInput>
  }

  export type BatchCreateManyCompanyInputEnvelope = {
    data: BatchCreateManyCompanyInput | BatchCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type SaleCreateWithoutCompanyInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSalesInput
    batch: BatchCreateNestedOneWithoutSalesInput
    refunds?: RefundCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleUncheckedCreateWithoutCompanyInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
    refunds?: RefundUncheckedCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleCreateOrConnectWithoutCompanyInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutCompanyInput, SaleUncheckedCreateWithoutCompanyInput>
  }

  export type SaleCreateManyCompanyInputEnvelope = {
    data: SaleCreateManyCompanyInput | SaleCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type DebtCreateWithoutCompanyInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDebtsInput
    batch: BatchCreateNestedOneWithoutDebtsInput
  }

  export type DebtUncheckedCreateWithoutCompanyInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
  }

  export type DebtCreateOrConnectWithoutCompanyInput = {
    where: DebtWhereUniqueInput
    create: XOR<DebtCreateWithoutCompanyInput, DebtUncheckedCreateWithoutCompanyInput>
  }

  export type DebtCreateManyCompanyInputEnvelope = {
    data: DebtCreateManyCompanyInput | DebtCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type RefundCreateWithoutCompanyInput = {
    id?: string
    refundNumber: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    originalSale: SaleCreateNestedOneWithoutRefundsInput
    product: ProductCreateNestedOneWithoutRefundsInput
    batch: BatchCreateNestedOneWithoutRefundsInput
    processedByUser: UserCreateNestedOneWithoutProcessedRefundsInput
  }

  export type RefundUncheckedCreateWithoutCompanyInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundCreateOrConnectWithoutCompanyInput = {
    where: RefundWhereUniqueInput
    create: XOR<RefundCreateWithoutCompanyInput, RefundUncheckedCreateWithoutCompanyInput>
  }

  export type RefundCreateManyCompanyInputEnvelope = {
    data: RefundCreateManyCompanyInput | RefundCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type MonthlyReportCreateWithoutCompanyInput = {
    id?: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized?: boolean
    reportData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportUncheckedCreateWithoutCompanyInput = {
    id?: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized?: boolean
    reportData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportCreateOrConnectWithoutCompanyInput = {
    where: MonthlyReportWhereUniqueInput
    create: XOR<MonthlyReportCreateWithoutCompanyInput, MonthlyReportUncheckedCreateWithoutCompanyInput>
  }

  export type MonthlyReportCreateManyCompanyInputEnvelope = {
    data: MonthlyReportCreateManyCompanyInput | MonthlyReportCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    companyId?: StringFilter<"User"> | string
  }

  export type CategoryUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutCompanyInput, CategoryUncheckedUpdateWithoutCompanyInput>
    create: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutCompanyInput, CategoryUncheckedUpdateWithoutCompanyInput>
  }

  export type CategoryUpdateManyWithWhereWithoutCompanyInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    color?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    companyId?: StringFilter<"Category"> | string
  }

  export type ProductUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCompanyInput, ProductUncheckedUpdateWithoutCompanyInput>
    create: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCompanyInput, ProductUncheckedUpdateWithoutCompanyInput>
  }

  export type ProductUpdateManyWithWhereWithoutCompanyInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    sellingPrice?: FloatFilter<"Product"> | number
    totalStock?: IntFilter<"Product"> | number
    minStockLevel?: IntFilter<"Product"> | number
    location?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    fitment?: StringNullableFilter<"Product"> | string | null
    supplier?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: StringFilter<"Product"> | string
    companyId?: StringFilter<"Product"> | string
  }

  export type BatchUpsertWithWhereUniqueWithoutCompanyInput = {
    where: BatchWhereUniqueInput
    update: XOR<BatchUpdateWithoutCompanyInput, BatchUncheckedUpdateWithoutCompanyInput>
    create: XOR<BatchCreateWithoutCompanyInput, BatchUncheckedCreateWithoutCompanyInput>
  }

  export type BatchUpdateWithWhereUniqueWithoutCompanyInput = {
    where: BatchWhereUniqueInput
    data: XOR<BatchUpdateWithoutCompanyInput, BatchUncheckedUpdateWithoutCompanyInput>
  }

  export type BatchUpdateManyWithWhereWithoutCompanyInput = {
    where: BatchScalarWhereInput
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyWithoutCompanyInput>
  }

  export type BatchScalarWhereInput = {
    AND?: BatchScalarWhereInput | BatchScalarWhereInput[]
    OR?: BatchScalarWhereInput[]
    NOT?: BatchScalarWhereInput | BatchScalarWhereInput[]
    id?: StringFilter<"Batch"> | string
    purchaseDate?: DateTimeFilter<"Batch"> | Date | string
    purchasePrice?: FloatFilter<"Batch"> | number
    initialQuantity?: IntFilter<"Batch"> | number
    currentQuantity?: IntFilter<"Batch"> | number
    status?: StringFilter<"Batch"> | string
    supplier?: StringNullableFilter<"Batch"> | string | null
    invoiceNumber?: StringNullableFilter<"Batch"> | string | null
    notes?: StringNullableFilter<"Batch"> | string | null
    createdAt?: DateTimeFilter<"Batch"> | Date | string
    updatedAt?: DateTimeFilter<"Batch"> | Date | string
    productId?: StringFilter<"Batch"> | string
    companyId?: StringFilter<"Batch"> | string
  }

  export type SaleUpsertWithWhereUniqueWithoutCompanyInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutCompanyInput, SaleUncheckedUpdateWithoutCompanyInput>
    create: XOR<SaleCreateWithoutCompanyInput, SaleUncheckedCreateWithoutCompanyInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutCompanyInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutCompanyInput, SaleUncheckedUpdateWithoutCompanyInput>
  }

  export type SaleUpdateManyWithWhereWithoutCompanyInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutCompanyInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    quantity?: IntFilter<"Sale"> | number
    salePrice?: FloatFilter<"Sale"> | number
    purchasePrice?: FloatFilter<"Sale"> | number
    profit?: FloatFilter<"Sale"> | number
    profitMargin?: FloatFilter<"Sale"> | number
    saleDate?: DateTimeFilter<"Sale"> | Date | string
    customerId?: StringNullableFilter<"Sale"> | string | null
    invoiceNumber?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    productId?: StringFilter<"Sale"> | string
    batchId?: StringFilter<"Sale"> | string
    companyId?: StringFilter<"Sale"> | string
  }

  export type DebtUpsertWithWhereUniqueWithoutCompanyInput = {
    where: DebtWhereUniqueInput
    update: XOR<DebtUpdateWithoutCompanyInput, DebtUncheckedUpdateWithoutCompanyInput>
    create: XOR<DebtCreateWithoutCompanyInput, DebtUncheckedCreateWithoutCompanyInput>
  }

  export type DebtUpdateWithWhereUniqueWithoutCompanyInput = {
    where: DebtWhereUniqueInput
    data: XOR<DebtUpdateWithoutCompanyInput, DebtUncheckedUpdateWithoutCompanyInput>
  }

  export type DebtUpdateManyWithWhereWithoutCompanyInput = {
    where: DebtScalarWhereInput
    data: XOR<DebtUpdateManyMutationInput, DebtUncheckedUpdateManyWithoutCompanyInput>
  }

  export type DebtScalarWhereInput = {
    AND?: DebtScalarWhereInput | DebtScalarWhereInput[]
    OR?: DebtScalarWhereInput[]
    NOT?: DebtScalarWhereInput | DebtScalarWhereInput[]
    id?: StringFilter<"Debt"> | string
    quantity?: IntFilter<"Debt"> | number
    unitPrice?: FloatFilter<"Debt"> | number
    totalAmount?: FloatFilter<"Debt"> | number
    purchasePrice?: FloatFilter<"Debt"> | number
    debtDate?: DateTimeFilter<"Debt"> | Date | string
    customerName?: StringNullableFilter<"Debt"> | string | null
    notes?: StringNullableFilter<"Debt"> | string | null
    status?: StringFilter<"Debt"> | string
    paidDate?: DateTimeNullableFilter<"Debt"> | Date | string | null
    createdAt?: DateTimeFilter<"Debt"> | Date | string
    updatedAt?: DateTimeFilter<"Debt"> | Date | string
    productId?: StringFilter<"Debt"> | string
    batchId?: StringFilter<"Debt"> | string
    companyId?: StringFilter<"Debt"> | string
  }

  export type RefundUpsertWithWhereUniqueWithoutCompanyInput = {
    where: RefundWhereUniqueInput
    update: XOR<RefundUpdateWithoutCompanyInput, RefundUncheckedUpdateWithoutCompanyInput>
    create: XOR<RefundCreateWithoutCompanyInput, RefundUncheckedCreateWithoutCompanyInput>
  }

  export type RefundUpdateWithWhereUniqueWithoutCompanyInput = {
    where: RefundWhereUniqueInput
    data: XOR<RefundUpdateWithoutCompanyInput, RefundUncheckedUpdateWithoutCompanyInput>
  }

  export type RefundUpdateManyWithWhereWithoutCompanyInput = {
    where: RefundScalarWhereInput
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyWithoutCompanyInput>
  }

  export type RefundScalarWhereInput = {
    AND?: RefundScalarWhereInput | RefundScalarWhereInput[]
    OR?: RefundScalarWhereInput[]
    NOT?: RefundScalarWhereInput | RefundScalarWhereInput[]
    id?: StringFilter<"Refund"> | string
    refundNumber?: StringFilter<"Refund"> | string
    originalSaleId?: StringFilter<"Refund"> | string
    productId?: StringFilter<"Refund"> | string
    batchId?: StringFilter<"Refund"> | string
    quantity?: IntFilter<"Refund"> | number
    unitPrice?: DecimalFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFilter<"Refund"> | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFilter<"Refund"> | $Enums.RefundType
    reason?: EnumRefundReasonFilter<"Refund"> | $Enums.RefundReason
    customReason?: StringNullableFilter<"Refund"> | string | null
    refundDate?: DateTimeFilter<"Refund"> | Date | string
    processedBy?: StringFilter<"Refund"> | string
    itemCondition?: EnumItemConditionFilter<"Refund"> | $Enums.ItemCondition
    returnToInventory?: BoolFilter<"Refund"> | boolean
    companyId?: StringFilter<"Refund"> | string
    createdAt?: DateTimeFilter<"Refund"> | Date | string
    updatedAt?: DateTimeFilter<"Refund"> | Date | string
  }

  export type MonthlyReportUpsertWithWhereUniqueWithoutCompanyInput = {
    where: MonthlyReportWhereUniqueInput
    update: XOR<MonthlyReportUpdateWithoutCompanyInput, MonthlyReportUncheckedUpdateWithoutCompanyInput>
    create: XOR<MonthlyReportCreateWithoutCompanyInput, MonthlyReportUncheckedCreateWithoutCompanyInput>
  }

  export type MonthlyReportUpdateWithWhereUniqueWithoutCompanyInput = {
    where: MonthlyReportWhereUniqueInput
    data: XOR<MonthlyReportUpdateWithoutCompanyInput, MonthlyReportUncheckedUpdateWithoutCompanyInput>
  }

  export type MonthlyReportUpdateManyWithWhereWithoutCompanyInput = {
    where: MonthlyReportScalarWhereInput
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyWithoutCompanyInput>
  }

  export type MonthlyReportScalarWhereInput = {
    AND?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
    OR?: MonthlyReportScalarWhereInput[]
    NOT?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
    id?: StringFilter<"MonthlyReport"> | string
    year?: IntFilter<"MonthlyReport"> | number
    month?: IntFilter<"MonthlyReport"> | number
    totalSales?: FloatFilter<"MonthlyReport"> | number
    totalProfit?: FloatFilter<"MonthlyReport"> | number
    averageProfitMargin?: FloatFilter<"MonthlyReport"> | number
    isFinalized?: BoolFilter<"MonthlyReport"> | boolean
    reportData?: JsonFilter<"MonthlyReport">
    createdAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    companyId?: StringFilter<"MonthlyReport"> | string
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefundCreateWithoutProcessedByUserInput = {
    id?: string
    refundNumber: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    originalSale: SaleCreateNestedOneWithoutRefundsInput
    product: ProductCreateNestedOneWithoutRefundsInput
    batch: BatchCreateNestedOneWithoutRefundsInput
    company: CompanyCreateNestedOneWithoutRefundsInput
  }

  export type RefundUncheckedCreateWithoutProcessedByUserInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundCreateOrConnectWithoutProcessedByUserInput = {
    where: RefundWhereUniqueInput
    create: XOR<RefundCreateWithoutProcessedByUserInput, RefundUncheckedCreateWithoutProcessedByUserInput>
  }

  export type RefundCreateManyProcessedByUserInputEnvelope = {
    data: RefundCreateManyProcessedByUserInput | RefundCreateManyProcessedByUserInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type RefundUpsertWithWhereUniqueWithoutProcessedByUserInput = {
    where: RefundWhereUniqueInput
    update: XOR<RefundUpdateWithoutProcessedByUserInput, RefundUncheckedUpdateWithoutProcessedByUserInput>
    create: XOR<RefundCreateWithoutProcessedByUserInput, RefundUncheckedCreateWithoutProcessedByUserInput>
  }

  export type RefundUpdateWithWhereUniqueWithoutProcessedByUserInput = {
    where: RefundWhereUniqueInput
    data: XOR<RefundUpdateWithoutProcessedByUserInput, RefundUncheckedUpdateWithoutProcessedByUserInput>
  }

  export type RefundUpdateManyWithWhereWithoutProcessedByUserInput = {
    where: RefundScalarWhereInput
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyWithoutProcessedByUserInput>
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: BatchCreateNestedManyWithoutProductInput
    sales?: SaleCreateNestedManyWithoutProductInput
    debts?: DebtCreateNestedManyWithoutProductInput
    refunds?: RefundCreateNestedManyWithoutProductInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    batches?: BatchUncheckedCreateNestedManyWithoutProductInput
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
    debts?: DebtUncheckedCreateNestedManyWithoutProductInput
    refunds?: RefundUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CompanyCreateWithoutCategoriesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCategoriesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCategoriesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CompanyUpsertWithoutCategoriesInput = {
    update: XOR<CompanyUpdateWithoutCategoriesInput, CompanyUncheckedUpdateWithoutCategoriesInput>
    create: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCategoriesInput, CompanyUncheckedUpdateWithoutCategoriesInput>
  }

  export type CompanyUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type BatchCreateWithoutProductInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutBatchInput
    debts?: DebtCreateNestedManyWithoutBatchInput
    refunds?: RefundCreateNestedManyWithoutBatchInput
    company: CompanyCreateNestedOneWithoutBatchesInput
  }

  export type BatchUncheckedCreateWithoutProductInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    sales?: SaleUncheckedCreateNestedManyWithoutBatchInput
    debts?: DebtUncheckedCreateNestedManyWithoutBatchInput
    refunds?: RefundUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutProductInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutProductInput, BatchUncheckedCreateWithoutProductInput>
  }

  export type BatchCreateManyProductInputEnvelope = {
    data: BatchCreateManyProductInput | BatchCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type SaleCreateWithoutProductInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutSalesInput
    company: CompanyCreateNestedOneWithoutSalesInput
    refunds?: RefundCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleUncheckedCreateWithoutProductInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batchId: string
    companyId: string
    refunds?: RefundUncheckedCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleCreateOrConnectWithoutProductInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput>
  }

  export type SaleCreateManyProductInputEnvelope = {
    data: SaleCreateManyProductInput | SaleCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type DebtCreateWithoutProductInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutDebtsInput
    company: CompanyCreateNestedOneWithoutDebtsInput
  }

  export type DebtUncheckedCreateWithoutProductInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batchId: string
    companyId: string
  }

  export type DebtCreateOrConnectWithoutProductInput = {
    where: DebtWhereUniqueInput
    create: XOR<DebtCreateWithoutProductInput, DebtUncheckedCreateWithoutProductInput>
  }

  export type DebtCreateManyProductInputEnvelope = {
    data: DebtCreateManyProductInput | DebtCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type RefundCreateWithoutProductInput = {
    id?: string
    refundNumber: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    originalSale: SaleCreateNestedOneWithoutRefundsInput
    batch: BatchCreateNestedOneWithoutRefundsInput
    company: CompanyCreateNestedOneWithoutRefundsInput
    processedByUser: UserCreateNestedOneWithoutProcessedRefundsInput
  }

  export type RefundUncheckedCreateWithoutProductInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundCreateOrConnectWithoutProductInput = {
    where: RefundWhereUniqueInput
    create: XOR<RefundCreateWithoutProductInput, RefundUncheckedCreateWithoutProductInput>
  }

  export type RefundCreateManyProductInputEnvelope = {
    data: RefundCreateManyProductInput | RefundCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CompanyCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutProductsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type BatchUpsertWithWhereUniqueWithoutProductInput = {
    where: BatchWhereUniqueInput
    update: XOR<BatchUpdateWithoutProductInput, BatchUncheckedUpdateWithoutProductInput>
    create: XOR<BatchCreateWithoutProductInput, BatchUncheckedCreateWithoutProductInput>
  }

  export type BatchUpdateWithWhereUniqueWithoutProductInput = {
    where: BatchWhereUniqueInput
    data: XOR<BatchUpdateWithoutProductInput, BatchUncheckedUpdateWithoutProductInput>
  }

  export type BatchUpdateManyWithWhereWithoutProductInput = {
    where: BatchScalarWhereInput
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyWithoutProductInput>
  }

  export type SaleUpsertWithWhereUniqueWithoutProductInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutProductInput, SaleUncheckedUpdateWithoutProductInput>
    create: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutProductInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutProductInput, SaleUncheckedUpdateWithoutProductInput>
  }

  export type SaleUpdateManyWithWhereWithoutProductInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutProductInput>
  }

  export type DebtUpsertWithWhereUniqueWithoutProductInput = {
    where: DebtWhereUniqueInput
    update: XOR<DebtUpdateWithoutProductInput, DebtUncheckedUpdateWithoutProductInput>
    create: XOR<DebtCreateWithoutProductInput, DebtUncheckedCreateWithoutProductInput>
  }

  export type DebtUpdateWithWhereUniqueWithoutProductInput = {
    where: DebtWhereUniqueInput
    data: XOR<DebtUpdateWithoutProductInput, DebtUncheckedUpdateWithoutProductInput>
  }

  export type DebtUpdateManyWithWhereWithoutProductInput = {
    where: DebtScalarWhereInput
    data: XOR<DebtUpdateManyMutationInput, DebtUncheckedUpdateManyWithoutProductInput>
  }

  export type RefundUpsertWithWhereUniqueWithoutProductInput = {
    where: RefundWhereUniqueInput
    update: XOR<RefundUpdateWithoutProductInput, RefundUncheckedUpdateWithoutProductInput>
    create: XOR<RefundCreateWithoutProductInput, RefundUncheckedCreateWithoutProductInput>
  }

  export type RefundUpdateWithWhereUniqueWithoutProductInput = {
    where: RefundWhereUniqueInput
    data: XOR<RefundUpdateWithoutProductInput, RefundUncheckedUpdateWithoutProductInput>
  }

  export type RefundUpdateManyWithWhereWithoutProductInput = {
    where: RefundScalarWhereInput
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyWithoutProductInput>
  }

  export type CompanyUpsertWithoutProductsInput = {
    update: XOR<CompanyUpdateWithoutProductsInput, CompanyUncheckedUpdateWithoutProductsInput>
    create: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutProductsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutProductsInput, CompanyUncheckedUpdateWithoutProductsInput>
  }

  export type CompanyUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ProductCreateWithoutBatchesInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    sales?: SaleCreateNestedManyWithoutProductInput
    debts?: DebtCreateNestedManyWithoutProductInput
    refunds?: RefundCreateNestedManyWithoutProductInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutBatchesInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    companyId: string
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
    debts?: DebtUncheckedCreateNestedManyWithoutProductInput
    refunds?: RefundUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBatchesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
  }

  export type SaleCreateWithoutBatchInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSalesInput
    company: CompanyCreateNestedOneWithoutSalesInput
    refunds?: RefundCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleUncheckedCreateWithoutBatchInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
    refunds?: RefundUncheckedCreateNestedManyWithoutOriginalSaleInput
  }

  export type SaleCreateOrConnectWithoutBatchInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutBatchInput, SaleUncheckedCreateWithoutBatchInput>
  }

  export type SaleCreateManyBatchInputEnvelope = {
    data: SaleCreateManyBatchInput | SaleCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type DebtCreateWithoutBatchInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDebtsInput
    company: CompanyCreateNestedOneWithoutDebtsInput
  }

  export type DebtUncheckedCreateWithoutBatchInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
  }

  export type DebtCreateOrConnectWithoutBatchInput = {
    where: DebtWhereUniqueInput
    create: XOR<DebtCreateWithoutBatchInput, DebtUncheckedCreateWithoutBatchInput>
  }

  export type DebtCreateManyBatchInputEnvelope = {
    data: DebtCreateManyBatchInput | DebtCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type RefundCreateWithoutBatchInput = {
    id?: string
    refundNumber: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    originalSale: SaleCreateNestedOneWithoutRefundsInput
    product: ProductCreateNestedOneWithoutRefundsInput
    company: CompanyCreateNestedOneWithoutRefundsInput
    processedByUser: UserCreateNestedOneWithoutProcessedRefundsInput
  }

  export type RefundUncheckedCreateWithoutBatchInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundCreateOrConnectWithoutBatchInput = {
    where: RefundWhereUniqueInput
    create: XOR<RefundCreateWithoutBatchInput, RefundUncheckedCreateWithoutBatchInput>
  }

  export type RefundCreateManyBatchInputEnvelope = {
    data: RefundCreateManyBatchInput | RefundCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type CompanyCreateWithoutBatchesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutBatchesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutBatchesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutBatchesInput, CompanyUncheckedCreateWithoutBatchesInput>
  }

  export type ProductUpsertWithoutBatchesInput = {
    update: XOR<ProductUpdateWithoutBatchesInput, ProductUncheckedUpdateWithoutBatchesInput>
    create: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutBatchesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutBatchesInput, ProductUncheckedUpdateWithoutBatchesInput>
  }

  export type ProductUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
    debts?: DebtUpdateManyWithoutProductNestedInput
    refunds?: RefundUpdateManyWithoutProductNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
    debts?: DebtUncheckedUpdateManyWithoutProductNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutProductNestedInput
  }

  export type SaleUpsertWithWhereUniqueWithoutBatchInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutBatchInput, SaleUncheckedUpdateWithoutBatchInput>
    create: XOR<SaleCreateWithoutBatchInput, SaleUncheckedCreateWithoutBatchInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutBatchInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutBatchInput, SaleUncheckedUpdateWithoutBatchInput>
  }

  export type SaleUpdateManyWithWhereWithoutBatchInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutBatchInput>
  }

  export type DebtUpsertWithWhereUniqueWithoutBatchInput = {
    where: DebtWhereUniqueInput
    update: XOR<DebtUpdateWithoutBatchInput, DebtUncheckedUpdateWithoutBatchInput>
    create: XOR<DebtCreateWithoutBatchInput, DebtUncheckedCreateWithoutBatchInput>
  }

  export type DebtUpdateWithWhereUniqueWithoutBatchInput = {
    where: DebtWhereUniqueInput
    data: XOR<DebtUpdateWithoutBatchInput, DebtUncheckedUpdateWithoutBatchInput>
  }

  export type DebtUpdateManyWithWhereWithoutBatchInput = {
    where: DebtScalarWhereInput
    data: XOR<DebtUpdateManyMutationInput, DebtUncheckedUpdateManyWithoutBatchInput>
  }

  export type RefundUpsertWithWhereUniqueWithoutBatchInput = {
    where: RefundWhereUniqueInput
    update: XOR<RefundUpdateWithoutBatchInput, RefundUncheckedUpdateWithoutBatchInput>
    create: XOR<RefundCreateWithoutBatchInput, RefundUncheckedCreateWithoutBatchInput>
  }

  export type RefundUpdateWithWhereUniqueWithoutBatchInput = {
    where: RefundWhereUniqueInput
    data: XOR<RefundUpdateWithoutBatchInput, RefundUncheckedUpdateWithoutBatchInput>
  }

  export type RefundUpdateManyWithWhereWithoutBatchInput = {
    where: RefundScalarWhereInput
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyWithoutBatchInput>
  }

  export type CompanyUpsertWithoutBatchesInput = {
    update: XOR<CompanyUpdateWithoutBatchesInput, CompanyUncheckedUpdateWithoutBatchesInput>
    create: XOR<CompanyCreateWithoutBatchesInput, CompanyUncheckedCreateWithoutBatchesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutBatchesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutBatchesInput, CompanyUncheckedUpdateWithoutBatchesInput>
  }

  export type CompanyUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ProductCreateWithoutSalesInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    batches?: BatchCreateNestedManyWithoutProductInput
    debts?: DebtCreateNestedManyWithoutProductInput
    refunds?: RefundCreateNestedManyWithoutProductInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutSalesInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    companyId: string
    batches?: BatchUncheckedCreateNestedManyWithoutProductInput
    debts?: DebtUncheckedCreateNestedManyWithoutProductInput
    refunds?: RefundUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSalesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
  }

  export type BatchCreateWithoutSalesInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
    debts?: DebtCreateNestedManyWithoutBatchInput
    refunds?: RefundCreateNestedManyWithoutBatchInput
    company: CompanyCreateNestedOneWithoutBatchesInput
  }

  export type BatchUncheckedCreateWithoutSalesInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
    debts?: DebtUncheckedCreateNestedManyWithoutBatchInput
    refunds?: RefundUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutSalesInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutSalesInput, BatchUncheckedCreateWithoutSalesInput>
  }

  export type CompanyCreateWithoutSalesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutSalesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutSalesInput, CompanyUncheckedCreateWithoutSalesInput>
  }

  export type RefundCreateWithoutOriginalSaleInput = {
    id?: string
    refundNumber: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutRefundsInput
    batch: BatchCreateNestedOneWithoutRefundsInput
    company: CompanyCreateNestedOneWithoutRefundsInput
    processedByUser: UserCreateNestedOneWithoutProcessedRefundsInput
  }

  export type RefundUncheckedCreateWithoutOriginalSaleInput = {
    id?: string
    refundNumber: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundCreateOrConnectWithoutOriginalSaleInput = {
    where: RefundWhereUniqueInput
    create: XOR<RefundCreateWithoutOriginalSaleInput, RefundUncheckedCreateWithoutOriginalSaleInput>
  }

  export type RefundCreateManyOriginalSaleInputEnvelope = {
    data: RefundCreateManyOriginalSaleInput | RefundCreateManyOriginalSaleInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutSalesInput = {
    update: XOR<ProductUpdateWithoutSalesInput, ProductUncheckedUpdateWithoutSalesInput>
    create: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSalesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSalesInput, ProductUncheckedUpdateWithoutSalesInput>
  }

  export type ProductUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    batches?: BatchUpdateManyWithoutProductNestedInput
    debts?: DebtUpdateManyWithoutProductNestedInput
    refunds?: RefundUpdateManyWithoutProductNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    batches?: BatchUncheckedUpdateManyWithoutProductNestedInput
    debts?: DebtUncheckedUpdateManyWithoutProductNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutProductNestedInput
  }

  export type BatchUpsertWithoutSalesInput = {
    update: XOR<BatchUpdateWithoutSalesInput, BatchUncheckedUpdateWithoutSalesInput>
    create: XOR<BatchCreateWithoutSalesInput, BatchUncheckedCreateWithoutSalesInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutSalesInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutSalesInput, BatchUncheckedUpdateWithoutSalesInput>
  }

  export type BatchUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
    debts?: DebtUpdateManyWithoutBatchNestedInput
    refunds?: RefundUpdateManyWithoutBatchNestedInput
    company?: CompanyUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type BatchUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    debts?: DebtUncheckedUpdateManyWithoutBatchNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type CompanyUpsertWithoutSalesInput = {
    update: XOR<CompanyUpdateWithoutSalesInput, CompanyUncheckedUpdateWithoutSalesInput>
    create: XOR<CompanyCreateWithoutSalesInput, CompanyUncheckedCreateWithoutSalesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutSalesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutSalesInput, CompanyUncheckedUpdateWithoutSalesInput>
  }

  export type CompanyUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type RefundUpsertWithWhereUniqueWithoutOriginalSaleInput = {
    where: RefundWhereUniqueInput
    update: XOR<RefundUpdateWithoutOriginalSaleInput, RefundUncheckedUpdateWithoutOriginalSaleInput>
    create: XOR<RefundCreateWithoutOriginalSaleInput, RefundUncheckedCreateWithoutOriginalSaleInput>
  }

  export type RefundUpdateWithWhereUniqueWithoutOriginalSaleInput = {
    where: RefundWhereUniqueInput
    data: XOR<RefundUpdateWithoutOriginalSaleInput, RefundUncheckedUpdateWithoutOriginalSaleInput>
  }

  export type RefundUpdateManyWithWhereWithoutOriginalSaleInput = {
    where: RefundScalarWhereInput
    data: XOR<RefundUpdateManyMutationInput, RefundUncheckedUpdateManyWithoutOriginalSaleInput>
  }

  export type ProductCreateWithoutDebtsInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    batches?: BatchCreateNestedManyWithoutProductInput
    sales?: SaleCreateNestedManyWithoutProductInput
    refunds?: RefundCreateNestedManyWithoutProductInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutDebtsInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    companyId: string
    batches?: BatchUncheckedCreateNestedManyWithoutProductInput
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
    refunds?: RefundUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDebtsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDebtsInput, ProductUncheckedCreateWithoutDebtsInput>
  }

  export type BatchCreateWithoutDebtsInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
    sales?: SaleCreateNestedManyWithoutBatchInput
    refunds?: RefundCreateNestedManyWithoutBatchInput
    company: CompanyCreateNestedOneWithoutBatchesInput
  }

  export type BatchUncheckedCreateWithoutDebtsInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
    sales?: SaleUncheckedCreateNestedManyWithoutBatchInput
    refunds?: RefundUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutDebtsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutDebtsInput, BatchUncheckedCreateWithoutDebtsInput>
  }

  export type CompanyCreateWithoutDebtsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutDebtsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutDebtsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutDebtsInput, CompanyUncheckedCreateWithoutDebtsInput>
  }

  export type ProductUpsertWithoutDebtsInput = {
    update: XOR<ProductUpdateWithoutDebtsInput, ProductUncheckedUpdateWithoutDebtsInput>
    create: XOR<ProductCreateWithoutDebtsInput, ProductUncheckedCreateWithoutDebtsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutDebtsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutDebtsInput, ProductUncheckedUpdateWithoutDebtsInput>
  }

  export type ProductUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    batches?: BatchUpdateManyWithoutProductNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
    refunds?: RefundUpdateManyWithoutProductNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    batches?: BatchUncheckedUpdateManyWithoutProductNestedInput
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutProductNestedInput
  }

  export type BatchUpsertWithoutDebtsInput = {
    update: XOR<BatchUpdateWithoutDebtsInput, BatchUncheckedUpdateWithoutDebtsInput>
    create: XOR<BatchCreateWithoutDebtsInput, BatchUncheckedCreateWithoutDebtsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutDebtsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutDebtsInput, BatchUncheckedUpdateWithoutDebtsInput>
  }

  export type BatchUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
    sales?: SaleUpdateManyWithoutBatchNestedInput
    refunds?: RefundUpdateManyWithoutBatchNestedInput
    company?: CompanyUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type BatchUncheckedUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutBatchNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type CompanyUpsertWithoutDebtsInput = {
    update: XOR<CompanyUpdateWithoutDebtsInput, CompanyUncheckedUpdateWithoutDebtsInput>
    create: XOR<CompanyCreateWithoutDebtsInput, CompanyUncheckedCreateWithoutDebtsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutDebtsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutDebtsInput, CompanyUncheckedUpdateWithoutDebtsInput>
  }

  export type CompanyUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutDebtsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutMonthlyReportsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    refunds?: RefundCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutMonthlyReportsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    refunds?: RefundUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutMonthlyReportsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutMonthlyReportsInput, CompanyUncheckedCreateWithoutMonthlyReportsInput>
  }

  export type CompanyUpsertWithoutMonthlyReportsInput = {
    update: XOR<CompanyUpdateWithoutMonthlyReportsInput, CompanyUncheckedUpdateWithoutMonthlyReportsInput>
    create: XOR<CompanyCreateWithoutMonthlyReportsInput, CompanyUncheckedCreateWithoutMonthlyReportsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutMonthlyReportsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutMonthlyReportsInput, CompanyUncheckedUpdateWithoutMonthlyReportsInput>
  }

  export type CompanyUpdateWithoutMonthlyReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutMonthlyReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    processedRefunds?: RefundCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    processedRefunds?: RefundUncheckedCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUncheckedUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    processedRefunds?: RefundCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    processedRefunds?: RefundUncheckedCreateNestedManyWithoutProcessedByUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUncheckedUpdateManyWithoutProcessedByUserNestedInput
  }

  export type SaleCreateWithoutRefundsInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSalesInput
    batch: BatchCreateNestedOneWithoutSalesInput
    company: CompanyCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutRefundsInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
    companyId: string
  }

  export type SaleCreateOrConnectWithoutRefundsInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutRefundsInput, SaleUncheckedCreateWithoutRefundsInput>
  }

  export type ProductCreateWithoutRefundsInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    batches?: BatchCreateNestedManyWithoutProductInput
    sales?: SaleCreateNestedManyWithoutProductInput
    debts?: DebtCreateNestedManyWithoutProductInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutRefundsInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    companyId: string
    batches?: BatchUncheckedCreateNestedManyWithoutProductInput
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
    debts?: DebtUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutRefundsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutRefundsInput, ProductUncheckedCreateWithoutRefundsInput>
  }

  export type BatchCreateWithoutRefundsInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
    sales?: SaleCreateNestedManyWithoutBatchInput
    debts?: DebtCreateNestedManyWithoutBatchInput
    company: CompanyCreateNestedOneWithoutBatchesInput
  }

  export type BatchUncheckedCreateWithoutRefundsInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
    sales?: SaleUncheckedCreateNestedManyWithoutBatchInput
    debts?: DebtUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutRefundsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutRefundsInput, BatchUncheckedCreateWithoutRefundsInput>
  }

  export type CompanyCreateWithoutRefundsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    batches?: BatchCreateNestedManyWithoutCompanyInput
    sales?: SaleCreateNestedManyWithoutCompanyInput
    debts?: DebtCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutRefundsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    batches?: BatchUncheckedCreateNestedManyWithoutCompanyInput
    sales?: SaleUncheckedCreateNestedManyWithoutCompanyInput
    debts?: DebtUncheckedCreateNestedManyWithoutCompanyInput
    monthlyReports?: MonthlyReportUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutRefundsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutRefundsInput, CompanyUncheckedCreateWithoutRefundsInput>
  }

  export type UserCreateWithoutProcessedRefundsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProcessedRefundsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProcessedRefundsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProcessedRefundsInput, UserUncheckedCreateWithoutProcessedRefundsInput>
  }

  export type SaleUpsertWithoutRefundsInput = {
    update: XOR<SaleUpdateWithoutRefundsInput, SaleUncheckedUpdateWithoutRefundsInput>
    create: XOR<SaleCreateWithoutRefundsInput, SaleUncheckedCreateWithoutRefundsInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutRefundsInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutRefundsInput, SaleUncheckedUpdateWithoutRefundsInput>
  }

  export type SaleUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
    batch?: BatchUpdateOneRequiredWithoutSalesNestedInput
    company?: CompanyUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUpsertWithoutRefundsInput = {
    update: XOR<ProductUpdateWithoutRefundsInput, ProductUncheckedUpdateWithoutRefundsInput>
    create: XOR<ProductCreateWithoutRefundsInput, ProductUncheckedCreateWithoutRefundsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutRefundsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutRefundsInput, ProductUncheckedUpdateWithoutRefundsInput>
  }

  export type ProductUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    batches?: BatchUpdateManyWithoutProductNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
    debts?: DebtUpdateManyWithoutProductNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    batches?: BatchUncheckedUpdateManyWithoutProductNestedInput
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
    debts?: DebtUncheckedUpdateManyWithoutProductNestedInput
  }

  export type BatchUpsertWithoutRefundsInput = {
    update: XOR<BatchUpdateWithoutRefundsInput, BatchUncheckedUpdateWithoutRefundsInput>
    create: XOR<BatchCreateWithoutRefundsInput, BatchUncheckedCreateWithoutRefundsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutRefundsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutRefundsInput, BatchUncheckedUpdateWithoutRefundsInput>
  }

  export type BatchUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
    sales?: SaleUpdateManyWithoutBatchNestedInput
    debts?: DebtUpdateManyWithoutBatchNestedInput
    company?: CompanyUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type BatchUncheckedUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutBatchNestedInput
    debts?: DebtUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type CompanyUpsertWithoutRefundsInput = {
    update: XOR<CompanyUpdateWithoutRefundsInput, CompanyUncheckedUpdateWithoutRefundsInput>
    create: XOR<CompanyCreateWithoutRefundsInput, CompanyUncheckedCreateWithoutRefundsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutRefundsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutRefundsInput, CompanyUncheckedUpdateWithoutRefundsInput>
  }

  export type CompanyUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    batches?: BatchUpdateManyWithoutCompanyNestedInput
    sales?: SaleUpdateManyWithoutCompanyNestedInput
    debts?: DebtUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    batches?: BatchUncheckedUpdateManyWithoutCompanyNestedInput
    sales?: SaleUncheckedUpdateManyWithoutCompanyNestedInput
    debts?: DebtUncheckedUpdateManyWithoutCompanyNestedInput
    monthlyReports?: MonthlyReportUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserUpsertWithoutProcessedRefundsInput = {
    update: XOR<UserUpdateWithoutProcessedRefundsInput, UserUncheckedUpdateWithoutProcessedRefundsInput>
    create: XOR<UserCreateWithoutProcessedRefundsInput, UserUncheckedCreateWithoutProcessedRefundsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProcessedRefundsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProcessedRefundsInput, UserUncheckedUpdateWithoutProcessedRefundsInput>
  }

  export type UserUpdateWithoutProcessedRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProcessedRefundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyCompanyInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateManyCompanyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyCompanyInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
  }

  export type BatchCreateManyCompanyInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
  }

  export type SaleCreateManyCompanyInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
  }

  export type DebtCreateManyCompanyInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    batchId: string
  }

  export type RefundCreateManyCompanyInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportCreateManyCompanyInput = {
    id?: string
    year: number
    month: number
    totalSales: number
    totalProfit: number
    averageProfitMargin: number
    isFinalized?: boolean
    reportData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    processedRefunds?: RefundUncheckedUpdateManyWithoutProcessedByUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    batches?: BatchUpdateManyWithoutProductNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
    debts?: DebtUpdateManyWithoutProductNestedInput
    refunds?: RefundUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    batches?: BatchUncheckedUpdateManyWithoutProductNestedInput
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
    debts?: DebtUncheckedUpdateManyWithoutProductNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type BatchUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
    sales?: SaleUpdateManyWithoutBatchNestedInput
    debts?: DebtUpdateManyWithoutBatchNestedInput
    refunds?: RefundUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutBatchNestedInput
    debts?: DebtUncheckedUpdateManyWithoutBatchNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type SaleUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
    batch?: BatchUpdateOneRequiredWithoutSalesNestedInput
    refunds?: RefundUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    refunds?: RefundUncheckedUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDebtsNestedInput
    batch?: BatchUpdateOneRequiredWithoutDebtsNestedInput
  }

  export type DebtUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
  }

  export type RefundUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalSale?: SaleUpdateOneRequiredWithoutRefundsNestedInput
    product?: ProductUpdateOneRequiredWithoutRefundsNestedInput
    batch?: BatchUpdateOneRequiredWithoutRefundsNestedInput
    processedByUser?: UserUpdateOneRequiredWithoutProcessedRefundsNestedInput
  }

  export type RefundUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    totalSales?: FloatFieldUpdateOperationsInput | number
    totalProfit?: FloatFieldUpdateOperationsInput | number
    averageProfitMargin?: FloatFieldUpdateOperationsInput | number
    isFinalized?: BoolFieldUpdateOperationsInput | boolean
    reportData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type RefundCreateManyProcessedByUserInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUpdateWithoutProcessedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalSale?: SaleUpdateOneRequiredWithoutRefundsNestedInput
    product?: ProductUpdateOneRequiredWithoutRefundsNestedInput
    batch?: BatchUpdateOneRequiredWithoutRefundsNestedInput
    company?: CompanyUpdateOneRequiredWithoutRefundsNestedInput
  }

  export type RefundUncheckedUpdateWithoutProcessedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUncheckedUpdateManyWithoutProcessedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    sku: string
    name: string
    description?: string | null
    sellingPrice: number
    totalStock?: number
    minStockLevel?: number
    location?: string | null
    imageUrl?: string | null
    fitment?: string | null
    supplier?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: BatchUpdateManyWithoutProductNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
    debts?: DebtUpdateManyWithoutProductNestedInput
    refunds?: RefundUpdateManyWithoutProductNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    batches?: BatchUncheckedUpdateManyWithoutProductNestedInput
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
    debts?: DebtUncheckedUpdateManyWithoutProductNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sellingPrice?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    minStockLevel?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fitment?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type BatchCreateManyProductInput = {
    id?: string
    purchaseDate: Date | string
    purchasePrice: number
    initialQuantity: number
    currentQuantity: number
    status?: string
    supplier?: string | null
    invoiceNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    companyId: string
  }

  export type SaleCreateManyProductInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batchId: string
    companyId: string
  }

  export type DebtCreateManyProductInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batchId: string
    companyId: string
  }

  export type RefundCreateManyProductInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BatchUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutBatchNestedInput
    debts?: DebtUpdateManyWithoutBatchNestedInput
    refunds?: RefundUpdateManyWithoutBatchNestedInput
    company?: CompanyUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type BatchUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutBatchNestedInput
    debts?: DebtUncheckedUpdateManyWithoutBatchNestedInput
    refunds?: RefundUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    initialQuantity?: IntFieldUpdateOperationsInput | number
    currentQuantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type SaleUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutSalesNestedInput
    company?: CompanyUpdateOneRequiredWithoutSalesNestedInput
    refunds?: RefundUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    refunds?: RefundUncheckedUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutDebtsNestedInput
    company?: CompanyUpdateOneRequiredWithoutDebtsNestedInput
  }

  export type DebtUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type RefundUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalSale?: SaleUpdateOneRequiredWithoutRefundsNestedInput
    batch?: BatchUpdateOneRequiredWithoutRefundsNestedInput
    company?: CompanyUpdateOneRequiredWithoutRefundsNestedInput
    processedByUser?: UserUpdateOneRequiredWithoutProcessedRefundsNestedInput
  }

  export type RefundUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyBatchInput = {
    id?: string
    quantity: number
    salePrice: number
    purchasePrice: number
    profit: number
    profitMargin: number
    saleDate: Date | string
    customerId?: string | null
    invoiceNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
  }

  export type DebtCreateManyBatchInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalAmount: number
    purchasePrice: number
    debtDate: Date | string
    customerName?: string | null
    notes?: string | null
    status?: string
    paidDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    productId: string
    companyId: string
  }

  export type RefundCreateManyBatchInput = {
    id?: string
    refundNumber: string
    originalSaleId: string
    productId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
    company?: CompanyUpdateOneRequiredWithoutSalesNestedInput
    refunds?: RefundUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    refunds?: RefundUncheckedUpdateManyWithoutOriginalSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    salePrice?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    profit?: FloatFieldUpdateOperationsInput | number
    profitMargin?: FloatFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDebtsNestedInput
    company?: CompanyUpdateOneRequiredWithoutDebtsNestedInput
  }

  export type DebtUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type DebtUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    debtDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type RefundUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalSale?: SaleUpdateOneRequiredWithoutRefundsNestedInput
    product?: ProductUpdateOneRequiredWithoutRefundsNestedInput
    company?: CompanyUpdateOneRequiredWithoutRefundsNestedInput
    processedByUser?: UserUpdateOneRequiredWithoutProcessedRefundsNestedInput
  }

  export type RefundUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    originalSaleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundCreateManyOriginalSaleInput = {
    id?: string
    refundNumber: string
    productId: string
    batchId: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    totalRefundAmount: Decimal | DecimalJsLike | number | string
    refundType?: $Enums.RefundType
    reason?: $Enums.RefundReason
    customReason?: string | null
    refundDate?: Date | string
    processedBy: string
    itemCondition?: $Enums.ItemCondition
    returnToInventory?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundUpdateWithoutOriginalSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutRefundsNestedInput
    batch?: BatchUpdateOneRequiredWithoutRefundsNestedInput
    company?: CompanyUpdateOneRequiredWithoutRefundsNestedInput
    processedByUser?: UserUpdateOneRequiredWithoutProcessedRefundsNestedInput
  }

  export type RefundUncheckedUpdateWithoutOriginalSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundUncheckedUpdateManyWithoutOriginalSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    refundNumber?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefundAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    refundType?: EnumRefundTypeFieldUpdateOperationsInput | $Enums.RefundType
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    customReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    processedBy?: StringFieldUpdateOperationsInput | string
    itemCondition?: EnumItemConditionFieldUpdateOperationsInput | $Enums.ItemCondition
    returnToInventory?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}