export default function Button({ children, onClick }) {
    return <button onClick={onClick} className="m-1 px-2 py-1 text-sm border border-stone-400 hover:underline cursor-pointer">
        {children}
    </button>
}