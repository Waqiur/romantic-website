import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./hooks/use-theme.tsx";
import { NavigationProvider } from "./hooks/use-navigation";
import { Suspense, lazy } from "react";

// Lazy loaded components
const Home = lazy(() => import("@/pages/Home"));
const WebProjects = lazy(() => import("@/pages/WebProjects"));
const AppProjects = lazy(() => import("@/pages/AppProjects"));
const WebProjectDetail = lazy(() => import("@/pages/WebProjectDetail"));
const AppProjectDetail = lazy(() => import("@/pages/AppProjectDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
const LoadingFallback = () => (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fadeIn">
        <div className="w-20 h-1 bg-indigo-500/30 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-loadingBar"></div>
        </div>
    </div>
);

function Router() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/web-projects" component={WebProjects} />
                <Route path="/app-projects" component={AppProjects} />
                <Route path="/web-project/:id" component={WebProjectDetail} />
                <Route path="/app-project/:id" component={AppProjectDetail} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <NavigationProvider>
                    <Router />
                    <Toaster />
                </NavigationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
