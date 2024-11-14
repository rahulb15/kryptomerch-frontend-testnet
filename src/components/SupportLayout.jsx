// // components/SupportLayout.js
// import React from 'react';
// import Link from 'next/link';
// import styles from './Support.module.css';

// export const SupportLayout = ({ children }) => (
//   <div className={styles.container}>
//     <header className={styles.header}>
//       <div className={styles.logo}>ME</div>
//       <div className={styles.searchBar}>
//         <input 
//           type="text" 
//           placeholder="Search for articles..."
//           className={styles.searchInput}
//         />
//       </div>
//     </header>
//     <main className={styles.main}>
//       {children}
//     </main>
//   </div>
// );

// // components/CategoryGrid.js
// export const CategoryGrid = ({ categories }) => (
//   <div className={styles.grid}>
//     {categories.map((category) => (
//       <Link 
//         href={`/support/${category.slug}`} 
//         key={category.id}
//         className={styles.card}
//       >
//         <img src={category.icon} alt="" className={styles.icon} />
//         <h3>{category.title}</h3>
//         <p>{category.articleCount} articles</p>
//       </Link>
//     ))}
//   </div>
// );

// // components/SubCategoryView.js
// export const SubCategoryView = ({ category }) => (
//   <div className={styles.subCategoryContainer}>
//     <div className={styles.breadcrumb}>
//       <Link href="/support">All Collections</Link> &gt; {category.title}
//     </div>
//     {category.subCategories?.map((subCategory, index) => (
//       <div key={index} className={styles.section}>
//         <h2>{subCategory.title}</h2>
//         <div className={styles.articleList}>
//           {subCategory.articles.map((article, idx) => (
//             <Link 
//               href={`/support/${category.slug}/${article.slug}`}
//               key={idx}
//               className={styles.articleLink}
//             >
//               {article.title}
//             </Link>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

import React from 'react';
import Link from 'next/link';

export const SupportLayout = ({ children }) => (
  <div className="kryptomerch_container">
    <header className="kryptomerch_header">
      <div className="kryptomerch_logo">
        <span className="kryptomerch_gradientText">KryptoMerch</span>
      </div>
      <div className="kryptomerch_searchBar">
        <input 
          type="text" 
          placeholder="Search for articles..."
          className="kryptomerch_searchInput"
        />
        <span className="kryptomerch_searchIcon">🔍</span>
      </div>
    </header>
    <main className="kryptomerch_main">
      {children}
    </main>
  </div>
);

export const CategoryGrid = ({ categories }) => (
  <div className="kryptomerch_grid">
    {categories.map((category) => (
      <Link 
        href={`/support/${category.slug}`} 
        key={category.id}
        className="kryptomerch_card"
      >
        <div className="kryptomerch_cardContent">
          <div className="kryptomerch_iconWrapper">
            <img src={category.icon} alt="" className="kryptomerch_icon" />
          </div>
          <div className="kryptomerch_cardInfo">
            <h3 className="kryptomerch_cardTitle">
              {category.title}
            </h3>
            <p className="kryptomerch_articleCount">
              {category.articleCount} articles
              <span className="kryptomerch_arrow">→</span>
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export const SubCategoryView = ({ category }) => (
  <div className="kryptomerch_subCategoryContainer">
    <div className="kryptomerch_breadcrumb">
      <Link href="/support">All Collections</Link>
      <span>→</span>
      <span>{category.title}</span>
    </div>
    {category.subCategories?.map((subCategory, index) => (
      <div key={index} className="section">
        <h2 className="kryptomerch_cardTitle">{subCategory.title}</h2>
        <div className="articleList">
          {subCategory.articles.map((article, idx) => (
            <Link 
              href={`/support/${category.slug}/${article.slug}`}
              key={idx}
              className="kryptomerch_articleLink"
            >
              <span>{article.title}</span>
              <span className="kryptomerch_arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SupportLayout;