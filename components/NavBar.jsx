import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const NavBar = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setcategories(result);
    });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8 color">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-black">
              Next Tech
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/categories/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-black ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
