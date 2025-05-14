const Navbar = () => {
    return (
        <nav className="bg-[#051923] px-4 py-4 shadow-md">
            <div className="flex items-center justify-center gap-2">
                <img
                    src="/src/assets/trapurl-logo.png"
                    alt="site logo"
                    className="size-9"
                />
                <h1 className="text-white text-2xl font-bold">
                    TRAP<span className="text-[#56cbf9]">U</span>RL
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
