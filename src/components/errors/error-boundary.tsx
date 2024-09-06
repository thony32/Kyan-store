import { Button } from '../ui/button'

const ErrorFallback = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen text-red-500" role="alert">
            <h2 className="text-lg font-semibold">Oops, something went wrong :( </h2>
            <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </Button>
        </div>
    )
}

export default ErrorFallback
