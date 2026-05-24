import {
  Authenticated,
  AuthProvider,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/mui";

import dataRestProvider from "@refinedev/simple-rest";


import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";

import { Login } from "./pages/login";
import { dataProvider } from "./providers/data";
import { parseJwt } from "./utils/parse-jwt";
import Title from "./components/header/title";

import TitleBanner from "./components/header/title";

import { ThemedSider as Sider } from "./components/layout/sider";
import AppsIcon from '@mui/icons-material/Apps';
import MessageIcon from '@mui/icons-material/Message';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import {
    AgentPage,
    AgentProfile,
    AllProperties,
    CreateProperties,
    EditProperties,
    HomeAgent,
    PropertiesDetail,
    Reviews,
    Message,
    
    
} from "./pages";
import { Profile } from "./components";



const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
        }),
      });

      const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid: data._id 
          })
        );

        localStorage.setItem("token", `${credential}`);
        }
        
        

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* //<GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataRestProvider("http://localhost:8080/api/v1")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}

                resources={[
                  {
                    
                    name: "Home",
                    list: "/HomeAgent",
                    
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <AppsIcon />,
                    },
                  },
                  {
                    
                    name: "Properties",
                    list: "/Properties",
                    create: "/Properties/create",
                    show: "/Properties/show/:id",
                    edit: "/Properties/edit/:id",
                    // show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <HomeIcon />,
                    },
                  },
                  {
                    
                    name: "Agents",
                    list: "/Agents",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <PeopleAltIcon />,
                    },
                  },
                  {
                    
                    name: "Reviews",
                    list: "/Reviews",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <RateReviewIcon />,
                    },
                  },
                  {
                    
                    name: "Messages",
                    list: "/Messages",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <MessageIcon />,
                    },
                  },
                  {
                    
                    name: "My Profile",
                    list: "/Profile",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <PersonIcon />,
                    },
                  },
                  
                  
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "RDEnN1-rGFo7H-7NZpNw",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout 
                          Header={() => <Header />} 
                          Title={({collapsed}) => <TitleBanner collapsed={collapsed} />}
                          Sider={() => <Sider Title={Title}/>}
                        >
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="Dashboard" />}
                    />
                    <Route path="/HomeAgent">
                      <Route index element={<HomeAgent />} />
                    </Route>
                     <Route path="/Properties">
                      <Route index element={<AllProperties />} />
                      <Route path="create" element={<CreateProperties />} />
                      <Route path="show/:id" element={<PropertiesDetail />} />
                      <Route path="edit/:id" element={<CreateProperties />} />
                    </Route>
                     <Route path="/Agents">
                      <Route index element={<AgentProfile />} />
                    </Route>
                     <Route path="/Reviews">
                      <Route index element={<Reviews />} />
                    </Route>
                     <Route path="/Messages">
                      <Route index element={<Message />} />
                    </Route>
                    <Route path="/Profile">
                      <Route index element={<Profile />} />
                    </Route>
                    
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
