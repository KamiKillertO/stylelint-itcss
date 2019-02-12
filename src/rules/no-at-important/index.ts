import { utils } from "stylelint";
import { isIgnoredLayer } from "../../utils/validate-layer";
// import isStandardSyntaxRule from "stylelint/lib/utils/isStandardSyntaxRule";

export const ruleName = "itcss/no-at-important";

export const messages = utils.ruleMessages(ruleName, {
  expected: `Use of "!important" is forbidden in this layers`,

});

interface RuleOption {
  ignoreLayers?: string[];
}

function findAtImportant(node): any[] | null {
  if (node.type !== "rule") {
    return null;
  }

  return node.nodes.filter(
    o => o.type === "decl" && o.important === true
  );
}

function rule(enable, options: RuleOption = {}) {
  return (root, result) => {
    // const validOptions = utils.validateOptions(result, ruleName, { enable }); // 🤷‍♂️
    if (enable === false || isIgnoredLayer(options.ignoreLayers, result.opts.from)) {
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
      const atImportantProperties: any[] | null = findAtImportant(node);
      if (atImportantProperties !== null) {
        atImportantProperties.forEach(property => {
          utils.report({
            // index: node.lastEach,
            message: messages.expected,
            node: property,
            ruleName,
            result
          });
        });
      }
    });

  };
}

export default rule;