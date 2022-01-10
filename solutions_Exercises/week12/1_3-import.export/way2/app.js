//?What is the difference between import and require?
//!REQUIRE
//Require is Non-lexical, it stays where they have put the file.
//It can be called at any time and place in the program
//You can directly run the code with require statement
//If you want to use require module then you have to save file with ‘.js’ extension.
//!ES6 IMPORT AND EXPORT
//Import is lexical, it gets sorted to the top of the file.
//It can’t be called conditionally, it always run in the beginning of the file.
//	To run a program containing import statement you have to use experimental module feature flag.
//If you want to use import module then you have to save file with ‘.mjs’ extension.

//?How can you enable using the import syntax using node js
//It's very simple in Node.js 13 and above. You need to either:
//!Save the file with .mjs extension, or
//!Add { "type": "module" } in the nearest package.json.
//You only need to do one of the above to be able to use ECMAScript modules.

//?Give 2 node.js environment variables that are not available when using the import syntax.
//These CommonJS variables are not available in ES modules.
//__filename and __dirname use cases can be replicated via import.meta.url.

const { func1, func2, func3 } = require("./new.js");
func1();
func2();
func3();
