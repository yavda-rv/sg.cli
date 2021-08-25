import * as React from "react"
import * as sg from "sg.shell"
import * as pkg from "../package.json";
import * as sgd from "sg.plugin.dashboards";
import { fragmentFactory } from "./fragment/FragmentFactory";

sg.shell.registerPlugin({
    author: pkg.author,
    description: pkg.description,
    license: pkg.license,
    name: pkg.name,
    version: pkg.version
})((plugin: sg.Plugin) => {
    //Plugin initialization code here...
    sgd.fragmentService().register(fragmentFactory);
});