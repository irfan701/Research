import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <QueryClientProvider client={queryClient}>
        <App/>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
