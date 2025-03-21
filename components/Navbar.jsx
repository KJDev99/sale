"use client";
import { Heart, ShoppingCart, ShoppingCartIcon } from "lucide-react"; // Agar bu icon'lar ishlatilsa
import Link from "next/link";
import { BsPersonBoundingBox } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineNewspaper } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_row">
        <div className="navbar_logo">
          <img src="/logo2.png" />
        </div>
        <div className="navbar_col2">
          <ul>
            <Link href="/add" className="link">
              Регистрация
            </Link>
            <Link href="/news" className="link">
              Новости
            </Link>
            <Link href="/login" className="link">
              Авторизоваться
            </Link>
            <div className="icons">
              <Link href={"/save"} className="icon">
                <SlBasket />
              </Link>
            </div>
            <Link href="/login" className="btn">
              + Добавить
            </Link>
          </ul>
        </div>

        <div className="navbar_col">
          <Link href="/add" className="link">
            <BsPersonBoundingBox />
          </Link>
          <Link href="/news" className="link">
            <MdOutlineNewspaper />
          </Link>
          <div className="icons">
            <Link href={"/save"} className="icon">
              <ShoppingCartIcon />
            </Link>
          </div>
          <Link href="/login" className="btn">
            <MdAddBusiness />
          </Link>
        </div>
      </div>
    </div>
  );
}
