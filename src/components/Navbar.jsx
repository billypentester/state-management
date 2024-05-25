import Link from "next/link"

export default function Navbar() {
    return (
        <div className="navbar my-3">
            <div className="flex flex-1 justify-center gap-3">
                <div className="bg-base-200 px-5 rounded-full">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <li>
                            <Link href="/category">Category</Link>
                        </li>
                        <li>
                            <Link href="/items">Items</Link>
                        </li>
                        <li>
                            <Link href="/menu">Menu</Link>
                        </li>
                    </ul>
                </div>
                <div className="bg-base-200 px-5 rounded-full">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <li>
                            <Link href="/cart">
                                Cart
                            </Link>
                        </li>
                    </ul>
                </div>
            </div> 
        </div>
    )
}