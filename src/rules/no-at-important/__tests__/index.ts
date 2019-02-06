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
    code: "a{color:blue}",
    config: ruleConfig()
    // syntax: syntax,
  };
  const output = await stylelint.lint(options);
  t.falsy(output.errored);
});

test.serial(`${ruleName} - inline code - KO`, async t => {

  const options = {
    code: "a{color:blue!important}",
    config: ruleConfig(),
    // syntax: syntax,
  };
  const output = await stylelint.lint(options);
  t.true(output.errored);
});

test.serial(`${ruleName} - layers options - ok`, async t => {

  const options = {
    files: ["**/no-at-important/__tests__/fixtures/_layer.style.css"],
    config: ruleConfig([true, { ignoreLayers: ["layer"] }]),
    // syntax: syntax,
  };
  const output = await stylelint.lint(options);
  t.false(output.errored);
});

test.serial(`${ruleName} - layers options - ko`, async t => {

  const options = {
    files: ["**/no-at-important/__tests__/fixtures/style.css"],
    config: ruleConfig([true, { ignoreLayers: ["layer"] }]),
    // syntax: syntax,
  };
  const output = await stylelint.lint(options);
  t.true(output.errored);
});