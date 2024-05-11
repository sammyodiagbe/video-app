/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.11.3.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as appInternals from "../appInternals.js";
import type * as authmutation from "../authmutation.js";
import type * as messageActions from "../messageActions.js";
import type * as messageQuery from "../messageQuery.js";
import type * as queryActions from "../queryActions.js";
import type * as querySignals from "../querySignals.js";
import type * as signalAction from "../signalAction.js";
import type * as userQuery from "../userQuery.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  appInternals: typeof appInternals;
  authmutation: typeof authmutation;
  messageActions: typeof messageActions;
  messageQuery: typeof messageQuery;
  queryActions: typeof queryActions;
  querySignals: typeof querySignals;
  signalAction: typeof signalAction;
  userQuery: typeof userQuery;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
