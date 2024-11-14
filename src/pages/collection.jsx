// import SEO from "@components/seo";
// import Wrapper from "@layout/wrapper";
// import Header from "@layout/header/header-01";
// import Footer from "@layout/footer/footer-main";
// import Breadcrumb from "@components/breadcrumb";
// import CollectionArea from "@containers/collection/layout-03";
// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// // demo data
// import collectionsData from "../data/collections.json";

// export async function getStaticProps() {
//     return { props: { className: "template-color-1" } };
// }



// // import React, { useState, useEffect } from 'react';
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// // Sample NFT collection data
// const sampleCollection = [
//   { id: 1, attributes: { background: 'red', eyes: 'blue', mouth: 'smile', hat: 'cowboy' } },
//   { id: 2, attributes: { background: 'blue', eyes: 'green', mouth: 'frown', hat: 'beanie' } },
//   { id: 3, attributes: { background: 'green', eyes: 'brown', mouth: 'open', hat: 'cap' } },
//   { id: 4, attributes: { background: 'yellow', eyes: 'blue', mouth: 'smile', hat: 'cowboy' } },
//   { id: 5, attributes: { background: 'red', eyes: 'green', mouth: 'open', hat: 'beanie' } },
//   { id: 6, attributes: { background: 'blue', eyes: 'brown', mouth: 'frown', hat: 'cap' } },
//   { id: 7, attributes: { background: 'green', eyes: 'blue', mouth: 'smile', hat: 'crown' } },
//   { id: 8, attributes: { background: 'yellow', eyes: 'green', mouth: 'open', hat: 'cowboy' } },
//   { id: 9, attributes: { background: 'red', eyes: 'brown', mouth: 'frown', hat: 'beanie' } },
//   { id: 10, attributes: { background: 'purple', eyes: 'red', mouth: 'grin', hat: 'tiara' } },
// ];

// // Utility function to mimic Python's math.isclose
// const isClose = (a, b, relTol = 1e-9, absTol = 0) => {
//   return Math.abs(a - b) <= Math.max(relTol * Math.max(Math.abs(a), Math.abs(b)), absTol);
// };

// class InformationContentScoringHandler {
//   scoreToken(collection, token) {
//     let score = 0;
//     for (const [trait, value] of Object.entries(token.attributes)) {
//       const traitCount = collection.filter(t => t.attributes[trait] === value).length;
//       const probability = traitCount / collection.length;
//       score += -Math.log(probability);
//     }
//     return score;
//   }

//   scoreTokens(collection, tokens) {
//     return tokens.map(token => this.scoreToken(collection, token));
//   }
// }

// class TokenFeatureExtractor {
//   static extractUniqueAttributeCount(token, collection) {
//     let uniqueAttributesCount = 0;
//     for (const [trait, value] of Object.entries(token.attributes)) {
//       const count = collection.filter(t => t.attributes[trait] === value).length;
//       if (count === 1) uniqueAttributesCount++;
//     }
//     return { uniqueAttributeCount: uniqueAttributesCount };
//   }
// }

// const RarityRanker = {
//   rankCollection: (collection) => {
//     const scorer = new InformationContentScoringHandler();
//     const scores = scorer.scoreTokens(collection, collection);

//     const tokenRarities = collection.map((token, idx) => ({
//       token,
//       score: scores[idx],
//       tokenFeatures: TokenFeatureExtractor.extractUniqueAttributeCount(token, collection),
//     }));

//     return RarityRanker.setRarityRanks(tokenRarities);
//   },

//   setRarityRanks: (tokenRarities) => {
//     const sortedTokenRarities = tokenRarities.sort((a, b) => {
//       if (b.tokenFeatures.uniqueAttributeCount !== a.tokenFeatures.uniqueAttributeCount) {
//         return b.tokenFeatures.uniqueAttributeCount - a.tokenFeatures.uniqueAttributeCount;
//       }
//       return b.score - a.score;
//     });

//     let currentRank = 1;
//     for (let i = 0; i < sortedTokenRarities.length; i++) {
//       if (i > 0 && isClose(sortedTokenRarities[i].score, sortedTokenRarities[i-1].score)) {
//         sortedTokenRarities[i].rank = sortedTokenRarities[i-1].rank;
//       } else {
//         sortedTokenRarities[i].rank = currentRank;
//       }
//       currentRank++;
//     }

//     return sortedTokenRarities;
//   },
// };

// const NFTRarityCalculator = () => {
//   const [rankedTokens, setRankedTokens] = useState([]);

