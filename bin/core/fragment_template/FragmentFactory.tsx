import * as React from "react";
import * as sgd from "sg.plugin.dashboards";
import * as pkg from "<%=packageFilePath%>";
import { Icon } from "sg.plugin.toolkit"
import { Fragment } from "./Fragment";

function FragmentIcon() {
    return (
        <div style={{ width: "64px", height: "64px" }}>
            <Icon name="puzzle-piece" style={{ width: 64, height: 64, fontSize: "60px" }} color="#ED0f9C" />
        </div>
    )
}

export const <%=factoryName%>: sgd.FragmentFactory = {
    pluginId: pkg.name,
    //Change typeId to some meaningful name.
    //It should be unique within all fragments exposed by this plugn
    typeId: "<%=fragmentId%>",
    //Default name of the fragment which is displayed to the user.
    name: "<%=fragmentName%>",
    //Description of this fragment type. It will be dispalyed in the tooltip.
    description: "Superglue fragment for <%=fragmentName%>",
    //Icon for this fragment in fragment selector. Change icon that suits this fragment factory.
    icon: <FragmentIcon />,
    //default size of the fragment, when it is created (in grid units).
    size: { height: 10, width: 12 },

    //True, if user can maximize instances of this fragment.
    canMaximize: true,
    //True, if fragment header is hidden from the user.
    headerless: false,
    //Style of fragment container, that will be merged with its default style.
    containerStyle: {},

    /**
     * When user clicks in fragment selector, this method is called.
     * @param dashboard instance of dashboard in which this fragment instance will be injected.
     * @param isInEditMode True, if current dashbaord is in edit mode.
     * @param state undefined, if it is a new fragment. If the dashboard is reloaded, it is the last state you saved.
     * @param listener when state changes for this fragment, call listener methods to notify dashboard
     * @returns an instance of @see sgd.Fragment class
     */
    create: (dashboard: sgd.Dashboard, isInEditMode: boolean, state: any, listener: sgd.FragmentStateListener) => {
        return new Fragment();
    }
}