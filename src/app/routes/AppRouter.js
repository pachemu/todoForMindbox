import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Main from "@/pages/Main";
const AppRouter = () => {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsx(Route, { path: '', element: _jsx(Main, {}) }) }) }));
};
export default AppRouter;
