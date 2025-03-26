"use client";
import Cookies from "js-cookie";
import { Heart, ShoppingCart, ShoppingCartIcon } from "lucide-react"; // Agar bu icon'lar ishlatilsa
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineNewspaper } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
export default function Navbar() {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token_access_test");
    if (token !== undefined) {
      setLogin(true);
    }
  }, [router]);
  return (
    <div className="navbar">
      <div className="navbar_row">
        <Link href={"/"} className="navbar_logo">
          <img src="/logo.svg" />
        </Link>
        <div className="navbar_col2">
          <ul>
            <Link href="/news" className="link">
              Новости
            </Link>
            {/* <Link href="/login" className="link">
              Авторизоваться
            </Link> */}
            <div className="icons">
              <Link href={"/save"} className="icon">
                <Image src="heart.svg" alt="like" height={24} width={24} />
              </Link>
            </div>
            {login ? (
              <Link href="/add" className="btn">
                Добавить
              </Link>
            ) : (
              <Link href="/login" className="btn">
                вход
              </Link>
            )}
          </ul>
        </div>

        <div className="navbar_col">
          <Link href="/news" className="link">
            <MdOutlineNewspaper />
          </Link>
          <Link href={"/save"} className="icon">
            <Image src="heart.svg" alt="like" height={20} width={20} />
          </Link>

          {login ? (
            <Link href="/add" className="link">
              <MdAddBusiness />
            </Link>
          ) : (
            <Link href="/login" className="btn">
              <BsPersonBoundingBox />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
