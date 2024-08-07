import GeradorUniqueScreen from "../Utils/GeradorUniqueScreen.js";
import Page1Script from "./UniqueScreens/Page1Script.js";
import Page2Script from "./UniqueScreens/Page2Script.js";
import Page3Script from "./UniqueScreens/Page3Script.js";

let _Page1Script = new Page1Script();
let _Page2Script = new Page2Script();
let _Page3Script = new Page3Script();

let uniqueScreen = new GeradorUniqueScreen({
  	idDiv: "UniqueScreenMain",
	screenEvents: [
		{
			screenName: "Page1",
			onEnter: _Page1Script.onEnter,
			onLeave: _Page1Script.onLeave,
			onEntering: _Page1Script.onEntering,
			onLeaving: _Page1Script.onLeaving
		},
		{
			screenName: "Page2",
			onEnter: _Page2Script.onEnter,
			onLeave: _Page2Script.onLeave,
			onEntering: _Page2Script.onEntering,
			onLeaving: _Page2Script.onLeaving
		},
		{
			screenName: "Page3",
			onEnter: _Page3Script.onEnter,
			onLeave: _Page3Script.onLeave,
			onEntering: _Page3Script.onEntering,
			onLeaving: _Page3Script.onLeaving
		},
	]
})
