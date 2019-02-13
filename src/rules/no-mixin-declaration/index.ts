import { utils } from "stylelint";
import { isIgnoredLayer } from "../../utils/validate-layer";

export const ruleName: string = "itcss/no-mixin-declaration";

export const messages = utils.ruleMessages(ruleName, {
  expected: `Definition of mixins is forbidden in this layers`,
});

interface RuleOption {
  ignoreLayers?: string[];
}

function rule(enable, options: RuleOption = {}) {
  return (root, result) => {
    if (enable === false || isIgnoredLayer(options.ignoreLayers, result.opts.from)) {
      return;
    }
    root.walk(node => {
      const isMixin: boolean = node.type === "atrule" && node.name === "mixin";
      if (isMixin === true) {
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