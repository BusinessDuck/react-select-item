const {
    FuseBox,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky,
    QuantumPlugin,
} = require("fuse-box");

const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
// load
const TypeHelper = require('fuse-box-typechecker').TypeHelper;
// Async check (worker)
const testAsync = TypeHelper({
    tsConfig: '../tsconfig.json',
    basePath: './src',
    name: 'Test async'
});
const testExampleAsync = TypeHelper({
    tsConfig: './tsconfig.json',
    basePath: './example',
    name: 'Test async'
});
const {runCLI} = require("jest");

let fuse, app, vendor, isProduction;

Sparky.task("config-dev", () => {
    const dist = isProduction ? "dist" : "example/dist";
    fuse = FuseBox.init({
        // alias: { 'react': 'preact-compact',  'react-dom': 'preact-compact' },
        homeDir: "src",
        tsConfig: "tsconfig.json",
        package: {
            name: 'react-select-item',
            main: 'index.ts'
        },
        globals: { "react-select-item": "*" },
        output: `${dist}/$name.js`,
        sourceMaps: true,
        plugins: [
            [
                SassPlugin(),
                CSSPlugin({
                    group: "styles.css",
                    outFile: `${dist}/styles.css`
                })
            ],
            QuantumPlugin({
                target: 'npm',
                bakeApiIntoBundle : 'react-select-item',
                uglify: false,
                removeExportsInterop: true
            })
        ]
    });

    app = fuse.bundle("react-select-item").instructions("!> [index.ts]");
    testAsync.runAsync();
});

Sparky.task("config-example", () => {
    fuse = FuseBox.init({
        // globals: { "react-select-item": "../dist/react-select-item.js" },
        alias: { 'react-select-item': './dist/react-select-item.js' },
        homeDir: "example",
        tsConfig: "example/tsconfig.json",
        output: "build/$name.js",
        sourceMaps: true,
        useJsNext: ["react", "react-dom"],
        polyfillNonStandardDefaultUsage: ["react", "react-dom"],
        plugins: [
            WebIndexPlugin({
                template: "example/index.html",
                title: "RSI example",
                target: "index.html"
            }),
            CSSPlugin({
                group: "styles.css",
                outFile: "build/styles.css"
            })
        ]
    });

    vendor = fuse.bundle("vendor").instructions("~/example.tsx");
    app = fuse.bundle("app").instructions(" > example.tsx");
    testExampleAsync.runAsync();
});

Sparky.task("check-updates", () => {
    updateNotifier({pkg}).notify();
});

Sparky.task("default", ["clean", "config-dev", "check-updates", "tests"], () => {
    fuse.dev({
        root: "dist",
        port: 8080,
        httpServer: false,
    });
    // add dev instructions
    app.watch().hmr();
    return fuse.run();
});

Sparky.task("example", ["config-example"], () => {
    fuse.dev({
        root: "build"
    });
    // add dev instructions
    app.watch().hmr();
    return fuse.run();
});

Sparky.task("tests:watch", () => {
    runCLI({watchAll: true}, ["src"]);
});

Sparky.task("tests", () => {
    runCLI({}, ["src"]);
});

Sparky.task("clean", () => Sparky.src("dist/").clean("dist/"));

Sparky.task("clean-example", () => Sparky.src("build/").clean("build/"));

Sparky.task("prod-env", ["clean"], () => {
    isProduction = true
});

Sparky.task("dist", ["prod-env", "config-dev"], () => {
    // comment out to prevent dev server from running (left for the demo)
    // fuse.dev({
    //     port: 8080,
    //     httpServer: false,
    // });
    return fuse.run();
});



