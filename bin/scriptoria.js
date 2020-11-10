#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Handlebars = require("handlebars");

const yargs = require('yargs/yargs');

const argv = yargs(process.argv).argv
const args = {
    data: argv.d || argv.data,
    template: argv.t || argv.template,
    output: argv.o || argv.output,
};

const data = getData(args.data);
const template = getTemplate(args.template);
const outputPath = getFilePath(args.output);

try {
    compileToFile(template, data, outputPath);
} catch (err) {
    console.log(`Scriptoria: there was an error to compile your file ${outputPath}`, err);
    process.exit();
}

function isJson(input) {
    try {
        JSON.parse(input);
        return true;
    } catch (err) {
        return false;
    }
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

function getData(input) {
    if (isJson(input)) {
        return JSON.parse(input);
    } else {
        const filePath = getFilePath(input);

        if (!fileExists(filePath)) {
            throw new Error(`Scriptoria: cannot open file ${filePath}`);
        }

        return require(filePath);
    }
}

function getTemplate(input) {
    const filePath = getFilePath(input);

    if (!fileExists(filePath)) {
        throw new Error(`Scriptoria: cannot open file ${filePath}`);
    }

    return fs.readFileSync(input, 'utf8')
}

function compileToFile(template, data, outputPath) {
    const compiler = Handlebars.compile(template);
    const content = compiler(data);

    console.log('Scriptoria: generated file', content);

    fs.writeFileSync(outputPath, content, 'utf8');
}

function getFilePath(input) {
    return path.join(
        process.cwd(),
        input
    );
}