import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactLenis from 'lenis/react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import ErrorFallback from './components/errors/error-boundary'
import { routeTree } from './routeTree.gen'
import { queryConfig } from './libs/react-query'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient({
    defaultOptions: queryConfig
})

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    <ReactLenis root>
                        <HelmetProvider>
                            <RouterProvider router={router} />
                        </HelmetProvider>
                    </ReactLenis>
                </QueryClientProvider>
            </ErrorBoundary>
        </StrictMode>
    )
}
