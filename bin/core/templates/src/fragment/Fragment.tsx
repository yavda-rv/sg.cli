import * as React from "react";
import * as sgd from "sg.plugin.dashboards";
import { FragmentElement } from "./FragmentElement";

/**
 * An implementation of @see sgd.Fragment interface. 
 * This instance becomes main communication link between dashboard and this fragment.
 */
export class Fragment implements sgd.Fragment {

    /**
     * This function returns state of the fragment. 
     * It may be called whenever dashboard state changes.
     * @returns return the current state of the fragment instance.
     */
    public getState(): any {
        return undefined;
    }

    /**
     * This function is called when dashboard has to create UI for this instance.
     * It should return a React Element which should not change during the life-time of dashboard.
     * @returns react element which must be displayed in the fragment instance.
     */
    public getElement(): JSX.Element {
        return <FragmentElement />
    }

    /**
     * called when dashboard enters in edit mode. 
     * You may be allowing user to interact with the fragment in such a way, it mutates state of fragment.
     */
    public enterEditMode(): void { }


    /**
     * called when dashboard enters in edit mode. 
     * You may be dis-allowing user to not change the state of the fragment.
     */
    public exitEditMode(): void { }

    /**
     * called when the fragment is maximized by user.
     */
    public enterMaximizeMode(): void { }

    /**
     * called when the fragment is minimized by user.
     */
    public exitManimizeMode(): void { }

    /**
    * called when the fragment has focus with-in.
    */
    public enterFocus(): void { }

    /**
    * called when the fragment lost focus.
    */
    public exitFocus(): void { }

    /**
    * When the fragment is removed from the screen, this method is called.
    */
    public destroy(): Promise<void> {
        return Promise.resolve();
    }
}