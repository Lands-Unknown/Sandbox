import {resolve} from "path";

import * as TJS from "typescript-json-schema";
import path from "path";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
};

// optionally pass a base path
const basePath = "./";

const program = TJS.getProgramFromFiles(
    [
        resolve("src/config/DungeonConfig.ts"),
        resolve("src/config/EnemyConfig.ts"),
        resolve("src/config/EnemyId.ts"),
    ],
    compilerOptions,
    basePath
);

[
    {name: "DungeonConfig", out: "dungeon"},
    {name: "EnemyConfig", out: "enemy"},
    {name: "EnemyId", out: "enemyId"},
].forEach(data => {
    const schema = TJS.generateSchema(program, data.name, settings);
    console.log(JSON.stringify(schema));
    const outputFile = `./schema/${data.out}.schema.json`;


    // Write to file
    const fs = require("fs");
    fs.mkdir(path.dirname(outputFile), {recursive: true}, function (mkErr: Error) {
        if (mkErr) {
            throw new Error("Unable to create parent directory for output file: " + mkErr.message);
        }
        fs.writeFile(outputFile, JSON.stringify(schema), function (wrErr: Error) {
            if (wrErr) {
                throw new Error("Unable to write output file: " + wrErr.message);
            }
        });
    });
})
