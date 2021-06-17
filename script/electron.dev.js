import { spawn, exec } from 'child_process';
import waiton from 'wait-on';
import ora from 'ora';
import chalk from 'chalk';
import { watch, rollup } from 'rollup';
import minimist from 'minimist';
import { config } from 'dotenv'
import rollupOptions from './rollup.config.js';

config()
const argv = minimist(process.argv.slice(2));
const spinner = ora("start building");
console.log(argv, process.env.PORT)
if (argv.watch) {
    console.log(22222)
    waiton({
        resources: [`tcp:${process.env.PORT}`]
    }).then(() => {
        console.log(11111)
        const watcher = watch(rollupOptions);
        let child;
        watcher.on("change", file => {
            console.log(chalk.green(`building---${file}`));
        });
        watcher.on("event", e => {
            if (e.code === "END") {
                if (child)
                    child.kill();
                child = exec("electron .");
                child.stderr.on("data", data => {
                    console.err(data)
                })
            }
            else if (e.code === "ERROR") {
                console.error(e.error);
            }
        });
    });
}
else {
    spinner.start();
    rollup(rollupOptions).then(build => {
        spinner.stop();
        console.log(chalk.green("build successed"));
        build.write(rollupOptions.output);
    }).catch(err => {
        spinner.stop();
        console.error("build failed \n", chalk.red(err));
    });
}
