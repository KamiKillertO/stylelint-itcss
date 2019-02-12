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
  const warnings: any[] = output.results[0].warnings;
  t.is(warnings.length, 3);

  t.is(warnings[0].line, 2);
  t.is(warnings[0].column, 3); // should the position of !important

  t.is(warnings[1].line, 5);
  t.is(warnings[1].column, 3); // should the position of !important

  t.is(warnings[2].line, 8);
  t.is(warnings[2].column, 3); // should the position of !important
});