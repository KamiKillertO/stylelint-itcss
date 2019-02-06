import * as path from "path";

export function isIgnoredLayer(ignoredLayer: string[] = [], filePath: string = "") {
  const file: path.ParsedPath = path.parse(filePath || "");
  return ignoredLayer.some(layer => {
    let test = file.dir.split(path.sep).indexOf(layer) !== -1;
    if (test === false) {
      test = file.name.match(layer) !== null;
    }
    return test;
  });
}