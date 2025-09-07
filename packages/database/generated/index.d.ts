
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Program
 * 
 */
export type Program = $Result.DefaultSelection<Prisma.$ProgramPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Venue
 * 
 */
export type Venue = $Result.DefaultSelection<Prisma.$VenuePayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomReservation
 * 
 */
export type RoomReservation = $Result.DefaultSelection<Prisma.$RoomReservationPayload>
/**
 * Model ProgramParticipant
 * 
 */
export type ProgramParticipant = $Result.DefaultSelection<Prisma.$ProgramParticipantPayload>
/**
 * Model AiInteraction
 * 
 */
export type AiInteraction = $Result.DefaultSelection<Prisma.$AiInteractionPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.program`: Exposes CRUD operations for the **Program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.ProgramDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.venue`: Exposes CRUD operations for the **Venue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Venues
    * const venues = await prisma.venue.findMany()
    * ```
    */
  get venue(): Prisma.VenueDelegate<ExtArgs>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs>;

  /**
   * `prisma.roomReservation`: Exposes CRUD operations for the **RoomReservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomReservations
    * const roomReservations = await prisma.roomReservation.findMany()
    * ```
    */
  get roomReservation(): Prisma.RoomReservationDelegate<ExtArgs>;

  /**
   * `prisma.programParticipant`: Exposes CRUD operations for the **ProgramParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgramParticipants
    * const programParticipants = await prisma.programParticipant.findMany()
    * ```
    */
  get programParticipant(): Prisma.ProgramParticipantDelegate<ExtArgs>;

  /**
   * `prisma.aiInteraction`: Exposes CRUD operations for the **AiInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiInteractions
    * const aiInteractions = await prisma.aiInteraction.findMany()
    * ```
    */
  get aiInteraction(): Prisma.AiInteractionDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    Program: 'Program',
    Session: 'Session',
    Venue: 'Venue',
    Room: 'Room',
    RoomReservation: 'RoomReservation',
    ProgramParticipant: 'ProgramParticipant',
    AiInteraction: 'AiInteraction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "program" | "session" | "venue" | "room" | "roomReservation" | "programParticipant" | "aiInteraction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Program: {
        payload: Prisma.$ProgramPayload<ExtArgs>
        fields: Prisma.ProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findFirst: {
            args: Prisma.ProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findMany: {
            args: Prisma.ProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          create: {
            args: Prisma.ProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          createMany: {
            args: Prisma.ProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          delete: {
            args: Prisma.ProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          update: {
            args: Prisma.ProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          deleteMany: {
            args: Prisma.ProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.ProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramCountAggregateOutputType> | number
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
      Venue: {
        payload: Prisma.$VenuePayload<ExtArgs>
        fields: Prisma.VenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findFirst: {
            args: Prisma.VenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findMany: {
            args: Prisma.VenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          create: {
            args: Prisma.VenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          createMany: {
            args: Prisma.VenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VenueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          delete: {
            args: Prisma.VenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          update: {
            args: Prisma.VenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          deleteMany: {
            args: Prisma.VenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          aggregate: {
            args: Prisma.VenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenue>
          }
          groupBy: {
            args: Prisma.VenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<VenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.VenueCountArgs<ExtArgs>
            result: $Utils.Optional<VenueCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomReservation: {
        payload: Prisma.$RoomReservationPayload<ExtArgs>
        fields: Prisma.RoomReservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomReservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomReservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>
          }
          findFirst: {
            args: Prisma.RoomReservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomReservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>
          }
          findMany: {
            args: Prisma.RoomReservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>[]
          }
          create: {
            args: Prisma.RoomReservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>
          }
          createMany: {
            args: Prisma.RoomReservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomReservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>[]
          }
          delete: {
            args: Prisma.RoomReservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>
          }
          update: {
            args: Prisma.RoomReservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>
          }
          deleteMany: {
            args: Prisma.RoomReservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomReservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomReservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomReservationPayload>
          }
          aggregate: {
            args: Prisma.RoomReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomReservation>
          }
          groupBy: {
            args: Prisma.RoomReservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomReservationCountArgs<ExtArgs>
            result: $Utils.Optional<RoomReservationCountAggregateOutputType> | number
          }
        }
      }
      ProgramParticipant: {
        payload: Prisma.$ProgramParticipantPayload<ExtArgs>
        fields: Prisma.ProgramParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>
          }
          findFirst: {
            args: Prisma.ProgramParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>
          }
          findMany: {
            args: Prisma.ProgramParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>[]
          }
          create: {
            args: Prisma.ProgramParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>
          }
          createMany: {
            args: Prisma.ProgramParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>[]
          }
          delete: {
            args: Prisma.ProgramParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>
          }
          update: {
            args: Prisma.ProgramParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>
          }
          deleteMany: {
            args: Prisma.ProgramParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProgramParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramParticipantPayload>
          }
          aggregate: {
            args: Prisma.ProgramParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgramParticipant>
          }
          groupBy: {
            args: Prisma.ProgramParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramParticipantCountAggregateOutputType> | number
          }
        }
      }
      AiInteraction: {
        payload: Prisma.$AiInteractionPayload<ExtArgs>
        fields: Prisma.AiInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>
          }
          findFirst: {
            args: Prisma.AiInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>
          }
          findMany: {
            args: Prisma.AiInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>[]
          }
          create: {
            args: Prisma.AiInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>
          }
          createMany: {
            args: Prisma.AiInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>[]
          }
          delete: {
            args: Prisma.AiInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>
          }
          update: {
            args: Prisma.AiInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>
          }
          deleteMany: {
            args: Prisma.AiInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInteractionPayload>
          }
          aggregate: {
            args: Prisma.AiInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiInteraction>
          }
          groupBy: {
            args: Prisma.AiInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<AiInteractionCountAggregateOutputType> | number
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdPrograms: number
    roomReservations: number
    programParticipants: number
    aiInteractions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdPrograms?: boolean | UserCountOutputTypeCountCreatedProgramsArgs
    roomReservations?: boolean | UserCountOutputTypeCountRoomReservationsArgs
    programParticipants?: boolean | UserCountOutputTypeCountProgramParticipantsArgs
    aiInteractions?: boolean | UserCountOutputTypeCountAiInteractionsArgs
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
  export type UserCountOutputTypeCountCreatedProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomReservationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgramParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramParticipantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiInteractionWhereInput
  }


  /**
   * Count Type ProgramCountOutputType
   */

  export type ProgramCountOutputType = {
    sessions: number
    aiInteractions: number
  }

  export type ProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | ProgramCountOutputTypeCountSessionsArgs
    aiInteractions?: boolean | ProgramCountOutputTypeCountAiInteractionsArgs
  }

  // Custom InputTypes
  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramCountOutputType
     */
    select?: ProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountAiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiInteractionWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    participants: number
    aiInteractions: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | SessionCountOutputTypeCountParticipantsArgs
    aiInteractions?: boolean | SessionCountOutputTypeCountAiInteractionsArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramParticipantWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountAiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiInteractionWhereInput
  }


  /**
   * Count Type VenueCountOutputType
   */

  export type VenueCountOutputType = {
    rooms: number
  }

  export type VenueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | VenueCountOutputTypeCountRoomsArgs
  }

  // Custom InputTypes
  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueCountOutputType
     */
    select?: VenueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    reservations: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservations?: boolean | RoomCountOutputTypeCountReservationsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomReservationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    roleFlags: number | null
  }

  export type UserSumAggregateOutputType = {
    id: bigint | null
    roleFlags: number | null
  }

  export type UserMinAggregateOutputType = {
    id: bigint | null
    email: string | null
    name: string | null
    googleSub: string | null
    lastLoginAt: Date | null
    roleFlags: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: bigint | null
    email: string | null
    name: string | null
    googleSub: string | null
    lastLoginAt: Date | null
    roleFlags: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    googleSub: number
    lastLoginAt: number
    roleFlags: number
    preferences: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    roleFlags?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    roleFlags?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    googleSub?: true
    lastLoginAt?: true
    roleFlags?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    googleSub?: true
    lastLoginAt?: true
    roleFlags?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    googleSub?: true
    lastLoginAt?: true
    roleFlags?: true
    preferences?: true
    createdAt?: true
    updatedAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: bigint
    email: string | null
    name: string | null
    googleSub: string | null
    lastLoginAt: Date | null
    roleFlags: number
    preferences: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    googleSub?: boolean
    lastLoginAt?: boolean
    roleFlags?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdPrograms?: boolean | User$createdProgramsArgs<ExtArgs>
    roomReservations?: boolean | User$roomReservationsArgs<ExtArgs>
    programParticipants?: boolean | User$programParticipantsArgs<ExtArgs>
    aiInteractions?: boolean | User$aiInteractionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    googleSub?: boolean
    lastLoginAt?: boolean
    roleFlags?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    googleSub?: boolean
    lastLoginAt?: boolean
    roleFlags?: boolean
    preferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdPrograms?: boolean | User$createdProgramsArgs<ExtArgs>
    roomReservations?: boolean | User$roomReservationsArgs<ExtArgs>
    programParticipants?: boolean | User$programParticipantsArgs<ExtArgs>
    aiInteractions?: boolean | User$aiInteractionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdPrograms: Prisma.$ProgramPayload<ExtArgs>[]
      roomReservations: Prisma.$RoomReservationPayload<ExtArgs>[]
      programParticipants: Prisma.$ProgramParticipantPayload<ExtArgs>[]
      aiInteractions: Prisma.$AiInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      email: string | null
      name: string | null
      googleSub: string | null
      lastLoginAt: Date | null
      roleFlags: number
      preferences: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdPrograms<T extends User$createdProgramsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdProgramsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany"> | Null>
    roomReservations<T extends User$roomReservationsArgs<ExtArgs> = {}>(args?: Subset<T, User$roomReservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findMany"> | Null>
    programParticipants<T extends User$programParticipantsArgs<ExtArgs> = {}>(args?: Subset<T, User$programParticipantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findMany"> | Null>
    aiInteractions<T extends User$aiInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, User$aiInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly id: FieldRef<"User", 'BigInt'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly googleSub: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly roleFlags: FieldRef<"User", 'Int'>
    readonly preferences: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
  }

  /**
   * User.createdPrograms
   */
  export type User$createdProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    cursor?: ProgramWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * User.roomReservations
   */
  export type User$roomReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    where?: RoomReservationWhereInput
    orderBy?: RoomReservationOrderByWithRelationInput | RoomReservationOrderByWithRelationInput[]
    cursor?: RoomReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomReservationScalarFieldEnum | RoomReservationScalarFieldEnum[]
  }

  /**
   * User.programParticipants
   */
  export type User$programParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    where?: ProgramParticipantWhereInput
    orderBy?: ProgramParticipantOrderByWithRelationInput | ProgramParticipantOrderByWithRelationInput[]
    cursor?: ProgramParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramParticipantScalarFieldEnum | ProgramParticipantScalarFieldEnum[]
  }

  /**
   * User.aiInteractions
   */
  export type User$aiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    where?: AiInteractionWhereInput
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    cursor?: AiInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiInteractionScalarFieldEnum | AiInteractionScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramAvgAggregateOutputType = {
    id: number | null
    createdByUserId: number | null
  }

  export type ProgramSumAggregateOutputType = {
    id: bigint | null
    createdByUserId: bigint | null
  }

  export type ProgramMinAggregateOutputType = {
    id: bigint | null
    createdByUserId: bigint | null
    type: string | null
    title: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramMaxAggregateOutputType = {
    id: bigint | null
    createdByUserId: bigint | null
    type: string | null
    title: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramCountAggregateOutputType = {
    id: number
    createdByUserId: number
    type: number
    title: number
    description: number
    aiSummaryTags: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgramAvgAggregateInputType = {
    id?: true
    createdByUserId?: true
  }

  export type ProgramSumAggregateInputType = {
    id?: true
    createdByUserId?: true
  }

  export type ProgramMinAggregateInputType = {
    id?: true
    createdByUserId?: true
    type?: true
    title?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramMaxAggregateInputType = {
    id?: true
    createdByUserId?: true
    type?: true
    title?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramCountAggregateInputType = {
    id?: true
    createdByUserId?: true
    type?: true
    title?: true
    description?: true
    aiSummaryTags?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Program to aggregate.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type ProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithAggregationInput | ProgramOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: ProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _avg?: ProgramAvgAggregateInputType
    _sum?: ProgramSumAggregateInputType
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    id: bigint
    createdByUserId: bigint
    type: string | null
    title: string
    description: string | null
    aiSummaryTags: JsonValue
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type ProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdByUserId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    aiSummaryTags?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    sessions?: boolean | Program$sessionsArgs<ExtArgs>
    aiInteractions?: boolean | Program$aiInteractionsArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdByUserId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    aiSummaryTags?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectScalar = {
    id?: boolean
    createdByUserId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    aiSummaryTags?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    sessions?: boolean | Program$sessionsArgs<ExtArgs>
    aiInteractions?: boolean | Program$aiInteractionsArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Program"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      aiInteractions: Prisma.$AiInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      createdByUserId: bigint
      type: string | null
      title: string
      description: string | null
      aiSummaryTags: Prisma.JsonValue
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = $Result.GetResult<Prisma.$ProgramPayload, S>

  type ProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface ProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {ProgramFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramFindUniqueArgs>(args: SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProgramFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramFindFirstArgs>(args?: SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWithIdOnly = await prisma.program.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramFindManyArgs>(args?: SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Program.
     * @param {ProgramCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends ProgramCreateArgs>(args: SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Programs.
     * @param {ProgramCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramCreateManyArgs>(args?: SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {ProgramCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Program.
     * @param {ProgramDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends ProgramDeleteArgs>(args: SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Program.
     * @param {ProgramUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramUpdateArgs>(args: SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Programs.
     * @param {ProgramDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramDeleteManyArgs>(args?: SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramUpdateManyArgs>(args: SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Program.
     * @param {ProgramUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends ProgramUpsertArgs>(args: SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends ProgramCountArgs>(
      args?: Subset<T, ProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramGroupByArgs} args - Group by arguments.
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
      T extends ProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramGroupByArgs['orderBy'] }
        : { orderBy?: ProgramGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Program model
   */
  readonly fields: ProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sessions<T extends Program$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Program$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    aiInteractions<T extends Program$aiInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, Program$aiInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Program model
   */ 
  interface ProgramFieldRefs {
    readonly id: FieldRef<"Program", 'BigInt'>
    readonly createdByUserId: FieldRef<"Program", 'BigInt'>
    readonly type: FieldRef<"Program", 'String'>
    readonly title: FieldRef<"Program", 'String'>
    readonly description: FieldRef<"Program", 'String'>
    readonly aiSummaryTags: FieldRef<"Program", 'Json'>
    readonly isActive: FieldRef<"Program", 'Boolean'>
    readonly createdAt: FieldRef<"Program", 'DateTime'>
    readonly updatedAt: FieldRef<"Program", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Program findUnique
   */
  export type ProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findUniqueOrThrow
   */
  export type ProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findFirst
   */
  export type ProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findFirstOrThrow
   */
  export type ProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findMany
   */
  export type ProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Programs to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program create
   */
  export type ProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a Program.
     */
    data: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
  }

  /**
   * Program createMany
   */
  export type ProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program createManyAndReturn
   */
  export type ProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program update
   */
  export type ProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a Program.
     */
    data: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
    /**
     * Choose, which Program to update.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program updateMany
   */
  export type ProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
  }

  /**
   * Program upsert
   */
  export type ProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the Program to update in case it exists.
     */
    where: ProgramWhereUniqueInput
    /**
     * In case the Program found by the `where` argument doesn't exist, create a new Program with this data.
     */
    create: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
    /**
     * In case the Program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
  }

  /**
   * Program delete
   */
  export type ProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter which Program to delete.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program deleteMany
   */
  export type ProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Programs to delete
     */
    where?: ProgramWhereInput
  }

  /**
   * Program.sessions
   */
  export type Program$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
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
   * Program.aiInteractions
   */
  export type Program$aiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    where?: AiInteractionWhereInput
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    cursor?: AiInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiInteractionScalarFieldEnum | AiInteractionScalarFieldEnum[]
  }

  /**
   * Program without action
   */
  export type ProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    id: number | null
    programId: number | null
    capacity: number | null
    participantFee: number | null
    roomReservationId: number | null
  }

  export type SessionSumAggregateOutputType = {
    id: bigint | null
    programId: bigint | null
    capacity: number | null
    participantFee: number | null
    roomReservationId: bigint | null
  }

  export type SessionMinAggregateOutputType = {
    id: bigint | null
    programId: bigint | null
    startsAt: Date | null
    endsAt: Date | null
    capacity: number | null
    participantFee: number | null
    status: string | null
    roomReservationId: bigint | null
    locationText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: bigint | null
    programId: bigint | null
    startsAt: Date | null
    endsAt: Date | null
    capacity: number | null
    participantFee: number | null
    status: string | null
    roomReservationId: bigint | null
    locationText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    programId: number
    startsAt: number
    endsAt: number
    capacity: number
    participantFee: number
    status: number
    roomReservationId: number
    locationText: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    id?: true
    programId?: true
    capacity?: true
    participantFee?: true
    roomReservationId?: true
  }

  export type SessionSumAggregateInputType = {
    id?: true
    programId?: true
    capacity?: true
    participantFee?: true
    roomReservationId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    programId?: true
    startsAt?: true
    endsAt?: true
    capacity?: true
    participantFee?: true
    status?: true
    roomReservationId?: true
    locationText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    programId?: true
    startsAt?: true
    endsAt?: true
    capacity?: true
    participantFee?: true
    status?: true
    roomReservationId?: true
    locationText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    programId?: true
    startsAt?: true
    endsAt?: true
    capacity?: true
    participantFee?: true
    status?: true
    roomReservationId?: true
    locationText?: true
    createdAt?: true
    updatedAt?: true
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
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
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
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: bigint
    programId: bigint
    startsAt: Date
    endsAt: Date
    capacity: number | null
    participantFee: number | null
    status: string
    roomReservationId: bigint | null
    locationText: string | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
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
    programId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    capacity?: boolean
    participantFee?: boolean
    status?: boolean
    roomReservationId?: boolean
    locationText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    roomReservation?: boolean | Session$roomReservationArgs<ExtArgs>
    participants?: boolean | Session$participantsArgs<ExtArgs>
    aiInteractions?: boolean | Session$aiInteractionsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    capacity?: boolean
    participantFee?: boolean
    status?: boolean
    roomReservationId?: boolean
    locationText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    roomReservation?: boolean | Session$roomReservationArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    programId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    capacity?: boolean
    participantFee?: boolean
    status?: boolean
    roomReservationId?: boolean
    locationText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    roomReservation?: boolean | Session$roomReservationArgs<ExtArgs>
    participants?: boolean | Session$participantsArgs<ExtArgs>
    aiInteractions?: boolean | Session$aiInteractionsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    roomReservation?: boolean | Session$roomReservationArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      program: Prisma.$ProgramPayload<ExtArgs>
      roomReservation: Prisma.$RoomReservationPayload<ExtArgs> | null
      participants: Prisma.$ProgramParticipantPayload<ExtArgs>[]
      aiInteractions: Prisma.$AiInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      programId: bigint
      startsAt: Date
      endsAt: Date
      capacity: number | null
      participantFee: number | null
      status: string
      roomReservationId: bigint | null
      locationText: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

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
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    program<T extends ProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramDefaultArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    roomReservation<T extends Session$roomReservationArgs<ExtArgs> = {}>(args?: Subset<T, Session$roomReservationArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    participants<T extends Session$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Session$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findMany"> | Null>
    aiInteractions<T extends Session$aiInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, Session$aiInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly id: FieldRef<"Session", 'BigInt'>
    readonly programId: FieldRef<"Session", 'BigInt'>
    readonly startsAt: FieldRef<"Session", 'DateTime'>
    readonly endsAt: FieldRef<"Session", 'DateTime'>
    readonly capacity: FieldRef<"Session", 'Int'>
    readonly participantFee: FieldRef<"Session", 'Int'>
    readonly status: FieldRef<"Session", 'String'>
    readonly roomReservationId: FieldRef<"Session", 'BigInt'>
    readonly locationText: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
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
  }

  /**
   * Session.roomReservation
   */
  export type Session$roomReservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    where?: RoomReservationWhereInput
  }

  /**
   * Session.participants
   */
  export type Session$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    where?: ProgramParticipantWhereInput
    orderBy?: ProgramParticipantOrderByWithRelationInput | ProgramParticipantOrderByWithRelationInput[]
    cursor?: ProgramParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramParticipantScalarFieldEnum | ProgramParticipantScalarFieldEnum[]
  }

  /**
   * Session.aiInteractions
   */
  export type Session$aiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    where?: AiInteractionWhereInput
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    cursor?: AiInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiInteractionScalarFieldEnum | AiInteractionScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Venue
   */

  export type AggregateVenue = {
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  export type VenueAvgAggregateOutputType = {
    id: number | null
  }

  export type VenueSumAggregateOutputType = {
    id: bigint | null
  }

  export type VenueMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueCountAggregateOutputType = {
    id: number
    name: number
    address: number
    openingHours: number
    blackoutRules: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VenueAvgAggregateInputType = {
    id?: true
  }

  export type VenueSumAggregateInputType = {
    id?: true
  }

  export type VenueMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    openingHours?: true
    blackoutRules?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venue to aggregate.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Venues
    **/
    _count?: true | VenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VenueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VenueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VenueMaxAggregateInputType
  }

  export type GetVenueAggregateType<T extends VenueAggregateArgs> = {
        [P in keyof T & keyof AggregateVenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenue[P]>
      : GetScalarType<T[P], AggregateVenue[P]>
  }




  export type VenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueWhereInput
    orderBy?: VenueOrderByWithAggregationInput | VenueOrderByWithAggregationInput[]
    by: VenueScalarFieldEnum[] | VenueScalarFieldEnum
    having?: VenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VenueCountAggregateInputType | true
    _avg?: VenueAvgAggregateInputType
    _sum?: VenueSumAggregateInputType
    _min?: VenueMinAggregateInputType
    _max?: VenueMaxAggregateInputType
  }

  export type VenueGroupByOutputType = {
    id: bigint
    name: string
    address: string | null
    openingHours: JsonValue | null
    blackoutRules: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  type GetVenueGroupByPayload<T extends VenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VenueGroupByOutputType[P]>
            : GetScalarType<T[P], VenueGroupByOutputType[P]>
        }
      >
    >


  export type VenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    openingHours?: boolean
    blackoutRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rooms?: boolean | Venue$roomsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    openingHours?: boolean
    blackoutRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    openingHours?: boolean
    blackoutRules?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VenueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | Venue$roomsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VenueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venue"
    objects: {
      rooms: Prisma.$RoomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      address: string | null
      openingHours: Prisma.JsonValue | null
      blackoutRules: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["venue"]>
    composites: {}
  }

  type VenueGetPayload<S extends boolean | null | undefined | VenueDefaultArgs> = $Result.GetResult<Prisma.$VenuePayload, S>

  type VenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VenueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VenueCountAggregateInputType | true
    }

  export interface VenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venue'], meta: { name: 'Venue' } }
    /**
     * Find zero or one Venue that matches the filter.
     * @param {VenueFindUniqueArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VenueFindUniqueArgs>(args: SelectSubset<T, VenueFindUniqueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Venue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VenueFindUniqueOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VenueFindUniqueOrThrowArgs>(args: SelectSubset<T, VenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Venue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VenueFindFirstArgs>(args?: SelectSubset<T, VenueFindFirstArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Venue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VenueFindFirstOrThrowArgs>(args?: SelectSubset<T, VenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Venues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Venues
     * const venues = await prisma.venue.findMany()
     * 
     * // Get first 10 Venues
     * const venues = await prisma.venue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const venueWithIdOnly = await prisma.venue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VenueFindManyArgs>(args?: SelectSubset<T, VenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Venue.
     * @param {VenueCreateArgs} args - Arguments to create a Venue.
     * @example
     * // Create one Venue
     * const Venue = await prisma.venue.create({
     *   data: {
     *     // ... data to create a Venue
     *   }
     * })
     * 
     */
    create<T extends VenueCreateArgs>(args: SelectSubset<T, VenueCreateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Venues.
     * @param {VenueCreateManyArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VenueCreateManyArgs>(args?: SelectSubset<T, VenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Venues and returns the data saved in the database.
     * @param {VenueCreateManyAndReturnArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Venues and only return the `id`
     * const venueWithIdOnly = await prisma.venue.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VenueCreateManyAndReturnArgs>(args?: SelectSubset<T, VenueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Venue.
     * @param {VenueDeleteArgs} args - Arguments to delete one Venue.
     * @example
     * // Delete one Venue
     * const Venue = await prisma.venue.delete({
     *   where: {
     *     // ... filter to delete one Venue
     *   }
     * })
     * 
     */
    delete<T extends VenueDeleteArgs>(args: SelectSubset<T, VenueDeleteArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Venue.
     * @param {VenueUpdateArgs} args - Arguments to update one Venue.
     * @example
     * // Update one Venue
     * const venue = await prisma.venue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VenueUpdateArgs>(args: SelectSubset<T, VenueUpdateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Venues.
     * @param {VenueDeleteManyArgs} args - Arguments to filter Venues to delete.
     * @example
     * // Delete a few Venues
     * const { count } = await prisma.venue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VenueDeleteManyArgs>(args?: SelectSubset<T, VenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VenueUpdateManyArgs>(args: SelectSubset<T, VenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Venue.
     * @param {VenueUpsertArgs} args - Arguments to update or create a Venue.
     * @example
     * // Update or create a Venue
     * const venue = await prisma.venue.upsert({
     *   create: {
     *     // ... data to create a Venue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venue we want to update
     *   }
     * })
     */
    upsert<T extends VenueUpsertArgs>(args: SelectSubset<T, VenueUpsertArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueCountArgs} args - Arguments to filter Venues to count.
     * @example
     * // Count the number of Venues
     * const count = await prisma.venue.count({
     *   where: {
     *     // ... the filter for the Venues we want to count
     *   }
     * })
    **/
    count<T extends VenueCountArgs>(
      args?: Subset<T, VenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VenueAggregateArgs>(args: Subset<T, VenueAggregateArgs>): Prisma.PrismaPromise<GetVenueAggregateType<T>>

    /**
     * Group by Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueGroupByArgs} args - Group by arguments.
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
      T extends VenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VenueGroupByArgs['orderBy'] }
        : { orderBy?: VenueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venue model
   */
  readonly fields: VenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rooms<T extends Venue$roomsArgs<ExtArgs> = {}>(args?: Subset<T, Venue$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Venue model
   */ 
  interface VenueFieldRefs {
    readonly id: FieldRef<"Venue", 'BigInt'>
    readonly name: FieldRef<"Venue", 'String'>
    readonly address: FieldRef<"Venue", 'String'>
    readonly openingHours: FieldRef<"Venue", 'Json'>
    readonly blackoutRules: FieldRef<"Venue", 'Json'>
    readonly createdAt: FieldRef<"Venue", 'DateTime'>
    readonly updatedAt: FieldRef<"Venue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Venue findUnique
   */
  export type VenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findUniqueOrThrow
   */
  export type VenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findFirst
   */
  export type VenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findFirstOrThrow
   */
  export type VenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findMany
   */
  export type VenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venues to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue create
   */
  export type VenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to create a Venue.
     */
    data: XOR<VenueCreateInput, VenueUncheckedCreateInput>
  }

  /**
   * Venue createMany
   */
  export type VenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue createManyAndReturn
   */
  export type VenueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue update
   */
  export type VenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to update a Venue.
     */
    data: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
    /**
     * Choose, which Venue to update.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue updateMany
   */
  export type VenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
  }

  /**
   * Venue upsert
   */
  export type VenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The filter to search for the Venue to update in case it exists.
     */
    where: VenueWhereUniqueInput
    /**
     * In case the Venue found by the `where` argument doesn't exist, create a new Venue with this data.
     */
    create: XOR<VenueCreateInput, VenueUncheckedCreateInput>
    /**
     * In case the Venue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
  }

  /**
   * Venue delete
   */
  export type VenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter which Venue to delete.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue deleteMany
   */
  export type VenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venues to delete
     */
    where?: VenueWhereInput
  }

  /**
   * Venue.rooms
   */
  export type Venue$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Venue without action
   */
  export type VenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    id: number | null
    venueId: number | null
    capacity: number | null
  }

  export type RoomSumAggregateOutputType = {
    id: bigint | null
    venueId: bigint | null
    capacity: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: bigint | null
    venueId: bigint | null
    name: string | null
    capacity: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: bigint | null
    venueId: bigint | null
    name: string | null
    capacity: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    venueId: number
    name: number
    capacity: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    id?: true
    venueId?: true
    capacity?: true
  }

  export type RoomSumAggregateInputType = {
    id?: true
    venueId?: true
    capacity?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    venueId?: true
    name?: true
    capacity?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    venueId?: true
    name?: true
    capacity?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    venueId?: true
    name?: true
    capacity?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: bigint
    venueId: bigint
    name: string
    capacity: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venueId?: boolean
    name?: boolean
    capacity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    reservations?: boolean | Room$reservationsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    venueId?: boolean
    name?: boolean
    capacity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    venueId?: boolean
    name?: boolean
    capacity?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    reservations?: boolean | Room$reservationsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      venue: Prisma.$VenuePayload<ExtArgs>
      reservations: Prisma.$RoomReservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      venueId: bigint
      name: string
      capacity: number | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
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
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venue<T extends VenueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VenueDefaultArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    reservations<T extends Room$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, Room$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Room model
   */ 
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'BigInt'>
    readonly venueId: FieldRef<"Room", 'BigInt'>
    readonly name: FieldRef<"Room", 'String'>
    readonly capacity: FieldRef<"Room", 'Int'>
    readonly status: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
  }

  /**
   * Room.reservations
   */
  export type Room$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    where?: RoomReservationWhereInput
    orderBy?: RoomReservationOrderByWithRelationInput | RoomReservationOrderByWithRelationInput[]
    cursor?: RoomReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomReservationScalarFieldEnum | RoomReservationScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomReservation
   */

  export type AggregateRoomReservation = {
    _count: RoomReservationCountAggregateOutputType | null
    _avg: RoomReservationAvgAggregateOutputType | null
    _sum: RoomReservationSumAggregateOutputType | null
    _min: RoomReservationMinAggregateOutputType | null
    _max: RoomReservationMaxAggregateOutputType | null
  }

  export type RoomReservationAvgAggregateOutputType = {
    id: number | null
    roomId: number | null
    userId: number | null
    sessionId: number | null
  }

  export type RoomReservationSumAggregateOutputType = {
    id: bigint | null
    roomId: bigint | null
    userId: bigint | null
    sessionId: bigint | null
  }

  export type RoomReservationMinAggregateOutputType = {
    id: bigint | null
    roomId: bigint | null
    userId: bigint | null
    startsAt: Date | null
    endsAt: Date | null
    purpose: string | null
    status: string | null
    sessionId: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomReservationMaxAggregateOutputType = {
    id: bigint | null
    roomId: bigint | null
    userId: bigint | null
    startsAt: Date | null
    endsAt: Date | null
    purpose: string | null
    status: string | null
    sessionId: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomReservationCountAggregateOutputType = {
    id: number
    roomId: number
    userId: number
    startsAt: number
    endsAt: number
    purpose: number
    status: number
    meta: number
    sessionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomReservationAvgAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    sessionId?: true
  }

  export type RoomReservationSumAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    sessionId?: true
  }

  export type RoomReservationMinAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    startsAt?: true
    endsAt?: true
    purpose?: true
    status?: true
    sessionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomReservationMaxAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    startsAt?: true
    endsAt?: true
    purpose?: true
    status?: true
    sessionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomReservationCountAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    startsAt?: true
    endsAt?: true
    purpose?: true
    status?: true
    meta?: true
    sessionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomReservation to aggregate.
     */
    where?: RoomReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomReservations to fetch.
     */
    orderBy?: RoomReservationOrderByWithRelationInput | RoomReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomReservations
    **/
    _count?: true | RoomReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomReservationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomReservationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomReservationMaxAggregateInputType
  }

  export type GetRoomReservationAggregateType<T extends RoomReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomReservation[P]>
      : GetScalarType<T[P], AggregateRoomReservation[P]>
  }




  export type RoomReservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomReservationWhereInput
    orderBy?: RoomReservationOrderByWithAggregationInput | RoomReservationOrderByWithAggregationInput[]
    by: RoomReservationScalarFieldEnum[] | RoomReservationScalarFieldEnum
    having?: RoomReservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomReservationCountAggregateInputType | true
    _avg?: RoomReservationAvgAggregateInputType
    _sum?: RoomReservationSumAggregateInputType
    _min?: RoomReservationMinAggregateInputType
    _max?: RoomReservationMaxAggregateInputType
  }

  export type RoomReservationGroupByOutputType = {
    id: bigint
    roomId: bigint
    userId: bigint | null
    startsAt: Date
    endsAt: Date
    purpose: string | null
    status: string
    meta: JsonValue
    sessionId: bigint | null
    createdAt: Date
    updatedAt: Date
    _count: RoomReservationCountAggregateOutputType | null
    _avg: RoomReservationAvgAggregateOutputType | null
    _sum: RoomReservationSumAggregateOutputType | null
    _min: RoomReservationMinAggregateOutputType | null
    _max: RoomReservationMaxAggregateOutputType | null
  }

  type GetRoomReservationGroupByPayload<T extends RoomReservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomReservationGroupByOutputType[P]>
            : GetScalarType<T[P], RoomReservationGroupByOutputType[P]>
        }
      >
    >


  export type RoomReservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    purpose?: boolean
    status?: boolean
    meta?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | RoomReservation$userArgs<ExtArgs>
    session?: boolean | RoomReservation$sessionArgs<ExtArgs>
  }, ExtArgs["result"]["roomReservation"]>

  export type RoomReservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    purpose?: boolean
    status?: boolean
    meta?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | RoomReservation$userArgs<ExtArgs>
  }, ExtArgs["result"]["roomReservation"]>

  export type RoomReservationSelectScalar = {
    id?: boolean
    roomId?: boolean
    userId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    purpose?: boolean
    status?: boolean
    meta?: boolean
    sessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomReservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | RoomReservation$userArgs<ExtArgs>
    session?: boolean | RoomReservation$sessionArgs<ExtArgs>
  }
  export type RoomReservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | RoomReservation$userArgs<ExtArgs>
  }

  export type $RoomReservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomReservation"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      session: Prisma.$SessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      roomId: bigint
      userId: bigint | null
      startsAt: Date
      endsAt: Date
      purpose: string | null
      status: string
      meta: Prisma.JsonValue
      sessionId: bigint | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomReservation"]>
    composites: {}
  }

  type RoomReservationGetPayload<S extends boolean | null | undefined | RoomReservationDefaultArgs> = $Result.GetResult<Prisma.$RoomReservationPayload, S>

  type RoomReservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomReservationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomReservationCountAggregateInputType | true
    }

  export interface RoomReservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomReservation'], meta: { name: 'RoomReservation' } }
    /**
     * Find zero or one RoomReservation that matches the filter.
     * @param {RoomReservationFindUniqueArgs} args - Arguments to find a RoomReservation
     * @example
     * // Get one RoomReservation
     * const roomReservation = await prisma.roomReservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomReservationFindUniqueArgs>(args: SelectSubset<T, RoomReservationFindUniqueArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoomReservation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomReservationFindUniqueOrThrowArgs} args - Arguments to find a RoomReservation
     * @example
     * // Get one RoomReservation
     * const roomReservation = await prisma.roomReservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomReservationFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomReservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoomReservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationFindFirstArgs} args - Arguments to find a RoomReservation
     * @example
     * // Get one RoomReservation
     * const roomReservation = await prisma.roomReservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomReservationFindFirstArgs>(args?: SelectSubset<T, RoomReservationFindFirstArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoomReservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationFindFirstOrThrowArgs} args - Arguments to find a RoomReservation
     * @example
     * // Get one RoomReservation
     * const roomReservation = await prisma.roomReservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomReservationFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomReservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoomReservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomReservations
     * const roomReservations = await prisma.roomReservation.findMany()
     * 
     * // Get first 10 RoomReservations
     * const roomReservations = await prisma.roomReservation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomReservationWithIdOnly = await prisma.roomReservation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomReservationFindManyArgs>(args?: SelectSubset<T, RoomReservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoomReservation.
     * @param {RoomReservationCreateArgs} args - Arguments to create a RoomReservation.
     * @example
     * // Create one RoomReservation
     * const RoomReservation = await prisma.roomReservation.create({
     *   data: {
     *     // ... data to create a RoomReservation
     *   }
     * })
     * 
     */
    create<T extends RoomReservationCreateArgs>(args: SelectSubset<T, RoomReservationCreateArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoomReservations.
     * @param {RoomReservationCreateManyArgs} args - Arguments to create many RoomReservations.
     * @example
     * // Create many RoomReservations
     * const roomReservation = await prisma.roomReservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomReservationCreateManyArgs>(args?: SelectSubset<T, RoomReservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomReservations and returns the data saved in the database.
     * @param {RoomReservationCreateManyAndReturnArgs} args - Arguments to create many RoomReservations.
     * @example
     * // Create many RoomReservations
     * const roomReservation = await prisma.roomReservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomReservations and only return the `id`
     * const roomReservationWithIdOnly = await prisma.roomReservation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomReservationCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomReservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoomReservation.
     * @param {RoomReservationDeleteArgs} args - Arguments to delete one RoomReservation.
     * @example
     * // Delete one RoomReservation
     * const RoomReservation = await prisma.roomReservation.delete({
     *   where: {
     *     // ... filter to delete one RoomReservation
     *   }
     * })
     * 
     */
    delete<T extends RoomReservationDeleteArgs>(args: SelectSubset<T, RoomReservationDeleteArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoomReservation.
     * @param {RoomReservationUpdateArgs} args - Arguments to update one RoomReservation.
     * @example
     * // Update one RoomReservation
     * const roomReservation = await prisma.roomReservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomReservationUpdateArgs>(args: SelectSubset<T, RoomReservationUpdateArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoomReservations.
     * @param {RoomReservationDeleteManyArgs} args - Arguments to filter RoomReservations to delete.
     * @example
     * // Delete a few RoomReservations
     * const { count } = await prisma.roomReservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomReservationDeleteManyArgs>(args?: SelectSubset<T, RoomReservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomReservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomReservations
     * const roomReservation = await prisma.roomReservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomReservationUpdateManyArgs>(args: SelectSubset<T, RoomReservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomReservation.
     * @param {RoomReservationUpsertArgs} args - Arguments to update or create a RoomReservation.
     * @example
     * // Update or create a RoomReservation
     * const roomReservation = await prisma.roomReservation.upsert({
     *   create: {
     *     // ... data to create a RoomReservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomReservation we want to update
     *   }
     * })
     */
    upsert<T extends RoomReservationUpsertArgs>(args: SelectSubset<T, RoomReservationUpsertArgs<ExtArgs>>): Prisma__RoomReservationClient<$Result.GetResult<Prisma.$RoomReservationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoomReservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationCountArgs} args - Arguments to filter RoomReservations to count.
     * @example
     * // Count the number of RoomReservations
     * const count = await prisma.roomReservation.count({
     *   where: {
     *     // ... the filter for the RoomReservations we want to count
     *   }
     * })
    **/
    count<T extends RoomReservationCountArgs>(
      args?: Subset<T, RoomReservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomReservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomReservationAggregateArgs>(args: Subset<T, RoomReservationAggregateArgs>): Prisma.PrismaPromise<GetRoomReservationAggregateType<T>>

    /**
     * Group by RoomReservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomReservationGroupByArgs} args - Group by arguments.
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
      T extends RoomReservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomReservationGroupByArgs['orderBy'] }
        : { orderBy?: RoomReservationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomReservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomReservation model
   */
  readonly fields: RoomReservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomReservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomReservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends RoomReservation$userArgs<ExtArgs> = {}>(args?: Subset<T, RoomReservation$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    session<T extends RoomReservation$sessionArgs<ExtArgs> = {}>(args?: Subset<T, RoomReservation$sessionArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the RoomReservation model
   */ 
  interface RoomReservationFieldRefs {
    readonly id: FieldRef<"RoomReservation", 'BigInt'>
    readonly roomId: FieldRef<"RoomReservation", 'BigInt'>
    readonly userId: FieldRef<"RoomReservation", 'BigInt'>
    readonly startsAt: FieldRef<"RoomReservation", 'DateTime'>
    readonly endsAt: FieldRef<"RoomReservation", 'DateTime'>
    readonly purpose: FieldRef<"RoomReservation", 'String'>
    readonly status: FieldRef<"RoomReservation", 'String'>
    readonly meta: FieldRef<"RoomReservation", 'Json'>
    readonly sessionId: FieldRef<"RoomReservation", 'BigInt'>
    readonly createdAt: FieldRef<"RoomReservation", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomReservation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomReservation findUnique
   */
  export type RoomReservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * Filter, which RoomReservation to fetch.
     */
    where: RoomReservationWhereUniqueInput
  }

  /**
   * RoomReservation findUniqueOrThrow
   */
  export type RoomReservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * Filter, which RoomReservation to fetch.
     */
    where: RoomReservationWhereUniqueInput
  }

  /**
   * RoomReservation findFirst
   */
  export type RoomReservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * Filter, which RoomReservation to fetch.
     */
    where?: RoomReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomReservations to fetch.
     */
    orderBy?: RoomReservationOrderByWithRelationInput | RoomReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomReservations.
     */
    cursor?: RoomReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomReservations.
     */
    distinct?: RoomReservationScalarFieldEnum | RoomReservationScalarFieldEnum[]
  }

  /**
   * RoomReservation findFirstOrThrow
   */
  export type RoomReservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * Filter, which RoomReservation to fetch.
     */
    where?: RoomReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomReservations to fetch.
     */
    orderBy?: RoomReservationOrderByWithRelationInput | RoomReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomReservations.
     */
    cursor?: RoomReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomReservations.
     */
    distinct?: RoomReservationScalarFieldEnum | RoomReservationScalarFieldEnum[]
  }

  /**
   * RoomReservation findMany
   */
  export type RoomReservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * Filter, which RoomReservations to fetch.
     */
    where?: RoomReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomReservations to fetch.
     */
    orderBy?: RoomReservationOrderByWithRelationInput | RoomReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomReservations.
     */
    cursor?: RoomReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomReservations.
     */
    skip?: number
    distinct?: RoomReservationScalarFieldEnum | RoomReservationScalarFieldEnum[]
  }

  /**
   * RoomReservation create
   */
  export type RoomReservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomReservation.
     */
    data: XOR<RoomReservationCreateInput, RoomReservationUncheckedCreateInput>
  }

  /**
   * RoomReservation createMany
   */
  export type RoomReservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomReservations.
     */
    data: RoomReservationCreateManyInput | RoomReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomReservation createManyAndReturn
   */
  export type RoomReservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoomReservations.
     */
    data: RoomReservationCreateManyInput | RoomReservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomReservation update
   */
  export type RoomReservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomReservation.
     */
    data: XOR<RoomReservationUpdateInput, RoomReservationUncheckedUpdateInput>
    /**
     * Choose, which RoomReservation to update.
     */
    where: RoomReservationWhereUniqueInput
  }

  /**
   * RoomReservation updateMany
   */
  export type RoomReservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomReservations.
     */
    data: XOR<RoomReservationUpdateManyMutationInput, RoomReservationUncheckedUpdateManyInput>
    /**
     * Filter which RoomReservations to update
     */
    where?: RoomReservationWhereInput
  }

  /**
   * RoomReservation upsert
   */
  export type RoomReservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomReservation to update in case it exists.
     */
    where: RoomReservationWhereUniqueInput
    /**
     * In case the RoomReservation found by the `where` argument doesn't exist, create a new RoomReservation with this data.
     */
    create: XOR<RoomReservationCreateInput, RoomReservationUncheckedCreateInput>
    /**
     * In case the RoomReservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomReservationUpdateInput, RoomReservationUncheckedUpdateInput>
  }

  /**
   * RoomReservation delete
   */
  export type RoomReservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
    /**
     * Filter which RoomReservation to delete.
     */
    where: RoomReservationWhereUniqueInput
  }

  /**
   * RoomReservation deleteMany
   */
  export type RoomReservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomReservations to delete
     */
    where?: RoomReservationWhereInput
  }

  /**
   * RoomReservation.user
   */
  export type RoomReservation$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RoomReservation.session
   */
  export type RoomReservation$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * RoomReservation without action
   */
  export type RoomReservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomReservation
     */
    select?: RoomReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomReservationInclude<ExtArgs> | null
  }


  /**
   * Model ProgramParticipant
   */

  export type AggregateProgramParticipant = {
    _count: ProgramParticipantCountAggregateOutputType | null
    _avg: ProgramParticipantAvgAggregateOutputType | null
    _sum: ProgramParticipantSumAggregateOutputType | null
    _min: ProgramParticipantMinAggregateOutputType | null
    _max: ProgramParticipantMaxAggregateOutputType | null
  }

  export type ProgramParticipantAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
    userId: number | null
  }

  export type ProgramParticipantSumAggregateOutputType = {
    id: bigint | null
    sessionId: bigint | null
    userId: bigint | null
  }

  export type ProgramParticipantMinAggregateOutputType = {
    id: bigint | null
    sessionId: bigint | null
    userId: bigint | null
    role: string | null
    status: string | null
    joinedAt: Date | null
  }

  export type ProgramParticipantMaxAggregateOutputType = {
    id: bigint | null
    sessionId: bigint | null
    userId: bigint | null
    role: string | null
    status: string | null
    joinedAt: Date | null
  }

  export type ProgramParticipantCountAggregateOutputType = {
    id: number
    sessionId: number
    userId: number
    role: number
    status: number
    joinedAt: number
    _all: number
  }


  export type ProgramParticipantAvgAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
  }

  export type ProgramParticipantSumAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
  }

  export type ProgramParticipantMinAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    role?: true
    status?: true
    joinedAt?: true
  }

  export type ProgramParticipantMaxAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    role?: true
    status?: true
    joinedAt?: true
  }

  export type ProgramParticipantCountAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    role?: true
    status?: true
    joinedAt?: true
    _all?: true
  }

  export type ProgramParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramParticipant to aggregate.
     */
    where?: ProgramParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramParticipants to fetch.
     */
    orderBy?: ProgramParticipantOrderByWithRelationInput | ProgramParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgramParticipants
    **/
    _count?: true | ProgramParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgramParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgramParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramParticipantMaxAggregateInputType
  }

  export type GetProgramParticipantAggregateType<T extends ProgramParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateProgramParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgramParticipant[P]>
      : GetScalarType<T[P], AggregateProgramParticipant[P]>
  }




  export type ProgramParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramParticipantWhereInput
    orderBy?: ProgramParticipantOrderByWithAggregationInput | ProgramParticipantOrderByWithAggregationInput[]
    by: ProgramParticipantScalarFieldEnum[] | ProgramParticipantScalarFieldEnum
    having?: ProgramParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramParticipantCountAggregateInputType | true
    _avg?: ProgramParticipantAvgAggregateInputType
    _sum?: ProgramParticipantSumAggregateInputType
    _min?: ProgramParticipantMinAggregateInputType
    _max?: ProgramParticipantMaxAggregateInputType
  }

  export type ProgramParticipantGroupByOutputType = {
    id: bigint
    sessionId: bigint
    userId: bigint
    role: string
    status: string
    joinedAt: Date | null
    _count: ProgramParticipantCountAggregateOutputType | null
    _avg: ProgramParticipantAvgAggregateOutputType | null
    _sum: ProgramParticipantSumAggregateOutputType | null
    _min: ProgramParticipantMinAggregateOutputType | null
    _max: ProgramParticipantMaxAggregateOutputType | null
  }

  type GetProgramParticipantGroupByPayload<T extends ProgramParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramParticipantGroupByOutputType[P]>
        }
      >
    >


  export type ProgramParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    joinedAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programParticipant"]>

  export type ProgramParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    joinedAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programParticipant"]>

  export type ProgramParticipantSelectScalar = {
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    joinedAt?: boolean
  }

  export type ProgramParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgramParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProgramParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgramParticipant"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      sessionId: bigint
      userId: bigint
      role: string
      status: string
      joinedAt: Date | null
    }, ExtArgs["result"]["programParticipant"]>
    composites: {}
  }

  type ProgramParticipantGetPayload<S extends boolean | null | undefined | ProgramParticipantDefaultArgs> = $Result.GetResult<Prisma.$ProgramParticipantPayload, S>

  type ProgramParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProgramParticipantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProgramParticipantCountAggregateInputType | true
    }

  export interface ProgramParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgramParticipant'], meta: { name: 'ProgramParticipant' } }
    /**
     * Find zero or one ProgramParticipant that matches the filter.
     * @param {ProgramParticipantFindUniqueArgs} args - Arguments to find a ProgramParticipant
     * @example
     * // Get one ProgramParticipant
     * const programParticipant = await prisma.programParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramParticipantFindUniqueArgs>(args: SelectSubset<T, ProgramParticipantFindUniqueArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProgramParticipant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProgramParticipantFindUniqueOrThrowArgs} args - Arguments to find a ProgramParticipant
     * @example
     * // Get one ProgramParticipant
     * const programParticipant = await prisma.programParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProgramParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantFindFirstArgs} args - Arguments to find a ProgramParticipant
     * @example
     * // Get one ProgramParticipant
     * const programParticipant = await prisma.programParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramParticipantFindFirstArgs>(args?: SelectSubset<T, ProgramParticipantFindFirstArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProgramParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantFindFirstOrThrowArgs} args - Arguments to find a ProgramParticipant
     * @example
     * // Get one ProgramParticipant
     * const programParticipant = await prisma.programParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProgramParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgramParticipants
     * const programParticipants = await prisma.programParticipant.findMany()
     * 
     * // Get first 10 ProgramParticipants
     * const programParticipants = await prisma.programParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programParticipantWithIdOnly = await prisma.programParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramParticipantFindManyArgs>(args?: SelectSubset<T, ProgramParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProgramParticipant.
     * @param {ProgramParticipantCreateArgs} args - Arguments to create a ProgramParticipant.
     * @example
     * // Create one ProgramParticipant
     * const ProgramParticipant = await prisma.programParticipant.create({
     *   data: {
     *     // ... data to create a ProgramParticipant
     *   }
     * })
     * 
     */
    create<T extends ProgramParticipantCreateArgs>(args: SelectSubset<T, ProgramParticipantCreateArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProgramParticipants.
     * @param {ProgramParticipantCreateManyArgs} args - Arguments to create many ProgramParticipants.
     * @example
     * // Create many ProgramParticipants
     * const programParticipant = await prisma.programParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramParticipantCreateManyArgs>(args?: SelectSubset<T, ProgramParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgramParticipants and returns the data saved in the database.
     * @param {ProgramParticipantCreateManyAndReturnArgs} args - Arguments to create many ProgramParticipants.
     * @example
     * // Create many ProgramParticipants
     * const programParticipant = await prisma.programParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgramParticipants and only return the `id`
     * const programParticipantWithIdOnly = await prisma.programParticipant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProgramParticipant.
     * @param {ProgramParticipantDeleteArgs} args - Arguments to delete one ProgramParticipant.
     * @example
     * // Delete one ProgramParticipant
     * const ProgramParticipant = await prisma.programParticipant.delete({
     *   where: {
     *     // ... filter to delete one ProgramParticipant
     *   }
     * })
     * 
     */
    delete<T extends ProgramParticipantDeleteArgs>(args: SelectSubset<T, ProgramParticipantDeleteArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProgramParticipant.
     * @param {ProgramParticipantUpdateArgs} args - Arguments to update one ProgramParticipant.
     * @example
     * // Update one ProgramParticipant
     * const programParticipant = await prisma.programParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramParticipantUpdateArgs>(args: SelectSubset<T, ProgramParticipantUpdateArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProgramParticipants.
     * @param {ProgramParticipantDeleteManyArgs} args - Arguments to filter ProgramParticipants to delete.
     * @example
     * // Delete a few ProgramParticipants
     * const { count } = await prisma.programParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramParticipantDeleteManyArgs>(args?: SelectSubset<T, ProgramParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgramParticipants
     * const programParticipant = await prisma.programParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramParticipantUpdateManyArgs>(args: SelectSubset<T, ProgramParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProgramParticipant.
     * @param {ProgramParticipantUpsertArgs} args - Arguments to update or create a ProgramParticipant.
     * @example
     * // Update or create a ProgramParticipant
     * const programParticipant = await prisma.programParticipant.upsert({
     *   create: {
     *     // ... data to create a ProgramParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgramParticipant we want to update
     *   }
     * })
     */
    upsert<T extends ProgramParticipantUpsertArgs>(args: SelectSubset<T, ProgramParticipantUpsertArgs<ExtArgs>>): Prisma__ProgramParticipantClient<$Result.GetResult<Prisma.$ProgramParticipantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProgramParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantCountArgs} args - Arguments to filter ProgramParticipants to count.
     * @example
     * // Count the number of ProgramParticipants
     * const count = await prisma.programParticipant.count({
     *   where: {
     *     // ... the filter for the ProgramParticipants we want to count
     *   }
     * })
    **/
    count<T extends ProgramParticipantCountArgs>(
      args?: Subset<T, ProgramParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgramParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgramParticipantAggregateArgs>(args: Subset<T, ProgramParticipantAggregateArgs>): Prisma.PrismaPromise<GetProgramParticipantAggregateType<T>>

    /**
     * Group by ProgramParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramParticipantGroupByArgs} args - Group by arguments.
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
      T extends ProgramParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramParticipantGroupByArgs['orderBy'] }
        : { orderBy?: ProgramParticipantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProgramParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgramParticipant model
   */
  readonly fields: ProgramParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgramParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProgramParticipant model
   */ 
  interface ProgramParticipantFieldRefs {
    readonly id: FieldRef<"ProgramParticipant", 'BigInt'>
    readonly sessionId: FieldRef<"ProgramParticipant", 'BigInt'>
    readonly userId: FieldRef<"ProgramParticipant", 'BigInt'>
    readonly role: FieldRef<"ProgramParticipant", 'String'>
    readonly status: FieldRef<"ProgramParticipant", 'String'>
    readonly joinedAt: FieldRef<"ProgramParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProgramParticipant findUnique
   */
  export type ProgramParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ProgramParticipant to fetch.
     */
    where: ProgramParticipantWhereUniqueInput
  }

  /**
   * ProgramParticipant findUniqueOrThrow
   */
  export type ProgramParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ProgramParticipant to fetch.
     */
    where: ProgramParticipantWhereUniqueInput
  }

  /**
   * ProgramParticipant findFirst
   */
  export type ProgramParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ProgramParticipant to fetch.
     */
    where?: ProgramParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramParticipants to fetch.
     */
    orderBy?: ProgramParticipantOrderByWithRelationInput | ProgramParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramParticipants.
     */
    cursor?: ProgramParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramParticipants.
     */
    distinct?: ProgramParticipantScalarFieldEnum | ProgramParticipantScalarFieldEnum[]
  }

  /**
   * ProgramParticipant findFirstOrThrow
   */
  export type ProgramParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ProgramParticipant to fetch.
     */
    where?: ProgramParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramParticipants to fetch.
     */
    orderBy?: ProgramParticipantOrderByWithRelationInput | ProgramParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramParticipants.
     */
    cursor?: ProgramParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramParticipants.
     */
    distinct?: ProgramParticipantScalarFieldEnum | ProgramParticipantScalarFieldEnum[]
  }

  /**
   * ProgramParticipant findMany
   */
  export type ProgramParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ProgramParticipants to fetch.
     */
    where?: ProgramParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramParticipants to fetch.
     */
    orderBy?: ProgramParticipantOrderByWithRelationInput | ProgramParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgramParticipants.
     */
    cursor?: ProgramParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramParticipants.
     */
    skip?: number
    distinct?: ProgramParticipantScalarFieldEnum | ProgramParticipantScalarFieldEnum[]
  }

  /**
   * ProgramParticipant create
   */
  export type ProgramParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgramParticipant.
     */
    data: XOR<ProgramParticipantCreateInput, ProgramParticipantUncheckedCreateInput>
  }

  /**
   * ProgramParticipant createMany
   */
  export type ProgramParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgramParticipants.
     */
    data: ProgramParticipantCreateManyInput | ProgramParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgramParticipant createManyAndReturn
   */
  export type ProgramParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProgramParticipants.
     */
    data: ProgramParticipantCreateManyInput | ProgramParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgramParticipant update
   */
  export type ProgramParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgramParticipant.
     */
    data: XOR<ProgramParticipantUpdateInput, ProgramParticipantUncheckedUpdateInput>
    /**
     * Choose, which ProgramParticipant to update.
     */
    where: ProgramParticipantWhereUniqueInput
  }

  /**
   * ProgramParticipant updateMany
   */
  export type ProgramParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgramParticipants.
     */
    data: XOR<ProgramParticipantUpdateManyMutationInput, ProgramParticipantUncheckedUpdateManyInput>
    /**
     * Filter which ProgramParticipants to update
     */
    where?: ProgramParticipantWhereInput
  }

  /**
   * ProgramParticipant upsert
   */
  export type ProgramParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgramParticipant to update in case it exists.
     */
    where: ProgramParticipantWhereUniqueInput
    /**
     * In case the ProgramParticipant found by the `where` argument doesn't exist, create a new ProgramParticipant with this data.
     */
    create: XOR<ProgramParticipantCreateInput, ProgramParticipantUncheckedCreateInput>
    /**
     * In case the ProgramParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramParticipantUpdateInput, ProgramParticipantUncheckedUpdateInput>
  }

  /**
   * ProgramParticipant delete
   */
  export type ProgramParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
    /**
     * Filter which ProgramParticipant to delete.
     */
    where: ProgramParticipantWhereUniqueInput
  }

  /**
   * ProgramParticipant deleteMany
   */
  export type ProgramParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramParticipants to delete
     */
    where?: ProgramParticipantWhereInput
  }

  /**
   * ProgramParticipant without action
   */
  export type ProgramParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramParticipant
     */
    select?: ProgramParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramParticipantInclude<ExtArgs> | null
  }


  /**
   * Model AiInteraction
   */

  export type AggregateAiInteraction = {
    _count: AiInteractionCountAggregateOutputType | null
    _avg: AiInteractionAvgAggregateOutputType | null
    _sum: AiInteractionSumAggregateOutputType | null
    _min: AiInteractionMinAggregateOutputType | null
    _max: AiInteractionMaxAggregateOutputType | null
  }

  export type AiInteractionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    programId: number | null
    sessionId: number | null
    promptTokens: number | null
    completionTokens: number | null
    cost: Decimal | null
  }

  export type AiInteractionSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    programId: bigint | null
    sessionId: bigint | null
    promptTokens: number | null
    completionTokens: number | null
    cost: Decimal | null
  }

  export type AiInteractionMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    programId: bigint | null
    sessionId: bigint | null
    provider: string | null
    model: string | null
    kind: string | null
    promptTokens: number | null
    completionTokens: number | null
    cost: Decimal | null
    status: string | null
    traceId: string | null
    createdAt: Date | null
  }

  export type AiInteractionMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    programId: bigint | null
    sessionId: bigint | null
    provider: string | null
    model: string | null
    kind: string | null
    promptTokens: number | null
    completionTokens: number | null
    cost: Decimal | null
    status: string | null
    traceId: string | null
    createdAt: Date | null
  }

  export type AiInteractionCountAggregateOutputType = {
    id: number
    userId: number
    programId: number
    sessionId: number
    provider: number
    model: number
    kind: number
    promptTokens: number
    completionTokens: number
    cost: number
    status: number
    traceId: number
    meta: number
    createdAt: number
    _all: number
  }


  export type AiInteractionAvgAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    sessionId?: true
    promptTokens?: true
    completionTokens?: true
    cost?: true
  }

  export type AiInteractionSumAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    sessionId?: true
    promptTokens?: true
    completionTokens?: true
    cost?: true
  }

  export type AiInteractionMinAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    sessionId?: true
    provider?: true
    model?: true
    kind?: true
    promptTokens?: true
    completionTokens?: true
    cost?: true
    status?: true
    traceId?: true
    createdAt?: true
  }

  export type AiInteractionMaxAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    sessionId?: true
    provider?: true
    model?: true
    kind?: true
    promptTokens?: true
    completionTokens?: true
    cost?: true
    status?: true
    traceId?: true
    createdAt?: true
  }

  export type AiInteractionCountAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    sessionId?: true
    provider?: true
    model?: true
    kind?: true
    promptTokens?: true
    completionTokens?: true
    cost?: true
    status?: true
    traceId?: true
    meta?: true
    createdAt?: true
    _all?: true
  }

  export type AiInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiInteraction to aggregate.
     */
    where?: AiInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInteractions to fetch.
     */
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiInteractions
    **/
    _count?: true | AiInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiInteractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiInteractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiInteractionMaxAggregateInputType
  }

  export type GetAiInteractionAggregateType<T extends AiInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateAiInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiInteraction[P]>
      : GetScalarType<T[P], AggregateAiInteraction[P]>
  }




  export type AiInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiInteractionWhereInput
    orderBy?: AiInteractionOrderByWithAggregationInput | AiInteractionOrderByWithAggregationInput[]
    by: AiInteractionScalarFieldEnum[] | AiInteractionScalarFieldEnum
    having?: AiInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiInteractionCountAggregateInputType | true
    _avg?: AiInteractionAvgAggregateInputType
    _sum?: AiInteractionSumAggregateInputType
    _min?: AiInteractionMinAggregateInputType
    _max?: AiInteractionMaxAggregateInputType
  }

  export type AiInteractionGroupByOutputType = {
    id: bigint
    userId: bigint | null
    programId: bigint | null
    sessionId: bigint | null
    provider: string
    model: string
    kind: string
    promptTokens: number
    completionTokens: number
    cost: Decimal
    status: string
    traceId: string | null
    meta: JsonValue
    createdAt: Date
    _count: AiInteractionCountAggregateOutputType | null
    _avg: AiInteractionAvgAggregateOutputType | null
    _sum: AiInteractionSumAggregateOutputType | null
    _min: AiInteractionMinAggregateOutputType | null
    _max: AiInteractionMaxAggregateOutputType | null
  }

  type GetAiInteractionGroupByPayload<T extends AiInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], AiInteractionGroupByOutputType[P]>
        }
      >
    >


  export type AiInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    sessionId?: boolean
    provider?: boolean
    model?: boolean
    kind?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    cost?: boolean
    status?: boolean
    traceId?: boolean
    meta?: boolean
    createdAt?: boolean
    user?: boolean | AiInteraction$userArgs<ExtArgs>
    program?: boolean | AiInteraction$programArgs<ExtArgs>
    session?: boolean | AiInteraction$sessionArgs<ExtArgs>
  }, ExtArgs["result"]["aiInteraction"]>

  export type AiInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    sessionId?: boolean
    provider?: boolean
    model?: boolean
    kind?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    cost?: boolean
    status?: boolean
    traceId?: boolean
    meta?: boolean
    createdAt?: boolean
    user?: boolean | AiInteraction$userArgs<ExtArgs>
    program?: boolean | AiInteraction$programArgs<ExtArgs>
    session?: boolean | AiInteraction$sessionArgs<ExtArgs>
  }, ExtArgs["result"]["aiInteraction"]>

  export type AiInteractionSelectScalar = {
    id?: boolean
    userId?: boolean
    programId?: boolean
    sessionId?: boolean
    provider?: boolean
    model?: boolean
    kind?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    cost?: boolean
    status?: boolean
    traceId?: boolean
    meta?: boolean
    createdAt?: boolean
  }

  export type AiInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AiInteraction$userArgs<ExtArgs>
    program?: boolean | AiInteraction$programArgs<ExtArgs>
    session?: boolean | AiInteraction$sessionArgs<ExtArgs>
  }
  export type AiInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AiInteraction$userArgs<ExtArgs>
    program?: boolean | AiInteraction$programArgs<ExtArgs>
    session?: boolean | AiInteraction$sessionArgs<ExtArgs>
  }

  export type $AiInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiInteraction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      program: Prisma.$ProgramPayload<ExtArgs> | null
      session: Prisma.$SessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint | null
      programId: bigint | null
      sessionId: bigint | null
      provider: string
      model: string
      kind: string
      promptTokens: number
      completionTokens: number
      cost: Prisma.Decimal
      status: string
      traceId: string | null
      meta: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["aiInteraction"]>
    composites: {}
  }

  type AiInteractionGetPayload<S extends boolean | null | undefined | AiInteractionDefaultArgs> = $Result.GetResult<Prisma.$AiInteractionPayload, S>

  type AiInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiInteractionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiInteractionCountAggregateInputType | true
    }

  export interface AiInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiInteraction'], meta: { name: 'AiInteraction' } }
    /**
     * Find zero or one AiInteraction that matches the filter.
     * @param {AiInteractionFindUniqueArgs} args - Arguments to find a AiInteraction
     * @example
     * // Get one AiInteraction
     * const aiInteraction = await prisma.aiInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiInteractionFindUniqueArgs>(args: SelectSubset<T, AiInteractionFindUniqueArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiInteraction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiInteractionFindUniqueOrThrowArgs} args - Arguments to find a AiInteraction
     * @example
     * // Get one AiInteraction
     * const aiInteraction = await prisma.aiInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, AiInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionFindFirstArgs} args - Arguments to find a AiInteraction
     * @example
     * // Get one AiInteraction
     * const aiInteraction = await prisma.aiInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiInteractionFindFirstArgs>(args?: SelectSubset<T, AiInteractionFindFirstArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionFindFirstOrThrowArgs} args - Arguments to find a AiInteraction
     * @example
     * // Get one AiInteraction
     * const aiInteraction = await prisma.aiInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, AiInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiInteractions
     * const aiInteractions = await prisma.aiInteraction.findMany()
     * 
     * // Get first 10 AiInteractions
     * const aiInteractions = await prisma.aiInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiInteractionWithIdOnly = await prisma.aiInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiInteractionFindManyArgs>(args?: SelectSubset<T, AiInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiInteraction.
     * @param {AiInteractionCreateArgs} args - Arguments to create a AiInteraction.
     * @example
     * // Create one AiInteraction
     * const AiInteraction = await prisma.aiInteraction.create({
     *   data: {
     *     // ... data to create a AiInteraction
     *   }
     * })
     * 
     */
    create<T extends AiInteractionCreateArgs>(args: SelectSubset<T, AiInteractionCreateArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiInteractions.
     * @param {AiInteractionCreateManyArgs} args - Arguments to create many AiInteractions.
     * @example
     * // Create many AiInteractions
     * const aiInteraction = await prisma.aiInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiInteractionCreateManyArgs>(args?: SelectSubset<T, AiInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiInteractions and returns the data saved in the database.
     * @param {AiInteractionCreateManyAndReturnArgs} args - Arguments to create many AiInteractions.
     * @example
     * // Create many AiInteractions
     * const aiInteraction = await prisma.aiInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiInteractions and only return the `id`
     * const aiInteractionWithIdOnly = await prisma.aiInteraction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, AiInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiInteraction.
     * @param {AiInteractionDeleteArgs} args - Arguments to delete one AiInteraction.
     * @example
     * // Delete one AiInteraction
     * const AiInteraction = await prisma.aiInteraction.delete({
     *   where: {
     *     // ... filter to delete one AiInteraction
     *   }
     * })
     * 
     */
    delete<T extends AiInteractionDeleteArgs>(args: SelectSubset<T, AiInteractionDeleteArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiInteraction.
     * @param {AiInteractionUpdateArgs} args - Arguments to update one AiInteraction.
     * @example
     * // Update one AiInteraction
     * const aiInteraction = await prisma.aiInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiInteractionUpdateArgs>(args: SelectSubset<T, AiInteractionUpdateArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiInteractions.
     * @param {AiInteractionDeleteManyArgs} args - Arguments to filter AiInteractions to delete.
     * @example
     * // Delete a few AiInteractions
     * const { count } = await prisma.aiInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiInteractionDeleteManyArgs>(args?: SelectSubset<T, AiInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiInteractions
     * const aiInteraction = await prisma.aiInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiInteractionUpdateManyArgs>(args: SelectSubset<T, AiInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiInteraction.
     * @param {AiInteractionUpsertArgs} args - Arguments to update or create a AiInteraction.
     * @example
     * // Update or create a AiInteraction
     * const aiInteraction = await prisma.aiInteraction.upsert({
     *   create: {
     *     // ... data to create a AiInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiInteraction we want to update
     *   }
     * })
     */
    upsert<T extends AiInteractionUpsertArgs>(args: SelectSubset<T, AiInteractionUpsertArgs<ExtArgs>>): Prisma__AiInteractionClient<$Result.GetResult<Prisma.$AiInteractionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionCountArgs} args - Arguments to filter AiInteractions to count.
     * @example
     * // Count the number of AiInteractions
     * const count = await prisma.aiInteraction.count({
     *   where: {
     *     // ... the filter for the AiInteractions we want to count
     *   }
     * })
    **/
    count<T extends AiInteractionCountArgs>(
      args?: Subset<T, AiInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AiInteractionAggregateArgs>(args: Subset<T, AiInteractionAggregateArgs>): Prisma.PrismaPromise<GetAiInteractionAggregateType<T>>

    /**
     * Group by AiInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInteractionGroupByArgs} args - Group by arguments.
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
      T extends AiInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiInteractionGroupByArgs['orderBy'] }
        : { orderBy?: AiInteractionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AiInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiInteraction model
   */
  readonly fields: AiInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AiInteraction$userArgs<ExtArgs> = {}>(args?: Subset<T, AiInteraction$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    program<T extends AiInteraction$programArgs<ExtArgs> = {}>(args?: Subset<T, AiInteraction$programArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    session<T extends AiInteraction$sessionArgs<ExtArgs> = {}>(args?: Subset<T, AiInteraction$sessionArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the AiInteraction model
   */ 
  interface AiInteractionFieldRefs {
    readonly id: FieldRef<"AiInteraction", 'BigInt'>
    readonly userId: FieldRef<"AiInteraction", 'BigInt'>
    readonly programId: FieldRef<"AiInteraction", 'BigInt'>
    readonly sessionId: FieldRef<"AiInteraction", 'BigInt'>
    readonly provider: FieldRef<"AiInteraction", 'String'>
    readonly model: FieldRef<"AiInteraction", 'String'>
    readonly kind: FieldRef<"AiInteraction", 'String'>
    readonly promptTokens: FieldRef<"AiInteraction", 'Int'>
    readonly completionTokens: FieldRef<"AiInteraction", 'Int'>
    readonly cost: FieldRef<"AiInteraction", 'Decimal'>
    readonly status: FieldRef<"AiInteraction", 'String'>
    readonly traceId: FieldRef<"AiInteraction", 'String'>
    readonly meta: FieldRef<"AiInteraction", 'Json'>
    readonly createdAt: FieldRef<"AiInteraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiInteraction findUnique
   */
  export type AiInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AiInteraction to fetch.
     */
    where: AiInteractionWhereUniqueInput
  }

  /**
   * AiInteraction findUniqueOrThrow
   */
  export type AiInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AiInteraction to fetch.
     */
    where: AiInteractionWhereUniqueInput
  }

  /**
   * AiInteraction findFirst
   */
  export type AiInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AiInteraction to fetch.
     */
    where?: AiInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInteractions to fetch.
     */
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiInteractions.
     */
    cursor?: AiInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiInteractions.
     */
    distinct?: AiInteractionScalarFieldEnum | AiInteractionScalarFieldEnum[]
  }

  /**
   * AiInteraction findFirstOrThrow
   */
  export type AiInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AiInteraction to fetch.
     */
    where?: AiInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInteractions to fetch.
     */
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiInteractions.
     */
    cursor?: AiInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiInteractions.
     */
    distinct?: AiInteractionScalarFieldEnum | AiInteractionScalarFieldEnum[]
  }

  /**
   * AiInteraction findMany
   */
  export type AiInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AiInteractions to fetch.
     */
    where?: AiInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInteractions to fetch.
     */
    orderBy?: AiInteractionOrderByWithRelationInput | AiInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiInteractions.
     */
    cursor?: AiInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInteractions.
     */
    skip?: number
    distinct?: AiInteractionScalarFieldEnum | AiInteractionScalarFieldEnum[]
  }

  /**
   * AiInteraction create
   */
  export type AiInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a AiInteraction.
     */
    data: XOR<AiInteractionCreateInput, AiInteractionUncheckedCreateInput>
  }

  /**
   * AiInteraction createMany
   */
  export type AiInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiInteractions.
     */
    data: AiInteractionCreateManyInput | AiInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiInteraction createManyAndReturn
   */
  export type AiInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiInteractions.
     */
    data: AiInteractionCreateManyInput | AiInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiInteraction update
   */
  export type AiInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a AiInteraction.
     */
    data: XOR<AiInteractionUpdateInput, AiInteractionUncheckedUpdateInput>
    /**
     * Choose, which AiInteraction to update.
     */
    where: AiInteractionWhereUniqueInput
  }

  /**
   * AiInteraction updateMany
   */
  export type AiInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiInteractions.
     */
    data: XOR<AiInteractionUpdateManyMutationInput, AiInteractionUncheckedUpdateManyInput>
    /**
     * Filter which AiInteractions to update
     */
    where?: AiInteractionWhereInput
  }

  /**
   * AiInteraction upsert
   */
  export type AiInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the AiInteraction to update in case it exists.
     */
    where: AiInteractionWhereUniqueInput
    /**
     * In case the AiInteraction found by the `where` argument doesn't exist, create a new AiInteraction with this data.
     */
    create: XOR<AiInteractionCreateInput, AiInteractionUncheckedCreateInput>
    /**
     * In case the AiInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiInteractionUpdateInput, AiInteractionUncheckedUpdateInput>
  }

  /**
   * AiInteraction delete
   */
  export type AiInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
    /**
     * Filter which AiInteraction to delete.
     */
    where: AiInteractionWhereUniqueInput
  }

  /**
   * AiInteraction deleteMany
   */
  export type AiInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiInteractions to delete
     */
    where?: AiInteractionWhereInput
  }

  /**
   * AiInteraction.user
   */
  export type AiInteraction$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AiInteraction.program
   */
  export type AiInteraction$programArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
  }

  /**
   * AiInteraction.session
   */
  export type AiInteraction$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * AiInteraction without action
   */
  export type AiInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInteraction
     */
    select?: AiInteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInteractionInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    googleSub: 'googleSub',
    lastLoginAt: 'lastLoginAt',
    roleFlags: 'roleFlags',
    preferences: 'preferences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProgramScalarFieldEnum: {
    id: 'id',
    createdByUserId: 'createdByUserId',
    type: 'type',
    title: 'title',
    description: 'description',
    aiSummaryTags: 'aiSummaryTags',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    programId: 'programId',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    capacity: 'capacity',
    participantFee: 'participantFee',
    status: 'status',
    roomReservationId: 'roomReservationId',
    locationText: 'locationText',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VenueScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    openingHours: 'openingHours',
    blackoutRules: 'blackoutRules',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VenueScalarFieldEnum = (typeof VenueScalarFieldEnum)[keyof typeof VenueScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    venueId: 'venueId',
    name: 'name',
    capacity: 'capacity',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomReservationScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    purpose: 'purpose',
    status: 'status',
    meta: 'meta',
    sessionId: 'sessionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomReservationScalarFieldEnum = (typeof RoomReservationScalarFieldEnum)[keyof typeof RoomReservationScalarFieldEnum]


  export const ProgramParticipantScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    role: 'role',
    status: 'status',
    joinedAt: 'joinedAt'
  };

  export type ProgramParticipantScalarFieldEnum = (typeof ProgramParticipantScalarFieldEnum)[keyof typeof ProgramParticipantScalarFieldEnum]


  export const AiInteractionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    programId: 'programId',
    sessionId: 'sessionId',
    provider: 'provider',
    model: 'model',
    kind: 'kind',
    promptTokens: 'promptTokens',
    completionTokens: 'completionTokens',
    cost: 'cost',
    status: 'status',
    traceId: 'traceId',
    meta: 'meta',
    createdAt: 'createdAt'
  };

  export type AiInteractionScalarFieldEnum = (typeof AiInteractionScalarFieldEnum)[keyof typeof AiInteractionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: BigIntFilter<"User"> | bigint | number
    email?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    googleSub?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    roleFlags?: IntFilter<"User"> | number
    preferences?: JsonFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdPrograms?: ProgramListRelationFilter
    roomReservations?: RoomReservationListRelationFilter
    programParticipants?: ProgramParticipantListRelationFilter
    aiInteractions?: AiInteractionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    googleSub?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    roleFlags?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdPrograms?: ProgramOrderByRelationAggregateInput
    roomReservations?: RoomReservationOrderByRelationAggregateInput
    programParticipants?: ProgramParticipantOrderByRelationAggregateInput
    aiInteractions?: AiInteractionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    email?: string
    googleSub?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    roleFlags?: IntFilter<"User"> | number
    preferences?: JsonFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdPrograms?: ProgramListRelationFilter
    roomReservations?: RoomReservationListRelationFilter
    programParticipants?: ProgramParticipantListRelationFilter
    aiInteractions?: AiInteractionListRelationFilter
  }, "id" | "email" | "googleSub">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    googleSub?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    roleFlags?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"User"> | bigint | number
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleSub?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    roleFlags?: IntWithAggregatesFilter<"User"> | number
    preferences?: JsonWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProgramWhereInput = {
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    id?: BigIntFilter<"Program"> | bigint | number
    createdByUserId?: BigIntFilter<"Program"> | bigint | number
    type?: StringNullableFilter<"Program"> | string | null
    title?: StringFilter<"Program"> | string
    description?: StringNullableFilter<"Program"> | string | null
    aiSummaryTags?: JsonFilter<"Program">
    isActive?: BoolFilter<"Program"> | boolean
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    sessions?: SessionListRelationFilter
    aiInteractions?: AiInteractionListRelationFilter
  }

  export type ProgramOrderByWithRelationInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
    type?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    aiSummaryTags?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
    aiInteractions?: AiInteractionOrderByRelationAggregateInput
  }

  export type ProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    createdByUserId?: BigIntFilter<"Program"> | bigint | number
    type?: StringNullableFilter<"Program"> | string | null
    title?: StringFilter<"Program"> | string
    description?: StringNullableFilter<"Program"> | string | null
    aiSummaryTags?: JsonFilter<"Program">
    isActive?: BoolFilter<"Program"> | boolean
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    sessions?: SessionListRelationFilter
    aiInteractions?: AiInteractionListRelationFilter
  }, "id">

  export type ProgramOrderByWithAggregationInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
    type?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    aiSummaryTags?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgramCountOrderByAggregateInput
    _avg?: ProgramAvgOrderByAggregateInput
    _max?: ProgramMaxOrderByAggregateInput
    _min?: ProgramMinOrderByAggregateInput
    _sum?: ProgramSumOrderByAggregateInput
  }

  export type ProgramScalarWhereWithAggregatesInput = {
    AND?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    OR?: ProgramScalarWhereWithAggregatesInput[]
    NOT?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Program"> | bigint | number
    createdByUserId?: BigIntWithAggregatesFilter<"Program"> | bigint | number
    type?: StringNullableWithAggregatesFilter<"Program"> | string | null
    title?: StringWithAggregatesFilter<"Program"> | string
    description?: StringNullableWithAggregatesFilter<"Program"> | string | null
    aiSummaryTags?: JsonWithAggregatesFilter<"Program">
    isActive?: BoolWithAggregatesFilter<"Program"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: BigIntFilter<"Session"> | bigint | number
    programId?: BigIntFilter<"Session"> | bigint | number
    startsAt?: DateTimeFilter<"Session"> | Date | string
    endsAt?: DateTimeFilter<"Session"> | Date | string
    capacity?: IntNullableFilter<"Session"> | number | null
    participantFee?: IntNullableFilter<"Session"> | number | null
    status?: StringFilter<"Session"> | string
    roomReservationId?: BigIntNullableFilter<"Session"> | bigint | number | null
    locationText?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    program?: XOR<ProgramRelationFilter, ProgramWhereInput>
    roomReservation?: XOR<RoomReservationNullableRelationFilter, RoomReservationWhereInput> | null
    participants?: ProgramParticipantListRelationFilter
    aiInteractions?: AiInteractionListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    programId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    capacity?: SortOrderInput | SortOrder
    participantFee?: SortOrderInput | SortOrder
    status?: SortOrder
    roomReservationId?: SortOrderInput | SortOrder
    locationText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    program?: ProgramOrderByWithRelationInput
    roomReservation?: RoomReservationOrderByWithRelationInput
    participants?: ProgramParticipantOrderByRelationAggregateInput
    aiInteractions?: AiInteractionOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    roomReservationId?: bigint | number
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    programId?: BigIntFilter<"Session"> | bigint | number
    startsAt?: DateTimeFilter<"Session"> | Date | string
    endsAt?: DateTimeFilter<"Session"> | Date | string
    capacity?: IntNullableFilter<"Session"> | number | null
    participantFee?: IntNullableFilter<"Session"> | number | null
    status?: StringFilter<"Session"> | string
    locationText?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    program?: XOR<ProgramRelationFilter, ProgramWhereInput>
    roomReservation?: XOR<RoomReservationNullableRelationFilter, RoomReservationWhereInput> | null
    participants?: ProgramParticipantListRelationFilter
    aiInteractions?: AiInteractionListRelationFilter
  }, "id" | "roomReservationId">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    programId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    capacity?: SortOrderInput | SortOrder
    participantFee?: SortOrderInput | SortOrder
    status?: SortOrder
    roomReservationId?: SortOrderInput | SortOrder
    locationText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Session"> | bigint | number
    programId?: BigIntWithAggregatesFilter<"Session"> | bigint | number
    startsAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    endsAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    capacity?: IntNullableWithAggregatesFilter<"Session"> | number | null
    participantFee?: IntNullableWithAggregatesFilter<"Session"> | number | null
    status?: StringWithAggregatesFilter<"Session"> | string
    roomReservationId?: BigIntNullableWithAggregatesFilter<"Session"> | bigint | number | null
    locationText?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VenueWhereInput = {
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    id?: BigIntFilter<"Venue"> | bigint | number
    name?: StringFilter<"Venue"> | string
    address?: StringNullableFilter<"Venue"> | string | null
    openingHours?: JsonNullableFilter<"Venue">
    blackoutRules?: JsonNullableFilter<"Venue">
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    rooms?: RoomListRelationFilter
  }

  export type VenueOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    openingHours?: SortOrderInput | SortOrder
    blackoutRules?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rooms?: RoomOrderByRelationAggregateInput
  }

  export type VenueWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    name?: StringFilter<"Venue"> | string
    address?: StringNullableFilter<"Venue"> | string | null
    openingHours?: JsonNullableFilter<"Venue">
    blackoutRules?: JsonNullableFilter<"Venue">
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    rooms?: RoomListRelationFilter
  }, "id">

  export type VenueOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    openingHours?: SortOrderInput | SortOrder
    blackoutRules?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VenueCountOrderByAggregateInput
    _avg?: VenueAvgOrderByAggregateInput
    _max?: VenueMaxOrderByAggregateInput
    _min?: VenueMinOrderByAggregateInput
    _sum?: VenueSumOrderByAggregateInput
  }

  export type VenueScalarWhereWithAggregatesInput = {
    AND?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    OR?: VenueScalarWhereWithAggregatesInput[]
    NOT?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Venue"> | bigint | number
    name?: StringWithAggregatesFilter<"Venue"> | string
    address?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    openingHours?: JsonNullableWithAggregatesFilter<"Venue">
    blackoutRules?: JsonNullableWithAggregatesFilter<"Venue">
    createdAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: BigIntFilter<"Room"> | bigint | number
    venueId?: BigIntFilter<"Room"> | bigint | number
    name?: StringFilter<"Room"> | string
    capacity?: IntNullableFilter<"Room"> | number | null
    status?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    venue?: XOR<VenueRelationFilter, VenueWhereInput>
    reservations?: RoomReservationListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    venueId?: SortOrder
    name?: SortOrder
    capacity?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    venue?: VenueOrderByWithRelationInput
    reservations?: RoomReservationOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    venueId_name?: RoomVenueIdNameCompoundUniqueInput
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    venueId?: BigIntFilter<"Room"> | bigint | number
    name?: StringFilter<"Room"> | string
    capacity?: IntNullableFilter<"Room"> | number | null
    status?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    venue?: XOR<VenueRelationFilter, VenueWhereInput>
    reservations?: RoomReservationListRelationFilter
  }, "id" | "venueId_name">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    venueId?: SortOrder
    name?: SortOrder
    capacity?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Room"> | bigint | number
    venueId?: BigIntWithAggregatesFilter<"Room"> | bigint | number
    name?: StringWithAggregatesFilter<"Room"> | string
    capacity?: IntNullableWithAggregatesFilter<"Room"> | number | null
    status?: StringWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type RoomReservationWhereInput = {
    AND?: RoomReservationWhereInput | RoomReservationWhereInput[]
    OR?: RoomReservationWhereInput[]
    NOT?: RoomReservationWhereInput | RoomReservationWhereInput[]
    id?: BigIntFilter<"RoomReservation"> | bigint | number
    roomId?: BigIntFilter<"RoomReservation"> | bigint | number
    userId?: BigIntNullableFilter<"RoomReservation"> | bigint | number | null
    startsAt?: DateTimeFilter<"RoomReservation"> | Date | string
    endsAt?: DateTimeFilter<"RoomReservation"> | Date | string
    purpose?: StringNullableFilter<"RoomReservation"> | string | null
    status?: StringFilter<"RoomReservation"> | string
    meta?: JsonFilter<"RoomReservation">
    sessionId?: BigIntNullableFilter<"RoomReservation"> | bigint | number | null
    createdAt?: DateTimeFilter<"RoomReservation"> | Date | string
    updatedAt?: DateTimeFilter<"RoomReservation"> | Date | string
    room?: XOR<RoomRelationFilter, RoomWhereInput>
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    session?: XOR<SessionNullableRelationFilter, SessionWhereInput> | null
  }

  export type RoomReservationOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrderInput | SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    purpose?: SortOrderInput | SortOrder
    status?: SortOrder
    meta?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    session?: SessionOrderByWithRelationInput
  }

  export type RoomReservationWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    sessionId?: bigint | number
    AND?: RoomReservationWhereInput | RoomReservationWhereInput[]
    OR?: RoomReservationWhereInput[]
    NOT?: RoomReservationWhereInput | RoomReservationWhereInput[]
    roomId?: BigIntFilter<"RoomReservation"> | bigint | number
    userId?: BigIntNullableFilter<"RoomReservation"> | bigint | number | null
    startsAt?: DateTimeFilter<"RoomReservation"> | Date | string
    endsAt?: DateTimeFilter<"RoomReservation"> | Date | string
    purpose?: StringNullableFilter<"RoomReservation"> | string | null
    status?: StringFilter<"RoomReservation"> | string
    meta?: JsonFilter<"RoomReservation">
    createdAt?: DateTimeFilter<"RoomReservation"> | Date | string
    updatedAt?: DateTimeFilter<"RoomReservation"> | Date | string
    room?: XOR<RoomRelationFilter, RoomWhereInput>
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    session?: XOR<SessionNullableRelationFilter, SessionWhereInput> | null
  }, "id" | "sessionId">

  export type RoomReservationOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrderInput | SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    purpose?: SortOrderInput | SortOrder
    status?: SortOrder
    meta?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomReservationCountOrderByAggregateInput
    _avg?: RoomReservationAvgOrderByAggregateInput
    _max?: RoomReservationMaxOrderByAggregateInput
    _min?: RoomReservationMinOrderByAggregateInput
    _sum?: RoomReservationSumOrderByAggregateInput
  }

  export type RoomReservationScalarWhereWithAggregatesInput = {
    AND?: RoomReservationScalarWhereWithAggregatesInput | RoomReservationScalarWhereWithAggregatesInput[]
    OR?: RoomReservationScalarWhereWithAggregatesInput[]
    NOT?: RoomReservationScalarWhereWithAggregatesInput | RoomReservationScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"RoomReservation"> | bigint | number
    roomId?: BigIntWithAggregatesFilter<"RoomReservation"> | bigint | number
    userId?: BigIntNullableWithAggregatesFilter<"RoomReservation"> | bigint | number | null
    startsAt?: DateTimeWithAggregatesFilter<"RoomReservation"> | Date | string
    endsAt?: DateTimeWithAggregatesFilter<"RoomReservation"> | Date | string
    purpose?: StringNullableWithAggregatesFilter<"RoomReservation"> | string | null
    status?: StringWithAggregatesFilter<"RoomReservation"> | string
    meta?: JsonWithAggregatesFilter<"RoomReservation">
    sessionId?: BigIntNullableWithAggregatesFilter<"RoomReservation"> | bigint | number | null
    createdAt?: DateTimeWithAggregatesFilter<"RoomReservation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomReservation"> | Date | string
  }

  export type ProgramParticipantWhereInput = {
    AND?: ProgramParticipantWhereInput | ProgramParticipantWhereInput[]
    OR?: ProgramParticipantWhereInput[]
    NOT?: ProgramParticipantWhereInput | ProgramParticipantWhereInput[]
    id?: BigIntFilter<"ProgramParticipant"> | bigint | number
    sessionId?: BigIntFilter<"ProgramParticipant"> | bigint | number
    userId?: BigIntFilter<"ProgramParticipant"> | bigint | number
    role?: StringFilter<"ProgramParticipant"> | string
    status?: StringFilter<"ProgramParticipant"> | string
    joinedAt?: DateTimeNullableFilter<"ProgramParticipant"> | Date | string | null
    session?: XOR<SessionRelationFilter, SessionWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProgramParticipantOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrderInput | SortOrder
    session?: SessionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ProgramParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    sessionId_userId?: ProgramParticipantSessionIdUserIdCompoundUniqueInput
    AND?: ProgramParticipantWhereInput | ProgramParticipantWhereInput[]
    OR?: ProgramParticipantWhereInput[]
    NOT?: ProgramParticipantWhereInput | ProgramParticipantWhereInput[]
    sessionId?: BigIntFilter<"ProgramParticipant"> | bigint | number
    userId?: BigIntFilter<"ProgramParticipant"> | bigint | number
    role?: StringFilter<"ProgramParticipant"> | string
    status?: StringFilter<"ProgramParticipant"> | string
    joinedAt?: DateTimeNullableFilter<"ProgramParticipant"> | Date | string | null
    session?: XOR<SessionRelationFilter, SessionWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "sessionId_userId">

  export type ProgramParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrderInput | SortOrder
    _count?: ProgramParticipantCountOrderByAggregateInput
    _avg?: ProgramParticipantAvgOrderByAggregateInput
    _max?: ProgramParticipantMaxOrderByAggregateInput
    _min?: ProgramParticipantMinOrderByAggregateInput
    _sum?: ProgramParticipantSumOrderByAggregateInput
  }

  export type ProgramParticipantScalarWhereWithAggregatesInput = {
    AND?: ProgramParticipantScalarWhereWithAggregatesInput | ProgramParticipantScalarWhereWithAggregatesInput[]
    OR?: ProgramParticipantScalarWhereWithAggregatesInput[]
    NOT?: ProgramParticipantScalarWhereWithAggregatesInput | ProgramParticipantScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"ProgramParticipant"> | bigint | number
    sessionId?: BigIntWithAggregatesFilter<"ProgramParticipant"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"ProgramParticipant"> | bigint | number
    role?: StringWithAggregatesFilter<"ProgramParticipant"> | string
    status?: StringWithAggregatesFilter<"ProgramParticipant"> | string
    joinedAt?: DateTimeNullableWithAggregatesFilter<"ProgramParticipant"> | Date | string | null
  }

  export type AiInteractionWhereInput = {
    AND?: AiInteractionWhereInput | AiInteractionWhereInput[]
    OR?: AiInteractionWhereInput[]
    NOT?: AiInteractionWhereInput | AiInteractionWhereInput[]
    id?: BigIntFilter<"AiInteraction"> | bigint | number
    userId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    programId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    sessionId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    provider?: StringFilter<"AiInteraction"> | string
    model?: StringFilter<"AiInteraction"> | string
    kind?: StringFilter<"AiInteraction"> | string
    promptTokens?: IntFilter<"AiInteraction"> | number
    completionTokens?: IntFilter<"AiInteraction"> | number
    cost?: DecimalFilter<"AiInteraction"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"AiInteraction"> | string
    traceId?: StringNullableFilter<"AiInteraction"> | string | null
    meta?: JsonFilter<"AiInteraction">
    createdAt?: DateTimeFilter<"AiInteraction"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    program?: XOR<ProgramNullableRelationFilter, ProgramWhereInput> | null
    session?: XOR<SessionNullableRelationFilter, SessionWhereInput> | null
  }

  export type AiInteractionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    programId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    provider?: SortOrder
    model?: SortOrder
    kind?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    traceId?: SortOrderInput | SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    program?: ProgramOrderByWithRelationInput
    session?: SessionOrderByWithRelationInput
  }

  export type AiInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: AiInteractionWhereInput | AiInteractionWhereInput[]
    OR?: AiInteractionWhereInput[]
    NOT?: AiInteractionWhereInput | AiInteractionWhereInput[]
    userId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    programId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    sessionId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    provider?: StringFilter<"AiInteraction"> | string
    model?: StringFilter<"AiInteraction"> | string
    kind?: StringFilter<"AiInteraction"> | string
    promptTokens?: IntFilter<"AiInteraction"> | number
    completionTokens?: IntFilter<"AiInteraction"> | number
    cost?: DecimalFilter<"AiInteraction"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"AiInteraction"> | string
    traceId?: StringNullableFilter<"AiInteraction"> | string | null
    meta?: JsonFilter<"AiInteraction">
    createdAt?: DateTimeFilter<"AiInteraction"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    program?: XOR<ProgramNullableRelationFilter, ProgramWhereInput> | null
    session?: XOR<SessionNullableRelationFilter, SessionWhereInput> | null
  }, "id">

  export type AiInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    programId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    provider?: SortOrder
    model?: SortOrder
    kind?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    traceId?: SortOrderInput | SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
    _count?: AiInteractionCountOrderByAggregateInput
    _avg?: AiInteractionAvgOrderByAggregateInput
    _max?: AiInteractionMaxOrderByAggregateInput
    _min?: AiInteractionMinOrderByAggregateInput
    _sum?: AiInteractionSumOrderByAggregateInput
  }

  export type AiInteractionScalarWhereWithAggregatesInput = {
    AND?: AiInteractionScalarWhereWithAggregatesInput | AiInteractionScalarWhereWithAggregatesInput[]
    OR?: AiInteractionScalarWhereWithAggregatesInput[]
    NOT?: AiInteractionScalarWhereWithAggregatesInput | AiInteractionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"AiInteraction"> | bigint | number
    userId?: BigIntNullableWithAggregatesFilter<"AiInteraction"> | bigint | number | null
    programId?: BigIntNullableWithAggregatesFilter<"AiInteraction"> | bigint | number | null
    sessionId?: BigIntNullableWithAggregatesFilter<"AiInteraction"> | bigint | number | null
    provider?: StringWithAggregatesFilter<"AiInteraction"> | string
    model?: StringWithAggregatesFilter<"AiInteraction"> | string
    kind?: StringWithAggregatesFilter<"AiInteraction"> | string
    promptTokens?: IntWithAggregatesFilter<"AiInteraction"> | number
    completionTokens?: IntWithAggregatesFilter<"AiInteraction"> | number
    cost?: DecimalWithAggregatesFilter<"AiInteraction"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"AiInteraction"> | string
    traceId?: StringNullableWithAggregatesFilter<"AiInteraction"> | string | null
    meta?: JsonWithAggregatesFilter<"AiInteraction">
    createdAt?: DateTimeWithAggregatesFilter<"AiInteraction"> | Date | string
  }

  export type UserCreateInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramCreateNestedManyWithoutCreatedByInput
    roomReservations?: RoomReservationCreateNestedManyWithoutUserInput
    programParticipants?: ProgramParticipantCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramUncheckedCreateNestedManyWithoutCreatedByInput
    roomReservations?: RoomReservationUncheckedCreateNestedManyWithoutUserInput
    programParticipants?: ProgramParticipantUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUpdateManyWithoutCreatedByNestedInput
    roomReservations?: RoomReservationUpdateManyWithoutUserNestedInput
    programParticipants?: ProgramParticipantUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUncheckedUpdateManyWithoutCreatedByNestedInput
    roomReservations?: RoomReservationUncheckedUpdateManyWithoutUserNestedInput
    programParticipants?: ProgramParticipantUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramCreateInput = {
    id?: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedProgramsInput
    sessions?: SessionCreateNestedManyWithoutProgramInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateInput = {
    id?: bigint | number
    createdByUserId: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutProgramInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedProgramsNestedInput
    sessions?: SessionUpdateManyWithoutProgramNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    createdByUserId?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutProgramNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramCreateManyInput = {
    id?: bigint | number
    createdByUserId: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    createdByUserId?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    program: ProgramCreateNestedOneWithoutSessionsInput
    roomReservation?: RoomReservationCreateNestedOneWithoutSessionInput
    participants?: ProgramParticipantCreateNestedManyWithoutSessionInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: bigint | number
    programId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    roomReservationId?: bigint | number | null
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: ProgramParticipantUncheckedCreateNestedManyWithoutSessionInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutSessionsNestedInput
    roomReservation?: RoomReservationUpdateOneWithoutSessionNestedInput
    participants?: ProgramParticipantUpdateManyWithoutSessionNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    roomReservationId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ProgramParticipantUncheckedUpdateManyWithoutSessionNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: bigint | number
    programId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    roomReservationId?: bigint | number | null
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    roomReservationId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueCreateInput = {
    id?: bigint | number
    name: string
    address?: string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateInput = {
    id?: bigint | number
    name: string
    address?: string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type VenueCreateManyInput = {
    id?: bigint | number
    name: string
    address?: string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    venue: VenueCreateNestedOneWithoutRoomsInput
    reservations?: RoomReservationCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: bigint | number
    venueId: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: RoomReservationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutRoomsNestedInput
    reservations?: RoomReservationUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: RoomReservationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: bigint | number
    venueId: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomReservationCreateInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutReservationsInput
    user?: UserCreateNestedOneWithoutRoomReservationsInput
    session?: SessionCreateNestedOneWithoutRoomReservationInput
  }

  export type RoomReservationUncheckedCreateInput = {
    id?: bigint | number
    roomId: bigint | number
    userId?: bigint | number | null
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    session?: SessionUncheckedCreateNestedOneWithoutRoomReservationInput
  }

  export type RoomReservationUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutReservationsNestedInput
    user?: UserUpdateOneWithoutRoomReservationsNestedInput
    session?: SessionUpdateOneWithoutRoomReservationNestedInput
  }

  export type RoomReservationUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roomId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUncheckedUpdateOneWithoutRoomReservationNestedInput
  }

  export type RoomReservationCreateManyInput = {
    id?: bigint | number
    roomId: bigint | number
    userId?: bigint | number | null
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomReservationUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomReservationUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roomId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramParticipantCreateInput = {
    id?: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
    session: SessionCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutProgramParticipantsInput
  }

  export type ProgramParticipantUncheckedCreateInput = {
    id?: bigint | number
    sessionId: bigint | number
    userId: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
  }

  export type ProgramParticipantUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session?: SessionUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutProgramParticipantsNestedInput
  }

  export type ProgramParticipantUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    sessionId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProgramParticipantCreateManyInput = {
    id?: bigint | number
    sessionId: bigint | number
    userId: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
  }

  export type ProgramParticipantUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProgramParticipantUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    sessionId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiInteractionCreateInput = {
    id?: bigint | number
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAiInteractionsInput
    program?: ProgramCreateNestedOneWithoutAiInteractionsInput
    session?: SessionCreateNestedOneWithoutAiInteractionsInput
  }

  export type AiInteractionUncheckedCreateInput = {
    id?: bigint | number
    userId?: bigint | number | null
    programId?: bigint | number | null
    sessionId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiInteractionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAiInteractionsNestedInput
    program?: ProgramUpdateOneWithoutAiInteractionsNestedInput
    session?: SessionUpdateOneWithoutAiInteractionsNestedInput
  }

  export type AiInteractionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    programId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInteractionCreateManyInput = {
    id?: bigint | number
    userId?: bigint | number | null
    programId?: bigint | number | null
    sessionId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiInteractionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInteractionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    programId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type ProgramListRelationFilter = {
    every?: ProgramWhereInput
    some?: ProgramWhereInput
    none?: ProgramWhereInput
  }

  export type RoomReservationListRelationFilter = {
    every?: RoomReservationWhereInput
    some?: RoomReservationWhereInput
    none?: RoomReservationWhereInput
  }

  export type ProgramParticipantListRelationFilter = {
    every?: ProgramParticipantWhereInput
    some?: ProgramParticipantWhereInput
    none?: ProgramParticipantWhereInput
  }

  export type AiInteractionListRelationFilter = {
    every?: AiInteractionWhereInput
    some?: AiInteractionWhereInput
    none?: AiInteractionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProgramOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomReservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    googleSub?: SortOrder
    lastLoginAt?: SortOrder
    roleFlags?: SortOrder
    preferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    roleFlags?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    googleSub?: SortOrder
    lastLoginAt?: SortOrder
    roleFlags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    googleSub?: SortOrder
    lastLoginAt?: SortOrder
    roleFlags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    roleFlags?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramCountOrderByAggregateInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    aiSummaryTags?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramAvgOrderByAggregateInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
  }

  export type ProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramMinOrderByAggregateInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramSumOrderByAggregateInput = {
    id?: SortOrder
    createdByUserId?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type ProgramRelationFilter = {
    is?: ProgramWhereInput
    isNot?: ProgramWhereInput
  }

  export type RoomReservationNullableRelationFilter = {
    is?: RoomReservationWhereInput | null
    isNot?: RoomReservationWhereInput | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    capacity?: SortOrder
    participantFee?: SortOrder
    status?: SortOrder
    roomReservationId?: SortOrder
    locationText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    capacity?: SortOrder
    participantFee?: SortOrder
    roomReservationId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    capacity?: SortOrder
    participantFee?: SortOrder
    status?: SortOrder
    roomReservationId?: SortOrder
    locationText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    capacity?: SortOrder
    participantFee?: SortOrder
    status?: SortOrder
    roomReservationId?: SortOrder
    locationText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    capacity?: SortOrder
    participantFee?: SortOrder
    roomReservationId?: SortOrder
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

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VenueCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    openingHours?: SortOrder
    blackoutRules?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VenueMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type VenueRelationFilter = {
    is?: VenueWhereInput
    isNot?: VenueWhereInput
  }

  export type RoomVenueIdNameCompoundUniqueInput = {
    venueId: bigint | number
    name: string
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    venueId?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    id?: SortOrder
    venueId?: SortOrder
    capacity?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    venueId?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    venueId?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    id?: SortOrder
    venueId?: SortOrder
    capacity?: SortOrder
  }

  export type RoomRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SessionNullableRelationFilter = {
    is?: SessionWhereInput | null
    isNot?: SessionWhereInput | null
  }

  export type RoomReservationCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    meta?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomReservationAvgOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
  }

  export type RoomReservationMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomReservationMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomReservationSumOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
  }

  export type SessionRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type ProgramParticipantSessionIdUserIdCompoundUniqueInput = {
    sessionId: bigint | number
    userId: bigint | number
  }

  export type ProgramParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
  }

  export type ProgramParticipantAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
  }

  export type ProgramParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
  }

  export type ProgramParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
  }

  export type ProgramParticipantSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
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

  export type ProgramNullableRelationFilter = {
    is?: ProgramWhereInput | null
    isNot?: ProgramWhereInput | null
  }

  export type AiInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    sessionId?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    kind?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    traceId?: SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
  }

  export type AiInteractionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    sessionId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
  }

  export type AiInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    sessionId?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    kind?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type AiInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    sessionId?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    kind?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type AiInteractionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    sessionId?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    cost?: SortOrder
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

  export type ProgramCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProgramCreateWithoutCreatedByInput, ProgramUncheckedCreateWithoutCreatedByInput> | ProgramCreateWithoutCreatedByInput[] | ProgramUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutCreatedByInput | ProgramCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProgramCreateManyCreatedByInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type RoomReservationCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomReservationCreateWithoutUserInput, RoomReservationUncheckedCreateWithoutUserInput> | RoomReservationCreateWithoutUserInput[] | RoomReservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutUserInput | RoomReservationCreateOrConnectWithoutUserInput[]
    createMany?: RoomReservationCreateManyUserInputEnvelope
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
  }

  export type ProgramParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgramParticipantCreateWithoutUserInput, ProgramParticipantUncheckedCreateWithoutUserInput> | ProgramParticipantCreateWithoutUserInput[] | ProgramParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutUserInput | ProgramParticipantCreateOrConnectWithoutUserInput[]
    createMany?: ProgramParticipantCreateManyUserInputEnvelope
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
  }

  export type AiInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<AiInteractionCreateWithoutUserInput, AiInteractionUncheckedCreateWithoutUserInput> | AiInteractionCreateWithoutUserInput[] | AiInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutUserInput | AiInteractionCreateOrConnectWithoutUserInput[]
    createMany?: AiInteractionCreateManyUserInputEnvelope
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
  }

  export type ProgramUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProgramCreateWithoutCreatedByInput, ProgramUncheckedCreateWithoutCreatedByInput> | ProgramCreateWithoutCreatedByInput[] | ProgramUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutCreatedByInput | ProgramCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProgramCreateManyCreatedByInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type RoomReservationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomReservationCreateWithoutUserInput, RoomReservationUncheckedCreateWithoutUserInput> | RoomReservationCreateWithoutUserInput[] | RoomReservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutUserInput | RoomReservationCreateOrConnectWithoutUserInput[]
    createMany?: RoomReservationCreateManyUserInputEnvelope
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
  }

  export type ProgramParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgramParticipantCreateWithoutUserInput, ProgramParticipantUncheckedCreateWithoutUserInput> | ProgramParticipantCreateWithoutUserInput[] | ProgramParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutUserInput | ProgramParticipantCreateOrConnectWithoutUserInput[]
    createMany?: ProgramParticipantCreateManyUserInputEnvelope
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
  }

  export type AiInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AiInteractionCreateWithoutUserInput, AiInteractionUncheckedCreateWithoutUserInput> | AiInteractionCreateWithoutUserInput[] | AiInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutUserInput | AiInteractionCreateOrConnectWithoutUserInput[]
    createMany?: AiInteractionCreateManyUserInputEnvelope
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProgramUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProgramCreateWithoutCreatedByInput, ProgramUncheckedCreateWithoutCreatedByInput> | ProgramCreateWithoutCreatedByInput[] | ProgramUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutCreatedByInput | ProgramCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutCreatedByInput | ProgramUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProgramCreateManyCreatedByInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutCreatedByInput | ProgramUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutCreatedByInput | ProgramUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type RoomReservationUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomReservationCreateWithoutUserInput, RoomReservationUncheckedCreateWithoutUserInput> | RoomReservationCreateWithoutUserInput[] | RoomReservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutUserInput | RoomReservationCreateOrConnectWithoutUserInput[]
    upsert?: RoomReservationUpsertWithWhereUniqueWithoutUserInput | RoomReservationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomReservationCreateManyUserInputEnvelope
    set?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    disconnect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    delete?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    update?: RoomReservationUpdateWithWhereUniqueWithoutUserInput | RoomReservationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomReservationUpdateManyWithWhereWithoutUserInput | RoomReservationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomReservationScalarWhereInput | RoomReservationScalarWhereInput[]
  }

  export type ProgramParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgramParticipantCreateWithoutUserInput, ProgramParticipantUncheckedCreateWithoutUserInput> | ProgramParticipantCreateWithoutUserInput[] | ProgramParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutUserInput | ProgramParticipantCreateOrConnectWithoutUserInput[]
    upsert?: ProgramParticipantUpsertWithWhereUniqueWithoutUserInput | ProgramParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgramParticipantCreateManyUserInputEnvelope
    set?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    disconnect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    delete?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    update?: ProgramParticipantUpdateWithWhereUniqueWithoutUserInput | ProgramParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgramParticipantUpdateManyWithWhereWithoutUserInput | ProgramParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgramParticipantScalarWhereInput | ProgramParticipantScalarWhereInput[]
  }

  export type AiInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiInteractionCreateWithoutUserInput, AiInteractionUncheckedCreateWithoutUserInput> | AiInteractionCreateWithoutUserInput[] | AiInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutUserInput | AiInteractionCreateOrConnectWithoutUserInput[]
    upsert?: AiInteractionUpsertWithWhereUniqueWithoutUserInput | AiInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiInteractionCreateManyUserInputEnvelope
    set?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    disconnect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    delete?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    update?: AiInteractionUpdateWithWhereUniqueWithoutUserInput | AiInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiInteractionUpdateManyWithWhereWithoutUserInput | AiInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
  }

  export type ProgramUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProgramCreateWithoutCreatedByInput, ProgramUncheckedCreateWithoutCreatedByInput> | ProgramCreateWithoutCreatedByInput[] | ProgramUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutCreatedByInput | ProgramCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutCreatedByInput | ProgramUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProgramCreateManyCreatedByInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutCreatedByInput | ProgramUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutCreatedByInput | ProgramUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type RoomReservationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomReservationCreateWithoutUserInput, RoomReservationUncheckedCreateWithoutUserInput> | RoomReservationCreateWithoutUserInput[] | RoomReservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutUserInput | RoomReservationCreateOrConnectWithoutUserInput[]
    upsert?: RoomReservationUpsertWithWhereUniqueWithoutUserInput | RoomReservationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomReservationCreateManyUserInputEnvelope
    set?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    disconnect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    delete?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    update?: RoomReservationUpdateWithWhereUniqueWithoutUserInput | RoomReservationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomReservationUpdateManyWithWhereWithoutUserInput | RoomReservationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomReservationScalarWhereInput | RoomReservationScalarWhereInput[]
  }

  export type ProgramParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgramParticipantCreateWithoutUserInput, ProgramParticipantUncheckedCreateWithoutUserInput> | ProgramParticipantCreateWithoutUserInput[] | ProgramParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutUserInput | ProgramParticipantCreateOrConnectWithoutUserInput[]
    upsert?: ProgramParticipantUpsertWithWhereUniqueWithoutUserInput | ProgramParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgramParticipantCreateManyUserInputEnvelope
    set?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    disconnect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    delete?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    update?: ProgramParticipantUpdateWithWhereUniqueWithoutUserInput | ProgramParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgramParticipantUpdateManyWithWhereWithoutUserInput | ProgramParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgramParticipantScalarWhereInput | ProgramParticipantScalarWhereInput[]
  }

  export type AiInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiInteractionCreateWithoutUserInput, AiInteractionUncheckedCreateWithoutUserInput> | AiInteractionCreateWithoutUserInput[] | AiInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutUserInput | AiInteractionCreateOrConnectWithoutUserInput[]
    upsert?: AiInteractionUpsertWithWhereUniqueWithoutUserInput | AiInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiInteractionCreateManyUserInputEnvelope
    set?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    disconnect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    delete?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    update?: AiInteractionUpdateWithWhereUniqueWithoutUserInput | AiInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiInteractionUpdateManyWithWhereWithoutUserInput | AiInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedProgramsInput = {
    create?: XOR<UserCreateWithoutCreatedProgramsInput, UserUncheckedCreateWithoutCreatedProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedProgramsInput
    connect?: UserWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutProgramInput = {
    create?: XOR<SessionCreateWithoutProgramInput, SessionUncheckedCreateWithoutProgramInput> | SessionCreateWithoutProgramInput[] | SessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProgramInput | SessionCreateOrConnectWithoutProgramInput[]
    createMany?: SessionCreateManyProgramInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AiInteractionCreateNestedManyWithoutProgramInput = {
    create?: XOR<AiInteractionCreateWithoutProgramInput, AiInteractionUncheckedCreateWithoutProgramInput> | AiInteractionCreateWithoutProgramInput[] | AiInteractionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutProgramInput | AiInteractionCreateOrConnectWithoutProgramInput[]
    createMany?: AiInteractionCreateManyProgramInputEnvelope
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<SessionCreateWithoutProgramInput, SessionUncheckedCreateWithoutProgramInput> | SessionCreateWithoutProgramInput[] | SessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProgramInput | SessionCreateOrConnectWithoutProgramInput[]
    createMany?: SessionCreateManyProgramInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AiInteractionUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<AiInteractionCreateWithoutProgramInput, AiInteractionUncheckedCreateWithoutProgramInput> | AiInteractionCreateWithoutProgramInput[] | AiInteractionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutProgramInput | AiInteractionCreateOrConnectWithoutProgramInput[]
    createMany?: AiInteractionCreateManyProgramInputEnvelope
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutCreatedProgramsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedProgramsInput, UserUncheckedCreateWithoutCreatedProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedProgramsInput
    upsert?: UserUpsertWithoutCreatedProgramsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedProgramsInput, UserUpdateWithoutCreatedProgramsInput>, UserUncheckedUpdateWithoutCreatedProgramsInput>
  }

  export type SessionUpdateManyWithoutProgramNestedInput = {
    create?: XOR<SessionCreateWithoutProgramInput, SessionUncheckedCreateWithoutProgramInput> | SessionCreateWithoutProgramInput[] | SessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProgramInput | SessionCreateOrConnectWithoutProgramInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutProgramInput | SessionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: SessionCreateManyProgramInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutProgramInput | SessionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutProgramInput | SessionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AiInteractionUpdateManyWithoutProgramNestedInput = {
    create?: XOR<AiInteractionCreateWithoutProgramInput, AiInteractionUncheckedCreateWithoutProgramInput> | AiInteractionCreateWithoutProgramInput[] | AiInteractionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutProgramInput | AiInteractionCreateOrConnectWithoutProgramInput[]
    upsert?: AiInteractionUpsertWithWhereUniqueWithoutProgramInput | AiInteractionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: AiInteractionCreateManyProgramInputEnvelope
    set?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    disconnect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    delete?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    update?: AiInteractionUpdateWithWhereUniqueWithoutProgramInput | AiInteractionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: AiInteractionUpdateManyWithWhereWithoutProgramInput | AiInteractionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<SessionCreateWithoutProgramInput, SessionUncheckedCreateWithoutProgramInput> | SessionCreateWithoutProgramInput[] | SessionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutProgramInput | SessionCreateOrConnectWithoutProgramInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutProgramInput | SessionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: SessionCreateManyProgramInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutProgramInput | SessionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutProgramInput | SessionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AiInteractionUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<AiInteractionCreateWithoutProgramInput, AiInteractionUncheckedCreateWithoutProgramInput> | AiInteractionCreateWithoutProgramInput[] | AiInteractionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutProgramInput | AiInteractionCreateOrConnectWithoutProgramInput[]
    upsert?: AiInteractionUpsertWithWhereUniqueWithoutProgramInput | AiInteractionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: AiInteractionCreateManyProgramInputEnvelope
    set?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    disconnect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    delete?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    update?: AiInteractionUpdateWithWhereUniqueWithoutProgramInput | AiInteractionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: AiInteractionUpdateManyWithWhereWithoutProgramInput | AiInteractionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
  }

  export type ProgramCreateNestedOneWithoutSessionsInput = {
    create?: XOR<ProgramCreateWithoutSessionsInput, ProgramUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutSessionsInput
    connect?: ProgramWhereUniqueInput
  }

  export type RoomReservationCreateNestedOneWithoutSessionInput = {
    create?: XOR<RoomReservationCreateWithoutSessionInput, RoomReservationUncheckedCreateWithoutSessionInput>
    connectOrCreate?: RoomReservationCreateOrConnectWithoutSessionInput
    connect?: RoomReservationWhereUniqueInput
  }

  export type ProgramParticipantCreateNestedManyWithoutSessionInput = {
    create?: XOR<ProgramParticipantCreateWithoutSessionInput, ProgramParticipantUncheckedCreateWithoutSessionInput> | ProgramParticipantCreateWithoutSessionInput[] | ProgramParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutSessionInput | ProgramParticipantCreateOrConnectWithoutSessionInput[]
    createMany?: ProgramParticipantCreateManySessionInputEnvelope
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
  }

  export type AiInteractionCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiInteractionCreateWithoutSessionInput, AiInteractionUncheckedCreateWithoutSessionInput> | AiInteractionCreateWithoutSessionInput[] | AiInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutSessionInput | AiInteractionCreateOrConnectWithoutSessionInput[]
    createMany?: AiInteractionCreateManySessionInputEnvelope
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
  }

  export type ProgramParticipantUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<ProgramParticipantCreateWithoutSessionInput, ProgramParticipantUncheckedCreateWithoutSessionInput> | ProgramParticipantCreateWithoutSessionInput[] | ProgramParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutSessionInput | ProgramParticipantCreateOrConnectWithoutSessionInput[]
    createMany?: ProgramParticipantCreateManySessionInputEnvelope
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
  }

  export type AiInteractionUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiInteractionCreateWithoutSessionInput, AiInteractionUncheckedCreateWithoutSessionInput> | AiInteractionCreateWithoutSessionInput[] | AiInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutSessionInput | AiInteractionCreateOrConnectWithoutSessionInput[]
    createMany?: AiInteractionCreateManySessionInputEnvelope
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProgramUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<ProgramCreateWithoutSessionsInput, ProgramUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutSessionsInput
    upsert?: ProgramUpsertWithoutSessionsInput
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutSessionsInput, ProgramUpdateWithoutSessionsInput>, ProgramUncheckedUpdateWithoutSessionsInput>
  }

  export type RoomReservationUpdateOneWithoutSessionNestedInput = {
    create?: XOR<RoomReservationCreateWithoutSessionInput, RoomReservationUncheckedCreateWithoutSessionInput>
    connectOrCreate?: RoomReservationCreateOrConnectWithoutSessionInput
    upsert?: RoomReservationUpsertWithoutSessionInput
    disconnect?: RoomReservationWhereInput | boolean
    delete?: RoomReservationWhereInput | boolean
    connect?: RoomReservationWhereUniqueInput
    update?: XOR<XOR<RoomReservationUpdateToOneWithWhereWithoutSessionInput, RoomReservationUpdateWithoutSessionInput>, RoomReservationUncheckedUpdateWithoutSessionInput>
  }

  export type ProgramParticipantUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ProgramParticipantCreateWithoutSessionInput, ProgramParticipantUncheckedCreateWithoutSessionInput> | ProgramParticipantCreateWithoutSessionInput[] | ProgramParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutSessionInput | ProgramParticipantCreateOrConnectWithoutSessionInput[]
    upsert?: ProgramParticipantUpsertWithWhereUniqueWithoutSessionInput | ProgramParticipantUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ProgramParticipantCreateManySessionInputEnvelope
    set?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    disconnect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    delete?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    update?: ProgramParticipantUpdateWithWhereUniqueWithoutSessionInput | ProgramParticipantUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ProgramParticipantUpdateManyWithWhereWithoutSessionInput | ProgramParticipantUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ProgramParticipantScalarWhereInput | ProgramParticipantScalarWhereInput[]
  }

  export type AiInteractionUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiInteractionCreateWithoutSessionInput, AiInteractionUncheckedCreateWithoutSessionInput> | AiInteractionCreateWithoutSessionInput[] | AiInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutSessionInput | AiInteractionCreateOrConnectWithoutSessionInput[]
    upsert?: AiInteractionUpsertWithWhereUniqueWithoutSessionInput | AiInteractionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiInteractionCreateManySessionInputEnvelope
    set?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    disconnect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    delete?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    update?: AiInteractionUpdateWithWhereUniqueWithoutSessionInput | AiInteractionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiInteractionUpdateManyWithWhereWithoutSessionInput | AiInteractionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type ProgramParticipantUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ProgramParticipantCreateWithoutSessionInput, ProgramParticipantUncheckedCreateWithoutSessionInput> | ProgramParticipantCreateWithoutSessionInput[] | ProgramParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ProgramParticipantCreateOrConnectWithoutSessionInput | ProgramParticipantCreateOrConnectWithoutSessionInput[]
    upsert?: ProgramParticipantUpsertWithWhereUniqueWithoutSessionInput | ProgramParticipantUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ProgramParticipantCreateManySessionInputEnvelope
    set?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    disconnect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    delete?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    connect?: ProgramParticipantWhereUniqueInput | ProgramParticipantWhereUniqueInput[]
    update?: ProgramParticipantUpdateWithWhereUniqueWithoutSessionInput | ProgramParticipantUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ProgramParticipantUpdateManyWithWhereWithoutSessionInput | ProgramParticipantUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ProgramParticipantScalarWhereInput | ProgramParticipantScalarWhereInput[]
  }

  export type AiInteractionUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiInteractionCreateWithoutSessionInput, AiInteractionUncheckedCreateWithoutSessionInput> | AiInteractionCreateWithoutSessionInput[] | AiInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiInteractionCreateOrConnectWithoutSessionInput | AiInteractionCreateOrConnectWithoutSessionInput[]
    upsert?: AiInteractionUpsertWithWhereUniqueWithoutSessionInput | AiInteractionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiInteractionCreateManySessionInputEnvelope
    set?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    disconnect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    delete?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    connect?: AiInteractionWhereUniqueInput | AiInteractionWhereUniqueInput[]
    update?: AiInteractionUpdateWithWhereUniqueWithoutSessionInput | AiInteractionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiInteractionUpdateManyWithWhereWithoutSessionInput | AiInteractionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
  }

  export type RoomCreateNestedManyWithoutVenueInput = {
    create?: XOR<RoomCreateWithoutVenueInput, RoomUncheckedCreateWithoutVenueInput> | RoomCreateWithoutVenueInput[] | RoomUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutVenueInput | RoomCreateOrConnectWithoutVenueInput[]
    createMany?: RoomCreateManyVenueInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutVenueInput = {
    create?: XOR<RoomCreateWithoutVenueInput, RoomUncheckedCreateWithoutVenueInput> | RoomCreateWithoutVenueInput[] | RoomUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutVenueInput | RoomCreateOrConnectWithoutVenueInput[]
    createMany?: RoomCreateManyVenueInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomUpdateManyWithoutVenueNestedInput = {
    create?: XOR<RoomCreateWithoutVenueInput, RoomUncheckedCreateWithoutVenueInput> | RoomCreateWithoutVenueInput[] | RoomUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutVenueInput | RoomCreateOrConnectWithoutVenueInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutVenueInput | RoomUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: RoomCreateManyVenueInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutVenueInput | RoomUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutVenueInput | RoomUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutVenueNestedInput = {
    create?: XOR<RoomCreateWithoutVenueInput, RoomUncheckedCreateWithoutVenueInput> | RoomCreateWithoutVenueInput[] | RoomUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutVenueInput | RoomCreateOrConnectWithoutVenueInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutVenueInput | RoomUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: RoomCreateManyVenueInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutVenueInput | RoomUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutVenueInput | RoomUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type VenueCreateNestedOneWithoutRoomsInput = {
    create?: XOR<VenueCreateWithoutRoomsInput, VenueUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutRoomsInput
    connect?: VenueWhereUniqueInput
  }

  export type RoomReservationCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomReservationCreateWithoutRoomInput, RoomReservationUncheckedCreateWithoutRoomInput> | RoomReservationCreateWithoutRoomInput[] | RoomReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutRoomInput | RoomReservationCreateOrConnectWithoutRoomInput[]
    createMany?: RoomReservationCreateManyRoomInputEnvelope
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
  }

  export type RoomReservationUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomReservationCreateWithoutRoomInput, RoomReservationUncheckedCreateWithoutRoomInput> | RoomReservationCreateWithoutRoomInput[] | RoomReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutRoomInput | RoomReservationCreateOrConnectWithoutRoomInput[]
    createMany?: RoomReservationCreateManyRoomInputEnvelope
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
  }

  export type VenueUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<VenueCreateWithoutRoomsInput, VenueUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutRoomsInput
    upsert?: VenueUpsertWithoutRoomsInput
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutRoomsInput, VenueUpdateWithoutRoomsInput>, VenueUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomReservationUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomReservationCreateWithoutRoomInput, RoomReservationUncheckedCreateWithoutRoomInput> | RoomReservationCreateWithoutRoomInput[] | RoomReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutRoomInput | RoomReservationCreateOrConnectWithoutRoomInput[]
    upsert?: RoomReservationUpsertWithWhereUniqueWithoutRoomInput | RoomReservationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomReservationCreateManyRoomInputEnvelope
    set?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    disconnect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    delete?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    update?: RoomReservationUpdateWithWhereUniqueWithoutRoomInput | RoomReservationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomReservationUpdateManyWithWhereWithoutRoomInput | RoomReservationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomReservationScalarWhereInput | RoomReservationScalarWhereInput[]
  }

  export type RoomReservationUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomReservationCreateWithoutRoomInput, RoomReservationUncheckedCreateWithoutRoomInput> | RoomReservationCreateWithoutRoomInput[] | RoomReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomReservationCreateOrConnectWithoutRoomInput | RoomReservationCreateOrConnectWithoutRoomInput[]
    upsert?: RoomReservationUpsertWithWhereUniqueWithoutRoomInput | RoomReservationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomReservationCreateManyRoomInputEnvelope
    set?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    disconnect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    delete?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    connect?: RoomReservationWhereUniqueInput | RoomReservationWhereUniqueInput[]
    update?: RoomReservationUpdateWithWhereUniqueWithoutRoomInput | RoomReservationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomReservationUpdateManyWithWhereWithoutRoomInput | RoomReservationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomReservationScalarWhereInput | RoomReservationScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutReservationsInput = {
    create?: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutReservationsInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRoomReservationsInput = {
    create?: XOR<UserCreateWithoutRoomReservationsInput, UserUncheckedCreateWithoutRoomReservationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomReservationsInput
    connect?: UserWhereUniqueInput
  }

  export type SessionCreateNestedOneWithoutRoomReservationInput = {
    create?: XOR<SessionCreateWithoutRoomReservationInput, SessionUncheckedCreateWithoutRoomReservationInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRoomReservationInput
    connect?: SessionWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedOneWithoutRoomReservationInput = {
    create?: XOR<SessionCreateWithoutRoomReservationInput, SessionUncheckedCreateWithoutRoomReservationInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRoomReservationInput
    connect?: SessionWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutReservationsInput
    upsert?: RoomUpsertWithoutReservationsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutReservationsInput, RoomUpdateWithoutReservationsInput>, RoomUncheckedUpdateWithoutReservationsInput>
  }

  export type UserUpdateOneWithoutRoomReservationsNestedInput = {
    create?: XOR<UserCreateWithoutRoomReservationsInput, UserUncheckedCreateWithoutRoomReservationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomReservationsInput
    upsert?: UserUpsertWithoutRoomReservationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomReservationsInput, UserUpdateWithoutRoomReservationsInput>, UserUncheckedUpdateWithoutRoomReservationsInput>
  }

  export type SessionUpdateOneWithoutRoomReservationNestedInput = {
    create?: XOR<SessionCreateWithoutRoomReservationInput, SessionUncheckedCreateWithoutRoomReservationInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRoomReservationInput
    upsert?: SessionUpsertWithoutRoomReservationInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRoomReservationInput, SessionUpdateWithoutRoomReservationInput>, SessionUncheckedUpdateWithoutRoomReservationInput>
  }

  export type SessionUncheckedUpdateOneWithoutRoomReservationNestedInput = {
    create?: XOR<SessionCreateWithoutRoomReservationInput, SessionUncheckedCreateWithoutRoomReservationInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRoomReservationInput
    upsert?: SessionUpsertWithoutRoomReservationInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRoomReservationInput, SessionUpdateWithoutRoomReservationInput>, SessionUncheckedUpdateWithoutRoomReservationInput>
  }

  export type SessionCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<SessionCreateWithoutParticipantsInput, SessionUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutParticipantsInput
    connect?: SessionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProgramParticipantsInput = {
    create?: XOR<UserCreateWithoutProgramParticipantsInput, UserUncheckedCreateWithoutProgramParticipantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgramParticipantsInput
    connect?: UserWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<SessionCreateWithoutParticipantsInput, SessionUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutParticipantsInput
    upsert?: SessionUpsertWithoutParticipantsInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutParticipantsInput, SessionUpdateWithoutParticipantsInput>, SessionUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutProgramParticipantsNestedInput = {
    create?: XOR<UserCreateWithoutProgramParticipantsInput, UserUncheckedCreateWithoutProgramParticipantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgramParticipantsInput
    upsert?: UserUpsertWithoutProgramParticipantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgramParticipantsInput, UserUpdateWithoutProgramParticipantsInput>, UserUncheckedUpdateWithoutProgramParticipantsInput>
  }

  export type UserCreateNestedOneWithoutAiInteractionsInput = {
    create?: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type ProgramCreateNestedOneWithoutAiInteractionsInput = {
    create?: XOR<ProgramCreateWithoutAiInteractionsInput, ProgramUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutAiInteractionsInput
    connect?: ProgramWhereUniqueInput
  }

  export type SessionCreateNestedOneWithoutAiInteractionsInput = {
    create?: XOR<SessionCreateWithoutAiInteractionsInput, SessionUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutAiInteractionsInput
    connect?: SessionWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneWithoutAiInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiInteractionsInput
    upsert?: UserUpsertWithoutAiInteractionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiInteractionsInput, UserUpdateWithoutAiInteractionsInput>, UserUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type ProgramUpdateOneWithoutAiInteractionsNestedInput = {
    create?: XOR<ProgramCreateWithoutAiInteractionsInput, ProgramUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutAiInteractionsInput
    upsert?: ProgramUpsertWithoutAiInteractionsInput
    disconnect?: ProgramWhereInput | boolean
    delete?: ProgramWhereInput | boolean
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutAiInteractionsInput, ProgramUpdateWithoutAiInteractionsInput>, ProgramUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type SessionUpdateOneWithoutAiInteractionsNestedInput = {
    create?: XOR<SessionCreateWithoutAiInteractionsInput, SessionUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutAiInteractionsInput
    upsert?: SessionUpsertWithoutAiInteractionsInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutAiInteractionsInput, SessionUpdateWithoutAiInteractionsInput>, SessionUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
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

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type ProgramCreateWithoutCreatedByInput = {
    id?: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutProgramInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutCreatedByInput = {
    id?: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutProgramInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutCreatedByInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutCreatedByInput, ProgramUncheckedCreateWithoutCreatedByInput>
  }

  export type ProgramCreateManyCreatedByInputEnvelope = {
    data: ProgramCreateManyCreatedByInput | ProgramCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type RoomReservationCreateWithoutUserInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutReservationsInput
    session?: SessionCreateNestedOneWithoutRoomReservationInput
  }

  export type RoomReservationUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    roomId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    session?: SessionUncheckedCreateNestedOneWithoutRoomReservationInput
  }

  export type RoomReservationCreateOrConnectWithoutUserInput = {
    where: RoomReservationWhereUniqueInput
    create: XOR<RoomReservationCreateWithoutUserInput, RoomReservationUncheckedCreateWithoutUserInput>
  }

  export type RoomReservationCreateManyUserInputEnvelope = {
    data: RoomReservationCreateManyUserInput | RoomReservationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProgramParticipantCreateWithoutUserInput = {
    id?: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
    session: SessionCreateNestedOneWithoutParticipantsInput
  }

  export type ProgramParticipantUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    sessionId: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
  }

  export type ProgramParticipantCreateOrConnectWithoutUserInput = {
    where: ProgramParticipantWhereUniqueInput
    create: XOR<ProgramParticipantCreateWithoutUserInput, ProgramParticipantUncheckedCreateWithoutUserInput>
  }

  export type ProgramParticipantCreateManyUserInputEnvelope = {
    data: ProgramParticipantCreateManyUserInput | ProgramParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AiInteractionCreateWithoutUserInput = {
    id?: bigint | number
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    program?: ProgramCreateNestedOneWithoutAiInteractionsInput
    session?: SessionCreateNestedOneWithoutAiInteractionsInput
  }

  export type AiInteractionUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    programId?: bigint | number | null
    sessionId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiInteractionCreateOrConnectWithoutUserInput = {
    where: AiInteractionWhereUniqueInput
    create: XOR<AiInteractionCreateWithoutUserInput, AiInteractionUncheckedCreateWithoutUserInput>
  }

  export type AiInteractionCreateManyUserInputEnvelope = {
    data: AiInteractionCreateManyUserInput | AiInteractionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProgramUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ProgramWhereUniqueInput
    update: XOR<ProgramUpdateWithoutCreatedByInput, ProgramUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ProgramCreateWithoutCreatedByInput, ProgramUncheckedCreateWithoutCreatedByInput>
  }

  export type ProgramUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ProgramWhereUniqueInput
    data: XOR<ProgramUpdateWithoutCreatedByInput, ProgramUncheckedUpdateWithoutCreatedByInput>
  }

  export type ProgramUpdateManyWithWhereWithoutCreatedByInput = {
    where: ProgramScalarWhereInput
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ProgramScalarWhereInput = {
    AND?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    OR?: ProgramScalarWhereInput[]
    NOT?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    id?: BigIntFilter<"Program"> | bigint | number
    createdByUserId?: BigIntFilter<"Program"> | bigint | number
    type?: StringNullableFilter<"Program"> | string | null
    title?: StringFilter<"Program"> | string
    description?: StringNullableFilter<"Program"> | string | null
    aiSummaryTags?: JsonFilter<"Program">
    isActive?: BoolFilter<"Program"> | boolean
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
  }

  export type RoomReservationUpsertWithWhereUniqueWithoutUserInput = {
    where: RoomReservationWhereUniqueInput
    update: XOR<RoomReservationUpdateWithoutUserInput, RoomReservationUncheckedUpdateWithoutUserInput>
    create: XOR<RoomReservationCreateWithoutUserInput, RoomReservationUncheckedCreateWithoutUserInput>
  }

  export type RoomReservationUpdateWithWhereUniqueWithoutUserInput = {
    where: RoomReservationWhereUniqueInput
    data: XOR<RoomReservationUpdateWithoutUserInput, RoomReservationUncheckedUpdateWithoutUserInput>
  }

  export type RoomReservationUpdateManyWithWhereWithoutUserInput = {
    where: RoomReservationScalarWhereInput
    data: XOR<RoomReservationUpdateManyMutationInput, RoomReservationUncheckedUpdateManyWithoutUserInput>
  }

  export type RoomReservationScalarWhereInput = {
    AND?: RoomReservationScalarWhereInput | RoomReservationScalarWhereInput[]
    OR?: RoomReservationScalarWhereInput[]
    NOT?: RoomReservationScalarWhereInput | RoomReservationScalarWhereInput[]
    id?: BigIntFilter<"RoomReservation"> | bigint | number
    roomId?: BigIntFilter<"RoomReservation"> | bigint | number
    userId?: BigIntNullableFilter<"RoomReservation"> | bigint | number | null
    startsAt?: DateTimeFilter<"RoomReservation"> | Date | string
    endsAt?: DateTimeFilter<"RoomReservation"> | Date | string
    purpose?: StringNullableFilter<"RoomReservation"> | string | null
    status?: StringFilter<"RoomReservation"> | string
    meta?: JsonFilter<"RoomReservation">
    sessionId?: BigIntNullableFilter<"RoomReservation"> | bigint | number | null
    createdAt?: DateTimeFilter<"RoomReservation"> | Date | string
    updatedAt?: DateTimeFilter<"RoomReservation"> | Date | string
  }

  export type ProgramParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgramParticipantWhereUniqueInput
    update: XOR<ProgramParticipantUpdateWithoutUserInput, ProgramParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<ProgramParticipantCreateWithoutUserInput, ProgramParticipantUncheckedCreateWithoutUserInput>
  }

  export type ProgramParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgramParticipantWhereUniqueInput
    data: XOR<ProgramParticipantUpdateWithoutUserInput, ProgramParticipantUncheckedUpdateWithoutUserInput>
  }

  export type ProgramParticipantUpdateManyWithWhereWithoutUserInput = {
    where: ProgramParticipantScalarWhereInput
    data: XOR<ProgramParticipantUpdateManyMutationInput, ProgramParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type ProgramParticipantScalarWhereInput = {
    AND?: ProgramParticipantScalarWhereInput | ProgramParticipantScalarWhereInput[]
    OR?: ProgramParticipantScalarWhereInput[]
    NOT?: ProgramParticipantScalarWhereInput | ProgramParticipantScalarWhereInput[]
    id?: BigIntFilter<"ProgramParticipant"> | bigint | number
    sessionId?: BigIntFilter<"ProgramParticipant"> | bigint | number
    userId?: BigIntFilter<"ProgramParticipant"> | bigint | number
    role?: StringFilter<"ProgramParticipant"> | string
    status?: StringFilter<"ProgramParticipant"> | string
    joinedAt?: DateTimeNullableFilter<"ProgramParticipant"> | Date | string | null
  }

  export type AiInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: AiInteractionWhereUniqueInput
    update: XOR<AiInteractionUpdateWithoutUserInput, AiInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<AiInteractionCreateWithoutUserInput, AiInteractionUncheckedCreateWithoutUserInput>
  }

  export type AiInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: AiInteractionWhereUniqueInput
    data: XOR<AiInteractionUpdateWithoutUserInput, AiInteractionUncheckedUpdateWithoutUserInput>
  }

  export type AiInteractionUpdateManyWithWhereWithoutUserInput = {
    where: AiInteractionScalarWhereInput
    data: XOR<AiInteractionUpdateManyMutationInput, AiInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type AiInteractionScalarWhereInput = {
    AND?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
    OR?: AiInteractionScalarWhereInput[]
    NOT?: AiInteractionScalarWhereInput | AiInteractionScalarWhereInput[]
    id?: BigIntFilter<"AiInteraction"> | bigint | number
    userId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    programId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    sessionId?: BigIntNullableFilter<"AiInteraction"> | bigint | number | null
    provider?: StringFilter<"AiInteraction"> | string
    model?: StringFilter<"AiInteraction"> | string
    kind?: StringFilter<"AiInteraction"> | string
    promptTokens?: IntFilter<"AiInteraction"> | number
    completionTokens?: IntFilter<"AiInteraction"> | number
    cost?: DecimalFilter<"AiInteraction"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"AiInteraction"> | string
    traceId?: StringNullableFilter<"AiInteraction"> | string | null
    meta?: JsonFilter<"AiInteraction">
    createdAt?: DateTimeFilter<"AiInteraction"> | Date | string
  }

  export type UserCreateWithoutCreatedProgramsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roomReservations?: RoomReservationCreateNestedManyWithoutUserInput
    programParticipants?: ProgramParticipantCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedProgramsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roomReservations?: RoomReservationUncheckedCreateNestedManyWithoutUserInput
    programParticipants?: ProgramParticipantUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedProgramsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedProgramsInput, UserUncheckedCreateWithoutCreatedProgramsInput>
  }

  export type SessionCreateWithoutProgramInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomReservation?: RoomReservationCreateNestedOneWithoutSessionInput
    participants?: ProgramParticipantCreateNestedManyWithoutSessionInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutProgramInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    roomReservationId?: bigint | number | null
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: ProgramParticipantUncheckedCreateNestedManyWithoutSessionInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutProgramInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutProgramInput, SessionUncheckedCreateWithoutProgramInput>
  }

  export type SessionCreateManyProgramInputEnvelope = {
    data: SessionCreateManyProgramInput | SessionCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type AiInteractionCreateWithoutProgramInput = {
    id?: bigint | number
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAiInteractionsInput
    session?: SessionCreateNestedOneWithoutAiInteractionsInput
  }

  export type AiInteractionUncheckedCreateWithoutProgramInput = {
    id?: bigint | number
    userId?: bigint | number | null
    sessionId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiInteractionCreateOrConnectWithoutProgramInput = {
    where: AiInteractionWhereUniqueInput
    create: XOR<AiInteractionCreateWithoutProgramInput, AiInteractionUncheckedCreateWithoutProgramInput>
  }

  export type AiInteractionCreateManyProgramInputEnvelope = {
    data: AiInteractionCreateManyProgramInput | AiInteractionCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedProgramsInput = {
    update: XOR<UserUpdateWithoutCreatedProgramsInput, UserUncheckedUpdateWithoutCreatedProgramsInput>
    create: XOR<UserCreateWithoutCreatedProgramsInput, UserUncheckedCreateWithoutCreatedProgramsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedProgramsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedProgramsInput, UserUncheckedUpdateWithoutCreatedProgramsInput>
  }

  export type UserUpdateWithoutCreatedProgramsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomReservations?: RoomReservationUpdateManyWithoutUserNestedInput
    programParticipants?: ProgramParticipantUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedProgramsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomReservations?: RoomReservationUncheckedUpdateManyWithoutUserNestedInput
    programParticipants?: ProgramParticipantUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutProgramInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutProgramInput, SessionUncheckedUpdateWithoutProgramInput>
    create: XOR<SessionCreateWithoutProgramInput, SessionUncheckedCreateWithoutProgramInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutProgramInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutProgramInput, SessionUncheckedUpdateWithoutProgramInput>
  }

  export type SessionUpdateManyWithWhereWithoutProgramInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutProgramInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: BigIntFilter<"Session"> | bigint | number
    programId?: BigIntFilter<"Session"> | bigint | number
    startsAt?: DateTimeFilter<"Session"> | Date | string
    endsAt?: DateTimeFilter<"Session"> | Date | string
    capacity?: IntNullableFilter<"Session"> | number | null
    participantFee?: IntNullableFilter<"Session"> | number | null
    status?: StringFilter<"Session"> | string
    roomReservationId?: BigIntNullableFilter<"Session"> | bigint | number | null
    locationText?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type AiInteractionUpsertWithWhereUniqueWithoutProgramInput = {
    where: AiInteractionWhereUniqueInput
    update: XOR<AiInteractionUpdateWithoutProgramInput, AiInteractionUncheckedUpdateWithoutProgramInput>
    create: XOR<AiInteractionCreateWithoutProgramInput, AiInteractionUncheckedCreateWithoutProgramInput>
  }

  export type AiInteractionUpdateWithWhereUniqueWithoutProgramInput = {
    where: AiInteractionWhereUniqueInput
    data: XOR<AiInteractionUpdateWithoutProgramInput, AiInteractionUncheckedUpdateWithoutProgramInput>
  }

  export type AiInteractionUpdateManyWithWhereWithoutProgramInput = {
    where: AiInteractionScalarWhereInput
    data: XOR<AiInteractionUpdateManyMutationInput, AiInteractionUncheckedUpdateManyWithoutProgramInput>
  }

  export type ProgramCreateWithoutSessionsInput = {
    id?: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedProgramsInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutSessionsInput = {
    id?: bigint | number
    createdByUserId: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutSessionsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutSessionsInput, ProgramUncheckedCreateWithoutSessionsInput>
  }

  export type RoomReservationCreateWithoutSessionInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutReservationsInput
    user?: UserCreateNestedOneWithoutRoomReservationsInput
  }

  export type RoomReservationUncheckedCreateWithoutSessionInput = {
    id?: bigint | number
    roomId: bigint | number
    userId?: bigint | number | null
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomReservationCreateOrConnectWithoutSessionInput = {
    where: RoomReservationWhereUniqueInput
    create: XOR<RoomReservationCreateWithoutSessionInput, RoomReservationUncheckedCreateWithoutSessionInput>
  }

  export type ProgramParticipantCreateWithoutSessionInput = {
    id?: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
    user: UserCreateNestedOneWithoutProgramParticipantsInput
  }

  export type ProgramParticipantUncheckedCreateWithoutSessionInput = {
    id?: bigint | number
    userId: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
  }

  export type ProgramParticipantCreateOrConnectWithoutSessionInput = {
    where: ProgramParticipantWhereUniqueInput
    create: XOR<ProgramParticipantCreateWithoutSessionInput, ProgramParticipantUncheckedCreateWithoutSessionInput>
  }

  export type ProgramParticipantCreateManySessionInputEnvelope = {
    data: ProgramParticipantCreateManySessionInput | ProgramParticipantCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type AiInteractionCreateWithoutSessionInput = {
    id?: bigint | number
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAiInteractionsInput
    program?: ProgramCreateNestedOneWithoutAiInteractionsInput
  }

  export type AiInteractionUncheckedCreateWithoutSessionInput = {
    id?: bigint | number
    userId?: bigint | number | null
    programId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiInteractionCreateOrConnectWithoutSessionInput = {
    where: AiInteractionWhereUniqueInput
    create: XOR<AiInteractionCreateWithoutSessionInput, AiInteractionUncheckedCreateWithoutSessionInput>
  }

  export type AiInteractionCreateManySessionInputEnvelope = {
    data: AiInteractionCreateManySessionInput | AiInteractionCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type ProgramUpsertWithoutSessionsInput = {
    update: XOR<ProgramUpdateWithoutSessionsInput, ProgramUncheckedUpdateWithoutSessionsInput>
    create: XOR<ProgramCreateWithoutSessionsInput, ProgramUncheckedCreateWithoutSessionsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutSessionsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutSessionsInput, ProgramUncheckedUpdateWithoutSessionsInput>
  }

  export type ProgramUpdateWithoutSessionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedProgramsNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutSessionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    createdByUserId?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type RoomReservationUpsertWithoutSessionInput = {
    update: XOR<RoomReservationUpdateWithoutSessionInput, RoomReservationUncheckedUpdateWithoutSessionInput>
    create: XOR<RoomReservationCreateWithoutSessionInput, RoomReservationUncheckedCreateWithoutSessionInput>
    where?: RoomReservationWhereInput
  }

  export type RoomReservationUpdateToOneWithWhereWithoutSessionInput = {
    where?: RoomReservationWhereInput
    data: XOR<RoomReservationUpdateWithoutSessionInput, RoomReservationUncheckedUpdateWithoutSessionInput>
  }

  export type RoomReservationUpdateWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutReservationsNestedInput
    user?: UserUpdateOneWithoutRoomReservationsNestedInput
  }

  export type RoomReservationUncheckedUpdateWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roomId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramParticipantUpsertWithWhereUniqueWithoutSessionInput = {
    where: ProgramParticipantWhereUniqueInput
    update: XOR<ProgramParticipantUpdateWithoutSessionInput, ProgramParticipantUncheckedUpdateWithoutSessionInput>
    create: XOR<ProgramParticipantCreateWithoutSessionInput, ProgramParticipantUncheckedCreateWithoutSessionInput>
  }

  export type ProgramParticipantUpdateWithWhereUniqueWithoutSessionInput = {
    where: ProgramParticipantWhereUniqueInput
    data: XOR<ProgramParticipantUpdateWithoutSessionInput, ProgramParticipantUncheckedUpdateWithoutSessionInput>
  }

  export type ProgramParticipantUpdateManyWithWhereWithoutSessionInput = {
    where: ProgramParticipantScalarWhereInput
    data: XOR<ProgramParticipantUpdateManyMutationInput, ProgramParticipantUncheckedUpdateManyWithoutSessionInput>
  }

  export type AiInteractionUpsertWithWhereUniqueWithoutSessionInput = {
    where: AiInteractionWhereUniqueInput
    update: XOR<AiInteractionUpdateWithoutSessionInput, AiInteractionUncheckedUpdateWithoutSessionInput>
    create: XOR<AiInteractionCreateWithoutSessionInput, AiInteractionUncheckedCreateWithoutSessionInput>
  }

  export type AiInteractionUpdateWithWhereUniqueWithoutSessionInput = {
    where: AiInteractionWhereUniqueInput
    data: XOR<AiInteractionUpdateWithoutSessionInput, AiInteractionUncheckedUpdateWithoutSessionInput>
  }

  export type AiInteractionUpdateManyWithWhereWithoutSessionInput = {
    where: AiInteractionScalarWhereInput
    data: XOR<AiInteractionUpdateManyMutationInput, AiInteractionUncheckedUpdateManyWithoutSessionInput>
  }

  export type RoomCreateWithoutVenueInput = {
    id?: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: RoomReservationCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutVenueInput = {
    id?: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: RoomReservationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutVenueInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutVenueInput, RoomUncheckedCreateWithoutVenueInput>
  }

  export type RoomCreateManyVenueInputEnvelope = {
    data: RoomCreateManyVenueInput | RoomCreateManyVenueInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithWhereUniqueWithoutVenueInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutVenueInput, RoomUncheckedUpdateWithoutVenueInput>
    create: XOR<RoomCreateWithoutVenueInput, RoomUncheckedCreateWithoutVenueInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutVenueInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutVenueInput, RoomUncheckedUpdateWithoutVenueInput>
  }

  export type RoomUpdateManyWithWhereWithoutVenueInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutVenueInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: BigIntFilter<"Room"> | bigint | number
    venueId?: BigIntFilter<"Room"> | bigint | number
    name?: StringFilter<"Room"> | string
    capacity?: IntNullableFilter<"Room"> | number | null
    status?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
  }

  export type VenueCreateWithoutRoomsInput = {
    id?: bigint | number
    name: string
    address?: string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUncheckedCreateWithoutRoomsInput = {
    id?: bigint | number
    name: string
    address?: string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueCreateOrConnectWithoutRoomsInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutRoomsInput, VenueUncheckedCreateWithoutRoomsInput>
  }

  export type RoomReservationCreateWithoutRoomInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutRoomReservationsInput
    session?: SessionCreateNestedOneWithoutRoomReservationInput
  }

  export type RoomReservationUncheckedCreateWithoutRoomInput = {
    id?: bigint | number
    userId?: bigint | number | null
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    session?: SessionUncheckedCreateNestedOneWithoutRoomReservationInput
  }

  export type RoomReservationCreateOrConnectWithoutRoomInput = {
    where: RoomReservationWhereUniqueInput
    create: XOR<RoomReservationCreateWithoutRoomInput, RoomReservationUncheckedCreateWithoutRoomInput>
  }

  export type RoomReservationCreateManyRoomInputEnvelope = {
    data: RoomReservationCreateManyRoomInput | RoomReservationCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type VenueUpsertWithoutRoomsInput = {
    update: XOR<VenueUpdateWithoutRoomsInput, VenueUncheckedUpdateWithoutRoomsInput>
    create: XOR<VenueCreateWithoutRoomsInput, VenueUncheckedCreateWithoutRoomsInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutRoomsInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutRoomsInput, VenueUncheckedUpdateWithoutRoomsInput>
  }

  export type VenueUpdateWithoutRoomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateWithoutRoomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    blackoutRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomReservationUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomReservationWhereUniqueInput
    update: XOR<RoomReservationUpdateWithoutRoomInput, RoomReservationUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomReservationCreateWithoutRoomInput, RoomReservationUncheckedCreateWithoutRoomInput>
  }

  export type RoomReservationUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomReservationWhereUniqueInput
    data: XOR<RoomReservationUpdateWithoutRoomInput, RoomReservationUncheckedUpdateWithoutRoomInput>
  }

  export type RoomReservationUpdateManyWithWhereWithoutRoomInput = {
    where: RoomReservationScalarWhereInput
    data: XOR<RoomReservationUpdateManyMutationInput, RoomReservationUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomCreateWithoutReservationsInput = {
    id?: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    venue: VenueCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutReservationsInput = {
    id?: bigint | number
    venueId: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutReservationsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
  }

  export type UserCreateWithoutRoomReservationsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramCreateNestedManyWithoutCreatedByInput
    programParticipants?: ProgramParticipantCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoomReservationsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramUncheckedCreateNestedManyWithoutCreatedByInput
    programParticipants?: ProgramParticipantUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoomReservationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomReservationsInput, UserUncheckedCreateWithoutRoomReservationsInput>
  }

  export type SessionCreateWithoutRoomReservationInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    program: ProgramCreateNestedOneWithoutSessionsInput
    participants?: ProgramParticipantCreateNestedManyWithoutSessionInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutRoomReservationInput = {
    id?: bigint | number
    programId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: ProgramParticipantUncheckedCreateNestedManyWithoutSessionInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutRoomReservationInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutRoomReservationInput, SessionUncheckedCreateWithoutRoomReservationInput>
  }

  export type RoomUpsertWithoutReservationsInput = {
    update: XOR<RoomUpdateWithoutReservationsInput, RoomUncheckedUpdateWithoutReservationsInput>
    create: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutReservationsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutReservationsInput, RoomUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomUpdateWithoutReservationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutReservationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    venueId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutRoomReservationsInput = {
    update: XOR<UserUpdateWithoutRoomReservationsInput, UserUncheckedUpdateWithoutRoomReservationsInput>
    create: XOR<UserCreateWithoutRoomReservationsInput, UserUncheckedCreateWithoutRoomReservationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomReservationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomReservationsInput, UserUncheckedUpdateWithoutRoomReservationsInput>
  }

  export type UserUpdateWithoutRoomReservationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUpdateManyWithoutCreatedByNestedInput
    programParticipants?: ProgramParticipantUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomReservationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUncheckedUpdateManyWithoutCreatedByNestedInput
    programParticipants?: ProgramParticipantUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionUpsertWithoutRoomReservationInput = {
    update: XOR<SessionUpdateWithoutRoomReservationInput, SessionUncheckedUpdateWithoutRoomReservationInput>
    create: XOR<SessionCreateWithoutRoomReservationInput, SessionUncheckedCreateWithoutRoomReservationInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutRoomReservationInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutRoomReservationInput, SessionUncheckedUpdateWithoutRoomReservationInput>
  }

  export type SessionUpdateWithoutRoomReservationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutSessionsNestedInput
    participants?: ProgramParticipantUpdateManyWithoutSessionNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutRoomReservationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ProgramParticipantUncheckedUpdateManyWithoutSessionNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateWithoutParticipantsInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    program: ProgramCreateNestedOneWithoutSessionsInput
    roomReservation?: RoomReservationCreateNestedOneWithoutSessionInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutParticipantsInput = {
    id?: bigint | number
    programId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    roomReservationId?: bigint | number | null
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutParticipantsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutParticipantsInput, SessionUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutProgramParticipantsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramCreateNestedManyWithoutCreatedByInput
    roomReservations?: RoomReservationCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProgramParticipantsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramUncheckedCreateNestedManyWithoutCreatedByInput
    roomReservations?: RoomReservationUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AiInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProgramParticipantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgramParticipantsInput, UserUncheckedCreateWithoutProgramParticipantsInput>
  }

  export type SessionUpsertWithoutParticipantsInput = {
    update: XOR<SessionUpdateWithoutParticipantsInput, SessionUncheckedUpdateWithoutParticipantsInput>
    create: XOR<SessionCreateWithoutParticipantsInput, SessionUncheckedCreateWithoutParticipantsInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutParticipantsInput, SessionUncheckedUpdateWithoutParticipantsInput>
  }

  export type SessionUpdateWithoutParticipantsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutSessionsNestedInput
    roomReservation?: RoomReservationUpdateOneWithoutSessionNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutParticipantsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    roomReservationId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type UserUpsertWithoutProgramParticipantsInput = {
    update: XOR<UserUpdateWithoutProgramParticipantsInput, UserUncheckedUpdateWithoutProgramParticipantsInput>
    create: XOR<UserCreateWithoutProgramParticipantsInput, UserUncheckedCreateWithoutProgramParticipantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgramParticipantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgramParticipantsInput, UserUncheckedUpdateWithoutProgramParticipantsInput>
  }

  export type UserUpdateWithoutProgramParticipantsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUpdateManyWithoutCreatedByNestedInput
    roomReservations?: RoomReservationUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProgramParticipantsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUncheckedUpdateManyWithoutCreatedByNestedInput
    roomReservations?: RoomReservationUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAiInteractionsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramCreateNestedManyWithoutCreatedByInput
    roomReservations?: RoomReservationCreateNestedManyWithoutUserInput
    programParticipants?: ProgramParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiInteractionsInput = {
    id?: bigint | number
    email?: string | null
    name?: string | null
    googleSub?: string | null
    lastLoginAt?: Date | string | null
    roleFlags?: number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPrograms?: ProgramUncheckedCreateNestedManyWithoutCreatedByInput
    roomReservations?: RoomReservationUncheckedCreateNestedManyWithoutUserInput
    programParticipants?: ProgramParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
  }

  export type ProgramCreateWithoutAiInteractionsInput = {
    id?: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedProgramsInput
    sessions?: SessionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutAiInteractionsInput = {
    id?: bigint | number
    createdByUserId: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutAiInteractionsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutAiInteractionsInput, ProgramUncheckedCreateWithoutAiInteractionsInput>
  }

  export type SessionCreateWithoutAiInteractionsInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    program: ProgramCreateNestedOneWithoutSessionsInput
    roomReservation?: RoomReservationCreateNestedOneWithoutSessionInput
    participants?: ProgramParticipantCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutAiInteractionsInput = {
    id?: bigint | number
    programId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    roomReservationId?: bigint | number | null
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: ProgramParticipantUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutAiInteractionsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutAiInteractionsInput, SessionUncheckedCreateWithoutAiInteractionsInput>
  }

  export type UserUpsertWithoutAiInteractionsInput = {
    update: XOR<UserUpdateWithoutAiInteractionsInput, UserUncheckedUpdateWithoutAiInteractionsInput>
    create: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiInteractionsInput, UserUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type UserUpdateWithoutAiInteractionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUpdateManyWithoutCreatedByNestedInput
    roomReservations?: RoomReservationUpdateManyWithoutUserNestedInput
    programParticipants?: ProgramParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiInteractionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    googleSub?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleFlags?: IntFieldUpdateOperationsInput | number
    preferences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPrograms?: ProgramUncheckedUpdateManyWithoutCreatedByNestedInput
    roomReservations?: RoomReservationUncheckedUpdateManyWithoutUserNestedInput
    programParticipants?: ProgramParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProgramUpsertWithoutAiInteractionsInput = {
    update: XOR<ProgramUpdateWithoutAiInteractionsInput, ProgramUncheckedUpdateWithoutAiInteractionsInput>
    create: XOR<ProgramCreateWithoutAiInteractionsInput, ProgramUncheckedCreateWithoutAiInteractionsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutAiInteractionsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutAiInteractionsInput, ProgramUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type ProgramUpdateWithoutAiInteractionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedProgramsNestedInput
    sessions?: SessionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutAiInteractionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    createdByUserId?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type SessionUpsertWithoutAiInteractionsInput = {
    update: XOR<SessionUpdateWithoutAiInteractionsInput, SessionUncheckedUpdateWithoutAiInteractionsInput>
    create: XOR<SessionCreateWithoutAiInteractionsInput, SessionUncheckedCreateWithoutAiInteractionsInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutAiInteractionsInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutAiInteractionsInput, SessionUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type SessionUpdateWithoutAiInteractionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutSessionsNestedInput
    roomReservation?: RoomReservationUpdateOneWithoutSessionNestedInput
    participants?: ProgramParticipantUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutAiInteractionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    roomReservationId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ProgramParticipantUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ProgramCreateManyCreatedByInput = {
    id?: bigint | number
    type?: string | null
    title: string
    description?: string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomReservationCreateManyUserInput = {
    id?: bigint | number
    roomId: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramParticipantCreateManyUserInput = {
    id?: bigint | number
    sessionId: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
  }

  export type AiInteractionCreateManyUserInput = {
    id?: bigint | number
    programId?: bigint | number | null
    sessionId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProgramUpdateWithoutCreatedByInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutProgramNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutCreatedByInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutProgramNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateManyWithoutCreatedByInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummaryTags?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomReservationUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutReservationsNestedInput
    session?: SessionUpdateOneWithoutRoomReservationNestedInput
  }

  export type RoomReservationUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roomId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUncheckedUpdateOneWithoutRoomReservationNestedInput
  }

  export type RoomReservationUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    roomId?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramParticipantUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session?: SessionUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ProgramParticipantUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    sessionId?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProgramParticipantUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    sessionId?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiInteractionUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneWithoutAiInteractionsNestedInput
    session?: SessionUpdateOneWithoutAiInteractionsNestedInput
  }

  export type AiInteractionUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    programId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyProgramInput = {
    id?: bigint | number
    startsAt: Date | string
    endsAt: Date | string
    capacity?: number | null
    participantFee?: number | null
    status?: string
    roomReservationId?: bigint | number | null
    locationText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiInteractionCreateManyProgramInput = {
    id?: bigint | number
    userId?: bigint | number | null
    sessionId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutProgramInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomReservation?: RoomReservationUpdateOneWithoutSessionNestedInput
    participants?: ProgramParticipantUpdateManyWithoutSessionNestedInput
    aiInteractions?: AiInteractionUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutProgramInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    roomReservationId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ProgramParticipantUncheckedUpdateManyWithoutSessionNestedInput
    aiInteractions?: AiInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutProgramInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    participantFee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    roomReservationId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    locationText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInteractionUpdateWithoutProgramInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAiInteractionsNestedInput
    session?: SessionUpdateOneWithoutAiInteractionsNestedInput
  }

  export type AiInteractionUncheckedUpdateWithoutProgramInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInteractionUncheckedUpdateManyWithoutProgramInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramParticipantCreateManySessionInput = {
    id?: bigint | number
    userId: bigint | number
    role?: string
    status?: string
    joinedAt?: Date | string | null
  }

  export type AiInteractionCreateManySessionInput = {
    id?: bigint | number
    userId?: bigint | number | null
    programId?: bigint | number | null
    provider: string
    model: string
    kind: string
    promptTokens?: number
    completionTokens?: number
    cost?: Decimal | DecimalJsLike | number | string
    status?: string
    traceId?: string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProgramParticipantUpdateWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProgramParticipantsNestedInput
  }

  export type ProgramParticipantUncheckedUpdateWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProgramParticipantUncheckedUpdateManyWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiInteractionUpdateWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAiInteractionsNestedInput
    program?: ProgramUpdateOneWithoutAiInteractionsNestedInput
  }

  export type AiInteractionUncheckedUpdateWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    programId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInteractionUncheckedUpdateManyWithoutSessionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    programId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    cost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateManyVenueInput = {
    id?: bigint | number
    name: string
    capacity?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateWithoutVenueInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: RoomReservationUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutVenueInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: RoomReservationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutVenueInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomReservationCreateManyRoomInput = {
    id?: bigint | number
    userId?: bigint | number | null
    startsAt: Date | string
    endsAt: Date | string
    purpose?: string | null
    status?: string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: bigint | number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomReservationUpdateWithoutRoomInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRoomReservationsNestedInput
    session?: SessionUpdateOneWithoutRoomReservationNestedInput
  }

  export type RoomReservationUncheckedUpdateWithoutRoomInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUncheckedUpdateOneWithoutRoomReservationNestedInput
  }

  export type RoomReservationUncheckedUpdateManyWithoutRoomInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    meta?: JsonNullValueInput | InputJsonValue
    sessionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProgramCountOutputTypeDefaultArgs instead
     */
    export type ProgramCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProgramCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionCountOutputTypeDefaultArgs instead
     */
    export type SessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VenueCountOutputTypeDefaultArgs instead
     */
    export type VenueCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VenueCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomCountOutputTypeDefaultArgs instead
     */
    export type RoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProgramDefaultArgs instead
     */
    export type ProgramArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProgramDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VenueDefaultArgs instead
     */
    export type VenueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VenueDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomDefaultArgs instead
     */
    export type RoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomReservationDefaultArgs instead
     */
    export type RoomReservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomReservationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProgramParticipantDefaultArgs instead
     */
    export type ProgramParticipantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProgramParticipantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiInteractionDefaultArgs instead
     */
    export type AiInteractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiInteractionDefaultArgs<ExtArgs>

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