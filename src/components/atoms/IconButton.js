export default function IconButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600 fixed bottom-6 right-6"
    >
      {children}
    </button>
  );
}
