const {
    FuseBox,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky,
    QuantumPlugin,
    CSSResourcePlugin,
} = require("fuse-box");

const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
// load
const TypeHelper = require('fuse-box-typechecker').TypeHelper;
// Async check (worker)
const testAsync = TypeHelper({
    tsConfig: 'tsconfig.json',
    basePath:'./src',
    name: 'Test async'
});
const { runCLI } = require("jest");

let fuse, app, vendor, isProduction;

Sparky.task("config-dev", () => {
    fuse = FuseBox.init({
        homeDir: "src",
        tsConfig: "src/tsconfig.json",
        output: "dist/$name.js",
        package: {
            name: 'react-select-item',
            main: 'src/index.ts'
        },
        globals: { "react-select-item": "*" },
        // globals: { default: "react-select-item" },
        sourceMaps: true,
        plugins: [
            [
                SassPlugin(),
                CSSResourcePlugin({
                    dist: 'dist/assets',
                    resolve: (f) => `/assets/${f}`
                }),
                CSSPlugin()
            ],
            isProduction && QuantumPlugin({
                target: 'npm',
                bakeApiIntoBundle : 'react-select-item',
                uglify: false,
            })
        ]
    });

    app = fuse.bundle("react-select-item").instructions("> index.ts");
    testAsync.runAsync();
});

Sparky.task("config-example", () => {
    fuse = FuseBox.init({
        homeDir: "example",
        tsConfig: "example/tsconfig.json",
        output: "build/$name.js",
        sourceMaps: true,
        useJsNext : ["react", "react-dom"],
        polyfillNonStandardDefaultUsage : ["react", "react-dom"],
        plugins: [
            WebIndexPlugin({
                template: "example/index.html",
                title: "RSI example",
                target: "index.html"
            })
        ]
    });

    vendor = fuse.bundle("vendor").instructions("~/example.tsx");
    app = fuse.bundle("app").instructions(" > example.tsx");
    testAsync.runAsync();
});

Sparky.task("check-updates", () => {
    updateNotifier({pkg}).notify();
});

Sparky.task("default", ["clean", "config-dev", "check-updates", "tests"], () => {
    fuse.dev({
        root: "dist"
    });
    // add dev instructions
    app.watch().hmr();
    return fuse.run();
});

Sparky.task("example", ["clean-example", "config-example"], () => {
    fuse.dev({
        root: "build"
    });
    // add dev instructions
    app.watch().hmr();
    return fuse.run();
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
    // fuse.dev();
    return fuse.run();
});



