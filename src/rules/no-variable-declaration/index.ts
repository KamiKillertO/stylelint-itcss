import { utils } from "stylelint";
import { isIgnoredLayer } from "../../utils/validate-layer";

export const ruleName = "itcss/no-variable-declaration";

export const messages = utils.ruleMessages(ruleName, {
  expected: `Creation of a variable is forbidden in this layers`,
});

interface RuleOption {
  ignoreLayers?: string[];
  ignoreVariables?: string[];
}

function check(node) {
  return node.prop.slice(0, 2) === "--" || node.prop.slice(0, 1) === "$" || node.prop.slice(0, 1) === "@";
}

function checkIgnoredVariables(variable, ignoreVariables) {
  return ignoreVariables.indexOf(variable) !== -1;
}

function rule(enable, options: RuleOption = {}) {
  return (root, result) => {
    if (enable === false || isIgnoredLayer(options.ignoreLayers, result.opts.from)) {
      return;
    }

    root.walk(node => {
      const isDeclaration = node.type === "decl";
      if (!isDeclaration) {
        return;
      }
      const isVariableDeclaration = check(node);
      const isIgnoredVariable = checkIgnoredVariables(node.prop, options.ignoreVariables);
      if (isVariableDeclaration === true && isIgnoredVariable === false) {
        utils.report({
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