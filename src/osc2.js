/*
Language: ASAM OpenSCENARIO 2.0
Author: Benjamin Engel <benjamin.engel@asam.net>
Description: Language definition for the ASAM OpenSCENARIO 2 DSL. 
Website: asam.net
*/


export default function(hljs) {
  const TEMPORAL_OPERATORS = [
    "serial",
    "parallel",
    "until",
    "wait",
  ];



  const TYPES = [
    "int",
    "uint",
    "float",
    "string",
    "weight",
    "distance",
    "time",
    "current",
    "temperature",
    "substance",
    "luminosity",
    "angle",
    "struct",
    "list",
    "bool",
  ];

  const BUILT_INS = [
    "modifier",
    "extend",
  ];
  const RESERVED_WORDS = [
    "any",
    "cover",
    "do",
    "import",
    "type",
    "event",
    "actor",
    "scenario",
    "emit",
    "is",
    "keep",
    "label",
    "sample",
    "soft",
    "default",
    "struct",
    "when",
    "with",
    "var",
  ];

  const LITERALS = ["true", "false"];

  const KEYWORDS = {
    $pattern: /[a-z]\w+/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES,
    operator: TEMPORAL_OPERATORS,
  };


  const STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ],
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      {
        begin: '\\b(0b[01\']+)'
      },
      {
        begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)'
      },
      {
        begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
      }
    ],
    relevance: 0
  };

  const PARAMS = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true,
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: ["self",  NUMBERS, STRING, hljs.HASH_COMMENT_MODE],
      },
    ],
  };

  return {
    name: "OpenSCENARIO2",
    aliases: ["osc2"],
    keywords: KEYWORDS,
    contains: [
      STRING,
      hljs.HASH_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      PARAMS,
      //OPERATORS,
    ],
  };
}
