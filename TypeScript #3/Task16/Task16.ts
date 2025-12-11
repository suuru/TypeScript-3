/**
 * ============================================================
 *        TSConfig Concepts — Single-Page Explanation
 * ============================================================
 * This file explains the major parts of tsconfig.json using
 * comments only (no actual runtime code).
 * Copy/paste into your project as a reference.
 */

/* ------------------------------------------------------------
   1. Core Fields in tsconfig.json
------------------------------------------------------------ */

/**
 * "compilerOptions":
 * - The main settings that control how TypeScript compiles code.
 * - Includes options for target JS version, module system,
 *   output directories, strict mode, path aliases, etc.
 *
 * Example:
 * {
 *   "compilerOptions": {
 *     "target": "ES2020",
 *     "strict": true,
 *     "outDir": "./dist"
 *   }
 * }
 */

/**
 * "include":
 * - Tells TypeScript which files/folders should be included.
 *
 * Example:
 * { "include": ["src"] }
 */

/**
 * "exclude":
 * - Files/folders to skip when compiling.
 *
 * Example:
 * { "exclude": ["node_modules", "dist"] }
 */

/**
 * "files":
 * - Explicitly lists files to compile. Rarely used unless needed.
 *
 * Example:
 * { "files": ["src/index.ts", "global.d.ts"] }
 */


/* ------------------------------------------------------------
   2. Important Compiler Options
------------------------------------------------------------ */

/**
 * "target":
 * - Defines which version of JavaScript TS will output.
 * - Common values: "ES5", "ES6", "ES2015", "ES2020", "ESNext".
 *
 * "ESNext" = latest JS features.
 */

/**
 * "module":
 * - Configures the module system used in the output.
 * - Common values: "commonjs" (Node), "esnext" (modern bundlers).
 */

/**
 * "moduleResolution":
 * - Controls how import paths are resolved.
 * - Common values: "node" (default), "bundler", "classic".
 */

/**
 * "baseUrl":
 * - Sets the root folder for non-relative imports.
 *
 * Example:
 * { "baseUrl": "./src" }
 * import utils from "utils/helpers";
 */

/**
 * "paths":
 * - Defines custom path aliases.
 *
 * Example:
 * {
 *   "compilerOptions": {
 *     "baseUrl": "./src",
 *     "paths": {
 *       "@utils/*": ["utils/*"],
 *       "@components/*": ["components/*"]
 *     }
 *   }
 * }
 */

/**
 * "esModuleInterop":
 * - Allows default import syntax for CommonJS modules.
 *
 * import express from "express";  // works when enabled
 */

/**
 * "allowSyntheticDefaultImports":
 * - Similar to esModuleInterop, but only affects type checking.
 */


/**
 * "noEmit":
 * - Prevents TypeScript from generating JS output.
 * - Useful when a bundler (Vite/Webpack) handles the build.
 */

/**
 * "outDir":
 * - Folder where compiled JS goes.
 *
 * Example: "outDir": "./dist"
 */

/**
 * "rootDir":
 * - Indicates the root folder for TS source files.
 * - Helps keep the folder structure organized in output.
 */


/* ------------------------------------------------------------
   3. Strict Mode
------------------------------------------------------------ */

/**
 * "strict": true
 * - Enables all strict type-checking rules.
 * - The highest level of type safety.
 *
 * It turns on:
 *
 * ✔ strictNullChecks  
 *   Must explicitly handle null/undefined.
 *
 * ✔ noImplicitAny  
 *   TS warns when it can't infer a type.
 *
 * ✔ strictBindCallApply  
 *   Better checking for bind(), call(), apply().
 *
 * ✔ strictFunctionTypes  
 *   More accurate function type checking.
 *
 * ✔ alwaysStrict  
 *   Adds "use strict" in JS output.
 *
 * ✔ strictPropertyInitialization  
 *   Class properties must be initialized safely.
 */


/* ------------------------------------------------------------
   Example tsconfig.json (clean modern setup)
------------------------------------------------------------ */

/**
 * {
 *   "compilerOptions": {
 *     "target": "ES2020",
 *     "module": "esnext",
 *     "moduleResolution": "node",
 *     "strict": true,
 *     "esModuleInterop": true,
 *
 *     "baseUrl": "./src",
 *     "paths": {
 *       "@utils/*": ["utils/*"],
 *       "@components/*": ["components/*"]
 *     },
 *
 *     "outDir": "./dist",
 *     "rootDir": "./src",
 *     "noEmit": false
 *   },
 *
 *   "include": ["src"],
 *   "exclude": ["node_modules", "dist"]
 * }
 */


/* ------------------------------------------------------------
   End of tsconfig.json Concepts Reference
------------------------------------------------------------ */
