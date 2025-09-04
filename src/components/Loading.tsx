export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                <p className="text-white text-sm">Loading....</p>
            </div>
        </div>
    );
}
