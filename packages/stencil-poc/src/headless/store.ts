import { createStore } from "@stencil/store";

const { state } = createStore({ response: { results: [] }})

export default state;