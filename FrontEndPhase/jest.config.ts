
// // /** @type {import('ts-jest').JestConfigWithTsJest} */
// // export default {

// // module.exports = {
// //   preset: "ts-jest",
// //   testEnvironment: "jsdom",
// //   transform: {
// //     ".(ts|tsx|js|jsx)": "babel-jest", // Ensures Babel processes JSX in TypeScript
// //   },
// //   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
// //   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
// // };

// //   coveragePathIgnorePatterns: [
// //     "/node_modules/",
// //     "/coverage",
// //     "package.json",
// //     "package-lock.json",
// //     "reportWebVitals.ts",
// //     "setupTests.ts",
// //     "index.tsx"
// //   ]
// // }



// /** @type {import('ts-jest').JestConfigWithTsJest} */

// module.exports = {

//   preset: "ts-jest",

//   testEnvironment: "jsdom",
//   testMatch: [
//     "**/__tests__/**/*.[jt]s?(x)",
//     "**/?(*.)+(spec|test).[jt]s?(x)"
//   ],
//   transform: {

//     "^.+\\.(ts|tsx|js|jsx)?$": "babel-jest",

//   },

//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Ensure jest.setup.ts exists

//   coveragePathIgnorePatterns: [

//     "/node_modules/",

//     "/coverage/",

//     "package.json",

//     "package-lock.json",

//     "reportWebVitals.ts",

//     "setupTests.ts",

//     "index.tsx"

//   ],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
//   }

// };



// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//       "^.+\\.tsx?$": "ts-jest" 
//   // process `*.tsx` files with `ts-jest`
//   },
//   moduleNameMapper: {
//       '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/test/__mocks__/fileMock.js',
//   },
// }


export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest" // Process `.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/__mocks__/fileMock.js', // Fixed regex and path
  },
};
