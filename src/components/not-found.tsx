import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

const NotFound = () => {
    return (
        <div className="grid place-items-center w-screen h-screen text-center bg-background">
            <div className="flex flex-col space-y-10">
                <h1 className="text-4xl xl:text-9xl font-title">404 - Page Not Found</h1>
                <p className="text-xl sm:text-3xl text-red-500">Oops! It looks like you are lost</p>
                <div className="flex justify-center">
                    <Link to="/">
                        <Button className="bg-blue-500 hover:bg-blue-600 duration-300">
                            <ArrowLeft /> Go back home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
