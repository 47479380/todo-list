import { render } from 'preact'
import { App } from './app'
import './index.css'
import {store} from "./state";
import {StoreContext} from "storeon/preact";
const {Provider:StoreContextProvider}=StoreContext

render( <StoreContextProvider value={store}><App/></StoreContextProvider>, document.body)
