import Category from "../components/Category";
import { useAnonimAxios } from "../utils/useAxios";
import { useEffect, useState } from "react";

const HomePage = () => {
  let anonimApi = useAnonimAxios();
  let [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    anonimApi.get("/api/category/").then((res) => {
      setCategoryData(res.data);
    });
  }, []);

  const data = {
    categories: [
      {
        id: 1,
        categoryTitle: "Nesne Yönelimli Programlama | OOP",
        topics: [
          {
            id: 10,
            title: "staticmethod nasıl kullanılıyor",
            author: "ÖmerFİ",
          },
          {
            id: 20,
            title: "Metaclasslar nasıl çalışır",
            // title: "RSA nasıl çözülmez",
            // title: "HAWALII şey",
            // title: "Nasıl efsane bug bulunur",
            author: "İreem",
          },
          {
            id: 30,
            title: "OOP Giriş Eğitimi Verilir!",
            author: "Southrain",
          },
          {
            id: 40,
            title: "Modül importları nasıl çalışır",
            author: "Salzek",
          },
          {
            id: 50,
            title: "Kendi Kütüphanemi Nasıl Yayınlayabilirim?",
            author: "Z3k",
          },
          {
            id: 60,
            title: "Python ile alakalı bir işe girmek için oop gerekli mi",
            author: "ManjarGonur",
          },
        ],
      },
      {
        id: 2,
        categoryTitle: "Fonksiyonlar | Functions",
        topics: [
          {
            id: 100,
            title: "Fonksiyonlara giriş eğitimi",
            author: "Fexa",
          },
          {
            id: 200,
            title: "Recursive fonksiyonlar",
            author: "Melih",
          },
          {
            id: 300,
            title: "Kütüphaneler nasıl çalışıyor",
            author: "Alp1903",
          },
        ],
      },
      {
        id: 3,
        categoryTitle: "Döngüler | Loops",
        topics: [
          {
            id: 1000,
            title: "Döngüler nasıl çalışır",
            author: "Janis",
          },
          {
            id: 2000,
            title: "For ile While döngüsünün farkı",
            author: "Kadir",
          },
          {
            id: 3000,
            title: "Range fonksiyonu nasıl kullanılır",
            author: "Ezel",
          },
        ],
      },
    ],
  };

  return (
    <main>
      <div className="categories">
        <div className="container">
          {categoryData.map((category) => (
            <Category categoryData={category} key={category.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
