import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor, store} from "./app/store/store.ts";
import TodoList from "./widgets/TodoList.tsx";
import Footer from "./widgets/Footer/Footer.tsx";
import {createRoot} from "react-dom/client";
const root = createRoot(document.getElementById('root')!);

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div style={{ padding: 24 }}>
                <TodoList />
                <Footer />
            </div>
        </PersistGate>
    </Provider>
);

root.render(<App />);