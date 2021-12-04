import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../../services";

const NewNavBar = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setcategories(result);
    });
  }, []);
  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 border-b border-gray-200 mb-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link href="/">
              <span className="cursor-pointer font-bold text-4xl text-black">
                Next Tech
              </span>
            </Link>
          </div>

          <div>
            <div className=" space-x-4 text-gray-900 hidden md:contents">
              {categories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}>
                  <span className="md:float-right mt-2 align-middle text-black ml-4 font-semibold cursor-pointer">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NewNavBar;