//   useEffect(() => {
//     const ranked = RarityRanker.rankCollection(sampleCollection);
//     setRankedTokens(ranked);
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">NFT Rarity Rankings (Sample Data)</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Rank</th>
//               <th className="px-4 py-2">Token ID</th>
//               <th className="px-4 py-2">Rarity Score</th>
//               <th className="px-4 py-2">Unique Attributes</th>
//               <th className="px-4 py-2">Attributes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rankedTokens.map((tokenRarity) => (
//               <tr key={tokenRarity.token.id}>
//                 <td className="border px-4 py-2">{tokenRarity.rank}</td>
//                 <td className="border px-4 py-2">{tokenRarity.token.id}</td>
//                 <td className="border px-4 py-2">{tokenRarity.score.toFixed(4)}</td>
//                 <td className="border px-4 py-2">{tokenRarity.tokenFeatures.uniqueAttributeCount}</td>
//                 <td className="border px-4 py-2">
//                   {Object.entries(tokenRarity.token.attributes).map(([key, value]) => (
//                     <span key={key} className="mr-2">
//                       {key}: {value}
//                     </span>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Rarity Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={rankedTokens}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="token.id" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="score" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };











// const Collection = () => (
//     <Wrapper>
//         <SEO pageTitle="Collection" />
//         <Header />
//         <main id="main-content">
//         <NFTRarityCalculator/>
//             <Breadcrumb pageTitle="Our Collection" currentPage="Collection" />
//             <CollectionArea data={{ collections: collectionsData }} />
//         </main>
//         <Footer />
//     </Wrapper>
// );

// export default Collection;






import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import nftMetadata from './DBC_metadata.json';

// Utility function to mimic Python's math.isclose
const isClose = (a, b, relTol = 1e-9, absTol = 0) => {
  return Math.abs(a - b) <= Math.max(relTol * Math.max(Math.abs(a), Math.abs(b)), absTol);
};

class InformationContentScoringHandler {
  scoreToken(collection, token) {
    let score = 0;
    token.attributes.forEach(attr => {
      const traitCount = collection.filter(t => 
        t.attributes.some(a => a.trait_type === attr.trait_type && a.value === attr.value)
      ).length;
      const probability = traitCount / collection.length;
      score += -Math.log(probability);
    });
    return score;
  }

  scoreTokens(collection, tokens) {
    return tokens.map(token => this.scoreToken(collection, token));
  }
}

class TokenFeatureExtractor {
  static extractUniqueAttributeCount(token, collection) {
    let uniqueAttributesCount = 0;
    token.attributes.forEach(attr => {
      const count = collection.filter(t => 
        t.attributes.some(a => a.trait_type === attr.trait_type && a.value === attr.value)
      ).length;
      if (count === 1) uniqueAttributesCount++;
    });
    return { uniqueAttributeCount: uniqueAttributesCount };
  }
}

const RarityRanker = {
  rankCollection: (collection) => {
    const scorer = new InformationContentScoringHandler();
    const scores = scorer.scoreTokens(collection, collection);

    const tokenRarities = collection.map((token, idx) => ({
      token,
      score: scores[idx],
      tokenFeatures: TokenFeatureExtractor.extractUniqueAttributeCount(token, collection),
    }));

    return RarityRanker.setRarityRanks(tokenRarities);
  },

  setRarityRanks: (tokenRarities) => {
    const sortedTokenRarities = tokenRarities.sort((a, b) => {
      if (b.tokenFeatures.uniqueAttributeCount !== a.tokenFeatures.uniqueAttributeCount) {
        return b.tokenFeatures.uniqueAttributeCount - a.tokenFeatures.uniqueAttributeCount;
      }
      return b.score - a.score;
    });

    let currentRank = 1;
    for (let i = 0; i < sortedTokenRarities.length; i++) {
      if (i > 0 && isClose(sortedTokenRarities[i].score, sortedTokenRarities[i-1].score)) {
        sortedTokenRarities[i].rank = sortedTokenRarities[i-1].rank;
      } else {
        sortedTokenRarities[i].rank = currentRank;
      }
      currentRank++;
    }

    return sortedTokenRarities;
  },
};

const NFTRarityCalculator = () => {
  const [rankedTokens, setRankedTokens] = useState([]);

  useEffect(() => {
    const collection = Object.values(nftMetadata);
    const ranked = RarityRanker.rankCollection(collection);
    setRankedTokens(ranked);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NFT Rarity Rankings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Token Name</th>
              <th className="px-4 py-2">Rarity Score</th>
              <th className="px-4 py-2">Unique Attributes</th>
              <th className="px-4 py-2">Attributes</th>
            </tr>
          </thead>
          <tbody>
            {rankedTokens.map((tokenRarity) => (
              <tr key={tokenRarity.token.name}>
                <td className="border px-4 py-2">{tokenRarity.rank}</td>
                <td className="border px-4 py-2">{tokenRarity.token.name}</td>
                <td className="border px-4 py-2">{tokenRarity.score.toFixed(4)}</td>
                <td className="border px-4 py-2">{tokenRarity.tokenFeatures.uniqueAttributeCount}</td>
                <td className="border px-4 py-2">
                  {tokenRarity.token.attributes.map((attr) => (
                    <span key={attr.trait_type} className="mr-2">
                      {attr.trait_type}: {attr.value}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Rarity Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rankedTokens}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="token.name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NFTRarityCalculator;