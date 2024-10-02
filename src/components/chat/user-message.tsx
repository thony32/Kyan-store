const UserMessage = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-end pl-4">
            <p className="bubble-user relative bg-purple-600 text-white rounded-lg px-3 py-2 max-w-xs">{message}</p>
        </div>
    )
}

export default UserMessage
