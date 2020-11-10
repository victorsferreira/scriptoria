scpt -t ./_docker/Dockerfile.template -d ./_docker/Dockerfile.data.js -o ./_docker/Dockerfile

### Command
```
    scpt [options]
```

or

```
    scriptoria [options]
```

### Options

- t, template: the template in `Handlebars` syntax you want to compile from. This must be a valid path in the file system to the template file.

- d, data: the the data you are going to pass to the template. It could be either the json string, the path to a javascript file that exports the data object, or the path to a json file containing the data

- o, output: the destination file path. This must be a valid path in the file system to the template file.

Examples:

```
scpt -t ./_docker/Dockerfile.template -d ./_docker/Dockerfile.data.js -o ./_docker/Dockerfile
```

```
scpt -template ./_docker/Dockerfile.template -d ./_docker/Dockerfile.data.json -o ./_docker/Dockerfile
```

```
scpt -template ./_docker/Dockerfile.template -d "{\"expose\": 3000}" -o ./_docker/Dockerfile
```