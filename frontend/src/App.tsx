import "./App.css";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginType } from "module/login";
import { authController } from "controller/index";
import "bootstrap/dist/css/bootstrap.min.css";

import Body from "pages/body/Index";
import Login from "pages/login/Index";
import Header from "pages/header/Index";

export const CedcAuthContext = createContext<LoginType>({
  adminId: "init",
  password: "init",
});

export const SetIsAuthenticatedContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

function App() {
  const [cedcAuth, setCedcAuth] = useState<LoginType>({
    adminId: "init",
    password: "init",
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isSerialSupported, setIsSerialSupported] = useState<boolean>(false);

  useEffect(() => {
    if ("serial" in navigator) {
      setIsSerialSupported(true);
    } else {
      setIsSerialSupported(false);
      alert("이 페이지는 Chrome 브라우저에서만 사용 가능합니다.");
    }

    const func = async () => {
      const isAuthenticated = await authController.isAuthenticated(cedcAuth);
      if (!isAuthenticated) {
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);
    };
    func();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSerialSupported) {
    return (
      <div className="App d-flex align-items-center justify-content-center">
        <h1>이 페이지는 Chrome 브라우저 전용입니다.</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <SetIsAuthenticatedContext.Provider value={setIsAuthenticated}>
        <CedcAuthContext.Provider value={cedcAuth}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <>
                      <Header />
                      <Body />
                    </>
                  ) : (
                    <Login redirectUrl="/" setCedcAuth={setCedcAuth} />
                  )
                }
              ></Route>
              <Route
                path="/login"
                element={<Login redirectUrl="/" setCedcAuth={setCedcAuth} />}
              ></Route>
            </Routes>
          </BrowserRouter>
        </CedcAuthContext.Provider>
      </SetIsAuthenticatedContext.Provider>
    </div>
  );
}

export default App;
