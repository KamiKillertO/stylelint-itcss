import * as path from "path";
import { utils } from "stylelint";
// import isStandardSyntaxRule from "stylelint/lib/utils/isStandardSyntaxRule";

export const ruleName = "itcss/no-at-important";

export const messages = utils.ruleMessages(ruleName, {
  expected: `Use of "!important" is forbidden in this layers`,

});

interface RuleOption {
  ignoreLayers?: string[];
}

function check(node) {
  if (node.type !== "rule") {
    return true;
  }

  return node.nodes.some(
    o => o.type === "decl" && o.important === true
  );
}

function rule(enable, options: RuleOption = {}) {
  return (root, result) => {
    // const validOptions = utils.validateOptions(result, ruleName, { enable }); // 🤷‍♂️
    if (enable === false) {
      return;
    }

    const filePath: path.ParsedPath = path.parse(result.opts.from || "");
    options.ignoreLayers = options.ignoreLayers || []; // no default
    let isIgnoredLayer = false;
    isIgnoredLayer = options.ignoreLayers.some(layer => {
      let test = filePath.dir.split(path.sep).indexOf(layer) !== -1;
      if (test === false) {
        test = filePath.name.match(layer) !== null;
      }
      return test;
    });

    if (isIgnoredLayer) {
      return;
    }

    root.walk(node => {
      let selector = node.selector;
      // if (node.type === "rule") {
        // if (!isStandardSyntaxRule(node)) {
        //   return;
        // }
        // selector = node.selector;
      // } // else if (node.type === "atrule" && node.name.toLowerCase() === "page" && node.params) {
      //   selector = node.params;
      // }

      if (!selector) {
        return;
      }
      const containAtImportant = check(node);
      if (containAtImportant === true) {
        utils.report({
          index: node.lastEach,
          message: messages.expected,
          node,
          ruleName,
          result
        });
      }
    });

  };
}

export default rule;