import { /*messages,*/ ruleName /*, syntax*/} from "../index";
import test from "ava";
import * as stylelint from "stylelint";

function ruleConfig(config: any[] = [true]) {
  return {
    plugins: ["./dist/src"],
    rules: {
      [ruleName]: config,
    }
  };
}

test.serial(`${ruleName} - inline code - OK`, async t => {
  const options = {
    code: `
      .foo {
        color: red;
      }
    `,
    config: ruleConfig()
  };
  const output = await stylelint.lint(options);
  t.falsy(output.errored);
});

test.serial(`${ruleName} - inline code - KO`, async t => {
  const options = {
    code: `
      @mixin textRed {
        color: red;
      }
    `,
    config: ruleConfig(),
  };
  const output = await stylelint.lint(options);
  t.true(output.errored);
});

test.serial(`${ruleName} - layers options - ok`, async t => {
  const options = {
    files: ["**/no-mixin-declaration/__tests__/fixtures/_layer.style.scss"],
    config: ruleConfig([true, { ignoreLayers: ["layer"] }]),
  };

  const output = await stylelint.lint(options);
  t.false(output.errored);
});

test.serial(`${ruleName} - layers options - ko`, async t => {
  const options = {
    files: ["**/no-mixin-declaration/__tests__/fixtures/style.*"],
    config: ruleConfig([true, { ignoreLayers: ["layer"] }]),
  };
  const output = await stylelint.lint(options);
  t.true(output.errored);
});